import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSimpleReducer} from '../../hooks/reducer';
import {getWeatherData} from '../../api/weatherForecast';
import {
  DailyWeatherStateData,
  GeoCodingState,
  LocationData,
  WeatherForecastState,
} from './@types';
import getWeatherImage from '../../helpers/getWeatherImage';
import {formatDayName} from '../../utils/date';
import styles from './styles';
import {getLocation} from '../../api/geocoding';
import SearchInput from '../../components/SearchInput';
import SuggestionsModal from '../../components/SuggestionsModal';
import {
  SuggestionModalRef,
} from '../../components/SuggestionsModal/@types';

const InitialWeatherForecastState = {
  currentTime: '',
  currentTemp: 0,
  currentWeatherCode: null,
  dailyWeatherData: [],
};

const InitialGeocodingState = {
  latitude: 28.6358,
  longitude: 77.2245,
  locationName: 'New Delhi',
  searchLocations: [],
};

const Home = () => {
  const [weatherState, updateWeatherState] =
    useSimpleReducer<WeatherForecastState>(InitialWeatherForecastState);
  const [geocodingState, updateGeocodingState] =
    useSimpleReducer<GeoCodingState>(InitialGeocodingState);

  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const modalRef = useRef<SuggestionModalRef>(null);

  const {currentTime, currentTemp, currentWeatherCode, dailyWeatherData} =
    weatherState;
  const {latitude, longitude, locationName, searchLocations} = geocodingState;

  const fetchLocation = async (query: string) => {
    try {
      const res = await getLocation(query);

      const data = res?.map(location => ({
        id: location.id,
        name: location.name,
        latitude: location.latitude,
        longitude: location.longitude,
      }));

      updateGeocodingState({
        searchLocations: data,
      });
    } catch (err: any) {
      Alert.alert(err.message);
    }
  };

  const fetchWeatherData = async () => {
    try {
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
      });
    } catch (err: any) {
      Alert.alert(err.message);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [latitude, longitude]);

  const renderDailyWeatherData = (
    item: DailyWeatherStateData,
    index: number,
  ) => {
    const {maxTemp, minTemp, averageTemp, weatherCode, date} = item;
    const {image} = getWeatherImage(weatherCode) || {};

    return (
      <React.Fragment key={date}>
        <View style={styles.dailyForecastItemContainer}>
          <Text style={styles.dayName}>{formatDayName(date, currentTime)}</Text>
          <Image source={{uri: image}} style={styles.dailyForecastImage} />
          <Text style={styles.tempText}>
            <Text style={styles.minTempText}>{minTemp}°</Text> - {maxTemp}°
          </Text>
          <Text style={styles.tempText}>{averageTemp}°</Text>
        </View>
        {index < dailyWeatherData.length - 1 ? (
          <View style={styles.lineSeparator} />
        ) : null}
      </React.Fragment>
    );
  };

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
        data={searchLocations}
        renderText={renderLocations}
        ref={modalRef}
      />

      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewContainer}>
        <View style={styles.inputContainer}>
          <SearchInput onChangeText={onChangeLocation} onFocus={onFocus} />
        </View>

        <View style={styles.forecastContainer}>
          <Text style={styles.locationText}>{locationName}</Text>
          <Text style={styles.currentTempText}>{currentTemp}°</Text>
          <Text style={styles.currentForecastText}>{description}</Text>
          <Image testID='current-forecast-image' source={{uri: image}} style={styles.currentForecastImage} />
        </View>

        <View style={styles.dailyForecastContainer}>
          <Text style={styles.dailyForecastText}>DAILY FORECAST</Text>
          <View style={styles.lineSeparator} />

          <View>{dailyWeatherData.map(renderDailyWeatherData)}</View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
