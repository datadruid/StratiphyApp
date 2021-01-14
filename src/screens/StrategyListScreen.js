import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Image, View, FlatList, Text, RefreshControl } from 'react-native';
import { Context as StrategyContext } from '../context/StrategyContext';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { colors } from '../components/modules/Colors';
import { fonts } from '../components/modules/Fonts';
import StrategyListItem from '../components/strategylist/StrategyListItem';

const StrategyListScreen = ({ navigation }) => {
  const { state, listStrategies, clearErrorMessage } = useContext(StrategyContext);
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = React.useCallback(async () => {
    if (refreshing) {
      return;
    }
    setRefreshing(true);
    await listStrategies(false);
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <View style={styles.layoutcontainer}>
        <View style={styles.titleiconcontainer}>
          <Text style={styles.header}>My strategies</Text>
          {/* <Icon style={styles.infoicon} size={20} name='info-circle' /> */}
        </View>
        <View style={styles.content} >
          <FlatList
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={state.strategies}
            extraData={refresh}
            keyExtractor={(item, index) => item._id}
            renderItem={({ item, index }) => <StrategyListItem item={item} navigation={navigation} index={index} list={state.strategies} />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
    width:'100%',
    fontFamily: fonts.InterExtraBold
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'center',
    backgroundColor: colors.paleGrey,
    height: 75,
    padding: 20,
    marginTop: -20
  },
  titleiconcontainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 20,
    marginBottom: 30,
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