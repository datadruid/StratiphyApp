import React, { useEffect, useContext } from 'react';
import { StyleSheet, StatusBar, Image, Text, View, TouchableOpacity, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { Button, } from 'react-native-elements';
import HeaderBack from '../components/strategywizard/HeaderBack';
import { colors } from '../components/modules/Colors';

const StrategyTemplatedScreen = ({ navigation, index }) => {

  onCardPress = () => {
  };

  onNextButtonPress = () => {
  };


  renderCard = (id, image, title, description) => {
  return (
    <TouchableOpacity style={styles.cardInfo} onPress={() => onCardPress(id)}>
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
      <HeaderBack text={''} navigation={navigation} onPress={() => navigation.goBack()} />

      <Text style={styles.paragraph} numberOfLines={3}>{'Your selection'}</Text>
      <View style={styles.horizontalTopContainer}>
        <Text style={styles.titleStyle}> Low Risk Strategy</Text>
      </View>

      <ScrollView>
        <View style={styles.firstCard}>
          {renderCard(0, require('../img/icons/icLowRisk.png'), 'Risk profile', 'Low Risk Strategy')}
        </View>
        {renderCard(1, require('../img/icons/icStar.png'), 'Momentum', 'Long term')}
        {renderCard(2, require('../img/icons/icTinder.png'), 'Value', 'Short term')}
        <Text style={styles.textBottom}>{'Get useful tips and advance your strategy with Stratiphy.'}</Text>

        
      </ScrollView>
      <View style={styles.buttoncontainer}>
          <Button buttonStyle={styles.button}
            onPress={onNextButtonPress}
            titleStyle={styles.buttontitle}
            title='Preview Performance'
            type='solid' />
        </View>
    </View>

  );

};



StrategyTemplatedScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
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
    alignItems: 'center',
    justifyContent: 'center'

  },
  titleStyle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: (-10)

  },
  searchImage: {
    width: (30),
    height: (30)
  },
  infoDescription: {
    color: colors.coolGrey,
    fontSize: 14,
    marginLeft: (5),
    width: '72%'
  },
  discoverImage: {
    width: (330),
    height: (40),
  },
  leftTopContainer: {

    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',

  },
  rightTopContainer: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'center',

  },
  infoImage: {
    margin: (5),
    height: (18),
    width: (18)
  },
  paragraph: {

    marginHorizontal: (20)
  },
  tipLeftContainer: { width: '20%', height: '100%' },
  tipImage: {

    height: (45),
    height: (45),
    alignSelf: 'center',
    marginTop: (20)
  },
  icMiddleContainer: {

  },
  rightContainerTip: { width: '20%', height: '100%' },
  icCrossImage: {

    height: (15),
    width: (15),
    alignSelf: 'flex-end',
    margin: (12)
  },
  infoDescription: {
    color: 'black',
    fontSize: 20,
    marginTop: (10),
    marginLeft: (5),
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
    fontSize: 20,
    color: 'black',
    alignSelf: 'center'
  },
  nextBtn: {
    backgroundColor: colors.yellowTheme,
    height: (50),
    borderRadius: 10
  },
  nextBtnText: {
    fontSize: 18
  },
  firstCard: {
    marginTop: (30)
  },
  textBottom: {

    textAlign: 'center',
    color: colors.coolGrey,
    marginBottom: (10),
    marginHorizontal: (50),
    fontSize: 16,
    color: 'black'
  },
  horizontalView: {

    flexDirection: 'row',
    alignItems: 'center',
    marginTop: (5)
  },
  buttoncontainer: {
    marginHorizontal: 20,
    marginBottom: 30
  },
  button: {
    backgroundColor: colors.yellowTheme,
    borderRadius: 12,
height:60
  },
  buttontitle: {
    fontWeight: 'bold'
  },
});

export default StrategyTemplatedScreen;
