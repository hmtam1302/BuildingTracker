import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {
  COLORS,
  SIZES,
  icons,
  FONTS,
  ratioWidth,
  ratioHeight,
} from '../../constants';

import {Header} from './components';
import {Rating} from 'react-native-ratings';
import {UserController} from '../../data';

const Feedbacks = ({route, navigation}) => {
  const [experience, setExperience] = React.useState(null);
  const [hasError, setHasError] = React.useState(null);
  const [rating, setRating] = React.useState(3);
  const ratingCompleted = value => setRating(value);

  const [isIndicatorVisible, setIndicatorVisibility] = useState(false);

  const createAlert = () => {
    Alert.alert('Success', 'Your feedback has been sent!', [
      {text: 'Thank you'},
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header name="Feedbacks" navigation={navigation} />

      {/* Avatar */}
      <Image source={icons.logo} resizeMode="contain" style={styles.logo} />

      {/* Feedback fields */}
      <View style={styles.feedback_field_container}>
        <View style={styles.input_field}>
          <Text style={styles.heading}>How about using this app?</Text>
          <TextInput
            style={styles.text_input}
            value={experience}
            onChangeText={value => setExperience(value)}
          />
        </View>
        <View style={styles.input_field}>
          <Text style={styles.heading}>Does this app have any errors?</Text>
          <TextInput
            style={styles.text_input}
            value={hasError}
            onChangeText={value => setHasError(value)}
          />
        </View>
        <Text style={styles.heading}>Your rating</Text>
        <Rating
          type="heart"
          ratingCount={5}
          imageSize={60}
          showRating
          onFinishRating={ratingCompleted}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            setIndicatorVisibility(true);
            await new UserController(route.params.username).sendFeedbacks(
              experience,
              hasError,
              rating,
            );
            setIndicatorVisibility(false);
            createAlert();
          }}>
          {isIndicatorVisible ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.button_text}>Send</Text>
          )}
        </TouchableOpacity>
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

  //Feedback fields
  feedback_field_container: {
    width: SIZES.windowWidth - 20 * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input_field: {
    marginVertical: 10,
  },

  heading: {
    ...FONTS.h3,
  },
  text_input: {
    width: SIZES.windowWidth - 20 * 2,
    height: 200 * ratioHeight,
    borderWidth: 1,
    borderRadius: 25 * ratioWidth,
    marginTop: 5,
  },

  button: {
    width: 700 * ratioWidth,
    height: 125 * ratioHeight,
    backgroundColor: COLORS.primary,
    borderRadius: 25 * ratioWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  button_text: {
    color: COLORS.white,
    ...FONTS.h3,
  },
});

export default Feedbacks;
