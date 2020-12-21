import React, {useState, useContext} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Text, Divider } from '@ui-kitten/components';
import Slider from '@react-native-community/slider';
import Spacer from '../../components/Spacer';
import { Context as UpdateContext } from '../../context/StrategyUpdateContext';

const Classes = ({ strategy }) => {
  const { state, updateAssetClassAllocations } = useContext(UpdateContext);
    const [stocks, setStocks] = useState(parseInt(strategy.assetClassAllocations.stocks));
    const [bonds, setBonds] = useState(parseInt(strategy.assetClassAllocations.bonds));
    const [funds, setFunds] = useState(parseInt(strategy.assetClassAllocations.funds));

    const udpdateAllThree =(master, value) =>
    {
      let remains = 100-value;
      let balance = 0;

      switch(master)
      {
        case 'stocks':
          balance = Math.floor((remains - (bonds + funds))/2);
          setStocks(value);
          if(bonds + balance >= 0) {
            setBonds(bonds + balance);
          }
          if(100 - (stocks + bonds) >= 0) {
            setFunds(100 - (stocks + bonds));
          }
          break;
        case 'bonds':
          balance = Math.floor((remains - (stocks + funds))/2);
          setBonds(value);
          if(stocks + balance >= 0) {
            setStocks(stocks + balance);
          }
          if(100 - (stocks + bonds) >= 0) {
            setFunds(100 - (stocks + bonds));
          }
          break;
        case 'funds':
          balance = Math.floor((remains - (bonds + stocks))/2);
          setFunds(value);
          if(stocks + balance >= 0) {
            setStocks(stocks + balance);
          }
          if(100 - (stocks + funds) >= 0) {
            setBonds(100 - (stocks + funds));
          }
          break;
      }

      let classes =  {
        stocks: stocks,
        bonds: bonds,
        funds: funds
      }
      updateAssetClassAllocations(classes);
    };

    return (
        <>
        <Spacer />
        <View style={styles.settingheadercontainer}>
            <Text style={styles.settingtitletext} category='h6' status='default'>Asset Classes</Text>
          <Icon style={styles.icon} size={18} name='info-circle'/>
        </View>
        <Divider style={styles.shortdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Select classes</Text>
            <View style={styles.slidercontainer}>
              <View style={styles.settingcontainer}>
                <Text tyle={styles.settingtext} category='label' status='default'>Stocks</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor="#000000"
                  maximumTrackTintColor="#FFFFFF"
                  value={stocks}
                  onValueChange={value => {
                    udpdateAllThree('stocks', Math.ceil(value));
                  }}
                />
                <Text tyle={styles.settingtext} category='label' status='default'>{stocks}%</Text>
              </View>
              <View style={styles.settingcontainer}>
                <Text tyle={styles.settingtext} category='label' status='default'>Bonds</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor="#000000"
                  maximumTrackTintColor="#FFFFFF"
                  value={bonds}
                  onValueChange={value => 
                    {
                      udpdateAllThree('bonds', Math.ceil(value));
                    }}
                />
                <Text tyle={styles.settingtext} category='label' status='default'>{bonds}%</Text>
              </View>
              <View style={styles.settingcontainer}>
                <Text tyle={styles.settingtext} category='label' status='default'>Funds</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor="#000000"
                  maximumTrackTintColor="#FFFFFF"
                  value={funds}
                  onValueChange={value => 
                    {
                      udpdateAllThree('funds', Math.ceil(value));
                    }}
                />
                <Text tyle={styles.settingtext} category='label' status='default'>{funds}%</Text>
              </View>
            </View>
          </View>
          <Divider style={styles.longdivider} />
    </>
    );
  };
  
  const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'stretch',
      marginTop: 10,
      paddingBottom:10
    },
    buttonlabel: {
      marginRight: 15
    },
    container: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'stretch'
    },
    circle: {
      height: 20,
      width: 20,
    },
    checkedCircle: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: 'black',
    },
    slidercontainer: {
marginTop: 8
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
    spacer: {
      margin: 10
    },
    icon: {
      paddingTop: 10,
      paddingBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      color: '#FFC234'
    },
  slider: {
    width: 150,
  }
  });
  
  export default Classes;