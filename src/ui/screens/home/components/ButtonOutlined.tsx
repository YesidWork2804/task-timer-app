import { Colors } from "@/constants/Colors";
import React from "react";
import { TouchableOpacity, Text, Platform, StyleSheet } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

export const ButtonOutlined = (props: {
  task: Task;
  handleTaskPress: (task: Task) => void;
}) => {
  const { task } = props;

  return <View></View>;
};

const styles = StyleSheet.create({});
