import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import AuthForm from '../components/AuthForm';
import { Context as AuthContext  } from '../context/AuthContext';

const SigninScreen = () => {
  const { state, signin, signinPassword, signinGoogle, clearErrorMessage } = useContext(AuthContext);
  const [weblogin, setWeblogin] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground
        style={styles.backgroundcontainer}
        source={require('../img/image-background.jpg')}>
      <AuthForm style={styles.authform}
        headerText="Sign In"
        subHeaderText1="User your web site login."
        errorMessage={state.errorMessage}
        subHeaderText1="User your web site login."
        onSubmit={signinPassword}
        weblogin={true}
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
