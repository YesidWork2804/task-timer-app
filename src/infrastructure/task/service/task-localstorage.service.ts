import { TaskGateway } from "@/src/domain/task/gateways/task.gateway";
import { Task } from "@/src/domain/task/models/task";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class TaskLocalStorageService implements TaskGateway {
  keyLocalStorage = "tasks";
  async getTasks(): Promise<Task[]> {
    try {
      const tasksJson = await AsyncStorage.getItem("tasks");
      return tasksJson ? JSON.parse(tasksJson) : [];
    } catch (error) {
      console.error("Error al cargar las tareas:", error);
      return [];
    }
  }

  async saveTasks(tasks: Task[]): Promise<void> {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error al guardar las tareas:", error);
    }
  }

  async completeTask(taskId: string): Promise<Task[]> {
    const tasks = await this.getTasks();
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    await this.saveTasks(updatedTasks);
    return updatedTasks;
  }

  async deleteTask(taskId: string): Promise<Task[]> {
    const tasks = await this.getTasks();
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    await this.saveTasks(updatedTasks);
    return updatedTasks;
  }
}
