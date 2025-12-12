import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Course } from "../services/coursesData";
import CustomButton from "./CustomButton";

type Props = {
  visible: boolean;
  course: Course | null;
  onClose: () => void;
  onEnroll?: (courseId: string) => void;
};

export default function CourseForm({ visible, course, onClose, onEnroll }: Props) {
  if (!course) return null;

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>{course.title}</Text>
          {course.subtitle ? <Text style={styles.subtitle}>{course.subtitle}</Text> : null}
          {course.instructor ? <Text style={styles.meta}>Instructor: {course.instructor}</Text> : null}
          {course.description ? <Text style={styles.description}>{course.description}</Text> : null}

          <View style={styles.actions}>
            <CustomButton title="Enroll" onPress={() => course && onEnroll && onEnroll(course.id)} style={styles.enroll} />
            <TouchableOpacity onPress={onClose} style={styles.close}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  sheet: { backgroundColor: "#fff", padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  subtitle: { color: "#666", marginBottom: 8 },
  meta: { fontSize: 13, color: "#444", marginBottom: 8 },
  description: { fontSize: 14, color: "#333", marginBottom: 12 },
  actions: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  enroll: { flex: 1, marginRight: 8 },
  close: { paddingVertical: 8, paddingHorizontal: 12, alignSelf: "flex-end" },
  closeText: { color: "#007AFF", fontWeight: "600" },
});
