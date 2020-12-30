import React, { useState } from 'react';
import { Text, View, StyleSheet  } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, } from 'react-native-elements';
import TextFieldWithText from './TextFieldWithText';
import { colors } from '../modules/Colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Investment = ({ navigation, onSelected }) => {
    const [startingAmount, setStartingAmount] = useState('');
    const [monthlyAmount, setMonthlyAmount] = useState('');

    const onButtonPress = () => {
        onSelected({amounts : { startingAmount, monthlyAmount}});
      };

  return (
      <>
        <View style={styles.horizontalTopContainer}>
          <Text style={styles.titleStyle}>{'How much do you want to invest?'}</Text>
        </View>
        <KeyboardAwareScrollView >
        <View style={styles.scrollcontainer}>
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
        </View>
        </KeyboardAwareScrollView>
      </>
  )
};

const styles = StyleSheet.create({
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
        marginTop:(20),
    },
    scrollcontainer : {
        height:300,
        flex: 1,
        flexDirection:'column',
        justifyContent: 'space-between',
    },
    placeholderStyle: {
        color: colors.jeshText
    },
    input: {
        height: null,
        width: '100%',
        overflow: 'hidden',
        borderColor:colors.coolGrey,
        width: Platform.OS === 'ios' ? '100%' : '100%',
    },
    description: {
        color: 'white',
        width: '110%',
        fontSize:13,marginTop:10

    },
    buttoncontainer: {
        marginHorizontal: 20,
        marginBottom: 30
      },
      button: {
        backgroundColor: colors.yellowTheme,
        borderRadius: 12,
      },
      buttontitle: {
        fontWeight: 'bold'
      },
});

export default Investment;
