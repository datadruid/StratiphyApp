import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text,H2 } from '@ui-kitten/components';
import Spacer from './Spacer';
import { withNavigation } from 'react-navigation';

const NavLink = ({ navigation, text, routeName }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Spacer>
        <Text h2>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default withNavigation(NavLink);
