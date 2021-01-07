import React, {useContext} from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Context as UpdateContext } from '../../context/StrategyUpdateContext';
import CheckBox from '@react-native-community/checkbox';
import Spacer from '../../components/Spacer';

const MarketCaps = ({ strategy }) => {
  const { state, updateMarketCaps } = useContext(UpdateContext);

    const setCaps = (smallCap, midCap, largeCap, supraCap) =>
    {
      let caps = {
        smallCap: smallCap,
        midCap : midCap,
        largeCap : largeCap,
        supraCap: supraCap
      }
      updateMarketCaps(caps);
      
    };

    return (
        <>
         <Spacer />
          <View style={styles.settingheadercontainer}>
            <Text style={styles.settingtitletext} >Market Caps</Text>
          <Icon style={styles.icon} size={18} name='info-circle'/>
        </View>
        <Divider style={styles.shortdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} >Select Caps</Text>
            <View style={styles.multicontainer}>
              <View style={styles.settingcontainer}>
                <Text tyle={styles.settingtext} >Small Cap</Text>
                <CheckBox style={styles.circle}
                        lineWidth={1}
                            boxType='square'
                            onCheckColor='black'
                            onTintColor='#aaaaaa'
                            value={strategy.marketCaps.smallCap}
                            onValueChange={(selected) => {
                              setCaps(selected, strategy.marketCaps.midCap, strategy.marketCaps.largeCap, strategy.marketCaps.supraCap);
                            }}
                            />
              </View>
              <View style={styles.settingcontainer}>
                <Text tyle={styles.settingtext} >Mid Cap</Text>
                <CheckBox style={styles.circle}
                        lineWidth={1}
                            boxType='square'
                            onCheckColor='black'
                            onTintColor='#aaaaaa'
                            value={strategy.marketCaps.midCap}
                            onValueChange={(selected) => {
                              setCaps(strategy.marketCaps.midCap, selected, strategy.marketCaps.largeCap, strategy.marketCaps.supraCap);
                            }}
                            />
              </View>
              <View style={styles.settingcontainer}>
                <Text tyle={styles.settingtext} >Large Cap</Text>
                <CheckBox style={styles.circle}
                        lineWidth={1}
                            boxType='square'
                            onCheckColor='black'
                            onTintColor='#aaaaaa'
                            value={strategy.marketCaps.largeCap}
                            onValueChange={(selected) => {
                              setCaps(strategy.marketCaps.midCap, strategy.marketCaps.midCap, selected, strategy.marketCaps.supraCap);
                            }}
                            />
              </View>
              <View style={styles.settingcontainer}>
                <Text tyle={styles.settingtext} >Supras Cap</Text>
                <CheckBox style={styles.circle}
                        lineWidth={1}
                            boxType='square'
                            onCheckColor='black'
                            onTintColor='#aaaaaa'
                            value={strategy.marketCaps.supraCap}
                            onValueChange={(selected) => {
                              setCaps(strategy.marketCaps.midCap, strategy.marketCaps.midCap, strategy.marketCaps.largeCap, selected);
                            }}
                            />
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
      marginLeft: 10
    },
    checkedCircle: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: 'black',
    },
    settingcontainer: {
      flex: 1,
      paddingTop: 5,
      paddingHorizontal: 10,
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
    width: 180,
  }
  });
  
  export default MarketCaps;