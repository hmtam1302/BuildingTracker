import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';

import {COLORS, SIZES, icons, ratioWidth, ratioHeight} from '../../constants';

import {Header, DataField} from './components';
import {UserController} from '../../data';

const PersonalData = ({route, navigation}) => {
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
      <Header name="Personal Data" navigation={navigation} />
      {/* Avatar */}
      {isIndicatorVisible ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <>
          <View style={styles.avt_container}>
            <View style={styles.avt_wrapper}>
              <Image
                source={icons.programmer}
                resizeMode="contain"
                style={styles.avt}
              />
            </View>
          </View>
          <View style={styles.data_field_container}>
            <DataField
              name="Full name"
              value={user.full_name}
              type="full_name"
              sendData={sendPersonalData}
            />
            <DataField
              name="Email"
              value={user.email}
              type="email"
              sendData={sendPersonalData}
            />
            <DataField
              name="Phone"
              value={user.phone}
              type="phone"
              sendData={sendPersonalData}
            />
            <DataField
              name="Birthday"
              value={user.birthday}
              type="birthday"
              sendData={sendPersonalData}
            />
            <DataField
              name="Floor"
              value={user.floor}
              type="floor"
              sendData={sendPersonalData}
            />
            <DataField name="Role" hasIcon={false} value={user.role} />
            <View style={styles.button_container}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate('ChangePassword', {
                    username: route.params.username,
                  })
                }>
                <Text style={styles.button_text}>Change password</Text>
              </TouchableOpacity>
              {user.role === 'admin' && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate('ChangeLimit', {
                      username: route.params.username,
                    })
                  }>
                  <Text style={styles.button_text}>Change limit</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </>
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

  //Avatar
  avt_container: {
    width: 256 * ratioWidth,
    height: 332 * ratioHeight,
  },
  avt_wrapper: {
    borderRadius: 25 * ratioWidth,
    backgroundColor: COLORS.primary,
  },
  avt: {
    width: 256 * ratioWidth,
    height: 256 * ratioHeight,
  },

  //Data fields
  data_field_container: {
    width: SIZES.windowWidth - 20 * 2,
  },

  //Button field
  button_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
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
    fontFamily: 'Roboto-Regular',
  },
});

export default PersonalData;
