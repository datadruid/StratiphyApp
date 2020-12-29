import React, {useState} from 'react';
import { Dimensions } from 'react-native'
import { StatusBar, View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Button, } from 'react-native-elements';
import HeaderBack from '../components/strategywizard/HeaderBack';
import * as Progress from 'react-native-progress';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../components/modules/Colors';

const windowWidth = Dimensions.get('window').width;
const StrategyCreateScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  const onNextButtonPress = () => {
    if(index === 3) {
      navigation.navigate('StrategyWizard', {stage: 'strategyType'});
    } else {
      let id = index;
      navigation.navigate('StrategyTemplated', {index: id});
    }
  }

  onRiskCardPress = (id) => {
    console.log('button pressed');
    setIndex(id);
  }

  console.log(index);
  const renderCard = (id, image, title, description) => {
    let selectedStyle = {};
    if(id == index)
    {
      selectedStyle = styles.selectedcardinfo;
    }
    return (
    <TouchableOpacity style={[styles.cardInfo, selectedStyle]} onPress={() => onRiskCardPress(id)}>
      <View style={styles.cardItems}>
        <View style={styles.tipLeftContainer} >
          <Image source={image} resizeMode='contain' style={styles.tipImage} />
        </View>
        <View style={styles.icMiddleContainer} >
          <Text style={styles.infoTitle}> {title}</Text>
          <Text style={styles.infoDescription}>{description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    )};

  return (
    <View style={styles.mainContainer}>
      {Platform.OS === 'ios' ? <StatusBar translucent barStyle="dark-content" /> :
        <StatusBar backgroundColor="white" barStyle="dark-content" />
      }
      <View style={{ height: 88 }}>
        {/* <HeaderBack text={'1/7'} navigation={navigation} /> */}
      </View>
      <View style={styles.progressContainer}>
        <Progress.Bar progress={0} width={windowWidth - (40)} color={colors.yellowTheme} unfilledColor={colors.silver} borderWidth={0} />
      </View>
      <View style={styles.horizontalTopContainer}>
        <Text style={styles.titleStyle}> Choose your Strategies</Text>
        <FontAwesome style={styles.infoicon} size={20} name='info-circle' />
      </View>
      <Text style={styles.paragraph} numberOfLines={3}>{'Choose a template based strategy based on rist appetite or create a custom stragedy from scratch'}</Text>
      <ScrollView>
        <View style={styles.firstCard}>
          {renderCard(0, require('../img/icons/icLowRisk.png'), 'Low Risk', 'Low risk staregdy are safer but lesser return')}
        </View>
        {renderCard(1, require('../img/icons/icStar.png'), 'Medium Risk', 'Medium stragedies include a mixxed risk/return profile')}
        {renderCard(2, require('../img/icons/icTinder.png'), 'High Risk', 'Potentially high returns but with high risk')}
        <Text style={styles.orText}>{'OR'}</Text>
        {renderCard(3, require('../img/icons/icPlayGreen.png'), 'Build Your Own', 'create your own stargedy using stragedy builder')}
        <View style={styles.buttoncontainer}>
          <Button buttonStyle={styles.button}
            onPress={onNextButtonPress}
            titleStyle={styles.buttontitle}
            title='Next'
            type='solid' />
        </View>
      </ScrollView>
    </View>
  );
};

StrategyCreateScreen.navigationOptions = {
  header: () => false,
  title: 'New Strategy',
  tabBarIcon: <FontAwesome name="plus-circle" size={28} />
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white
  },
  infoicon: {
    paddingLeft: 10,
    justifyContent: 'center',
    color: colors.yellowTheme,
    alignSelf: 'center'
  },
  progressContainer: {
    marginTop: (10),
    alignSelf: 'center',
    height: 10,

  },
  horizontalTopContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: (19),
    marginTop: (20),
    marginBottom: (1),
    alignItems: 'center'

  },
  titleStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',

  },
  tipLeftContainer: { width: '20%', height: '100%' },
  tipImage: {

    height: (45),
    height: (45),
    alignSelf: 'center',
    marginTop: (20)
  },
  infoDescription: {
    color: colors.coolGrey,
    fontSize: 14,
    marginLeft: (5),
    width: '72%'
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: (5),
    marginTop: (11)
  },
  cardInfo: {
    width: '90%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: (120),
    alignSelf: 'center',
    backgroundColor: colors.paleGrey,
    borderRadius: 12,
    marginBottom: 15,
  },
  selectedcardinfo:{
    borderWidth: 2,
    borderColor: colors.yellowTheme
  },
  cardItems: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
    height: 100,
    borderRadius: 12,
  },
  paragraph: {

    marginHorizontal: (22),
    fontSize: 16,
    color: 'black'
  },
  firstCard: {


    marginTop: (30)
  },
  orText: {
    textAlign: 'center',
    color: colors.coolGrey,
    marginBottom: (10)
  },
  buttoncontainer: {
    marginHorizontal: 20
  },
  button: {
    backgroundColor: colors.yellowTheme,
    borderRadius: 12,

  },
  buttontitle: {
    fontWeight: 'bold'
  },
});

export default StrategyCreateScreen;
