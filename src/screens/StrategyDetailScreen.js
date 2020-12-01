import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Layout, Input, Card, List, Text, Button, ButtonGroup, Toggle, RadioGroup, Radio, CheckBox, Datepicker, Divider } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import TagInput from 'react-native-tags-input';
import Spacer from '../components/Spacer';
import { LineChart } from "react-native-chart-kit";
import StrategyType from '../components/strategy/StrategyType';
import TimeHorizon from '../components/strategy/TimeHorizon';
import DateType from '../components/strategy/DateType';
import EmailUpdates from '../components/strategy/EmailUpdates';
import Regions from '../components/strategy/Regions';
import Classes from '../components/strategy/Classes';
import MarketCaps from '../components/strategy/MarketCaps';
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

const StrategyDetailScreen = ({ navigation }) => {
  const item = navigation.getParam('item');
  const { state, getStrategy, clearErrorMessage } = useContext(StrategyContext);


  useEffect( () => {
    getStrategy(item.strategyID);
 }, []);


  const [intags, setIntags] = useState({
    tag: '',
    tagsArray: ['All']
  });
  const [outtags, setOuttags] = useState({
    tag: '',
    tagsArray: ['Utilities']
  });
  const [intics, setIntics] = useState({
    tag: '',
    tagsArray: ['FTSE 100']
  });
  const [outtics, setOuttics] = useState({
    tag: '',
    tagsArray: ['III.L', 'TW.L', 'BT.A.L']
  });

  updateTagState = (state) => {
    //console.log(state);
    //setTags()
  };

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Layout style={styles.layoutcontainer}>
        <Spacer />
        <Text style={styles.text} category='h5' status='default'>{item.strategyName}</Text>
        <ScrollView >
         <Spacer />
          <Text style={styles.text} status='default'>{item.strategyDescription}</Text>
          <Divider style={styles.shortdivider} />
          <Spacer />
 
          <StrategyType strategy={item}/>

        <Spacer />
          <View style={styles.settingheadercontainer}>
            <Text style={styles.settingtitletext} category='h6' status='default'>Timings</Text>
            <Icon style={styles.icon} size={18} name='info-circle'/>
          </View>

          <Divider style={styles.shortdivider} />
          <Spacer />

          <TimeHorizon strategy={item}/>
           
          <DateType backtestingStart={item.globalSpecifications.backtestingStart}/>

          <Divider style={styles.shortdivider} />

          <EmailUpdates strategy={item}/>

          <Regions strategy={item}/> 

          <Classes strategy={item}/> 
       
          <MarketCaps strategy={item}/>  
          
          

          <Spacer />
          <View style={styles.settingheadercontainer}>
            <Text style={styles.settingtitletext} category='h6' status='default'>Sectors</Text>
          <Icon style={styles.icon} size={18} name='info-circle'/>
        </View>
          
          <Divider style={styles.longdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Include Sectors</Text>
            <View style={styles.multicontainer}>
              <TagInput style={{ borderBottomColor: 'white' }}
                updateState={this.updateTagState}
                tags={intags}
              />
            </View>
          </View>
          <Divider style={styles.shortdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Excude Sectors</Text>
            <View style={styles.multicontainer}>
              <TagInput style={{ borderBottomColor: 'white' }}
                updateState={this.updateTagState}
                tags={outtags}
              />
            </View>
          </View>
          <Divider style={styles.longdivider} />
          <Spacer />

          <View style={styles.settingheadercontainer}>
            <Text style={styles.settingtitletext} category='h6' status='default'>Tickers</Text>
          <Icon style={styles.icon} size={18} name='info-circle'/>
        </View>
          
          <Divider style={styles.longdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Tickers to include</Text>
            <View style={styles.multicontainer}>
              <TagInput style={{ borderBottomColor: 'white' }}
                updateState={this.updateTagState}
                tags={intics}
              />
            </View>
          </View>
          <Divider style={styles.shortdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Tickers to exclude</Text>
            <View style={styles.multicontainer}>
              <TagInput style={{ borderBottomColor: 'white' }}
                updateState={this.updateTagState}
                tags={outtics}
              />
            </View>
          </View> 


        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
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
  }
});

StrategyDetailScreen.navigationOptions = {
  title: 'Strategy'
};

export default StrategyDetailScreen;
