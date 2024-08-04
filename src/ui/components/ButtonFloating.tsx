import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

interface Props {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  size: number;
}

export const ButtonFloating = (props: Props) => {
  const { onPress, icon, size } = props;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonFloating,
        { backgroundColor: pressed ? Colors.primary : Colors.hoverPrimary }, // Cambia el color cuando se presiona
      ]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={size} color="white" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  body: {
    fontSize: 20,
    color: "#333333",
    textAlign: "center",
    marginVertical: 10,
  },
  buttonFloating: {
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 30,
    height: 60,
    width: 60,
    backgroundColor: "#04948A",
    justifyContent: "center",
    alignItems: "center",
  },
});
