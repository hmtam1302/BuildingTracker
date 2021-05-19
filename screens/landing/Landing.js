import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {images, icons, COLORS, ratioHeight, ratioWidth} from '../../constants';

const Landing = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={icons.logo_large}
          resizeMode="contain"
          style={styles.logo}
        />
        <Image
          source={images.background}
          resizeMode="contain"
          style={styles.background}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: COLORS.white,
  },

  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 1000 * ratioWidth,
  },

  logo: {
    height: 800 * ratioHeight,
    width: '100%',
    marginBottom: 74 * ratioHeight,
  },
  background: {
    height: 500 * ratioHeight,
    width: '100%',
  },
});

export default Landing;
