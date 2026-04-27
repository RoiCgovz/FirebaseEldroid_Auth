import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "./firebaseConfig";

export default function HomeScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));

      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(userList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUsers();
    const unsubscribe = navigation.addListener("focus", loadUsers);
    return unsubscribe;
  }, [navigation]);


  return (
    <ImageBackground
      source={{ uri: "https://i.imgur.com/YQ3NptE.jpeg" }}
      style={styles.background}
      blurRadius={20}
    >
      <View style={styles.overlay} />

      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Dashboard</Text>

          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.center}>
          <Text style={styles.greeting}>
            Hello, you are logged in 👋
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  card: {
    width: "90%",
    height: "85%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 25,
    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerText: {
    fontSize: 22,
    fontWeight: "bold",
  },

  greeting: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
    alignContent:"center",
    justifyContent: "center", 
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 15,
  },

  searchInput: {
    flex: 1,
    padding: 10,
  },

  item: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginTop: 10,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },

  email: {
    fontSize: 14,
  },

  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },
  center: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},
}); 