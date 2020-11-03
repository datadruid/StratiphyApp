import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { NavigationEvents } from 'react-navigation';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import NavLink from '../components/NavLink';

GoogleSignin.configure({
  webClientId: '922326295276-oc1c7s4fi87mj8r2lcovi2g0dt5hmdj2.apps.googleusercontent.com',
  iosClientId: '922326295276-dlepd6l8mhnfiefsglcssl2vnsd0gg8s.apps.googleusercontent.com',
  offlineAccess: true
     });

const AccountLinkScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, linkAccount, clearErrorMessage } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
        <View style={styles.container}>
        <Text style={{ fontSize: 48 }}>Link Account</Text>
        <Spacer/>
      <Text>Sign in with your web account to link it to this account</Text>
      <Spacer/>
      <Spacer>
        <GoogleSigninButton onPress={googleSignIn} />
      </Spacer>
    <Spacer><Text style={{ fontSize: 24 }}>--- or ---</Text></Spacer>
      <Input
      style={styles.input}
        label="Email"
        value={email}
        onChangeText={(value) => { setEmail(value.trim()) }}
        autoCapitalize="none"
        autoCorrect={false}
      />
        <Input
        style={styles.input}
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCompleteType="password"
        secureTextEntry={true}
        autoCorrect={false}
      />
      <Spacer />
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}
      <Spacer></Spacer>
    <Spacer>
        <Button
          title='Link Account'
          onPress={() => {
            linkAccount({ email, password })
          }}
        />
      </Spacer>
      </View>
    </SafeAreaView>
  );
};

const googleSignIn = async () => {
    try {
       await GoogleSignin.hasPlayServices();
       const userInfo = await GoogleSignin.signIn();
          console.log('_____userinfo',userInfo)
          this.setState({ userInfo });
    } catch (error) {
        console.log(error)
    }
}


AccountLinkScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <FontAwesome name="gear" size={20} />
};


const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent : 'center',
        alignItems: 'center',
      },
      errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
      },
      input:{
        flexDirection:'row',
        justifyContent:'center'
      }
});

export default AccountLinkScreen;