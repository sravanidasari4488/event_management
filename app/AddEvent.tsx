import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRouter } from "expo-router";
import { useEventStore } from "../store/useEventStore";

type AddEventProps = {
  navigation: StackNavigationProp<any>;
};

export default function AddEvent({ navigation }: AddEventProps) {
  const router = useRouter();
  const addEvent = useEventStore((state) => state.addEvent);

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
  const [eventImage, setEventImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setEventImage(result.assets[0].uri);
    }
  };

  const handleCreateEvent = () => {
    if (!eventName || !eventDate || !description || !eventImage) {
      Alert.alert("Error", "Please fill all fields and upload an image.");
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      title: eventName,
      date: eventDate,
      description,
      image: eventImage,
    };

    addEvent(newEvent);

    Alert.alert("Success", "Event Added!", [
      {
        text: "OK",
        onPress: () => navigation.navigate("AdminHome"),
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Create Event</Text>

        {/* Image Upload */}
        <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
          {eventImage ? (
            <Image source={{ uri: eventImage }} style={styles.imagePreview} />
          ) : (
            <Text style={styles.uploadText}>Upload Event Image</Text>
          )}
        </TouchableOpacity>

        {/* Input Fields */}
        <TextInput
          placeholder="Event Name"
          style={styles.input}
          value={eventName}
          onChangeText={setEventName}
        />

        <TextInput
          placeholder="Date & Time"
          style={styles.input}
          value={eventDate}
          onChangeText={setEventDate}
        />

        <TextInput
          placeholder="Description"
          style={[styles.input, styles.descriptionInput]}
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* Create Event Button */}
        <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
          <Text style={styles.buttonText}>Create Event</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1C1C1E",
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
    backgroundColor: "#333",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    width: "100%",
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  imageUpload: {
    backgroundColor: "#444",
    height: 300,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
  },
  uploadText: {
    color: "#aaa",
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  createButton: {
    backgroundColor: "#FF4C4C",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
