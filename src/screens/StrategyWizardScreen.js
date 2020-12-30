import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { Dimensions, Platform } from 'react-native';
import HeaderBack from '../components/strategywizard/HeaderBack';
import * as Progress from 'react-native-progress';

import { colors } from '../components/modules/Colors';

import StrategyType from '../components/strategywizard/StrategyType';
import LookBackPeriod from '../components/strategywizard/LookBackPeriod';
import MarketSectors from '../components/strategywizard/MarketSectors';
import Regions from '../components/strategywizard/Regions';
import Volatility from '../components/strategywizard/Volatility';
import Investment from '../components/strategywizard/Investment';
import SetIcon from '../components/strategywizard/SetIcon';
import NameStratgey from '../components/strategywizard/NameStrategy';

const windowWidth = Dimensions.get('window').width;

const StrategyWizardScreen = ({ navigation }) => {
  const [pageNo, setPageNo] = useState(navigation.getParam('pageNo'));
  const pageTotal = 8 ;
  const strategyTypeSelected = (strategyType) => {
    console.log(strategyType);
    setPageNo(pageNo +1);
  };

  const lookBackPeriodSelected = (period) => {
    console.log(period);
    setPageNo(pageNo +1);
  };

  const marketSectorsSelected = (sectors) => {
    console.log(sectors);
    setPageNo(pageNo +1);
  };

  const regionSelected = (regions)=> {
    console.log(regions);
    setPageNo(pageNo +1);
  };

  const volatilitySelected = (id) => {
    console.log(id);
    setPageNo(pageNo +1);
  };

  const investmentSelected = (investment)=> {
    console.log(investment);
    setPageNo(pageNo +1);
  };

  const iconSelected = (icon)=> {
    console.log(icon);
    setPageNo(pageNo +1);
  };

  const nameSelected = (name)=> {
    console.log(name);
    setPageNo(pageNo +1);
  };

  const onBackPress = () => {
    if(pageNo > 1)
    {
      setPageNo(pageNo -1);
    }
    else
    {
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
      { pageNo === 1 ? <StrategyType navigation={navigation} onSelected={strategyTypeSelected} /> : null }

      { pageNo === 2 ? <LookBackPeriod navigation={navigation} onSelected={lookBackPeriodSelected} /> : null }
      
      { pageNo === 3 ? <MarketSectors navigation={navigation} onSelected={marketSectorsSelected} /> : null }

      { pageNo === 4 ? <Regions navigation={navigation} onSelected={regionSelected} /> : null }
      
      { pageNo === 5 ? <Volatility navigation={navigation} onSelected={volatilitySelected} /> : null }

      { pageNo === 6 ? <Investment navigation={navigation} onSelected={investmentSelected} /> : null }

      { pageNo === 7 ? <SetIcon navigation={navigation} onSelected={iconSelected} /> : null }

      { pageNo === 8 ? <NameStratgey navigation={navigation} onSelected={nameSelected} /> : null }

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
