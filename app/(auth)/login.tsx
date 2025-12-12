import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import { useTheme } from "../../context/ThemeContext";
import { findUserByCredentials } from "../../services/mockData";
// Use local mock login helper for dev/testing

export default function Login() {
  const { colors } = useTheme();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setError("");
    if (!studentId.trim()) {
      setError("Please enter your Student ID.");
      return;
    }
    // allow alphanumeric student IDs - no numeric-only validation
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      // Try to validate against local mock users first
      const user = findUserByCredentials(studentId, password);
      if (!user) {
        setError("Invalid Student ID or password.");
        return;
      }
      // Persist the canonical studentId (e.g. roll) so other screens read it
      try {
        await AsyncStorage.setItem("studentId", user.studentId);
      } catch (e) {
        console.warn("Failed to persist studentId", e);
      }
      router.replace("/(main)/dashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={require("../../assets/images/icon.png")} style={styles.logo} resizeMode="contain" />
      <Text style={[styles.title, { color: colors.text }]}>Login</Text>

      <InputField
        label="Student ID"
        placeholder="Student ID"
        keyboardType="default"
        autoCapitalize="none"
        value={studentId}
        onChangeText={setStudentId}
      />

      <InputField label="Password" placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      {error ? <Text style={[styles.errorText, { color: colors.danger }]}>{error}</Text> : null}

      <CustomButton title={loading ? "Logging in..." : "Login"} onPress={onLogin} style={styles.button} disabled={loading} />
      {loading ? <ActivityIndicator style={{ marginTop: 8 }} color={colors.primary} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  logo: { width: 120, height: 120, alignSelf: "center", marginBottom: 18 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 24 },
  input: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  errorText: { marginTop: 8, textAlign: "center" },
});
