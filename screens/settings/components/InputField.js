import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import {
  COLORS,
  SIZES,
  ratioWidth,
  ratioHeight,
  FONTS,
} from '../../../constants';

const InputField = ({name, onSetValue, isSecure = false, placeholder}) => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      marginVertical: 11 * ratioHeight,
    },

    input_container: {
      marginRight: 10 * ratioWidth,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    text_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    name: {
      color: COLORS.heading,
      ...FONTS.h4,
    },

    input: {
      borderRadius: 25 * ratioWidth,
      borderWidth: 1,
      borderColor: COLORS.gray,
      color: '#000',
      width: SIZES.windowWidth - 20 * 2,
      height: 100 * ratioHeight,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.text_container}>
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          secureTextEntry={isSecure}
          onChangeText={text => onSetValue(text)}
          placeholder={placeholder ? 'Current value: ' + placeholder : ''}
        />
      </View>
    </View>
  );
};

export default InputField;
