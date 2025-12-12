import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { formatDateKey, generateAttendanceMap, sampleStudents } from "../../services/attendanceData";

type Student = { id: string; roll: string; name: string; present?: boolean };

export default function Attendance() {
  const { colors } = useTheme();
  // student rows are not shown in this view; current student comes from sample data
  const [currentStudentId, setCurrentStudentId] = useState<string | null>(null);

  // presentCount removed (unused)

  // Calendar / monthly attendance state (dummy data)
  const [attendanceMap, setAttendanceMap] = useState<Record<string, "present" | "absent" | "leave">>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [viewDate, setViewDate] = useState<Date>(new Date());

  useEffect(() => {
    // Initialize attendance for the viewed month when a student is logged in.
    // generateAttendanceMap will omit future dates. Also regenerate when viewDate changes.
    if (!currentStudentId) return;
    const map = generateAttendanceMap(viewDate);
    setAttendanceMap(map);
    setSelectedDate(null);
  }, [currentStudentId, viewDate]);

  // note: we no longer populate a local `students` state; the calendar and current
  // student name read directly from `sampleStudents` (single source of truth).


  // (attendance percentage removed — UI simplified)

  // Apply leave flow removed — kept calendar as read-only selection

  useEffect(() => {
    // Load the logged-in student id (if any) and filter the list accordingly
    let mounted = true;
    AsyncStorage.getItem("studentId")
      .then((id) => {
        if (!mounted) return;
        if (id) setCurrentStudentId(id);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const currentStudent = useMemo(() => {
    if (!currentStudentId) return null;
    return sampleStudents.find((s) => s.id === currentStudentId || s.roll === currentStudentId || s.name.toLowerCase().includes(currentStudentId.toLowerCase()));
  }, [sampleStudents, currentStudentId]);


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      

      {/* If a student is logged in, show monthly percentage and a simple calendar */}
      {currentStudentId ? (
        <View>
          {/* monthly summary removed */}

          {/* Card-style calendar (rounded, centered) */}
          <View style={[styles.card, { backgroundColor: colors.surface }]}> 
            <View style={styles.cardHeaderRow}>
              <TouchableOpacity onPress={() => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))} style={styles.cardNav}>
                <Text style={[styles.navText, { color: colors.primary }]}>◀</Text>
              </TouchableOpacity>
              <View style={{ alignItems: 'center' }}>
                <Text style={[styles.monthTitle, { color: colors.text }]}>{viewDate.toLocaleString(undefined, { month: "long", year: "numeric" })}</Text>
                {currentStudent ? <Text style={[styles.studentName, { color: colors.muted }]}>{currentStudent.name}</Text> : null}
              </View>
              <TouchableOpacity onPress={() => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))} style={styles.cardNav}>
                <Text style={[styles.navText, { color: colors.primary }]}>▶</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.weekDaysRowCard}>
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((w) => (
                  <Text key={w} style={[styles.weekDayCard, { color: colors.muted }]}>{w}</Text>
                ))}
              </View>

              <View style={styles.calendarGridCard}>
                {(() => {
                  const year = viewDate.getFullYear();
                  const month = viewDate.getMonth();
                  const first = new Date(year, month, 1);
                  const start = new Date(first);
                  start.setDate(first.getDate() - first.getDay()); // start from Sunday
                  const rows: any[] = [];
                  const today = new Date();
                  today.setHours(0,0,0,0);
                  for (let week = 0; week < 5; week++) {
                    const cols: any[] = [];
                    for (let day = 0; day < 7; day++) {
                      const dt = new Date(start.getFullYear(), start.getMonth(), start.getDate() + week * 7 + day);
                      const key = formatDateKey(dt);
                      const isCurrentMonth = dt.getMonth() === month;
                      const status = attendanceMap[key];
                      const isSelected = selectedDate === key;
                      const isFuture = dt.getTime() > today.getTime();
                      cols.push(
                        <Pressable
                          key={key}
                          disabled={isFuture}
                          onPress={() => !isFuture && setSelectedDate(key)}
                          style={[
                            styles.dayCell,
                            !isCurrentMonth ? styles.dayCellMuted : null,
                            isSelected ? { borderColor: colors.primary, borderWidth: 2 } : null,
                          ]}
                        >
                          <Text style={[styles.dayNumber, { color: isCurrentMonth ? colors.text : colors.muted }]}>{dt.getDate()}</Text>
                          {status ? (
                            <View style={[styles.dayDot, status === 'present' ? { backgroundColor: colors.success } : status === 'absent' ? { backgroundColor: '#e04646' } : { backgroundColor: '#f5a623' }]} />
                          ) : (
                            isFuture ? <View style={[styles.dayDot, styles.dayDotEmpty]} /> : null
                          )}
                        </Pressable>
                      );
                    }
                    rows.push(<View key={`r-${week}`} style={styles.weekRow}>{cols}</View>);
                  }
                  return rows;
                })()}
              </View>
            </View>
          </View>

          {/* summary cards: total present / absent for the month */}
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.statLabel, { color: colors.muted }]}>Present</Text>
              <Text style={[styles.statNumber, { color: colors.success }]}>{/* present count */}{useMemo(() => Object.values(attendanceMap).filter((v) => v === 'present').length, [attendanceMap])}</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.statLabel, { color: colors.muted }]}>Absent</Text>
              <Text style={[styles.statNumber, { color: colors.danger }]}>{/* absent count */}{useMemo(() => Object.values(attendanceMap).filter((v) => v === 'absent').length, [attendanceMap])}</Text>
            </View>
          </View>

          {/* Apply Leave action removed — calendar kept as a selector only */}
        </View>
      ) : null}

      {/* Student list removed: the attendance UI is focused on the logged-in student's calendar */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
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
  savedMsg: { textAlign: "center", marginBottom: 12 },

  /* Calendar / header */
  calendarHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 12, marginTop: 8 },
  navText: { fontSize: 18, fontWeight: "700", paddingHorizontal: 12 },
  monthTitle: { fontSize: 16, fontWeight: "700" },
  weekDaysRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 12, marginTop: 8 },
  weekDay: { width: 44, textAlign: "center", fontSize: 12 },
  calendarGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 12, marginTop: 8 },
  gridCell: { width: 44, height: 44, alignItems: "center", justifyContent: "center", borderRadius: 8, marginRight: 8, marginBottom: 8 },
  /* Card calendar styles */
  card: { marginHorizontal: 12, borderRadius: 14, padding: 12, elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8 },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  cardNav: { paddingHorizontal: 8 },
  cardBody: { borderTopWidth: 0, paddingTop: 6 },
  weekDaysRowCard: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 6 },
  weekDayCard: { width: 44, textAlign: 'center', fontSize: 12 },
  calendarGridCard: { },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  dayCell: { width: 44, height: 56, alignItems: 'center', justifyContent: 'center', borderRadius: 8 },
  dayCellMuted: { opacity: 0.45 },
  dayNumber: { fontSize: 14, marginBottom: 6 },
  dayDot: { width: 6, height: 6, borderRadius: 3, marginTop: 2 },
  dayDotEmpty: { backgroundColor: 'transparent' },
  /* summary stats */
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, marginTop: 12 },
  statCard: { flex: 1, padding: 12, borderRadius: 10, alignItems: 'center', marginHorizontal: 6 },
  statLabel: { fontSize: 13, marginBottom: 6 },
  statNumber: { fontSize: 18, fontWeight: '700' },
  studentName: { fontSize: 13, marginTop: 4 },
});
