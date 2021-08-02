/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, Alert, Platform} from 'react-native';
import {icons, COLORS} from '../../constants';

import Element from './Element';
import {Header} from '../../components';

import {
  BaseController,
  TempController,
  NoiseController,
  GasController,
  DATA,
  UserController,
  SystemController,
} from '../../data';

//Push notification
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel(
  {
    channelId: 'notification', // (required)
    channelName: 'My Notification Channel', // (required)
    channelDescription: 'A channel to push your notifications', // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

const pushNotification = (msg, type) => {
  PushNotification.localNotification({
    channelId: 'notification', // (required) channelId, if the channel doesn't exist, notification will not trigger.
    title: `${msg}`, // (optional)
    message: `${type} is ${msg === 'Warning' ? 'high' : 'dangerous'}!!!`, // (required)
  });
};

const Home = ({route, navigation}) => {
  const [settings, setSettings] = useState(null);
  const getCurrent = () => {
    let current = new Date();
    let year = current.getFullYear();
    let month = current.getMonth() + 1;
    let date = current.getDate();

    let hour = current.getHours();
    let minute = current.getMinutes();
    let second = current.getSeconds();
    return `${hour}:${minute}:${second} ${date}-${month}-${year}`;
  };

  const username = route.params.username;
  //Get user settings
  useEffect(() => {
    new UserController(route.params.username).getSettings().then(res => {
      setSettings(res);
    });
    const interval = setInterval(() => {
      new UserController(route.params.username).getSettings().then(res => {
        setSettings(res);
      });
    }, DATA.TIME_REQUEST * 1000);

    return () => clearInterval(interval);
  }, []);

  const createAlert = type => {
    Alert.alert('Danger', `${type} is dangerous`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK'},
    ]);
  };
  //Get status of value
  const getStatus = (value, limit, type) => {
    if (value / limit < 0.75) {
      return 'Normal';
    } else if (value / limit >= 0.75 && value / limit < 0.9) {
      //Send notification
      if (settings.notification) {
        pushNotification('Warning', type);
      }
      new UserController(username).sendNotification(
        'Warning',
        type,
        getCurrent(),
      );

      //Send mail
      if (settings.email) {
        new UserController(username).sendMail('Warning', type);
      }
      return 'Alert';
    } else {
      //Send data to speaker
      // let controller = new BaseController();
      //controller.sendFeedData('100'); //uncomment this code after insert key for sending to feed
      if (settings.notification) {
        pushNotification('Danger', type);
      }
      new UserController(username).sendNotification(
        'Danger',
        type,
        getCurrent(),
      );

      //Send mail
      if (settings.email) {
        new UserController(username).sendMail('Danger', type);
      }
      createAlert(type);
      return 'Danger';
    }
  };

  //If nothing is dangerous, send feed to speaker
  useEffect(() => {
    if (
      temp.status !== 'Danger' &&
      noise.status !== 'Danger' &&
      gas.status !== 'Danger'
    ) {
      //let controller = new BaseController();
      //controller.sendFeedData('0'); //Need to uncomment after include key
    }
  });

  //Fetch temperature data
  const [temp, setTemp] = useState({
    limit: 9999,
    current: 0,
    status: 'Normal',
    detail: 'None',
  });
  useEffect(() => {
    const tempController = new TempController();
    const systemController = new SystemController();
    systemController.getValue().then(value => {
      let data = value.system.temperature;
      tempController.fetchFeedData().then(res => {
        let obj = JSON.parse(res.last_value).data;
        setTemp({
          limit: data,
          current: obj.split('-')[0],
          status: getStatus(obj.split('-')[0], data, 'Temperature'),
          detail: 'None',
        });
      });
    });
    const interval = setInterval(() => {
      systemController.getValue().then(value => {
        let data = value.system.temperature;
        tempController.fetchFeedData().then(res => {
          let obj = JSON.parse(res.last_value).data;
          setTemp({
            limit: data,
            current: obj.split('-')[0],
            status: getStatus(obj.split('-')[0], data, 'Temperature'),
            detail: 'None',
          });
        });
      });
    }, DATA.TIME_REQUEST * 1000);

    return () => clearInterval(interval);
  }, []);

  //Fetch noise controller
  const [noise, setNoise] = useState({
    limit: 9999,
    current: 0,
    status: 'Normal',
    detail: 'None',
  });
  useEffect(() => {
    const noiseController = new NoiseController();
    const systemController = new SystemController();
    systemController.getValue().then(value => {
      let data = value.system.noise;
      noiseController.fetchFeedData().then(res => {
        let obj = JSON.parse(res.last_value).data;
        setNoise({
          limit: data,
          current: obj,
          status: getStatus(obj, data, 'Noise'),
          detail: 'None',
        });
      });
    });
    const interval = setInterval(() => {
      systemController.getValue().then(value => {
        let data = value.system.noise;
        noiseController.fetchFeedData().then(res => {
          let obj = JSON.parse(res.last_value).data;
          setNoise({
            limit: data,
            current: obj,
            status: getStatus(obj, data, 'Noise'),
            detail: 'None',
          });
        });
      });
    }, DATA.TIME_REQUEST * 1000);

    return () => clearInterval(interval);
  }, []);

  //Fetch gas data
  const [gas, setGas] = useState({
    limit: 9999,
    current: 0,
    status: 'Normal',
    detail: 'None',
  });
  useEffect(() => {
    const gasController = new GasController();
    const systemController = new SystemController();
    systemController.getValue().then(value => {
      let data = value.system.gas;
      gasController.fetchFeedData().then(res => {
        let obj = JSON.parse(res.last_value).data;
        setGas({
          limit: data,
          current: obj,
          status: getStatus(obj, data, 'Gas'),
          detail: 'None',
        });
      });
    });
    const interval = setInterval(() => {
      systemController.getValue().then(value => {
        let data = value.system.gas;
        gasController.fetchFeedData().then(res => {
          let obj = JSON.parse(res.last_value).data;
          setGas({
            limit: data,
            current: obj,
            status: getStatus(obj, data, 'Gas'),
            detail: 'None',
          });
        });
      });
    }, DATA.TIME_REQUEST * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header username={username} navigation={navigation} />
      {/* Main section */}
      <View style={styles.main_section}>
        <View style={styles.element}>
          <Element
            name="Temperature"
            color={COLORS.darkgreen}
            icon={icons.thermometer}
            value={temp}
          />
          <Element
            name="Noise"
            color={COLORS.darkblue}
            icon={icons.noise}
            value={noise}
          />
          <Element
            name="Gas Density"
            color={COLORS.darkred}
            icon={icons.gas}
            value={gas}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingTop: 20,
  },
});

export default Home;
