import React, {useEffect, useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as StrategyContext } from '../../context/StrategyContext';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Instructions from './Instructions';
import Holdings from './Holdings';

const StrategyTab = ({ navigation, strategy }) => {
    const { state, getTickerData, clearErrorMessage } = useContext(StrategyContext);

    const renderHoldings = (actions, id) => {
        if(actions)
        {
            return (
                <>
                <View style={styles.titleiconcontainer}>
                <Text style={styles.titletext}>
                    Holdings
              </Text>
                <Icon style={styles.infoicon} size={20} name='info-circle' />
                </View>
                <Holdings actions={actions} id={id} />
                </>
            )
        }
    };

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
            {
                renderHoldings(strategy?.latestActions?.actions, strategy._id)
            }
            
        </>
    )
};

const styles = StyleSheet.create({
    titletext: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    titleiconcontainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    titleiconcontainerright: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    infoicon: {
        marginLeft: 7,
        justifyContent: 'center',
        color: '#FFC234',
        alignSelf: 'center'
    },
    linktext: {
        width: 120,
        textAlign:'right',
        fontSize: 18,
        fontWeight: '400',
        color: '#FFC234',
    },
    titleiconcontainerright:{
        width: 150,
        flexDirection: 'row',
        justifyContent: 'flex-end'
      },
    titlelinkcontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 15,
    },
});

export default StrategyTab;