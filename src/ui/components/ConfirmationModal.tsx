// ConfirmationModal.tsx
import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { stylesHome } from "../styles/homePageStyles";
import { Colors } from "@/constants/Colors";

interface ConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  taskTitle: string | undefined;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  taskTitle,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={stylesHome.centeredView}>
        <View style={stylesHome.modalView}>
          <Text style={stylesHome.modalText}>
            ¿Estás seguro de que quieres eliminar esta tarea{" "}
            <Text style={{ fontWeight: "bold", color: Colors.primary }}>
              {taskTitle}
            </Text>
            ?
          </Text>
          <View style={stylesHome.modalButtons}>
            <TouchableOpacity style={[stylesHome.button]} onPress={onCancel}>
              <Text style={stylesHome.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[stylesHome.button, stylesHome.buttonDelete]}
              onPress={onConfirm}
            >
              <Text
                style={[stylesHome.buttonText, stylesHome.deleteButtonText]}
              >
                Eliminar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
