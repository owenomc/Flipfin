import React from "react";
import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Slot /> {/* This renders the current page */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8fa",
  },
  content: {
    flex: 1,
  },
});
