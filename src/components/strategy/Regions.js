import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Divider } from '@ui-kitten/components';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Spacer from '../../components/Spacer';

const Regions = ({ strategy }) => {
    const [checkedArray, setcheckedArray] = useState(strategy.regions);

    
    const setToggleCheckBox = (selected, item) =>
    {
      var items = checkedArray;
      if(selected) {
        items.push(item.id);
      } else {
        items.pop(items.indexOf(item.id), 1);
      }
      setcheckedArray(items);
    }

    return (
        <>
        <Spacer />
        <View style={styles.settingheadercontainer}>
            <Text style={styles.settingtitletext} category='h6' status='default'>Regions</Text>
          <Icon style={styles.icon} size={18} name='info-circle'/>
        </View>
        <Divider style={styles.shortdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Regions</Text>
              <View style={styles.container}>
              {strategy.options.regionsOptions.map(item => {
                //console.log('did radios');
                  return (
                    <View key={item.id} style={styles.buttonContainer}>
                      <Text style={styles.buttonlabel}>{item.label}</Text>
                      <CheckBox style={styles.circle}
                        lineWidth={1}
                            boxType='square'
                            onCheckColor='white'
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
  });
  
  export default Regions;