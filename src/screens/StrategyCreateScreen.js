import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const StrategyCreateScreen = () => {
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={{ fontSize: 48 }}>Add Strategy</Text>
      
    </SafeAreaView>
  );
};

StrategyCreateScreen.navigationOptions = {
  title: 'New Strategy',
  tabBarIcon: <FontAwesome name="plus-circle" size={28} />
};

const styles = StyleSheet.create({});

export default StrategyCreateScreen;
