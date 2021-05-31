import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
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
      let controller = new BaseController();
      //controller.sendFeed('Test').then(res => console.log(res));
      return 'Danger';
    }
  };

  //Fetch temperature data
  const [temp, setTemp] = useState({
    limit: DATA.TEMP_LIMIT,
    current: 0,
    status: 'Normal',
    detail: 'None',
  });
  useEffect(() => {
    const tempController = new TempController();
    tempController.fetchData().then(res => {
      let obj = JSON.parse(res.last_value).data;
      setTemp({
        limit: DATA.TEMP_LIMIT,
        current: obj.split('-')[0],
        status: getStatus(obj.split('-')[0], DATA.TEMP_LIMIT),
        detail: 'None',
      });
    });
    const interval = setInterval(() => {
      tempController.fetchData().then(res => {
        let obj = JSON.parse(res.last_value).data;
        setTemp({
          limit: DATA.TEMP_LIMIT,
          current: obj.split('-')[0],
          status: getStatus(obj.split('-')[0], DATA.TEMP_LIMIT),
          detail: 'None',
        });
      });
    }, 60 * 1000);

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
    noiseController.fetchData().then(res => {
      let obj = JSON.parse(res.last_value).data;
      setNoise({
        limit: DATA.NOISE_LIMIT,
        current: obj,
        status: getStatus(obj, DATA.NOISE_LIMIT),
        detail: 'None',
      });
    });
    const interval = setInterval(() => {
      noiseController.fetchData().then(res => {
        let obj = JSON.parse(res.last_value).data;
        setNoise({
          limit: DATA.NOISE_LIMIT,
          current: obj,
          status: getStatus(obj, DATA.NOISE_LIMIT),
          detail: 'None',
        });
      });
    }, 60 * 1000);

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
    gasController.fetchData().then(res => {
      let obj = JSON.parse(res.last_value).data;
      setGas({
        limit: DATA.GAS_LIMIT,
        current: obj,
        status: getStatus(obj, DATA.GAS_LIMIT),
        detail: 'None',
      });
    });
    const interval = setInterval(() => {
      gasController.fetchData().then(res => {
        let obj = JSON.parse(res.last_value).data;
        setGas({
          limit: DATA.GAS_LIMIT,
          current: obj,
          status: getStatus(obj, DATA.GAS_LIMIT),
          detail: 'None',
        });
      });
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
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
    </View>
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
