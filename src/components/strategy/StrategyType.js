import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Overlay, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Context as UpdateContext } from '../../context/StrategyUpdateContext';
import { AddStrategy, RemoveStrategy } from '../modules/StrategyUpdates'

const StrategyType = ({ strategy }) => {
  const types = strategy.strategyTypes.filter(x => x.setting !== 'none');
  const { state, updateStrategyTypes } = useContext(UpdateContext);
  const [visible, setVisible] = useState(false);
  const [updated, setUpdated] = useState(false);
  
  if (updated) {
    setUpdated(false);
  }

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const addStrategy = (strategyType) => {
    let option = {periodicities: 'Months',
    periods: 6,
    weightings: 1};
    AddStrategy(state.strategy.strategyTypes, strategyType.typeName, updateStrategyTypes, option, 'basic');

    setVisible(false);
    setUpdated(true);
  };

  const removeStrategy = (strategyType) => {
    RemoveStrategy(state.strategy.strategyTypes, strategyType.typeName, updateStrategyTypes);

    setUpdated(true);
  };
  return (
    <View styles={styles.container}>
      <View style={styles.settingheadercontainer}>
        <Text style={styles.settingtitletext}>Strategy type</Text>
        <Icon style={[styles.icon, {color: '#FFC234'}]} size={18} name='info-circle' />
      </View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View>
          <Text>Add a strategy</Text>
          {
            strategy.strategyTypes.filter(x => x.setting === 'none').map(strategyType => {
              return (
                <View>
                  <TouchableOpacity style={styles.touch} onPress={() => addStrategy(strategyType)}>
                    <Text style={styles.settingtext} >{strategy.options.strategyTypeOptions.find(x => x.id === strategyType.typeName).text}</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          }
        </View>
      </Overlay>
      <Divider style={styles.longdivider} />
      {
        types.map(strategyType => {

          return (
            <View key={strategyType.typeName} style={styles.settingcontainer}>
              <Text style={styles.settingtext} >{strategy.options.strategyTypeOptions.find(x => x.id === strategyType.typeName).text}</Text>
              <TouchableOpacity style={styles.touch} onPress={() => removeStrategy(strategyType)}>
                <Icon style={styles.icon} size={20} name='minus' />
              </TouchableOpacity>
            </View>
          );
        })}

      <View style={styles.settingcontainer}>
        <Text style={styles.settingtext} ></Text>
        <TouchableOpacity style={styles.touch} onPress={() => toggleOverlay()}>
          <Icon style={styles.icon} size={20} name='plus' />
        </TouchableOpacity>
      </View>
      <Divider style={styles.longdivider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    borderRadius: 12,
    backgroundColor: 'white'
  },
  settingcontainer: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  settingheadercontainer: {
    flex: 1,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingtext: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  settingtitletext: {
    textAlignVertical: 'center',
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
    color: 'black',
  },
  touch: {
    paddingLeft: 10
  }
});

export default StrategyType;