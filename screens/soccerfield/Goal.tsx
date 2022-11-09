import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Goal() {
  return (
    <View style={styles.container}>
      <Text>Goal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "50%",
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
  },
});
