import React from 'react';
import {SafeAreaView, View, Image, StyleSheet} from 'react-native';

import {COLORS, SIZES, icons, ratioWidth, ratioHeight} from '../../constants';

import {Header, FAQField} from './components';

const FAQs = ({navigation}) => {
  const questions = [
    'What is building tracker?',
    'How to use it?',
    'Does this app use my information for ad?',
    'How can I contact you?',
  ];

  const answers = [
    'Building tracker is an application for tracking gas density, temperature and noise of an building.',
    'In order to use it, you just download and install, then you must sign up or log in with your account to see details of you building.',
    'The answer is no. We just need your information for register account to track how much people are using this app.',
    'You easily give your feedbacks us in your settings menu.',
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Header name="FAQs" navigation={navigation} />

      {/* Avatar */}
      <Image source={icons.logo} resizeMode="contain" style={styles.logo} />

      {/* FAQ fields */}
      <View style={styles.faqs_field_container}>
        <FAQField question={questions[0]} answer={answers[0]} />
        <FAQField question={questions[1]} answer={answers[1]} />
        <FAQField question={questions[2]} answer={answers[2]} />
        <FAQField question={questions[3]} answer={answers[3]} />
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
  logo: {
    width: 256 * ratioWidth,
    height: 256 * ratioHeight,
    marginBottom: 30,
  },

  //FAQs fields
  faqs_field_container: {
    width: SIZES.windowWidth - 20 * 2,
  },
});

export default FAQs;
