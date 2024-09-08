import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import WeatherForecast from './src/screens/WeatherForecast';

export default function App() {
  return (
    <WeatherForecast />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
