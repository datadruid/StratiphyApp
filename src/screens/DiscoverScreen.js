import React, { useState } from 'react';
import { ScrollView, StatusBar, Image, FlatList, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import {  Colors, scale } from '../../Themes/';
import { Images } from '../../Themes/';
import * as Progress from 'react-native-progress';

import styles from '../styles'
const DiscoverScreen = ({navigation}) => {
  const [isStrategyTab, setIsStrategyTab] = useState(false);
  const [isStocksTab, setIsStocksTab] = useState(true);

    /// change button status for analysis and strategy
    var strategyButtonProps = {
      buttonStyle: isStrategyTab ? styles.buttonselected : styles.button,
      titleStyle: isStrategyTab ? styles.buttontitleselected : styles.buttontitle,
    };
  
    var stocksButtonProps = {
      buttonStyle: isStocksTab ? styles.buttonselected : styles.button,
      titleStyle: isStocksTab ? styles.buttontitleselected : styles.buttontitle,
    };

    const switchTab = (target) => {
      if (target === 'stocks') {
        setIsStrategyTab(false);
        setIsStocksTab(true);
      }
      else {
        setIsStrategyTab(true);
        setIsStocksTab(false);
      }
    };

  const  renderItem = ({ item }) => {

    return <View style={styles.listItem}>
      <View style={styles.titleTop}>
        <View style={styles.leftContainer} >
          <Image source={item.imageLogo} style={styles.logoImage} />
        </View>
        <View style={styles.midlleContainer} >
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.short_desc}</Text>
        </View>
        <View style={styles.rightContainer} >
          <Image source={Images.icLeaf} style={styles.leafImage} />
          <Image source={Images.icStar} style={styles.starImage} />
        </View>
      </View>
      <View style={styles.progressContainer}>
        <Progress.Bar progress={0.6} width={scale(250)} color={Colors.purplishBlue} unfilledColor={Colors.silver} borderWidth={0} />
      </View>
      <View style={styles.progressContainer}>
        <Progress.Bar progress={0.7} width={scale(250)} color={Colors.lightishBlue} unfilledColor={Colors.silver} borderWidth={0} />
      </View>
      <View style={styles.progressContainer}>
        <Progress.Bar progress={0.6} width={scale(250)} color={Colors.lightPurple} unfilledColor={Colors.silver} borderWidth={0} />
      </View>
      <View style={styles.bottomView}>
        <View style={styles.leftBottomView} >
          <View style={styles.dotPurple}>
          </View>
          <Text style={styles.labelValue}>
            {item.quality}
            </Text>
            <Text style={styles.bottomLabel}>
              {'Quality'}
            </Text>
        </View>
        <View style={styles.middleBottomView} >
          <View style={styles.dotLightBlue}>
          </View>
          <Text style={styles.labelValue}>
            {item.momentum}
            </Text>
            <Text style={styles.bottomLabel}>
              {'Momentum'}
            </Text>
        </View>
        <View style={styles.rightBottomView} >
          <View style={styles.dotLightPurple}>
          </View>
          <Text style={styles.labelValue}>
            {item.value}
            </Text>
            <Text style={styles.bottomLabel}>
              {'Value'}
            </Text>
        </View>
      </View>
    </View >

  }

  return (
    <View style={styles.mainContainer}>
    {Platform.OS === 'ios'  ? <StatusBar translucent barStyle="dark-content" />: 
    
    <StatusBar backgroundColor="white" barStyle="dark-content" />
    }  
      <View style={styles.horizontalTopContainer}>
        <View style={styles.leftTopContainer}>

          <Text style={styles.titleStyle}>Discover</Text>
          <Image source={Images.icInfo} style={styles.infoImage} />
        </View>
        <View style={styles.rightTopContainer}>
          <Image source={Images.icSearch} style={styles.searchImage} />
        </View>
      </View>
      
      <ScrollView>
        <View style={styles.secondContainer}>
        <View style={styles.content} >
            <View style={styles.switchpanel} >
              <Button {...stocksButtonProps}
                title='Stocks'
                type='solid'
                onPress={() => switchTab('stocks')} />

              <Button {...strategyButtonProps}
                title='Strategies'
                type='solid'
                onPress={() => switchTab('strategy')} />
            </View>
          </View>
          <View style={styles.horizontalTopButtonCon}>
          <TouchableOpacity style={styles.filterStyle} activeOpacity={0.5}>
            <View style={styles.SeparatorLine} />
            <Text style={styles.textStyle}> Filter by </Text>
            <Image
              source={Images.icFilter}
              style={styles.ImageIconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortStyle} activeOpacity={0.5}>
            <View style={styles.SeparatorLine} />
            <Text style={styles.textStyle}> Sort by </Text>
            <Image
              source={Images.icSort}
              style={styles.ImageIconStyle}
            />
          </TouchableOpacity>
          </View>
          <View style={styles.qualityContainer}>
            <Button buttonStyle={styles.filterbutton}
            titleStyle={styles.filterbuttontext}
            title='Top Quality'
                type='solid'/>
            <Button buttonStyle={styles.filterbutton}
            titleStyle={styles.filterbuttontext}
            title='Best Value'
                type='solid'/>
            <Button buttonStyle={styles.filterbutton}
            titleStyle={styles.filterbuttontext}
            title='Greatest Momentum'
                type='solid'/>
            <Button buttonStyle={styles.filterbutton}
            titleStyle={styles.filterbuttontext}
            title='Sustainability'
                type='solid'/>
            <Button buttonStyle={styles.filterbutton}
            titleStyle={styles.filterbuttontext}
            title='Top in UK'
                type='solid'/>
            <Button buttonStyle={styles.filterbutton}
            titleStyle={styles.filterbuttontext}
            title='Freetrade'
                type='solid'/>
            <Button buttonStyle={styles.filterbutton}
            titleStyle={styles.filterbuttontext}
            title='All'
                type='solid'/>
          </View>

          <Image source={Images.icDottedBorder} resizeMode='contain' style={styles.stragedyImage} />
          <View style={styles.watchListContainer}>
            <Text style={styles.titleStyle}>WatchList</Text>
            <Image source={Images.icInfo} style={styles.infoImage} />
          </View>
        </View>
  <View>

  <FlatList
          style={styles.listContainer}
          data={data}
          renderItem={renderItem}
          contentContainerStyle={{flexGrow: 1}}
          ListFooterComponentStyle={{flex:1, justifyContent: 'flex-end'}}
          ListFooterComponent={<View style={{height:100,width:100}}></View>}
        />
    </View>        
      </ScrollView>
    </View>

  );
};

const data = [
  {
    id: 0,
    title: 'TSLA ',
    short_desc: 'TSLA Inc',
    quality: -421,
    momentum: '-8,256',
    value:'-2346',
    imageLogo: Images.icTestla,

  },
  {
    id: 1,
    title: 'DOW',
    quality: -421,
    momentum: '-8,256',
    value:'-2346',
    short_desc: 'Dow jones Ind',
    imageLogo: Images.icDow,

  },
]

DiscoverScreen.navigationOptions = {
  header: () => false,
  title: 'Discover'
};

export default DiscoverScreen;