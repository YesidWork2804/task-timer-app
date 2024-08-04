import * as Notifications from "expo-notifications";

export const useTaskNotifications = () => {
  const scheduleNotification = async (task: Task) => {
    const taskDate = new Date(task.dateTime);
    const notificationDate = new Date(taskDate.getTime() - 5 * 60 * 1000);

    if (notificationDate > new Date()) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Tarea a punto de acabar!",
          body: `La tarea "${task.title}" está por vencer en 5 minutos.`,
          data: { taskId: task.id },
        },
        trigger: notificationDate,
      });
    }
  };

  return { scheduleNotification };
};
