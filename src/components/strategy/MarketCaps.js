import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Text, Divider } from '@ui-kitten/components';
import CheckBox from '@react-native-community/checkbox';
import Spacer from '../../components/Spacer';

const MarketCaps = ({ strategy }) => {
    const [smallCap, setSmallCap] = useState(strategy.marketCaps.smallCap);
    const [midCap, setMidCap] = useState(strategy.marketCaps.midCap);
    const [largeCap, setLargeCap] = useState(strategy.marketCaps.largeCap);
    const [supraCap, setSupraCap] = useState(strategy.marketCaps.supraCap);

    return (
        <>
         <Spacer />
          <View style={styles.settingheadercontainer}>
            <Text style={styles.settingtitletext} category='h6' status='default'>Market Caps</Text>
          <Icon style={styles.icon} size={18} name='info-circle'/>
        </View>
        <Divider style={styles.shortdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Select Caps</Text>
            <View style={styles.multicontainer}>
              <View style={styles.settingcontainer}>
                <Text tyle={styles.settingtext} category='label' status='default'>Small Cap</Text>
                <CheckBox style={styles.circle}
                        lineWidth={1}
                            boxType='square'
                            onCheckColor='black'
                            onTintColor='#aaaaaa'
                            value={smallCap}
                            onValueChange={(selected) => setSmallCap(selected)}
                            />
              </View>
              <View style={styles.settingcontainer}>
                <Text tyle={styles.settingtext} category='label' status='default'>Mid Cap</Text>
                <CheckBox style={styles.circle}
                        lineWidth={1}
                            boxType='square'
                            onCheckColor='black'
                            onTintColor='#aaaaaa'
                            value={midCap}
                            onValueChange={(selected) => setMidCap(selected)}
                            />
              </View>
              <View style={styles.settingcontainer}>
                <Text tyle={styles.settingtext} category='label' status='default'>Large Cap</Text>
                <CheckBox style={styles.circle}
                        lineWidth={1}
                            boxType='square'
                            onCheckColor='black'
                            onTintColor='#aaaaaa'
                            value={largeCap}
                            onValueChange={(selected) => setLargeCap(selected)}
                            />
              </View>
              <View style={styles.settingcontainer}>
                <Text tyle={styles.settingtext} category='label' status='default'>Supras Cap</Text>
                <CheckBox style={styles.circle}
                        lineWidth={1}
                            boxType='square'
                            onCheckColor='black'
                            onTintColor='#aaaaaa'
                            value={supraCap}
                            onValueChange={(selected) => setSupraCap(selected)}
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
      color: 'white',
    },
  slider: {
    width: 180,
  }
  });
  
  export default MarketCaps;