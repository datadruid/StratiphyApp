import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import TextFieldWithText from './TextFieldWithText';
import { colors } from '../modules/Colors';
import { fonts } from '../modules/Fonts';
import YellowButton from '../controls/YellowButton'

const LookBackPeriod = ({ navigation, options, selected, onSelected, nextPage }) => {
  const [lookback, setLookback] = useState();
  const [customBorderColour, setCustomBorderColour] = useState(styles.inputnotselected);

  const optionSelected = (id) => {
    setCustomBorderColour(styles.inputnotselected);
    let lbp = options.find(x => x.id === Number(id));
    if (lbp) {
      setLookback(undefined);
      onSelected(lbp);
    }
  }

  const onButtonPress = () => {
    if ((selected >= 0 && selected < 3) || (selected == 3 && lookback)) {
      nextPage();
    }
    else {
      Alert.alert('Lookback', 'you need to select a lookback period');
    }
  };

  const setCustomLookback = (text) => {
    optionSelected(3);
    var lb = Number.parseInt(text);
    setCustomBorderColour(styles.inputselected);
    if (Number.isNaN(lb)) {
      lb = undefined;
      onSelected(options.find(x => x.id === Number(0)));
    }
    else {
      if (lb < 1) {
        lb = 1;
      } else if (lb > 60) {
        lb = 60;
      }
      let lbp = options.find(x => x.id === Number(3));
      lbp.periods = lb;
      onSelected(lbp);
      setLookback(lb.toString());
    }
  }

  if (selected == 3 && !lookback) {
    let lbp = options.find(x => x.id === Number(3));
    setLookback(lbp.periods.toString());
  }

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
    return (
      <View style={[styles.listItem, { backgroundColor: item.backgroundColor }]}>

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
      </View >)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}>
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

        </View>
        <Text style={styles.orText}>{'OR'}</Text>
        <View style={styles.horizontalTopContainer}>
          <Text style={styles.titleStyle}>Set your own</Text>
          {/* <FontAwesome style={styles.infoicon} size={20} name='info-circle' /> */}
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <TextFieldWithText
            placeholderStyle={styles.placeholderStyle}
            onChangeText={text => {
              setCustomLookback(text);
            }}
            value={lookback}
            postSymbol={''}
            style={[styles.input, customBorderColour]}
            placeholder={''}
            rightText={'Months (1-60)'}
          />
        </View>
        {this.renderGraphCard(itemCard)}
      </ScrollView>
      <View style={styles.yellowbutton}>
        <YellowButton title='Next' onButtonPress={onButtonPress} />
      </View>

    </KeyboardAvoidingView>
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
    fontFamily: fonts.GraphikSemibold
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
    fontSize: 18,
    color: 'black',
    marginTop: (14),
    fontFamily: fonts.GraphikRegular
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
    color: 'black',
    fontFamily: fonts.GraphikRegular
  },
  listItem: {
    height: (200),
    width: '90%',
    backgroundColor: colors.redPink,
    borderRadius: 12,
    marginTop: (10),
    alignItems: 'center', alignSelf: 'center'

  },
  input: {
    width: '100%'
  },
  inputselected: {
    borderColor: colors.yellowTheme,
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
  orText: {
    textAlign: 'center',
    color: colors.coolGrey,
    marginTop: (10),
    fontFamily: fonts.GraphikSemibold
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
  yellowbutton: {
    marginTop: 10
  }
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
