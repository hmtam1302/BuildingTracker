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
  PersonalData,
  Setting,
  FAQs,
  AboutUs,
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
          component={plash ? Landing : AboutUs}
        />

        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="SendEmail" component={SendEmail} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SignupSuccessful" component={SignupSuccessful} />
        <Stack.Screen name="PersonalData" component={PersonalData} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="FAQs" component={FAQs} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
