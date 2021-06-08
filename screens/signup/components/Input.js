import React from 'react';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';

import {
  FONTS,
  COLORS,
  STYLE,
  ratioWidth,
  ratioHeight,
} from '../../../constants';

const Input = ({
  name,
  value,
  placeholder,
  error,
  icon,
  setValue,
  setError,
  isSecure,
}) => {
  return (
    <View style={styles.input_field}>
      <Text style={styles.text}>{name}</Text>
      <View style={styles.input}>
        <Image style={styles.input_icon} resizeMode="contain" source={icon} />
        <TextInput
          style={styles.input_text}
          placeholder={placeholder}
          onChangeText={text => {
            setError(null);
            setValue(text);
          }}
          value={value}
          secureTextEntry={isSecure}
        />
      </View>
      <View style={styles.error_wrapper}>
        <Text style={styles.error_text}>{error}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input_field: {
    alignItems: 'flex-start',
  },

  input: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: COLORS.heading,
    ...FONTS.h4,
    marginLeft: 6,
    marginBottom: 9 * ratioHeight,
  },
  input_icon: {
    width: 64 * ratioWidth,
    height: 64 * ratioHeight,
    position: 'absolute',
    left: 15,
    tintColor: COLORS.heading,
  },
  input_text: {
    paddingHorizontal: 50,
    width: 700 * ratioWidth,
    height: 100 * ratioHeight,
    ...STYLE.border,
  },

  error_wrapper: {
    width: 700 * ratioWidth,
    alignItems: 'flex-end',
  },
  error_text: {
    ...FONTS.h5,
    ...FONTS.error,
  },
});
export default Input;
