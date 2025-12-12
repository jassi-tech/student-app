import React from "react";
import {
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { MockUser, mockUsers } from "../../services/dataSource";

type User = {
  name: string;
  email: string;
  roll?: string;
  className?: string;
  avatarUrl?: string;
};

export default function Profile(): React.ReactElement {
  const { colors } = useTheme();

  // NOTE: use mock data source for demo / local dev. Replace with auth/context in production.
  const currentMock: MockUser | undefined = mockUsers[0];

  const user = {
    name: currentMock?.name ?? "Unknown Student",
    email: currentMock?.email ?? "",
    roll: currentMock?.roll ?? "",
    className: currentMock?.className ?? "",
    fatherName: currentMock?.fatherName ?? "",
    phone: currentMock?.phone ?? "",
    avatarUrl: undefined,
  } as const;

  const initials = user.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Actions removed per user request. Keep handlers available if you want to re-enable buttons.
  function handleEdit() {
    console.log("Edit profile");
  }

  function handleLogout() {
    console.log("Logout");
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.header, { backgroundColor: colors.surface }]}>
          <View style={styles.centerAvatarWrapper}>
            {user.avatarUrl ? (
              <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
            ) : (
              <View
                style={[
                  styles.avatarFallback,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text style={styles.avatarInitials}>{initials}</Text>
              </View>
            )}
          </View>
          <Text
            style={[styles.name, { color: colors.text, textAlign: "center" }]}
          >
            {user.name}
          </Text>
          <Text
            style={[
              styles.email,
              { color: colors.muted, textAlign: "center", marginBottom: 12 },
            ]}
          >
            {user.email}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text, textAlign: "center" },
            ]}
          >
            Student Details
          </Text>

          <View style={styles.centeredRow}>
            <Text style={[styles.label, { color: colors.muted }]}>
              Roll Number
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {user.roll ?? "—"}
            </Text>
          </View>

          <View style={styles.centeredRow}>
            <Text style={[styles.label, { color: colors.muted }]}>Class</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {user.className ?? "—"}
            </Text>
          </View>

          <View style={styles.centeredRow}>
            <Text style={[styles.label, { color: colors.muted }]}>
              Father's Name
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {user.fatherName ?? "—"}
            </Text>
          </View>

          <View style={styles.centeredRow}>
            <Text style={[styles.label, { color: colors.muted }]}>Phone</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {user.phone ?? "—"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
  // header is stacked: name/email then centered avatar
  header: {
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 18,
  },
  centerAvatarWrapper: { alignItems: "center", marginTop: 6, marginBottom: 6 },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  avatarFallback: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: { color: "#fff", fontSize: 36, fontWeight: "700" },
  name: { fontSize: 20, fontWeight: "700", marginBottom: 4 },
  email: { fontSize: 14 },
  card: { padding: 16, borderRadius: 12, marginBottom: 18 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12 },
  centeredRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  label: { fontSize: 13 },
  value: { fontSize: 14, fontWeight: "600" },
  // kept for possible future actions
  actions: { flexDirection: "row", justifyContent: "space-between" },
});
