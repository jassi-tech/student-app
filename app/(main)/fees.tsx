import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import DashboardCard from "../../components/DashboardCard";
import { useTheme } from "../../context/ThemeContext";
import useFetch from "../../hooks/useFetch";
import { getReceipts, Receipt } from "../../services/api";

export default function Free() {
  const { colors } = useTheme();
  const { data, loading, error } = useFetch<Receipt[]>(getReceipts);

  const freeReceipts = (data || []).filter((r) => r.amount === 0 || r.status === "free");

  function renderReceipt({ item }: { item: Receipt }) {
    return (
      <DashboardCard title={item.studentName} subtitle={`${new Date(item.date).toLocaleDateString()}`} style={styles.card}>
        <Text style={[styles.amount, { color: colors.text }]}>Amount: ₹{item.amount}</Text>
        {item.description ? <Text style={[styles.desc, { color: colors.muted }]}>{item.description}</Text> : null}
        <CustomButton title="View" onPress={() => console.log("Receipt details", item)} style={styles.viewButton} />
      </DashboardCard>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Free Receipts</Text>
      {loading ? (
        <ActivityIndicator size="small" color={colors.primary} />
      ) : error ? (
        <Text style={{ color: colors.danger }}>{error}</Text>
      ) : freeReceipts.length === 0 ? (
        <Text style={[styles.noData, { color: colors.muted }]}>No free receipts found</Text>
      ) : (
        <FlatList data={freeReceipts} keyExtractor={(i) => i.id} renderItem={renderReceipt} contentContainerStyle={{ padding: 8 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  card: { marginBottom: 10 },
  amount: { marginTop: 8, fontWeight: "700" },
  desc: { marginTop: 6, fontSize: 13 },
  viewButton: { marginTop: 10 },
  noData: { marginTop: 12 },
});

