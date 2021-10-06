import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, FONTS } from "@/theme";
import AppLoading from 'expo-app-loading';

const Stack = createStackNavigator();

import LandingContainer from "@/screens/Landing";
import LoginContainer from "./src/screens/LogIn";
import SignUpContainer from "./src/screens/SignUp";

const linking = {
  prefixes: ["", ""],
  config: {
    screens: {
      ["Landing"]: "Landing",
      ["Login"]: "Login",
      ["SingUp"]: "SingUp",
    }
  },
};

export default function App() {
  const [fontsLoaded] = useFonts(FONTS);
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Landing" screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Landing" component={LandingContainer} />
        <Stack.Screen name="Login" component={LoginContainer} />
        <Stack.Screen name="SingUp" component={SignUpContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}