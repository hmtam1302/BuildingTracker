import React from 'react';
import {SafeAreaView, View, Image, StyleSheet} from 'react-native';

import {COLORS, SIZES, icons, ratioWidth, ratioHeight} from '../../constants';

import {Header, SettingField} from './components';

const Setting = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header name="Setting" />

      {/* Avatar */}
      <Image source={icons.logo} resizeMode="contain" style={styles.logo} />

      {/* Data fields */}
      <View style={styles.setting_field_container}>
        <SettingField name="Notification" hasIcon={false} />
        <SettingField name="SMS" hasIcon={false} />
        <SettingField name="Phone call" hasIcon={false} />
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
