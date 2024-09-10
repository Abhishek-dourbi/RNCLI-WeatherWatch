import {View, TouchableOpacity, Keyboard, BackHandler, ActivityIndicator} from 'react-native';
import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import styles from './styles';
import {SuggestionModalProps, SuggestionModalRef} from './@types';
import Colors from '../../themes/colors';

const SuggestionsModal = forwardRef(<T,>({data = [], renderText, isLoading}: SuggestionModalProps<T>, ref: React.Ref<SuggestionModalRef>) => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => {
    setIsVisible(true);
  };

  const hide = () => {
    setIsVisible(false);
  };

  useImperativeHandle(ref, () => ({
    show,
    hide,
    close
  }));

  const close = () => {
    Keyboard.dismiss();
    hide();
  }

  const onAndroidBackPress = () => {
    close();
    return true;
  };

  useEffect(() => {
    if (isVisible) {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    } else {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        onAndroidBackPress
      );
    }
    return () =>
      BackHandler.removeEventListener(
        'hardwareBackPress',
        onAndroidBackPress
      );
  }, [isVisible]);

  if (!isVisible) return null;
  return (
    <TouchableOpacity
      onPress={close}
      style={styles.container}>
        {
          isLoading ? 
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={'large'} color={Colors.white} />
            </View> : 
            data.map(renderText)}
    </TouchableOpacity>
  );
});


export default SuggestionsModal;
