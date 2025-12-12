import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import DashboardCard from "../../components/DashboardCard";
import { useTheme } from "../../context/ThemeContext";
import { courses } from "../../services/coursesData";
import { Homework as HomeworkItem, homework as hwData } from "../../services/homeworkData";

export default function Homework() {
	const { colors } = useTheme();
		const [items, setItems] = useState<HomeworkItem[]>(hwData);

	const byCourse = useMemo(() => {
		// attach course title to each item for display
		return items.map((h) => ({
			...h,
			courseTitle: courses.find((c) => c.id === h.courseId)?.title ?? "Course",
		}));
	}, [items]);

	function toggleComplete(id: string) {
		setItems((prev) => prev.map((p) => (p.id === id ? { ...p, completed: !p.completed } : p)));
	}

	function renderItem({ item }: { item: any }) {
		const due = new Date(item.dueDate + "T00:00:00");
		const isPast = due.getTime() < new Date().setHours(0, 0, 0, 0) && !item.completed;
		return (
			<DashboardCard
				title={item.title}
				subtitle={`${item.courseTitle} • Due ${due.toLocaleDateString()}`}
				style={styles.card}
				onPress={() => toggleComplete(item.id)}
			>
				<Text style={[styles.desc, { color: colors.muted }]} numberOfLines={2}>{item.description}</Text>
				<View style={styles.metaRow}>
					<Text style={{ color: item.completed ? colors.success : isPast ? colors.danger : colors.muted, fontWeight: '600' }}>
						{item.completed ? 'Completed' : isPast ? 'Overdue' : 'Pending'}
					</Text>
					<Text style={[styles.small, { color: colors.muted }]}>{item.courseTitle}</Text>
				</View>
			</DashboardCard>
		);
	}

	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}> 
			<Text style={[styles.title, { color: colors.text }]}>Homework</Text>
			<FlatList
				data={byCourse}
				keyExtractor={(i) => i.id}
				renderItem={renderItem}
				contentContainerStyle={{ padding: 12 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	title: { fontSize: 20, fontWeight: '700', padding: 12 },
	card: { marginBottom: 12 },
	desc: { marginTop: 8 },
	metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
	small: { fontSize: 12 },
});
