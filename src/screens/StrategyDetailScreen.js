import React from 'react';
import { View, StyleSheet, SafeAreaView} from 'react-native';
import { Layout, Card, List, Text } from '@ui-kitten/components';

const StrategyDetailScreen = ({navigation}) => {
  const item = navigation.getParam('item');
  return (
  <SafeAreaView forceInset={{ top: 'always' }}>
    <Layout style={styles.layoutcontainer}>
      <Text tyle={styles.text} category='h1' status='default'>{item.strategyName}</Text>
    </Layout>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layoutcontainer: {
    height: '100%'
  }
});

export default StrategyDetailScreen;
