import { View, Text, StyleSheet,Image,TouchableOpacity, Animated, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useEventStore } from "../store/useEventStore"; // adjust path

const events = useEventStore((state) => state.events);


export default function HomeScreen() {
  
    const [menuOpen, setMenuOpen] = useState(false);
    const slideAnim = useState(new Animated.Value(-250))[0]; // Start hidden
  
    const toggleMenu = () => {
      Animated.timing(slideAnim, {
        toValue: menuOpen ? -250 : 0, // Slide in/out
        duration: 300,
        useNativeDriver: true,
      }).start();
      setMenuOpen(!menuOpen);
    };
    const closeMenu = () => {
      if (menuOpen) {
        Animated.timing(slideAnim, {
          toValue: -250,
          duration: 300,
          useNativeDriver: true,
        }).start();
        setMenuOpen(false);
      }
    };
  
    return (
      <Pressable style={styles.container} onPress={closeMenu}>
      
         <Image source={require("../assets/images/vit-uni.jpeg")} style={styles.image}/>
         <Image source={require("../assets/images/vitapwhite-removebg-preview.png")} style={styles.logo}/>
        {/* Menu Button */}
        <Text style={styles.text}>Events</Text>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
  
        {/* Sidebar */}
        <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
          <TouchableOpacity style={styles.menuItem}><Text style={styles.menuText}>Profile</Text></TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}><Text style={styles.menuText}>Settings</Text></TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}><Text style={styles.menuText}>Events</Text></TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}><Text style={styles.menuText}>Logout</Text></TouchableOpacity>
        </Animated.View>

      <View style={[styles.content, menuOpen && styles.hiddenContent]}>
      
  
    </View>
    <View style={styles.eventList}>
  {events.map((event, index) => (
    <View key={index} style={styles.eventCard}>
      {event.image && (
        <Image source={{ uri: event.image }} style={styles.eventImage} />
      )}
      <Text style={styles.eventTitle}>{event.name}</Text>
    </View>
  ))}
</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 180,
  },
  menuButton: {
    position: "absolute",
    top: 10,
    left: 10,
    // backgroundColor: "#6200ea",
    padding: 10,
    borderRadius: 5,
  },

  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: 250,
    backgroundColor: "#333",
    paddingTop: 60,
  },

  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },

  menuText: {
    color: "white",
    fontSize: 18,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Keeps content below the sidebar
  },
  hiddenContent: {
    opacity: 0.2, // Dims content when sidebar is open
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
    zIndex: 5,
  },
  image: {
    width: 370, // Adjust width
    height: 400, // Adjust height
    resizeMode: "contain", // Keeps aspect ratio
    marginTop: -100,
  },
  logo: {
    width: 100, // Adjust width
    height: 100, // Adjust height
    resizeMode: "contain", // Keeps aspect ratio
    marginTop: -335,
    marginRight: 120,
  },
  eventList: {
    width: "100%",
    padding: 20,
    marginTop: 20,
  },
  eventCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    alignItems: "center",
    elevation: 2,
  },
  eventImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  
});
