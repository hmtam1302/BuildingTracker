import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Landing,
  Login,
  ForgotPassword,
  SendEmail,
  Signup,
  SignupSuccessful,
  Statistics,
} from './screens';

import {Tabs} from './components';

const Stack = createStackNavigator();

const App = () => {
  const [plash, setPlash] = useState(true);

  useEffect(() => {
    setTimeout(() => setPlash(false), 2000);
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={plash ? 'Landing' : 'Home'}>
        <Stack.Screen
          name={plash ? 'Landing' : 'Home'}
          component={plash ? Landing : Tabs}
        />

        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="SendEmail" component={SendEmail} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SignupSuccessful" component={SignupSuccessful} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
