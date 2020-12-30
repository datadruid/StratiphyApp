import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { colors } from '../modules/Colors';
import * as RNLocalize from "react-native-localize";
import getSymbolFromCurrency from 'currency-symbol-map';
const currencyFormat = {
  style: "currency",
  currency: RNLocalize.getLocales()[0].languageTag
};

const TextFieldWithText = ({ placeholder, secureTextEntry, value, onChangeText, rightText, style }) => {

  return (
    <View style={[styles.mainView, style]}>
      <Text style={styles.currencySymbol}>{getSymbolFromCurrency(RNLocalize.getCurrencies()[0])}</Text>
    <TextInput
      placeholderTextColor="black"
      placeholder={placeholder}
      style={styles.inputView}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      value={value}
    />
    <View style={styles.rightContainer}>
      <Text  numberOfLines={1} style={styles.titleShow}>{rightText}</Text>
    </View>
  </View>
  )
};

const styles = StyleSheet.create({
    button: {
        marginVertical: 5,
      },
      buttonImage: {},
      mainView: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.paleGreyTwo,
        width: '105%',
        borderRadius: 8,
        marginTop: (10),
        alignItems: 'center',
        textAlign: 'left',
      },
      inputView: {
        // ...Fonts.style.medium,
        height: (48),
        width: '60%',
        color: 'black',
        fontWeight: 'bold',
        paddingLeft: (5),
      },
      titleShow: {
    
        // ...Fonts.style(Fonts.type.base, 12, 'normal'),
        color: colors.coolGrey,
        marginRight: (50),
        alignSelf: 'flex-end',
      },
      rightContainer: { 
        width: '50%', 
      alignItems: 'flex-start',
      marginLeft:-20 
    },
    currencySymbol:{
      marginLeft: (20),
    }
});

export default TextFieldWithText;