import { taskRepository } from "@/src/infrastructure/task/service/task.service";
import { useState, useCallback } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = useCallback((newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    taskRepository.saveTask(newTask);
  }, []);

  // Aquí puedes agregar más funciones como deleteTask, updateTask, etc.

  return { tasks, addTask };
}
