import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadTasks = async (): Promise<Task[]> => {
  try {
    const tasksJson = await AsyncStorage.getItem("tasks");
    return tasksJson ? JSON.parse(tasksJson) : [];
  } catch (error) {
    console.error("Error al cargar las tareas:", error);
    return [];
  }
};

export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error al guardar las tareas:", error);
  }
};
