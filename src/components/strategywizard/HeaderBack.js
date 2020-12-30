import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { colors } from '../modules/Colors';

const HeaderBack = ({ text, navigation, onPress }) => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center' }}>
                <TouchableOpacity onPress={() => onPress()}>
                    <View style={styles.textcontainer}>
                        <Icon style={styles.backicon} size={40} name='long-arrow-left' />
                    </View>
                </TouchableOpacity>
                <View style={styles.textcontainer}>
                    <Text style={[styles.text]}>
                        {text}
                    </Text>
                </View>
            </View>
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
        height: 40,
    },
    backicon: {
        paddingLeft: 10,
        justifyContent: 'center',
        color: colors.yellowTheme,
    },
    text: {
        fontSize: 16,
    }
});

export default HeaderBack;
