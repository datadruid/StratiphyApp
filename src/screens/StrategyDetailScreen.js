import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const StrategySettingScreen = ({navigation}) => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={{ fontSize: 48 }}>Detail</Text>

      
    </SafeAreaView>
  );
};

// StrategySettingScreen.navigationOptions = {
//   header: () => true,
//   title: 'Discover'
// };

const styles = StyleSheet.create({});

export default StrategySettingScreen;