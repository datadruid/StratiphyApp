import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const StrategyInstructionsScreen = ({navigation}) => {
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <ScrollView>
      <View style={styles.layoutcontainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon style={styles.backiocn} size={40} name='long-arrow-left' />
            </TouchableOpacity>
        <View style={styles.titleiconcontainer}>
          <Text style={styles.header}>Instructions</Text>
          <Icon style={styles.infoicon} size={20} name='info-circle' />
        </View>
        <View style={styles.content} >

        </View>
      </View>
      </ScrollView>
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
    paddingBottom: 20,
    paddingHorizontal:20,
    marginBottom: 30
  },
  backiocn: {
    paddingLeft:25,
    paddingTop: 20,
    justifyContent: 'center',
    color: '#FFC234',
  },
});

export default StrategyInstructionsScreen;
