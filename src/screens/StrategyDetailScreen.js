import React, { useContext, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { Context as StrategyContext } from '../context/StrategyContext';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Instructions from '../components/strategy/Instructions';
import Holdings from '../components/strategy/Holdings';
import { LineChart } from 'react-native-chart-kit';
import * as RNLocalize from "react-native-localize";
import getSymbolFromCurrency from 'currency-symbol-map';
import IconStack from '../components/strategy/IconStack';

const mastercolour = '#4CD697';
const screenwidth = Dimensions.get("window").width;
const currencyFormat = {
  style: "currency",
  currency: RNLocalize.getLocales()[0].languageTag
};

const StrategySettingScreen = ({ navigation }) => {
  const item = navigation.getParam('item');
  // const { state, getInstructionList, clearErrorMessage } = useContext(StrategyContext);

  // useEffect(() => {
  //   getInstructionList(item.strategyID);
  // }, []);

  let formattedStratValue = 0;
  if (item.endValue) {
    formattedStratValue = `${getSymbolFromCurrency(RNLocalize.getCurrencies()[0])}${item.endValue.toLocaleString(RNLocalize.getLocales()[0].languageTag, currencyFormat)}`;
  }

  let linecolour = '#FFFFFF';
  let plusminus = '-'
  if (item.performancePct > 0) {
    plusminus = '+';
  }

  const chartConfig = {
    backgroundColor: mastercolour,
    backgroundGradientFrom: mastercolour,
    backgroundGradientTo: mastercolour,
    fillShadowGradient: linecolour,
    fillShadowGradientOpacity: 0.4,
    decimalPlaces: 2, // optional, defaults to 2dp #f9b10b
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 0
    }
  };

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.hero} >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon style={styles.backiocn} size={40} name='long-arrow-left' />
            </TouchableOpacity>
            <View style={styles.box1}>
              <Icon style={styles.topicon} size={25} name='superpowers' />
              <Text style={styles.toptitletext} >{item.strategyName}</Text>
              <Icon style={styles.topicon} size={20} name='star' />

            </View>
            <LineChart
              data={{
                labels: [""],
                datasets: [
                  {
                    data: item.analytics,
                    color: () => linecolour
                    , strokeWidth: "2"
                  }
                ]
              }}
              fromZero={true}
              drawBorders={false}
              withDots={false}
              withShadow={true}
              withOuterLines={false}
              withInnerLines={false}
              withHorizontalLabels={false}
              width={screenwidth + 5} // from react-native
              height={338}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={chartConfig}
              bezier
              style={{
                flex: 1,
                marginVertical: 0,
                borderRadius: 0,
                margin: 0,
                paddingRight: 0,
                top: -78
              }}
            />
            <View style={styles.box1}>
              <View style={styles.box2}>
                <Text style={styles.toptitletext}>{formattedStratValue}</Text>
                <Text style={styles.subtitletext}>Value</Text>
              </View>
              <IconStack actions={item.latestActions.actions} borderColor={mastercolour} size={28}/>
              <View style={styles.box4}>
                <Text style={[styles.toptitletext, { color: linecolour }]}>{plusminus}{item.performancePct}%</Text>
                <Text style={styles.subtitletext}>Performance</Text>
              </View>
            </View>
          </View>
          <View style={styles.content} >
            <View style={styles.switchpanel} >
              <Button
                title='Strategy'
                type='solid'
                buttonStyle={styles.buttonselected}
                titleStyle={styles.buttontitleselected} />

              <Button
                title='Analysis'
                type='solid'
                buttonStyle={styles.button}
                titleStyle={styles.buttontitle} />
            </View>
          </View>
          <View style={styles.childrencontainer}>
            <View style={styles.titlelinkcontainer}>
              <View style={styles.titleiconcontainer}>
                <Text style={styles.titletext}>
                  Instructions
                </Text>
                <Icon style={styles.infoicon} size={20} name='info-circle' />
              </View>
              <View style={styles.titleiconcontainerright}>
              <Text style={styles.linktext}>
                See history
              </Text>
              <Icon style={styles.infoicon} size={20} name='chevron-right' />
            </View>
          </View>
          <View style={styles.instructioncontainer}>
            <Instructions actions={item.latestActions.actions} />
          </View>
          <View style={styles.titleiconcontainer}>
            <Text style={styles.titletext}>
              Holdings
              </Text>
            <Icon style={styles.infoicon} size={20} name='info-circle' />
          </View>
          <Holdings actions={item.latestActions.actions} />
        </View>
      </View>
      </ScrollView>
    </SafeAreaView >
  );
};

StrategySettingScreen.navigationOptions = {
  header: () => false,
  title: 'Strategy'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    backgroundColor: '#E5E5E5',
    paddingBottom: 40
  },
  hero: {
    width: '100%',
    height: 370,
    backgroundColor: '#4CD697',
  },
  box1: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#E5E5E5',
    height: 75,
    padding: 20,
    top: -20
  },
  switchpanel: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#D8DADB',
    padding: 2.5,
    height: 40,
    width: 340
  },
  button: {
    backgroundColor: '#D8DADB',
    width: 166,
    borderRadius: 8,
  },
  buttontitle: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600'
  },
  buttonselected: {
    backgroundColor: '#FFFFFF',
    width: 166,
    borderRadius: 8,
  },
  buttontitleselected: {
    color: 'black',
    fontSize: 13,
    fontWeight: '600'
  },
  centerspacer: {
    width: 4,
  },
  titleiconcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  titleiconcontainerright:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  imagebox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  backiocn: {
    padding: 10,
    justifyContent: 'center',
    color: 'white',
  },
  infoicon: {
    paddingLeft: 7,
    justifyContent: 'center',
    color: '#FFC234',
    textAlignVertical: 'center'
  },
  subtitletext: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white'
  },
  roundimage: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "silver"
  },
  childrencontainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20
  },
  titlelinkcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15
  },
  toptitletext: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
  },
  topicon: {
    color: 'white',
  },
  titletext: {
    fontSize: 20,
    fontWeight: '600'
  },
  titletext: {
    fontSize: 20,
    fontWeight: '600'
  },
  titleiconcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  linktext: {
    fontSize: 18,
    fontWeight: '400',
    color: '#FFC234'
  },
});

export default StrategySettingScreen;