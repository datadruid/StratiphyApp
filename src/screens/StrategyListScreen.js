import React , { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Layout, Card, List, Text } from '@ui-kitten/components';
import { Context as StrategyContext } from '../context/StrategyContext';

import { LineChart } from "react-native-chart-kit";


const chartConfig = {
  backgroundColor: "none",
  backgroundGradientFrom: "none",
  backgroundGradientTo: "none",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(51, 255, 195, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(51, 255, 195, ${opacity})`,
  style: {
    borderRadius: 0
  }
};

const StrategyListScreen = ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  const { state, listStrategies, clearErrorMessage } = useContext(StrategyContext);

  useEffect( () => {
     listStrategies();
  }, []);


  const renderItem = (info) => (
    <View>
         <Text style={styles.text} category='s1' status='default'>
      {info.item.title}
    </Text>
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
        borderRadius: 0,
        margin: 0
      }}
    />
    </View>
  );

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Layout style={styles.layoutcontainer}>
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
  layoutcontainer: {
    height: '100%'
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});

export default StrategyListScreen;
