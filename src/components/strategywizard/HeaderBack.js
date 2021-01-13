import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { colors } from '../modules/Colors';
import { fonts } from '../modules/Fonts';

const HeaderBack = ({ text, navigation, showtotal, onLeftPress, onRightPress, rightText }) => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center' }}>
                <TouchableOpacity onPress={() => onLeftPress()}>
                    <View style={styles.textcontainer}>
                        <Icon style={styles.backicon} size={40} name='long-arrow-left' />
                    </View>
                </TouchableOpacity>
                <View style={styles.textcontainer}>
                    { showtotal &&
                    <Text style={[styles.text]}>
                        {text}
                    </Text>
                    }
                </View>
                
            </View>
            {(rightText) &&
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center' }}>
            <TouchableOpacity onPress={() => onRightPress()}>
                    <View style={styles.textcontainer}>
                        <Text style={[styles.text, styles.link]}>{rightText}</Text>
                    </View>
                </TouchableOpacity>
            </View>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: colors.white,
    },
    textcontainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 20,
        height: 40,
    },
    backicon: {
        paddingLeft: 10,
        justifyContent: 'center',
        color: colors.yellowTheme,
    },
    text: {
        fontSize: 16,
fontFamily: fonts.GraphikSemibold
    },
    link: {
        color:  colors.yellowTheme
    }
});

export default HeaderBack;
