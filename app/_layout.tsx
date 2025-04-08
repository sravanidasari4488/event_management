import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="roleSelection" options={{ headerShown: false }} />
      <Stack.Screen name="StudentHome" options={{ headerShown: false }} />
      <Stack.Screen name="AdminHome" options={{ headerShown: false }} />
      
    </Stack>
  );
}
