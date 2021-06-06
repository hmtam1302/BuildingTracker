import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {COLORS, SIZES, FONTS} from '../../../constants';

const FAQField = ({question, answer}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <Text style={styles.answer}>{answer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.windowWidth - 20 * 2,
    borderBottomWidth: 1,
    borderColor: COLORS.grey,
    marginVertical: 5,
  },

  question: {
    ...FONTS.h3,
    color: COLORS.heading,
    marginBottom: 10,
  },
  answer: {
    ...FONTS.h5,
    marginLeft: 80,
    marginBottom: 10,
  },
});

export default FAQField;
