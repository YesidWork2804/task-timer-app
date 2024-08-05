import { useEffect } from "react";
import { Stack } from "expo-router";
import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  useEffect(() => {
    (async () => {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      console.log("Estado de los permisos:", finalStatus); // Log añadido aquí

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permiso requerido",
          "Las notificaciones son necesarias para el funcionamiento completo de la app.",
          [{ text: "OK" }]
        );
        return;
      }

      // Prueba de notificación con logs adicionales
      console.log("Intentando programar notificación de prueba..."); // Log añadido aquí
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Prueba de notificación",
            body: "Si ves esto, las notificaciones están funcionando correctamente.",
          },
          trigger: null,
        });
        console.log("Notificación de prueba programada con éxito"); // Log añadido aquí
      } catch (error) {
        console.error("Error al programar notificación de prueba:", error); // Log añadido aquí
      }
    })();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="form-task" options={{ headerShown: false }} />
    </Stack>
  );
}
