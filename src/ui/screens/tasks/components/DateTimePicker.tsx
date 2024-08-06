import React, { useState } from "react";
import { Platform, TouchableOpacity, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { stylesFormTask } from "@/src/ui/styles/formTaskStyles";
import { Colors } from "@/constants/Colors";

interface CustomDateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  error?: string;
}

export const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  value,
  onChange,
  error,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
      if (event.type === "set") {
        setShowTimePicker(true);
      }
    }
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (event.type === "set" && selectedTime) {
      const newDateTime = new Date(value);
      newDateTime.setHours(selectedTime.getHours());
      newDateTime.setMinutes(selectedTime.getMinutes());
      onChange(newDateTime);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={stylesFormTask.dateButton}
      >
        <Text style={{ color: Colors.colorTextSecondary, fontWeight: "800" }}>
          {value.toLocaleString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={value}
          mode={Platform.OS === "ios" ? "datetime" : "date"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}
      {Platform.OS === "android" && showTimePicker && (
        <DateTimePicker
          value={value}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
      {error && <Text style={stylesFormTask.errorText}>{error}</Text>}
    </View>
  );
};
