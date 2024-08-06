// TaskDetails.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Task } from "@/src/domain/task/models/task";
import { stylesHome } from "@/src/ui/styles/homePageStyles";
import { Colors } from "@/constants/Colors";

interface TaskDetailsProps {
  task: Task;
  countdown?: string | null;
  onEdit: () => void;
  onComplete: () => void;
  onDelete: () => void;
  onPress: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
  task,
  countdown,
  onEdit,
  onComplete,
  onDelete,
  onPress,
}) => {
  return (
    <View style={stylesHome.taskDetails}>
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        <View style={stylesHome.taskDetailHeader}>
          <Text style={stylesHome.taskDetailTitle}>{task.title}</Text>
          <MaterialIcons
            name="keyboard-arrow-up"
            size={24}
            color={Colors.colorTextSecondary}
          />
        </View>
      </TouchableOpacity>

      <Text style={stylesHome.taskDetailSubtitle}>Detalles de la tarea</Text>
      <Text style={stylesHome.taskDetailDescription}>{task.description}</Text>
      <View style={stylesHome.taskDetailDateTimeContainer}>
        <Ionicons name="alarm-outline" size={30} color="black" />
        <View style={stylesHome.taskDetailDateTimeContent}>
          <Text style={stylesHome.taskDetailDateTimeLabel}>
            Fecha de finalización
          </Text>
          <Text style={stylesHome.taskDetailDateTime}>
            {new Date(task.dateTime).toLocaleString()}
          </Text>
          {countdown && (
            <Text style={stylesHome.countdownText}>
              {task.completed ? (
                <Text style={{ color: Colors.primary }}>
                  "¡Tarea completada!"
                </Text>
              ) : countdown === "00:00" ? (
                <Text>"¡Tiempo cumplido!"</Text>
              ) : (
                <>
                  {countdown}
                  <Text style={{ color: Colors.colorTextSecondary }}>
                    {"  "}
                    Minutos restantes
                  </Text>
                </>
              )}
            </Text>
          )}
        </View>
      </View>
      <View style={stylesHome.buttonContainer}>
        <TouchableOpacity onPress={onDelete} style={[stylesHome.buttonDelete]}>
          <Text style={[stylesHome.buttonText, stylesHome.deleteButtonText]}>
            Eliminar
          </Text>
        </TouchableOpacity>
        {!task.completed && (
          <>
            <TouchableOpacity onPress={onEdit} style={stylesHome.button}>
              <Text style={stylesHome.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onComplete}
              style={[stylesHome.buttonComplete]}
            >
              <Text
                style={[stylesHome.buttonText, stylesHome.completeButtonText]}
              >
                Completada
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default TaskDetails;
