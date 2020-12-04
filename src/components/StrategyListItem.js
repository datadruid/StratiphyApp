import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, View} from 'react-native';
import { Text, Card } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { LineChart } from 'react-native-chart-kit';
import * as RNLocalize from "react-native-localize";
import getSymbolFromCurrency from 'currency-symbol-map'

const currencyFormat  = {
  style: "currency",
  currency: RNLocalize.getLocales()[0].languageTag
};

  const StrategyListItem = ({ navigation, info }) => {
  const openDetail = (item) => {
    navigation.navigate('StrategyDetail', {item: item});
  };
  const openSettings = (item) => {
    navigation.navigate('StrategySetting', {item: item});
  };

  let formattedStratValue = 0;
  if(info.endValue)
  {
    formattedStratValue = `${getSymbolFromCurrency(RNLocalize.getCurrencies()[0])}${info.endValue.toLocaleString(RNLocalize.getLocales()[0].languageTag, currencyFormat)}`;
  }

  let linecolour = 'rgb(227, 63, 100)';
  let plusminus = '-'
  if(info.performancePct > 0)
  {
    linecolour = 'rgb(74, 250, 154)';
    plusminus = '+';
  }

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    fillShadowGradient :linecolour,
    fillShadowGradientOpacity: 0.5,
    decimalPlaces: 2, // optional, defaults to 2dp #f9b10b
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 0
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.box1}>
          <Icon style={styles.icon} size={18} name='superpowers'/>
          <Text style={styles.text} category='s1' status='default'>{info.strategyName}</Text>
          <TouchableOpacity onPress={() => openSettings(info)}>
            <Icon style={styles.iconright} size={18} name='ellipsis-v'/>
          </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => openDetail(info)}>
      <View style={styles.box2}>
        <LineChart
      data={{
        labels: [""],
        datasets: [
          {
            data: info.analytics,
            color: () => linecolour
            ,strokeWidth: "2"
                    }
        ]
      }}
      drawBorders={false}
      withDots ={false}
      withShadow={true}
      withOuterLines={false}
      withInnerLines={false}
      withHorizontalLabels={false}
      width={350} // from react-native
      height={100}
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={chartConfig}
      bezier
      style={{
        flex: 1,
        marginVertical: 8,
        borderRadius: 0,
        margin: 0,
        paddingRight: 0
      }}
    />
        <View style={styles.box1}>
        <View style={styles.box2}>
          <Text style={styles.bold}>{formattedStratValue}</Text>
          <Text>Value</Text>
        </View>
 
        <View style={styles.box4}>
          <Text style={styles.textrightbold}>{plusminus}{info.performancePct}%</Text>
          <Text style={styles.textright}>Performance</Text>
        </View>
        </View>
      </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
    layoutcontainer: {
        height: '100%'
      },
      card: {
        flex: 1,
        margin: 8,
      },
      box1:{
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between'
      },
      box2: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
      },
      box3: {
        justifyContent: 'center',
        textAlign:'center',
      },
      textright: {
        justifyContent:'flex-end',
        textAlign: 'right',
      },
      textrightbold: {
        justifyContent:'flex-end',
        textAlign: 'right',
        fontWeight: 'bold'
      },
      footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      footerControl: {
        marginHorizontal: 2,
      },
      bold:{
        fontWeight: 'bold'
      }
});

export default StrategyListItem;