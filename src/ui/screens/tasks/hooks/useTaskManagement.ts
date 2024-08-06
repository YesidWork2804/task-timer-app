import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "@/src/domain/task/models/task";
import { useTaskNotifications } from "@/src/ui/hooks/UseTaskNotifications";

export const useTaskManagement = (taskId?: string) => {
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    dateTime: new Date(),
    completed: false,
  });

  const { scheduleNotification } = useTaskNotifications();

  useEffect(() => {
    if (taskId) {
      loadTask();
    }
  }, [taskId]);

  const loadTask = async () => {
    try {
      const tasksJson = await AsyncStorage.getItem("tasks");
      if (tasksJson) {
        const tasks: Task[] = JSON.parse(tasksJson);
        const task = tasks.find((t) => t.id === taskId);
        if (task) {
          setInitialValues({
            title: task.title,
            description: task.description,
            dateTime: new Date(task.dateTime),
            completed: task.completed,
          });
        }
      }
    } catch (error) {
      console.error("Error al cargar la tarea:", error);
    }
  };

  const handleSubmit = async (values: {
    title: string;
    description: string;
    dateTime: Date;
    completed: boolean;
  }) => {
    try {
      const tasksJson = await AsyncStorage.getItem("tasks");
      let tasks: Task[] = tasksJson ? JSON.parse(tasksJson) : [];

      let newTask: Task;

      if (taskId) {
        tasks = tasks.map((task) =>
          task.id === taskId ? { ...task, ...values } : task
        );
        newTask = { ...tasks.find((task) => task.id === taskId)!, ...values };
      } else {
        newTask = {
          id: Date.now().toString(),
          ...values,
        };
        tasks.push(newTask);
      }

      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      await scheduleNotification(newTask);

      return true;
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
      return false;
    }
  };

  return { initialValues, handleSubmit };
};
