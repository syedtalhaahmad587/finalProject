import React from 'react';
import HomeScreen from '../container/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import SelectDropdown from "../screens/SelectDropdown";
import DrawerNavigator from "../navigation/AppStack";
import DeniedByDeviceScreen from '../screens/DeniedByDeviceScreen';
import DeniedByCardholder from '../screens/DeniedByCardholder';
import DoorAlarm from '../screens/DoorAlarm';
import DevicesActivity from '../screens/DevicesActivity';
import AttendanceAnalysis from '../screens/AttendanceAnalysis';
import AbsenteesPeople from '../screens/AbsenteesPeople';
import UserGuide from '../screens/UserGuide';
import Feedback from '../screens/Feedback';
import SettingsScreen from '../screens/SettingsScreen';
import PrivacyStatments from '../screens/PrivacyStatments';
import AboutScreen from '../screens/AboutScreen';
import RegistrationScreen  from '../screens/RegistrationScreen';
import EmergencyEquationComponent from '../screens/EmergencyEquationComponent';
import DoorManagement from '../screens/DoorManagement';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import ClaimHome from '../screens/ClaimHome/ClaimHome';
import AddHome from '../screens/AddHome/addhome';
import VerifyAddressScreen from '../screens/VerifyAddressScreen/VerifyAddressScreen';
import HomeInformation from '../screens/HomeInformation/HomeInformation';
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    
    <Stack.Navigator >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SelectDropdown" component={SelectDropdown} options={{ headerShown: false }} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="EmergencyEquation" component={EmergencyEquationComponent} />
      <Stack.Screen name="DoorManagement" component={DoorManagement} />
      <Stack.Screen name="AccessDeniedByDevice" component={DeniedByDeviceScreen} />
      <Stack.Screen name="AccessDeniedByCardholder" component={DeniedByCardholder} />
      <Stack.Screen name="DoorAlarms" component={DoorAlarm} />
      <Stack.Screen name="DevicesActivity" component={DevicesActivity} />
      <Stack.Screen name="AttendanceAnalysis" component={AttendanceAnalysis} />
      <Stack.Screen name="AbsenteesPeople" component={AbsenteesPeople} />
      <Stack.Screen name="User Guide" component={UserGuide} />
      <Stack.Screen name="Feed back" component={Feedback} />
      <Stack.Screen name="Settings" component={ChatScreen} />
      <Stack.Screen name="AddHome" component={ClaimHome} />
      <Stack.Screen name="ClaimHome" component={AddHome} />
      <Stack.Screen name="VerifyAddressScreen" component={VerifyAddressScreen} />
      <Stack.Screen name="Privacy Statments" component={PrivacyStatments} />
      <Stack.Screen name="About Screen" component={AboutScreen} />
      <Stack.Screen name="HomeInformation" component={HomeInformation} />
      <Stack.Screen name="Request User Registration" component={RegistrationScreen} options={{ headerShown: true }} />
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;