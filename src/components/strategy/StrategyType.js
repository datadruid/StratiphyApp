import React, {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider, List, Layout } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const StrategyType = ({ strategyTypeSelection }) => {

  const renderItem = (strategyType) => (
    <Layout style={styles.settingcontainer}>
      
      <Text style={styles.settingtext} category='p1' status='default'>{strategyType.item.text}</Text>
      <Icon style={styles.icon} size={20} name='minus' />
    </Layout>
  );
  return (
      <>
    <View style={styles.settingheadercontainer}>
        <Text style={styles.settingtitletext} category='h6' status='default'>{strategyTypeSelection?.title}</Text>
        <Icon style={styles.icon} size={18} name='info-circle' />
    </View>
    <Divider style={styles.longdivider} />
    
    <List
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={strategyTypeSelection?.values}
          renderItem={renderItem}
        />
     <Layout style={styles.settingcontainer}>  
      <Text style={styles.settingtext} category='p1' status='default'></Text>
      <Icon style={styles.icon} size={20} name='plus' />
      </Layout>
    <Divider style={styles.longdivider} />
  </>
  );
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

export default StrategyType;