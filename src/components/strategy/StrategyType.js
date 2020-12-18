import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Overlay } from 'react-native-elements';
import { Text, Divider, List, Layout } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Context as UpdateContext } from '../../context/StrategyUpdateContext';

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
    let index = state.strategy.strategyTypes.findIndex(x => x.typeName === strategyType.typeName);
    let updatedType = {
      setting: 'basic',
      specifications: {
        periodicities: 'Months',
        periods: 6,
        weightings: 1
      },
      typeName: state.strategy.strategyTypes[index].typeName
    }
    updateStrategyTypes(index, updatedType);

    setVisible(false);
    setUpdated(true);
  };

  const removeStrategy = (strategyType) => {
    let index = state.strategy.strategyTypes.findIndex(x => x.typeName === strategyType.typeName);
    let updatedType = {
      setting: 'none',
      specifications: {},
      typeName: state.strategy.strategyTypes[index].typeName
    }
    updateStrategyTypes(index, updatedType);
    setUpdated(true);
  };
  return (
    <>
      <View style={styles.settingheadercontainer}>
        <Text style={styles.settingtitletext} category='h6' status='default'>Strategy type</Text>
        <Icon style={styles.icon} size={18} name='info-circle' />
      </View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View>
          <Text category='h6' status='default'>Add a strategy</Text>
          {
            strategy.strategyTypes.filter(x => x.setting === 'none').map(strategyType => {
              return (
                <View>
                  <TouchableOpacity style={styles.touch} onPress={() => addStrategy(strategyType)}>
                    <Text style={styles.settingtext} category='p1' status='default'>{strategy.options.strategyTypeOptions.find(x => x.id === strategyType.typeName).text}</Text>
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
            <Layout key={strategyType.typeName} style={styles.settingcontainer}>
              <Text style={styles.settingtext} category='p1' status='default'>{strategy.options.strategyTypeOptions.find(x => x.id === strategyType.typeName).text}</Text>
              <TouchableOpacity style={styles.touch} onPress={() => removeStrategy(strategyType)}>
                <Icon style={styles.icon} size={20} name='minus' />
              </TouchableOpacity>
            </Layout>
          );
        })}

      <Layout style={styles.settingcontainer}>
        <Text style={styles.settingtext} category='p1' status='default'></Text>
        <TouchableOpacity style={styles.touch} onPress={() => toggleOverlay()}>
          <Icon style={styles.icon} size={20} name='plus' />
        </TouchableOpacity>
      </Layout>
      <Divider style={styles.longdivider} />
    </>
  );
};

const styles = StyleSheet.create({
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
    textAlignVertical: 'center',
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
    color: 'black',
  },
  touch: {
    paddingLeft: 10
  }
});

export default StrategyType;