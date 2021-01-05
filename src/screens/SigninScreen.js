import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, KeyboardAvoidingView, ImageBackground, Button, Text, Input } from 'react-native';
import { GoogleSocialButton } from "react-native-social-buttons";
import {GoogleSignin} from 'react-native-google-signin';
import Spacer from '../components/Spacer';
import { Context as AuthContext  } from '../context/AuthContext';
import { ThemeContext } from '../theme-context';

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

  const themeContext = React.useContext(ThemeContext);

  const googleSignIn = async () => {
    try {
       await GoogleSignin.hasPlayServices();
       const userInfo = await GoogleSignin.signIn();
       let firstName = userInfo.user.givenName;
       let lastName = userInfo.user.familyName;
       let googleCode = userInfo.serverAuthCode;
       updateGoogleUser(googleCode,firstName,lastName);
    } catch (error) {
        console.log(error)
    }
  }

  if(state.errorMessage && indicator)
  {
    setIndicator(false);
  }

  return (
    <KeyboardAvoidingView style={styles.topcontainer}>
      <ImageBackground
        style={styles.backgroundcontainer}
        source={require('../img/image-background.jpg')}>
      <View style={styles.container}>
    <Image style={styles.image} source={require('../img/stratiphyline.png')} />
      <Spacer>
        <Text style={styles.text} category='s1' status='default'>Link your web account</Text>
      </Spacer>
      <Spacer>
        <Text style={styles.text} category='s2' status='default'>Please link up your web site account.</Text>
      </Spacer>
      <Spacer>
        </Spacer>
        <Spacer>
        <GoogleSocialButton onPress={googleSignIn} />
        </Spacer>
        <Spacer>
          <Text style={{ fontSize: 24 }}>--- or ---</Text>
          </Spacer>
      <ActivityIndicator size="large" color="white" animating={indicator} />
      
      <Input 
        style={styles.input}
        label="Email"
        value={email}
        onChangeText={(value) => { setEmail(value.trim()) }}
        autoCapitalize="none"
        autoCorrect={false}
      />
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
      <Spacer />
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button style={{ marginVertical: 4 }}
          onPress={() => {
            setIndicator(!indicator);
            updateEmailPasswordUser( email, password, hasName )
          }}
        >Link Account</Button>
      </Spacer>
    </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};



SigninScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  topcontainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 0,
  },
  backgroundcontainer: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  authform:{
    opacity: 0
  },
  container:{
    flex:1,
    justifyContent : "center",
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center'
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    tintColor: 'rgba(1, 1, 1, 1)',
    color: "rgba(1, 1, 1, 1)"
  },
  text: {
    color: "white"
  }
});

export default SigninScreen;
