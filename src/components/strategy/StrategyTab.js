import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Instructions from './Instructions';
import Holdings from './Holdings';

const StrategyTab = ({ navigation, strategy }) => {
    return (
        <>
            <View style={styles.titlelinkcontainer}>
                <View style={styles.titleiconcontainer}>
                    <Text style={styles.titletext}>
                        Instructions
                </Text>
                    <Icon style={styles.infoicon} size={20} name='info-circle' />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('StrategyInstructions', { item: strategy })}>
                    <View style={styles.titleiconcontainerright}>
                        <Text style={styles.linktext}>
                            See history
                  </Text>
                        <Icon style={styles.infoicon} size={20} name='chevron-right' />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.instructioncontainer}>
                <Instructions actions={strategy?.latestActions?.actions} />
            </View>
            <View style={styles.titleiconcontainer}>
                <Text style={styles.titletext}>
                    Holdings
              </Text>
                <Icon style={styles.infoicon} size={20} name='info-circle' />
            </View>
            <Holdings actions={strategy?.latestActions?.actions} />
        </>
    )
};

const styles = StyleSheet.create({
    titletext: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    titleiconcontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    titleiconcontainerright: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    infoicon: {
        paddingLeft: 7,
        justifyContent: 'center',
        color: '#FFC234',
        alignSelf: 'center'
    },
    linktext: {
        alignSelf: 'stretch',
        textAlign: 'left',
        fontSize: 18,
        fontWeight: '400',
        color: '#FFC234'
    },
    titlelinkcontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 15
    },
});

export default StrategyTab;