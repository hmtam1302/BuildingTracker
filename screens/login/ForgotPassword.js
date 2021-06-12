import React from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
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

import {SystemController} from '../../data';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isIndicatorVisible, setIndicatorVisibility] = React.useState(false);

  const validateData = () => {
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!email) {
      setError('Please fill in your registered email');
      return false;
    } else if (!re.test(email)) {
      setError('Wrong email format');
      return false;
    }

    //Validate email from server
    setError(null);
    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
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
          <View>
            <Text style={styles.title_primary}>Forgot</Text>
            <Text style={styles.title_secondary}>your password</Text>
            <Text style={styles.title_text}>
              Enter your registered email to receive a new password
            </Text>
          </View>
        </View>

        {/* Input section */}
        <View style={styles.input_wrapper}>
          <View style={styles.input_field}>
            <Text style={styles.text}>Email</Text>
            <View style={styles.input}>
              <Image
                style={styles.input_icon}
                resizeMode="contain"
                source={icons.message}
              />
              <TextInput
                style={styles.input_text}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
              />
            </View>
          </View>
          <View style={styles.error_wrapper}>
            <Text style={styles.error_text}>{error}</Text>
          </View>
        </View>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.button_primary}
          onPress={async () => {
            setIndicatorVisibility(true);
            setError(null);
            let success = validateData();
            if (success) {
              let response = await new SystemController().forgotPassword(email);
              let data = await response.json();
              if (data.message === 'Send password success!') {
                navigation.navigate('SendEmail', {email: email});
              } else {
                setError(data.message);
              }
            }
            setIndicatorVisibility(false);
          }}>
          {isIndicatorVisible ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <View style={styles.button_container}>
              <Text style={styles.text_primary}>Send</Text>
              <Image
                source={icons.paper_plane}
                resizeMode="contain"
                style={styles.button_icon}
              />
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.link_wrapper}>
          <Text style={styles.additional_text}>Remember password?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link_text}>Login</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  title_section: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250 * ratioWidth,
    height: 250 * ratioHeight,
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
  button_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
