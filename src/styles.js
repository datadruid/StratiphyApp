import { StyleSheet } from 'react-native'
import { Colors, scale } from '../Themes'
export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    horizontalTopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: scale(20),
        justifyContent: 'center',
        maxHeight: scale(138),
        marginTop: scale(53),
        marginBottom: scale(5),

    },
    titleStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    searchImage: {
        width: scale(30),
        height: scale(30)
    },
    discoverImage: {
        width: scale(330),
        height: scale(40),
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

        alignSelf: 'center',
        marginLeft: scale(10),
        height: scale(18),
        width: scale(18)
    },
    secondContainer: {

        flex: 1,
        backgroundColor: Colors.paleGrey,
        borderTopLeftRadius: scale(12),
        borderTopRightRadius: scale(12),
        width: '100%',
        marginTop: scale(10)

    },
    switchButton: {

        marginTop: scale(10),
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 20,
        height: scale(50)
    },
    horizontalTopButtonCon: {

        flexDirection: 'row',
        marginTop: scale(20)
    },
    filterStyle: {

        height: scale(36),
        width: scale(120),
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(20),
        borderRadius: 12
    },
    sortStyle: {

        height: scale(36),
        width: scale(120),
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(9),
        borderRadius: 12
    },
    stragedyImage: {

        width: '90%',
        height: scale(165),
        alignSelf: 'center',
        marginTop: scale(18),
        paddingHorizontal: scale(40)

    },
    watchListContainer: {
        flexDirection: 'row',
        paddingHorizontal: scale(20),
        alignItems: 'center',
        marginTop: scale(20),
        backgroundColor: Colors.paleGrey,
        marginBottom: scale(5)
    },

    bottomContainer: {
        width: '100%',
        height: scale(78),
        position: 'absolute',
        bottom: 0,
    },
    textStyle: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold'
    },
    qualitybtn: {
        height: scale(36),
        width: scale(133),
        backgroundColor: '#ffc234',
        borderRadius: 12

    },
    valueBtn: {

        height: scale(36),
        width: scale(120),
        backgroundColor: Colors.yellowTheme,
        borderRadius: 12,
        marginLeft: -15,

    },
    qualityContainer: {
        flexDirection: 'row',
        flexWrap: "wrap",
        marginTop: scale(20)
    },
    qualitySecondContainer: {

        flexDirection: 'row',
        marginTop: scale(-10)

    },
    qualitybtnText: {
        textTransform: 'capitalize'
    },
    valueBtnText: {

        textTransform: 'capitalize'
    },

    momentumBtn: {
        height: scale(36),
        width: scale(190),
        backgroundColor: Colors.yellowTheme,
        borderRadius: 12

    },
    sustainAbilityBtn: {

        height: scale(36),
        width: scale(120),
        backgroundColor: Colors.yellowTheme,
        borderRadius: 12,
        marginLeft: -15,
        marginEnd: 20

    },

    qualitybtnText: {
        textTransform: 'capitalize'
    },
    sustainBtnText: {

        textTransform: 'capitalize'
    },
    listContainer: {

        flex: 1,
        backgroundColor: Colors.paleGrey,
    },
    footer: {

        height: scale(20),
        width: '100%',
        marginBottom: scale(110)
    },
    listItem: {
        height: scale(200),
        width: '90%',
        backgroundColor: Colors.white,
        borderRadius: 12,
        marginTop: scale(10),
        alignSelf: 'center'
    },
    titleTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: scale(19),
        height: scale(50)
    },
    leftContainer: {

        flex: 1, flexDirection: 'row', height: 50,

    },
    midlleContainer: {

        flex: 1, height: 50,

    },
    rightContainer: {
        flex: 1, flexDirection: 'row', height: 50,
        justifyContent: 'flex-end', paddingEnd: scale(20)
    },

    leafImage: {
        width: scale(24),
        height: scale(24)

    },
    starImage: {

        width: scale(24),
        height: scale(24)

    },
    logoImage: {

        width: scale(40),
        height: scale(39),
        marginLeft: scale(20)
    },
    cardTitle: {
        fontSize: 14,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold'

    },
    cardDescription: {
        fontSize: 13,
        textAlign: 'center',
        color: Colors.coolGrey,
        fontWeight: 'bold'
    },
    progressContainer: {

        paddingHorizontal: 12,
        paddingVertical: 8,
        marginLeft: scale(20)
    },
    bottomView: {

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: scale(33),
        marginTop: scale(30)
    },
    dotPurple: {
        width: 7,
        height: 7,
        borderRadius: 7 / 2,
        backgroundColor: Colors.purplishBlue,
    },
    dotLightBlue: {
        width: 7,
        height: 7,
        borderRadius: 7 / 2,
        backgroundColor: Colors.lightishBlue,
    },
    dotLightPurple: {
        width: 7,
        height: 7,
        borderRadius: 7 / 2,
        backgroundColor: Colors.lightPurple,
    },
    leftBottomView: {
        flex: 1,
        height: 50,

    },
    rightBottomView: {
        flex: 1,
        height: 50,

    },
    middleBottomView: {
        flex: 1,
        height: 50,

    },
    bottomLabel: {

        fontSize: 8,
        color: 'black',

    },
    labelValue: {
        fontSize: 8,
        color: 'black',
        marginTop: scale(4),
        fontWeight: 'bold',

    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 75,
        paddingTop: 20,
      },
      switchpanel: {
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#D8DADB',
        padding: 2.5,
        height: 40
      },
      button: {
        backgroundColor: '#D8DADB',
        width: 166,
        borderRadius: 8,
      },
      buttontitle: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold'
      },
      buttonselected: {
        backgroundColor: '#FFFFFF',
        width: 166,
        borderRadius: 8,
      },
      buttontitleselected: {
        color: 'black',
        fontSize: 13,
        fontWeight: 'bold'
      },
      centerspacer: {
        width: 4,
      },
      titleiconcontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      imagebox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
      },
      backiocn: {
        padding: 10,
        justifyContent: 'center',
        color: 'white',
      },
      subtitletext: {
        fontSize: 16,
        fontWeight: '400',
        color: 'white'
      },
      filterbutton: {
        backgroundColor: '#FFC234',
        paddingHorizontal: 20,
        borderRadius: 18,
        height: 36,
        marginHorizontal: 10,
        marginTop: 10,
      },
      filterbuttontext: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
      },
})
