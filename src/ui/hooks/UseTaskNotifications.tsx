import * as Notifications from "expo-notifications";

import { Alert } from "react-native";

export const useTaskNotifications = () => {
  const scheduleNotification = async (task: Task) => {
    const taskDate = new Date(task.dateTime);
    const notificationDate = new Date(taskDate.getTime() - 5 * 60 * 1000);

    if (notificationDate > new Date()) {
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Tarea a punto de acabar!",
            body: `La tarea "${task.title}" está por vencer en 5 minutos.`,
            data: { taskId: task.id },
          },
          trigger: notificationDate,
        });
      } catch (error) {
        console.error("Error al programar notificación:", error);
        // Fallback a Alert
        setTimeout(() => {
          Alert.alert(
            "Tarea a punto de acabar!",
            `La tarea "${task.title}" está por vencer en 5 minutos.`
          );
        }, notificationDate.getTime() - Date.now());
      }
    }
  };

  return { scheduleNotification };
};
