import React, {useState} from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import {COLORS, ratioWidth, ratioHeight, FONTS} from '../../../constants';

const SettingField = ({name, icon, hasIconText = true, hasIcon}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity style={styles.button_wrapper}>
        {hasIcon ? (
          <Image source={icon} resizeMode="contain" style={styles.button} />
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
