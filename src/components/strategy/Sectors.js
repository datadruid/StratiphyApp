import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import TagInput from 'react-native-tags-input';
import Spacer from '../../components/Spacer';

const Sectors = ({ strategy }) => {
    const [intags, setIntags] = useState({
        tag: '',
        tagsArray: strategy.sectors.sectorsInclude.map(a => a.tag)
      });
      const [outtags, setOuttags] = useState({
        tag: '',
        tagsArray: strategy.sectors.sectorsExclude.map(a => a.tag)
      });

      updateTagState = (state) => {
        //console.log(state);
        //setTags()
      };

    return (
        <>
       <Spacer />
          <View style={styles.settingheadercontainer}>
            <Text style={styles.settingtitletext} category='h6' status='default'>Sectors</Text>
          <Icon style={styles.icon} size={18} name='info-circle'/>
        </View>
          
          <Divider style={styles.longdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Include Sectors</Text>
            <View style={styles.multicontainer}>
              <TagInput style={{ borderBottomColor: 'white' }}
                updateState={updateTagState}
                tags={intags}
              />
            </View>
          </View>
          <Divider style={styles.shortdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Excude Sectors</Text>
            <View style={styles.multicontainer}>
              <TagInput style={{ borderBottomColor: 'white' }}
                updateState={updateTagState}
                tags={outtags}
              />
            </View>
          </View>
          <Divider style={styles.longdivider} />
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
  
  export default Sectors;