import React , { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Dimensions, ActivityIndicator, Modal } from 'react-native';
import { Layout, Card, List, Text } from '@ui-kitten/components';
import { Context as StrategyContext } from '../context/StrategyContext';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import StrategyListItem from '../components/StrategyListItem'

const StrategyListScreen = ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  const { state, listStrategies, clearErrorMessage } = useContext(StrategyContext);

  useEffect( () => {
    const listener = navigation.addListener('didFocus', () => {
      listStrategies();
    });
    listStrategies();
  }, []);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Layout style={styles.layoutcontainer}>

          <List
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={state.strategies}
          renderItem={({item}) => <StrategyListItem info={item} navigation={navigation}/>}
        />

      </Layout>
    </SafeAreaView>
  );
};

StrategyListScreen.navigationOptions = {
  header: () => false,
  title: 'Strategies'
};

const styles = StyleSheet.create({
  layoutcontainer: {
    height: '100%'
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 7,
  },
  box1:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  box2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding:2
  },
  box3: {
    justifyContent: 'center',
    textAlign:'center',
  },
  textright: {
    justifyContent:'flex-end',
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