import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet, Text, Button } from 'react-native';

const StrategyListScreen = ({ navigation }) => {
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={{ fontSize: 48 }}>Strategies</Text>
      
    </SafeAreaView>
  );
};

StrategyListScreen.navigationOptions = {
  header: () => false,
  title: 'Strategies'
};

const styles = StyleSheet.create({});

export default StrategyListScreen;
