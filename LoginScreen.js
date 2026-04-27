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

import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      if (typeof window !== "undefined") {
        window.alert("Please enter email and password");
      } else {
        Alert.alert("Error", "Please enter email and password");
      }
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      console.log("LOGIN SUCCESS:", userCredential.user.email);

      if (typeof window !== "undefined") {
        window.alert("Login successful!");
      } else {
        Alert.alert("Success", "Login successful!");
      }

    } catch (error) {
      console.log("LOGIN ERROR:", error.message);

      if (typeof window !== "undefined") {
        window.alert(error.message);
      } else {
        Alert.alert("Login Failed", error.message);
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
          <Ionicons name="log-in-outline" size={24} color="#333" />
        </View>

        {/* Title */}
        <Text style={styles.title}>Sign in with email</Text>
        <Text style={styles.subtitle}>
          Welcome back! Please login to continue
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

        {/* Forgot Password */}
        <Text style={styles.forgot}>Forgot password?</Text>

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        {/* Navigate */}
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.loginText}>Create an account</Text>
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

  forgot: {
    alignSelf: "flex-end",
    fontSize: 12,
    marginTop: 5,
    color: "#555",
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