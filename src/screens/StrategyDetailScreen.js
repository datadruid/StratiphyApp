import React, {useContext, useEffect, useState} from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { Context as StrategyContext } from '../context/StrategyContext';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { LineChart } from 'react-native-chart-kit';
import * as RNLocalize from "react-native-localize";
import getSymbolFromCurrency from 'currency-symbol-map';
import IconStack from '../components/strategy/IconStack';
import StrategyTab from '../components/strategy/StrategyTab';
import AnalysisTab from '../components/strategy/AnalysisTab';

const mastercolour = '#4CD697';
const screenwidth = Dimensions.get("window").width;
const currencyFormat = {
  style: "currency",
  currency: RNLocalize.getLocales()[0].languageTag
};

const StrategySettingScreen = ({ navigation }) => {
  const item = navigation.getParam('item');
  const [ isStartegyTab, setIsStartegyTab ] = useState(true);
  const [ isAnalysisTab, setIsAnalysisTab ] = useState(false);
  const { state, getStrategy, clearErrorMessage } = useContext(StrategyContext);

  useEffect( () => {
     getStrategy(item._id);
  }, []);

  let formattedStratValue = 0;
  if (state.strategy?.endValue) {
    formattedStratValue = `${getSymbolFromCurrency(RNLocalize.getCurrencies()[0])}${state.strategy?.endValue.toLocaleString(RNLocalize.getLocales()[0].languageTag, currencyFormat)}`;
  }

  let linecolour = '#FFFFFF';
  let plusminus = '-'
  if (state.strategy?.performancePct > 0) {
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

  /// change button status for analysis and strategy
  var startegyButtonProps = {
    buttonStyle : isStartegyTab ? styles.buttonselected : styles.button,
    titleStyle : isStartegyTab ? styles.buttontitleselected : styles.buttontitle,
  };

  var analysisButtonProps = {
    buttonStyle : isAnalysisTab ? styles.buttonselected : styles.button,
    titleStyle : isAnalysisTab ? styles.buttontitleselected : styles.buttontitle,
  };

  const switchTab = (target) =>{
    if(target === 'strategy')
    {
      setIsStartegyTab(true);
      setIsAnalysisTab(false);
    }
    else
    {
      setIsStartegyTab(false);
      setIsAnalysisTab(true);
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
              <Text style={styles.toptitletext} >{state.strategy?.strategyName}</Text>
              <Icon style={styles.topicon} size={20} name='star' />

            </View>
            <LineChart
              data={{
                labels: [""],
                datasets: [
                  {
                    data: state.strategy?.analytics,
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
                top: -68
              }}
            />
            <View style={styles.box1}>
              <View style={styles.box2}>
                <Text style={styles.toptitletext}>{formattedStratValue}</Text>
                <Text style={styles.subtitletext}>Value</Text>
              </View>
              <IconStack actions={state.strategy?.latestActions?.actions} borderColor={mastercolour} size={28}/>
              <View style={styles.box4}>
                <Text style={[styles.toptitletext, { color: linecolour }]}>{plusminus}{state.strategy?.performancePct}%</Text>
                <Text style={styles.subtitletext}>Performance</Text>
              </View>
            </View>
          </View>
          <View style={styles.content} >
            <View style={styles.switchpanel} >
              <Button {...startegyButtonProps}
                title='Strategy'
                type='solid'
                //buttonStyle={styles.buttonselected}
                //titleStyle={styles.buttontitleselected} 
                onPress={() => switchTab('strategy')}/>

              <Button {...analysisButtonProps}
                title='Analysis'
                type='solid'
                // buttonStyle={styles.button}
                // titleStyle={styles.buttontitle} 
                onPress={() => switchTab('analysis')}/>
            </View>
          </View>
          <View style={styles.childrencontainer}>
              {isStartegyTab && <StrategyTab strategy={state.strategy} navigation={navigation}/>}
              {isAnalysisTab && <AnalysisTab strategy={state.strategy} navigation={navigation}/>}
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
    backgroundColor: '#F3F4F5',
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
    backgroundColor: '#F3F4F5',
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
    fontWeight: 'bold'
  },
  buttonselected: {
    backgroundColor: '#FFFFFF',
    width: 166,
    borderRadius: 8,
  },
  buttontitleselected: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold'
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
  toptitletext: {
    alignSelf: 'stretch',
    textAlign: 'left',
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  topicon: {
    color: 'white',
  },
  titletext: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  titleiconcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }
});

export default StrategySettingScreen;