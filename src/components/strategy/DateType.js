
import React, {useState, useContext} from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider, Datepicker, Layout } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Context as UpdateContext } from '../../context/StrategyUpdateContext';
import moment from 'moment';

const DateType = ({ globalSpecifications, backtestingStart }) => {
  const { state, updateGlobalSpecifications } = useContext(UpdateContext);
    var split = backtestingStart.split('/');
    var convDate = new Date(split[2], split[1] - 1, split[0]);
    var minDate = new Date(2018,0,1,0,0,0,0);
    const [date, setDate] = useState(convDate);
  
    const dateChanged = (newDate) => {
      setDate(newDate);
      let specs = {
        backtestingStart : moment(newDate).format('DD/MM/YYYY'),
        benchmarkName : globalSpecifications.benchmarkName,
        emailUpdatesSetting : globalSpecifications.emailUpdatesSetting,
        updateFrequency : globalSpecifications.updateFrequency
      };
      updateGlobalSpecifications(specs);
    };

  return (
      <>
        <Divider style={styles.longdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Backtesting start date</Text>
            <Datepicker
                date={date}
                onSelect={nextDate => dateChanged(nextDate)}
                min={minDate}
            />
          </View>
      </>
  )};

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