import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FONTS, COLORS, icons, ratioWidth, ratioHeight} from '../../constants';

const Element = ({name, icon, navigation, dest}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.main_group}>
        <View style={styles.icon_wrapper}>
          <Image source={icon} resizeMode="contain" style={styles.icon} />
        </View>
        <Text style={styles.text}>{name}</Text>
      </View>
      <Image style={styles.next} source={icons.next} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 950 * ratioWidth,
    height: 100 * ratioHeight,
    marginVertical: 44 * ratioHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  main_group: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...FONTS.h4,
    marginLeft: 27 * ratioWidth,
  },

  icon_wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100 * ratioWidth,
    height: 100 * ratioWidth,
    backgroundColor: COLORS.cyan,
    borderRadius: 10,
  },
  icon: {
    width: 65 * ratioWidth,
    height: 64 * ratioWidth,
  },
  next: {
    width: 64 * ratioWidth,
    height: 64 * ratioHeight,
  },
});

export default Element;
