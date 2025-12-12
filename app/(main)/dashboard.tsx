import { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import CourseForm from "../../components/CourseForm";
import CustomButton from "../../components/CustomButton";
import DashboardCard from "../../components/DashboardCard";
import { useTheme } from "../../context/ThemeContext";
import { Course, courses as coursesData } from "../../services/coursesData";

export default function Dashboard() {
  const { colors } = useTheme();

  // Use centralized courses data
  const courses: Course[] = coursesData;
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  // Responsive columns: show 1 column on narrow screens, 2 on wider
  const { width } = useWindowDimensions();
  const numColumns = width < 600 ? 1 : 2;

  function renderCourse({ item }: { item: any }) {
    const cardStyle = numColumns === 1 ? styles.courseCardSingle : styles.courseCard;
    return (
      <DashboardCard
        title={item.title}
        subtitle={item.subtitle}
        style={cardStyle}
        onPress={() => {
          setSelectedCourse(item);
          setFormVisible(true);
        }}
      >
        <View style={styles.metaRow}>
          <Text style={[styles.metaText, { color: colors.muted }]}>{item.instructor}</Text>
          <Text style={[styles.metaText, { color: colors.muted }]}>{item.progress}%</Text>
        </View>
        <View style={[styles.progressBarBackground, { backgroundColor: colors.inputBorder }]}>
          <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: `${item.progress}%` }]} />
        </View>
        <CustomButton title="View" onPress={() => {
          setSelectedCourse(item);
          setFormVisible(true);
        }} style={styles.viewButton} />
      </DashboardCard>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.text }]}>Welcome back, Student</Text>
        <Text style={[styles.subGreeting, { color: colors.muted }]}>Here is your dashboard for today</Text>
      </View>

      {/* Horizontal scrollable stats row to avoid wrapping on small screens */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsScroll} overScrollMode="never">
        <DashboardCard title="Attendance" subtitle="92%" style={styles.statCard} />
        <DashboardCard title="GPA" subtitle="8.6" style={styles.statCard} />
        <DashboardCard title="Credits" subtitle="24" style={styles.statCard} />
        <DashboardCard title="Assignments" subtitle="5 pending" style={styles.statCard} />
      </ScrollView>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Courses</Text>

      <FlatList
        data={courses}
        keyExtractor={(i) => i.id}
        renderItem={renderCourse}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
      />

      <CourseForm
        visible={formVisible}
        course={selectedCourse}
        onClose={() => setFormVisible(false)}
        onEnroll={(id) => {
          console.log("Enroll clicked for", id);
          setFormVisible(false);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { marginBottom: 18 },
  greeting: { fontSize: 22, fontWeight: "700" },
  subGreeting: { marginTop: 6, fontSize: 14 },
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 18, alignItems: "stretch" },
  statsScroll: { paddingVertical: 8, paddingHorizontal: 4, marginBottom: 8 },
  statCard: { marginRight: 12, minWidth: 110 },
  statCardLast: { marginRight: 0 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  columnWrapper: { justifyContent: "space-between", marginBottom: 12 },
  courseCard: { flex: 1, margin: 6, minWidth: 150 },
  courseCardSingle: { width: '100%', marginVertical: 8 },
  metaRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  metaText: { fontSize: 12 },
  progressBarBackground: { height: 8, backgroundColor: "#e6eaf0", borderRadius: 8, overflow: "hidden", marginTop: 8 },
  progressBarFill: { height: 8, borderRadius: 8 },
  viewButton: { marginTop: 10 },
});
