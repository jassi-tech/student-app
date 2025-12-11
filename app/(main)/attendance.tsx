import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

type Student = { id: string; roll: string; name: string; present?: boolean };

const initialStudents: Student[] = [
  { id: "1", roll: "01", name: "Anil Kumar", present: true },
  { id: "2", roll: "02", name: "Fatima Khan", present: false },
  { id: "3", roll: "03", name: "Rakesh Rao", present: true },
  { id: "4", roll: "04", name: "Meera Sharma", present: false },
];

export default function Attendance() {
  const { colors } = useTheme();
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [saved, setSaved] = useState(false);

  const presentCount = useMemo(() => students.filter((s) => s.present).length, [students]);

  const togglePresent = (id: string) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, present: !s.present } : s)));
    setSaved(false);
  };

  const onSave = () => {
    // TODO: Persist attendance to API
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Attendance</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>{presentCount} / {students.length} present</Text>
      </View>

      <FlatList
        style={styles.list}
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => togglePresent(item.id)} style={[styles.row, { borderColor: colors.inputBorder }]}>
            <View style={styles.info}>
              <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
              <Text style={[styles.roll, { color: colors.muted }]}>Roll: {item.roll}</Text>
            </View>
            <TouchableOpacity
              style={[styles.badge, { backgroundColor: item.present ? colors.success : colors.danger }]}
              onPress={() => togglePresent(item.id)}
            >
              <Text style={styles.badgeText}>{item.present ? "Present" : "Absent"}</Text>
            </TouchableOpacity>
          </Pressable>
        )}
      />

      <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={onSave}>
        <Text style={styles.saveText}>Save Attendance</Text>
      </TouchableOpacity>
      {saved ? <Text style={[styles.savedMsg, { color: colors.success }]}>Attendance saved</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 18, borderBottomWidth: 1 },
  title: { fontSize: 22, fontWeight: "700" },
  subtitle: { marginTop: 6 },
  list: { paddingHorizontal: 12, paddingVertical: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
  },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "600" },
  roll: { marginTop: 4 },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: "#fff", fontWeight: "600" },
  saveButton: {
    paddingVertical: 14,
    borderRadius: 10,
    margin: 18,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "600" },
  savedMsg: { textAlign: "center", marginBottom: 12 },
});
