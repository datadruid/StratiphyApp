import React, { useContext } from 'react';
import { StyleSheet, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const SignupScreen = ({ navigation }) => {
  const { state, signup } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS == "ios" ? "padding" : "height"}
     style={styles.container}>
       <ImageBackground
        style={styles.backgroundcontainer}
        source={require('../img/image-background.jpg')}>
      <AuthForm style={styles.authform}
        headerText=""
        subHeaderText1=""
        subHeaderText2=""
        errorMessage={state.errorMessage}
        submitButtonText="Next"
        showName = ""
        routeName="Signin"
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
    marginBottom: 0
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
