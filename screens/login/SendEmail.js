import React from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  icons,
  ratioWidth,
  ratioHeight,
  COLORS,
  images,
  FONTS,
  STYLE,
} from '../../constants';

const ForgotPassword = ({navigation, route}) => {
  const [email, setEmail] = React.useState(route.params.email);

  const resendEmail = () => {
    console.log(email);
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={icons.arrow}
          resizeMode="contain"
          style={styles.back_button}
        />
      </TouchableOpacity>

      {/* Main section */}
      <View style={styles.main_section}>
        {/* Title section */}
        <View style={styles.title_section}>
          <Image source={icons.logo} resizeMode="contain" style={styles.logo} />
          <View style={styles.title_wrapper}>
            <Text style={styles.title_primary}>Check</Text>
            <Text style={styles.title_secondary}>your email</Text>
            <Text style={styles.title_text}>
              A new password has been sent to your registered email
            </Text>
          </View>
        </View>

        {/* Input section */}
        <View style={styles.input_wrapper}>
          {/* Buttons */}
          <TouchableOpacity
            style={styles.button_primary}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.text_primary}>Login</Text>
          </TouchableOpacity>
          <View style={styles.link_wrapper}>
            <Text style={styles.additional_text}>
              Didn't receive any thing?
            </Text>
            <TouchableOpacity onPress={() => resendEmail()}>
              <Text style={styles.link_text}>Resend</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Image section */}
        <View>
          <Image
            source={images.background}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.white,
  },

  // Back button
  back_button: {
    width: 64 * ratioWidth,
    height: 64 * ratioHeight,
    marginLeft: 12,
    marginTop: 12,
  },

  // Main section
  main_section: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },

  title_section: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 400 * ratioWidth,
    height: 401.94 * ratioHeight,
  },

  title_wrapper: {
    marginTop: 119 * ratioHeight,
  },
  title_primary: {
    ...FONTS.title_primary,
    ...FONTS.h1,
  },
  title_secondary: {
    ...FONTS.h3,
    ...FONTS.title_secondary,
  },
  title_text: {
    ...FONTS.text,
    color: COLORS.heading,
  },

  // Input section
  input_wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  input_field: {
    alignItems: 'flex-start',
    marginVertical: 19 * ratioHeight,
  },

  input: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: COLORS.heading,
    ...FONTS.h4,
    marginLeft: 6,
    marginBottom: 9 * ratioHeight,
  },
  input_icon: {
    width: 64 * ratioWidth,
    height: 64 * ratioHeight,
    position: 'absolute',
    left: 15,
    tintColor: COLORS.heading,
  },
  input_text: {
    paddingHorizontal: 50,
    width: 700 * ratioWidth,
    height: 100 * ratioHeight,
    ...STYLE.border,
  },
  link_text: {
    ...FONTS.h5,
    ...FONTS.link,
    fontFamily: 'Roboto-Bold',
  },
  error_wrapper: {
    width: 700 * ratioWidth,
    alignItems: 'flex-end',
  },
  error_text: {
    ...FONTS.h5,
    ...FONTS.error,
  },
  button_primary: {
    width: 700 * ratioWidth,
    height: 125 * ratioHeight,
    backgroundColor: COLORS.button_primary,
    borderRadius: 30 * ratioHeight,
    ...STYLE.shadow,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    flexDirection: 'row',
    marginVertical: 12,
  },
  text_primary: {
    color: COLORS.white,
    ...FONTS.h3,
    paddingHorizontal: 10,
  },
  button_icon: {
    width: 64 * ratioWidth,
    height: 64 * ratioHeight,
  },
  text_secondary: {
    color: COLORS.heading,
    ...FONTS.h3,
  },
  button_secondary: {
    paddingHorizontal: 10,
  },

  link_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  additional_text: {
    ...FONTS.h5,
    color: COLORS.heading,
    fontFamily: 'Roboto-Italic',
    marginRight: 6,
  },

  // Image section
  image: {
    width: 1030 * ratioWidth,
    height: 495.4 * ratioHeight,
  },
});

export default ForgotPassword;
