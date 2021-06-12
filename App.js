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
  Feedbacks,
  Notification,
  ChangePassword,
  ChangeLimit,
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
        initialRouteName={plash ? 'Landing' : 'Login'}>
        <Stack.Screen
          name={plash ? 'Landing' : 'Login'}
          component={plash ? Landing : Login}
        />
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="SendEmail" component={SendEmail} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SignupSuccessful" component={SignupSuccessful} />
        <Stack.Screen name="PersonalData" component={PersonalData} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="FAQs" component={FAQs} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Feedbacks" component={Feedbacks} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="ChangeLimit" component={ChangeLimit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
