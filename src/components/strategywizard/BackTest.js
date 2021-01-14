import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, } from 'react-native-elements';
import { colors } from '../modules/Colors';
import { fonts } from '../modules/Fonts';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import YellowButton from '../controls/YellowButton'


const BackTest = ({ navigation, options, selected, onSelected }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [benchmark, setBenchmark] = useState(selected.benchmarkName.toUpperCase());
    const [date, setDate] = useState(moment(selected.backtestingStart, 'DD/MM/YYYY'))

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
        onSelected({ date: date.format('DD/MM/YYYY'), benchmark });
    };

    return (
        <>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode='date'
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={date.toDate()}
            />

            <View style={styles.scrollcontainer}>
                <View style={[styles.horizontalTopContainer, { paddingHorizontal: 19 }]}>
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
                            doneButtonText='Done '
                            style={styles.selector}
                            onSelectedStyle={styles.selector}
                            onValueChange={(value) => {
                                setBenchmark(value);
                            }}
                            selected={benchmark}>

                            {options.map((benchmark) => (
                                <SelectPicker.Item label={benchmark.preset} value={benchmark.preset} key={benchmark.id} />
                            ))}

                        </SelectPicker>
                        <View style={styles.rightContainer}>
                            <Text numberOfLines={1} style={styles.titleShow}>Select benchmark</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.yellowbutton}>
                <YellowButton title='Next' onButtonPress={onButtonPress} />
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
        fontSize: 18,
        fontFamily: fonts.GraphikRegular
    },
    selector: {
        width: '60%',
        fontSize: 18,
        fontFamily: fonts.GraphikRegular
    },
    titleShow: {
        // ...Fonts.style(Fonts.type.base, 12, 'normal'),
        color: colors.coolGrey,
        marginRight: 10,
        alignSelf: 'flex-end',
        fontFamily: fonts.GraphikRegular,
        fontSize: 16
    },
    horizontalTopContainer: {
        flexDirection: 'row',
        width: '100%',
        marginTop: (20),
        marginBottom: (1),
    },
    titleStyle: {
        fontSize: 22,
        color: 'black',
        fontFamily: fonts.GraphikBold
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
        flex: 1,
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
    yellowbutton: {
        marginTop: 10
      }
});

export default BackTest;
