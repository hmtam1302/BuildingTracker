import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
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

  const [modalVisible, setModalVisible] = useState(false);

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
          onPress={() => {
            setModalVisible(!modalVisible);
            new UserController(route.params.username).sendFeedbacks(
              experience,
              hasError,
              rating,
            );
          }}>
          <Text style={styles.button_text}>Send</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modal_container}>
            <View style={styles.modal_view}>
              <Text style={styles.modal_text}>
                Your feedback has been sent!
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.modal_button_text}>Thank you</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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

  //Modal
  modal_container: {
    position: 'absolute',
    top: SIZES.windowHeight / 2 - (500 / 2) * ratioHeight,
    left: SIZES.windowWidth / 2 - (800 / 2) * ratioWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    width: 800 * ratioWidth,
    height: 500 * ratioHeight,
    padding: 10,
    borderRadius: 25 * ratioWidth,
    borderWidth: 1,
    borderColor: COLORS.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal_text: {
    ...FONTS.h3,
    color: COLORS.heading,
  },
  modal_button: {
    width: 500 * ratioWidth,
    height: 125 * ratioHeight,
  },
  modal_button_text: {
    color: COLORS.white,
    ...FONTS.h3,
  },
});

export default Feedbacks;
