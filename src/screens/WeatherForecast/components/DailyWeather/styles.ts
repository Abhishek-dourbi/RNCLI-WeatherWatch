import {StyleSheet} from 'react-native';
import Colors from '../../../../themes/colors';
import {SCREEN_WIDTH} from '../../../../themes/metrics';

export default StyleSheet.create({
  dailyForecastContainer: {
    paddingTop: 20,
    backgroundColor: Colors.darkBlue,
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
  },
  dailyForecastText: {
    color: Colors.grey,
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 18,
  },
  lineSeparator: {
    width: SCREEN_WIDTH - 60,
    height: 1,
    backgroundColor: Colors.grey,
    alignSelf: 'center',
  },
  spacer: {
    height: 40,
  },
  dailyForecastItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  dayName: {
    width: 70,
    color: Colors.white,
    fontSize: 20,
  },
  dailyForecastImage: {
    width: 50,
    height: 50,
  },
  tempText: {
    color: Colors.white,
  },
  minTempText: {
    color: Colors.grey,
  },
});
