import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/SplashScreen"; // ✅ Import Splash Screen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="AddEvent" component={AddEvent} />

        {/* Later, add Login, Home, etc. */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
