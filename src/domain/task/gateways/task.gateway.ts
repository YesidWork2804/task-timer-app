import { Task } from "../models/task";

export abstract class TaskGateway {
  abstract getTasks(): Promise<Task[]>;
  abstract saveTasks(tasks: Task[]): Promise<void>;
  abstract completeTask(taskId: string): Promise<Task[]>;
  abstract deleteTask(taskId: string): Promise<Task[]>;
}
