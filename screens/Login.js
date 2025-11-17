import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { login } from "../services/authService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const res = await login(email, password);

    if (res.token) {
      setMessage("Logged in!");
      // Store token for later
    } else {
      setMessage(res.message);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />

      <Button title="Login" onPress={handleLogin} />

      <Text>{message}</Text>
    </View>
  );
}
