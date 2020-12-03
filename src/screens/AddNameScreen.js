import React, { useContext,useState } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Button, Text, Input } from '@ui-kitten/components';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../theme-context';

const AddNameScreen = ({ navigation }) => {
    const { state, addname, errorMessage } = useContext(AuthContext);
    const [indicator, setIndicator] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const themeContext = React.useContext(ThemeContext);

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS == "ios" ? "padding" : "height"}
     style={styles.topcontainer}>
       <ImageBackground
        style={styles.backgroundcontainer}
        source={require('../img/image-background.jpg')}>
      <View style={styles.container}>
    <Image style={styles.image} source={require('../img/stratiphyline.png')} />
      <Spacer/>
      <Spacer>
        <Text style={styles.text} category='s2' status='default'>Just so we know what to call you</Text>
      </Spacer>
      <Spacer>
        <Text style={styles.text} category='s2' status='default'>Please let us know your name.</Text>
        </Spacer>
      <ActivityIndicator size="large" color="white" animating={indicator} />
      <Input 
      style={styles.input}
      label="First Name"
      value={firstName}
      onChangeText={setFirstName}
      autoCapitalize="words"
      autoCorrect={false}
    />
        <Input 
        style={styles.input}
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
        autoCapitalize="words"
        autoCorrect={false}
      />

      <Spacer />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button style={{ marginVertical: 4 }}
          onPress={() => {
            setIndicator(!indicator);
            addname({ firstName, lastName })
          }}
        >Finish</Button>
      </Spacer>
    </View>
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
  topcontainer: {
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
  nput:{
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    tintColor: 'rgba(1, 1, 1, 1)',
    color: "rgba(1, 1, 1, 1)"
  },
  text: {
    color: "white"
  }
});

export default AddNameScreen;