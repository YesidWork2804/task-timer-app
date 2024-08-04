// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Stack.Screen name="index" />
//     </Stack>
//   );
// }

import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="form-task"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
