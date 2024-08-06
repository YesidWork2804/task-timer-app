import { TaskUseCase } from "@/src/domain/task/usecases/task.usecase";
import { TaskLocalStorageService } from "@/src/infrastructure/task/service/task-localstorage.service";

export const taskApi = new TaskUseCase(new TaskLocalStorageService());
