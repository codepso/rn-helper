import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from './src/screens/WelcomeScreen';
import AboutScreen from './src/screens/AboutScreen';

const AppStack = createStackNavigator();

const AppStackScreen = () => (
  <AppStack.Navigator initialRouteName="Welcome">
    <AppStack.Screen name="Welcome" component={WelcomeScreen} />
    <AppStack.Screen
      name="About"
      component={AboutScreen}
      options={{title: 'About'}}
    />
  </AppStack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <AppStackScreen />
    </NavigationContainer>
  );
};

export default App;
