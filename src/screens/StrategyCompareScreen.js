import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const StrategyCompareScreen = () => {
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={{ fontSize: 48 }}>Compare</Text>
      
    </SafeAreaView>
  );
};

StrategyCompareScreen.navigationOptions = {
  title: 'New Strategy',
  tabBarIcon: <FontAwesome name="plus-circle" size={28} />
};

const styles = StyleSheet.create({});

export default StrategyCompareScreen;
