import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  COLORS,
  SIZES,
  icons,
  ratioWidth,
  ratioHeight,
  FONTS,
} from '../../../constants';

const DataField = ({name, hasIcon = true}) => {
  const [isInputEditable, setInputEditability] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>

      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          placeholder="Huỳnh Công Hải"
          editable={isInputEditable}
        />
        <TouchableOpacity onPress={() => setInputEditability(!isInputEditable)}>
          {hasIcon && (
            <Image
              source={!isInputEditable ? icons.edit : icons.checkmark}
              resizeMode="contain"
              style={styles.button_icon}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    marginVertical: 11 * ratioHeight,
  },

  input_container: {
    marginRight: 10 * ratioWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    color: COLORS.heading,
    ...FONTS.h4,
  },

  input: {
    borderRadius: 25 * ratioWidth,
    borderWidth: 1,
    borderColor: COLORS.gray,
    width: SIZES.windowWidth - 40 * 2,
    height: 100 * ratioHeight,
  },

  button_icon: {
    width: 64 * ratioWidth,
    height: 64 * ratioWidth,
  },
});

export default DataField;
