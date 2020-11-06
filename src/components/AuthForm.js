import React, { useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator } from 'react-native';
import { GoogleSocialButton } from "react-native-social-buttons";
import {GoogleSignin} from 'react-native-google-signin';
import Spacer from './Spacer';
import NavLink from '../components/NavLink';
import { Button, Text, Input } from '@ui-kitten/components';
import { ThemeContext } from '../theme-context';

GoogleSignin.configure({
  webClientId: '1060831970790-vfh908lm2mvd0hr747qblplq1f8ebj99.apps.googleusercontent.com',
  iosClientId: '1060831970790-ud9kp922ecpj4eg508lavpvcbl3v1anu.apps.googleusercontent.com',
  offlineAccess: true
     });


const AuthForm = ({ headerText, subHeaderText1, subHeaderText2, errorMessage, onSubmit, submitButtonText, showName, linkText, routeName, weblogin, signinGoogle }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [indicator, setIndicator] = useState(false);

  const themeContext = React.useContext(ThemeContext);

  const googleSignIn = async () => {
    try {
       await GoogleSignin.hasPlayServices();
       const userInfo = await GoogleSignin.signIn();
       let name = userInfo.user.name;
       let code = userInfo.serverAuthCode;
       let email = userInfo.user.email;
       signinGoogle({email, name, code});
    } catch (error) {
        console.log(error)
    }
  }

  if(errorMessage && indicator)
  {
    setIndicator(false);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Image style={styles.image} source={require('../img/stratiphyline.png')} />
      <Spacer>
        <Text style={styles.text} category='s1' status='default'>{headerText}</Text>
      </Spacer>
      {subHeaderText1 ? (
      <Spacer>
        <Text style={styles.text} category='s2' status='default'>{subHeaderText1}</Text>
      </Spacer>
      ) : null}
      {subHeaderText2 ? (
      <Spacer>
        <Text style={styles.text} category='s2' status='default'>{subHeaderText2}</Text>
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
      style={styles.input}
        label="Email"
        value={email}
        onChangeText={(value) => { setEmail(value.trim()) }}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {(showName || weblogin) ? (
        <Input 
        style={styles.input}
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
        <Button style={{ marginVertical: 4 }}
          onPress={() => {
            setIndicator(!indicator);
            onSubmit({ email, name, password })
          }}
        >{submitButtonText}</Button>
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
    width: 200, 
    height: 100
  },
  input:{
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.2)'
  }
});

export default AuthForm;
