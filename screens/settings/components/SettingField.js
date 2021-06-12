import React, {useState} from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import {COLORS, ratioWidth, ratioHeight, FONTS} from '../../../constants';
import RNRestart from 'react-native-restart';

const SettingField = ({
  name,
  icon,
  type,
  value,
  sendData,
  hasIconText = true,
  hasIcon,
}) => {
  const [isEnabled, setIsEnabled] = useState(value);
  const toggleSwitch = () => {
    sendData('settings', {[type]: !isEnabled});
    setIsEnabled(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity style={styles.button_wrapper}>
        {hasIcon ? (
          <TouchableOpacity
            onPress={() => {
              if (type === 'log_out') {
                Alert.alert('Alert', 'Wanna log out?', [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => RNRestart.Restart()},
                ]);
              } else {
                Alert.alert('Success', 'The latest version!', [{text: 'OK'}]);
              }
            }}>
            <Image source={icon} resizeMode="contain" style={styles.button} />
          </TouchableOpacity>
        ) : (
          <View style={styles.toggle}>
            <Switch
              trackColor={{false: COLORS.grey, true: COLORS.cyan}}
              thumbColor={isEnabled ? COLORS.primary : COLORS.heading}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        )}
        {hasIconText && <Text>On</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    marginVertical: 33 * ratioHeight,
    borderBottomWidth: 1,
    borderColor: COLORS.grey,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  name: {
    ...FONTS.h3,
    color: COLORS.heading,
  },
  button_wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 128 * ratioWidth,
    height: 128 * ratioHeight,
  },
});

export default SettingField;
