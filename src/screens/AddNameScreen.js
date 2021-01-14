import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView, Text } from 'react-native';
import { fonts } from '../components/modules/Fonts';
import { colors } from '../components/modules/Colors';
import YellowButton from '../components/controls/YellowButton';
import { Context as AuthContext } from '../context/AuthContext';

const AddNameScreen = ({ navigation }) => {
  const { state, addname, errorMessage } = useContext(AuthContext);
  const [indicator, setIndicator] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const saveName = () => {
    setIndicator(!indicator);
    addname({ firstName, lastName, userId: state.userId })
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}>
      <View style={styles.formcontainer}>
      <Text style={styles.title}>Your name</Text>
        <Text style={styles.text}>Just so we know what to call you</Text>
        <ActivityIndicator size="large" color="white" animating={indicator} />
        <View style={styles.horizontalTopContainer}>
          <Text style={styles.titleStyle}>First name</Text>
        </View>
        <TextInput
          style={styles.input}
          label="First Name"
          value={firstName}
          selectionColor={colors.yellowTheme}
          onChangeText={setFirstName}
          autoCapitalize="words"
          autoCorrect={false}
        />
        <View style={styles.horizontalTopContainer}>
          <Text style={styles.titleStyle}>Last name</Text>
        </View>
        <TextInput
          style={styles.input}
          label="Last Name"
          value={lastName}
          selectionColor={colors.yellowTheme}
          onChangeText={setLastName}
          autoCapitalize="words"
          autoCorrect={false}
        />

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
      </View>
      <View style={styles.yellowbutton}>
        <YellowButton title='Finish' onButtonPress={saveName} />
      </View>

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
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 20,
    backgroundColor: colors.white
  },
  formcontainer: {
    marginTop: 60,
    marginBottom: 40
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  },
  horizontalTopContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: (19),
    marginTop: (20),
    marginBottom: (1),
  },
  titleStyle: {
    fontSize: 22,
    fontFamily: fonts.GraphikSemibold,
    marginBottom: 15,
    color: 'black',
  },
  input: {
    width: '90%',
    marginHorizontal: 20,
    paddingLeft: 15,
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.white,
    borderColor: colors.paleGreyTwo,

    fontSize: 20,
    fontFamily: fonts.GraphikRegular,
    marginBottom: 20
  },
  title: {
    width: '90%',
    marginHorizontal: 20,
    marginBottom: 15,
    color: "black",
    fontSize: 22,
    fontFamily: fonts.GraphikSemibold
  },
  text: {
    width: '90%',
    marginHorizontal: 20,
    marginBottom: 15,
    color: "black",
    fontSize: 18,
    fontFamily: fonts.GraphikRegular,
  },
  yellowbutton: {
    marginBottom: 30
  },
});

export default AddNameScreen;