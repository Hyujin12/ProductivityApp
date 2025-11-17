import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { signup } from "../services/authService";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    const res = await signup(username, email, password);
    setMessage(res.message);
  };

  return (
    <View>
      <TextInput placeholder="Username" onChangeText={setUsername} />
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />

      <Button title="Sign Up" onPress={handleSignup} />

      <Text>{message}</Text>
    </View>
  );
}
