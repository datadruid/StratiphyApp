import React, { useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator } from 'react-native';
import { Text, Button, Input  } from 'react-native-elements';
import { GoogleSocialButton } from "react-native-social-buttons";
import {GoogleSignin} from 'react-native-google-signin';
import Spacer from './Spacer';
import NavLink from '../components/NavLink';
import { signinGoogle } from '../context/AuthContext';

GoogleSignin.configure({
  webClientId: '1060831970790-vfh908lm2mvd0hr747qblplq1f8ebj99.apps.googleusercontent.com',
  iosClientId: '1060831970790-ud9kp922ecpj4eg508lavpvcbl3v1anu.apps.googleusercontent.com',
  offlineAccess: true
     });


const AuthForm = ({ headerText, subHeaderText1, subHeaderText2, errorMessage, onSubmit, submitButtonText, showName, linkText, routeName, weblogin }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [indicator, setIndicator] = useState(false);

  if(errorMessage && indicator)
  {
    setIndicator(false);
  }

  return (
    <View style={styles.container}>
    <Image style={styles.image} source={require('../img/stratiphycircle.png')} />
      <Spacer>
        <Text h2>{headerText}</Text>
      </Spacer>
      {subHeaderText1 ? (
      <Spacer>
        <Text h4>{subHeaderText1}</Text>
      </Spacer>
      ) : null}
      {subHeaderText2 ? (
      <Spacer>
        <Text h4>{subHeaderText2}</Text>
      </Spacer>
        ) : null}
      {weblogin ? (
        <>
        <Spacer>
        <GoogleSocialButton onPress={googleSignIn} />
        </Spacer>
        <Spacer><Text style={{ fontSize: 24 }}>--- or ---</Text></Spacer>
        </>
       ) : null }
      <ActivityIndicator size="large" color="blue" animating={indicator} />
      <Input
        label="Email"
        value={email}
        onChangeText={(value) => { setEmail(value.trim()) }}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {(showName || weblogin) ? (
        <Input
        label="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        autoCorrect={false}
      />
      ) : null}
      {weblogin ? (
        <Input
        style={styles.input}
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCompleteType="password"
        secureTextEntry={true}
        autoCorrect={false}
      />
      ) : null}
      <Spacer />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() => {
            setIndicator(!indicator);
            onSubmit({ email, name, password })
          }}
        />
      </Spacer>
      <Spacer>
        <NavLink
          routeName={routeName}
          text={linkText}
        />
      </Spacer>
    </View>
  );
};

const googleSignIn = async () => {
  try {
     await GoogleSignin.hasPlayServices();
     const userInfo = await GoogleSignin.signIn();
        console.log('_____userinfo',userInfo)
        //signinGoogle(userInfo.name, userInfo.code);
        this.setState({ userInfo });
  } catch (error) {
      console.log(error)
  }
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent : "center",
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  },
  image: {
    justifyContent : "center",
    width: 150, 
    height: 150
  }
});

export default AuthForm;
