import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function AddTaskScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Agregar nueva tarea</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
