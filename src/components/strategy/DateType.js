
import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Context as UpdateContext } from '../../context/StrategyUpdateContext';
import moment from 'moment';

const DateType = ({ globalSpecifications, backtestingStart }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { state, updateGlobalSpecifications } = useContext(UpdateContext);
  var split = backtestingStart.split('/');
  var convDate = new Date(split[2], split[1] - 1, split[0]);
  var minDate = new Date(2018, 0, 1, 0, 0, 0, 0);
  const [date, setDate] = useState(moment(convDate));

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

  const dateChanged = (newDate) => {
    setDate(newDate);
    let specs = {
      backtestingStart: moment(newDate).format('DD/MM/YYYY'),
      benchmarkName: globalSpecifications.benchmarkName,
      emailUpdatesSetting: globalSpecifications.emailUpdatesSetting,
      updateFrequency: globalSpecifications.updateFrequency
    };
    updateGlobalSpecifications(specs);
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
      <Divider style={styles.longdivider} />
      <View style={styles.settingcontainer}>
        <Text style={styles.settingtext} category='p1' status='default'>Backtesting start date</Text>
        <TouchableOpacity style={styles.datepickercontainer} onPress={showDatePicker}>
                                <Text
                                    onPress={showDatePicker}
                                    style={styles.datepicker}
                                >{date.format('DD/MM/YYYY')}</Text>
                            </TouchableOpacity>
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  settingcontainer: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  settingheadercontainer: {
    flex: 1,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  datepickercontainer: {
      marginTop: 8
  },
  settingtext: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  settingtitletext: {
    textAlignVertical: "center",
    paddingLeft: 15
  },
  longdivider: {
    borderBottomColor: 'lightgrey',
    marginTop: 5,
    marginBottom: 5
  },
  shortdivider: {
    borderBottomColor: 'lightgrey',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20
  },
  spacer: {
    margin: 10
  },
  icon: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
});

export default DateType;