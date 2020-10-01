import React from 'react';
import { SafeAreaView } from 'react-native';
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
