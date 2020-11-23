import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = ({navigation}) => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={{ fontSize: 48 }}>Account</Text>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
      <Spacer>
        <Button title="Candle chart" onPress={() => navigation.navigate('TickerDetail')} />
      </Spacer>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;