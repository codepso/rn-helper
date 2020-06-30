import 'react-native-gesture-handler';
import React from 'react';
import {DarkTheme, Provider as PaperProvider } from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from './src/screens/WelcomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import HomePaperScreen from './src/screens/HomePaperScreen';

const AppStack = createStackNavigator();
const theme = {
  ...DarkTheme
}

const AppStackScreen = () => (
  <AppStack.Navigator initialRouteName="HomePaper">
    <AppStack.Screen name="Welcome" component={WelcomeScreen} />
    <AppStack.Screen name="HomePaper" component={HomePaperScreen} />
    <AppStack.Screen
      name="About"
      component={AboutScreen}
      options={{title: 'About'}}
    />
  </AppStack.Navigator>
);

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppStackScreen />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
