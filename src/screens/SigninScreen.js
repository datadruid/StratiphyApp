import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import AuthForm from '../components/AuthForm';
import { Context } from '../context/AuthContext';

const SigninScreen = () => {
  const { state, signin, signinPassword, signinGoogle, clearErrorMessage } = useContext(Context);
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
    marginBottom: 40,
  }
});

export default SigninScreen;
