import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return (
       <View style={styles.container}>
         <StatusBar hidden={true} />
       </View>
  );
  return null;
};



ResolveAuthScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent : "center",
    alignItems: 'center',
    width: '100%',
    height:'100%',
    alignSelf: 'center',
    backgroundColor: 'white'
  },
  image:{
    width:250,
    height:250
  }
});

export default ResolveAuthScreen;
