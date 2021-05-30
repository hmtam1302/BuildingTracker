import React from 'react';
import {View, Text} from 'react-native';

import {TempController} from '../data';

const Test = () => {
  const tempController = new TempController();
  let ok = tempController.fetchData().then(data => console.log(data));
  return (
    <View>
      <Text>Test</Text>
    </View>
  );
};

export default Test;
