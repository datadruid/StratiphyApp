import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as StrategyContext } from '../../context/StrategyContext';
import * as RNLocalize from "react-native-localize";
import getSymbolFromCurrency from 'currency-symbol-map';
import { LineChart } from 'react-native-chart-kit';
import {getAvatarColor, getChartStartDate, getChartEndDate, getChartValueFilter} from '../modules/UiHelper';

const currencyFormat = {
    style: "currency",
    currency: RNLocalize.getLocales()[0].languageTag
  };

const Holdings = ({ actions }) => {
    const { state, getTickerData, clearErrorMessage } = useContext(StrategyContext); 
    let counter = 0;
    if (actions?.some(x => x.Action !== 'Hold')) {

        return (
            <View style={styles.holdingcontainer}>
                {
                    actions.filter(x => x.Action === 'Hold').map(item => {
                        key = item.ticker;
                        let tickerData = {series : [0]};
                        let formattedStratValue ='';
                        let slimList = [];
                        if(state.tickerData.find(x=> x.ticker === item.Ticker)?.series?.length)
                        {
                            tickerData = state.tickerData.find(x=> x.ticker === item.Ticker);
                            slimList = tickerData.series.map(x=> x.value);
                            formattedStratValue = `${getSymbolFromCurrency(RNLocalize.getCurrencies()[0])}${tickerData.endValue.toLocaleString(RNLocalize.getLocales()[0].languageTag, currencyFormat)}`;
                        }

                        let circlecolour = getAvatarColor(item.Ticker);
                        let linecolour = 'rgb(227, 63, 100)';
                        if (tickerData.performancePct > 0) {
                            linecolour = 'rgb(74, 250, 154)';
                        }

                        
                        const chartConfig = {
                            backgroundColor: "#ffffff",
                            backgroundGradientFrom: "#ffffff",
                            backgroundGradientTo: "#ffffff",
                            fillShadowGradient :linecolour,
                            fillShadowGradientOpacity: 0.8,
                            decimalPlaces: 2, // optional, defaults to 2dp #f9b10b
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                              borderRadius: 0,
                            }
                          };
                        counter++;
                        return (
                            <>
                            {(counter > 1) && <View style={styles.linespacer} />}
                            <View style={styles.itemcontainer}>
                                <View style={[styles.stockcircle, {backgroundColor: circlecolour}]}>
                                        <Text style={styles.stockcircletext}>{item.Ticker}</Text>
                                </View>
                                

                                <View style={styles.holdingitemcontainer}>
                                    <View style={styles.stackbox}>
                                        <Text style={styles.tickertext}>
                                        {item.Ticker}
                                        </Text>
                                        <Text style={styles.nametext}>
                                            Name
                                        </Text>
                                    </View>
                                    <View style={styles.chartcontainer}>
                                        <LineChart
                                            data={{
                                                labels: [""],
                                                datasets: [
                                                {
                                                    data: slimList,
                                                    color: () => linecolour
                                                    , strokeWidth: "2"
                                                }
                                                ]
                                            }}
                                            fromZero={true}
                                            drawBorders={false}
                                            withDots={false}
                                            withShadow={false}
                                            withOuterLines={false}
                                            withInnerLines={false}
                                            withHorizontalLabels={false}
                                            width={75.5} // from react-native
                                            height={45}
                                            yAxisInterval={1} // optional, defaults to 1
                                            chartConfig={chartConfig}
                                            bezier
                                            style={{
                                                marginVertical: 0,
                                                borderRadius: 0,
                                                margin: 0,
                                                paddingRight: 16.5,
                                                top: 0,
                                            }}
                                            />
                                        </View>
                                    <View style={styles.stackbox}>
                                        <Text style={[styles.tickertext, styles.valuetext]}>
                                            {formattedStratValue}
                                        </Text>
                                        <Text style={[{color: linecolour }, styles.nametext, styles.percenttext] }>
                                         {tickerData.performancePct}%
                                        </Text>
                                    </View>
                                </View>
                            </View>    
                            </>
                        );
                        
                    })}
            </View>

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
    itemcontainer: {
        height: 75,
        flex :1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 18,
        paddingHorizontal: 20
    },
    holdingcontainer: {
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 12,
    },
    holdingitemcontainer: {
        height: 75,
        flex :1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    chartcontainer: {
        flex :1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 50
    },
    linespacer: {
        backgroundColor: '#DBDEE7',
        height: 1,
        marginHorizontal: 20
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
        fontSize: 8,
        fontWeight: '500',
        color:'white',
        textAlign: 'center'
    },
    tickertext: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    valuetext: {
        textAlign: 'right'
    },
    nametext: {
        marginTop: 5,
        fontSize: 13,
        fontWeight: '400',
    },
    percenttext:{
        textAlign: 'right',
        justifyContent: 'flex-end'
    },
    stackbox: {
        justifyContent: 'flex-end',
        height:40
    }
});

export default Holdings;