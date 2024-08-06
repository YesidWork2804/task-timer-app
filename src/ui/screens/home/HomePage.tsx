import React, { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { Task } from "@/src/domain/task/models/task";
import { stylesHome } from "../../styles/homePageStyles";
import { TitleText } from "./components/TitleText";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import EmptyTasksMessage from "./components/EmptyTasksMessage";
import { ButtonFloating } from "../../components/ButtonFloating";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useCountdown } from "../../hooks/UseCountdown";
import { taskApi } from "@/src/presentation/tasks/task.presentation";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [tasksCompleted, setTasksCompleted] = useState<Task[]>([]);
  const router = useRouter();

  const countdown = useCountdown(selectedTask);

  useEffect(() => {
    loadTasks();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const loadTasks = async () => {
    const loadedTasks = await taskApi.getTasks();
    setTasks(loadedTasks);
    setTasksCompleted(loadedTasks.filter((task) => task.completed));
  };

  const toggleList = () => {
    setIsListExpanded(!isListExpanded);
    setSelectedTask(null);
  };

  const handleTaskPress = (task: Task) => {
    if (selectedTask && selectedTask.id === task.id) {
      setSelectedTask(null);
      setIsListExpanded(true);
    } else {
      setSelectedTask(task);
      setIsListExpanded(false);
    }
  };

  const handleEditTask = () => {
    if (selectedTask) {
      router.push({
        pathname: "/form-task",
        params: { taskId: selectedTask.id },
      });
    }
  };

  const handleCompleteTask = async () => {
    if (selectedTask) {
      const updatedTasks = await taskApi.completeTask(selectedTask.id);
      setTasks(updatedTasks);
      setSelectedTask({ ...selectedTask, completed: true });
      router.push("/");
    }
  };

  const handleDeleteTask = async () => {
    if (selectedTask) {
      const updatedTasks = await taskApi.deleteTask(selectedTask.id);
      setTasks(updatedTasks);
      setSelectedTask(null);
      setIsListExpanded(true);
    }
    setShowDeleteConfirmation(false);
  };

  return (
    <View style={stylesHome.container}>
      <TitleText title="Lista de Tareas" />
      {tasks.length > 0 ? (
        <>
          <TaskList
            tasks={tasks}
            selectedTask={selectedTask}
            isListExpanded={isListExpanded}
            tasksCompleted={tasksCompleted}
            onTaskPress={handleTaskPress}
            onToggleList={toggleList}
          />
          {selectedTask && (
            <TaskDetails
              task={selectedTask}
              countdown={countdown}
              onEdit={handleEditTask}
              onComplete={handleCompleteTask}
              onDelete={() => setShowDeleteConfirmation(true)}
              onPress={() => handleTaskPress(selectedTask)}
            />
          )}
        </>
      ) : (
        <EmptyTasksMessage />
      )}
      <ButtonFloating
        icon="add"
        onPress={() => router.push("/form-task")}
        size={28}
      />
      <ConfirmationModal
        visible={showDeleteConfirmation}
        onConfirm={handleDeleteTask}
        onCancel={() => setShowDeleteConfirmation(false)}
        taskTitle={selectedTask?.title}
      />
    </View>
  );
}
