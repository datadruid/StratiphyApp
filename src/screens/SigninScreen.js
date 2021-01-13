import React, { useContext, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Button, Text, TextInput } from 'react-native';
import { GoogleSocialButton } from "react-native-social-buttons";
import { GoogleSignin } from 'react-native-google-signin';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { colors } from '../components/modules/Colors';
import { fonts } from '../components/modules/Fonts';
import YellowButton from '../components/controls/YellowButton';

GoogleSignin.configure({
  webClientId: '1060831970790-vfh908lm2mvd0hr747qblplq1f8ebj99.apps.googleusercontent.com',
  iosClientId: '1060831970790-ud9kp922ecpj4eg508lavpvcbl3v1anu.apps.googleusercontent.com',
  offlineAccess: true
});

const SigninScreen = ({ navigation }) => {
  const hasName = navigation.getParam('hasName');
  const { state, updateEmailPasswordUser, updateGoogleUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [indicator, setIndicator] = useState(false);

  const onButtonPress = () => {
    setIndicator(!indicator);
    updateEmailPasswordUser(email, password, hasName)
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      let firstName = userInfo.user.givenName;
      let lastName = userInfo.user.familyName;
      let googleCode = userInfo.serverAuthCode;
      updateGoogleUser(googleCode, firstName, lastName);
    } catch (error) {
      console.log(error)
    }
  }

  if (state.errorMessage && indicator) {
    setIndicator(false);
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.formcontainer}>
        <Text style={styles.title}>Link your web account</Text>
        <Text style={styles.text}>Please link up your Stratiphy web site account.</Text>
        <View style={styles.google}>
          <GoogleSocialButton onPress={googleSignIn} />
        </View>
        <Text style={styles.ortext}>--- or ---</Text>
        <ActivityIndicator size="large" color={colors.yellowTheme} animating={indicator} />
        <Text style={styles.text} >Email</Text>
        <TextInput
          style={styles.input}
          label="Email"
          value={email}
          onChangeText={(value) => { setEmail(value.trim()) }}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.text} >Password</Text>
        <TextInput
          style={styles.input}
          label="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCompleteType="password"
          secureTextEntry={true}
          autoCorrect={false}
        />
        {state.errorMessage ? (
          <Text style={styles.errorMessage}>{state.errorMessage}</Text>
        ) : null}

      
      <View style={styles.yellowbutton}>
        <YellowButton title='Link Account' onButtonPress={onButtonPress} />
      </View>
      </View>
    </KeyboardAvoidingView>
  );
};



SigninScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 20,
    backgroundColor: colors.white
  },
  formcontainer: {
    marginTop: 0,
  },
  google: {
    alignItems: 'center',
    margin: 20
  },
  ortext: {
    fontSize: 22,
    fontFamily: fonts.GraphikRegular,
    textAlign: 'center'
  },
  indicator: {
    alignSelf: 'center',
    marginVertical: 30
  },
  errorMessage: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'red',
    margin: 15,
  },
  title: {
    width: '90%',
    marginHorizontal: 20,
    marginBottom: 15,
    color: "black",
    fontSize: 22,
    fontFamily: fonts.GraphikSemibold
  },
  input: {
    marginHorizontal: 20,
    paddingStart: 15,
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.white,
    borderColor: colors.paleGreyTwo
  },
  text: {
    width: '90%',
    marginHorizontal: 20,
    marginVertical: 15,
    color: "black",
    fontSize: 18,
    fontFamily: fonts.GraphikRegular,
  },
  yellowbutton: {
    marginVertical: 30
  }
});

export default SigninScreen;
