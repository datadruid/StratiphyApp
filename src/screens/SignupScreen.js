import React, { useContext, useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Button, Text, Input } from '@ui-kitten/components';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../theme-context';

const SignupScreen = ({ navigation }) => {
  const { state, signup } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [indicator, setIndicator] = useState(false);

  const themeContext = React.useContext(ThemeContext);
  
  if(state.errorMessage && indicator)
  {
    setIndicator(false);
  }

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS == "ios" ? "padding" : "height"}
     style={styles.outercontainer}>
       <ImageBackground
        style={styles.backgroundcontainer}
        source={require('../img/image-background.jpg')}>
      <View style={styles.container}>
    <Image style={styles.image} source={require('../img/stratiphyline.png')} />
      <Spacer>
        <Text style={styles.text} category='s1' status='default'>Get Started</Text>
      </Spacer>
      <Spacer>

       
      
      </Spacer>
      <Spacer>

        

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
      
      <Spacer />
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button style={{ marginVertical: 4 }}
          onPress={() => {
            setIndicator(!indicator);
            signup({ email })
          }}
        >Next</Button>
      </Spacer>
    </View>
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
  outercontainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 0
  },
  container:{
    flex:1,
    justifyContent : "center",
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center'
  },
  backgroundcontainer: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  authform:{
    opacity: 0
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

export default SignupScreen;
