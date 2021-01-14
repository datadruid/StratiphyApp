import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import { Context as StrategyContext } from '../../context/StrategyContext';
import AIcon from 'react-native-vector-icons/dist/FontAwesome';
import MIcon from 'react-native-vector-icons/dist/MaterialIcons';
import PreviewLineChart from './PreviewLineChart';
import {getDateFilterButtonLabels} from '../modules/UiHelper';
import { colors } from '../modules/Colors'
import { fonts } from '../modules/Fonts';

const mastercolour = '#4CD697';
let linecolour = '#FFFFFF';

const Preview = ({ strategy, saveStrategy, closeWindow }) => {
    const [index, setIndex] = useState(2);
    let stratPercent = 0;

    const buttons = getDateFilterButtonLabels();
    const { state, clearErrorMessage } = useContext(StrategyContext);

    if(state.previewData.length > 0)
    {
        const currentData = state.previewData.find(x=> x.index === index).data;
        if(currentData)
        {
            let diff = currentData[currentData.length-1].value - currentData[0].value
            stratPercent = (diff/currentData[0].value*100).toFixed(2);
        }
    }

    let plusminus = '';
    if (stratPercent > 0) {
        plusminus = '+';
    }
    return (
        <ScrollView>
        <View style={styles.overlaycontent}>
            <View style={styles.content}>
                <View style={styles.iconcontainer}>
                    <TouchableOpacity onPress={() => closeWindow()}>
                        <AIcon style={styles.icon} size={40} name='long-arrow-left' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => closeWindow()}>
                        <MIcon style={styles.icon} size={40} name='close' />
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>{strategy.strategyName}</Text>
                </View>
                <View style={styles.chartcontent}>
                    <PreviewLineChart mastercolour={mastercolour} datasets={[state.previewData]} index={index} linecolour={linecolour} />
                </View>
                <View style={styles.content}>
                    <ButtonGroup
                        onPress={index => setIndex(index)}
                        selectedIndex={index}
                        buttons={buttons}
                        containerStyle={styles.buttongroupcontainer}
                        selectedButtonStyle={styles.selectedbuttonstyle}
                        selectedTextStyle={styles.selectedbuttonstyle}
                        innerBorderStyle={styles.innerborderstyle}
                        textStyle={styles.textstyle}
                    />
                </View>
                <View style={styles.content}>
                    <View style={styles.keycontainer}>
                        <View style={styles.keyitem}>
                            <MIcon style={{color: '#4DF3A7'}} size={15} name='stop-circle' />
                            <Text style={styles.keytext}>Buy</Text>
                        </View>
                        <View style={styles.keyitem}>
                            <MIcon style={{color: 'black'}} size={15} name='stop-circle' />
                            <Text style={styles.keytext}>Sell</Text>
                        </View>
                        <View style={styles.keyitem}>
                            <MIcon style={{color: '#3B87FA'}} size={15} name='stop-circle' />
                            <Text style={styles.keytext}>Benchmark </Text>
                        </View>
                        <View style={styles.keyitem}>
                            <MIcon style={{color: 'white'}} size={15} name='stop-circle' />
                            <Text style={styles.keytext}>Strategy</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.summarycontainer}>
                        <View>
                            <Text style={styles.percent}>{plusminus}{stratPercent}%</Text>
                            <Text style={styles.subtitle}>Strategy</Text>
                            <Text style={styles.subtitle}>Perfromance</Text>
                        </View>
                        <View >
                            <Text style={[{alignSelf: 'flex-end'}, styles.percent]}>+3.5%</Text>
                            <Text style={[{alignSelf: 'flex-end'}, styles.subtitle]}>Benchmark</Text>
                            <Text style={[{alignSelf: 'flex-end'}, styles.subtitle]}>Performance</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttoncontainer}>
                    <Button buttonStyle={styles.whitebutton}
                        onPress={saveStrategy}
                        titleStyle={styles.whitebuttontitle}
                        title='Proceed with strategy'
                        type='solid' />
                </View>
            </View>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    overlaycontent: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#4CD697',
        margin: 0,
        padding: 0,
        height: '100%',
    },
    buttongroupcontainer : {
        top: -15,
        height: 36,
        borderColor:'transparent',
        backgroundColor:'transparent',
      },
      selectedbuttonstyle :{
        backgroundColor:'transparent',
        color:'white',
        opacity:1,
        fontSize: 14,
        fontFamily: fonts.GraphikBold,
        borderRadius:10
      },
      innerborderstyle:{
        color:'transparent'
      },
      textstyle: {
        color:'white',
        opacity: 0.4,
        fontSize: 14,
        fontFamily: fonts.GraphikRegular,
        borderRadius:10
      },
    content: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    chartcontent:{
        flexDirection: 'column',
        marginBottom: 30,
        height: 250
    },
    title: {
        fontSize: 26,
        fontFamily: fonts.GraphikBold,
        color: 'white',
        marginLeft:20
    },
    keytext:{
        fontSize: 12,
        color: 'white',
        fontFamily: fonts.GraphikRegular,
        marginLeft:5,
        textAlignVertical : 'center'
    },
    button: {
        backgroundColor: '#FFC234',
        borderRadius: 12,
        margin: 5
    },
    whitebutton: {
        backgroundColor: 'white',
        borderRadius: 12,
        margin: 5
    },
    buttontitle: {
        marginHorizontal: 20,
        fontWeight: 'bold'
    },
    whitebuttontitle: {
        marginHorizontal: 20,
        color: '#FFC234',
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: fonts.InterExtraBold,
    },
    buttoncontainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20
    },
    iconcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 30,
        height: 35
    },
    icon: {
        color: 'white'
    },
    keycontainer:{

        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 20,
    },
    keyitem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        
    },
    summarycontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    percent: {
        fontSize: 22,
        fontFamily: fonts.GraphikSemibold,
        color: 'white',
        marginBottom: 3,
    },
    subtitle: {
        fontSize:16,
        color: 'white',
        fontFamily: fonts.GraphikRegular,
    }
});

export default Preview;