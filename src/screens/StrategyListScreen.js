import React , { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Layout, Card, List, Text } from '@ui-kitten/components';
import { Context as StrategyContext } from '../context/StrategyContext';

import { LineChart } from "react-native-chart-kit";


const chartConfig = {
  backgroundColor: "#1F2225",
  backgroundGradientFrom: "#1F2225",
  backgroundGradientTo: "#1F2225",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(51, 255, 195, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(51, 255, 195, ${opacity})`,
  style: {
    borderRadius: 16
  }
};

const StrategyListScreen = ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  const { state, listStrategies, clearErrorMessage } = useContext(StrategyContext);

  useEffect(async () => {
    listStrategies();
  }, []);

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <Text category='h6'>
        {info.item.title}
      </Text>
    </View>
  );

  const renderItemFooter = (footerProps, info) => (
    <Text {...footerProps}>
      {info.item.title}
    </Text>
  );

  const renderItem = (info) => (
    <Card
      style={styles.item}
      status='basic'
      header={headerProps => renderItemHeader(headerProps, info)}
      footer={footerProps => renderItemFooter(footerProps, info)}>
      <LineChart
      data={{
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10
            ],color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`
            ,strokeWidth: "2"
                    }
        ]
      }}
      width={screenWidth} // from react-native
      height={220}
      yAxisLabel="£"
      //yAxisSuffix="k"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={chartConfig}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 10,
        margin: 10
      }}
    />
    </Card>
  );

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Layout>
      <Text tyle={styles.text} category='h1' status='default'>Strategies</Text>
      <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={state.strategies}
      renderItem={renderItem}
    />
        
  </Layout>
    </SafeAreaView>
  );
};

StrategyListScreen.navigationOptions = {
  header: () => false,
  title: 'Strategies'
};

const styles = StyleSheet.create({

});

export default StrategyListScreen;
