import { Colors } from "@/constants/Colors";
import { Platform } from "react-native";
import { StyleSheet } from "react-native";

export const stylesHome = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
    paddingTop: Platform.OS === "android" ? 30 : 0,
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

  modalNotification: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

  detailsCompleted: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.colorTextSecondary,
    marginLeft: 14,
    marginTop: 8,
    marginBottom: 8,
  },
  taskDetailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: Colors.backgroundWhite,
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
  taskDetailDateTimeContent: {
    flexDirection: "column",
    marginTop: 8,
    marginLeft: 8,
  },
});
