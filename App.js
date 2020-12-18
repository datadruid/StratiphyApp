import React, { Component } from 'react';
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
import StrategySettingScreen from './src/screens/StrategySettingScreen';
import StrategyDetailScreen from './src/screens/StrategyDetailScreen';
import StrategyListScreen from './src/screens/StrategyListScreen';
import StrategyInstructionsScreen from './src/screens/StrategyInstructionsScreen';
import StrategyCompareScreen from './src/screens/StrategyCompareScreen';
import HomeScreen from './src/screens/HomeScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as StrategyProvider } from './src/context/StrategyContext';
import { Provider as SharePriceProvider } from './src/context/SharePriceContext';
import { Provider as StrategyUpdateProvider } from './src/context/StrategyUpdateContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as Sentry from '@sentry/react-native';
import OneSignal from 'react-native-onesignal';

Sentry.init({
  dsn: 'https://8b8d52af187c45849d564265bc43b353@o468449.ingest.sentry.io/5496302',
});

const strategyListFlow = createStackNavigator({
  StrategyList: StrategyListScreen,
  StrategyDetail: StrategyDetailScreen,
  StrategySetting: StrategySettingScreen,
  StrategyInstructions: StrategyInstructionsScreen,
  StrategyCompare: StrategyCompareScreen,
});

strategyListFlow.navigationOptions = {
  title: 'Strategies',
  tabBarIcon: <FontAwesome name="pie-chart" size={24} />,
};

const homeFlow = createStackNavigator({
  Home: HomeScreen,
});

homeFlow.navigationOptions = {
  title: 'Home',
  tabBarIcon: <FontAwesome name="home" size={24} />,
};

const discoverFlow = createStackNavigator({
  Discover: DiscoverScreen,
});

discoverFlow.navigationOptions = {
  title: 'Discover',
  tabBarIcon: <FontAwesome name="search" size={24} />,
};

const accountFlow = createStackNavigator({
  Account: AccountScreen,
  TickerDetail: TickerDetail
});

accountFlow.navigationOptions = {
  title: 'Account',
  tabBarIcon: <FontAwesome name="user" size={24} />

};

const tab = createBottomTabNavigator({
  homeFlow,
  discoverFlow,
  StrategyCreate: StrategyCreateScreen,
  strategyListFlow,
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

const AppContainer = createAppContainer(switchNavigator);

function myiOSPromptCallback(permission) {
  // do something with permission value
}

export default class App extends Component {

  constructor(properties) {
    super(properties);
    //Remove this method to stop OneSignal Debugging 
    OneSignal.setLogLevel(6, 0);

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init("98fe799f-bce9-48a8-9f3b-82ad1699ee88", { kOSSettingsKeyAutoPrompt: false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2 });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }


  render() {
    let themeSetting = { ...eva.light, ...theme };
    // if(Appearance.getColorScheme() === 'dark'){
    //   themeSetting = { ...eva.dark, ...theme }
    // }
    return (
      <AuthProvider>
        <StrategyUpdateProvider>
          <StrategyProvider>
            <SharePriceProvider>
              <ApplicationProvider {...eva} theme={themeSetting}>
                <AppContainer
                  ref={(navigator) => {
                    setNavigator(navigator);
                  }}
                />
              </ApplicationProvider>
            </SharePriceProvider>
          </StrategyProvider>
        </StrategyUpdateProvider>
      </AuthProvider>
    );
  }
};
