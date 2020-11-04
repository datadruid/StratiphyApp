import React, { useContext,useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';


const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  
  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS == "ios" ? "padding" : "height"}
     style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText="Make Better Investments"
        subHeaderText1="Set your investment preferences"
        subHeaderText2="Test historic performance"
        errorMessage={state.errorMessage}
        submitButtonText="Join Now"
        showName = "showName"
        routeName="Signin"
        linkText="Already have an account? Sign in here!"
        onSubmit={signup}
      />
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
  }
});

export default SignupScreen;
