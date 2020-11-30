import React from 'react';
import { Appearance } from 'react-native'
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from './src/theme.json';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import CodeScreen from './src/screens/SigninCodeScreen';
import AddNameScreen from './src/screens/AddNameScreen';
import TickerDetail from './src/screens/TickerDetailScreen';
import StrategyCreateScreen from './src/screens/StrategyCreateScreen';
import StrategyDetailScreen from './src/screens/StrategyDetailScreen';
import StrategyListScreen from './src/screens/StrategyListScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as StrategyProvider } from './src/context/StrategyContext';
import { Provider as SharePriceProvider } from './src/context/SharePriceContext';
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

const accountFlow = createStackNavigator({
  Account: AccountScreen,
  TickerDetail: TickerDetail
});

accountFlow.navigationOptions = {
    title: 'Account',
    tabBarIcon: <FontAwesome name="gear" size={20} />
};

const tab = createBottomTabNavigator({
  strategyListFlow,
  StrategyCreate: StrategyCreateScreen,
  accountFlow,
});

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
    CodeScreen: CodeScreen,
    AddName: AddNameScreen,
  }),
  mainFlow: tab,
});

const App = createAppContainer(switchNavigator);

export default () => {
  let themeSetting = { ...eva.dark, ...theme };
  // if(Appearance.getColorScheme() === 'dark'){
  //   themeSetting = { ...eva.dark, ...theme }
  // }


  return (
      <AuthProvider>
        <StrategyProvider>
          <SharePriceProvider>
            <ApplicationProvider {...eva} theme={themeSetting}>
                <App 
                ref={(navigator) => {
                  setNavigator(navigator);
                }}
                />
              </ApplicationProvider>
            </SharePriceProvider>
        </StrategyProvider>
      </AuthProvider>
  );
};
