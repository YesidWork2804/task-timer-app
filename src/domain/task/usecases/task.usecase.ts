import { TaskGateway } from "../gateways/task.gateway";
import { Task } from "../models/task";
export class TaskUseCase {
  constructor(private _taskGateway: TaskGateway) {}

  getTasks(): Promise<Task[]> {
    return this._taskGateway.getTasks();
  }

  saveTasks(tasks: Task[]): Promise<void> {
    return this._taskGateway.saveTasks(tasks);
  }

  completeTask(taskId: string): Promise<Task[]> {
    return this._taskGateway.completeTask(taskId);
  }

  deleteTask(taskId: string): Promise<Task[]> {
    return this._taskGateway.deleteTask(taskId);
  }
}
