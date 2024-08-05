import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, View, TouchableOpacity, Platform } from "react-native";
import {
  TextInput,
  Text,
  Button,
  Provider as PaperProvider,
} from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTaskNotifications } from "../../hooks/UseTaskNotifications";
import { stylesFormTask } from "../../styles/formTaskStyles";
import { Task } from "@/src/domain/task/models/task";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("El título es requerido"),
  description: Yup.string().required("La descripción es requerida"),
  dateTime: Yup.date()
    .required("La fecha y hora son requeridas")
    .test(
      "is-future",
      "La fecha y hora deben ser al menos 5 minutos después de la hora actual",
      function (value) {
        const currentDate = new Date();
        const fiveMinutesFromNow = new Date(
          currentDate.getTime() + 5 * 60 * 1000
        );
        return value && value >= fiveMinutesFromNow;
      }
    ),
});

export default function AddTaskScreen() {
  const router = useRouter();
  const { taskId } = useLocalSearchParams<{ taskId: string }>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    dateTime: new Date(),
    completed: false,
  });

  useEffect(() => {
    if (taskId) {
      loadTask();
    }
  }, [taskId]);

  const loadTask = async () => {
    try {
      const tasksJson = await AsyncStorage.getItem("tasks");
      if (tasksJson) {
        const tasks: Task[] = JSON.parse(tasksJson);
        const task = tasks.find((t) => t.id === taskId);
        if (task) {
          setInitialValues({
            title: task.title,
            description: task.description,
            dateTime: new Date(task.dateTime),
            completed: task.completed,
          });
        }
      }
    } catch (error) {
      console.error("Error al cargar la tarea:", error);
    }
  };

  const { scheduleNotification } = useTaskNotifications();

  const handleSubmit = async (values: {
    title: string;
    description: string;
    dateTime: Date;
    completed: boolean;
  }) => {
    try {
      const tasksJson = await AsyncStorage.getItem("tasks");
      let tasks: Task[] = tasksJson ? JSON.parse(tasksJson) : [];

      let newTask: Task;

      if (taskId) {
        tasks = tasks.map((task) =>
          task.id === taskId ? { ...task, ...values } : task
        );
        newTask = { ...tasks.find((task) => task.id === taskId)!, ...values };
      } else {
        newTask = {
          id: Date.now().toString(),
          ...values,
        };
        tasks.push(newTask);
      }

      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));

      await scheduleNotification(newTask);

      router.push("/");
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
    }
  };

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <PaperProvider>
      <SafeAreaView style={stylesFormTask.container}>
        <TouchableOpacity
          style={stylesFormTask.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color={Colors.primary}
          />
        </TouchableOpacity>
        <Text style={stylesFormTask.title}>
          {taskId ? "Editar tarea" : "Agregar nueva tarea"}
        </Text>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={stylesFormTask.form}>
              <TextInput
                label="Título"
                mode="outlined"
                style={stylesFormTask.input}
                textColor={Colors.colorTextSecondary}
                outlineColor={Colors.primary}
                activeOutlineColor={Colors.primary}
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
                error={!!(touched.title && errors.title)}
              />
              {touched.title && errors.title && (
                <Text style={stylesFormTask.errorText}>{errors.title}</Text>
              )}

              <TextInput
                label="Descripción"
                mode="outlined"
                style={[stylesFormTask.input, stylesFormTask.textArea]}
                textColor={Colors.colorTextSecondary}
                activeOutlineColor={Colors.primary}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                multiline
                numberOfLines={4}
                error={!!(touched.description && errors.description)}
              />
              {touched.description && errors.description && (
                <Text style={stylesFormTask.errorText}>
                  {errors.description}
                </Text>
              )}
              <Text
                style={{
                  color: Colors.colorTextSecondary,
                  fontWeight: "800",
                  marginTop: 16,
                  fontSize: 18,
                }}
              >
                Escoja la fecha de vencimiento.
              </Text>

              <TouchableOpacity
                onPress={() =>
                  Platform.OS === "ios"
                    ? setShowDatePicker(true)
                    : setShowDatePicker((prev) => !prev)
                }
                style={stylesFormTask.dateButton}
              >
                <Text
                  style={{
                    color: Colors.colorTextSecondary,
                    fontWeight: "800",
                  }}
                >
                  {values.dateTime.toLocaleString()}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={values.dateTime}
                  mode={Platform.OS === "ios" ? "datetime" : "date"}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event, selectedDate) => {
                    if (Platform.OS === "android") {
                      setShowDatePicker(false);
                      if (event.type === "set") {
                        setShowTimePicker(true);
                      }
                    }
                    if (selectedDate) {
                      setFieldValue("dateTime", selectedDate);
                    }
                  }}
                />
              )}
              {Platform.OS === "android" && showTimePicker && (
                <DateTimePicker
                  value={values.dateTime}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    setShowTimePicker(false);
                    if (event.type === "set" && selectedTime) {
                      const currentDate = new Date();
                      const newDateTime = new Date(values.dateTime);
                      newDateTime.setHours(selectedTime.getHours());
                      newDateTime.setMinutes(selectedTime.getMinutes());

                      const fiveMinutesFromNow = new Date(
                        currentDate.getTime() + 5 * 60 * 1000
                      );

                      if (
                        newDateTime.getTime() >= fiveMinutesFromNow.getTime()
                      ) {
                        setFieldValue("dateTime", newDateTime);
                      }
                    }
                  }}
                />
              )}
              {touched.dateTime && errors.dateTime && (
                <Text style={stylesFormTask.errorText}>
                  {errors.dateTime as string}
                </Text>
              )}
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 16,
                }}
              >
                <Button
                  style={stylesFormTask.addButton}
                  mode="contained"
                  onPress={() => handleSubmit()}
                >
                  <Text style={stylesFormTask.buttonText}>
                    {taskId ? "Guardar " : "Registrar"}
                  </Text>
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </PaperProvider>
  );
}
