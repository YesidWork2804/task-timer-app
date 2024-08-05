import { Colors } from "@/constants/Colors";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

export const TitleText = (props: {
  title: string;
  color?: string;
  fontSize?: number;
  fontWeight?: string;
  textAlign?: string;
  marginTop?: number;
  marginBottom?: number;
}) => {
  const styles = StyleSheet.create({
    title: {
      fontSize: props.fontSize || 24,
      color: props.color || Colors.primary,
      fontWeight: "600",
      textAlign: "center",
      marginTop: props.marginTop || 20,
      marginBottom: props.marginBottom || 20,
    },
  });
  return <Text style={styles.title}>{props.title}</Text>;
};
