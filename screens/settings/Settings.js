import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, Image} from 'react-native';

import {COLORS, FONTS, icons, ratioWidth} from '../../constants';
import Element from './Element';

const Settings = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.header_icon_wrapper}>
          <Image
            source={icons.programmer}
            resizeMode="contain"
            style={styles.header_icon}
          />
        </View>
        <View style={styles.header_text_wrapper}>
          <Text style={styles.heading}>Huỳnh Công Hải</Text>
          <Text style={styles.job}>IT Staff</Text>
        </View>
      </View>

      {/* Personal and setting section */}
      <View style={styles.section}>
        <Element
          name="Personal data"
          icon={icons.user}
          navigation={navigation}
          dest="PersonalData"
        />
        <Element
          name="Settings"
          icon={icons.settings}
          navigation={navigation}
          dest="Settings"
        />
      </View>

      {/* System sections */}
      <View style={styles.section}>
        <Element
          name="FAQs"
          icon={icons.faq}
          navigation={navigation}
          dest="FAQs"
        />
        <Element
          name="About us"
          icon={icons.info}
          navigation={navigation}
          dest="AboutUs"
        />
        <Element
          name="Feedbacks"
          icon={icons.love}
          navigation={navigation}
          dest="Feedbacks"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },

  //Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 950 * ratioWidth,
    marginVertical: 30,
  },
  header_icon_wrapper: {
    width: 128 * ratioWidth,
    height: 128 * ratioWidth,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    marginRight: 10,
  },
  header_icon: {
    width: 128 * ratioWidth,
    height: 128 * ratioWidth,
  },
  heading: {
    ...FONTS.h2,
    color: COLORS.heading,
  },
  job: {
    ...FONTS.h5,
    fontFamily: 'Roboto-Italic',
  },

  //Section
  section: {
    borderTopWidth: 2,
    borderColor: COLORS.grey,
    marginVertical: 10,
  },
});

export default Settings;
