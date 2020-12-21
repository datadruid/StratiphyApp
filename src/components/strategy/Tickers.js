import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import TagInput from 'react-native-tags-input';
import Spacer from '../../components/Spacer';
import { Context as UpdateContext } from '../../context/StrategyUpdateContext';

const Sectors = ({ strategy }) => {
  const { state, updateTickers } = useContext(UpdateContext);
  const [intics, setIntics] = useState({
    tag: '',
    tagsArray: strategy.tickers.tickersInclude.map(a => a.tag)
  });
  const [outtics, setOuttics] = useState({
    tag: '',
    tagsArray: strategy.tickers.tickersExclude.map(a => a.tag)
  });

  const setInclude = (sectors) => {
    setIntics(sectors);
    setTickers();
  }

  const setExclude = (sectors) => {
    setOuttics(sectors);
    setTickers();
  }

  const setTickers = () => {
    var include = [];
    intics.tagsArray.forEach(x =>
      include.push({ 'tag': x } )
    );
    var exclude = [];
    outtics.tagsArray.forEach(x =>
      exclude.push({ 'tag': x } )
    );
    console.log(include);
    let tickers = {
      tickersInclude: include,
      tickersExclude: exclude
    };
    updateTickers(tickers);
  };

  return (
    <>
      <Spacer />
      <View style={styles.settingheadercontainer}>
        <Text style={styles.settingtitletext} category='h6' status='default'>Tickers</Text>
        <Icon style={styles.icon} size={18} name='info-circle' />
      </View>

      <Divider style={styles.longdivider} />
      <View style={styles.settingcontainer}>
        <Text style={styles.settingtext} category='p1' status='default'>Tickers to include</Text>
        <View style={styles.multicontainer}>
          <TagInput style={styles.tagInput}
            containerStyle={styles.tagContainer}
            placeholder="type to include ticker..."
            updateState={setInclude}
            tags={intics}
            tagStyle={styles.tag}
            onBlur={setTickers}
          />
        </View>
      </View>
      <Divider style={styles.shortdivider} />
      <View style={styles.settingcontainer}>
        <Text style={styles.settingtext} category='p1' status='default'>Tickers to exclude</Text>
        <View style={styles.multicontainer}>
          <TagInput style={styles.tagInput}
            containerStyle={styles.tagContainer}
            placeholder="type to exclude ticker..."
            updateState={setExclude}
            tags={outtics}
            tagStyle={styles.tag}
            onBlur={setTickers}
          />
        </View>
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  tagInput: {
    marginTop: 12,
    marginLeft: 5,
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
    color: '#FFC234'
  },
  tag: {
    backgroundColor: 'white'
  }
});

export default Sectors;