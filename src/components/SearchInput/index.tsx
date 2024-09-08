import {View, Text, TextInput} from 'react-native';
import React from 'react';
import styles from './styles';
import { SearchInputProps } from './@types';

const SearchInput = ({
    onChangeText,
    onFocus
}: SearchInputProps) => {
  return (
    <TextInput
      placeholder="Search..."
      onChangeText={onChangeText}
      style={styles.input}
      onFocus={onFocus}
    />
  );
};

export default SearchInput;
