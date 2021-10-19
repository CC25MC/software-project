import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, FONTS, Colors } from "@/theme";
import AppLoading from 'expo-app-loading';
import { useAuth } from '@/hooks';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import LandingContainer from "@/screens/Landing";
import LoginContainer from "./src/screens/LogIn";
import SignUpContainer from "./src/screens/SignUp";
import ResetContainer from "./src/screens/Reset";
import HomeContainer from "./src/screens/Home";
import SettingsContainer from "./src/screens/Settings";

const linking = {
  prefixes: ["", ""],
  config: {
    screens: {
      ["Landing"]: "Landing",
      ["Login"]: "Login",
      ["SingUp"]: "SingUp",
      ["Reset"]: "Reset",
      ["Dashboard"]: {
        path: "Dashboard",
        screens: {
          ["Inicio"]: {
            path: "/inicio",
            exact: true
          },
          ["Ajustes"]: {
            path: "/Ajustes",
            exact: true
          },
        }
      },
    }
  },
};

export default function App() {
  const [fontsLoaded] = useFonts(FONTS);
  const { user } = useAuth();
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (<NavigationContainer linking={linking}>
    <Stack.Navigator initialRouteName={user?.role === "authenticated" ? "Dashboard" : "Landing"} screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Landing" component={LandingContainer} />
      <Stack.Screen name="Login" component={LoginContainer} />
      <Stack.Screen name="SingUp" component={SignUpContainer} />
      <Stack.Screen name="Reset" component={ResetContainer} />
      <Stack.Screen name="Dashboard">
        {() => {
          return <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Inicio') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'Ajustes') {
                iconName = focused ? 'settings' : 'settings-outline';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: 'gray',
            headerShown: false
          })}>
            <Tab.Screen name="Inicio" component={HomeContainer} />
            <Tab.Screen name="Ajustes" component={SettingsContainer} />
          </Tab.Navigator>
        }}

      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>);
}