import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import TagInput from 'react-native-tags-input';
import Spacer from '../../components/Spacer';
import { Context as UpdateContext } from '../../context/StrategyUpdateContext';

const Sectors = ({ strategy }) => {
  const { state, updateSectors } = useContext(UpdateContext);

  const [intags, setIntags] = useState({
    tag: '',
    tagsArray: strategy.sectors.sectorsInclude.map(a => a.tag)
  });
  const [outtags, setOuttags] = useState({
    tag: '',
    tagsArray: strategy.sectors.sectorsExclude.map(a => a.tag)
  });

  const setInclude = (sectors) => {
    setIntags(sectors);
    setSectors();
  }

  const setExclude = (sectors) => {
    setOuttags(sectors);
    setSectors();
  }

  const setSectors = () => {
    let sectors = {
      sectorsInclude: intags.tagsArray,
      sectorsExclude: outtags.tagsArray
    }
    updateSectors(sectors);
  };

  return (
    <>
      <Spacer />
      <View style={styles.settingheadercontainer}>
        <Text style={styles.settingtitletext}>Sectors</Text>
        <Icon style={styles.icon} size={18} name='info-circle' />
      </View>

      <Divider style={styles.longdivider} />
      <View style={styles.settingcontainer}>
        <Text style={styles.settingtext}>Include Sectors</Text>
        <View style={styles.multicontainer}>
          <TagInput style={styles.tagInput}
          containerStyle={styles.tagContainer}
            placeholder="type to include sector..."
            updateState={setInclude}
            tagStyle={styles.tag}
            tags={intags}
            onBlur={setSectors}
          />
        </View>
      </View>
      <Divider style={styles.shortdivider} />
      <View style={styles.settingcontainer}>
        <Text style={styles.settingtext}>Excude Sectors</Text>
        <View style={styles.multicontainer}>
          <TagInput style={styles.tagInput}
            containerStyle={styles.tagContainer}
            placeholder="type to exclude sector..."
            updateState={setExclude}
            tags={outtags}
            tagStyle={styles.tag}
            onBlur={setSectors}
          />
        </View>
      </View>
      <Divider style={styles.longdivider} />
    </>
  );
};

const styles = StyleSheet.create({
  tagInput: {
    marginTop: 12,
    marginLeft: 15,
    width: '80%'
  },
  tagContainer: {
  width:'90%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    marginTop: 10,
    paddingBottom: 10
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
    paddingLeft: 15,
    fontWeight:'bold',
    fontSize:20
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
    color: '#FFC234'
  },
  tag: {
    backgroundColor: 'white'
  }
});

export default Sectors;