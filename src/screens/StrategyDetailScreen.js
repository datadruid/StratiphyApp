import React, { useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { LineChart } from 'react-native-chart-kit';
import * as RNLocalize from "react-native-localize";
import getSymbolFromCurrency from 'currency-symbol-map'

const mastercolour = '#4CD697';
const screenwidth = Dimensions.get("window").width;
const currencyFormat  = {
  style: "currency",
  currency: RNLocalize.getLocales()[0].languageTag
};

const StrategySettingScreen = ({navigation}) => {
  const item = navigation.getParam('item');
  const { signout } = useContext(AuthContext);

  let formattedStratValue = 0;
  if(item.endValue)
  {
    formattedStratValue = `${getSymbolFromCurrency(RNLocalize.getCurrencies()[0])}${item.endValue.toLocaleString(RNLocalize.getLocales()[0].languageTag, currencyFormat)}`;
  }

  let linecolour = '#FFFFFF';
  let plusminus = '-'
  if(item.performancePct > 0)
  {
    plusminus = '+';
  }

  const chartConfig = {
    backgroundColor: mastercolour,
    backgroundGradientFrom: mastercolour,
    backgroundGradientTo: mastercolour,
    fillShadowGradient :linecolour,
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
            <Icon style={styles.backiocn} size={40} name='long-arrow-left'/>
          </TouchableOpacity>
          <LineChart
      data={{
        labels: [""],
        datasets: [
          {
            data: item.analytics,
            color: () => linecolour
            ,strokeWidth: "2"
                    }
        ]
      }}
      fromZero={true}
      drawBorders={false}
      withDots ={false}
      withShadow={true}
      withOuterLines={false}
      withInnerLines={false}
      withHorizontalLabels={false}
      width={screenwidth + 5} // from react-native
      height={365}
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={chartConfig}
      bezier
      style={{
        flex: 1,
        marginVertical: 0,
        borderRadius: 0,
        margin: 0,
        paddingRight: 0
      }}
    />
        </View>
        <View style={styles.content} >
          <View style={styles.switchpanel} >
            <Button 
                  title='Strategy' 
                  type='solid'
                  buttonStyle={styles.buttonselected}
                  titleStyle={styles.buttontitleselected}/>
            
            <Button 
                title='Analysis'
                type='solid' 
                buttonStyle={styles.button}
                titleStyle={styles.buttontitle}/>
            </View>
          </View>
          <View style={styles.childrencontainer}>
            <View style={styles.titlelinkcontainer}>
              <View style={styles.titleiconcontainer}>
                <Text style={styles.titletext}>
                  Instructions
                </Text>
                <Icon style={styles.infoicon} size={20} name='info-circle'/>
              </View>  
              <Text style={styles.linktext}>
                See all
              </Text>
            </View>
            <View style={styles.instructioncontainer}>
              <View style={styles.instructionitemcontainer}>

              </View>
              <View style={styles.spacerContainer}/>
              <View style={styles.instructionitemcontainer}>

              </View>
              <View style={styles.spacerContainer}/>
            </View>
            <View style={styles.titleiconcontainer}>
              <Text style={styles.titletext}>
                Holdings
              </Text>
              <Icon style={styles.infoicon} size={20} name='info-circle'/>
            </View>
            <View style={styles.holdingcontainer}>
              <View style={styles.holdingitemcontainer}>

              </View>
              <View style={styles.linespacer}/>
              <View style={styles.holdingitemcontainer}>

              </View>
              <View style={styles.linespacer}/>
              <View style={styles.holdingitemcontainer}>

              </View>
            </View>
          </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

StrategySettingScreen.navigationOptions = {
  header: () => false,
  title: 'Strategy'
};

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    height:'100%',
    flexDirection: 'column',
    backgroundColor: '#E5E5E5',
  },
  hero: {
    width: '100%',
    height: 370,
    backgroundColor: '#4CD697',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#E5E5E5',
    height:75,
    padding: 20,
    top: -20
  },
  switchpanel: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#D8DADB',
    padding:2.5,
    height:40,
    width:340
  },
  button:{
    backgroundColor: '#D8DADB',
    width: 166,
    borderRadius: 8,
  },
  buttontitle:{
    color: 'white',
    fontSize:13,
    fontWeight: '600'
  },
  buttonselected:{
    backgroundColor: '#FFFFFF',
    width: 166,
    borderRadius: 8,
  },
  buttontitleselected: {
    color: 'black',
    fontSize:13,
    fontWeight: '600'
  },
  centerspacer: {
    width:4,
  },
  titleiconcontainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    
  },
  backiocn:{
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
  childrencontainer:{
    flex:1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20
  },
  titlelinkcontainer: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingBottom: 15
  },
  titletext: {
    fontSize: 20,
    fontWeight: '600'
  },
  linktext: {
    fontSize: 18,
    fontWeight: '400',
    color: '#FFC234'
  },
  instructioncontainer: 
  {
    paddingBottom:26
  },
  instructionitemcontainer:{
    backgroundColor: 'white',
    borderRadius: 12,
    height: 87,
    paddingBottom: 13
  },
  spacerContainer :{
    height:13
  },
  holdingcontainer: {
    marginTop:20,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  holdingitemcontainer: {
    height:75
  },
  linespacer:{
    backgroundColor:'#DBDEE7',
    height:1,
    marginHorizontal:20
  }
});

export default StrategySettingScreen;