import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Pressable, FlatList, Alert } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ImageSourcePropType } from "react-native";
import { useEventStore } from "../store/useEventStore"; 

const events = useEventStore((state) => state.events);


type Event = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default function AdminHome() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-250))[0]; // Sidebar Animation
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      image: require("../assets/images/VIT-AP.jpeg"), // Make sure the image exists
      title: "Workshop",
      description: "A great learning event!",
    },
  ]);

  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? -250 : 0,
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

  const handleAddEvent = () => {
    router.push("/AddEvent");
  };

   

  return (
    <Pressable style={styles.container} onPress={closeMenu}>
      <Image source={require("../assets/images/vit-uni.jpeg")} style={styles.image} />
      <Image source={require("../assets/images/vitapwhite-removebg-preview.png")} style={styles.logo} />

      <TouchableOpacity style={styles.addEventButton} onPress={handleAddEvent}>
        <Text style={styles.addEventText}>Add Event</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.delEventButton} onPress={() => console.log("Del Event Clicked")}>
        <Text style={styles.delEventText}>Delete Event</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editEventButton} onPress={() => console.log("Edit Event Clicked")}>
        <Text style={styles.editEventText}>Edit Event</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.viewEventButton} onPress={() => console.log("View Event Clicked")}>
        <Text style={styles.viewEventText}>View Events</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Ionicons name="menu" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.text}>Events</Text>

      <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Event List */}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Event }) => (
          <View style={styles.eventCard}>
      {item.image ? (
  <Image source={{ uri: item.image }} style={styles.eventImage} />
) : (
  <Text style={{ color: "gray" }}>No image available</Text>
)}
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
    </View>
        )}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "black",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 380,
    color: "white",
  },
  menuButton: {
    position: "absolute",
    top: 10,
    left: 10,
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
  image: {
    width: 370,
    height: 400,
    resizeMode: "contain",
    marginTop: -100,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: -335,
    marginRight: 120,
  },
  addEventButton: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 190,
    marginRight: 160,
  },
  addEventText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  editEventButton: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: -154,
    marginLeft: 160,
  },
  editEventText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  delEventButton: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginRight: 160,
  },
  delEventText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
 
  viewEventButton: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginLeft: 160,
  },
  viewEventText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  eventCard: {
    backgroundColor: "#222",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  eventImage: {
    width: 300,
    height: 150,
    borderRadius: 10,
  },
  eventTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  eventDescription: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
});

