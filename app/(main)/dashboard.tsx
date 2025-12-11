import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import DashboardCard from "../../components/DashboardCard";
import { useTheme } from "../../context/ThemeContext";

export default function Dashboard() {
  const { colors } = useTheme();

  const courses = [
    { id: "1", title: "Mathematics", subtitle: "Algebra & Calculus", instructor: "Mr. Sharma", progress: 76 },
    { id: "2", title: "English", subtitle: "Reading & Writing", instructor: "Ms. Kumar", progress: 92 },
    { id: "3", title: "Science", subtitle: "Physics & Chemistry", instructor: "Mrs. Iyer", progress: 64 },
    { id: "4", title: "History", subtitle: "World History", instructor: "Mr. Gupta", progress: 81 },
  ];

  function renderCourse({ item }: { item: any }) {
    return (
      <DashboardCard
        title={item.title}
        subtitle={item.subtitle}
        style={styles.courseCard}
        onPress={() => console.log("Course pressed", item.title)}
      >
        <View style={styles.metaRow}>
          <Text style={[styles.metaText, { color: colors.muted }]}>{item.instructor}</Text>
          <Text style={[styles.metaText, { color: colors.muted }]}>{item.progress}%</Text>
        </View>
        <View style={[styles.progressBarBackground, { backgroundColor: colors.inputBorder }]}>
          <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: `${item.progress}%` }]} />
        </View>
        <CustomButton title="View" onPress={() => console.log("View course", item.title)} style={styles.viewButton} />
      </DashboardCard>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.text }]}>Welcome back, Student</Text>
        <Text style={[styles.subGreeting, { color: colors.muted }]}>Here is your dashboard for today</Text>
      </View>

      <View style={styles.statsRow}>
        <DashboardCard title="Attendance" subtitle="92%" style={styles.statCard} />
        <DashboardCard title="GPA" subtitle="8.6" style={styles.statCard} />
        <DashboardCard title="Credits" subtitle="24" style={styles.statCard} />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Courses</Text>

      <FlatList data={courses} keyExtractor={(i) => i.id} renderItem={renderCourse} numColumns={2} columnWrapperStyle={styles.columnWrapper} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { marginBottom: 18 },
  greeting: { fontSize: 22, fontWeight: "700" },
  subGreeting: { marginTop: 6, fontSize: 14 },
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 18 },
  statCard: { flex: 1, marginRight: 8 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  columnWrapper: { justifyContent: "space-between", marginBottom: 12 },
  courseCard: { flex: 1, margin: 6, minWidth: 150 },
  metaRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  metaText: { fontSize: 12 },
  progressBarBackground: { height: 8, backgroundColor: "#e6eaf0", borderRadius: 8, overflow: "hidden", marginTop: 8 },
  progressBarFill: { height: 8, borderRadius: 8 },
  viewButton: { marginTop: 10 },
});
