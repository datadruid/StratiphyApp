import React from 'react';
import { FlatList, Text, View, StyleSheet, Image } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { colors } from '../modules/Colors';

const SetIcon = ({ children }) => {

  const renderItem = ({ item }) => {
    //let { selected, selectedId } = this.state;
    let selectedId = 0;

    return <View style={styles.innerView}>
      < TouchableHighlight style={selectedId == item.id ? styles.listItemSelected : styles.listItem} onPress={() => this.selectedItem(item)} >
        <Image source={item.image} resizeMode='contain' style={selectedId == item.id ? styles.icListImageSelected : styles.icListImage}></Image>
      </TouchableHighlight >
    </View >
  };

  return (
    <>
      <View style={styles.horizontalTopContainer}>
        <Text style={styles.titleStyle}>{'Choose an icon for this strategy '}</Text>
        {/* <Image source={selected.image} resizeMode='contain' style={styles.selectedImage}></Image> */}
      </View>

      <FlatList
        numColumns={4}
        showsVerticalScrollIndicator={false}
        style={styles.servicesContainer}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </>
  )
};

const styles = StyleSheet.create({
  horizontalTopContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: (19),
    marginTop: (20),
    marginBottom: (20),
    justifyContent: 'space-between'
  },
  titleStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    width: '60%',
  },
  servicesContainer: {
    flex: 1,
    marginLeft: (20),
  },
  listItem: {
    width: '100%',
    height: (70),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.paleGrey,
    marginBottom: (15),
    width: (70),
    marginLeft: (10),
    borderRadius: 70 / 2,
  },
  listItemSelected: {
    width: '100%',
    height: (70),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.yellowTheme,
    marginBottom: (15),
    width: (70),
    marginLeft: (10),
    borderRadius: (70) / 2,
    borderWidth: 35,
    borderColor: colors.yellowTheme
    // borderColor: colors.yellowTheme,
    // shadowColor: colors.yellowTheme,
    // shadowOffset: {
    //     width: 0,
    //     height: 18,
    // },
    // shadowOpacity: 20.44,
    // shadowRadius: 10.32,
    // elevation: 36,

  },
  icListImage: {
    alignItems: 'center',
    width: 60,
    height: 60
  },
  icListImageSelected: {
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 3,
    height: (60),
    width: (60),
    borderRadius: 70 / 2,

  },
  selectedImage: {
    alignItems: 'flex-end',
    marginRight: (20)
  }
});


const data = [
  {
    id: 0,
    title: 'Tech ',
    image: require('../../img/strategyicons/circle-banknote.png'),
  },
  {
    id: 1,
    title: 'Sustainable',
    image: require('../../img/strategyicons/circle-briefcase.png'),
  },
  {
    id: 2,
    title: 'Finance',
    image: require('../../img/strategyicons/circle-bullseye.png')
  },
  {
    id: 3,
    title: 'Pharma ',
    image: require('../../img/strategyicons/circle-calculator.png'),
  },
  {
    id: 4,
    title: 'Construction',
    image: require('../../img/strategyicons/circle-cash-withdraw2.png'),
  },
  {
    id: 5,
    title: 'Manufacturing ',
    image: require('../../img/strategyicons/circle-coin.png'),
  },
  {
    id: 6,
    title: 'Tech ',
    image: require('../../img/strategyicons/circle-cash-withdraw.png'),
  },
  {
    id: 7,
    title: 'Sustainable',
    image: require('../../img/strategyicons/circle-cloud-coin.png'),
  },
  {
    id: 8,
    title: 'Finance',
    image: require('../../img/strategyicons/circle-coins-stack.png'),
  },
  {
    id: 9,
    title: 'Pharma ',
    image: require('../../img/strategyicons/circle-collect-money.png'),
  },
  {
    id: 10,
    title: 'Construction',
    image: require('../../img/strategyicons/circle-computer-chart.png'),
  },
  {
    id: 11,
    title: 'Manufacturing ',
    image: require('../../img/strategyicons/circle-coin.png'),
  },
  {
    id: 12,
    title: 'GraphDown ',
    image: require('../../img/strategyicons/circle-graph-down.png'),
  },
  {
    id: 13,
    title: 'CircleGold',
    image: require('../../img/strategyicons/circle-gold.png'),
  },
  {
    id: 14,
    title: 'CircleGravel',
    image: require('../../img/strategyicons/circle-gavel.png'),
  },
  {
    id: 15,
    title: 'FundsGrowth2 ',
    image: require('../../img/strategyicons/circle-funds-growth2.png'),
  },
  {
    id: 16,
    title: 'CircleFunds',
    image: require('../../img/strategyicons/circle-funds-growth.png'),
  },
  {
    id: 17,
    title: 'Envelope ',
    image: require('../../img/strategyicons/circle-envelope.png'),
  },
  {
    id: 18,
    title: 'CirlceDiamond ',
    image: require('../../img/strategyicons/circle-diamond.png'),
  },
  {
    id: 19,
    title: 'DepositBox',
    image: require('../../img/strategyicons/circle-deposit-box.png'),
  },
  {
    id: 20,
    title: 'CircleCredit',
    image: require('../../img/strategyicons/circle-credit-card.png'),
  },
  {
    id: 21,
    title: 'CourtHouse ',
    image: require('../../img/strategyicons/circle-courthouse.png'),
  },
  {
    id: 22,
    title: 'CollectCash',
    image: require('../../img/strategyicons/circle-collect-cash.png'),
  },
  {
    id: 23,
    title: 'Presentation3 ',
    image: require('../../img/strategyicons/circle-presentation3.png'),
  },
  {
    id: 24,
    title: 'Presentation2 ',
    image: require('../../img/strategyicons/circle-presentation2.png'),
  },
  {
    id: 25,
    title: 'PiggyBank',
    image: require('../../img/strategyicons/circle-piggy-bank.png'),
  },
  {
    id: 26,
    title: 'PiChart2',
    image: require('../../img/strategyicons/circle-pie-chart2.png'),
  },
  {
    id: 27,
    title: 'PiChart',
    image: require('../../img/strategyicons/circle-pie-chart.png'),
  },
  {
    id: 28,
    title: 'NewsLatter',
    image: require('../../img/strategyicons/circle-newsletter.png'),
  },
  {
    id: 29,
    title: 'CircleMoneyTree',
    image: require('../../img/strategyicons/circle-money-tree.png'),

  },
  {
    id: 30,
    title: 'icCirlceEnquiry ',
    image: require('../../img/strategyicons/circle-money-enquiry.png'),
  },
  {
    id: 31,
    title: 'icMoneyCycle',
    image: require('../../img/strategyicons/circle-money-cycle.png'),
  },
  {
    id: 32,
    title: 'icMoneyBag',
    image: require('../../img/strategyicons/circle-money-bag.png'),
  },
  {
    id: 33,
    title: 'icCirlceMoney ',
    image: require('../../img/strategyicons/circle-money.png'),
  },
  {
    id: 34,
    title: 'icCircleList',
    image: require('../../img/strategyicons/circle-list.png'),
  },
  {
    id: 35,
    title: 'icCircleInspect ',
    image: require('../../img/strategyicons/circle-inspect.png'),
  },
  {
    id: 36,
    title: 'icCircleIdea ',
    image: require('../../img/strategyicons/circle-idea.png'),
  },
  {
    id: 37,
    title: 'icCircleAnalysis',
    image: require('../../img/strategyicons/circle-analysis.png'),
  },
  {
    id: 38,
    title: 'icCircleWallet',
    image: require('../../img/strategyicons/circle-wallet.png'),
  },
  {
    id: 39,
    title: 'icCircleText ',
    image: require('../../img/strategyicons/circle-text.png'),
  },
  {
    id: 40,
    title: 'icSecurePayment',
    image: require('../../img/strategyicons/circle-secure-payment.png'),
  },
  {
    id: 41,
    title: 'icCircleReport ',
    image: require('../../img/strategyicons/circle-report.png'),
  },
  {
    id: 42,
    title: 'icCircleRecipt',
    image: require('../../img/strategyicons/circle-safe.png'),
  },
  {
    id: 43,
    title: 'icCircleRecipt',
    image: require('../../img/strategyicons/circle-receipt.png'),
  },
  {
    id: 44,
    title: 'icRainyDaySavings',
    image: require('../../img/strategyicons/circle-rainy-day-savings.png'),

  },
  {
    id: 48,
    title: 'Tech ',
    image: require('../../img/strategyicons/circle-calendar.png'),
  },
  {
    id: 49,
    title: 'Sustainable',
    image: require('../../img/strategyicons/circle-analyse-chart.png'),
  },
  {
    id: 50,
    title: 'Finance',
    image: require('../../img/strategyicons/circle-analysis.png'),

  },
];

export default SetIcon;
