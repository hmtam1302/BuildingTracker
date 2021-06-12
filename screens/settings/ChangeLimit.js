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
import {SystemController} from '../../data';

import RNRestart from 'react-native-restart';

const ChangeLimit = ({route, navigation}) => {
  const [values, setValues] = React.useState({
    temperature: '-',
    noise: '-',
    gas: '-',
  });
  const [temperature, setTemperature] = React.useState(null);
  const [noise, setNoise] = React.useState(null);
  const [gas, setGas] = React.useState(null);
  const [error, setError] = React.useState(null);

  const [isIndicatorVisible, setIndicatorVisibility] = React.useState(false);

  //Get current value
  React.useEffect(() => {
    const getValue = async () => {
      console.log('Data');
      let response = await new SystemController().getValue();
      let data = await response.json();
      data = data.system;
      setTemperature(data.temperature);
      setNoise(data.noise);
      setGas(data.gas);
      setValues(data);
    };
    if (!temperature && !noise && !gas) {
      getValue();
    }
  }, [gas, noise, temperature, values]);

  //Validate value
  const validateTemperature = () => {
    if (!temperature || !(temperature >= 35 && temperature <= 45)) {
      setError('Please input temperature from 35 to 45');
      return false;
    }
    return true;
  };

  //Validate noise
  const validateNoise = () => {
    if (!noise || !(noise >= 500 && noise <= 1000)) {
      setError('Please input noise from 500 to 1000');
      return false;
    }
    return true;
  };

  //Validate noise
  const validateGas = () => {
    let re = /[0-9.]+/;
    if (!gas || (gas <= 0 && gas >= 1) || !re.test(gas)) {
      setError('Please input gas from 0 to 1');
      return false;
    }
    return true;
  };

  //Change password
  const changeLimit = async () => {
    console.log(temperature);
    console.log(noise);
    console.log(gas);
    setIndicatorVisibility(true);
    setError(null);
    if (validateTemperature() && validateNoise() && validateGas()) {
      //Change value
      await new SystemController().updateValue(
        route.params.username,
        temperature,
        noise,
        gas,
      );
      Alert.alert(
        'Success',
        'Change system limit values success!\nPlease login again!',
        [{text: 'OK', onPress: () => RNRestart.Restart()}],
      );
    }
    setIndicatorVisibility(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header name="Change limit" navigation={navigation} />
      <View style={styles.input_field_container}>
        <InputField
          name="Temperature"
          onSetValue={setTemperature}
          placeholder={values.temperature}
        />
        <InputField
          name="Noise"
          onSetValue={setNoise}
          placeholder={values.noise}
        />
        <InputField
          name="Gas density"
          onSetValue={setGas}
          placeholder={values.gas}
        />
      </View>
      <Text style={styles.error_text}>{error}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => await changeLimit()}>
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

export default ChangeLimit;
