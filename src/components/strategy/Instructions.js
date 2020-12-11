import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as StrategyContext } from '../../context/StrategyContext';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import * as RNLocalize from "react-native-localize";
import getSymbolFromCurrency from 'currency-symbol-map';
import {getAvatarColor} from '../modules/UiHelper';
import moment from 'moment';

const langTag = RNLocalize.getLocales()[0].languageTag;
const currencyFormat = {
    style: "currency",
    currency: langTag
  };

const Instructions = ({ actions }) => {
    let counter = 0;
    let lastDate = '';
    if (actions?.some(x => x.Action !== 'Hold')) {
            
        return (
            <>
                {
                    actions.filter(x => x.Action !== 'Hold').map(item => {
                        let circlecolour = getAvatarColor(item.Ticker);
                        let showDate = (item.Date !== lastDate);
                        lastDate = item.Date;
                        return (
                            <>
                            { item.Date && showDate && <Text style={styles.datetext}>{moment(Date.parse(item.Date)).format('D MMMM')}</Text>}
                                <View style={styles.instructionitemcontainer}>
                                    <View style={[styles.stockcircle, {backgroundColor: circlecolour}]}> 
                                        <Text style={styles.stockcircletext}>{item.Ticker}</Text>
                                    </View>
                                    <Text style={styles.actiontext}>
                                        <Text style={{fontWeight: 'bold'}}>{item.Action} </Text>
                                        <Text style={{fontWeight: 'bold'}}>{getSymbolFromCurrency(RNLocalize.getCurrencies()[0])}{item.Buy.toFixed(2)} </Text>
                                        <Text>{item.Action} </Text>
                                        <Text>of </Text>
                                        <Text style={{fontWeight: 'bold'}}>{item.Ticker} </Text>
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
        marginTop:8,
        paddingBottom: 16
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
    },
    datetext: {
        fontWeight: "600",
        fontSize: 13,
        color: "#8d949d",
        lineHeight:24,
        marginBottom:5,
        marginTop:25
    }
});

export default Instructions;