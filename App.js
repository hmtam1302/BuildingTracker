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
  Home,
} from './screens';

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
        initialRouteName={plash ? 'Landing' : 'Login'}>
        <Stack.Screen
          name={plash ? 'Landing' : 'Login'}
          component={plash ? Landing : Signup}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="SendEmail" component={SendEmail} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SignupSuccessful" component={SignupSuccessful} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
