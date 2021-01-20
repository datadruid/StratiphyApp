import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Context as StrategyContext } from '../../context/StrategyContext';
import { getAvatarColor, getChartValueFilter, getChartStartDate } from '../modules/UiHelper';

const screenwidth = Dimensions.get("window").width;

const StrategyDetailChart = ({ datasets, mastercolour, linecolour, isAnalysisTab }) => {
  const { state, clearErrorMessage } = useContext(StrategyContext);

  let chartset = [];
  let slimList = [];

  let initialValue = datasets[0].value
  
  const delta = getChartValueFilter(state.timePeriod);
  for (i = 0; i < datasets.length; i = i + delta) {
    slimList.push(datasets[i].value/initialValue *100);
  }

  if (slimList.length > 0) {
    let dataset = {
      data: slimList,
      color: () => linecolour
      , strokeWidth: "3"
    };

    chartset.push(dataset);
  }


  if (isAnalysisTab && state.comparisonChartData?.length > 0) {
    state.comparisonChartData.forEach((chart) => {
      let circlecolour = state.highightedItem.includes(chart.ticker) ? '#3B87FA' : getAvatarColor(chart.ticker);
      let linewidth = 3;//state.highightedItem.includes(chart.ticker) ? '3' : '2';
      let slimList = chart.series.map(a => a.value);

      let dataset = {
        data: slimList,
        color: () => circlecolour
        , strokeWidth: linewidth
      };

      chartset.push(dataset);
    });
  }


  const chartConfig = {
    backgroundColor: mastercolour,
    backgroundGradientFrom: mastercolour,
    backgroundGradientTo: mastercolour,
    fillShadowGradient: linecolour,
    fillShadowGradientOpacity: 0,
    decimalPlaces: 2, // optional, defaults to 2dp #f9b10b
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 0
    }
  };
  if (chartset.length > 0) {
    return (
      <LineChart
        data={{
          labels: [""],
          datasets: chartset
        }}
        fromZero={true}
        drawBorders={false}
        withDots={false}
        withShadow={true}
        withOuterLines={false}
        withInnerLines={false}
        withHorizontalLabels={false}
        width={screenwidth + 10} // from react-native
        height={328}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        bezier
        style={{
          flex: 1,
          marginVertical: 0,
          borderRadius: 0,
          margin: 0,
          paddingRight: 0,
          top: -58
        }}
      />
    )
  }
  else {
    return (
      <View style={styles.activitycontainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  activitycontainer: {
    padding: 30
  }
});

export default StrategyDetailChart;