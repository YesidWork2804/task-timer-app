import React from "react";
import { View, Text } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { stylesHome } from "@/src/ui/styles/homePageStyles";
import { Colors } from "@/constants/Colors";

const EmptyTasksMessage: React.FC = () => {
  return (
    <View style={stylesHome.centeredContainer}>
      <FontAwesome6 name="list-check" size={50} color={Colors.primary} />
      <Text style={stylesHome.body}>
        No hay tareas creadas.{"\n"}
        <Text style={{ color: Colors.primary, fontWeight: "600" }}>
          Crea tu primera tarea.
        </Text>
      </Text>
    </View>
  );
};
export default EmptyTasksMessage;
