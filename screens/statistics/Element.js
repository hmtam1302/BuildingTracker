import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import {COLORS, ratioWidth, ratioHeight} from '../../constants';

const Element = ({name, color, backgroundColor, icon, isSelected}) => {
  const styles = StyleSheet.create({
    container: {
      width: 250 * ratioWidth,
      height: 250 * ratioHeight,
      backgroundColor: isSelected ? backgroundColor : COLORS.secondary,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50 * ratioHeight,
    },

    icon: {
      width: 128 * ratioWidth,
      height: 128 * ratioWidth,
      tintColor: isSelected ? color : COLORS.grey,
    },

    text: {
      color: isSelected ? color : COLORS.grey,
      fontFamily: 'Roboto-Bold',
      fontSize: 35 * ratioWidth,
    },
  });

  return (
    <View style={styles.container}>
      <Image source={icon} resizeMode="contain" style={styles.icon} />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

export default Element;
