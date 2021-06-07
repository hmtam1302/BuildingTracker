import React from 'react';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
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

import {Input} from './components';
import {DATA} from '../../data';

const Login = ({navigation}) => {
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [error, setError] = React.useState(null);

  const validateData = () => {
    //Check null username or password
    if (!username) {
      setError('Please fill in username');
      return false;
    } else if (!password) {
      setError('Please fill in password');
      return false;
    }

    //Check username and password lens
    if (username.length < 6) {
      setError('Username must have at least 6 characters');
      return false;
    } else if (password.length < 6) {
      setError('Password must have at least 6 characters');
      return false;
    }

    //Check username and password regex
    let re = /[a-z]+[A-Za-z0-9]+/;
    if (!re.test(username)) {
      setError('Username must contain A-Z, a-z, 0-9');
      return false;
    } else if (!re.test(password)) {
      setError('Password must contain A-Z, a-z, 0-9');
      return false;
    }

    //Validate data from server
    setError(null);
    return true;
  };

  const [isIndicatorVisible, setIndicatorVisibility] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Title section */}
      <View style={styles.title_wrapper}>
        <View>
          <Image source={icons.logo} resizeMode="contain" style={styles.logo} />
        </View>
        <View>
          <Text style={styles.welcome_text}>Welcome to</Text>
          <View style={styles.building_tracker_text}>
            <Text style={styles.building_text}>BUILDING</Text>
            <Text style={styles.tracker_text}>TRACKER</Text>
          </View>
        </View>
      </View>

      {/* Input section */}
      <View style={styles.input_wrapper}>
        <Input
          name="Username"
          placeholder="Input your username"
          value={username}
          icon={icons.user_profile}
          setValue={setUsername}
        />
        <Input
          name="Password"
          placeholder="*********"
          value={password}
          icon={icons.key}
          setValue={setPassword}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.link_wrapper}>
          <Text style={styles.link_text}>Forgot your password?</Text>
        </TouchableOpacity>
        <View style={styles.error_wrapper}>
          <Text style={styles.error_text}>{error}</Text>
        </View>
        {/* Buttons */}
        <TouchableOpacity
          style={styles.button_primary}
          onPress={async () => {
            //Check login inputs then navigate to home screen
            let success = validateData();
            if (success) {
              setIndicatorVisibility(true);
              let response = await fetch(`${DATA.REQUEST_URL}login`, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: username,
                  password: password,
                }),
              });
              let data = await response.json();
              if (data.message === 'Login success!') {
                navigation.navigate('Home');
              } else {
                setError(data.message);
                setIndicatorVisibility(false);
              }
            } else {
              return;
            }
          }}>
          {isIndicatorVisible ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.text_primary}>Log in</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button_secondary}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.text_secondary}>Sign Up</Text>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: COLORS.white,
  },

  // Title section
  title_wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  logo: {
    width: 350 * ratioWidth,
    height: 348.06 * ratioHeight,
  },
  welcome_text: {
    color: COLORS.heading,
    ...FONTS.h3,
    ...STYLE.shadow,
  },
  building_tracker_text: {
    flexDirection: 'row',
  },
  building_text: {
    color: COLORS.title_building,
    ...FONTS.h1,
  },
  tracker_text: {
    color: COLORS.title_tracker,
    ...FONTS.h1,
  },

  // Input section
  input_wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  link_wrapper: {
    alignSelf: 'flex-start',
  },

  link_text: {
    ...FONTS.h5,
    ...FONTS.link,
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
    marginTop: 8 * ratioHeight,
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

export default Login;
