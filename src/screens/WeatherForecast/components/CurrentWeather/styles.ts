import {StyleSheet} from 'react-native';
import Colors from '../../../../themes/colors';
import {SCREEN_WIDTH} from '../../../../themes/metrics';

export default StyleSheet.create({
  forecastContainer: {
    alignItems: 'center',
  },
  locationText: {
    color: Colors.white,
    fontSize: 30,
  },
  currentTempText: {
    color: Colors.white,
    fontSize: 55,
  },
  currentForecastText: {
    color: Colors.white,
    fontSize: 20,
    marginRight: 10,
  },
  currentForecastImage: {
    height: 200,
    width: 200,
  },
});
