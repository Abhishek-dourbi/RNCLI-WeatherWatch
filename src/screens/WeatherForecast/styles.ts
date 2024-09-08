import {StyleSheet} from 'react-native';
import Colors from '../../themes/colors';
import {SCREEN_WIDTH} from '../../themes/metrics';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.blue,
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginTop: 20
  },
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

  locationItem: {
    backgroundColor: Colors.white,
    paddingVertical: 15,
    paddingLeft: 10,
    width: SCREEN_WIDTH - 40,
    alignSelf: 'center',
  },
  lastLocationItem: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  locationItemText: {
    fontSize: 18,
    fontWeight: '600',
  },
  locationItemSpacer: {
    height: 1
  }
});
