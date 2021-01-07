import React from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { LineChart } from 'react-native-chart-kit';
import * as RNLocalize from "react-native-localize";
import getSymbolFromCurrency from 'currency-symbol-map';
import IconStack from '../strategy/IconStack';
import ItemOverlayMenu from '../strategy/ItemOverlayMenu';
import { icondata } from '../modules/StrategyIcons';

const screenwidth = Dimensions.get("window").width;

const currencyFormat  = {
  style: "currency",
  currency: RNLocalize.getLocales()[0].languageTag
};

const StrategyListItem = ({ navigation, item, index }) => {
  let slimList = item.analytics[0].data.map(a => a.value);

    const openDetail = (item) => {
      navigation.navigate('StrategyDetail', {item: item});
    };

    let formattedStratValue = 0;
    if(item.endValue)
    {
      formattedStratValue = `${getSymbolFromCurrency(RNLocalize.getCurrencies()[0])}${item.endValue.toLocaleString(RNLocalize.getLocales()[0].languageTag, currencyFormat)}`;
    }
  let shownumbers = true;
  let linecolour = 'rgb(227, 63, 100)';
  let plusminus = '-'
  if(slimList.length === 0)
  {
    slimList=[100, 98, 97, 92, 98, 108, 106, 103, 103, 98, 98, 101, 99, 99, 104, 113, 113, 119, 120, 123, 129, 127, 134, 131, 135, 131, 141, 137, 135, 126, 133, 146, 145, 154, 159, 161, 158, 148, 154, 170];
    linecolour='rgba(133, 130, 131, 0.15)';
    plusminus = '';
    shownumbers = false;
  }
  else if(item.performancePct > 0)
  {
    linecolour = 'rgb(74, 250, 154)';
    plusminus = '+';
  }

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    fillShadowGradient :linecolour,
    fillShadowGradientOpacity: 0.2,
    decimalPlaces: 2, // optional, defaults to 2dp #f9b10b
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 0
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.box1}>
      {!item.iconid &&
      <Icon style={styles.icon} size={18} name='superpowers'/>}
      {item.iconid &&
      <Image source={icondata[item.iconid].image} resizeMode='contain' style={styles.icon}/>
      }
          <Text style={styles.text} category='s1' status='default'>{item.strategyName}</Text>
          <ItemOverlayMenu navigation={navigation} item={item}/>
      </View>
      <TouchableOpacity onPress={() => openDetail(item)}>
      <View style={styles.box2}>
        <LineChart
      data={{
        labels: [""],
        datasets: [
          {
            data: slimList,
            color: () => linecolour
            ,strokeWidth: "3"
                    }
        ]
      }}
      drawBorders={false}
      withDots ={false}
      withShadow={true}
      withOuterLines={false}
      withInnerLines={false}
      withHorizontalLabels={false}
      width={screenwidth -35} // from react-native
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
    {shownumbers && 
        <View style={styles.box1}>
          <View style={styles.box2}>
            <Text style={styles.bold}>{formattedStratValue}</Text>
            <Text>Value</Text>
          </View>
          <IconStack actions={item.latestActions.actions} borderColor='white' size={24}/>
          <View style={styles.box4}>
            <Text style={[styles.textrightbold, {color: linecolour }]}>{plusminus}{item.performancePct}%</Text>
            <Text style={styles.textright}>Performance</Text>
          </View>
        </View>
      }
      {!shownumbers && 
      <View style={styles.box5}>
        <Text style={styles.text}>generating strategy actions</Text>
    </View>
      }
      </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    layoutcontainer: {
        height: '100%'
      },
      card: {
        flex: 1,
        marginBottom: 15,
        backgroundColor:'white',
        borderRadius: 12,
        paddingVertical:20
      },
      box1:{
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginHorizontal:20
      },
      box2: {
        flex: 3,
        flexDirection: 'column',
        alignSelf: 'stretch',
        justifyContent: 'space-between'
      },
      box3: {
        justifyContent: 'center',
        textAlign:'center'
      },
      box4: {
        flex: 4,
      },
      box5: {
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign:'center',
        top: -60
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
        justifyContent: 'flex-end'
      },
      footerControl: {
        marginHorizontal: 2,
      },
      bold:{
        fontWeight: 'bold'
      },
      icon: {
        width:25,
        height:25
      }
      
});

export default StrategyListItem;