import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native';
import { Layout, Input, Card, List, Text, Button, ButtonGroup, Toggle, RadioGroup, Radio, CheckBox, Datepicker, Divider } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Slider from '@react-native-community/slider';
import TagInput from 'react-native-tags-input';
import Spacer from '../components/Spacer';
import { LineChart } from "react-native-chart-kit";

const chartConfig = {
  backgroundColor: "",
  backgroundGradientFrom: "",
  backgroundGradientTo: "",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 0
  }
};

const StrategyDetailScreen = ({ navigation }) => {
  const item = navigation.getParam('item');
  const [intags, setIntags] = useState({
    tag: '',
    tagsArray: ['All']
  });
  const [outtags, setOuttags] = useState({
    tag: '',
    tagsArray: ['Utilities']
  });
  const [intics, setIntics] = useState({
    tag: '',
    tagsArray: ['FTSE 100']
  });
  const [outtics, setOuttics] = useState({
    tag: '',
    tagsArray: ['III.L', 'TW.L', 'BT.A.L']
  });

  updateTagState = (state) => {
    //console.log(state);
    //setTags()
  };

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Layout style={styles.layoutcontainer}>
        <Spacer />
        <Text style={styles.text} category='h5' status='default'>{item.strategyName}</Text>
        <ScrollView >
          <View style={styles.chartcontainer}>
          <LineChart
      data={{
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            data: [
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10,
              Math.random() * 10
            ],color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
            ,strokeWidth: "2"
                    }
        ]
      }}
      withDots ={false}
      withShadow={false}
      withInnerLines={false}
      width={350} // from react-native
      height={220}
      yAxisLabel="£"
      //yAxisSuffix="k"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={chartConfig}
      bezier
      style={{
        flex: 1,
        marginVertical: 8,
        borderRadius: 0,
        margin: 0
      }}
    />
          </View>
          <Spacer />
          <Text style={styles.text} status='default'>{item.strategyDescription}</Text>
          <Divider style={styles.shortdivider} />
          <Spacer />

          <View style={styles.settingheadercontainer}>
            <Text style={styles.settingtitletext} category='h6' status='default'>Strategy type</Text>
            <Icon style={styles.icon} size={18} name='info-circle' />
          </View>
          <Divider style={styles.longdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Momentum</Text>
            <Icon style={styles.icon} size={20} name='chevron-right' />
          </View>
          <Divider style={styles.longdivider} />

          <Spacer />
          <View style={styles.settingheadercontainer}>
            <Text style={styles.settingtitletext} category='h6' status='default'>Simulation Timing</Text>
            <Icon style={styles.icon} size={18} name='info-circle' />
          </View>

          <Divider style={styles.longdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Time Horizon</Text>
            <RadioGroup
            // selectedIndex={selectedIndex}
            // onChange={index => setSelectedIndex(index)}
            >
              <Radio>Short term</Radio>
              <Radio>Medium term</Radio>
              <Radio>Long term</Radio>
            </RadioGroup>
          </View>
          <Divider style={styles.longdivider} />

          <Spacer />
          <View style={styles.settingheadercontainer}>
            <Text style={styles.settingtitletext} category='h6' status='default'>Timings</Text>
          <Icon style={styles.icon} size={18} name='info-circle'/>
        </View>
          
          <Divider style={styles.longdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Backtesting start date</Text>
            <Datepicker
            //date={date}
            //onSelect={nextDate => setDate(nextDate)}
            />
          </View>
          <Divider style={styles.shortdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Email updates</Text>
            <RadioGroup
            // selectedIndex={selectedIndex}
            // onChange={index => setSelectedIndex(index)}
            >
              <Radio>Never</Radio>
              <Radio>Daily</Radio>
              <Radio>Weekly</Radio>
            </RadioGroup>
          </View>
          <Divider style={styles.longdivider} />
          <Spacer />
          <View style={styles.settingheadercontainer}>
            <Text style={styles.settingtitletext} category='h6' status='default'>Regions</Text>
          <Icon style={styles.icon} size={18} name='info-circle'/>
        </View>
          
          <Divider style={styles.longdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Select regions</Text>
            <View >
              <CheckBox style={styles.checkboxgroup}
              // checked={checked}
              // onChange={nextChecked => setChecked(nextChecked)}
              >United Kindom
                </CheckBox>
              <CheckBox style={styles.checkboxgroup}
              // checked={checked}
              // onChange={nextChecked => setChecked(nextChecked)}
              >Europe
                </CheckBox>
              <CheckBox style={styles.checkboxgroup}
              // checked={checked}
              // onChange={nextChecked => setChecked(nextChecked)}
              >North America
                </CheckBox>
              <CheckBox style={styles.checkboxgroup}
              // checked={checked}
              // onChange={nextChecked => setChecked(nextChecked)}
              >South America
                </CheckBox>
              <CheckBox style={styles.checkboxgroup}
              // checked={checked}
              // onChange={nextChecked => setChecked(nextChecked)}
              >Middle East
                </CheckBox>
              <CheckBox style={styles.checkboxgroup}
              // checked={checked}
              // onChange={nextChecked => setChecked(nextChecked)}
              >Asia
                </CheckBox>
              <CheckBox style={styles.checkboxgroup}
              // checked={checked}
              // onChange={nextChecked => setChecked(nextChecked)}
              >Australia
                </CheckBox>
              <CheckBox style={styles.checkboxgroup}
              // checked={checked}
              // onChange={nextChecked => setChecked(nextChecked)}
              >Africa
                </CheckBox>
            </View>

          </View>
          <Divider style={styles.longdivider} />
          <Spacer />
          <View style={styles.settingheadercontainer}>
            <Text style={styles.settingtitletext} category='h6' status='default'>Asset Classes</Text>
          <Icon style={styles.icon} size={18} name='info-circle'/>
        </View>
          
          <Divider style={styles.longdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Select classes</Text>
            <View>
              <View style={styles.settingcontainer}>
                <Text tyle={styles.settingtext} category='label' status='default'>Stocks</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  value={33}
                />
                <Text tyle={styles.settingtext} category='label' status='default'>33%</Text>
              </View>
              <View style={styles.settingcontainer}>
                <Text tyle={styles.settingtext} category='label' status='default'>Bonds</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  value={33}
                />
                <Text tyle={styles.settingtext} category='label' status='default'>33%</Text>
              </View>
              <View style={styles.settingcontainer}>
                <Text tyle={styles.settingtext} category='label' status='default'>Funds</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  value={33}
                />
                <Text tyle={styles.settingtext} category='label' status='default'>33%</Text>
              </View>
            </View>
          </View>

          <Divider style={styles.longdivider} />
          <Spacer />
          <View style={styles.settingheadercontainer}>
            <Text style={styles.settingtitletext} category='h6' status='default'>Market Caps</Text>
          <Icon style={styles.icon} size={18} name='info-circle'/>
        </View>
          <Divider style={styles.longdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Select Caps</Text>
            <View style={styles.multicontainer}>
              <View style={styles.settingcontainer}>
                <Text tyle={styles.settingtext} category='label' status='default'>Small Cap</Text>
                <Toggle />
              </View>
              <View style={styles.settingcontainer}>
                <Text tyle={styles.settingtext} category='label' status='default'>Mid Cap</Text>
                <Toggle />
              </View>
              <View style={styles.settingcontainer}>
                <Text tyle={styles.settingtext} category='label' status='default'>Large Cap</Text>
                <Toggle />
              </View>
              <View style={styles.settingcontainer}>
                <Text tyle={styles.settingtext} category='label' status='default'>Supras Cap</Text>
                <Toggle />
              </View>
            </View>
          </View>
          <Divider style={styles.longdivider} />

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
                updateState={this.updateTagState}
                tags={intags}
              />
            </View>
          </View>
          <Divider style={styles.shortdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Excude Sectors</Text>
            <View style={styles.multicontainer}>
              <TagInput style={{ borderBottomColor: 'white' }}
                updateState={this.updateTagState}
                tags={outtags}
              />
            </View>
          </View>
          <Divider style={styles.longdivider} />
          <Spacer />

          <View style={styles.settingheadercontainer}>
            <Text style={styles.settingtitletext} category='h6' status='default'>Tickers</Text>
          <Icon style={styles.icon} size={18} name='info-circle'/>
        </View>
          
          <Divider style={styles.longdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Tickers to include</Text>
            <View style={styles.multicontainer}>
              <TagInput style={{ borderBottomColor: 'white' }}
                updateState={this.updateTagState}
                tags={intics}
              />
            </View>
          </View>
          <Divider style={styles.shortdivider} />
          <View style={styles.settingcontainer}>
            <Text style={styles.settingtext} category='p1' status='default'>Tickers to exclude</Text>
            <View style={styles.multicontainer}>
              <TagInput style={{ borderBottomColor: 'white' }}
                updateState={this.updateTagState}
                tags={outtics}
              />
            </View>
          </View>
          <Divider style={styles.longdivider} />
          <Spacer />
          <Divider style={styles.longdivider} />


        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  layoutcontainer: {
    height: '100%'
  },
  multicontainer: {
    flex: 1,
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
  checkboxgroup: {
    paddingVertical: 5

  },
  chartcontainer:{
    paddingHorizontal: 20
  },
  text: {
    paddingLeft: 20
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
  icon: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  slider: {
    width: 200,
  }
});

StrategyDetailScreen.navigationOptions = {
  title: 'Strategy Detail'
};

export default StrategyDetailScreen;
