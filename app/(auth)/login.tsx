import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import { useTheme } from "../../context/ThemeContext";

export default function Login() {
  const { colors } = useTheme();
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLogin = () => {
    setError("");
    if (!rollNumber.trim()) {
      setError("Please enter your roll number.");
      return;
    }
    if (!/^[0-9]+$/.test(rollNumber)) {
      setError("Roll number must be numeric.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    router.replace("/(main)/dashboard");
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Login</Text>

      <InputField
        label="Roll Number"
        keyboardType="number-pad"
        autoCapitalize="none"
        value={rollNumber}
        onChangeText={setRollNumber}
      />

      <InputField label="Password" secureTextEntry value={password} onChangeText={setPassword} />

      {error ? <Text style={[styles.errorText, { color: colors.danger }]}>{error}</Text> : null}

      <CustomButton title="Login" onPress={onLogin} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
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
