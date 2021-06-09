import React from 'react';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
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

import {Input} from './components';
import {UserController} from '../../data';

const Signup = ({navigation}) => {
  const [username, setUsername] = React.useState(null);
  const [usernameError, setUsernameError] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [emailError, setEmailError] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);
  const [confirm, setConfirm] = React.useState(null);
  const [confirmError, setConfirmError] = React.useState(null);
  const [isIndicatorVisible, setIndicatorVisibility] = React.useState(false);
  const validateUsername = () => {
    let re = /^[a-zA-z][A-Za-z0-9]+$/;
    if (!username) {
      setUsernameError('Please fill in username');
      return false;
    } else if (username.length < 6) {
      setUsernameError('Username has at least 6 characters');
      return false;
    } else if (!re.test(username)) {
      setUsernameError('Username has only alphanumeric characters');
      return false;
    }

    //Validate username form server if existed set error and return false;
    setUsernameError(null);
    return true;
  };

  const validatePassword = () => {
    let re = /[A-Za-z0-9]+/;
    if (!password) {
      setPasswordError('Please fill in password');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password has at least 6 characters');
      return false;
    } else if (!re.test(password)) {
      setPasswordError('Password has only alphabet and number characters');
      return false;
    }

    setPasswordError(null);
    return true;
  };

  const validateEmail = () => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email) {
      setEmailError('Please fill in email');
      return false;
    } else if (!re.test(email)) {
      setEmailError('Wrong email format');
      return false;
    }

    //Validate email from server if existed set error and return false;
    setEmailError(null);
    return true;
  };

  const validateConfirm = () => {
    if (confirm !== password) {
      setConfirmError('Wrong confirm password');
      return false;
    }

    setConfirmError(null);
    return true;
  };

  const validateData = () => {
    let vUsername = validateUsername();
    let vEmail = validateEmail();
    let vPassword = validatePassword();
    let vConfirm = validateConfirm();
    return vUsername && vEmail && vPassword && vConfirm;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title section */}
      <View style={styles.title_wrapper}>
        <View>
          <Text style={styles.title_primary}>Create</Text>
          <Text style={styles.title_secondary}>an account</Text>
        </View>
        <Image source={icons.logo} resizeMode="contain" style={styles.logo} />
      </View>
      {/* Input section */}
      <View style={styles.input_wrapper}>
        {/* Username */}
        <Input
          name="Username"
          placeholder="Username"
          icon={icons.user_profile}
          value={username}
          error={usernameError}
          setValue={setUsername}
          setError={setUsernameError}
        />
        {/* Email */}
        <Input
          name="Email"
          placeholder="Email"
          icon={icons.message}
          value={email}
          error={emailError}
          setValue={setEmail}
          setError={setEmailError}
        />

        {/* Password */}
        <Input
          name="Password"
          icon={icons.key}
          value={password}
          error={passwordError}
          placeholder="******"
          setValue={setPassword}
          setError={setPasswordError}
          isSecure={true}
        />

        {/* Confirm password */}
        <Input
          name="Confirm password"
          placeholder="******"
          icon={icons.confirm}
          value={confirm}
          error={confirmError}
          setValue={setConfirm}
          setError={setConfirmError}
          isSecure={true}
        />
        {/* Buttons */}
        <TouchableOpacity
          style={styles.button_primary}
          onPress={async () => {
            let success = validateData();
            if (success) {
              setIndicatorVisibility(true);
              let userController = new UserController(username);
              let response = await userController.signup(
                username,
                password,
                email,
              );
              let data = await response.json();
              if (data.message === 'Signup success!') {
                navigation.navigate('SignupSuccessful', {
                  username: username,
                });
              } else {
                setConfirmError(data.message);
                setIndicatorVisibility(false);
              }
            } else {
              return;
            }
          }}>
          {isIndicatorVisible ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.text_primary}>Sign up</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button_secondary}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.text_secondary}>Log in</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },

  // Title section
  title_wrapper: {
    width: 700 * ratioWidth,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title_primary: {
    ...FONTS.title_primary,
    ...FONTS.h1,
  },
  title_secondary: {
    ...FONTS.h3,
    ...FONTS.title_secondary,
  },
  logo: {
    width: 200 * ratioWidth,
    height: 200.97 * ratioHeight,
  },

  // Input section
  input_wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  //Button
  link_text: {
    ...FONTS.h5,
    ...FONTS.link,
    marginTop: 12 * ratioHeight,
  },
  button_primary: {
    width: 700 * ratioWidth,
    height: 125 * ratioHeight,
    backgroundColor: COLORS.button_primary,
    borderRadius: 30 * ratioHeight,
    ...STYLE.shadow,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12 * ratioHeight,
  },
  text_primary: {
    color: COLORS.white,
    ...FONTS.h3,
  },
  text_secondary: {
    color: COLORS.heading,
    ...FONTS.h3,
  },
  button_secondary: {
    paddingHorizontal: 10,
  },

  // Image section
  image: {
    width: 1030 * ratioWidth,
    height: 495.4 * ratioHeight,
  },
});

export default Signup;
