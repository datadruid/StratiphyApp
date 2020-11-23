import React, { useState } from "react";
import { View } from "react-native";
import { Layout, Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import Animated, {
  call,
  divide,
  floor,
  onChange,
  useCode,
} from "react-native-reanimated";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import moment from "moment";

import { Candle } from "./Candle";
import Row from "./Row";

const themedStyles = StyleService.create({
  layout: {
    
  },
  table: {
    flexDirection: "row",
    padding: 16,
  },
  date: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
  },
  column: {
    flex: 1,
  },
  separator: {
    width: 16,
  },
});

const formatInt = (value: number) => {
  const t = Math.floor(value / 1000);
  return t < 1 ? t : `${t}, ${value % 1000}`;
};

const formatValue = (value: number) => {
  const int = Math.floor(value);
  const dec = Math.floor((value - int) * 100);
  const formattedDec = dec === 0 ? "00" : dec < 10 ? `0${dec}` : `${dec}`;
  return `$ ${formatInt(int)}.${formattedDec}`;
};

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

interface HeaderProps {
  translateX: Animated.Node<number>;
  caliber: number;
  candles: Candle[];
}

export default ({ translateX, caliber, candles }: HeaderProps) => {
  const [{ date, open, close, high, low }, setCandle] = useState(candles[0]);
  const styles = useStyleSheet(themedStyles);
  useCode(
    () =>
      onChange(
        translateX,
        call([floor(divide(translateX, caliber))], ([index]) => {
          ReactNativeHapticFeedback.trigger("impactLight", hapticOptions);
          setCandle(candles[index]);
        })
      ),
    [caliber, candles, translateX]
  );
  const diff = `${((close - open) * 100) / open}`;
  const change = close - open < 0 ? diff.substring(0, 5) : diff.substring(0, 4);
  return (
    <View style={styles.layout}>
      <View style={styles.table}>
        <View style={styles.column}>
          <Row label="Open" value={formatValue(open)} />
          <Row label="Close" value={formatValue(close)} />
          <Row label="Volume" value="" />
        </View>
        <View style={styles.separator} />
        <View style={styles.column}>
          <Row label="High" value={formatValue(high)} />
          <Row label="Low" value={formatValue(low)} />
          <Row
            label="Change"
            value={`${change}%`}
            color={close - open > 0 ? "#4AFA9A" : "#E33F64"}
          />
        </View>
      </View>
      <Text style={styles.date}>
        {moment(date).format("h:mm MMM Do, YYYY")}
      </Text>
    </View>
  );
};
