// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import LanguageScreen from './LanguageScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <>
    {/* <HomeScreen /> */}
    {/* <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
    </Stack.Navigator> */}
</>
);
};

export default AppNavigator;
