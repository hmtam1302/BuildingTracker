import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';

import {COLORS, SIZES, FONTS, icons, ratioWidth} from '../../../constants';

const Header = ({navigation, name}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button_wrapper}>
        <Image
          source={icons.arrow}
          resizeMode="contain"
          style={styles.button}
        />
      </TouchableOpacity>
      <Text style={styles.heading}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 30 * ratioWidth,
  },

  button_wrapper: {
    position: 'absolute',
    left: 20,
  },

  button: {
    width: 64 * ratioWidth,
    height: 64 * ratioWidth,
    alignSelf: 'flex-start',
  },

  heading: {
    ...FONTS.h2,
    color: COLORS.heading,
    margin: 'auto',
  },
});

export default Header;
