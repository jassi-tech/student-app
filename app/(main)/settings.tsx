import { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function Settings() {
  const { themeName, toggleTheme } = useTheme();
  const { colors } = useTheme();
  const [isEnabled, setIsEnabled] = useState(themeName === "dark");

  useEffect(() => setIsEnabled(themeName === "dark"), [themeName]);

  const onToggle = () => {
    setIsEnabled((v) => !v);
    toggleTheme();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      <View style={styles.row}>
        <Text style={{ color: colors.text }}>Dark Theme</Text>
        <Switch onValueChange={onToggle} value={isEnabled} trackColor={{ false: colors.inputBorder, true: colors.primary }} thumbColor={isEnabled ? colors.primaryDark : "#fff"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8 },
});
