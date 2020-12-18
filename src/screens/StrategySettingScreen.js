import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native';
import { Layout, Input, Text, Divider } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import TagInput from 'react-native-tags-input';
import Spacer from '../components/Spacer';
import StrategyType from '../components/strategy/StrategyType';
import TimeHorizon from '../components/strategy/TimeHorizon';
import DateType from '../components/strategy/DateType';
import EmailUpdates from '../components/strategy/EmailUpdates';
import Regions from '../components/strategy/Regions';
import Classes from '../components/strategy/Classes';
import MarketCaps from '../components/strategy/MarketCaps';
import Sectors from '../components/strategy/Sectors';
import Tickers from '../components/strategy/Tickers';
import { Context as UpdateContext } from '../context/StrategyUpdateContext';

const chartConfig = {
  backgroundColor: "",
  backgroundGradientFrom: "",
  backgroundGradientTo: "",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 0
  }
};

const StrategySettingScreen = ({ navigation }) => {
  const item = navigation.getParam('item');
  const { state, setStartegy, updateName, updateDescription } = useContext(UpdateContext);

    useEffect(() => {
      setStartegy(item);
  }, []); 

  if(state.strategy.UserID)
  {
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Layout style={styles.layoutcontainer}>
        <ScrollView >
          <Spacer />
          <Input 
            style={styles.input}
            value={state.strategy.strategyName}
            label='Name:'
            onChangeText={nextValue => updateName(nextValue)}
          />
         <Spacer />
         <Input 
          style={styles.input}
          value={state.strategy.strategyDescription}
          label='Description:'
          onChangeText={nextValue => updateDescription(nextValue)}
        />
          <Divider style={styles.shortdivider} />
          <Spacer />
 
          <StrategyType strategy={state.strategy}/>

        <Spacer />
          <View style={styles.settingheadercontainer}>
            <Text style={styles.settingtitletext} category='h6' status='default'>Timings</Text>
            <Icon style={styles.icon} size={18} name='info-circle'/>
          </View>

          <Divider style={styles.shortdivider} />
          <Spacer />

          <TimeHorizon strategy={state.strategy}/>
           
          <DateType backtestingStart={state.strategy.globalSpecifications.backtestingStart}/>

          <Divider style={styles.shortdivider} />

          <EmailUpdates strategy={state.strategy}/>

          <Regions strategy={state.strategy}/> 

          <Classes strategy={state.strategy}/> 
       
          <MarketCaps strategy={state.strategy}/>  
          
          <Sectors strategy={state.strategy}/> 

          <Tickers strategy={state.strategy}/> 
        

        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
        }
        else{
          return (
          <SafeAreaView forceInset={{ top: 'always' }}>
          <Layout style={styles.layoutcontainer}>
          </Layout>
        </SafeAreaView>
          );
        }
};



const styles = StyleSheet.create({
  layoutcontainer: {
    height: '100%'
  },
  multicontainer: {
    flex: 1,
  },
  longdivider: {
    borderBottomColor: 'lightgrey',
    marginTop: 5,
    marginBottom: 5
  },
  shortdivider: {
    borderBottomColor: 'lightgrey',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20
  },
  settingcontainer: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  settingheadercontainer: {
    flex: 1,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  checkboxgroup: {
    paddingVertical: 5
  },
  chartcontainer:{
    paddingHorizontal: 20
  },
  text: {
    paddingLeft: 20
  },
  settingtext: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  settingtitletext: {
    textAlignVertical: "center",
    paddingLeft: 15
  },
  icon: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  input:{
    marginHorizontal: 20
  }
});

StrategySettingScreen.navigationOptions = {
  title: 'Strategy'
};

export default StrategySettingScreen;
