import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from "react-native";
import { signup } from "../services/authService";

export default function SignupScreen({ navigation }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be 8+ chars with uppercase, lowercase, and number";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms validation
    if (!acceptedTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const res = await signup(
        formData.username.trim(),
        formData.email.toLowerCase().trim(),
        formData.password
      );

      if (res.success) {
        Alert.alert(
          "Success!",
          "Account created successfully. Please login.",
          [{ text: "OK", onPress: () => navigation.navigate("Login") }]
        );
      } else {
        Alert.alert("Signup Failed", res.message || "Unable to create account");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: "", color: "#ddd" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const levels = [
      { label: "Weak", color: "#ff3b30" },
      { label: "Weak", color: "#ff3b30" },
      { label: "Fair", color: "#ff9500" },
      { label: "Good", color: "#ffcc00" },
      { label: "Strong", color: "#34c759" }
    ];

    return { strength, ...levels[strength] };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>

        <View style={styles.form}>
          {/* Username Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={[styles.input, errors.username && styles.inputError]}
              placeholder="Choose a username"
              value={formData.username}
              onChangeText={(text) => updateField("username", text)}
              autoCapitalize="none"
              editable={!loading}
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text) => updateField("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!loading}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  errors.password && styles.inputError
                ]}
                placeholder="Create a password"
                value={formData.password}
                onChangeText={(text) => updateField("password", text)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={!loading}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeText}>{showPassword ? "👁️" : "👁️‍🗨️"}</Text>
              </TouchableOpacity>
            </View>
            {formData.password.length > 0 && (
              <View style={styles.strengthContainer}>
                <View style={styles.strengthBar}>
                  <View
                    style={[
                      styles.strengthFill,
                      {
                        width: `${(passwordStrength.strength / 5) * 100}%`,
                        backgroundColor: passwordStrength.color
                      }
                    ]}
                  />
                </View>
                <Text style={[styles.strengthText, { color: passwordStrength.color }]}>
                  {passwordStrength.label}
                </Text>
              </View>
            )}
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  errors.confirmPassword && styles.inputError
                ]}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={(text) => updateField("confirmPassword", text)}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                editable={!loading}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Text style={styles.eyeText}>
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </Text>
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>

          {/* Terms and Conditions */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
            disabled={loading}
          >
            <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
              {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>
              I agree to the{" "}
              <Text style={styles.linkText}>Terms and Conditions</Text>
            </Text>
          </TouchableOpacity>
          {errors.terms && (
            <Text style={styles.errorText}>{errors.terms}</Text>
          )}

          {/* Signup Button */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              disabled={loading}
            >
              <Text style={styles.linkText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa"
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24
  },
  header: {
    marginBottom: 32,
    alignItems: "center"
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: "#666"
  },
  form: {
    width: "100%"
  },
  inputContainer: {
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#333"
  },
  inputError: {
    borderColor: "#ff3b30"
  },
  passwordContainer: {
    position: "relative"
  },
  passwordInput: {
    paddingRight: 50
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 16
  },
  eyeText: {
    fontSize: 20
  },
  strengthContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8
  },
  strengthBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
    marginRight: 8,
    overflow: "hidden"
  },
  strengthFill: {
    height: "100%",
    borderRadius: 2
  },
  strengthText: {
    fontSize: 12,
    fontWeight: "600"
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 12,
    marginTop: 4
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 8
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 6,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  checkboxChecked: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF"
  },
  checkmark: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: "#666"
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 16
  },
  buttonDisabled: {
    opacity: 0.6
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  footerText: {
    color: "#666",
    fontSize: 14
  },
  linkText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600"
  }
});