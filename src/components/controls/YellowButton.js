import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, } from 'react-native-elements';
import { colors } from '../modules/Colors';

const YellowButton = ({ title, onButtonPress }) => {
    return (
        <View style={styles.buttoncontainer}>
            <Button buttonStyle={styles.button}
                onPress={onButtonPress}
                titleStyle={styles.buttontitle}
                title={title}
                type='solid' />
        </View>
    )
};

const styles = StyleSheet.create({
    buttoncontainer: {
        marginHorizontal: 20,
        marginBottom: 10
    },
    button: {
        backgroundColor: colors.yellowTheme,
        borderRadius: 12,
        height: 60
    },
    buttontitle: {
        fontWeight: 'bold'
    },
});

export default YellowButton;