import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { Dimensions, Platform } from 'react-native';
import HeaderBack from '../components/strategywizard/HeaderBack';
import * as Progress from 'react-native-progress';
import { Context as UpdateContext } from '../context/StrategyUpdateContext';
import { colors } from '../components/modules/Colors';

import StrategyType from '../components/strategywizard/StrategyType';
import LookBackPeriod from '../components/strategywizard/LookBackPeriod';
import MarketSectors from '../components/strategywizard/MarketSectors';
import Regions from '../components/strategywizard/Regions';
import Volatility from '../components/strategywizard/Volatility';
import SetIcon from '../components/strategywizard/SetIcon';
import NameStratgey from '../components/strategywizard/NameStrategy';
import BackTest from '../components/strategywizard/BackTest';

import { AddStrategy, RemoveStrategy } from '../components/modules/StrategyUpdates';

const windowWidth = Dimensions.get('window').width;

const StrategyWizardScreen = ({ navigation }) => {
  const { state, updateStrategyTypes, updateSectors, updateRegions, updateVolatility, updateGlobalSpecifications, updateIcon, updateName, updateDescription, updateInvestment } = useContext(UpdateContext);
  const [selectedTypeId, setSelectedTypeId] = useState(-1);
  const [strategyType, setStrategyType] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(Math.floor(Math.random() * (50 - 0 + 1)) + 0);
  const [nameInvest, setNameInvest] = useState({ amounts: { startingAmount: '10000', monthlyAmount: '0' } });
  const [pageNo, setPageNo] = useState(navigation.getParam('pageNo'));
  const [showtotal, setShowtotal] = useState(navigation.getParam('showtotal'));
  const [title, setTitle] = useState('');
  const [pageTotal, setPageTotal] = useState(7);
  let iconShowTotal = false;

  if (navigation.getParam('title') && !title) {
    setTitle(navigation.getParam('title'));
  }

  const nextPage = () => {
    setPageNo(pageNo + 1);
  };

  const strategyTypeSelected = (strategyType) => {
    setTitle(strategyType.strategyType);
    if (state.strategy.strategyTypes.filter(x => x.setting !== 'none').length > 0) {
      state.strategy.strategyTypes.filter(x => x.setting !== 'none').forEach((stratType) => {
        RemoveStrategy(state.strategy.strategyTypes, stratType.typeName, updateStrategyTypes)
      });
    }
    let option = state.strategy.options.basicStrategySettingOptions[1];
    setStrategyType(strategyType.strategyType);
    AddStrategy(state.strategy.strategyTypes, strategyType.strategyType, updateStrategyTypes, option, 'basic');
  };

  const lookBackPeriodSelected = (period) => {
    setSelectedTypeId(period.id);
    let option = state.strategy.options.basicStrategySettingOptions[period.id];
    AddStrategy(state.strategy.strategyTypes, strategyType, updateStrategyTypes, option, 'basic');
  };

  const marketSectorsSelected = (sectordata) => {
    let sectorsInclude = sectordata.filter(x => x.selected).map(x => {
      return { tag: x.title };
    });
    let sectorsExclude = [];
    let sectors = { sectorsInclude, sectorsExclude }
    updateSectors(sectors);
    setPageNo(pageNo + 1);
  };

  const regionSelected = (regions) => {
    updateRegions(regions.filter(x => x.selected).map(x => x.id));
    setPageNo(pageNo + 1);
  };

  const volatilitySelected = (volatility) => {
    updateVolatility(volatility);
    setPageNo(pageNo + 1);
  };

  const backtestSelected = (settings) => {
    let globalSpecs = {
      backtestingStart: settings.date,
      benchmarkName: settings.benchmark.toUpperCase(),
      emailUpdatesSetting: state.strategy.globalSpecifications.emailUpdatesSetting,
      updateFrequency: state.strategy.globalSpecifications.updateFrequency
    };
    updateGlobalSpecifications(globalSpecs);
    setPageNo(pageNo + 1);
  };

  const iconEdit = () => {
    iconShowTotal = showtotal;
    setShowtotal(false);
    setPageNo(8);
  };

  const iconSelected = (icon) => {
    setSelectedIcon(icon.iconid);
    updateIcon(icon.iconid);
    setShowtotal(iconShowTotal);
    setPageNo(pageNo-1);
  };

  const nameInvestSelected = (data) => {
    setNameInvest(data);
    updateInvestment(data.amounts);
    updateName(data.name);
    updateDescription(data.description);
    navigation.navigate('StrategySummary');
  };

  const onBackPress = () => {
    if (pageNo > 1) {
      if(pageNo == 8) {
          setPageNo(pageNo - 1);
      }
      else if (showtotal) {
        setPageNo(pageNo - 1);
      }
      else {
        navigation.goBack();
      }
    }
    else {
      navigation.goBack();
    }
  };

  console.log(pageNo);
  return (
    <View style={styles.mainContainer}>

      <View style={{ height: Platform.OS === 'ios' ? 88 : 44 }}>
        <HeaderBack text={`${pageNo}/${pageTotal}`} showtotal={showtotal} onLeftPress={() => onBackPress()} navigation={navigation} />
      </View>
      <View style={styles.progressContainer}>
        <Progress.Bar progress={pageNo / pageTotal} width={windowWidth - (40)} color={colors.yellowTheme} unfilledColor={colors.silver} borderWidth={0} />
      </View>
      { pageNo === 1 ? <StrategyType navigation={navigation} selected={state.strategy.strategyTypes} onSelected={strategyTypeSelected} nextPage={nextPage} /> : null}

      { pageNo === 2 ? <LookBackPeriod navigation={navigation} options={state.strategy.options.basicStrategySettingOptions} selected={selectedTypeId} onSelected={lookBackPeriodSelected} nextPage={nextPage} /> : null}

      { pageNo === 3 ? <MarketSectors navigation={navigation} sectorData={state.strategy.options.marketSectorOptions} onSelected={marketSectorsSelected} /> : null}

      { pageNo === 4 ? <Regions navigation={navigation} regionData={state.strategy.options.regionsOptions} onSelected={regionSelected} /> : null}

      { pageNo === 5 ? <Volatility navigation={navigation} options={state.strategy.options.strategyVolatityOptions} onSelected={volatilitySelected} /> : null}

      { pageNo === 6 ? <BackTest navigation={navigation} options={state.strategy.options.strategyBenchmarkOptions} selected={state.strategy.globalSpecifications} onSelected={backtestSelected} /> : null}

      { pageNo === 7 ? <NameStratgey navigation={navigation} investData={nameInvest} selected={selectedIcon} strategyType={title} onSelected={nameInvestSelected} onSuplimental={iconEdit} /> : null}

      { pageNo === 8 ? <SetIcon navigation={navigation} selected={selectedIcon} onSelected={iconSelected} /> : null}

    </View>
  );

};



StrategyWizardScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  progressContainer: {
    marginTop: (10),
    alignSelf: 'center',
    height: 10,
  },

});



export default StrategyWizardScreen;
