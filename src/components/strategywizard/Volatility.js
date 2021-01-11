import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import TextFieldWithText from './TextFieldWithText';
import { colors } from '../modules/Colors';

const imageMap = {
  'icLowRisk.png' : require('../../img/icons/icLowRisk.png'),
  'icStar.png': require('../../img/icons/icStar.png'),
  'icTinder.png': require('../../img/icons/icTinder.png')
}

const Volatility = ({ navigation, options, onSelected }) => {
  const [vols, setVols] = useState(options);
  const [index, setIndex] = useState(1);
  const [volatilitySelection, setVolatilitySelection] = useState('Medium Volatility');
  const [volatility, setVolatility] = useState('40');
  const [customBorderColour, setCustomBorderColour] = useState(styles.inputnotselected);

  const onNextButtonPress = (id, title, value) => {
    setCustomBorderColour(styles.inputnotselected);
    setIndex(id);
    setVolatility(value);
    setVolatilitySelection(title);
  };

  const onButtonPress = () => {
    onSelected({ 
      preset : volatilitySelection,
      volatility: volatility 
    });
  };

  const setCustomVolatility = (text) => {
    setCustomBorderColour(styles.inputselected);
    setIndex(-1);
    setVolatility(text);
    setVolatilitySelection('custom');
  }

  return (
    <>
      <View style={styles.horizontalTopContainer}>
        <Text style={styles.titleStyle}>Choose your volatility threshold</Text>
        {/* <FontAwesome style={styles.infoicon} size={20} name='info-circle' /> */}
      </View>
      <Text style={styles.paragraph} numberOfLines={3}>{'Choose to invest in stocks with a maximum volatility according to your risk appetite.'}</Text>
      <KeyboardAwareScrollView>
        <View style={styles.firstCard}/>
        {vols.map((item) => {
          let selected = {};
          if (item.id == index) {
            selected = styles.selectedcardinfo;
          }
          return (
            <TouchableOpacity key={item.id} style={[styles.cardInfo, selected]} onPress={() => onNextButtonPress(item.id, item.title, item.volatility)}>
        <View style={styles.cardItems}>
          <View style={styles.tipLeftContainer} >
            <Image source={imageMap[item.image]} resizeMode='contain' style={styles.tipImage} />
          </View>
          <View style={styles.icMiddleContainer} >
            <Text style={styles.infoTitle}> {item.preset}</Text>
            <Text style={styles.infoDescription}>{item.desc}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
   )})}
        <Text style={styles.orText}>{'OR'}</Text>
        <View style={styles.horizontalTopContainer}>
          <Text style={styles.titleStyle}>Set your own threshold</Text>
          {/* <FontAwesome style={styles.infoicon} size={20} name='info-circle' /> */}
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <TextFieldWithText
            placeholderStyle={styles.placeholderStyle}
            onChangeText={text => {
              setCustomVolatility(text);
            }}
            value={volatility}
            postSymbol={'%'}
            style={[styles.input, customBorderColour]}
            placeholder={''}
            rightText={'Maximum volatility'}
          />
        </View>
        
      </KeyboardAwareScrollView>
      <View style={styles.buttoncontainer}>
          <Button buttonStyle={styles.button}
            onPress={onButtonPress}
            titleStyle={styles.buttontitle}
            title='Next'
            type='solid' />
        </View>
    </>
  )
};

const styles = StyleSheet.create({
  infoicon: {
    paddingLeft: 10,
    justifyContent: 'center',
    color: colors.yellowTheme,
    alignSelf: 'center'
  },
  progressContainer: {
    marginTop: (10),
    alignSelf: 'center',
    height: 10,

  },
  horizontalTopContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: (19),
    marginTop: (20),
    marginBottom: 5,
    alignItems: 'center'

  },
  placeholderStyle: {
    color: colors.jeshText
  },
  input: {
    height: null,
    width: '100%',
    overflow: 'hidden',
  },
  inputnotselected: {
    borderColor: colors.coolGrey,
  },
  inputselected: {
    borderColor: colors.yellowTheme,
  },
  titleStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginStart: 3
  },
  tipLeftContainer: { width: '20%', height: '100%' },
  tipImage: {

    height: (45),
    height: (45),
    alignSelf: 'center',
    marginTop: (20)
  },
  infoDescription: {
    color: colors.coolGrey,
    fontSize: 14,
    marginLeft: (5),
    width: '72%'
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: (5),
    marginTop: (11)
  },
  cardInfo: {
    width: '90%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: (120),
    alignSelf: 'center',
    backgroundColor: colors.paleGrey,
    borderRadius: 12,
    marginBottom: 15,
  },
  selectedcardinfo: {
    borderWidth: 2,
    borderColor: colors.yellowTheme
  },
  cardItems: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
    height: 100,
    borderRadius: 12,
  },
  paragraph: {

    marginHorizontal: (22),
    fontSize: 16,
    color: 'black'
  },
  firstCard: {
    marginTop: (30)
  },
  orText: {
    textAlign: 'center',
    color: colors.coolGrey,
    marginBottom: (10)
  },
  buttoncontainer: {
    marginHorizontal: 20
  },
  button: {
    backgroundColor: colors.yellowTheme,
    borderRadius: 12,

  },
  buttontitle: {
    fontWeight: 'bold'
  },
  buttoncontainer: {
    marginHorizontal: 20,
    margin: 20,
    marginBottom:10
  },
  button: {
    backgroundColor: colors.yellowTheme,
    borderRadius: 12,
    height:60
  },
  buttontitle: {
    fontWeight: 'bold'
  },
});

export default Volatility;
