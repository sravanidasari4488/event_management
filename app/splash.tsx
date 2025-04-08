import { useEffect } from "react";
import { View, Image, Text, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    // Navigate after 2 seconds
    setTimeout(() => {
      router.replace("/roleSelection"); // Change "home" to your main page
    }, 2500);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/images/VIT-AP.jpeg")} // Add your university logo here
        style={[styles.logo, { opacity: fadeAnim }]}
      />
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        EVENTS
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
});
