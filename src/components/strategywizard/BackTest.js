import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, } from 'react-native-elements';
import { colors } from '../modules/Colors';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';


const BackTest = ({ navigation, onSelected }) => {
    const [benchmark, setBenchmark] = useState('java');
    const [date, setDate] = useState(moment())

    const onButtonPress = () => {
        onSelected({ amounts: { startingAmount, monthlyAmount } });
    };

    return (
        <>
            <View style={styles.horizontalTopContainer}>
                <Text style={styles.titleStyle}>{'How far back should we test this strategy?'}</Text>
            </View>
            <KeyboardAwareScrollView >
                <View style={styles.scrollcontainer}>
                    <View style={styles.formContainer}>
                        <View style={[styles.mainView, styles.input]}>
                            <DatePicker
                                useNativeDriver= {true}
                                date={date}
                                onDateChange={setDate}
                                mode='date'
                                showIcon={false}
                                confirmBtnText='confirm'
                                cancelBtnText='cancel'
                                maxDate={moment()}
                                minDate={moment().subtract(5, 'years')}
                                format="DD-MM-YYYY"
                                style={styles.datepicker}
                                customStyles={{
                                    dateInput: {
                                      borderWidth:0,
                                      alignSelf: 'flex-start',
                                      textAlign: 'left'
                                    }
                                  }}
                            />
                            <View style={styles.rightContainer}>
                                <Text numberOfLines={1} style={styles.titleShow}>Select date</Text>
                            </View>
                        </View>

                        <View style={styles.horizontalTopContainer}>
                            <Text style={styles.titleStyle}>{'Choose a benchmark:'}</Text>
                        </View>
                        <View style={[styles.mainView, styles.input]}>
                            <Picker
                            useNativeDriver= {true}
                                selectedValue={benchmark}
                                style={{height: 50, width: '50%', backgroundColor: 'red'}}
                                // onValueChange={(itemValue, itemIndex) =>
                                //     setBenchmark(itemValue)
                                // }
                                >
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                            </Picker>
                            <View style={styles.rightContainer}>
                                <Text numberOfLines={1} style={styles.titleShow}>Select benchmark</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.buttoncontainer}>
                        <Button buttonStyle={styles.button}
                            onPress={onButtonPress}
                            titleStyle={styles.buttontitle}
                            title='Next'
                            type='solid' />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.paleGreyTwo,
        width: '100%',
        borderRadius: 8,
        marginTop: (10),
        alignItems: 'center',
        textAlign: 'left',
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginVertical: 15,
    },
    selector: {
        backgroundColor: 'red'
    },
    titleShow: {
        // ...Fonts.style(Fonts.type.base, 12, 'normal'),
        color: colors.coolGrey,
        marginRight: 10,
        alignSelf: 'flex-end',
      },
    horizontalTopContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: (19),
        marginTop: (20),
        marginBottom: (1),
    },
    titleStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
    },
    searchImage: {
        width: (30),
        height: (30)
    },
    infoDescription: {
        color: colors.coolGrey,
        fontSize: 14,
        marginLeft: (5)
    },
    discoverImage: {
        width: (330),
        height: (40),
    },
    formContainer: {
        width: '90%',
        marginHorizontal: (20),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: (20),
    },
    scrollcontainer: {
        height: 300,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    placeholderStyle: {
        color: colors.jeshText
    },
    input: {
        height: null,
        width: '100%',
        overflow: 'hidden',
        borderColor: colors.coolGrey
    },
    description: {
        color: 'white',
        width: '110%',
        fontSize: 13, marginTop: 10

    },
    buttoncontainer: {
        marginHorizontal: 20,
        marginBottom: 30
    },
    button: {
        backgroundColor: colors.yellowTheme,
        borderRadius: 12,
        height: 60
    },
    buttontitle: {
        fontWeight: 'bold'
    },
});

export default BackTest;
