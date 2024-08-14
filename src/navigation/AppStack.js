import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../container/CustomDrawer';
import Dashboard from '../screens/Dashboard';
import AccessControlsInsights from '../screens/AccessControlsInsights';
import AttendanceAnalysis from '../screens/AttendanceAnalysis';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen  from "../screens/AboutScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: '#00544d',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: 0,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      {/* <Drawer.Screen name="Access Controls Insights" component={AccessControlsInsights} />
      <Drawer.Screen name="AttendanceAnalysis" component={AttendanceAnalysis} /> */}
      {/* <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
      {/* <Drawer.Screen name="About" component={AboutScreen} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
