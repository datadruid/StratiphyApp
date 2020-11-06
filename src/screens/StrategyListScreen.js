import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import Spacer from '../components/Spacer';
import {
  LineChart,
  PieChart,
  BarChart
} from "react-native-chart-kit";
import { Context as StrategyContext } from '../context/StrategyContext';

const screenWidth = Dimensions.get("window").width;
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
  const { state, listStrategies, clearErrorMessage } = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={{ fontSize: 48 }}>Strategies</Text>
      <ScrollView>
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
        },{
          data: [
            Math.random() * 8,
            Math.random() * 8,
            Math.random() * 8,
            Math.random() * 8,
            Math.random() * 8,
            Math.random() * 8
          ],color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`
          ,strokeWidth: "2"
        },{
          data: [
            Math.random() * 7,
            Math.random() * 7,
            Math.random() * 7,
            Math.random() * 7,
            Math.random() * 7,
            Math.random() * 7
          ],color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`
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
<Spacer/>
<PieChart
  data={[
    {
      name: "High",
      risk: Math.round(Math.random() * 100),
      color: "rgba(255, 0, 0, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Medium",
      risk: Math.round(Math.random() * 100),
      color: "rgba(0, 255, 0, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Low",
      risk: Math.round(Math.random() * 100),
      color: "rgba(0, 255, 255, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ]}
  width={screenWidth -20}
  height={220}
  chartConfig={chartConfig}
  accessor="risk"
  backgroundColor="#1F2225"
  padding="15"
  absolute
  style={{
    marginVertical: 8,
    borderRadius: 0,
    margin: 10
  }}
/>
<Spacer/>
<BarChart
  style={{
    marginVertical: 8,
    borderRadius: 0,
    margin: 10
  }}
  data={{
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [
          Math.round(Math.random() * 10), 
          Math.round(Math.random() * 10), 
          Math.round(Math.random() * 10), 
          Math.round(Math.random() * 10), 
          Math.round(Math.random() * 10), 
          Math.round(Math.random() * 10)]
      }
    ]
  }}
  width={screenWidth -20}
  height={280}
  yAxisLabel="£"
  chartConfig={chartConfig}
  verticalLabelRotation={30}
/>
<Spacer/>
</ScrollView>
    </SafeAreaView>
  );
};

StrategyListScreen.navigationOptions = {
  header: () => false,
  title: 'Strategies'
};

const styles = StyleSheet.create({});

export default StrategyListScreen;
