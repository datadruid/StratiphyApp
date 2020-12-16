// import React, { useState} from 'react';
// import { ScrollView, StyleSheet, StatusBar, Image, FlatList, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
// import { Button } from 'react-native-elements';
// import * as Progress from 'react-native-progress';

// import styles from '../../styles'
// const StocksTab = () => {

//     const  renderItem = ({ item }) => {

//         return <View style={styles.listItem}>
//           <View style={styles.titleTop}>
//             <View style={styles.leftContainer} >
//               <Image source={item.imageLogo} style={styles.logoImage} />
//             </View>
//             <View style={styles.midlleContainer} >
//               <Text style={styles.cardTitle}>{item.title}</Text>
//               <Text style={styles.cardDescription}>{item.short_desc}</Text>
//             </View>
//             <View style={styles.rightContainer} >
//               <Image source='../Images/Icons/icLeaf.png' style={styles.leafImage} />
//               <Image source='../Images/Icons/icStar.png' style={styles.starImage} />
//             </View>
//           </View>
//           <View style={styles.progressContainer}>
//             <Progress.Bar progress={0.6} width={250} color='#7c40ff' unfilledColor='#d8dadb' borderWidth={0} />
//           </View>
//           <View style={styles.progressContainer}>
//             <Progress.Bar progress={0.7} width={250} color='#376cff' unfilledColor='#d8dadb' borderWidth={0} />
//           </View>
//           <View style={styles.progressContainer}>
//             <Progress.Bar progress={0.6} width={250} color='#c670f5' unfilledColor='#d8dadb' borderWidth={0} />
//           </View>
//           <View style={styles.bottomView}>
//             <View style={styles.leftBottomView} >
//               <View style={styles.dotPurple}>
//               </View>
//               <Text style={styles.labelValue}>
//                 {item.quality}
//                 </Text>
//                 <Text style={styles.bottomLabel}>
//                   {'Quality'}
//                 </Text>
//             </View>
//             <View style={styles.middleBottomView} >
//               <View style={styles.dotLightBlue}>
//               </View>
//               <Text style={styles.labelValue}>
//                 {item.momentum}
//                 </Text>
//                 <Text style={styles.bottomLabel}>
//                   {'Momentum'}
//                 </Text>
//             </View>
//             <View style={styles.rightBottomView} >
//               <View style={styles.dotLightPurple}>
//               </View>
//               <Text style={styles.labelValue}>
//                 {item.value}
//                 </Text>
//                 <Text style={styles.bottomLabel}>
//                   {'Value'}
//                 </Text>
//             </View>
//           </View>
//         </View >
    
//       }
//   return (
//     <>
//  <ScrollView>
//         <View style={styles.secondContainer}>
//         <View style={styles.content} >
//             <View style={styles.switchpanel} >
//               <Button {...stocksButtonProps}
//                 title='Stocks'
//                 type='solid'
//                 onPress={() => switchTab('stocks')} />

//               <Button {...strategyButtonProps}
//                 title='Strategies'
//                 type='solid'
//                 onPress={() => switchTab('strategy')} />
//             </View>
//           </View>
//           <View style={styles.horizontalTopButtonCon}>
//           <TouchableOpacity style={styles.filterStyle} activeOpacity={0.5}>
//             <View style={styles.SeparatorLine} />
//             <Text style={styles.textStyle}> Filter by </Text>
//             <Image
//               source='../Images/Icons/icFilter.png'
//               style={styles.ImageIconStyle}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.sortStyle} activeOpacity={0.5}>
//             <View style={styles.SeparatorLine} />
//             <Text style={styles.textStyle}> Sort by </Text>
//             <Image
//               source='../Images/Icons/icSort.png'
//               style={styles.ImageIconStyle}
//             />
//           </TouchableOpacity>
//           </View>
//           <View style={styles.qualityContainer}>
//             <Button buttonStyle={styles.filterbutton}
//             titleStyle={styles.filterbuttontext}
//             title='Top Quality'
//                 type='solid'/>
//             <Button buttonStyle={styles.filterbutton}
//             titleStyle={styles.filterbuttontext}
//             title='Best Value'
//                 type='solid'/>
//             <Button buttonStyle={styles.filterbutton}
//             titleStyle={styles.filterbuttontext}
//             title='Greatest Momentum'
//                 type='solid'/>
//             <Button buttonStyle={styles.filterbutton}
//             titleStyle={styles.filterbuttontext}
//             title='Sustainability'
//                 type='solid'/>
//             <Button buttonStyle={styles.filterbutton}
//             titleStyle={styles.filterbuttontext}
//             title='Top in UK'
//                 type='solid'/>
//             <Button buttonStyle={styles.filterbutton}
//             titleStyle={styles.filterbuttontext}
//             title='Freetrade'
//                 type='solid'/>
//             <Button buttonStyle={styles.filterbutton}
//             titleStyle={styles.filterbuttontext}
//             title='All'
//                 type='solid'/>
//           </View>

          
//           <View style={styles.watchListContainer}>
//             <Text style={styles.titleStyle}>WatchList</Text>
//             <Image source='../Images/Icons/ic_Info.png' style={styles.infoImage} />
//           </View>
//         </View>
//   <View>

//   <FlatList
//           style={styles.listContainer}
//           data={data}
//           renderItem={renderItem}
//           contentContainerStyle={{flexGrow: 1}}
//           ListFooterComponentStyle={{flex:1, justifyContent: 'flex-end'}}
//           ListFooterComponent={<View style={{height:100,width:100}}></View>}
//         />
//     </View>        
//       </ScrollView>
//     </>
//   )
// };

// // const styles = StyleSheet.create({

// // });

// export default StocksTab;