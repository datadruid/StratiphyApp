import React , { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import { Layout, Card, List, Text } from '@ui-kitten/components';
import { Context as StrategyContext } from '../context/StrategyContext';
// import * as RNLocalize from "react-native-localize";

import { LineChart } from "react-native-chart-kit";

// console.log(RNLocalize.getLocales());
// console.log(RNLocalize.getCurrencies());

const chartConfig = {
  backgroundColor: "",
  backgroundGradientFrom: "",
  backgroundGradientTo: "",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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

  const listener = navigation.addListener('didFocus', () => {
    listStrategies();
  });
  
  const renderItem = (info) => (
    <Card style={styles.card}
    onPress={() => navigation.navigate('StrategyDetail', {item: info.item})}>
      <View style={styles.box2}>
        <View style={styles.box2}>
          <Text style={styles.text} category='s1' status='default'>{info.item.strategyName}</Text>
          <Text style={styles.text} category='s1' status='default'>{info.item.strategyDescription}</Text>
        </View>
        {/* <LineChart
      data={{
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            data: [
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10
            ],color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
            ,strokeWidth: "2"
                    }
        ]
      }}
      withDots ={false}
      withShadow={false}
      withInnerLines={false}
      width={350} // from react-native
      height={220}
      yAxisLabel="£"
      //yAxisSuffix="k"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={chartConfig}
      bezier
      style={{
        flex: 1,
        marginVertical: 8,
        borderRadius: 0,
        margin: 0
      }}
    /> */}
        <View style={styles.box2}>
          <Text style={styles.text} category='s1' status='default'>{`status: ${info.item.status}`}</Text>
          <Text style={styles.text} category='s1' status='default'>{`last run:${info.item.lastRun}`}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Layout style={styles.layoutcontainer}>
      <Text tyle={styles.text} category='h1' status='default'>Your Strategies</Text>
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
    margin: 7,
  },
  box1:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  box2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding:2
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});

export default StrategyListScreen;