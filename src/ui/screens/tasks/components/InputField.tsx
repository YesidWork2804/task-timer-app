import { Colors } from "@/constants/Colors";
import { stylesFormTask } from "@/src/ui/styles/formTaskStyles";
import React from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: any) => void;
  error?: string | undefined;
  multiline?: boolean;
  numberOfLines?: number;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChangeText,
  onBlur,
  error,
  multiline = false,
  numberOfLines = 1,
}) => (
  <View>
    <TextInput
      label={label}
      mode="outlined"
      style={[stylesFormTask.input, multiline && stylesFormTask.textArea]}
      textColor={Colors.colorTextSecondary}
      outlineColor={Colors.primary}
      activeOutlineColor={Colors.primary}
      onChangeText={onChangeText}
      onBlur={onBlur} // Ahora esto debería funcionar correctamente
      value={value}
      multiline={multiline}
      numberOfLines={numberOfLines}
      error={!!error}
    />
    {error && <Text style={stylesFormTask.errorText}>{error}</Text>}
  </View>
);
