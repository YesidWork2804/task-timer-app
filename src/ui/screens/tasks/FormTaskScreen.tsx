import React from "react";
import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { Text, Button, Provider as PaperProvider } from "react-native-paper";
import { Formik } from "formik";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { stylesFormTask } from "../../styles/formTaskStyles";
import { useTaskManagement } from "./hooks/useTaskManagement";
import { taskValidationSchema } from "./utils/validationShema";
import { InputField } from "./components/InputField";
import { CustomDateTimePicker } from "./components/DateTimePicker";

export default function AddTaskScreen() {
  const router = useRouter();
  const { taskId } = useLocalSearchParams<{ taskId: string }>();
  const { initialValues, handleSubmit } = useTaskManagement(taskId);

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
          validationSchema={taskValidationSchema}
          onSubmit={async (values) => {
            const success = await handleSubmit(values);
            if (success) router.push("/");
          }}
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
              <InputField
                label="Título"
                name="title"
                value={values.title}
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                error={touched.title && errors.title ? errors.title : undefined}
              />

              <InputField
                label="Descripción"
                name="description"
                value={values.description}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                error={
                  touched.description && errors.description
                    ? errors.description
                    : undefined
                }
                multiline
                numberOfLines={4}
              />
              <CustomDateTimePicker
                value={values.dateTime}
                onChange={(date) => setFieldValue("dateTime", date)}
                error={touched.dateTime && (errors.dateTime as string)}
              />
              <View style={stylesFormTask.buttonContainer}>
                <Button
                  style={stylesFormTask.addButton}
                  mode="contained"
                  onPress={() => handleSubmit()}
                >
                  <Text style={stylesFormTask.buttonText}>
                    {taskId ? "Guardar" : "Registrar"}
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
