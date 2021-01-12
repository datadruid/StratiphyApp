import React, { useContext, useState } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { colors } from '../components/modules/Colors';
import { fonts } from '../components/modules/Fonts';
import YellowButton from '../components/controls/YellowButton';
import { setIntroShown } from '../storage/userStorage'

const StartScreen = ({ navigation }) => {
    const [indicator, setIndicator] = useState(false);

    const onButtonPress = () => {
        setIntroShown('true');
        navigation.navigate('StartSignin');
    };

    return (
        <View style={styles.outercontainer}>
            <View style={styles.topontainer}>
                <Text style={styles.stratiphytext}>Stratiphy.</Text>
                <View style={styles.imagecontainer}>
                    <Image resizeMode='contain' style={styles.peekingimg} source={require('../img/apppeeking.png')} />
                </View>
            </View>

            <View style={styles.bottomcontainer}>
                <Text style={styles.messagetext}>Simple, powerful tools for creating smart investment strategies.</Text>
                <View style={styles.yellowbutton}>
                    <YellowButton title='Get started' onButtonPress={onButtonPress} />
                </View>
            </View>
        </View>
    );
};

StartScreen.navigationOptions = () => {
    return {
        header: () => false,
    };
};

const styles = StyleSheet.create({
    outercontainer: {
        flex: 1,
        marginBottom: 0,
        backgroundColor: colors.white
    },
    topontainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.yellowTheme,

    },
    imagecontainer: {
        height: 202
    },
    stratiphytext: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: fonts.InterExtraBold,
        color: colors.white,
        marginBottom: 50
    },
    messagetext: {
        fontSize: 22,
        fontFamily: fonts.GraphikSemibold,
        color: 'black',
        textAlign: 'center',
        marginHorizontal: 30,
        marginVertical: 40
    },
    peekingimg: {
        alignSelf: 'center',
        height: 202
    },
    bottomcontainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        height: '50%'
    },
    yellowbutton: {
        marginBottom: 30
    }
});

export default StartScreen;
