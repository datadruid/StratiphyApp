import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button, Input, Text, Divider } from 'react-native-elements';
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
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
import Preview from '../components/strategy/Preview';
import { Context as UpdateContext } from '../context/StrategyUpdateContext';
import { Context as StrategyContext } from '../context/StrategyContext';

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
  const [visible, setVisible] = useState(false);
  const { state, setStrategy, updateName, updateDescription } = useContext(UpdateContext);
  const { previewStrategy, uploadStrategy, listStrategies } = useContext(StrategyContext);
    useEffect(() => {
      setStrategy(item);
  }, []); 

  const closeWindow = () => {
    navigation.goBack();
  };

  const openPreview = () => {
    previewStrategy(state.strategy);
    setVisible(true);
  };

  const closePreview = () => {
    setVisible(false);
  };

  const saveStrategy = () => {
    uploadStrategy(state.strategy);
    setVisible(false);
    navigation.navigate('StrategyList');
    listStrategies(true);
  };

  if(state.strategy.UserID)
  {
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <View style={styles.layoutcontainer}>
      <TouchableOpacity onPress={() => closeWindow()}>
          <Icon style={styles.backicon} size={40} name='long-arrow-left' />
        </TouchableOpacity>
        <View style={styles.titleiconcontainer}>
          <Text style={styles.header}>Edit Strategy</Text>
          <Icon style={styles.infoicon} size={20} name='info-circle' />
        </View>
        <View style={styles.content} >
        <ScrollView >
          <Spacer />
          <Input 
            style={styles.input}
            inputContainerStyle ={styles.inputcontainer}
            value={state.strategy.strategyName}
            label='Name:'
            onChangeText={nextValue => updateName(nextValue)}
          />
         <Input 
          style={styles.input}
          inputContainerStyle ={styles.inputcontainer}
          value={state.strategy.strategyDescription}
          label='Description:'
          onChangeText={nextValue => updateDescription(nextValue)}
        />
          <Divider style={styles.shortdivider} />
          <Spacer />
 
          <StrategyType strategy={state.strategy}/>

        <Spacer />
          <View style={styles.settingheadercontainer}>
            <Text style={styles.settingtitletext} >Timings</Text>
            <Icon style={[styles.icon, {color: '#FFC234'}]} size={18} name='info-circle'/>
          </View>

          <Divider style={styles.shortdivider} />
          <Spacer />

          <TimeHorizon strategy={state.strategy}/>
           
          <DateType globalSpecifications={state.strategy.globalSpecifications} backtestingStart={state.strategy.globalSpecifications.backtestingStart}/>

          <Divider style={styles.shortdivider} />

          <EmailUpdates strategy={state.strategy}/>

          <Regions strategy={state.strategy}/> 

          <Sectors strategy={state.strategy}/> 

          <Classes strategy={state.strategy}/> 
       
          <MarketCaps strategy={state.strategy}/>  
          
          <Sectors strategy={state.strategy}/> 

          <Tickers strategy={state.strategy}/> 
        
          <Modal fullScreen={false}
          style={styles.overlay} isVisible={visible} onBackdropPress={closePreview}>
            <Preview strategy={state.strategy} saveStrategy={saveStrategy} closeWindow={closePreview}/>
            
          </Modal>

        </ScrollView>
        </View>
        <View style={styles.buttoncontainer}>
      <Button buttonStyle={styles.button}
          onPress={openPreview}
          titleStyle={styles.buttontitle}
          title='Preview Performance'
          type='solid'/>
        </View>
      </View>
    </SafeAreaView>
  );
        }
        else{
          return (
          <SafeAreaView forceInset={{ top: 'always' }}>
          <View style={styles.layoutcontainer}>
          </View>
        </SafeAreaView>
          );
        }
};

const styles = StyleSheet.create({
  layoutcontainer: {
    height: '100%',
    backgroundColor: 'white'
  },
  overlay: {
    marginHorizontal:0,
    marginTop: 95,
    marginBottom: 0
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'center',
    backgroundColor: '#F3F4F5',
  },
  overlaycontent: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'center',
    backgroundColor: '#4CD697',
    margin:0,
    padding:0,
    height:'100%',
  },
  titleiconcontainer: {
    flex:0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backicon: {
    marginLeft: 25,
    paddingTop: 20,
    justifyContent: 'center',
    color: '#FFC234',
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
    paddingLeft: 15,
    fontSize: 20,
    fontWeight: 'bold'
  },
  header: {
    width:240,
    fontWeight: '700',
    fontSize: 36,
    alignSelf: 'stretch',
    textAlign: 'left',
  },
  icon: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  infoicon: {
    justifyContent: 'center',
    color: '#FFC234',
    alignSelf: 'center'
  },
  input:{
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 5,
    
  },
  inputcontainer:{
    borderBottomWidth:0
  },
  buttoncontainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#FFC234',
    borderRadius: 12,
    margin: 5
  },
  buttontitle: {
    marginHorizontal: 20,
    fontWeight: 'bold'
  },
  whitebutton: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 5
  },
  whitebuttontitle: {
    marginHorizontal: 20,
    color: '#FFC234',
    fontWeight: 'bold'
  }
});

StrategySettingScreen.navigationOptions = {
  header: () => false,
  title: 'Strategy'
};

export default StrategySettingScreen;
