import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {COLORS, SIZES, FONTS, ratioWidth, ratioHeight} from '../../constants';

import {Header, InputField} from './components';
import {UserController} from '../../data';

import RNRestart from 'react-native-restart';

const ChangePassword = ({route, navigation}) => {
  const [oldPassword, setOldPassword] = React.useState(null);
  const [newPassword, setNewPassword] = React.useState(null);
  const [confirmPassword, setConfirmPassword] = React.useState(null);
  const [error, setError] = React.useState(null);

  const [isIndicatorVisible, setIndicatorVisibility] = React.useState(false);

  //Validate password
  const validate = (type, value) => {
    let re = /[A-Za-z0-9]+/;
    if (!value) {
      setError(`Please input ${type}`);
      return false;
    } else if (value.length < 6) {
      setError(`${type} has at least 6 characters`);
      return false;
    } else if (!re.test(value)) {
      setError(`${type} must have only alphanumeric characters`);
      return false;
    }
    return true;
  };

  //Change password
  const changePassword = async () => {
    setIndicatorVisibility(true);
    setError(null);
    if (
      validate('Old password', oldPassword) &&
      validate('New password', newPassword) &&
      validate('Confirm password', confirmPassword)
    ) {
      if (newPassword === oldPassword) {
        setError('Old password must be different from new password!');
      } else if (newPassword !== confirmPassword) {
        setError('Wrong confirm password!');
      } else {
        let response = await new UserController(
          route.params.username,
        ).changePassword(oldPassword, newPassword);
        let data = await response.json();
        if (data.message === 'Change password success!') {
          Alert.alert(
            'Success',
            'Change password success!\nPlease login again!',
            [{text: 'OK', onPress: () => RNRestart.Restart()}],
          );
        } else {
          setError(data.message);
        }
      }
    }
    setIndicatorVisibility(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header name="Change password" navigation={navigation} />
      <View style={styles.input_field_container}>
        <InputField
          name="Old password"
          isSecure={true}
          onSetValue={setOldPassword}
        />
        <InputField
          name="New password"
          isSecure={true}
          onSetValue={setNewPassword}
        />
        <InputField
          name="Confirm password"
          isSecure={true}
          onSetValue={setConfirmPassword}
        />
      </View>
      <Text style={styles.error_text}>{error}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => await changePassword()}>
        {isIndicatorVisible ? (
          <ActivityIndicator size="small" color={COLORS.white} />
        ) : (
          <Text style={styles.button_text}>Done</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    flex: 1,
  },

  //Input fields
  input_field_container: {
    width: SIZES.windowWidth - 20 * 2,
  },

  //Error text
  error_text: {
    fontFamily: 'Roboto-Italic',
    color: COLORS.error,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 20,
  },

  //Button
  button: {
    width: 400 * ratioWidth,
    height: 125 * ratioHeight,
    backgroundColor: COLORS.primary,
    borderRadius: 25 * ratioWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    color: COLORS.white,
    ...FONTS.h4,
  },
});

export default ChangePassword;
