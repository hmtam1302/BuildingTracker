import React from 'react';
import {SafeAreaView, View, Image, StyleSheet, Text} from 'react-native';

import {
  COLORS,
  SIZES,
  FONTS,
  icons,
  ratioWidth,
  ratioHeight,
} from '../../constants';

import {Header} from './components';

const AboutUs = ({navigation}) => {
  const details = [
    'Senior CE student from CSE Faculty of HCMUT.',
    '\u2022 Huynh Cong Hai    \t\t\t 1812065',
    '\u2022 Truong Minh Hiep  \t\t\t 1812228',
    '\u2022 Ho Ngoc Tri       \t\t\t\t\t 181xxxx',
    '\u2022 Hoang Vu Tinh     \t\t\t\t 181xxxx',
    'Teacher: Tran Ngoc Bao Duy',
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Header name="About us" navigation={navigation} />

      {/* About us fields */}
      <View style={styles.about_us_container}>
        <View style={styles.logo_container}>
          <Image source={icons.logo} resizeMode="contain" style={styles.logo} />
          <Image
            source={icons.hcmut}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        <View style={styles.text_container}>
          <Text style={styles.heading}>We are</Text>
          <View style={styles.text_wrapper}>
            <Text style={styles.text}>{details[0]}</Text>
          </View>
          <View style={styles.text_wrapper}>
            <Text style={styles.text}>{details[1]}</Text>
            <Text style={styles.text}>{details[2]}</Text>
            <Text style={styles.text}>{details[3]}</Text>
            <Text style={styles.text}>{details[4]}</Text>
          </View>
          <View style={styles.text_wrapper}>
            <Text style={styles.text}>{details[5]}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    flex: 1,
  },

  //Logo
  logo_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SIZES.windowWidth - 20 * 2,
  },
  logo: {
    width: 256 * ratioWidth,
    height: 256 * ratioHeight,
    marginBottom: 30,
  },

  //About us fields
  about_us_container: {
    marginVertical: 30,
  },
  heading: {
    ...FONTS.h3,
  },
  text_wrapper: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey,
  },
  text: {
    ...FONTS.h5,
    marginLeft: 80,
    marginVertical: 10,
  },
});

export default AboutUs;
