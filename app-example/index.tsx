import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

export default function Index() {
  return (
    <PaperProvider>
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
      </SafeAreaView>
    </PaperProvider>
  );
}
