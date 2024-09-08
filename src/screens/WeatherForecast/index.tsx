import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import {useSimpleReducer} from '../../hooks/reducer';
import {getWeatherData} from '../../api/weatherForecast';
import {
  DailyWeatherStateData,
  GeoCodingState,
  WeatherForecastState,
} from './@types';
import getWeatherImage from '../../helpers/getWeatherImage';
import {formatDayName} from '../../utils/date';
import styles from './styles';

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
};

const Home = () => {
  const [weatherState, updateWeatherState] =
    useSimpleReducer<WeatherForecastState>(InitialWeatherForecastState);
  const [geocodingState, updateGeocodingState] =
    useSimpleReducer<GeoCodingState>(InitialGeocodingState);

  const {currentTime, currentTemp, currentWeatherCode, dailyWeatherData} =
    weatherState;
  const {latitude, longitude, locationName} = geocodingState;

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
  }, []);

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.forecastContainer}>
          <Text style={styles.locationText}>{locationName}</Text>
          <Text style={styles.currentTempText}>{currentTemp}°</Text>
          <Text style={styles.currentForecastText}>{description}</Text>
          <Image source={{uri: image}} style={styles.currentForecastImage} />
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
