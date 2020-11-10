import React, { useContext } from 'react';
import { StyleSheet, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const AddNameScreen = ({ navigation }) => {
    const isApproved = navigation.getParam('isApproved');
    const { state, addname, clearErrorMessage } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS == "ios" ? "padding" : "height"}
     style={styles.container}>
       <ImageBackground
        style={styles.backgroundcontainer}
        source={require('../img/image-background.jpg')}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm style={styles.authform}
        isApproved={isApproved}
        headerText=""
        subHeaderText1="Just so we know what to call you."
        subHeaderText2="Please let us know your name."
        errorMessage={state.errorMessage}
        submitButtonText="Next"
        showName = "true"
        onSubmit={addname}
      />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};



AddNameScreen.navigationOptions = () => {
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

export default AddNameScreen;