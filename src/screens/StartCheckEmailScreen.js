import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { colors } from '../components/modules/Colors';
import { fonts } from '../components/modules/Fonts';
import YellowButton from '../components/controls/YellowButton';
import HeaderBack from '../components/strategywizard/HeaderBack';
import { openInbox } from 'react-native-email-link'

const StartCheckEmailScreen = ({ navigation }) => {
    const email = navigation.getParam('email');
    const { state, repeatemail } = useContext(AuthContext);
    const [indicator, setIndicator] = useState(true);

    const onButtonPress = () => {
        //navigation.navigate('StartCheckEmailScreen');
        openInbox();
        navigation.navigate('CodeScreen', { email, auth_id: userInfo._id, isApproved, hasName });
    };

    const onBackPress = () => {
        navigation.goBack();
    };

    const resendlink = () => {
        repeatemail(email);
    };

    if (state.errorMessage && indicator) {
        setIndicator(false);
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
            <View >
                <View style={{ height: 88 }}>
                    <HeaderBack text='' showtotal={false} onPress={() => onBackPress()} navigation={navigation} />
                </View>
                <View style={styles.formcontainer}>
                    <Text style={styles.text} >We sent you a verifaction code to</Text>
                    <Text style={[styles.text, styles.textbold]} >{email}.</Text>
                
                {state.errorMessage ? (
                    <Text style={styles.errorMessage}>{state.errorMessage}</Text>
                ) : null}
                </View>
                <View style={styles.imagecontainer}>
                    <Image resizeMode='contain' style={styles.peekingimg} source={require('../img/emailsent.png')} />
                </View>
            </View>

            <View style={styles.yellowbutton}>
                <YellowButton title='Open mail app' onButtonPress={onButtonPress} />

                <TouchableOpacity onPress={resendlink}>
                    <View style={styles.resendlink}>
                        <Text style={styles.resendtext}>Resend email</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};



StartCheckEmailScreen.navigationOptions = () => {
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
    indicator: {
        alignSelf: 'center',
        marginVertical: 30
    },
    errorMessage: {
        alignSelf: 'center',
        fontSize: 16,
        color: 'red',
        margin: 15,
    },
    imagecontainer: {
        alignSelf: 'center',
        height: 240
    },
    peekingimg: {
        alignSelf: 'center',
        width: 220,
        height: 240
    },
    text: {
        textAlign: 'center',
        marginHorizontal: 20,
        color: "black",
        fontSize: 18,
        fontFamily: fonts.GraphikRegular,
    },
    textbold: {
        fontFamily: fonts.GraphikSemibold
    },
    yellowbutton: {
        marginBottom: 0
    },
    resendtext: {
        alignSelf: 'center',
        fontSize: 16,
        fontFamily: fonts.GraphikRegular,
        marginBottom: 40,
        marginTop: 20,
        color: colors.yellowTheme,
    }
});

export default StartCheckEmailScreen;
