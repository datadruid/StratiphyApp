import React, { useContext, useRef } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Text } from '@ui-kitten/components';

import { NavigationEvents } from 'react-navigation';
import Spacer from '../components/Spacer';
import CodeSpacer from '../components/CodeSpacer';
import { Context as AuthContext } from '../context/AuthContext';
import CodeInput from 'react-native-code-input';

const SigninCodeScreen = ({ navigation }) => {
    const email = navigation.getParam('email');
    const password = navigation.getParam('password');
    const auth_id = navigation.getParam('auth_id');
    const isApproved = navigation.getParam('isApproved');
    const hasName = navigation.getParam('hasName');

    const { state, verifyCode, signin, clearErrorMessage } = useContext(AuthContext);
    const inputRef = useRef(null);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <ImageBackground
        style={styles.backgroundcontainer}
        source={require('../img/image-background.jpg')}>
      <View style={styles.formcontainer}>
       <Image style={styles.image} source={require('../img/stratiphyline.png')} />
       <Spacer/>
       <Spacer/>
       <Spacer>
        <Text style={styles.text} category='s1' status='default'>Enter Code</Text>
      </Spacer>
      <Spacer/>
      <Spacer >
        <View style={{width: '60%'}}>
            <Text style={styles.text} category='s1' status='default'>To continue, enter the code from the email we just sent you:</Text>
        </View>
      </Spacer>
      <CodeInput
            ref={inputRef }
            borderType='underline'
            activeColor='white'
            inactiveColor='white'
            codeLength={6}
            space={8}
            size={38}
            codeInputStyle={{ fontSize: 30, fontWeight: '400' }}
            inputPosition='left'
            onFulfill={(code) => verifyCode({ code, email, password, auth_id, isApproved, hasName })}
        />
        <CodeSpacer/>
        {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}
       <TouchableOpacity style={styles.nav} onPress={(code) => {
          inputRef.current.clear();
          signup({ email });
         }}>
      <Spacer>
        <Text style={styles.link}>resend email</Text>
      </Spacer>
    </TouchableOpacity>
    {state.errorMessage ? (
        <TouchableOpacity style={styles.nav} onPress={() => navigation.goBack(null)}>
          <Text style={styles.link}>change email address</Text>
      </TouchableOpacity>
      ) : null} 
      </View>
      </ImageBackground>
    </View>
  );
};

SigninCodeScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formcontainer:{  
    width: '100%',
    marginTop: 200,
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 200, 
    height: 100
  },
  nav:{
      marginTop: 100
  },
  link: {
    color: 'white',
    textAlign: "center"
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  },
  backgroundcontainer: {
    width: '100%',
    flex: 1,
  },
  authform:{
    opacity: 0
  }
});

export default SigninCodeScreen;
