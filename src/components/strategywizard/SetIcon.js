import React, { useState } from 'react';
import { FlatList, Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { colors } from '../modules/Colors';
import { icondata } from '../modules/StrategyIcons';
import YellowButton from '../controls/YellowButton'

const windowWidth = Dimensions.get('window').width;

const SetIcon = ({ navigation, selected, onSelected }) => {
  const [selectedIcon, setSelectedIcon] = useState(icondata[selected]);
  const spacingwidth = (windowWidth - 340) / 2;
  const onButtonPress = () => {
    onSelected({ iconid: selectedIcon.id });
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
        contentContainerStyle={[styles.iconcollection, { marginLeft: spacingwidth }]}
        data={icondata}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <View style={styles.yellowbutton}>
        <YellowButton title='Save' onButtonPress={onButtonPress} />
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
  iconcollection: {
    width: 340,
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
  yellowbutton: {
    marginTop: 10
  }
});

export default SetIcon;
