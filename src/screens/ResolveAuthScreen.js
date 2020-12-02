import React, { useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, } from '@ui-kitten/components';
import { Context as AuthContext } from '../context/AuthContext';

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return (
       <Layout style={styles.container}/>
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
    alignSelf: 'center'
  },
  backgroundcontainer: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  }
});

export default ResolveAuthScreen;
