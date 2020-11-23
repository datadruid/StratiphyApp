import React , { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Layout, Card, List, Text } from '@ui-kitten/components';
import { Context as StrategyContext } from '../context/StrategyContext';

import data from "../components/chart/data.json";
import Chart, { size } from "../components/chart/Chart";
import Values from "../components/chart/Values";
import Line from "../components/chart/Line";
import Label from "../components/chart/Label";
import { Candle } from "../components/chart/Candle";
import Content from "../components/chart/Content";
import Header from "../components/chart/Header";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  add,
  diffClamp,
  eq,
  modulo,
  sub,
} from "react-native-reanimated";
import { onGestureEvent, useValues } from "react-native-redash/lib/module/v1";

const candles = data.slice(0, 20);
const getDomain = (rows: Candle[]): [number, number] => {
  const values = rows.map(({ high, low }) => [high, low]).flat();
  return [Math.min(...values), Math.max(...values)];
};
const domain = getDomain(candles);

const TickerDetalScreen = ({ navigation }) => {
    const [x, y, state] = useValues(0, 0, State.UNDETERMINED);
    const gestureHandler = onGestureEvent({
      x,
      y,
      state,
    });
    const caliber = size / candles.length;
    const translateY = diffClamp(y, 0, size);
    const translateX = add(sub(x, modulo(x, caliber)), caliber / 2);
    const opacity = eq(state, State.ACTIVE);


  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Layout style={styles.layoutcontainer}>
      <Text tyle={styles.text} category='h4' status='default'>ABC.L</Text>
      <View>
      <Header />
        <Animated.View style={{ opacity }} pointerEvents="none">
          <Values {...{ candles, translateX, caliber }} />
        </Animated.View>
      </View>
      <View>
        <Chart {...{ candles, domain }} />
          
        <PanGestureHandler minDist={0} {...gestureHandler}>
          <Animated.View style={StyleSheet.absoluteFill}>
            <Animated.View
              style={{
                transform: [{ translateY }],
                opacity,
                ...StyleSheet.absoluteFillObject,
              }}
            >
              <Line x={size} y={0} />
            </Animated.View>
            <Animated.View
              style={{
                transform: [{ translateX }],
                opacity,
                ...StyleSheet.absoluteFillObject,
              }}
            >
              <Line x={0} y={size} />
            </Animated.View>
            {/* <Label y={translateY} {...{ size, domain, opacity }} /> */}
          </Animated.View>
        </PanGestureHandler>
            
      </View>
        
  </Layout>
    </SafeAreaView>
  );
};

TickerDetalScreen.navigationOptions = {
  header: () => false,
  title: 'Strategies'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  layoutcontainer: {
    height: '100%'
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 7,
  },
  box1:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  box2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding:2
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});

export default TickerDetalScreen;
