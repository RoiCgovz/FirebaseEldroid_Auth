import React, { useEffect, useState } from "react";
import {
  View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth"; // ✅ ADD
import { db, auth } from "./firebaseConfig"; // ✅ ADD auth

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

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Fajardo Roilene Vhinz</Text>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("Register")}
          >
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleLogout} // ✅ LOGOUT BUTTON
          >
            <Text style={styles.addText}>Logout</Text>
          </TouchableOpacity>
        </View>

      </View>

      <TextInput
        placeholder="Search email..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>No users found</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  headerText: { fontSize: 20, fontWeight: "bold" },
  addButton: { backgroundColor: "#3b82f6", paddingVertical: 8, paddingHorizontal: 15, borderRadius: 10 },
  addText: { color: "#fff", fontWeight: "bold" },
  search: { borderWidth: 1, borderRadius: 10, padding: 10, marginBottom: 15 },
  item: { padding: 15, borderRadius: 10, borderWidth: 1, backgroundColor: "#ffff00", marginBottom: 10 },
  email: { fontSize: 16 },
});