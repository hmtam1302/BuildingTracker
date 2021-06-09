import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {COLORS, SIZES, icons, ratioWidth, ratioHeight} from '../../constants';

import {Header, SettingField} from './components';
import {UserController} from '../../data';

const Setting = ({route, navigation}) => {
  //Get USER DATA
  const [user, setUser] = React.useState(null);
  const [isIndicatorVisible, setIndicatorVisibility] = React.useState(true);
  React.useEffect(() => {
    const getData = async () => {
      const response = await new UserController(
        route.params.username,
      ).getData();
      const data = await response.json();
      setUser(data);
      setIndicatorVisibility(false);
    };
    getData();
  }, [route.params.username]);

  //Send USER DATA
  const sendPersonalData = async (type, value) => {
    let response = await new UserController(route.params.username).update(
      type,
      value,
    );
    let data = response.json();
    return data;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header name="Setting" navigation={navigation} />

      {/* Logo */}
      <Image source={icons.logo} resizeMode="contain" style={styles.logo} />

      {/* Data fields */}
      {isIndicatorVisible ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <View style={styles.setting_field_container}>
          <SettingField
            name="Notification"
            hasIcon={false}
            value={user.settings.notification}
            type="notification"
            sendData={sendPersonalData}
          />
          <SettingField
            name="SMS"
            hasIcon={false}
            value={user.settings.SMS}
            type="SMS"
            sendData={sendPersonalData}
          />
          <SettingField
            name="Phone call"
            hasIcon={false}
            value={user.settings.phone_call}
            type="phone_call"
            sendData={sendPersonalData}
          />
          <SettingField
            name="Check for update"
            icon={icons.exchange}
            hasIconText={false}
            hasIcon={true}
          />
          <SettingField
            name="Log out"
            icon={icons.log_out}
            hasIconText={false}
            hasIcon={true}
          />
        </View>
      )}
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
  setting_field_container: {
    width: SIZES.windowWidth - 20 * 2,
  },
});

export default Setting;
