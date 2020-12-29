import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { Dimensions, Platform } from 'react-native';
import { Button, } from 'react-native-elements';
import HeaderBack from '../components/strategywizard/HeaderBack';
import * as Progress from 'react-native-progress';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Chart, Line, Area, Tooltip } from 'react-native-responsive-linechart'
import { colors } from '../components/modules/Colors';

const windowWidth = Dimensions.get('window').width;

const StrategyWizardScreen = ({navigation, stage}) => {
    const [showHideHeader, setShowHideHeader] = useState(true);

    onButtonPress = () => {
    };

    onBackPress = () => {
        navigation.goBack()
      };

    renderItem = ({ item }) => {
        const width = Dimensions.get('window').width
        return <View style={[styles.listItem, { backgroundColor: item.backgroundColor }]}>
    
          <View style={styles.titleTop}>
            <View style={styles.leftContainer} >
            </View>
            <View style={styles.midlleContainer} >
              <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
    
              <Text style={styles.description}>{item.short_desc}</Text>
            </View>
            <View style={styles.rightContainer}
            >
              <TouchableOpacity style={styles.pressStyle} onPress={() => this.cardPress(item)}>
                <FontAwesome style={styles.infoicon} size={20} name='info-circle' />
              </TouchableOpacity>
            </View>
    
          </View>
          <Chart
            style={{ height: 120, width: '100%', backgroundColor: item.backgroundColor }}
            data={[
              { x: -2, y: 10 },
              { x: -1, y: 15 },
              { x: 0, y: 10 },
              { x: 2, y: 11 },
              { x: 4, y: 12 },
              { x: 9, y: 12.5 },
              { x: 10, y: 15 },
            ]}
    
            padding={{ left: 0, bottom: 20, right: 0, top: 20 }}
            xDomain={{ min: 1, max: 10 }}
            labels={["jan", "feb", "mar", "apr", "may", "jun", "jul"]}
          >
    
            <Area theme={{ gradient: { from: { color: colors.white }, to: { color: colors.white, opacity: 0.0 } } }} />
            <Line theme={{ stroke: { color: colors.white, width: 4 } }} />
            <Line
    
              initialTooltipIndex={2}
              tooltipComponent={<Tooltip value={'sss'} theme={{ shape: { color: item.backgroundColor, radius: 0 }, }} />}
              theme={{ stroke: { color: '#fff', width: 5 }, scatter: { default: { width: 10, height: 10, rx: 41, color: item.backgroundColor, borderWidth: 1, borderColor: '#fff' }, selected: { borderColor: 'white', borderWidth: 12 } } }} />
          </Chart>
    
    
        </View >
    
      }
  return (
    <View style={styles.mainContainer}>
        {Platform.OS === 'ios' ? <StatusBar translucent barStyle="dark-content" /> :
          <StatusBar backgroundColor="white" barStyle="dark-content" />
        }

        <View style={{ height: 88 }}>
        <HeaderBack text={'2/7'} onPress={() => onBackPress()} navigation={navigation} />
      </View>
        <View style={styles.progressContainer}>
          <Progress.Bar progress={2/7} width={windowWidth - (40)} color={colors.yellowTheme} unfilledColor={colors.silver} borderWidth={0} />
        </View>
        <View style={styles.secondContainer}>
          <Text style={styles.paragraph} numberOfLines={3}>{' Choose what type of strategy to build with your selected universe of asset.'}</Text>
          {showHideHeader ? <View style={styles.cardInfo}>

            <View style={styles.tipContainer}>
              <View style={styles.tipLeftContainer} >
                <Image source={require('../img/icons/icEyeCircle.png')} resizeMode='contain' style={styles.tipImage} />
              </View>
              <View style={styles.icMiddleContainer} >
                <Text style={styles.infoTitle}> Not sure what to do?</Text>
                <Text style={styles.infoDescription}>Try a momentum strategy to get
                to grips with using Stratiphy.
                  </Text>
              </View>

              <View style={styles.rightContainerTip} >
                {/* <TouchableOpacity onPress={showHideHeader}>
                  <Image source={Images.icClose} style={styles.icCrossImage}>

                  </Image>
                </TouchableOpacity> */}
              </View>
            </View>
          </View> : null}
          <FlatList
            style={styles.listContainer}
            data={data}
            renderItem={renderItem}
            contentContainerStyle={{ flexGrow: 1 }}
            ListFooterComponentStyle={{ flex: 1, justifyContent: 'flex-end' }}
            ListFooterComponent={<View style={{ height: 100, width: 100 }}></View>}
          />
        <View style={styles.buttoncontainer}>
          <Button buttonStyle={styles.button}
            onPress={onButtonPress}
            titleStyle={styles.buttontitle}
            title='Next'
            type='solid' />
        </View>
        </View>


      </View>
  );

};



StrategyWizardScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white
      },
    titleStyle: {
        fontSize: 26,
        fontWeight: 'bold',
        // marginBottom:(15)
    },
    infoDescription: {
        color: colors.coolGrey,
        fontSize: 14,
        marginLeft: (5)


    },
    secondContainer: {

        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: (12),
        borderTopRightRadius: (12),
        width: '100%',
        height: (800),
        marginTop: (10)

    },
    cardInfo: {


        width: '90%',
        height: (97),
        alignSelf: 'center',
        backgroundColor: colors.white,
        borderRadius: 12,
        marginTop: (20)
    },
    infoTitle: {

        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: (5)

    },
    listItem: {
        height: (200),
        width: '90%',
        backgroundColor: colors.white,
        borderRadius: 12,
        marginTop: (10),
        alignSelf: 'center'
    },
    titleTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: (19),
        height: (50)
    },
    leftContainer: {

        flex: 1, flexDirection: 'row', height: 50,
        marginBottom: (20),
        width: '30%',
        // backgroundColor:'green'

    },
    midlleContainer: {

        height: null,
        width: '60%',
        textAlign: 'center',
        alignSelf: 'center',
        marginBottom:(10)

    },
    rightContainer: {
        flex: 1, flexDirection: 'row', height: 50,
        justifyContent: 'flex-end', paddingEnd: (0),
        marginTop: (-5),
        width: '10%',
        // backgroundColor:'grey'

    },
    tipLeftContainer: { width: '20%', height: '100%' },
    tipImage: {

        height: (45),
        height: (45),
        alignSelf: 'center',
        marginTop: (20)
    },
    icMiddleContainer: {
        width: '60%', height: '100%',
        justifyContent: 'center'
    },
    rightContainerTip: { width: '20%', height: '100%' },
    icCrossImage: {

        height: (15),
        width: (15),
        alignSelf: 'flex-end',
        margin: (12)
    },
    bottomView: {

        flex: 1,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: (13),
        marginTop: (-30)
    },
    dotPurple: {
        width: 7,
        height: 7,
        borderRadius: 7 / 2,
        backgroundColor: colors.purplishBlue,
    },
    dotLightBlue: {
        width: 7,
        height: 7,
        borderRadius: 7 / 2,
        backgroundColor: colors.lightishBlue,
    },
    dotLightPurple: {
        width: 7,
        height: 7,
        borderRadius: 7 / 2,
        backgroundColor: colors.lightPurple,
    },
    leftBottomView: {

        height: 50,
        width: '35%',


    },
    rightBottomView: {
        height: 50,
        width: '40%',
        marginLeft: (5),
        marginRight: (1)
    },
    middleBottomView: {

        height: 50,
        width: '40%',
        marginTop: (10),
        flexDirection: 'row',
        justifyContent: 'center'

    },
    bottomLabel: {

        fontSize: 16,
        color: colors.coolGrey,
        marginEnd: (5)

    },
    labelValue: {
        fontSize: 20,
        color: 'black',
        marginTop: (-4),
        fontWeight: 'bold',

    },
    logoImageMidlle1: {
        width: (24),
        height: (24),
        borderRadius: 34 / 2,
        marginBottom: (2),
        backgroundColor: 'grey',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    logoImageMidlle2: {

        width: (24),
        height: (24),
        marginLeft: -10,
        marginBottom: (3),


    },
    logoImageMidlle3: {
        width: (24),
        height: (24),
        marginLeft: (-12),
        marginBottom: (5),


    },
    logoImage: {

        marginLeft: (20),
        width: (34),
        height: (34)
    },
    cardTitle: {

        textAlign: 'center',
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: (10),


    },
    description: {
        color: 'white',
        width: '110%',
        fontSize:13,marginTop:10

    },

    pressStyle: {
        padding: 10
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        backgroundColor: 'red',
        borderColor: '#fff',
        borderWidth: 1,
        alignSelf: 'flex-end'
    },
    optionImage: {

        marginBottom: (10),
        marginRight: (10)
    },
    infoDescription: {
        color: 'black',
        fontSize: 13,
        marginLeft: (5)


    },
    progressContainer: {
        marginTop: (10),
        alignSelf: 'center',
        height: 10,

    },
    paragraph: {

        marginHorizontal: (30),
        fontSize: 18,
        color: 'black'
    },
    tipContainer: {

        flex: 1, flexDirection: 'row', backgroundColor: colors.paleGrey, borderRadius: 12
    },
    nextBtn: {


        backgroundColor: colors.yellowTheme,
        height: (50),
        borderRadius: 10
    },
    nextBtnText: {

        fontSize: 22
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

const data = [
    {
      id: 0,
      title: 'Momentum',
      short_desc: 'Invest in assets whose prices have risen the most, and sell those that have fallen the most.',
      quality: '£3256.4',
      momentum: '-8,256',
      value: '+10.52%',
      //imageLogo: Images.icBulbPurle,
      startColour: '#4cd698',
      endColour: '#98d4b9',
      notification: true,
    //   bottomMiddleImage: Images.icHomeLogo,
    //   bottomMiddleImageSecond: Images.icStarBucks,
    //   bottomMiddleImageThird: Images.icAndLogo,
      backgroundColor: colors.lightishBlue,
  
    },
    {
      id: 1,
      title: 'Momentum',
      quality: '£421.10',
      momentum: '-8,256',
      value: '-1.35%',
      short_desc: 'Invest in assets that are most undervalued,and sell those that are most overvalued.',
  
      //imageLogo: Images.inThinkGreen,
      startColour: '#FA325A',
      endColour: '#fccad4',
      notification: true,
    //   bottomMiddleImageSecond: Images.icTestla,
    //   bottomMiddleImage: Images.icArrowsLogo,
    //   bottomMiddleImageThird: Images.icDow,
      backgroundColor: colors.lightPurple
  
    },
    {
      id: 2,
      title: 'Momentum',
      quality: '£421.40',
      momentum: '-8,256',
      value: '-1.35%',
      short_desc: 'Invest in assets that are oversold, and sell assets that are overbought.,',
  
      //imageLogo: Images.inThinkGreen,
      startColour: '#FA325A',
      endColour: '#fccad4',
      notification: false,
    //   bottomMiddleImageSecond: Images.icTestla,
    //   bottomMiddleImage: Images.icArrowsLogo,
    //   bottomMiddleImageThird: Images.icDow,
      backgroundColor: colors.lightPurple
    },
    {
      id: 3,
      title: 'Momentum',
      quality: '£421.40',
      momentum: '-8,256',
      value: '-1.35%',
      short_desc: 'Invest in assets whose traded volume has risen the most before its price follows suit,   and sell those whose traded volume has fallen most before its price follows suit.',
  
  
      //imageLogo: Images.inThinkGreen,
      startColour: '#FA325A',
      endColour: '#fccad4',
      notification: false,
    //   bottomMiddleImageSecond: Images.icTestla,
    //   bottomMiddleImage: Images.icArrowsLogo,
    //   bottomMiddleImageThird: Images.icDow,
      backgroundColor: colors.purplishBlue
    },
  ]
  const data1 = [
    { x: -2, y: 1 },
    { x: -1, y: 0 },
    { x: 8, y: 13 },
    { x: 9, y: 11.5 },
    { x: 10, y: 12 }
  ]
  
  const data2 = [
    { x: -2, y: 15 },
    { x: -1, y: 10 },
    { x: 0, y: 12 },
    { x: 1, y: 7 },
    { x: 8, y: 12 },
    { x: 9, y: 13.5 },
    { x: 10, y: 18 }
  ]

export default StrategyWizardScreen;
