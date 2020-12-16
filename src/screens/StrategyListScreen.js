import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Dimensions, View, FlatList } from 'react-native';
import { Layout, Card, Text } from '@ui-kitten/components';
import { Context as StrategyContext } from '../context/StrategyContext';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import StrategyListItem from '../components/StrategyListItem'
import { getChartEndDate, getChartStartDate } from '../components/modules/UiHelper';

const StrategyListScreen = ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  const { state, listStrategies, clearErrorMessage } = useContext(StrategyContext);

  useEffect(() => {
    const listener = navigation.addListener('didFocus', () => {
      listStrategies();
    });
    listStrategies();
  }, []);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <View style={styles.layoutcontainer}>
        <View style={styles.titleiconcontainer}>
          <Text style={styles.header}>My strategies</Text>
          <Icon style={styles.infoicon} size={20} name='info-circle' />
        </View>
        <View style={styles.content} >
          <FlatList
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={state.strategies}
            renderItem={({ item }) => <StrategyListItem item={item} navigation={navigation} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

StrategyListScreen.navigationOptions = {
  header: () => false,
  title: 'Strategies'
};

const styles = StyleSheet.create({
  layoutcontainer: {
    height: '100%',
    backgroundColor: 'white'
  },
  header: {
    fontWeight: '700',
    fontSize: 36,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'center',
    backgroundColor: '#F3F4F5',
    height: 75,
    padding: 20,
    top: -20
  },
  titleiconcontainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 20,
    marginBottom: 30
  },
  infoicon: {
    paddingLeft: 10,
    justifyContent: 'center',
    color: '#FFC234',
    alignSelf: 'center'
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  box2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 2
  },
  box3: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  textright: {
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  }
});

export default StrategyListScreen;