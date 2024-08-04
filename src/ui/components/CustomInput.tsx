import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput } from "react-native-paper";

interface CustomInputProps {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

const handleSubmit = (values: {
  title: string;
  description: string;
  dateTime: Date;
}) => {
  console.log(values);
  // Aquí implementarías la lógica para guardar la tarea
};

export const CustomInput = (props: CustomInputProps) => {
  const {
    title,
    value,
    onChangeText,
    onBlur,
    placeholder,
    error,
    multiline = false,
    numberOfLines = 1,
  } = props;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("El título es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    dateTime: Yup.date().required("La fecha y hora son requeridas"),
  });
  return (
    <Formik
      initialValues={{ title: "", description: "", dateTime: new Date() }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("title")}
            onBlur={handleBlur("title")}
            value={values.title}
            placeholder="Ingrese el título de la tarea"
          />
          {touched.title && errors.title && (
            <Text style={styles.errorText}>{errors.title}</Text>
          )}
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});
