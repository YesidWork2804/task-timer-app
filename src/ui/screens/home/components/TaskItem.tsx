// TaskItem.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Task } from "@/src/domain/task/models/task";
import { stylesHome } from "@/src/ui/styles/homePageStyles";
import { Colors } from "@/constants/Colors";

interface TaskItemProps {
  task: Task;
  isSelected: boolean;
  onPress: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, isSelected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <View
        style={
          isSelected
            ? [stylesHome.taskItem, stylesHome.taskItemSelected]
            : stylesHome.taskItem
        }
      >
        <View style={stylesHome.taskTitleContainer}>
          <Text style={stylesHome.taskTitle}>{task.title}</Text>
          {task.completed && (
            <AntDesign name="check" size={24} color={Colors.primary} />
          )}
        </View>
        <Text style={stylesHome.taskDescription}>{task.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TaskItem;
