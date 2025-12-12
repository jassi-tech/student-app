import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function Logout() {
  const { colors } = useTheme();
  useEffect(() => {
    async function doLogout() {
      try {
        // remove persisted auth/student id
        await AsyncStorage.removeItem("studentId");
      } catch (e) {
        console.warn("Failed to clear storage during logout", e);
      }
      // navigate to login
      router.replace("/(auth)/login");
    }
    void doLogout();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.text, { color: colors.muted }]}>Logging out…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: {  },
});
