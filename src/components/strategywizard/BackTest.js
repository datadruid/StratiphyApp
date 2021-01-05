import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, } from 'react-native-elements';
import { colors } from '../modules/Colors';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';


const BackTest = ({ navigation, onSelected }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [benchmark, setBenchmark] = useState('FTSE100');
    const [date, setDate] = useState(moment())

    const options = ['FTSE100', 'DJIA', 'NASDAQ Composite'];

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        let newDate = moment(date);
        if (newDate > moment())
            newDate = moment();
        if (newDate < moment().subtract(5, 'years'))
            newDate = moment().subtract(5, 'years');
        setDate(newDate);
        hideDatePicker();
    };

    const onButtonPress = () => {
        onSelected({ date, benchmark, });
    };

    return (
        <>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode='date'
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

                <View style={styles.scrollcontainer}>
                    <View style={styles.horizontalTopContainer}>
                        <Text style={styles.titleStyle}>{'How far back should we test this strategy?'}</Text>
                    </View>


                    <View style={styles.formContainer}>
                        <View style={[styles.mainView, styles.input]}>
                            <TouchableOpacity style={styles.datepickercontainer} onPress={showDatePicker}>
                                <Text
                                    onPress={showDatePicker}
                                    style={styles.datepicker}
                                >{date.format('DD/MM/YYYY')}</Text>
                            </TouchableOpacity>
                            <View style={styles.rightContainer}>
                                <Text numberOfLines={1} style={styles.titleShow}>Select date</Text>
                            </View>
                        </View>

                        <View style={styles.horizontalTopContainer}>
                            <Text style={styles.titleStyle}>{'Choose a benchmark:'}</Text>
                        </View>
                        <View style={[styles.mainView, styles.input]}>
                            <SelectPicker
                                style={styles.selector}
                                onValueChange={(value) => {
                                    setBenchmark(value);
                                }}
                                selected={benchmark}>

                                {Object.values(options).map((val, index) => (
                                    <SelectPicker.Item label={val} value={val} key={index} />
                                ))}

                            </SelectPicker>
                            <View style={styles.rightContainer}>
                                <Text numberOfLines={1} style={styles.titleShow}>Select benchmark</Text>
                            </View>
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
    datepickercontainer: {
        marginLeft: 10,
        width: '50%',
    },
    datepicker: {
        width: '50%',
        fontSize: 16
    },
    selector: {
        width: '60%',
        fontSize: 18
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
        flex:1,
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
