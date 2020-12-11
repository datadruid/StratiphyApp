import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Comparisons from './Comparisons';

const AnalysisTab = ({ navigation, strategy }) => {
  const buttons = ['Ratio', 'Yields', 'P&L', 'Volatility', 'VAR']
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <View style={styles.titlelinkcontainer}>
        <View style={styles.titleiconcontainer}>
          <Text style={styles.titletext}>
            Comparison
                </Text>
          <Icon style={styles.infoicon} size={20} name='info-circle' />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('StrategyCompare', { item: strategy })}>
          <View style={styles.titleiconcontainerright}>
            <Text style={styles.linktext}>
              Compare
                  </Text>
            <Icon style={styles.infoicon} size={20} name='chevron-right' />
          </View>
        </TouchableOpacity>
      </View>
      <ButtonGroup
        onPress={setSelectedIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={styles.buttongroupcontainer}
        selectedButtonStyle={styles.selectedbuttonstyle}
        selectedTextStyle={styles.selectedbuttonstyle}
        innerBorderStyle={styles.innerborderstyle}
        textStyle={styles.textstyle}
      />
              <View style={styles.comparisoncontainer}>
                <Comparisons strategy={strategy} />
            </View>
    </>
  )
};

const styles = StyleSheet.create({
  titletext: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  comparisoncontainer: {
marginTop: 19
  },
  buttongroupcontainer :{
    height: 36,
    borderColor:'transparent',
    backgroundColor:'transparent',
  },
  selectedbuttonstyle :{
    backgroundColor:'white',
    color:'black',
    fontSize: 14,
    fontWeight: 'bold',
    borderRadius:10
  },
  innerborderstyle:{
    color:'transparent'
  },
  textstyle: {
    color:'#8D949D',
    fontSize: 14,
    fontWeight: '400',
    borderRadius:10
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

export default AnalysisTab;