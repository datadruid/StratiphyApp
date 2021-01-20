import React, {useState, useContext, useEffect} from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { SearchBar } from 'react-native-elements';
import Instructions from '../components/strategy/Instructions';
import { colors } from '../components/modules/Colors';
import { fonts } from '../components/modules/Fonts';
import { Context as StrategyContext } from '../context/StrategyContext';

const StrategyInstructionsScreen = ({navigation}) => {
  const item = navigation.getParam('item');
  const { state, clearErrorMessage } = useContext(StrategyContext);
  const [search, setSearch] = useState('');
  const [instructions, setInstructions] = useState(state.instructions.find(x=> x._id == item._id) ? state.instructions.find(x=> x._id == item._id).instructions : []);
  

  const filterResults = (text) => {
    setSearch(text);
    setInstructions(state.instructions.find(x=> x._id == item._id).instructions.filter(x=> x.Action !== 'Hold' && x.Ticker.includes(text)));
  };

  
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      
      <View style={styles.layoutcontainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon style={styles.backicon} size={40} name='long-arrow-left' />
            </TouchableOpacity>
        <View style={styles.titleiconcontainer}>
          <Text style={styles.header}>Instructions</Text>
          <Icon style={styles.infoicon} size={20} name='info-circle' />
        </View>
          <SearchBar style={styles.searchbar}
            placeholder="Search"
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
            <Instructions actions={instructions.filter(x=> x.Action !== 'Hold')} />
          </View>
          </ScrollView>
        </View>
      </View>
      
    </SafeAreaView>
  );
};

StrategyInstructionsScreen.navigationOptions = {
  header: () => false,
  title: 'Instructions'
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
    width:215,
    fontFamily: fonts.GraphikSemibold,
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
    paddingHorizontal:20,
    marginBottom: 30
  },
  backicon: {
    paddingLeft:25,
    paddingTop: 20,
    justifyContent: 'center',
    color: '#FFC234',
  },
  infoicon: {
    justifyContent: 'center',
    color: '#FFC234',
    alignSelf: 'center'
  },
  searchicon:{
    color:'#8D949D'
  },
  searchbarcontainer: {
    marginHorizontal:20,
    marginTop:-10,
    marginBottom:29,
    borderBottomColor: '#DBDEE7',
    borderTopColor: '#DBDEE7',
    backgroundColor: 'white',
    borderColor: '#DBDEE7',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft : 10,
    paddingBottom:0,
    paddingTop: 0
  },
  searchbarinputcontainer :{
    backgroundColor:'transparent',
    borderWidth: 0,
    
  },
  searchbarinput:{
    fontSize: 18,
    fontFamily: fonts.GraphikRegular,
  }
});

export default StrategyInstructionsScreen;
