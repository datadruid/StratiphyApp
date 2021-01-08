import React, {useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const RadioButtons = ({ options, selectedId, selectedAction, parentItem }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(selectedId);

    const optionselected = (option) => {
      setSelectedIndex(option.id);
      selectedAction(parentItem, option);
    };

    return (
        <>
              {options.map(option => {
                return (
                    <View key={option.id} style={styles.buttonContainer}>

                    <Text style={styles.buttonlabel}>{option.label}</Text>
                    <TouchableOpacity
                                            style={styles.circle}
                                            onPress={() => {
                                              optionselected(option);
                                            }}
                                        >
                                            {selectedIndex === option.id && <View style={styles.checkedCircle} />}
                                        </TouchableOpacity>
                    </View>
                )
                })}
    </>
    );
  };
  
  const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'stretch',
      marginTop: 10,
      paddingBottom:10
    },
    buttonlabel: {
      marginRight: 15
    },
    container: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'stretch'
    },
    circle: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ACACAC',
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkedCircle: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: 'black',
    },
    settingcontainer: {
      flex: 1,
      paddingTop: 5,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    settingheadercontainer: {
      flex: 1,
      paddingRight: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    settingtext: {
      paddingTop: 10,
      paddingBottom: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    settingtitletext: {
      textAlignVertical: "center",
      paddingLeft: 15
    },
    longdivider: {
      borderBottomColor: 'lightgrey',
      marginTop: 5,
      marginBottom: 5
    },
    shortdivider: {
      borderBottomColor: 'lightgrey',
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 20
    },
    spacer: {
      margin: 10
    },
    icon: {
      paddingTop: 10,
      paddingBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
    },
  });
  
  export default RadioButtons;