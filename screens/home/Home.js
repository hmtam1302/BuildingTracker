/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, Alert} from 'react-native';
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

const Home = ({route, navigation}) => {
  const getCurrent = () => {
    let current = new Date();
    let year = current.getFullYear();
    let month = current.getMonth() + 1;
    let date = current.getDate();

    let hour = current.getHours();
    let minute = current.getMinutes();
    let second = current.getSeconds();
    return `${hour}:${minute}${second} ${date}-${month}-${year}`;
  };

  const username = route.params.username;
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
      new UserController(username).sendNotification(
        'Warning',
        type,
        getCurrent(),
      );
      return 'Alert';
    } else {
      //Send data to speaker
      let controller = new BaseController();
      controller.sendFeedData('100');
      new UserController(username).sendNotification(
        'Danger',
        type,
        getCurrent(),
      );
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
      let controller = new BaseController();
      controller.sendFeedData('0');
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
        console.log(temp);
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
