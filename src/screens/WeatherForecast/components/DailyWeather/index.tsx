import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";
import getWeatherImage from "../../../../helpers/getWeatherImage";
import { formatDayName } from "../../../../utils/date";
import { DailyWeatherStateData } from "../../@types";
import { DailyWeatherProps } from "./@types";

const DailyWeather = ({
    data = [],
    currentTime = ''
}: DailyWeatherProps) => {
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
            {index < data.length - 1 ? (
              <View style={styles.lineSeparator} />
            ) : null}
          </React.Fragment>
        );
      };

  return (
    <View style={styles.dailyForecastContainer}>
        <Text style={styles.dailyForecastText}>DAILY FORECAST</Text>
        <View style={styles.lineSeparator} />

        <View>{data.map(renderDailyWeatherData)}</View>
    </View>
  );
}

export default DailyWeather;