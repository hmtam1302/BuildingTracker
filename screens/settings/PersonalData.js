import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {COLORS, SIZES, icons, ratioWidth, ratioHeight} from '../../constants';

import {Header, DataField} from './components';

const PersonalData = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header name="Personal Data" />

      {/* Avatar */}
      <View style={styles.avt_container}>
        <View style={styles.avt_wrapper}>
          <Image
            source={icons.programmer}
            resizeMode="contain"
            style={styles.avt}
          />
        </View>

        <TouchableOpacity style={styles.avt_button}>
          <Image
            source={icons.picture}
            resizeMode="contain"
            style={styles.avt_button_icon}
          />
        </TouchableOpacity>
      </View>

      {/* Data fields */}
      <View style={styles.data_field_container}>
        <DataField name="Full name" />
        <DataField name="Email" />
        <DataField name="Phone" />
        <DataField name="Birthday" />
        <DataField name="Password" />
        <DataField name="Floor" />
        <DataField name="Role" hasIcon={false} />
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

  //Avatar
  avt_container: {
    width: 256 * ratioWidth,
    height: 332 * ratioHeight,
  },
  avt_wrapper: {
    borderTopLeftRadius: 25 * ratioWidth,
    borderTopRightRadius: 25 * ratioWidth,
    backgroundColor: COLORS.primary,
  },
  avt: {
    width: 256 * ratioWidth,
    height: 256 * ratioHeight,
  },

  avt_button: {
    borderBottomLeftRadius: 25 * ratioWidth,
    borderBottomRightRadius: 25 * ratioWidth,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avt_button_icon: {
    width: 64 * ratioWidth,
    height: 64 * ratioHeight,
  },

  //Data fields
  data_field_container: {
    width: SIZES.windowWidth - 20 * 2,
  },
});

export default PersonalData;
