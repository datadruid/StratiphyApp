import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import TextFieldWithText from './TextFieldWithText';
import { colors } from '../modules/Colors';

const Volatility = ({ navigation, onSelected }) => {
  const [index, setIndex] = useState(1);
  const [volatility, setVolatility] = useState('40');

  const onNextButtonPress = (id, value) => {
    setIndex(id);
    setVolatility(value);
  };

  const onButtonPress = () => {
    onSelected({ volatility: volatility });
  };

  const renderCard = (id, image, title, description, value) => {
    let selected = {};
    if (id == index) {
      selected = styles.selectedcardinfo;
    }
    return (
      <TouchableOpacity style={[styles.cardInfo, selected]} onPress={() => onNextButtonPress(id, value)}>
        <View style={styles.cardItems}>
          <View style={styles.tipLeftContainer} >
            <Image source={image} resizeMode='contain' style={styles.tipImage} />
          </View>
          <View style={styles.icMiddleContainer} >
            <Text style={styles.infoTitle}> {title}</Text>
            <Text style={styles.infoDescription}>{description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <>
      <View style={styles.horizontalTopContainer}>
        <Text style={styles.titleStyle}>Choose your volatility threshold</Text>
        <FontAwesome style={styles.infoicon} size={20} name='info-circle' />
      </View>
      <Text style={styles.paragraph} numberOfLines={3}>{'Choose to invest in stocks with a maximum volatility according to your risk appetite.'}</Text>
      <KeyboardAwareScrollView>
        <View style={styles.firstCard}>
          {renderCard(0, require('../../img/icons/icLowRisk.png'), 'Low Volatility', 'Low volatility stocks are safer but return less.', '20')}
        </View>
        {renderCard(1, require('../../img/icons/icStar.png'), 'Medium Volatility', 'Medium volatility stocks include a mixed risk/return profile.', '40')}
        {renderCard(2, require('../../img/icons/icTinder.png'), 'High Volatility', 'Potentially higher returns but with higher risks.', '60')}
        <Text style={styles.orText}>{'OR'}</Text>
        <View style={styles.horizontalTopContainer}>
          <Text style={styles.titleStyle}>Set your own threshold</Text>
          <FontAwesome style={styles.infoicon} size={20} name='info-circle' />
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <TextFieldWithText
            placeholderStyle={styles.placeholderStyle}
            onInputChanged={this._onEmailChanged}
            onInputSubmitted={this._onEmailSubmitted}
            onChangeText={text => {
              setVolatility(text);
            }}
            value={volatility}
            postSymbol={'%'}
            style={styles.input}
            placeholder={''}
            rightText={'Maximum volatility'}
          />
        </View>


        <View style={styles.buttoncontainer}>
          <Button buttonStyle={styles.button}
            onPress={onButtonPress}
            titleStyle={styles.buttontitle}
            title='Next'
            type='solid' />
        </View>
      </KeyboardAwareScrollView>
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
    borderColor: colors.coolGrey,

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
    margin: 20
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
