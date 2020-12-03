import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, Dimensions, View} from 'react-native';
import { Text, Card } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { LineChart } from "react-native-chart-kit";

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  fillShadowGradient :'#f9b10b',
  fillShadowGradientOpacity: 0.8,
  decimalPlaces: 2, // optional, defaults to 2dp #f9b10b
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 0
  }
};

const StrategyListItem = ({ navigation, info }) => {
  const openDetail = (item) => {
    navigation.navigate('StrategyDetail', {item: item});
  };

  return (
    <Card style={styles.card}
    onPress={() => openDetail(info)}>
      <View style={styles.box2}>
        <View style={styles.box1}>
          <Icon style={styles.icon} size={18} name='superpowers'/>
          <Text style={styles.text, styles.box3} category='s1' status='default'>{info.strategyName}</Text>
          <View/>
        </View>
        
        <LineChart
      data={{
        labels: [""],
        datasets: [
          {
            data: info.analytics,
            color: (opacity = 1) => `rgba(249, 177, 11, ${opacity})`
            ,strokeWidth: "2"
                    }
        ]
      }}
      withDots ={false}
      withShadow={true}
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
          <Text>£{info.endValue}</Text>
          <Text>Value</Text>
        </View>
 
        <View style={styles.box4}>
          <Text style={styles.textright}>{info.performancePct}%</Text>
          <Text style={styles.textright}>Performance</Text>
        </View>
        </View>
      </View>
    </Card>
  );
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
      box3: {
        justifyContent: 'center',
        textAlign:'center',
      },
      textright: {
        justifyContent:'flex-end',
        textAlign: 'right',
      },
      footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      footerControl: {
        marginHorizontal: 2,
      },
      icon: {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }
});

export default StrategyListItem;