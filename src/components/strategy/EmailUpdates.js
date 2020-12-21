import React, {useContext} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Divider, List, RadioGroup, Radio, Layout } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Spacer from '../../components/Spacer';
import RadioButtons from '../../components/strategy/RadioButtons'
import { Context as UpdateContext } from '../../context/StrategyUpdateContext';

const EmailUpdates = ({ strategy }) => {
  const { state, updateGlobalSpecifications } = useContext(UpdateContext);
  const id = strategy.options.emailUpdatesOptions.find(x=> x.label.toLowerCase() === strategy.globalSpecifications.emailUpdatesSetting.toLowerCase()).id;
  const updateChanged = (parentItem, option) => {
    let specs = {
      backtestingStart : parentItem.backtestingStart,
      benchmarkName : parentItem.benchmarkName,
      emailUpdatesSetting : option.label.toLowerCase(),
      updateFrequency : parentItem.updateFrequency
    };
    updateGlobalSpecifications(specs);
    
  };

    return (
        <>
          <View style={styles.settingcontainer}>
              <Text style={styles.settingtext} category='p1' status='default'>Email updates</Text>
              <View style={styles.container}>
                <RadioButtons options={strategy.options.emailUpdatesOptions} selectedId={id} selectedAction={updateChanged} parentItem={strategy.globalSpecifications}/>
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
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ACACAC',
      alignItems: 'center',
      justifyContent: 'center',
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
  
  export default EmailUpdates;