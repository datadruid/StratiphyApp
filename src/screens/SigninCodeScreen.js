import React, { useContext, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, TextInput } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import { colors } from '../components/modules/Colors';
import { fonts } from '../components/modules/Fonts';
import YellowButton from '../components/controls/YellowButton';
import HeaderBack from '../components/strategywizard/HeaderBack';

const SigninCodeScreen = ({ navigation }) => {
  const email = navigation.getParam('email');
  const [code, setCode] = useState('');

  const { state, verifyCode, repeatemail, clearErrorMessage, setError } = useContext(AuthContext);

  const verify = () => {
    verifyCode({ code, email, auth_id: state.auth_id, isApproved: state.isApproved, hasAuthId: state.hasAuthId, userId: state.userId });
  };

  const onButtonPress = () => {
    if (code.length == 6) {
      verify();
    }
  };

  const resendlink = () => {
    repeatemail(email);
  };

  const checkcode = (codeinput) => {
    setCode(codeinput);
    if (codeinput.length > 6) {
      setError('code is greater than 6 digits');
    } else {
      clearErrorMessage();
    }
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <View style={{ height: 88 }}>
          <HeaderBack text='' showtotal={false} onLeftPress={() => onBackPress()} navigation={navigation} />
        </View>
        <View style={styles.formcontainer}>
          <Text style={styles.title}>6-digit code</Text>
          <Text style={styles.text}>Please enter the code send to {email}.</Text>
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={(value) => { checkcode(value) }}
            autoCapitalize="none"
            autoCorrect={false}
            selectionColor={colors.yellowTheme}
            keyboardType='decimal-pad'
          />
          {state.errorMessage ? (
            <Text style={styles.errorMessage}>{state.errorMessage}</Text>
          ) : null}

        </View>
        <View style={styles.yellowbutton}>
          <YellowButton title='Submit' onButtonPress={onButtonPress} />

          <TouchableOpacity onPress={resendlink}>
            <View style={styles.resendlink}>
              <Text style={styles.resendtext}>Resend email</Text>
            </View>
          </TouchableOpacity>
        </View>

    </KeyboardAvoidingView>
  );
};

SigninCodeScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 20,
    backgroundColor: colors.white
  },
  formcontainer: {
    marginTop: 60,
    marginBottom: 40
  },
  title: {
    width: '90%',
    marginHorizontal: 20,
    marginBottom: 15,
    color: "black",
    fontSize: 22,
    fontFamily: fonts.GraphikSemibold
  },
  text: {
    width: '90%',
    marginHorizontal: 20,
    marginBottom: 15,
    color: "black",
    fontSize: 18,
    fontFamily: fonts.GraphikRegular,
  },
  input: {
    width: '90%',
    marginHorizontal: 20,

    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.white,
    borderColor: colors.paleGreyTwo,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.GraphikRegular,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
    textAlign: 'center'
  },
  yellowbutton: {
    marginBottom: 0
  },
  resendtext: {
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: fonts.GraphikRegular,
    marginBottom: 40,
    marginTop: 20,
    color: colors.yellowTheme,
  }
});

export default SigninCodeScreen;
