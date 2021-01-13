import React, { useState, useContext } from 'react';
import { StyleSheet, StatusBar, Image, Text, View, TouchableOpacity, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { Button, } from 'react-native-elements';
import Modal from 'react-native-modal'
import HeaderBack from '../components/strategywizard/HeaderBack';
import Preview from '../components/strategy/Preview';
import { colors } from '../components/modules/Colors';
import { Context as UpdateContext } from '../context/StrategyUpdateContext';
import { Context as StrategyContext } from '../context/StrategyContext';
import Spinner from 'react-native-loading-spinner-overlay';

const StrategySummaryScreen = ({ navigation, index }) => {
  const { state } = useContext(UpdateContext);
  const { previewStrategy, uploadStrategy, listStrategies } = useContext(StrategyContext);
  const [visible, setVisible] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  let periodicities =state.strategy.strategyTypes.find(x=> x.setting !== 'none').specifications.periodicities;
  let periods =state.strategy.strategyTypes.find(x=> x.setting !== 'none').specifications.periods;
  let weightings =state.strategy.strategyTypes.find(x=> x.setting !== 'none').specifications.weightings;
  let lookback = state.strategy.options.basicStrategySettingOptions.find(x=> x.periodicities == periodicities && x.periods == periods && x.weightings == weightings).label;

  let strategyType = state.strategy.strategyTypes.find(x=> x.setting !== 'none').typeName;
  let sectors = state.strategy.sectors.sectorsInclude.map(x=> x.tag ).join(", ");
  
  const openPreview = () => {
    previewStrategy(state.strategy);
    setVisible(true);
  };

  const closePreview = () => {
    setVisible(false);
  };

  const saveStrategy = async () => {
    setVisible(false);
    setSpinnerVisible(true);
    let timer = setTimeout(() => {
        setSpinnerVisible(false);
    }, 5000);
    await uploadStrategy(state.strategy);
    navigation.navigate('StrategyCreate');
    navigation.navigate('StrategyList');
    listStrategies();
  };

  renderCard = (id, title, description) => {
  return (
    <TouchableOpacity style={styles.cardInfo} onPress={() => onCardPress(id)}>
      <View style={styles.cardItems}>
        <View style={styles.icMiddleContainer} >
          <Text style={styles.infoTitle}>{title}</Text>
          <Text style={styles.infoDescription}>{description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    )};

  return (
    <View style={styles.mainContainer}>
      <Spinner
                visible={spinnerVisible}
                textContent={'Saving...'}
                textStyle={styles.spinnerTextStyle}
            />
      <HeaderBack text={''} navigation={navigation} onLeftPress={() => navigation.goBack()} />

      <View style={styles.horizontalTopContainer}>
        <Text style={styles.titleStyle}>Your Strategy</Text>
      </View>

      <Text style={styles.paragraph} numberOfLines={3}>{'This is a summary of your strategy.'}</Text>
      
      <ScrollView>
        <View style={styles.firstCard}>
          {renderCard(0, 'Strategy type', strategyType)}
        </View>
        {renderCard(1, 'Lookback period', lookback)}
        {renderCard(2, 'Sectors', sectors)}

        
      </ScrollView>
      <View style={styles.buttoncontainer}>
          <Button buttonStyle={styles.button}
            onPress={openPreview}
            titleStyle={styles.buttontitle}
            title='Preview Performance'
            type='solid' />
        </View>

        <Modal fullScreen={false}
          style={styles.overlay} isVisible={visible} onBackdropPress={closePreview}>
            <Preview strategy={state.strategy} saveStrategy={saveStrategy} closeWindow={closePreview}/>
            
          </Modal>
    </View>

  );

};


StrategySummaryScreen.navigationOptions = () => {
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
  overlay: {
    marginHorizontal:0,
    marginTop: 95,
    marginBottom: 0
  },
  horizontalTopContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: (19),
    marginTop: (20),
    marginBottom: (1),
    alignItems: 'flex-start',
    justifyContent: 'flex-start'

  },
  titleStyle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: (-10),
    marginBottom: 10,
    textAlign:'left'
  },
  searchImage: {
    width: (30),
    height: (30)
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
    textTransform: 'capitalize'
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: (5),
    marginStart: 5,
    marginTop: (11)
  },
  cardInfo: {
    width: '90%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: (120),
    alignSelf: 'center',
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
    alignSelf: 'flex-start'
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

export default StrategySummaryScreen;
