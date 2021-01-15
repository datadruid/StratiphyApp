import React, { useState, useContext, useEffect } from 'react';
import { Dimensions } from 'react-native'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Context as UpdateContext } from '../context/StrategyUpdateContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from '../components/modules/Colors';
import Toast from 'react-native-simple-toast';

const windowWidth = Dimensions.get('window').width;
const StrategyCreateScreen = ({ navigation }) => {
  const { state, getStrategyTemplate } = useContext(UpdateContext);
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const onNextButtonPress = async (id, title) => {
    setSpinnerVisible(true);
    let timer = setTimeout(() => {
      Toast.showWithGravity('The create process took too long, please try again.', Toast.LONG, Toast.TOP);
      setSpinnerVisible(false);
    }, 10000);
    await getStrategyTemplate(id);
    clearTimeout(timer);
    setSpinnerVisible(false);
    if (id === 0) {
      navigation.navigate('StrategyWizard', { pageNo: 1, showtotal: true });
    } else {
      navigation.navigate('StrategyWizard', { pageNo: 7, showtotal: false, title: title });
    }
  };

  const renderCard = (id, image, title, description) => {

    return (
      <TouchableOpacity style={styles.cardInfo} onPress={() => onNextButtonPress(id, title)}>
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
    )
  };

  return (
    <View style={styles.mainContainer}>
      <Spinner
        visible={spinnerVisible}
        textContent={'Building Strategy...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.horizontalTopContainer}>
        <Text style={styles.titleStyle}>Choose your Strategy</Text>
        <FontAwesome style={styles.infoicon} size={20} name='info-circle' />
      </View>
      <Text style={styles.paragraph} numberOfLines={3}>{'Choose a template based strategy based on rist appetite or create a custom stragedy from scratch'}</Text>
      <ScrollView>
        <View style={styles.firstCard}>
          {renderCard(1, require('../img/icons/icLowRisk.png'), 'Low Risk', 'Low risk staregdy are safer but lesser return')}
        </View>
        {renderCard(2, require('../img/icons/icStar.png'), 'Medium Risk', 'Medium stragedies include a mixxed risk/return profile')}
        {renderCard(3, require('../img/icons/icTinder.png'), 'High Risk', 'Potentially high returns but with high risk')}
        <Text style={styles.orText}>{'OR'}</Text>
        {renderCard(0, require('../img/icons/icPlayGreen.png'), 'Build Your Own', 'create your own stargedy using stragedy builder')}
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
    backgroundColor: colors.white,
    marginTop: Platform.OS === 'ios' ? 50 : 0
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
    marginBottom: 5,
    alignItems: 'center'

  },
  titleStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginStart: 3
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
  selectedcardinfo: {
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
  spinnerTextStyle: {
    color: '#FFF'
  },
});

export default StrategyCreateScreen;
