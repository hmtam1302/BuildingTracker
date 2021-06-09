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

const DataField = ({name, value, hasIcon = true, type, sendData}) => {
  //Validate data (improve later)
  const validateData = () => {
    switch (type) {
      case 'full_name':
        let re = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g;
        if (re.test(data)) {
          return true;
        } else {
          setError('Full name contain characters only');
          return false;
        }
      case 'email':
        re = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (!data) {
          setError('Please fill in email!');
          return false;
        }
        if (!re.test(data)) {
          setError('Wrong email format');
          return false;
        }
        return true;
      case 'phone':
        re = /0[0-9]{8}/;
        if (!re.test(data)) {
          setError('Wrong number phone format');
          return false;
        }
        return true;
      case 'birthday':
        re = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        if (!re.test(data)) {
          setError('Wrong date format');
          return false;
        }
        return true;
      case 'floor':
        re = /[0-3]/;
        if (!re.test(data)) {
          setError('Please select from 0-3');
          return false;
        }
        return true;
    }
    return true;
  };
  const [isInputEditable, setInputEditability] = useState(false);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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
    text_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    error: {
      color: COLORS.error,
      ...FONTS.text,
      marginRight: 50,
      fontFamily: 'Roboto-Italic',
    },
    name: {
      color: COLORS.heading,
      ...FONTS.h4,
    },

    input: {
      borderRadius: 25 * ratioWidth,
      borderWidth: 1,
      borderColor: COLORS.gray,
      color: '#000',
      width: SIZES.windowWidth - 40 * 2,
      height: 100 * ratioHeight,
      backgroundColor: isInputEditable ? COLORS.white : COLORS.grey,
    },

    button_icon: {
      width: 64 * ratioWidth,
      height: 64 * ratioWidth,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.text_container}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.error}>{error}</Text>
      </View>

      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          value={data ? data : value ? value + '' : ''}
          editable={isInputEditable}
          onChangeText={text => setData(text)}
        />
        <TouchableOpacity
          onPress={() => {
            if (!isInputEditable) {
              setInputEditability(!isInputEditable);
            } else {
              if (validateData()) {
                sendData(type, data);
                setInputEditability(!isInputEditable);
              }
            }
          }}>
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

export default DataField;
