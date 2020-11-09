import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import AuthForm from '../components/AuthForm';
import { Context as AuthContext  } from '../context/AuthContext';

const SigninScreen = () => {
  const { state, signin, signinPassword, signinGoogle, clearErrorMessage } = useContext(AuthContext);
  const [weblogin, setWeblogin] = useState(false);

  const actionOnFocus= () => {
    () => {clearErrorMessage};
   askAboutWebLoginAlert();
  };
  
  const askAboutWebLoginAlert = () =>{
   Alert.alert(
     "Link your account",
     "Do you have a web account, tap Yes to link to this mobile account.",
     [
       {
         text: "No I don't",
         onPress: () => {setWeblogin(false) },
         style: "cancel"
       },
       { text: "Yes link it", onPress: () => {setWeblogin(true)}}
     ],
     { cancelable: false }
   )};

  return (
    <KeyboardAvoidingView style={styles.container}>
      <NavigationEvents onWillFocus={actionOnFocus} />
      <ImageBackground
        style={styles.backgroundcontainer}
        source={require('../img/image-background.jpg')}>
      <AuthForm
        headerText="Sign In"
        subHeaderText1={(weblogin) ? "User your web site login." :""}
        linkText="Dont have an account? Sign up here"
        routeName="Signup"
        errorMessage={state.errorMessage}
        subHeaderText1={(weblogin) ? "User your web site login." :""}
        onSubmit={(weblogin) ? signinPassword : signin}
        weblogin={weblogin}
        signinGoogle={signinGoogle}
        submitButtonText="Sign In"
      />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};



SigninScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
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
  }
});

export default SigninScreen;
