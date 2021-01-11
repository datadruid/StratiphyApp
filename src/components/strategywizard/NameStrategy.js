import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, } from 'react-native-elements';
import TextFieldWithText from './TextFieldWithText';
import Spacer from '../Spacer';
import { colors } from '../modules/Colors';
import * as RNLocalize from "react-native-localize";
import getSymbolFromCurrency from 'currency-symbol-map';
import { icondata } from '../modules/StrategyIcons';
import { NewName } from '../modules/Names';

const currencyFormat = {
  style: "currency",
  currency: RNLocalize.getLocales()[0].languageTag
};

function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}

const NameStratgey = ({ navigation, investData, strategyType, onSelected, selected }) => {
  const [selectedIcon, setSelectedIcon] = useState(icondata[selected]);
  const [startingAmount, setStartingAmount] = useState(investData.amounts.startingAmount);
  const [monthlyAmount, setMonthlyAmount] = useState(investData.amounts.monthlyAmount);
  const [name, setName] = useState(investData.name);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [description, setDescription] = useState(investData.description);
  
  if (!name) {
    setName(titleCase(`${strategyType} ${NewName()}`));
  }

  const onButtonPress = () => {
    setErrorMessage(undefined);
    if (name.length < 2) {
      setErrorMessage('You need to name this strategy');
      return;
    }
    if (Number(startingAmount) == 0 && Number(monthlyAmount) == 0) {
      setErrorMessage('a starting or monthly amount is required');
      return;
    }

    onSelected({ name, description, amounts: { startingAmount, monthlyAmount } });
  };

  const openediticon = () => {
    console.log('edit icon');
  };

  return (
    <View style={styles.scrollcontainer}>
      <KeyboardAwareScrollView >
        <View style={styles.horizontalTopContainer}>
          <Text style={styles.titleStyle}>{'Strategy Name'}</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={[styles.mainView, styles.input]}>
            <TextInput
              style={[styles.input, styles.textInput]}
              placeholder='Name'
              value={name}
              onChangeText={text => setName(text)} />
          </View>
        </View>
        <View style={styles.horizontalTopContainer}>
          <Text style={styles.titleStyle}>{'Choose an investment amount to simulate in your strategy?'}</Text>
        </View>
        <Text style={styles.paragraph} numberOfLines={3}>{'This is for simulation only. No funds will be deposited or invested.'}</Text>

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
            rightText={'Monthly contribution'}
          />
        </View>
        <View style={[styles.horizontalTopContainer, styles.iconcontainer]}>
          <View >
            <Text style={styles.titleStyle}>{'Strategy Icon'}</Text>
            <Text style={styles.iconparagraph} numberOfLines={3}>{'Click to change'}</Text>
          </View>
          <TouchableOpacity onPress={openediticon}>
          <Image source={selectedIcon.image} resizeMode='contain' style={styles.selectedImage}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalTopContainer}>
          <Text style={styles.titleStyle}>{'Notes'}</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={[styles.mainView, styles.input]}>
            <TextInput
              multiline={true}
              style={[styles.input, styles.textInput, styles.notesInput]}
              placeholder='Want to remember something about this strategy? Keep track by adding notes here.'
              value={description}
              onChangeText={text => setDescription(text)} />
          </View>
        </View>
        <Spacer />
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        <Spacer />
        
      </KeyboardAwareScrollView>
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
  iconcontainer: {
    justifyContent: 'space-between'
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
  paragraph: {
    marginTop: 5,
    marginHorizontal: 20,
    fontSize: 16,
    color: 'black'
  },
  iconparagraph: {
    marginTop: 5,
    fontSize: 16,
    color: 'black'
  },
  selectedImage: {
    height: (60),
    width: (60),
    alignItems: 'flex-end',
    marginRight: (20)
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
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
  notesInput: {
    height: 150,
    textAlignVertical: 'top'
  },
  description: {
    color: 'white',
    width: '110%',
    fontSize: 13, marginTop: 10

  },
  buttoncontainer: {
    marginHorizontal: 20,
    marginBottom: 10,
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
