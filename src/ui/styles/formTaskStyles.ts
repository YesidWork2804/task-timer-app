import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const stylesFormTask = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: Colors.backgroundWhite,
  },
  addButton: {
    backgroundColor: Colors.primary,
    fontSize: 16,
    width: 200,
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
    color: Colors.primary,
  },
  form: {
    flex: 1,
    color: "#000000",
  },
  input: {
    marginBottom: 16,
    backgroundColor: Colors.backgroundWhite,
    color: Colors.primary,
  },
  textArea: {
    height: 120,
  },
  dateButton: {
    marginTop: 16,
    marginBottom: 16,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",

    marginHorizontal: 4,
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: -12,
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.backgroundWhite,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
});
