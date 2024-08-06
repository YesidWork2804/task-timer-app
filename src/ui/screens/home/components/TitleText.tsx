import { StyleProp, Text, TextStyle } from "react-native";
import { StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";

interface Props {
  title: string;
  style?: StyleProp<TextStyle>;
}

export const TitleText = ({ title, style }: Props) => {
  return <Text style={[styles.title, style]}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});
