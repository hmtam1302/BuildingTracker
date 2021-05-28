import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {icons, COLORS} from '../../constants';

import Element from './Element';
import {Header} from '../../components';

const Home = ({navigation}) => {
  //Dummy data
  const [temp, setTemp] = useState({
    limit: 35,
    current: 27,
    status: 'Normal',
    detail: 'None',
  });

  const [gas, setGas] = useState({
    limit: 35,
    current: 27,
    status: 'Alert',
    detail: 'None',
  });

  const [noise, setNoise] = useState({
    limit: 35,
    current: 27,
    status: 'Danger',
    detail: 'None',
  });

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
