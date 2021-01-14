import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { colors } from '../modules/Colors';
import { fonts } from '../modules/Fonts';

const TextFieldWithText = ({ placeholder, secureTextEntry, value, onChangeText, rightText, style, preSymbol, postSymbol }) => {

  return (
    <View style={[styles.mainView, style]}>
      <Text style={styles.preSymbol}>{preSymbol}</Text>
    <TextInput
      placeholderTextColor="black"
      placeholder={placeholder}
      style={styles.inputView}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      value={value}
      keyboardType='decimal-pad'
    />
    <Text style={styles.postSymbol}>{postSymbol}</Text>
    <View style={styles.rightContainer}>
      <Text numberOfLines={1} style={styles.titleShow}>{rightText}</Text>
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
        fontFamily: fonts.GraphikRegular,
        fontSize: 18,
        height: (48),
        color: 'black',
        paddingLeft: 0,
        textAlign: 'left',
        width: '50%'
      },
      titleShow: {
        color: colors.coolGrey,
        marginRight: 10,
        alignSelf: 'flex-end',
        fontFamily: fonts.GraphikRegular,
        fontSize: 14
      },
      rightContainer: { 
        flex:1, 
      alignItems: 'flex-end',
    },
    preSymbol:{
      marginLeft: (20),
      fontFamily: fonts.GraphikRegular,
        fontSize: 18
    },
    postSymbol: {
      textAlign:'left',
      fontFamily: fonts.GraphikRegular,
      fontSize: 18
    }
});

export default TextFieldWithText;