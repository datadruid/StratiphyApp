import React, { useContext } from 'react';
import { StyleSheet, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS == "ios" ? "padding" : "height"}
     style={styles.container}>
       <ImageBackground
        style={styles.backgroundcontainer}
        source={require('../img/image-background.jpg')}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm style={styles.authform}
        headerText="Investing made for everyone"
        subHeaderText1="Set your investment preferences"
        subHeaderText2="Test historic performance"
        errorMessage={state.errorMessage}
        submitButtonText="Join Now"
        showName = "showName"
        routeName="Signin"
        linkText="Already have an account? Sign in here!"
        onSubmit={signup}
      />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};



SignupScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom:30
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

export default SignupScreen;
