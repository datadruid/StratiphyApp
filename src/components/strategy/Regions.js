import React, {useState, useContext} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {  Divider } from 'react-native-elements';
import { Context as UpdateContext } from '../../context/StrategyUpdateContext';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Spacer from '../../components/Spacer';

const Regions = ({ strategy }) => {
  const { state, updateRegions } = useContext(UpdateContext);
    const [checkedArray, setcheckedArray] = useState(strategy.regions);

    const setToggleCheckBox = (selected, item) =>
    {
      var items = checkedArray;
      if(selected) {
        items.push(item.id);
      } else {
        items.splice(items.indexOf(item.id), 1);
      }
      setcheckedArray(items);
      updateRegions(items);
    }

    return (
        <>
        <Spacer />
        <View style={styles.settingheadercontainer}>
            <Text style={styles.settingtitletext} >Regions</Text>
          <Icon style={[styles.icon, {color: '#FFC234'}]} size={18} name='info-circle'/>
        </View>
        <Divider style={styles.shortdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Regions</Text>
              <View style={styles.container}>
              {strategy.options.regionsOptions.map(item => {
                  return (
                    <View key={item.id} style={styles.buttonContainer}>
                      <Text style={styles.buttonlabel}>{item.label}</Text>
                      <CheckBox style={styles.circle}
                        lineWidth={1}
                            boxType='square'
                            onCheckColor='black'
                            onTintColor='#aaaaaa'
                            value={checkedArray.includes(item.id)}
                            onValueChange={(selected) => setToggleCheckBox(selected, item)}
                            />
                    </View>
                  );
                })}
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
      paddingLeft: 15,
      fontSize: 20,
    fontWeight: 'bold'
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
  });
  
  export default Regions;