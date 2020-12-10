import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as StrategyContext } from '../../context/StrategyContext';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { LineChart } from 'react-native-chart-kit';

const getRandomColor = () =>
{
    return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
}

const Holdings = ({ actions }) => {
    let counter = 0;
    if (actions?.some(x => x.Action !== 'Hold')) {
        
        return (
            <View style={styles.holdingcontainer}>
                {
                    actions.filter(x => x.Action === 'Hold').map(item => {
                        let circlecolour = getRandomColor();
                        let linecolour = 'rgb(227, 63, 100)';
                        let plusminus = '-'
                        if (item.unitsClose > 0) {
                            linecolour = 'rgb(74, 250, 154)';
                            plusminus = '+';
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
                                                    data: [2985, 3160.073363342285, 3213.4247229003904, 2860.9927426147465, 3152.9944961547853, 3506.5469216918946, 3169.336406555176, 3067.3385836791995, 2970.0573703002933, 2989.139597473145, 3131.300736999512, 3123.4956118774417, 3169.7963082885744, 3194.631896057129, 3243.841481018067, 3386.4393008422853, 3457.8030838012696, 3670.1644210815434, 3634.4453805542, 3512.319386291504, 3353.412546081544, 3299.222477722169, 3043.5619229125987, 3182.1236074829108, 3142.7431729125983, 3252.773164978028, 3187.5461239624033, 3282.249299011231, 3264.11265411377, 3316.3125637817393, 3415.2106430053714, 3332.944515075684, 3334.2068936157234, 3341.0583297729495, 3277.8452847290055, 3299.922761535645, 3238.115545959473, 3130.0393203735357, 3113.1437991333023, 3218.9230075073256, 3195.732818908692, 3192.5595413208016, 2999.890897827149, 2980.7729760742195, 3049.3317712402354, 3072.9391906738288, 3037.977719192506, 2984.0631207275405, 2983.215428237916, 2942.390960464478, 2907.196734695435, 3108.9606633758553, 3071.8629875946053, 3077.0623593902596, 3036.0278199005134, 3071.5696031951916, 2994.0390219879164, 2389.331573867799, 2075.381069412232, 2252.825092391969, 2515.1227892303477, 2642.4844191741954, 2932.548213729859, 3365.2698662567145, 2971.767374038697, 3111.0648740386973, 3102.9948740386967, 3158.577374038697, 3336.4173740386977, 3669.694874038697, 3521.3973740386973, 4007.8393740386973, 3865.151874038697, 3576.2983740386976, 2596.349074038698, 3014.5809740386976, 3003.7751740386975],
                                                    color: () => linecolour
                                                    , strokeWidth: "2"
                                                }
                                                ]
                                            }}
                                            fromZero={false}
                                            drawBorders={false}
                                            withDots={false}
                                            withShadow={false}
                                            withOuterLines={false}
                                            withInnerLines={false}
                                            withHorizontalLabels={false}
                                            width={64.5} // from react-native
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
                                        {item.unitsClose}
                                        </Text>
                                        <Text style={[styles.nametext, styles.percenttext], {color: linecolour }}>
                                         {plusminus}{item.unitsClose}%
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
        fontWeight: '600',
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
        textAlign: 'right'
    }
});

export default Holdings;