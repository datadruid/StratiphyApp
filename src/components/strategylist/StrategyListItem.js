import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, Text, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { LineChart } from 'react-native-chart-kit';
import * as RNLocalize from "react-native-localize";
import getSymbolFromCurrency from 'currency-symbol-map';
import IconStack from '../strategy/IconStack';
import ItemOverlayMenu from '../strategy/ItemOverlayMenu';
import { icondata } from '../modules/StrategyIcons';
import { Context as StrategyContext } from '../../context/StrategyContext';
import * as Progress from 'react-native-progress';
import { colors } from '../modules/Colors';
import { fonts } from '../modules/Fonts';

const screenwidth = Dimensions.get("window").width;

const currencyFormat = {
  style: "currency",
  currency: RNLocalize.getLocales()[0].languageTag
};

const StrategyListItem = ({ navigation, item }) => {
  const { state, loadStrategyData, runStrategy } = useContext(StrategyContext);
  const [refreshing, setRefreshing] = useState(false);
  let slimList = [];
  let updatedPercent = item.stage;
  let endValue = '0';
  const instructions = item.holdings ? item.holdings : [];
const newActions = item.analytics?.last_7d_buy_instructions ? item.analytics.last_7d_buy_instructions : 0
+ item.analytics?.last_7d_sell_instructions ? item.analytics.last_7d_sell_instructions : 0;
  useEffect(() => {
    reload();
  }, [item]);

  const reload = React.useCallback(async () => {
    if (refreshing) {
      return;
    }
    setRefreshing(true);
    if (item.status.includes('added')) {
      await runStrategy(item._id, state.strategies);
      await loadStrategyData(state.strategies);
    } 
    setRefreshing(false);
  }, []);

  if (item.analytics && item.analytics.series_all) {
    endValue = (Math.round((item.analytics.series_all[item.analytics.series_all.length - 1].value + Number.EPSILON) * 100) / 100).toString();
    const maxVal = 80;
    const delta = Math.floor(item.analytics.series_all.length / maxVal);
    for (i = 0; i < item.analytics.series_all.length; i = i + delta) {
      slimList.push(item.analytics.series_all[i].value);
    }
  }

  const openDetail = (item) => {
    navigation.navigate('StrategyDetail', { item: item });
  };

  let formattedStratValue = 0;
  if (endValue > 0) {
    formattedStratValue = `${getSymbolFromCurrency(RNLocalize.getCurrencies()[0])}${endValue.toLocaleString(RNLocalize.getLocales()[0].languageTag, currencyFormat)}`;
  }
  let shownumbers = true;
  let linecolour = 'rgb(227, 63, 100)';
  let plusminus = '-'
  if (slimList.length === 0) {
    slimList = [100, 98, 97, 92, 98, 108, 106, 103, 103, 98, 98, 101, 99, 99, 104, 113, 113, 119, 120, 123, 129, 127, 134, 131, 135, 131, 141, 137, 135, 126, 133, 146, 145, 154, 159, 161, 158, 148, 154, 170];
    linecolour = 'rgba(133, 130, 131, 0.15)';
    plusminus = '';
    shownumbers = false;
  }
  else if (item.analytics.performance_all > 0) {
    linecolour = 'rgb(74, 250, 154)';
    plusminus = '+';
  }

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    fillShadowGradient: linecolour,
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
      <TouchableOpacity onPress={() => openDetail(item)}>
        {!item.iconid &&
          <Icon style={styles.icon} size={20} name='superpowers' />}
        {item.iconid &&
          <Image source={icondata[item.iconid].image} resizeMode='contain' style={styles.icon} />
        }
        {newActions > 0 && 
        <View style={styles.reddot}/>
}
        </TouchableOpacity>
        <Text style={styles.text} >{item.strategyName}</Text>
        <ItemOverlayMenu navigation={navigation} item={item} />
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
                  , strokeWidth: "3"
                }
              ]
            }}
            drawBorders={false}
            withDots={false}
            withShadow={true}
            withOuterLines={false}
            withInnerLines={false}
            withHorizontalLabels={false}
            width={screenwidth - 35} // from react-native
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
                <Text style={styles.smalltext}>Value</Text>
              </View>
              <IconStack actions={instructions} borderColor='white' size={24} />
              <View style={styles.box4}>
                <Text style={[styles.textrightbold, { color: linecolour }]}>{plusminus}{item.analytics.performance_all}%</Text>
                <Text style={styles.smalltext, styles.textright}>Performance</Text>
              </View>
            </View>
          }
          {!shownumbers && updatedPercent < 1 &&
            <View style={styles.box5}>
              <Progress.Bar progress={updatedPercent} width={200} color={colors.yellowTheme} />
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
  text: {
    fontFamily: fonts.GraphikSemibold
  },
  smalltext: {
    fontFamily: fonts.GraphikRegular,
    fontSize: 16,
    color: colors.coolGrey
  },
  card: {
    flex: 1,
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 20
  },
  box1: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  box2: {
    flex: 3,
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },
  box3: {
    justifyContent: 'center',
    textAlign: 'center'
  },
  box4: {
    flex: 4,
  },
  box5: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    top: -60
  },
  textright: {
    justifyContent: 'flex-end',
    textAlign: 'right',
    fontFamily: fonts.GraphikRegular,
    fontSize: 16,
    color: colors.coolGrey
  },
  textrightbold: {
    justifyContent: 'flex-end',
    textAlign: 'right',
    fontSize: 16,
    fontFamily: fonts.GraphikSemibold,
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  footerControl: {
    marginHorizontal: 2,
  },
  bold: {
    fontSize: 16,
    fontFamily: fonts.GraphikSemibold
  },
  icon: {
    width: 34,
    height: 34,
    marginLeft: -5
  },
  reddot: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 14,
    height: 14,
    borderRadius: 7,
    top: -3,
    left: 17,
  }
});

export default StrategyListItem;