import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/language/i18n';
import Splash from './src/screens/SplashScreen';
import AuthStack from './src/navigation/AuthStack';
import AppStack from "./src/navigation/AppStack";
import AppProvider from "./src/Context/AppContext"; // Import the context provider

const Stack = createStackNavigator();

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate asynchronous initialization
    setTimeout(() => {
      SplashScreen.hide();
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <AppProvider>
          {loading ? (
            <Splash />
          ) : (
            <SafeAreaProvider>
              <NavigationContainer>
                <AuthStack />
              </NavigationContainer>
            </SafeAreaProvider>
            // <SelectDropdown />
          )}
        </AppProvider>
      </I18nextProvider>
    </>
  );
}

export default App;
