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
  const [selectedIcon, setSelectedIcon] = useState(0);
  const [nameInvest, setNameInvest] = useState({ amounts: {} });
  const [pageNo, setPageNo] = useState(navigation.getParam('pageNo'));
  const pageTotal = 8;

  const strategyTypeSelected = (strategyType) => {
    if (state.strategy.strategyTypes.filter(x => x.setting !== 'none').length > 0) {
      state.strategy.strategyTypes.filter(x => x.setting !== 'none').forEach((stratType) => {
        RemoveStrategy(state.strategy.strategyTypes, stratType.typeName, updateStrategyTypes)
      });
    }
    let option = state.strategy.options.basicStrategySettingOptions[1];
    setStrategyType(strategyType.strategyType);
    AddStrategy(state.strategy.strategyTypes, strategyType.strategyType, updateStrategyTypes, option, 'basic');
    setPageNo(pageNo + 1);
  };

  const lookBackPeriodSelected = (period) => {
    setSelectedTypeId(period.id);
    let option = state.strategy.options.basicStrategySettingOptions[period.id];
    AddStrategy(state.strategy.strategyTypes, strategyType, updateStrategyTypes, option, 'basic');

    setPageNo(pageNo + 1);
  };

  const marketSectorsSelected = (sectordata) => {
    let sectorsInclude = sectordata.filter(x=> x.selected).map(x=> {
      return { tag : x.title};
    } );
    let sectorsExclude = [];
    let sectors = {sectorsInclude, sectorsExclude}
    updateSectors(sectors);
    setPageNo(pageNo + 1);
  };

  const regionSelected = (regions) => {
    updateRegions(regions.filter(x=> x.selected).map(x=> x.id));
    setPageNo(pageNo + 1);
  };

  const volatilitySelected = (volatility) => {
    updateVolatility(volatility);
    setPageNo(pageNo + 1);
  };

  const backtestSelected = (settings) => {
    let globalSpecs = {
      backtestingStart: settings.date, 
      benchmarkName: settings.benchmark.toLowerCase(), 
      emailUpdatesSetting: state.strategy.globalSpecifications.emailUpdatesSetting, 
      updateFrequency: state.strategy.globalSpecifications.updateFrequency
    };
    updateGlobalSpecifications(globalSpecs);
    setPageNo(pageNo + 1);
  };

  const iconSelected = (icon) => {
    setSelectedIcon(icon.iconid);
    updateIcon(icon.iconid);
    setPageNo(pageNo + 1);
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
      setPageNo(pageNo - 1);
    }
    else {
      navigation.goBack();
    }
  };


  return (
    <View style={styles.mainContainer}>
      {Platform.OS === 'ios' ? <StatusBar translucent barStyle="dark-content" /> :
        <StatusBar backgroundColor="white" barStyle="dark-content" />
      }

      <View style={{ height: 88 }}>
        <HeaderBack text={`${pageNo}/${pageTotal}`} onPress={() => onBackPress()} navigation={navigation} />
      </View>
      <View style={styles.progressContainer}>
        <Progress.Bar progress={pageNo / pageTotal} width={windowWidth - (40)} color={colors.yellowTheme} unfilledColor={colors.silver} borderWidth={0} />
      </View>
      { pageNo === 1 ? <StrategyType navigation={navigation} onSelected={strategyTypeSelected} /> : null}

      { pageNo === 2 ? <LookBackPeriod navigation={navigation} options={state.strategy.options.basicStrategySettingOptions} selected={selectedTypeId} onSelected={lookBackPeriodSelected} /> : null}

      { pageNo === 3 ? <MarketSectors navigation={navigation} sectorData={state.strategy.options.marketSectorOptions} onSelected={marketSectorsSelected} /> : null}

      { pageNo === 4 ? <Regions navigation={navigation} regionData={state.strategy.options.regionsOptions} onSelected={regionSelected} /> : null}

      { pageNo === 5 ? <Volatility navigation={navigation} options={state.strategy.options.strategyVolatityOptions} onSelected={volatilitySelected} /> : null}

      { pageNo === 6 ? <BackTest navigation={navigation} options={state.strategy.options.strategyBenchmarkOptions} onSelected={backtestSelected} /> : null}

      { pageNo === 7 ? <SetIcon navigation={navigation} selected={selectedIcon} onSelected={iconSelected} /> : null}

      { pageNo === 8 ? <NameStratgey navigation={navigation} investData={nameInvest} onSelected={nameInvestSelected} /> : null}

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
    backgroundColor: colors.white
  },
  progressContainer: {
    marginTop: (10),
    alignSelf: 'center',
    height: 10,
  },

});



export default StrategyWizardScreen;
