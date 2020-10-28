import React, { useContext } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Button, Input  } from 'react-native-elements';
import NavLink from '../components/NavLink';
import Spacer from '../components/Spacer';
import CodeSpacer from '../components/CodeSpacer';
import { Context as AuthContext } from '../context/AuthContext';
import CodeInput from 'react-native-code-input';

const SigninCodeScreen = ({ navigation }) => {
    const email = navigation.getParam('email');
    const { state, verifyCode, signin } = useContext(AuthContext);

  return (
    <View style={styles.container}>
       <Image style={styles.image} source={require('../img/stratiphycircle.png')} />
       <Spacer>
        <Text h1>Enter Code</Text>
      </Spacer>
      <Spacer>
        <Text h4 style={styles.h4}>To continue, enter the code from the email we just sent you:</Text>
      </Spacer>
      <CodeInput
            borderType='underline'
            activeColor='black'
            inactiveColor='black'
            codeLength={6}
            space={8}
            size={38}
            codeInputStyle={{ fontSize: 30, fontWeight: '400' }}
            inputPosition='left'
            onFulfill={(code) => verifyCode({ code, email })}
        />
        <CodeSpacer/>
        {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}
       <TouchableOpacity style={styles.nav} onPress={(code) => signin({ email })}>
      <Spacer>
        <Text style={styles.link}>resend email</Text>
      </Spacer>
    </TouchableOpacity>
    </View>
  );
};

SigninCodeScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
    justifyContent : "center",
    alignItems: 'center',
    marginTop: 70,
  },
  image: {
    justifyContent : "center",
    width: 150, 
    height: 150
  },
  h4:{
    textAlign : "center",
  },
  nav:{
      marginTop: 100
  },
  link: {
    color: 'blue',
    textAlign: "center"
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  },
});

export default SigninCodeScreen;
