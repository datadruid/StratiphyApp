import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const HomeScreen = ({navigation}) => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={{ fontSize: 48 }}>Home</Text>

      
    </SafeAreaView>
  );
};

HomeScreen.navigationOptions = {
  header: () => false,
  title: 'Home'
};

const styles = StyleSheet.create({});

export default HomeScreen;