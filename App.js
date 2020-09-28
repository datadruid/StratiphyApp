/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WebSite from './components/website';
import Login from './components/login';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Stratiphy"
                component={WebSite}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
            />
        </Stack.Navigator>
      </NavigationContainer>

  );
};


export default App;
