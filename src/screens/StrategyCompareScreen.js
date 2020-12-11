import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { SearchBar } from 'react-native-elements';
import Stocks from '../components/strategy/Stocks';
import { Context as StrategyContext } from '../context/StrategyContext';

const StrategyCompareScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [comparisonList, setComparisonList] = useState([]);

  const { state, getComparisonData, clearErrorMessage } = useContext(StrategyContext);

  useEffect(() => {
    var dt = new Date();
    const endDate = `${dt.getFullYear()}-${(dt.getMonth())}-${dt.getDate()}T00:00:00`;
    const startDate = `${dt.getFullYear() - 1}-${(dt.getMonth())}-${dt.getDate()}T00:00:00`;
    getComparisonData(startDate, endDate);
  }, []);

  if (comparisonList?.length === 0 && state.comparisonData?.length > 0 && search.length === 0) {
    setComparisonList(state.comparisonData);
  }

  const filterResults = (text) => {
    setSearch(text);
    setComparisonList(state.comparisonData.filter(x => x.ticker.includes(text)));
  };

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>

      <View style={styles.layoutcontainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon style={styles.backicon} size={40} name='long-arrow-left' />
        </TouchableOpacity>
        <View style={styles.titleiconcontainer}>
          <Text style={styles.header}>Compare</Text>
          <Icon style={styles.infoicon} size={20} name='info-circle' />
        </View>
        <SearchBar style={styles.searchbar}
          placeholder="Search stocks"
          searchIcon={{ type: 'font-awesome', name: 'search' }}
          inputContainerStyle={styles.searchbarinputcontainer}
          containerStyle={styles.searchbarcontainer}
          inputStyle={styles.searchbarinput}
          onChangeText={(text) => filterResults(text)}
          value={search}
        />
        <View style={styles.content} >
          <ScrollView>
            <View style={styles.instructioncontainer}>
              <Stocks comparisons={comparisonList} />
            </View>
          </ScrollView>
        </View>
      </View>

    </SafeAreaView>
  );
};

StrategyCompareScreen.navigationOptions = {
  header: () => false,
  title: 'Comparison'
};

const styles = StyleSheet.create({
  layoutcontainer: {
    height: '100%',
    backgroundColor: 'white'
  },
  instructioncontainer: {
    width: '100%'
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
    padding: 20
  },
  titleiconcontainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginBottom: 30
  },
  backicon: {
    marginLeft: 25,
    paddingTop: 20,
    justifyContent: 'center',
    color: '#FFC234',
  },
  infoicon: {
    paddingLeft: 7,
    justifyContent: 'center',
    color: '#FFC234',
    alignSelf: 'center'
  },
  searchicon: {
    color: '#8D949D'
  },
  searchbarcontainer: {
    marginHorizontal: 20,
    marginTop: -10,
    marginBottom: 29,
    borderBottomColor: '#DBDEE7',
    borderTopColor: '#DBDEE7',
    backgroundColor: 'white',
    borderColor: '#DBDEE7',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 10,
    paddingBottom: 0,
    paddingTop: 0
  },
  searchbarinputcontainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,

  },
  searchbarinput: {

  }
});

export default StrategyCompareScreen;
