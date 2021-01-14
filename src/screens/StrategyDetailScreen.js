import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { Context as StrategyContext } from '../context/StrategyContext';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import * as RNLocalize from "react-native-localize";
import getSymbolFromCurrency from 'currency-symbol-map';
import IconStack from '../components/strategy/IconStack';
import StrategyTab from '../components/strategy/StrategyTab';
import AnalysisTab from '../components/strategy/AnalysisTab';
import StrategyDetailChart from '../components/strategy/StrategyDetailChart';
import { getChartAxisLabels, getDateFilterButtonLabels } from '../components/modules/UiHelper'
import { icondata } from '../components/modules/StrategyIcons';
import { colors } from '../components/modules/Colors';
import { fonts } from '../components/modules/Fonts';

const mastercolour = '#4CD697';

const currencyFormat = {
  style: "currency",
  currency: RNLocalize.getLocales()[0].languageTag
};

const StrategySettingScreen = ({ navigation }) => {
  const buttons = getDateFilterButtonLabels();
  const item = navigation.getParam('item');
  const [isStartegyTab, setIsStartegyTab] = useState(true);
  const [isAnalysisTab, setIsAnalysisTab] = useState(false);
  const { state, getStrategy, getTickerData, getComparisonChartData, setTimePeriod, getComparisonTickerData, clearErrorMessage } = useContext(StrategyContext);

  useEffect(() => {
    getStrategy(item._id, state.timePeriod);
  }, []);

  const changeTimePeriod = async (index) => {
    await setTimePeriod(index);
    getStrategy(item._id, index);
    getComparisonChartData(item._id, state.compTickerList.join(','), index);
    let tickers = state.strategy?.latestActions?.actions.filter(x => x.Action === 'Hold').map(function (elem) {
      return elem.Ticker;
    }).join(",");
    if (tickers) {
      getTickerData(item._id, tickers, index);
      getComparisonTickerData(state.strategy._id, state.compTickerList.join(','), state.timePeriod);
    }
  };
  let formattedStratValue = 0;
  if (state.strategy?.endValue) {
    formattedStratValue = `${getSymbolFromCurrency(RNLocalize.getCurrencies()[0])}${state.strategy?.endValue.toLocaleString(RNLocalize.getLocales()[0].languageTag, currencyFormat)}`;
  }

  var percent = state.strategy?.performancePct;

  let linecolour = '#FFFFFF';
  let plusminus = '';
  if (percent > 0) {
    plusminus = '+';
  }

  /// change button status for analysis and strategy
  var startegyButtonProps = {
    buttonStyle: isStartegyTab ? styles.buttonselected : styles.button,
    titleStyle: isStartegyTab ? styles.buttontitleselected : styles.buttontitle,
  };

  var analysisButtonProps = {
    buttonStyle: isAnalysisTab ? styles.buttonselected : styles.button,
    titleStyle: isAnalysisTab ? styles.buttontitleselected : styles.buttontitle,
  };

  const switchTab = (target) => {
    if (target === 'strategy') {
      setIsStartegyTab(true);
      setIsAnalysisTab(false);
    }
    else {
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
              {!item.iconid &&
                <Icon style={styles.icon} size={25} name='superpowers' />}
              {item.iconid &&
                <Image source={icondata[item.iconid].image} resizeMode='contain' style={styles.icon} />
              }
              <Text style={styles.toptitletext} >{state.strategy?.strategyName}</Text>
              <Icon style={styles.topicon} size={20} name='star' />

            </View>
            <StrategyDetailChart mastercolour={mastercolour} datasets={state.strategy.analytics} linecolour={linecolour} isAnalysisTab={isAnalysisTab} />
            <View style={styles.box1}>
              <View style={styles.box2}>
                <Text style={styles.numbertitletext}>{formattedStratValue}</Text>
                <Text style={styles.subtitletext}>Value</Text>
              </View>
              <IconStack actions={state.strategy?.latestActions?.actions} borderColor={mastercolour} size={28} />
              <View style={styles.box2}>
                <Text style={[styles.numbertitletext, { color: linecolour, textAlign: 'right' }]}>{plusminus}{percent}%</Text>
                <Text style={[styles.subtitletext, { textAlign: 'right' }]}>Performance</Text>
              </View>
            </View>
            <ButtonGroup
              onPress={index => changeTimePeriod(index)}
              selectedIndex={state.timePeriod}
              buttons={buttons}
              containerStyle={styles.buttongroupcontainer}
              selectedButtonStyle={styles.selectedbuttonstyle}
              selectedTextStyle={styles.selectedbuttonstyle}
              innerBorderStyle={styles.innerborderstyle}
              textStyle={styles.textstyle}
            />
          </View>
          <View style={styles.content} >
            <View style={styles.switchpanel} >
              <Button {...startegyButtonProps}
                title='Strategy'
                type='solid'
                //buttonStyle={styles.buttonselected}
                //titleStyle={styles.buttontitleselected} 
                onPress={() => switchTab('strategy')} />

              <Button {...analysisButtonProps}
                title='Analysis'
                type='solid'
                // buttonStyle={styles.button}
                // titleStyle={styles.buttontitle} 
                onPress={() => switchTab('analysis')} />
            </View>
          </View>
          <View style={styles.childrencontainer}>
            {isStartegyTab && <StrategyTab strategy={state.strategy} navigation={navigation} />}
            {isAnalysisTab && <AnalysisTab strategy={state.strategy} navigation={navigation} />}
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
    paddingHorizontal: 20
  },
  box2: {
    flex: 3,
    justifyContent: 'flex-start'
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
    backgroundColor: colors.silver,
    padding: 2.5,
    height: 40,
    width: 340
  },
  button: {
    backgroundColor: colors.silver,
    width: 166,
    borderRadius: 8,
    height: '100%'
  },
  buttontitle: {
    color: 'white',
    fontSize: 14,
    fontFamily: fonts.GraphikSemibold,
  },
  buttonselected: {
    backgroundColor: 'white',
    width: 166,
    borderRadius: 8,
    height: '100%'
  },
  buttontitleselected: {
    color: 'black',
    fontSize: 13,
    fontFamily: fonts.GraphikSemibold,
  },
  centerspacer: {
    width: 4,
  },
  titleiconcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    fontFamily: fonts.GraphikRegular,
    color: 'white',
    marginTop: 4
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
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: fonts.GraphikSemibold,
    color: 'white',
  },
  numbertitletext: {
    alignSelf: 'stretch',
    textAlign: 'left',
    fontSize: 22,
    fontFamily: fonts.GraphikSemibold,
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
  },
  buttongroupcontainer: {
    top: -15,
    height: 36,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  selectedbuttonstyle: {
    backgroundColor: 'transparent',
    color: 'white',
    opacity: 1,
    fontSize: 14,
    fontFamily: fonts.GraphikBold,
    borderRadius: 10
  },
  innerborderstyle: {
    color: 'transparent'
  },
  textstyle: {
    color: 'white',
    opacity: 0.4,
    fontSize: 14,
    fontFamily: fonts.GraphikRegular,
    borderRadius: 10
  },
  icon: {
    width: 34,
    height: 34,
    marginLeft: -5,
    marginTop: -5
  }
});

export default StrategySettingScreen;