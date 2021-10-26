import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, FONTS, Colors } from "@/theme";
import AppLoading from 'expo-app-loading';
import { supabase } from "@/hooks";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import LandingContainer from "@/screens/Landing";
import LoginContainer from "./src/screens/LogIn";
import SignUpContainer from "./src/screens/SignUp";
import ResetContainer from "./src/screens/Reset";
import HomeContainer from "./src/screens/Home";
import SettingsContainer from "./src/screens/Settings";
import ConsejoContainer from "./src/screens/Consejo";
import ProfileContainer from "./src/screens/Profile";

const linking = {
  prefixes: ["", ""],
  config: {
    screens: {
      ["Landing"]: "Landing",
      ["Login"]: "Login",
      ["SingUp"]: "SingUp",
      ["Reset"]: "Reset",
      ["Perfil"]: "Perfil",
      ["Consejo"]: "Consejo",
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


const PublicScreens = () => {
  return <Stack.Navigator initialRouteName={"Landing"} screenOptions={{
    headerShown: false,
  }}>
    <Stack.Screen name="Landing" component={LandingContainer} />
    <Stack.Screen name="Login" component={LoginContainer} />
    <Stack.Screen name="SingUp" component={SignUpContainer} />
    <Stack.Screen name="Reset" component={ResetContainer} />
  </Stack.Navigator>
}

const PrivateScreens = () => {
  return <Stack.Navigator initialRouteName={"Dashboard"} screenOptions={{
    headerShown: false,
  }}>
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
      {/* <Stack.Screen name="Profile" component={LandingContainer} /> */}
      {/* <Stack.Screen name="Consejo" component={ConsejoContainer} /> */}
    </Stack.Screen>
    <Stack.Screen name="Consejo" component={ConsejoContainer} />
    <Stack.Screen name="Perfil" component={ProfileContainer} />
  </Stack.Navigator>
}
export default function App() {
  const [fontsLoaded] = useFonts(FONTS);
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    setAuth(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session)=>{
      setAuth(session);
    })
  },[]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (<NavigationContainer linking={linking}>
    {auth ? <PrivateScreens /> : <PublicScreens />}
  </NavigationContainer>);
}