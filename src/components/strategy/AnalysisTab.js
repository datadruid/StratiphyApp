import React, { useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Context as StrategyContext } from '../../context/StrategyContext';
import Comparisons from './Comparisons';
import ComparisonTicker from './ComparisonTicker';
import {getComparisonButtonLabels} from '../modules/UiHelper'
import { colors } from '../modules/Colors';
import { fonts } from '../modules/Fonts';

const AnalysisTab = ({ navigation, strategy }) => {
  const buttons = getComparisonButtonLabels();
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
                <Comparisons navigation={navigation} strategy={strategy} selectedIndex={selectedIndex}/>
                <ComparisonTicker navigation={navigation} selectedIndex={selectedIndex}/>   
            </View>
    </>
  )
};

const styles = StyleSheet.create({
  titletext: {
    fontSize: 20,
    fontFamily: fonts.GraphikSemibold
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
    fontFamily: fonts.GraphikBold,
    borderRadius:10
  },
  innerborderstyle:{
    color:'transparent'
  },
  textstyle: {
    color:'#8D949D',
    fontSize: 14,
    fontFamily: fonts.GraphikRegular,
    borderRadius:10
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
    color: colors.yellowTheme,
    alignSelf: 'center'
  },
  linktext: {
    width: 120,
    textAlign:'right',
    fontSize: 18,
    fontFamily: fonts.GraphikRegular,
    color: colors.yellowTheme,
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
    paddingBottom: 15
  },
});

export default AnalysisTab;