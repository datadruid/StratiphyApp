import React, { useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator  } from 'react-native';
import { Text, Button, Input  } from 'react-native-elements';
import Spacer from './Spacer';

const AuthForm = ({ headerText, subHeaderText1, subHeaderText2, errorMessage, onSubmit, submitButtonText, showName }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [indicator, setIndicator] = useState(false);

  if(errorMessage && indicator)
  {
    setIndicator(false);
  }

  return (
    <View style={styles.container}>
    <Image style={styles.image} source={require('../img/stratiphycircle.png')} />
      <Spacer>
        <Text h1>{headerText}</Text>
      </Spacer>
      <Spacer>
        <Text h4>{subHeaderText1}</Text>
      </Spacer>
      <Spacer>
        <Text h4>{subHeaderText2}</Text>
      </Spacer>
      <ActivityIndicator size="large" color="blue" animating={indicator} />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {showName ? (
        <Input
        label="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        autoCorrect={false}
      />
      ) : null}
      <Spacer />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() => {
            setIndicator(!indicator);
            onSubmit({ email, name })
          }}
        />
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    justifyContent : "center",
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  },
  image: {
    justifyContent : "center",
    width: 150, 
    height: 150
  }
});

export default AuthForm;
