import {View, Text, TouchableOpacity, Keyboard, BackHandler} from 'react-native';
import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import styles from './styles';
import {SuggestionModalProps, SuggestionModalRef} from './@types';

const SuggestionsModal = forwardRef(<T,>({data, renderText}: SuggestionModalProps<T>, ref: React.Ref<SuggestionModalRef>) => {
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
      {data.map(renderText)}
    </TouchableOpacity>
  );
});


export default SuggestionsModal;
