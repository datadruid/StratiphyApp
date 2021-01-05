import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, } from 'react-native-elements';
import TextFieldWithText from './TextFieldWithText';
import { colors } from '../modules/Colors';
import * as RNLocalize from "react-native-localize";
import getSymbolFromCurrency from 'currency-symbol-map';
const currencyFormat = {
  style: "currency",
  currency: RNLocalize.getLocales()[0].languageTag
};

const NameStratgey = ({ navigation, onSelected }) => {
  const [startingAmount, setStartingAmount] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onButtonPress = () => {
    onSelected({ amounts: { startingAmount, monthlyAmount } });
  };

  return (
    <View style={styles.scrollcontainer}>
      <KeyboardAwareScrollView >
        <View style={styles.horizontalTopContainer}>
          <Text style={styles.titleStyle}>{'What do you want to name this strategy?'}</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={[styles.mainView, styles.input]}>
            <TextInput
              style={[styles.input, styles.textInput]}
              placeholder='Name'
              value={name}
              onChangeText={text => setName(text)} />
          </View>
          <View style={[styles.mainView, styles.input]}>
            <TextInput
              style={[styles.input, styles.textInput]}
              placeholder='Description (optional)'
              value={description}
              onChangeText={text => setDescription(text)} />
          </View>
        </View>
        <View style={styles.horizontalTopContainer}>
          <Text style={styles.titleStyle}>{'How much do you want to invest?'}</Text>
        </View>


        <View style={styles.formContainer}>
          <TextFieldWithText
            placeholderStyle={styles.placeholderStyle}
            onInputChanged={this._onEmailChanged}
            onInputSubmitted={this._onEmailSubmitted}
            onChangeText={text => {
              setStartingAmount(text);
            }}
            value={startingAmount}
            style={styles.input}
            preSymbol={getSymbolFromCurrency(RNLocalize.getCurrencies()[0])}
            placeholder={'10,000'}
            rightText={'Starting amount'}
          />
          <TextFieldWithText
            placeholderStyle={styles.placeholderStyle}
            onInputChanged={this._onDescriptionChanged}
            onInputSubmitted={this._onDescriptionSubmitted}
            onChangeText={text => {
              setMonthlyAmount(text);
            }}
            keyboardType="email-address"
            value={monthlyAmount}
            style={styles.input}
            preSymbol={getSymbolFromCurrency(RNLocalize.getCurrencies()[0])}
            placeholder={'0'}
            rightText={'Monthly contribution'}
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
    </View>
  )
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.paleGreyTwo,
    width: '100%',
    borderRadius: 8,
    marginTop: (10),
    alignItems: 'center',
    textAlign: 'left',
  },
  horizontalTopContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: (19),
    marginTop: (20),
    marginBottom: (1),
  },
  titleStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  searchImage: {
    width: (30),
    height: (30)
  },
  infoDescription: {
    color: colors.coolGrey,
    fontSize: 14,
    marginLeft: (5)
  },
  discoverImage: {
    width: (330),
    height: (40),
  },
  formContainer: {
    width: '90%',
    marginHorizontal: (20),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (20),
  },
  scrollcontainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  placeholderStyle: {
    color: colors.jeshText
  },
  input: {
    height: null,
    width: '100%',
    overflow: 'hidden',
    borderColor: colors.coolGrey,
    marginVertical: 15
  },
  textInput: {
    paddingLeft: 20
  },
  description: {
    color: 'white',
    width: '110%',
    fontSize: 13, marginTop: 10

  },
  buttoncontainer: {
    marginHorizontal: 20,
    marginBottom: 30,
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

export default NameStratgey;
