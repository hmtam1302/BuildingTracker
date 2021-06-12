import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import {
  FONTS,
  SIZES,
  COLORS,
  icons,
  ratioWidth,
  ratioHeight,
} from '../../../constants';

const NotificationField = ({
  id,
  status,
  element,
  time,
  isRead,
  onMarkAsRead,
  onDelete,
}) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: isRead ? COLORS.white : COLORS.grey,
      width: SIZES.windowWidth - 20 * 2,
      borderRadius: 25 * ratioWidth,
      borderColor: COLORS.grey,
      borderWidth: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      paddingHorizontal: 20,
      marginVertical: 10,
    },

    icon: {
      width: 64 * ratioWidth,
      height: 64 * ratioHeight,
    },

    detail_container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    header_container: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    heading: {
      ...FONTS.h4,
      color: COLORS.heading,
    },
    detail: {
      ...FONTS.h4,
      fontFamily: 'Roboto-Regular',
    },
    time: {
      ...FONTS.text,
    },
    close_button: {
      width: 32 * ratioWidth,
      height: 32 * ratioHeight,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={() => onMarkAsRead(id)}>
      <Image
        source={status === 'Warning' ? icons.warning : icons.danger}
        resizeMode="contain"
        style={styles.icon}
      />
      <View style={styles.detail_container}>
        <View style={styles.header_container}>
          <Text style={styles.heading}>{status}: </Text>
          <Text style={styles.detail}>
            {`${element} is ${status === 'Warning' ? 'high' : 'dangerous'}`}!
          </Text>
        </View>
        <Text style={styles.time}>{time}</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(id)}>
        <Image
          style={styles.close_button}
          resizeMode="contain"
          source={icons.close}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default NotificationField;
