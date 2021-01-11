import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Button, } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import { colors } from '../modules/Colors';

const windowWidth = Dimensions.get('window').width;
const imageMap = {
  'icTech.png': require('../../img/marketsectors/icTech.png'),
  'icLeaf.png': require('../../img/marketsectors/icLeaf.png'),
  'icFinance.png': require('../../img/marketsectors/icFinance.png'),
  'icHeart.png': require('../../img/marketsectors/icHeart.png'),
  'icConstruction.png': require('../../img/marketsectors/icConstruction.png'),
  'icManufacture.png': require('../../img/marketsectors/icManufacture.png'),
}

const MarketSectors = ({ navigation, sectorData, onSelected }) => {
  const [sectors, setSectors] = useState(sectorData);
  const [refresh, setRefresh] = useState(false);

  const setToggleCheckBox = (item) => {
    let updates = sectors;
    let updater = updates[item.id];
    updater.selected = !updater.selected;
    updates.splice(item.id, 1, updater);
    setSectors(updates);
    setRefresh(!refresh);
  };

  const onButtonPress = () => {
    console.log(sectors)
    if (sectors.filter(x => x.selected).length > 0) {
      onSelected(sectors);
    } else {
      Alert.alert('Sectors', 'you need to select at least one sector');
    }

  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={item.selected == true ? styles.listItemSelected : styles.listItem} onPress={() => setToggleCheckBox(item)}>
        <Image source={imageMap[item.image]} resizeMode='contain' style={styles.icListImage}></Image>
        <Text style={styles.listTitle}>{item.title}</Text>
      </TouchableOpacity >
    )
  };

  return (
    <>
      <View style={styles.horizontalTopContainer}>
        <Text style={styles.titleStyle}>Choose sectors</Text>
        <TouchableOpacity>
          <FontAwesome style={styles.infoicon} size={20} name='search' />
        </TouchableOpacity>

      </View>
      <Text style={styles.paragraph} numberOfLines={3}>{'Which sectors do you want to invest in? '}</Text>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={styles.servicesContainer}
        data={sectors}
        extraData={refresh}
        renderItem={renderItem}
      />

      {/* <View style={styles.defaultViewContainer}>
        <CheckBox
          style={styles.box}
          disabled={false}
          boxType={'square'}
          value={false}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text style={styles.defaultText}>Set as default</Text>
      </View> */}

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
    marginBottom: (1),
    marginBottom: (10),
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  searchImage: {
    width: (30),
    height: (30)
  },
  infoDescription: {
    color: colors.coolGrey,
    fontSize: 14,
    marginLeft: (5)
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
    // width: '60%', height: '100%',
    // justifyContent: 'center'
  },
  rightContainerTip: { width: '20%', height: '100%' },
  icCrossImage: {

    height: (15),
    width: (15),
    alignSelf: 'flex-end',
    margin: (12)
  },
  infoDescription: {
    color: colors.coolGrey,
    fontSize: 14,
    marginLeft: (5),
    width: '80%'


  },
  infoTitle: {

    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: (5),
    marginTop: (21)

  },
  cardInfo: {
    width: '90%',
    height: (120),
    alignSelf: 'center',
    backgroundColor: colors.paleGrey,
    borderRadius: 12,
    marginBottom: (15)
  },
  cardInfoSelected: {
    borderWidth: 2,
    borderColor: colors.yellowTheme,
  },
  cardItems: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: (21),
    height: (120),
    borderRadius: 12,
  },
  paragraph: {
    marginHorizontal: (22),
    fontSize: 18,
    color: 'black',
    marginBottom: (15)
  },
  firstCard: {
    marginTop: (30)
  },
  orText: {
    textAlign: 'center',
    color: colors.coolGrey,
    marginBottom: (10)
  },
  listItem: {
    width: '41.5%',
    height: (120),
    backgroundColor: colors.paleGrey,
    borderRadius: 12,
    marginBottom: (15),
    marginLeft: (20),
  },
  listItemSelected: {
    width: '41.5%',
    height: (120),
    backgroundColor: colors.paleGrey,
    borderRadius: 2,
    marginBottom: (15),
    marginLeft: (20),
    borderWidth: 2,
    borderRadius: 12,
    borderColor: colors.yellowTheme
  },
  listContainer: {
    justifyContent: 'space-between',
    height: (160),
    width: (windowWidth - (4 * (10))) / 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: (3)
  },
  servicesContainer: {
    flex: 1,
  },
  searchImage: {
    width: (30),
    height: (30),
    marginTop: (-5)
  },
  icListImage: {
    height: (50),
    width: (50),
    marginLeft: (15),
    top: 15
  },
  listTitle: {
    marginTop: (46),
    marginLeft: (15),
    marginBottom: (15),
    bottom: 15,
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold'
  },
  defaultViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: (20),
    marginBottom: 20,
  },
  defaultText: {

    marginLeft: (15),
    textAlign: 'center',
    fontSize: 18,
    color: 'black'
  },
  box: {

    height: (24),
    width: (24)
  },
  buttoncontainer: {
    marginHorizontal: 20,
    marginBottom: 10
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

export default MarketSectors;
