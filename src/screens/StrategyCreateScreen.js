import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet, Text } from 'react-native';

const StrategyCreateScreen = () => {
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={{ fontSize: 48 }}>Add Strategy</Text>
      
    </SafeAreaView>
  );
};

StrategyCreateScreen.navigationOptions = {
  title: 'Add Strategy'
};

const styles = StyleSheet.create({});

export default StrategyCreateScreen;
