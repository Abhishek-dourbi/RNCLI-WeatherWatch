import {StyleSheet} from 'react-native';
import Colors from '../../themes/colors';
import {SCREEN_WIDTH} from '../../themes/metrics';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.blue,
    flex: 1,
  },
  loadingContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginTop: 20
  },
  spacer: {
    height: 40,
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
