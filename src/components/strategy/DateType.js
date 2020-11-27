
import React, {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider, Datepicker, Layout } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const DateType = ({ backtestingStart }) => {
    const [date, setDate] = React.useState();
    
    if(backtestingStart?.selectedValue && !date)
    {
        setDate(Date.parse(backtestingStart?.selectedValue));
    }


  return (
      <>
        <Divider style={styles.longdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Backtesting start date</Text>
            <Datepicker
                date={date}
                onSelect={nextDate => setDate(nextDate)}
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