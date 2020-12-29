import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as StrategyContext } from '../../context/StrategyContext';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import * as RNLocalize from "react-native-localize";
import {getAvatarColor, getComparisonButtonLabelForIndex, formatComparisonValue} from '../modules/UiHelper';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

const langTag = RNLocalize.getLocales()[0].languageTag;
const currencyFormat = {
    style: "currency",
    currency: langTag
  };

  

const Comparisons = ({ navigation, strategy, selectedIndex }) => {
    const { state } = useContext(StrategyContext);
    const displayComparison = getComparisonButtonLabelForIndex(selectedIndex);
    const actions = [strategy];
    let lastDate = '';
    const timePeriod = 3;  
    
    if (actions) {
            
        return (
            <>
                {
                    actions.map(item => {
                        key = item.strategyName;
                        let formattedStratValue = '';
                        let linecolour = 'rgb(227, 63, 100)';
                        let plusminus = ''
                        if (item.performancePct > 0) {
                            linecolour = 'rgb(74, 250, 154)';
                            plusminus = '+';
                        }

                        const dispValue = state.comparisonTabData[displayComparison].Strategy;
                        if(dispValue) {
                            formattedStratValue = formatComparisonValue(state.comparisonTabData[displayComparison].unit, dispValue, currencyFormat);
                        }
                        let slimList = [];
                        if (strategy.analytics?.length > 0)
                        {
                            slimList = strategy.analytics[0].data.map(x=> x.value);
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
                          
                        let circlecolour = getAvatarColor('S');
                        let showDate = (item.Date !== lastDate);
                        lastDate = item.Date;
                        return (
                            <>
                            { item.Date && showDate && <Text style={styles.datetext}>{moment(Date.parse(item.Date)).format('D MMMM')}</Text>}
                            <View style={styles.itemcontainer}>
                                <View style={[styles.stockcircle, {backgroundColor: circlecolour}]}>
                                        <Text style={styles.stockcircletext}>
                                            S
                                            </Text>
                                </View>
                                

                                <View style={styles.holdingitemcontainer}>
                                    <View style={styles.stackbox}>
                                        <Text style={styles.tickertext}>
                                        {item.strategyName}
                                        </Text>
                                        <Text 
                                        style={styles.nametext}
                                        numberOfLines={1}>
                                        {item.strategyDescription}
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
                                                marginRight: 10,
                                                paddingRight: 0,
                                                top: 0,
                                            }}
                                            />
                                        </View>
                                    <View style={styles.stackbox}>
                                        <Text style={[styles.tickertext, styles.valuetext]}>
                                            {formattedStratValue}
                                        </Text>
                                        {/* <Text style={[styles.nametext, styles.percenttext], {color: linecolour }}>
                                         {plusminus}{item.performancePct}%
                                        </Text> */}
                                    </View>
                                </View>
                            </View> 
                                <View style={styles.spacerContainer} />
                            </>

                        );
                        
                    })
                }
                 
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
    itemcontainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        height: 78,
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
    },
    datetext: {
        fontWeight: "600",
        fontSize: 13,
        color: "#8d949d",
        lineHeight:24,
        marginBottom:5,
        marginTop:25
    },
    tickertext: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    valuetext: {
        textAlign: 'right'
    },
    nametext: {
        alignSelf: 'stretch',
        textAlign: 'left',
        marginTop: 5,
        fontSize: 13,
        fontWeight: '400',
        width: 120
    },
    percenttext:{
        textAlign: 'right'
    },
    stackbox: {
        justifyContent: 'space-evenly',
        height:40
    }
});

export default Comparisons;