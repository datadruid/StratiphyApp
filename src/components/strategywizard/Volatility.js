import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Button, } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import { colors } from '../modules/Colors';

const Volatility = ({ navigation, onSelected }) => {

    const onNextButtonPress = (id) => {
        if(id === 3) {
          
        } else {
          onSelected(id);
        }
      };

  const renderCard = (id, image, title, description) => {

    return (
    <TouchableOpacity style={styles.cardInfo} onPress={() => onNextButtonPress(id)}>
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
    <>
      <View style={styles.horizontalTopContainer}>
        <Text style={styles.titleStyle}>Choose your volatility threshold</Text>
        <FontAwesome style={styles.infoicon} size={20} name='info-circle' />
      </View>
      <Text style={styles.paragraph} numberOfLines={3}>{'Choose to invest in stocks with a maximum volatility according to your risk appetite.'}</Text>
      <ScrollView>
        <View style={styles.firstCard}>
          {renderCard(0, require('../../img/icons/icLowRisk.png'), 'Low Volatility', 'Low volatility stocks are safer but return less.')}
        </View>
        {renderCard(1, require('../../img/icons/icStar.png'), 'Medium Volatility', 'Medium volatility stocks include a mixed risk/return profile.')}
        {renderCard(2, require('../../img/icons/icTinder.png'), 'High Volatility', 'Potentially higher returns but with higher risks.')}
        <Text style={styles.orText}>{'OR'}</Text>
        {renderCard(3, require('../../img/icons/icPlayGreen.png'), 'Set your own level', 'Create your own volatility threshold.')}
      </ScrollView>
    </>
  )
};

const styles = StyleSheet.create({
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
      selectedcardinfo:{
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

});

export default Volatility;
