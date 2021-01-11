import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import { colors } from '../modules/Colors';

const LookBackPeriod = ({ navigation, options, selected, onSelected, nextPage }) => {
  const optionSelected = (id) => {
    let lbp = options.find(x => x.id === Number(id));
    onSelected(lbp);
  }

  const onButtonPress = () => {
    if(selected >= 0)
    {
      nextPage();
    }
    else {
      Alert.alert('Lookback', 'you need to select a lookback period');
    }
  };

  renderTermItem = (description, selection) => {

    return <TouchableOpacity style={styles.horizontalView} >
      <CheckBox
        style={styles.box}
        disabled={false}
        value={selection === selected}
        onValueChange={() => {
          optionSelected(selection);
        }}
      />
      <Text style={styles.defaultText}>{description}</Text>
    </TouchableOpacity>
  }

  renderGraphCard = () => {
    let item = itemCard[0]
    const width = Dimensions.get('window').width
    return <View style={[styles.listItem, { backgroundColor: item.backgroundColor }]}>

      <View style={styles.titleTop}>
        <View style={styles.leftContainer} >
        </View>
        <View style={styles.midlleContainer} >
          <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.description}>{item.short_desc}</Text>
        </View>
        <View style={styles.rightContainer}>
          {/* <TouchableOpacity style={styles.pressStyle} onPress={() => this.cardPress(item)}>
              <FontAwesome style={styles.infoicon} size={20} name='info-circle' />
              </TouchableOpacity> */}
        </View>
      </View>
      <Image source={item.backgroundImage} style={styles.bottomImage} />
    </View >
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.horizontalTopContainer}>
        <Text style={styles.titleStyle}>{'Choose lookback period'}</Text>
        <TouchableOpacity style={styles.pressStyle} onPress={() => typeInfo()}>
          <FontAwesome style={styles.infoicontop} size={20} name='info-circle' />
        </TouchableOpacity>

      </View>
      <Text style={styles.paragraph} numberOfLines={3}>{'How far back should we include data to calculate your strategy?'}</Text>

      <View style={styles.switchConatiner}>

        {this.renderTermItem('Short term (1 month)', 0)}
        {this.renderTermItem('Medium term (6 months)', 1)}
        {this.renderTermItem('Long term (12 months)', 2)}
        {this.renderGraphCard(itemCard)}
      </View>
      </ScrollView>
      <View style={styles.buttoncontainer}>
        <Button buttonStyle={styles.button}
          onPress={onButtonPress}
          titleStyle={styles.buttontitle}
          title='Next'
          type='solid' />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
    flex: 1,
  },
  horizontalTopContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: (19),
    marginTop: (20),
    marginBottom: (1),
    alignItems: 'center'
  },
  titleStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  infoicon: {
    color: colors.white,
    alignSelf: 'flex-start',
    marginRight: 15,
    marginTop: 0
  },
  infoicontop: {
    flexDirection: 'column',
    paddingLeft: 10,
    color: colors.yellowTheme,
    alignSelf: 'center'
  },
  paragraph: {
    marginHorizontal: (22),
    fontSize: 16,
    color: 'black',
    marginTop: (14)
  },
  horizontalView: {
    flexDirection: 'row',
    marginLeft: (11),
    marginBottom: (3),
    padding: 10
  },
  box: {
    width: (21),
    height: (21),
    marginRight: (16),
  },
  switchConatiner: {
    marginTop: (20),
    // backgroundColor:'red'
  },
  defaultText: {
    fontSize: 18,
    color: 'black'
  },
  listItem: {
    height: (200),
    width: '90%',
    backgroundColor: colors.redPink,
    borderRadius: 12,
    marginTop: (10),
    alignItems: 'center', alignSelf: 'center'

  },
  titleTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: (19),
    height: (50)
  },
  leftContainer: {

    flex: 1, flexDirection: 'row', height: 50,
    marginBottom: (20),
    width: '30%',
    // backgroundColor:'green'

  },
  midlleContainer: {

    height: null,
    width: '60%',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: (10)

  },
  rightContainer: {
    flex: 1, flexDirection: 'row', height: 50,
    justifyContent: 'flex-end', paddingEnd: (0),
    marginTop: (-5),
    width: '10%',
    // backgroundColor:'grey'

  },
  cardTitle: {

    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: (10),


  },
  description: {
    color: 'white',
    width: '110%',
    fontSize: 13, marginTop: 10

  },
  bottomImage: {

    height: (130),
    width: '105%',
    marginLeft: -4
  },
  buttoncontainer: {
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 10,
    width:'90%'
  },
  button: {
    backgroundColor: colors.yellowTheme,
    borderRadius: 12,
    height: 60
  },
  buttontitle: {
    fontWeight: 'bold'
  },
});

const itemCard = [
  {
    id: 0,
    title: 'Lookback Period',
    short_desc: 'Calculate which stocks to buy and sell by analysing data over a short, medium or long lookback period.',
    backgroundImage: require('../../img/strategytypes/icGraphLookBack.png'),
    backgroundColor: colors.yellowTheme,

  },
]

export default LookBackPeriod;
