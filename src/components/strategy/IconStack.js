import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {getAvatarColor} from '../modules/UiHelper';

const IconStack = ({ actions, borderColor, size }) => {
    let maxDate = (actions.map(e => e.Date)).sort().reverse()[0];
    const borderRadii = size/2;
    if (actions?.some(x => x.Action !== 'Hold')) {
        let totalTickers = actions.filter(x => x.Date === maxDate && x.Action === 'Hold').length;
        let leftby = size/1.2;
        let counter = -1;
        let rightby = (totalTickers * leftby)/2.5;
        return (
            <View style={[styles.imagebox, {left : rightby}]}>
                {
                    actions.filter(x => x.Date === maxDate && x.Action === 'Hold').map(item => {
                        key = item.Ticker;
                        let circlecolour = getAvatarColor(item.Ticker);
                        counter ++;
                        return (
                            <View key={item.Ticker} style={[styles.stockcircle, 
                                {backgroundColor: circlecolour, right: counter * leftby, borderColor: borderColor, width: size, height: size, borderRadius: borderRadii}
                                ]}>
                                <Text style={styles.stockcircletext}>{item.Ticker}</Text>
                            </View>
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