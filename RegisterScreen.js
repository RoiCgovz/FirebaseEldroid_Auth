import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const handleRegister = async () => {
    if (!email.trim() || !password.trim() || !confPass.trim()) {
      alert("Error" + ", Please fill all fields");
      return;
    }

    if (password !== confPass) {
      Alert.alert("Error" + ", Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email.trim().toLowerCase(),
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success, Account registered!");
      navigation.replace("Login");

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Error, This email is already registered");
      } else {
        alert("Error", error.message);
      }
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://i.imgur.com/YQ3NptE.jpeg" }}
      style={styles.background}
      blurRadius={20}
    >
      <View style={styles.overlay} />

      <View style={styles.card}>
        {/* Icon */}
        <View style={styles.iconBox}>
          <Ionicons name="person-add-outline" size={24} color="#333" />
        </View>

        {/* Title */}
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Register to start using the app
        </Text>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={18} color="#777" />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={18} color="#777" />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={18}
              color="#777"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={18} color="#777" />
          <TextInput
            placeholder="Confirm Password"
            value={confPass}
            onChangeText={setConfPass}
            secureTextEntry={!showConfPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowConfPassword(!showConfPassword)}>
            <Ionicons
              name={showConfPassword ? "eye-off" : "eye"}
              size={18}
              color="#777"
            />
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Go to Login */}
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={styles.loginText}>To Login</Text>
        </TouchableOpacity>
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
    width: "40%",
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 25,
    padding: 20,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },

  iconBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginVertical: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    width: "100%",
  },

  input: {
    flex: 1,
    padding: 10,
  },

  button: {
    width: "100%",
    marginTop: 15,
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  loginText: {
    marginTop: 10,
    fontSize: 12,
    color: "#555",
  },
});