import React from "react";
import { StyleSheet, View } from "react-native";
import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView } from "react-native-safe-area-context";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { useNavigation } from "react-navigation-hooks";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 16,
  },
  rightColumn: {
    flex: 1,
  },
  leftColumn: {
    flex: 1,
    alignItems: "flex-end",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  tabContainer: {
    backgroundColor: "#222324",
    borderRadius: 8,
    flexDirection: "row",
  },
  tab: {
    padding: 8,
  },
  tabLabel: {
    fontSize: 14,
    fontVariant: ["tabular-nums"],
  },
  tabLabelActive: {
    fontSize: 14,
    fontVariant: ["tabular-nums"],
    fontWeight: "500",
  },
});

const Tabs = ({ tabs }: { tabs: string[] }) => (
  <Layout style={styles.tabContainer}>
    {tabs.map((tab, index) => (
      <View style={styles.tab} key={index}>
        <Text style={index === 0 ? styles.tabLabelActive : styles.tabLabel}>
          {tab.toUpperCase()}
        </Text>
      </View>
    ))}
  </Layout>
);

export default () => {
  const { goBack } = useNavigation();
  return (
    <Layout style={StyleSheet.absoluteFill}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Icon.Button
              name="arrow-left"
              color="#d3d3d3"
              size={32}
              style={styles.icon}
              onPress={() => goBack()}
              backgroundColor="transparent"
            />
            <View style={styles.rightColumn}>
              <Text style={styles.title}>ABC.L</Text>
              <Text style={styles.subtitle}>2.2k 24hr vol</Text>
            </View>
            <View style={styles.leftColumn}>
              <Text style={styles.title}>$7,543.12</Text>
              <Text style={[styles.subtitle, { color: "#4AFA9A" }]}>
                +5.11%
              </Text>
            </View>
          </View>
          
        </View>
      </SafeAreaView>
    </Layout>
  );
};
