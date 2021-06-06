import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {COLORS, SIZES, icons, ratioWidth, ratioHeight} from '../../constants';

import {Header, NotificationField} from './components';

const Notification = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header name="Notification" navigation={navigation} />

      {/* Avatar */}
      <Image source={icons.logo} resizeMode="contain" style={styles.logo} />

      {/* Notification fields */}
      <View style={styles.notification_field_container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.button_text}>Mark all as read</Text>
        </TouchableOpacity>

        <ScrollView style={styles.notification_container}>
          <NotificationField
            type="Warning"
            detail="Temperature is high"
            time="18:30 - 02/06/2021"
            status={false}
          />
          <NotificationField
            type="Warning"
            detail="Temperature is high"
            time="18:30 - 02/06/2021"
            status={false}
          />
          <NotificationField
            type="Danger"
            detail="Temperature is dangerous"
            time="18:30 - 02/06/2021"
            status={true}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    flex: 1,
  },

  //Logo
  logo: {
    width: 256 * ratioWidth,
    height: 256 * ratioHeight,
  },

  //Data fields
  notification_field_container: {
    width: SIZES.windowWidth - 20 * 2,
    alignItems: 'flex-end',
  },

  //Button
  button_text: {
    fontSize: 30 * ratioHeight,
    fontFamily: 'Roboto-Bold',
    color: COLORS.primary,
  },
});

export default Notification;
