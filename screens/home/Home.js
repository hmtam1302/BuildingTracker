import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {icons, COLORS} from '../../constants';

import Element from './Element';
import {Header} from '../../components';

import {
  BaseController,
  TempController,
  NoiseController,
  GasController,
  DATA,
} from '../../data';

const Home = ({navigation}) => {
  //Get status of value
  const getStatus = (value, limit) => {
    if (value / limit < 0.75) {
      return 'Normal';
    } else if (value / limit >= 0.75 && value / limit < 0.9) {
      return 'Alert';
    } else {
      //Send data to speaker
      let controller = new BaseController();
      controller.sendFeedData('100');
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
    limit: DATA.TEMP_LIMIT,
    current: 0,
    status: 'Normal',
    detail: 'None',
  });
  useEffect(() => {
    const tempController = new TempController();
    tempController.fetchFeedData().then(res => {
      let obj = JSON.parse(res.last_value).data;
      setTemp({
        limit: DATA.TEMP_LIMIT,
        current: obj.split('-')[0],
        status: getStatus(obj.split('-')[0], DATA.TEMP_LIMIT),
        detail: 'None',
      });
    });
    const interval = setInterval(() => {
      tempController.fetchFeedData().then(res => {
        let obj = JSON.parse(res.last_value).data;
        setTemp({
          limit: DATA.TEMP_LIMIT,
          current: obj.split('-')[0],
          status: getStatus(obj.split('-')[0], DATA.TEMP_LIMIT),
          detail: 'None',
        });
      });
    }, DATA.TIME_REQUEST * 1000);

    return () => clearInterval(interval);
  }, []);

  //Fetch noise controller
  const [noise, setNoise] = useState({
    limit: DATA.NOISE_LIMIT,
    current: 0,
    status: 'Normal',
    detail: 'None',
  });

  useEffect(() => {
    const noiseController = new NoiseController();
    noiseController.fetchFeedData().then(res => {
      let obj = JSON.parse(res.last_value).data;
      setNoise({
        limit: DATA.NOISE_LIMIT,
        current: obj,
        status: getStatus(obj, DATA.NOISE_LIMIT),
        detail: 'None',
      });
    });
    const interval = setInterval(() => {
      noiseController.fetchFeedData().then(res => {
        let obj = JSON.parse(res.last_value).data;
        setNoise({
          limit: DATA.NOISE_LIMIT,
          current: obj,
          status: getStatus(obj, DATA.NOISE_LIMIT),
          detail: 'None',
        });
      });
    }, DATA.TIME_REQUEST * 1000);

    return () => clearInterval(interval);
  }, []);

  //Fetch gas data
  const [gas, setGas] = useState({
    limit: DATA.GAS_LIMIT,
    current: 0,
    status: 'Normal',
    detail: 'None',
  });

  useEffect(() => {
    const gasController = new GasController();
    gasController.fetchFeedData().then(res => {
      let obj = JSON.parse(res.last_value).data;
      setGas({
        limit: DATA.GAS_LIMIT,
        current: obj,
        status: getStatus(obj, DATA.GAS_LIMIT),
        detail: 'None',
      });
    });
    const interval = setInterval(() => {
      gasController.fetchFeedData().then(res => {
        let obj = JSON.parse(res.last_value).data;
        setGas({
          limit: DATA.GAS_LIMIT,
          current: obj,
          status: getStatus(obj, DATA.GAS_LIMIT),
          detail: 'None',
        });
      });
    }, DATA.TIME_REQUEST * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
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
