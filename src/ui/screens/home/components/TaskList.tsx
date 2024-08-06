import React from "react";
import { Text, TouchableOpacity, FlatList } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Task } from "../../../../domain/task/models/task";
import { Colors } from "../../../../../constants/Colors";
import { stylesHome } from "../../../styles/homePageStyles";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  selectedTask: Task | null;
  isListExpanded: boolean;
  tasksCompleted: Task[];
  onTaskPress: (task: Task) => void;
  onToggleList: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  selectedTask,
  isListExpanded,
  tasksCompleted,
  onTaskPress,
  onToggleList,
}) => {
  return (
    <>
      {!selectedTask && (
        <TouchableOpacity
          onPress={onToggleList}
          style={stylesHome.selectTaskCard}
        >
          <Text style={stylesHome.selectTaskText}>
            {isListExpanded ? "Ocultar tareas" : "Selecciona una tarea"}
          </Text>
          <FontAwesome6
            name={isListExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color={Colors.primary}
          />
        </TouchableOpacity>
      )}
      {isListExpanded && !selectedTask && (
        <>
          <Text style={stylesHome.detailsCompleted}>
            {tasksCompleted.length}{" "}
            {tasksCompleted.length === 1
              ? "Tarea Completada"
              : "Tareas Completadas"}
          </Text>
          <Text style={stylesHome.detailsCompleted}>
            {tasks.length}{" "}
            {tasks.length === 1 ? "Tarea Creada" : "Tareas Creadas"}
          </Text>
          <FlatList
            data={tasks}
            renderItem={({ item }: { item: Task }) => (
              <TaskItem
                task={item}
                isSelected={selectedTask?.id === item.id}
                onPress={() => onTaskPress(item)}
              />
            )}
            keyExtractor={(task: Task) => task.id}
            style={stylesHome.taskList}
          />
        </>
      )}
    </>
  );
};

export default TaskList;
