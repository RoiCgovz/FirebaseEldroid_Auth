import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet,
} from "react-native";

import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");

  const handleRegister = async () => {
    // ✅ FIXED: trims inputs to detect empty/whitespace
    if (!email.trim() || !password.trim() || !confPass.trim()) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confPass) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // Save user info to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email.trim().toLowerCase(),
        createdAt: serverTimestamp(),
      });

      alert("Success", "Account registered!");
      navigation.replace("Login");

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered");
      } 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Fajardo Roilene Vhinz</Text>
      </View>

      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confPass}
        onChangeText={setConfPass}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginTop: 10 }]}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, marginBottom: 30, textAlign: "center" },
  input: { borderColor: "#000", borderWidth: 1, padding: 12, borderRadius: 10, marginBottom: 15 },
  button: { backgroundColor: "#3b82f6", padding: 15, borderRadius: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 100 },
  headerText: { fontSize: 20, fontWeight: "bold" },
});