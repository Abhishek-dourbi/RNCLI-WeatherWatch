import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSimpleReducer} from '../../hooks/reducer';
import {getWeatherData} from '../../api/weatherForecast';
import {GeoCodingState, LocationData, WeatherForecastState} from './@types';
import getWeatherImage from '../../helpers/getWeatherImage';
import styles from './styles';
import {getLocation} from '../../api/geocoding';
import SearchInput from '../../components/SearchInput';
import SuggestionsModal from '../../components/SuggestionsModal';
import {SuggestionModalRef} from '../../components/SuggestionsModal/@types';
import CurrentWeather from './components/CurrentWeather';
import DailyWeather from './components/DailyWeather';
import Colors from '../../themes/colors';

const InitialWeatherForecastState = {
  currentTime: '',
  currentTemp: 0,
  currentWeatherCode: null,
  dailyWeatherData: [],
  isWeatherForecastLoading: false,
};

const InitialGeocodingState = {
  latitude: 28.6358,
  longitude: 77.2245,
  locationName: 'New Delhi',
  searchLocations: [],
  isGeocodingLoading: false,
};

const Home = () => {
  const [weatherState, updateWeatherState] =
    useSimpleReducer<WeatherForecastState>(InitialWeatherForecastState);
  const [geocodingState, updateGeocodingState] =
    useSimpleReducer<GeoCodingState>(InitialGeocodingState);

  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const modalRef = useRef<SuggestionModalRef>(null);

  const {
    currentTime,
    currentTemp,
    currentWeatherCode,
    dailyWeatherData,
    isWeatherForecastLoading,
  } = weatherState;
  const {
    latitude,
    longitude,
    locationName,
    searchLocations,
    isGeocodingLoading,
  } = geocodingState;

  const fetchLocation = async (query: string) => {
    try {
      updateGeocodingState({
        isGeocodingLoading: true,
      });
      const res = await getLocation(query);

      const data = res?.map(location => ({
        id: location.id,
        name: location.name,
        latitude: location.latitude,
        longitude: location.longitude,
      }));

      updateGeocodingState({
        searchLocations: data,
        isGeocodingLoading: false,
      });
    } catch (err: any) {
      updateGeocodingState({
        isGeocodingLoading: false,
      });
      Alert.alert(err.message);
    }
  };

  const fetchWeatherData = async () => {
    try {
      updateWeatherState({
        isWeatherForecastLoading: true,
      });
      const res = await getWeatherData({
        latitude,
        longitude,
      });

      const dailyData = res.daily.weather_code.map((code, index) => ({
        date: res.daily.time[index],
        weatherCode: code,
        maxTemp: res.daily.temperature_2m_max[index],
        minTemp: res.daily.temperature_2m_min[index],
        averageTemp: (
          (res.daily.temperature_2m_max[index] +
            res.daily.temperature_2m_min[index]) /
          2
        ).toFixed(1),
      }));

      updateWeatherState({
        currentTime: res.current.time,
        currentTemp: res.current.temperature_2m,
        currentWeatherCode: res.current.weather_code,
        dailyWeatherData: dailyData,
        isWeatherForecastLoading: false,
      });
    } catch (err: any) {
      updateWeatherState({
        isWeatherForecastLoading: false,
      });
      Alert.alert(err.message);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [latitude, longitude]);

  const {description, image} = getWeatherImage(currentWeatherCode) || {};

  const onChangeLocation = (text: string) => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      fetchLocation(text);
    }, 500);
  };

  const onPressLocation = (item: LocationData) => () => {
    modalRef.current?.close();
    updateGeocodingState({
      latitude: item.latitude,
      longitude: item.longitude,
      locationName: item.name,
      searchLocations: [],
    });
  };

  const renderLocations = (item: LocationData, index: number) => {
    return (
      <React.Fragment key={item.id}>
        <TouchableOpacity
          onPress={onPressLocation(item)}
          style={[
            styles.locationItem,
            index < searchLocations.length - 1 ? {} : styles.lastLocationItem,
          ]}>
          <Text style={styles.locationItemText}>{item.name}</Text>
        </TouchableOpacity>
        <View style={styles.locationItemSpacer} />
      </React.Fragment>
    );
  };

  const onFocus = () => {
    if (modalRef.current) {
      modalRef.current?.show();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SuggestionsModal
        isLoading={isGeocodingLoading}
        data={searchLocations}
        renderText={renderLocations}
        ref={modalRef}
      />

      {isWeatherForecastLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={Colors.white} />
        </View>
      ) : (
        <ScrollView
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          style={styles.scrollViewContainer}>
          <View style={styles.inputContainer}>
            <SearchInput onChangeText={onChangeLocation} onFocus={onFocus} />
          </View>

          <CurrentWeather
            locationName={locationName}
            currentTemp={currentTemp}
            description={description}
            image={image}
          />

          <DailyWeather data={dailyWeatherData} currentTime={currentTime} />

          <View style={styles.spacer} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Home;
