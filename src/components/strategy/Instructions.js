import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as StrategyContext } from '../../context/StrategyContext';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import * as RNLocalize from "react-native-localize";
import getSymbolFromCurrency from 'currency-symbol-map';

const langTag =RNLocalize.getLocales()[0].languageTag;
const currencyFormat = {
    style: "currency",
    currency: langTag
  };

const getRandomColor = () =>
{
    return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
}

const Instructions = ({ actions }) => {
    let counter = 0;
    if (actions.some(x => x.Action !== 'Hold')) {
            
        return (
            <>
                {
                    actions.filter(x => x.Action !== 'Hold').map(item => {
                        let circlecolour = getRandomColor();
                        return (
                            <>
                                <View style={styles.instructionitemcontainer}>
                                    <View style={[styles.stockcircle, {backgroundColor: circlecolour}]}>
                                        <Text style={styles.stockcircletext}>{item.Ticker}</Text>
                                    </View>
                                    <Text style={styles.actiontext}>
                                        <Text style={{fontWeight: '600'}}>{item.Action} </Text>
                                        <Text style={{fontWeight: '600'}}>{getSymbolFromCurrency(RNLocalize.getCurrencies()[0])}{item.Buy.toFixed(2)} </Text>
                                        <Text>{item.Action} </Text>
                                        <Text>of </Text>
                                        <Text style={{fontWeight: '600'}}>{item.Ticker} </Text>
                                        <Text>stock</Text>  
                                    </Text>
                                </View>
                                <View style={styles.spacerContainer} />
                            </>
                        );
                    })}

            </>
        )
    }
    else {
        return (
            <>
            </>
        )
    }
    counter++;
};

const styles = StyleSheet.create({
    instructionitemcontainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        height: 78,
        paddingBottom: 13,
        flex :1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 18,
        paddingLeft: 24
    },
    spacerContainer: {
        height: 13
    },
    actiontext: {
        fontWeight: '400',
        fontSize: 16,
        textAlign:'center',
        textAlignVertical: 'center',
        marginTop:8
    },
    stockcircle: {
        justifyContent: 'center',
        height:40,
        width:40,
        borderRadius:20,
        backgroundColor: 'red',
        marginRight: 20
    },
    stockcircletext: {
        fontSize: 7,
        fontWeight: '400',
        color:'white',
        textAlign: 'center'
    }
});

export default Instructions;