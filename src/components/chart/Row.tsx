import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Text } from '@ui-kitten/components';

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 20,
    color: "grey",
  },
  text: {
    fontSize: 20,
    fontVariant: ["tabular-nums"],
  },
});

interface RowProps {
  label: string;
  value: string;
  color?: string;
}

export default ({ label, value, color }: RowProps) => {
  return (
    <Layout style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.text}>{value}</Text>
    </Layout>
  );
};
