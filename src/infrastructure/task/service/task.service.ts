class TaskRepository {
  async saveTask(task: Task): Promise<void> {
    // Aquí implementarías la lógica para guardar la tarea
    // Por ejemplo, usando AsyncStorage o una API
    console.log("Guardando tarea:", task);
  }

  // Implementa más métodos según sea necesario
}

export const taskRepository = new TaskRepository();
