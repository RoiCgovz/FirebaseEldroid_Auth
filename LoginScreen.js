import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // ✅ FIXED: trims input to properly detect empty/whitespace
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      console.log("LOGIN SUCCESS:", userCredential.user.email);

      Alert.alert('Success', 'Login successful!');

    } catch (error) {
      console.log("LOGIN ERROR:", error.message);
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Fajardo Roilene Vhinz</Text>
      </View>

      <Text style={{ marginTop: 100 }}>Email</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10 }}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text>Password</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 20 }}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />

      <View style={{ marginTop: 10 }}>
        <Button
          title="Go to Register"
          onPress={() => navigation.navigate('Register')}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});