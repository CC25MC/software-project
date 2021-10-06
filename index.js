import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './App';
import { Appearance } from "react-native-appearance";
import { getTheme } from "@/theme";
const osScheme = Appearance.getColorScheme();

export default function Main() {
  
  return (
    <PaperProvider theme={getTheme(osScheme)}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Main);
