import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";



interface Props {
	title: string;
	subtitle?: string;
	onPress?: () => void;
	style?: ViewStyle;
	children?: ReactNode;
}

export default function DashboardCard({ title, subtitle, onPress, style, children }: Props) {
	const { colors } = useTheme();
	const content = (
		<View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.inputBorder }, style]}>
			<Text style={[styles.title, { color: colors.text }]}>{title}</Text>
			{subtitle ? <Text style={[styles.subtitle, { color: colors.muted }]}>{subtitle}</Text> : null}
			{children ? <View style={styles.children}>{children}</View> : null}
		</View>
	);

	if (onPress) return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
	return content;
}

const styles = StyleSheet.create({
	card: {
		padding: 16,
		borderRadius: 12,
		borderWidth: 1,
	},
	title: { fontSize: 16, fontWeight: "700" },
	subtitle: { marginTop: 6 },
	children: { marginTop: 10 },
});

