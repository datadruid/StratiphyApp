import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { colors } from '../modules/Colors';

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
        color: 'black',
        fontWeight: 'bold',
        paddingLeft: 0,
        textAlign: 'left',
        width: '50%'
      },
      titleShow: {
    
        // ...Fonts.style(Fonts.type.base, 12, 'normal'),
        color: colors.coolGrey,
        marginRight: 10,
        alignSelf: 'flex-end',
      },
      rightContainer: { 
        flex:1, 
      alignItems: 'flex-end',
    },
    preSymbol:{
      marginLeft: (20),
    },
    postSymbol: {
      textAlign:'left'
    }
});

export default TextFieldWithText;