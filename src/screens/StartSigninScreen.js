import React, { useContext, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import { colors } from '../components/modules/Colors';
import { fonts } from '../components/modules/Fonts';
import YellowButton from '../components/controls/YellowButton';
import HeaderBack from '../components/strategywizard/HeaderBack';

const StartSigninScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [indicator, setIndicator] = useState(false);

  const onButtonPress = async () => {
    setIndicator(true);
    await signup(email);
    setIndicator(false);
    navigation.navigate('StartCheckEmail', { email });
  };

  if (state.errorMessage && indicator) {
    setIndicator(false);
  }

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}>
         <NavigationEvents onWillFocus={clearErrorMessage} />
      <View style={{ height: 88 }}>
        <HeaderBack text='' showtotal={false} onLeftPress={() => onBackPress()} navigation={navigation} />
      </View>
      <View style={styles.formcontainer}>
        <Text style={styles.text} >Enter your email address</Text>
        <TextInput
          placeholder='Email'
          style={styles.input}
          value={email}
          onChangeText={(value) => { setEmail(value.trim()) }}
          autoCapitalize="none"
          autoCorrect={false}
          selectionColor={colors.yellowTheme}
        />
      </View>
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}
      <ActivityIndicator style={styles.indicator} size="large" color={colors.yellowTheme} animating={indicator} />


      <View style={styles.yellowbutton}>
        <YellowButton title='Continue' onButtonPress={onButtonPress} />
      </View>

    </KeyboardAvoidingView>
  );
};



StartSigninScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
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
    marginTop: 0
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
    width: '100%',
    margin: 20,
    color: "black",
    fontSize: 22,
    fontFamily: fonts.GraphikSemibold
  },
  yellowbutton: {
    marginBottom: 30
  }
});

export default StartSigninScreen;
