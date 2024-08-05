import {
  loadTasks,
  saveTasks,
} from "@/src/infrastructure/task/service/task.service";
import { Task } from "../models/task";

export const getTasks = loadTasks;

export const completeTask = async (taskId: string): Promise<Task[]> => {
  const tasks = await loadTasks();
  const updatedTasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: true } : task
  );
  await saveTasks(updatedTasks);
  return updatedTasks;
};

export const deleteTask = async (taskId: string): Promise<Task[]> => {
  const tasks = await loadTasks();
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  await saveTasks(updatedTasks);
  return updatedTasks;
};
