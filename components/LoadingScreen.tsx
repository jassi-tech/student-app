import React, { ReactNode, useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface Props {
  children: ReactNode;
  /** Minimum time to show splash in ms */
  minMs?: number;
}

export default function LoadingScreen({ children, minMs = 900 }: Props) {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), minMs);
    return () => clearTimeout(t);
  }, [minMs]);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}> 
        <Image source={require("../assets/images/icon.png")} style={styles.logo} />
        <Text style={[styles.title, { color: colors.text }]}>SchoolApp</Text>
        <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: 12 }} />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: { width: 84, height: 84, borderRadius: 12 },
  title: { marginTop: 12, fontSize: 18, fontWeight: "700" },
});
