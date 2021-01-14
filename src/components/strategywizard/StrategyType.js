import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../modules/Colors';
import { fonts } from '../modules/Fonts';
import YellowButton from '../controls/YellowButton';

const StrategyType = ({ navigation, selected, onSelected, nextPage }) => {

    const typeSelected = (strategyType) => {
        onSelected(strategyType);
    };

    const onButtonPress = () => {
        if (selected?.filter(x => x.setting !== 'none').length > 0) {
            nextPage();
        } else {
            Alert.alert('Strategy type', 'you need to select a strategy type');
        }
    };

    renderItem = ({ item }) => {
        let border = {};
        if (item.id > -1) {
            if (selected?.filter(x => x.setting !== 'none').map(x => x.typeName).includes(item.key)) {
                border = styles.cardInfoSelected;
            }
            return (
                <TouchableOpacity onPress={() => typeSelected({ strategyType: item.key })}>
                    <View style={[styles.listItem, { backgroundColor: item.backgroundColor }, border]}>
                        <View style={styles.titleTop}>
                            <View style={styles.leftContainer} >
                            </View>
                            <View style={styles.midlleContainer} >
                                <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
                                <Text numberOfLines={4} style={styles.description}>{item.short_desc}</Text>
                            </View>
                            <View style={styles.rightContainer}>
                                {/* <TouchableOpacity style={styles.pressStyle} onPress={() => typeInfo()}>
                  <FontAwesome style={styles.infoicon} size={20} name='info-circle' />
                </TouchableOpacity> */}
                            </View>
                        </View>
                        <View style={[{ width: '104%', height: '80%', left: -7 }, item.offset]} >
                            <Image source={item.backgroundImage} style={styles.bottomImage} />
                        </View >
                    </View >
                </TouchableOpacity>
            )
        }
        else {
            return (
                <View style={styles.cardInfo}>
                    <View style={styles.tipContainer}>
                        <View style={styles.tipLeftContainer} >
                            <Image source={require('../../img/icons/icEyeCircle.png')} resizeMode='contain' style={styles.tipImage} />
                        </View>
                        <View style={styles.icMiddleContainer} >
                            <Text style={styles.infoTitle}> Not sure what to do?</Text>
                            <Text style={styles.infoDescription}>Try a momentum strategy to get
                            to grips with using Stratiphy.
                  </Text>
                        </View>
                    </View>
                </View>
            )
        }
    }

    return (
        <>
            <View style={styles.horizontalTopContainer}>
                <Text style={styles.titleStyle}>Choose strategy type</Text>
                <FontAwesome style={styles.infoicontop} size={20} name='info-circle' />
            </View>
            <View style={styles.secondContainer}>
                <Text style={styles.paragraph} numberOfLines={3}>{'Choose what type of strategy to build.'}</Text>
                <FlatList
                    style={styles.listContainer}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.id.toString()}
                    contentContainerStyle={{ flexGrow: 1 }}
                    ListFooterComponentStyle={{ flex: 1, justifyContent: 'flex-end' }}
                />
            </View>

            <View style={styles.yellowbutton}>
                <YellowButton title='Next' onButtonPress={onButtonPress} />
            </View>

        </>
    )
};

const styles = StyleSheet.create({
    infoDescription: {
        color: 'black',
        fontSize: 14,
        marginLeft: (5),
        fontFamily: fonts.GraphikRegular
    },
    infoicon: {
        color: colors.white,
        alignSelf: 'flex-start',
        marginRight: 5,
        marginTop: -10
    },
    cardInfoSelected: {
        borderWidth: 3,
        borderColor: colors.yellowTheme,
    },
    horizontalTopContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: (10),
        marginBottom: 5,
        alignItems: 'center'
    },
    infoicontop: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 15,
        color: colors.yellowTheme,
        alignSelf: 'center'
    },
    titleStyle: {
        marginStart: 10,
        marginTop: 15,
        fontSize: 22,
        color: 'black',
        fontFamily: fonts.GraphikBold
    },
    secondContainer: {
        flex: 1,
        backgroundColor: colors.white,
        width: '100%',
        marginTop: (10)
    },
    cardInfo: {
        width: '90%',
        height: 97,
        alignSelf: 'center',
        backgroundColor: colors.white,
        borderRadius: 12,
        marginTop: (20)
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: (5),
        fontFamily: fonts.GraphikSemibold
    },
    listItem: {
        height: (220),
        width: '90%',
        backgroundColor: colors.white,
        borderRadius: 12,
        marginTop: (10),
        alignSelf: 'center'
    },
    bottomImage: {
        flex: 1,
        width: '100.1%',
        height: '100%',
        resizeMode: 'contain',
        top: -55
    },
    titleTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: (19)
    },
    leftContainer: {
        flex: 1, flexDirection: 'row', height: 50,
        marginBottom: (20),
        width: '30%',
    },
    midlleContainer: {
        width: '65%',
        textAlign: 'center',
        alignSelf: 'center',
        marginBottom: (10),
    },
    rightContainer: {
        flex: 1, flexDirection: 'row', height: 50,
        justifyContent: 'flex-end', paddingEnd: (0),
        marginTop: (-5),
        width: '10%',
    },
    tipLeftContainer: { width: '20%', height: '100%' },
    tipImage: {
        height: (45),
        height: (45),
        alignSelf: 'center',
        marginTop: (20)
    },
    icMiddleContainer: {
        width: '60%', height: '100%',
        justifyContent: 'center'
    },
    bottomView: {
        flex: 1,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: (13),
        marginTop: (-30)
    },
    cardTitle: {
        textAlign: 'center',
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: (10),
    },
    description: {
        color: 'white',
        fontSize: 13,
        marginTop: 10,
        textAlign: 'center',
    },
    pressStyle: {
        padding: 10
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        backgroundColor: 'red',
        borderColor: '#fff',
        borderWidth: 1,
        alignSelf: 'flex-end'
    },
    paragraph: {
        marginHorizontal: (20),
        fontSize: 18,
        color: 'black',
        fontFamily: fonts.GraphikRegular
    },
    tipContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.paleGrey,
        borderRadius: 12,
        marginBottom: 5
    },
    yellowbutton: {
        marginTop: 10,
    }
});

const data = [
    {
        id: -1,
    },
    {
        id: 0,
        title: 'Momentum',
        key: 'momentum',
        short_desc: 'Invest in assets whose prices have risen the most, and sell those that have fallen the most.',
        backgroundImage: require('../../img/strategytypes/icMomentumChart.png'),
        backgroundColor: colors.lightishBlue,
        selected: false,
        offset: { top: 0 }
    },
    {
        id: 1,
        title: 'Value',
        key: 'relativeValueIndicator',
        short_desc: 'Invest in assets that are most undervalued,and sell those that are most overvalued.',
        backgroundImage: require('../../img/strategytypes/icMomentumValue.png'),
        backgroundColor: colors.lightPurple,
        selected: false,
        top: { top: 0 }
    },
    {
        id: 2,
        title: 'Strength',
        key: 'relativeStrengthIndicator',
        short_desc: 'Invest in assets that are oversold, and sell assets that are overbought.,',
        backgroundImage: require('../../img/strategytypes/icStreghtChart.png'),
        backgroundColor: colors.blue,
        selected: false,
        offset: { top: 25 }
    },
    {
        id: 3,
        title: 'Liquidity',
        key: 'onBalancedVolume',
        short_desc: 'Invest in assets whose traded volume rises before its price does, and sell those whose traded volume falls before its price does.',
        backgroundImage: require('../../img/strategytypes/icStrenght2.png'),
        backgroundColor: '#8609ca',
        selected: false,
        offset: { top: -15 }
    },
]

export default StrategyType;
