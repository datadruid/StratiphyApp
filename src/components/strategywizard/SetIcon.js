import React, { useState } from 'react';
import { FlatList, Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { colors } from '../modules/Colors';

const windowWidth = Dimensions.get('window').width;

const SetIcon = ({ navigation, selected, onSelected }) => {
  const [selectedIcon, setSelectedIcon] = useState(data[selected]);

  const spacingwidth = (windowWidth - 340)/2;
  const onButtonPress = () => {
    onSelected({iconid : selectedIcon.id});
  };

  const selectedItem = (item) => {
    setSelectedIcon(item);
  };

  const renderItem = ({ item }) => {
    let selectedId = 0;

    return <View>
      < TouchableHighlight style={selectedIcon.id == item.id ? styles.listItemSelected : styles.listItem} onPress={() => selectedItem(item)} >
        <Image source={item.image} resizeMode='contain' style={selectedId == item.id ? styles.icListImageSelected : styles.icListImage}></Image>
      </TouchableHighlight >
    </View >
  };

  return (
    <>
      <View style={styles.horizontalTopContainer}>
        <Text style={styles.titleStyle}>{'Choose an icon for this strategy '}</Text>
        <Image source={selectedIcon.image} resizeMode='contain' style={styles.selectedImage}></Image>
      </View>
      <FlatList
        numColumns={4}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.iconcollection, {marginLeft: spacingwidth}]}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

<View style={styles.buttoncontainer}>
          <Button buttonStyle={styles.button}
            onPress={onButtonPress}
            titleStyle={styles.buttontitle}
            title='Next'
            type='solid' />
        </View>
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
  iconcollection:{
    width:340,
  },
  listItem: {
    width: 70,
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
    marginBottom: (15),
    width: (70),
    marginLeft: (10),
    borderRadius: (70) / 2,
    borderWidth: 4,
    borderColor: colors.redPink
  },
  icListImage: {
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  icListImageSelected: {
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 4,
    height: (60),
    width: (60),
    borderRadius: 70 / 2,

  },
  selectedImage: {
    height: (60),
    width: (60),
    borderWidth: 3,
    borderRadius: 70 / 2,
    borderColor: colors.redPink,
    alignItems: 'flex-end',
    marginRight: (20)
  },
    buttoncontainer: {
        marginHorizontal: 20,
        marginBottom: 30
      },
      button: {
        backgroundColor: colors.yellowTheme,
        borderRadius: 12,
        height: 60
      },
      buttontitle: {
        fontWeight: 'bold'
      },
});


const data = [
  {
    id: 0,
    image: require('../../img/strategyicons/circle-banknote.png'),
  },
  {
    id: 1,
    image: require('../../img/strategyicons/circle-briefcase.png'),
  },
  {
    id: 2,
    image: require('../../img/strategyicons/circle-bullseye.png')
  },
  {
    id: 3,
    image: require('../../img/strategyicons/circle-calculator.png'),
  },
  {
    id: 4,
    image: require('../../img/strategyicons/circle-cash-withdraw2.png'),
  },
  {
    id: 5,
    image: require('../../img/strategyicons/circle-coin.png'),
  },
  {
    id: 6,
    image: require('../../img/strategyicons/circle-cash-withdraw.png'),
  },
  {
    id: 7,
    image: require('../../img/strategyicons/circle-cloud-coin.png'),
  },
  {
    id: 8,
    image: require('../../img/strategyicons/circle-coins-stack.png'),
  },
  {
    id: 9,
    image: require('../../img/strategyicons/circle-collect-money.png'),
  },
  {
    id: 10,
    image: require('../../img/strategyicons/circle-computer-chart.png'),
  },
  {
    id: 11,
    image: require('../../img/strategyicons/circle-coin.png'),
  },
  {
    id: 12,
    image: require('../../img/strategyicons/circle-graph-down.png'),
  },
  {
    id: 13,
    image: require('../../img/strategyicons/circle-gold.png'),
  },
  {
    id: 14,
    image: require('../../img/strategyicons/circle-gavel.png'),
  },
  {
    id: 15,
    image: require('../../img/strategyicons/circle-funds-growth2.png'),
  },
  {
    id: 16,
    image: require('../../img/strategyicons/circle-funds-growth.png'),
  },
  {
    id: 17,
    image: require('../../img/strategyicons/circle-envelope.png'),
  },
  {
    id: 18,
    image: require('../../img/strategyicons/circle-diamond.png'),
  },
  {
    id: 19,
    image: require('../../img/strategyicons/circle-deposit-box.png'),
  },
  {
    id: 20,
    image: require('../../img/strategyicons/circle-credit-card.png'),
  },
  {
    id: 21,
    image: require('../../img/strategyicons/circle-courthouse.png'),
  },
  {
    id: 22,
    image: require('../../img/strategyicons/circle-collect-cash.png'),
  },
  {
    id: 23,
    image: require('../../img/strategyicons/circle-presentation3.png'),
  },
  {
    id: 24,
    image: require('../../img/strategyicons/circle-presentation2.png'),
  },
  {
    id: 25,
    image: require('../../img/strategyicons/circle-piggy-bank.png'),
  },
  {
    id: 26,
    image: require('../../img/strategyicons/circle-pie-chart2.png'),
  },
  {
    id: 27,
    image: require('../../img/strategyicons/circle-pie-chart.png'),
  },
  {
    id: 28,
    image: require('../../img/strategyicons/circle-newsletter.png'),
  },
  {
    id: 29,
    image: require('../../img/strategyicons/circle-money-tree.png'),

  },
  {
    id: 30,
    image: require('../../img/strategyicons/circle-money-enquiry.png'),
  },
  {
    id: 31,
    image: require('../../img/strategyicons/circle-money-cycle.png'),
  },
  {
    id: 32,
    image: require('../../img/strategyicons/circle-money-bag.png'),
  },
  {
    id: 33,
    image: require('../../img/strategyicons/circle-money.png'),
  },
  {
    id: 34,
    image: require('../../img/strategyicons/circle-list.png'),
  },
  {
    id: 35,
    image: require('../../img/strategyicons/circle-inspect.png'),
  },
  {
    id: 36,
    image: require('../../img/strategyicons/circle-idea.png'),
  },
  {
    id: 37,
    title: 'icCircleAnalysis',
    image: require('../../img/strategyicons/circle-analysis.png'),
  },
  {
    id: 38,
    image: require('../../img/strategyicons/circle-wallet.png'),
  },
  {
    id: 39,
    image: require('../../img/strategyicons/circle-text.png'),
  },
  {
    id: 40,
    image: require('../../img/strategyicons/circle-secure-payment.png'),
  },
  {
    id: 41,
    image: require('../../img/strategyicons/circle-report.png'),
  },
  {
    id: 42,
    image: require('../../img/strategyicons/circle-safe.png'),
  },
  {
    id: 43,
    image: require('../../img/strategyicons/circle-receipt.png'),
  },
  {
    id: 44,
    image: require('../../img/strategyicons/circle-rainy-day-savings.png'),
  },
  {
    id: 48,
    image: require('../../img/strategyicons/circle-calendar.png'),
  },
  {
    id: 49,
    image: require('../../img/strategyicons/circle-analyse-chart.png'),
  },
  {
    id: 50,
    image: require('../../img/strategyicons/circle-analysis.png'),
  },
];

export default SetIcon;
