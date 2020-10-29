import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import CodeScreen from './src/screens/SigninCodeScreen';
import StrategyCreateScreen from './src/screens/StrategyCreateScreen';
import StrategyDetailScreen from './src/screens/StrategyDetailScreen';
import StrategyListScreen from './src/screens/StrategyListScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as Sentry from '@sentry/react-native';

Sentry.init({ 
  dsn: 'https://8b8d52af187c45849d564265bc43b353@o468449.ingest.sentry.io/5496302', 
});


const strategyListFlow = createStackNavigator({
  StrategyList: StrategyListScreen,
  StrategyDetail: StrategyDetailScreen,
});

strategyListFlow.navigationOptions = {
  title: 'Strategies',
  tabBarIcon: <FontAwesome name="th-list" size={20} />,
};

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
    CodeScreen: CodeScreen,
  }),
  mainFlow: createBottomTabNavigator({
    strategyListFlow,
    StrategyCreate: StrategyCreateScreen,
    Account: AccountScreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App 
      ref={(navigator) => {
        setNavigator(navigator);
      }}
      />
    </AuthProvider>
  );
};
