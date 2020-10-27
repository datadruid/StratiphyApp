import React from 'react';
import { View, StyleSheet } from 'react-native';

const CodeSpacer = ({ children }) => {
  return <View style={styles.spacer}>{children}</View>;
};

const styles = StyleSheet.create({
  spacer: {
    margin: 50
  }
});

export default CodeSpacer;