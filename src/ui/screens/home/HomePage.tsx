import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ButtonFloating } from "../../components/ButtonFloating";
import {
  AntDesign,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";

export default function HomePage() {
  const navigation = useNavigation();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [countdown, setCountdown] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();

    let intervalId: NodeJS.Timeout;

    if (selectedTask) {
      const updateCountdown = () => {
        const now = new Date();
        const taskDate = new Date(selectedTask.dateTime);
        const timeDiff = taskDate.getTime() - now.getTime();

        if (timeDiff <= 300000 && timeDiff > 0) {
          // 5 minutos = 300000 ms
          const minutes = Math.floor(timeDiff / 60000);
          const seconds = Math.floor((timeDiff % 60000) / 1000);
          setCountdown(
            `${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}`
          );
        } else if (timeDiff <= 0) {
          setCountdown("00:00");
          clearInterval(intervalId);
        } else {
          setCountdown(null);
        }
      };

      updateCountdown();
      intervalId = setInterval(updateCountdown, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [selectedTask]);

  const loadTasks = async () => {
    try {
      const tasksJson = await AsyncStorage.getItem("tasks");
      if (tasksJson) {
        const loadedTasks: Task[] = JSON.parse(tasksJson);
        setTasks(loadedTasks);
      }
    } catch (error) {
      console.error("Error al cargar las tareas:", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const toggleList = () => {
    setIsListExpanded(!isListExpanded);
    setSelectedTask(null);
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

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
      try {
        const updatedTasks = tasks.map((task) =>
          task.id === selectedTask.id ? { ...task, completed: true } : task
        );
        await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        setSelectedTask({ ...selectedTask, completed: true });
        router.push("/");
      } catch (error) {
        console.error("Error al completar la tarea:", error);
      }
    }
  };

  const handleDeleteTask = async () => {
    if (selectedTask) {
      try {
        const updatedTasks = tasks.filter(
          (task) => task.id !== selectedTask.id
        );
        await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        setSelectedTask(null);
        setIsListExpanded(true);
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
      }
    }
    setShowDeleteConfirmation(false);
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity onPress={() => handleTaskPress(item)} activeOpacity={1}>
      <View
        style={
          selectedTask && selectedTask.id === item.id
            ? [styles.taskItem, styles.taskItemSelected]
            : styles.taskItem
        }
      >
        <View style={styles.taskTitleContainer}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          {item.completed && (
            <AntDesign name="check" size={24} color={Colors.primary} />
          )}
        </View>
        <Text style={styles.taskDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderTaskDetails = () => {
    if (!selectedTask) return null;

    return (
      <View style={styles.taskDetails}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => handleTaskPress(selectedTask)}
        >
          <View
            style={{
              backgroundColor: "white",
              elevation: 2,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              marginBottom: 10,
              borderRadius: 5,
            }}
          >
            <Text style={styles.taskDetailTitle}>{selectedTask.title}</Text>
            <MaterialIcons
              name="keyboard-arrow-up"
              size={24}
              color={Colors.colorTextSecondary}
            />
          </View>
        </TouchableOpacity>

        <Text style={styles.taskDetailSubtitle}>Detalles de la tarea</Text>
        <Text style={styles.taskDetailDescription}>
          {selectedTask.description}
        </Text>
        <View style={styles.taskDetailDateTimeContainer}>
          <Ionicons name="alarm-outline" size={30} color="black" />
          <View
            style={{
              marginLeft: 8,
            }}
          >
            <Text style={styles.taskDetailDateTimeLabel}>
              Fecha de finalización
            </Text>
            <Text style={styles.taskDetailDateTime}>
              {new Date(selectedTask.dateTime).toLocaleString()}
            </Text>
            {countdown && (
              <Text style={styles.countdownText}>
                {selectedTask.completed ? (
                  <Text style={{ color: Colors.primary }}>
                    "¡Tarea completada!"
                  </Text>
                ) : countdown == "00:00" ? (
                  <Text>"¡Tiempo cumplido!"</Text>
                ) : (
                  countdown
                )}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setShowDeleteConfirmation(true)}
            style={[styles.buttonDelete]}
          >
            <Text style={[styles.buttonText, styles.deleteButtonText]}>
              Eliminar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEditTask} style={styles.button}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCompleteTask}
            style={[styles.buttonComplete]}
          >
            <Text style={[styles.buttonText, styles.completeButtonText]}>
              Completar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>
      {tasks.length > 0 ? (
        <>
          {!selectedTask && (
            <TouchableOpacity
              onPress={toggleList}
              style={styles.selectTaskCard}
            >
              <Text style={styles.selectTaskText}>
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
            <FlatList
              data={tasks}
              renderItem={renderTask}
              keyExtractor={(task) => task.id}
              style={styles.taskList}
            />
          )}
          {selectedTask && renderTaskDetails()}
        </>
      ) : (
        <View style={styles.centeredContainer}>
          <FontAwesome6 name="list-check" size={50} color={Colors.primary} />
          <Text style={styles.body}>
            No hay tareas creadas.{"\n"}
            <Text style={{ color: Colors.primary, fontWeight: "600" }}>
              Crea tu primera tarea.
            </Text>
          </Text>
        </View>
      )}
      <ButtonFloating
        icon="add"
        onPress={() => router.push("/form-task")}
        size={28}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDeleteConfirmation}
        onRequestClose={() => setShowDeleteConfirmation(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              ¿Estás seguro de que quieres eliminar esta tarea{" "}
              <Text style={{ fontWeight: "bold", color: Colors.primary }}>
                {selectedTask?.title}
              </Text>
              ?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => setShowDeleteConfirmation(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonDelete]}
                onPress={handleDeleteTask}
              >
                <Text style={[styles.buttonText, styles.deleteButtonText]}>
                  Eliminar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  title: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  selectTaskCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.backgroundWhite,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  selectTaskText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primary,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    fontSize: 20,
    color: "#333333",
    textAlign: "center",
    marginVertical: 10,
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: Colors.backgroundWhite,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  taskItemSelected: {
    backgroundColor: Colors.backgroundLight,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
  },
  taskDescription: {
    fontSize: 14,
    color: Colors.colorTextSecondary,
    marginTop: 4,
  },
  taskDetails: {
    // backgroundColor: Colors.backgroundWhite,
    flexDirection: "column",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    // borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        // elevation: 4,
      },
    }),
  },
  taskDetailTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  taskDetailDescription: {
    fontSize: 16,
    color: Colors.colorTextSecondary,
    marginBottom: 8,
  },
  taskDetailDateTime: {
    fontSize: 15,
    color: Colors.colorTextSecondary,
    fontWeight: "400",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    width: "100%",
  },

  button: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 5,
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
  },

  buttonDelete: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 5,
    alignItems: "center",
    borderColor: Colors.error,

    borderWidth: 1,
    height: 40,
    justifyContent: "center",
  },

  buttonText: {
    color: Colors.colorTextSecondary,
    fontWeight: "600",
  },
  deleteButtonText: {
    color: Colors.error,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: Colors.colorTextSecondary,
  },
  modalButtons: {
    flexDirection: "row",
    width: "100%",
  },

  taskTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskDetailSubtitle: {
    fontSize: 15,
    color: Colors.colorTextSecondary,
    fontWeight: "800",
    marginBottom: 8,
  },
  taskDetailDateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  taskDetailDateTimeLabel: {
    fontSize: 15,
    color: Colors.colorTextSecondary,
    fontWeight: "800",
  },
  countdownText: {
    fontSize: 14,
    color: Colors.error,
    fontWeight: "600",
    marginTop: 4,
  },
  buttonComplete: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 5,
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
  },
  completeButtonText: {
    color: Colors.primary,
  },
});
