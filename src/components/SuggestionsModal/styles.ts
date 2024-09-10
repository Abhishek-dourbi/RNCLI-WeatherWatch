import {StyleSheet} from 'react-native';
import Colors from '../../themes/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../themes/metrics';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.overlayBlack,
    position: 'absolute',
    top: 130,
    bottom: 0,
    zIndex: 100,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  loadingContainer: {
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    paddingTop: 20
  }
});
