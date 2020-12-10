import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const getRandomColor = () => {
    return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
}

const IconStack = ({ actions, borderColor, size }) => {
    const borderRadii = size/2;
    if (actions?.some(x => x.Action !== 'Hold')) {
        let totalTickers = actions.filter(x => x.Action === 'Hold').length;
        let leftby = size/1.2;
        let counter = -1;
        let rightby = (totalTickers * leftby)/2.5;
        return (
            <View style={[styles.imagebox, {left : rightby}]}>
                {
                    actions.filter(x => x.Action === 'Hold').map(item => {
                        let circlecolour = getRandomColor();
                        counter ++;
                        return (
                        <>
                            <View style={[styles.stockcircle, 
                                {backgroundColor: circlecolour, right: counter * leftby, borderColor: borderColor, width: size, height: size, borderRadius: borderRadii}
                                ]}>
                                <Text style={styles.stockcircletext}>{item.Ticker}</Text>
                            </View>
                        </>
                        )
                    })
                    }
            </View>
        )
    }
    else {
        return (
            <>
            </>
        )
    }
};

const styles = StyleSheet.create({
    roundimage: {
        position: 'absolute',
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "silver"
    },
    imagebox: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        width: 100,
    },
    stockcircle: {
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor: 'red',
        marginRight: 0,
        margin: 6
    },
    stockcircletext: {
        fontSize: 5,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center'
    },
});

export default IconStack;