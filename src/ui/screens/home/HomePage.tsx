import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ButtonFloating } from "../../components/ButtonFloating";
import { FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function HomePage() {
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Tareas</Text>
      </View>
      <View style={styles.centeredContainer}>
        <FontAwesome6 name="list-check" size={50} color={Colors.primary} />
        <Text style={styles.body}>
          No hay tareas creadas.{"\n"}
          <Text
            style={{
              color: Colors.primary,
              fontWeight: "600",
            }}
          >
            Crea tu primera tarea.
          </Text>
        </Text>
      </View>
      <ButtonFloating
        icon="add"
        onPress={() => router.push("/add-task")}
        size={28}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    color: "black",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    fontSize: 20,
    color: "#333333",
    textAlign: "center",
    marginVertical: 10,
  },
});
