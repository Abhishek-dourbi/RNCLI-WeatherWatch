import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";
import { CurrentWeatherProps } from "./@types";

const CurrentWeather = ({
    locationName,
    currentTemp,
    description,
    image
}: CurrentWeatherProps) => {
  return (
    <View style={styles.forecastContainer}>
        <Text style={styles.locationText}>{locationName}</Text>
        <Text style={styles.currentTempText}>{currentTemp}°</Text>
        {description ? <Text style={styles.currentForecastText}>{description}</Text> : null}
        {image ? <Image testID='current-forecast-image' source={{uri: image}} style={styles.currentForecastImage} /> : null}
    </View>
  );
}

export default CurrentWeather;