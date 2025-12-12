import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";



interface Props {
	title: string;
	subtitle?: string;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
	children?: ReactNode;
}

export default function DashboardCard({ title, subtitle, onPress, style, children }: Props) {
	const { colors } = useTheme();
	const content = (
		<View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.inputBorder }, style]}>
			{/* Limit title/subtitle to a single line to avoid wrapping into a second line in tight layouts */}
			<Text style={[styles.title, { color: colors.text }]} numberOfLines={1} ellipsizeMode="tail">
				{title}
			</Text>
			{subtitle ? (
				<Text style={[styles.subtitle, { color: colors.muted }]} numberOfLines={1} ellipsizeMode="tail">
					{subtitle}
				</Text>
			) : null}
			{children ? <View style={styles.children}>{children}</View> : null}
		</View>
	);

	if (onPress) return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
	return content;
}

const styles = StyleSheet.create({
	card: {
		padding: 12,
		borderRadius: 12,
		borderWidth: 1,
		minWidth: 0, // allow shrinking in tight row layouts
		overflow: "hidden",
	},
	title: { fontSize: 16, fontWeight: "700", flexShrink: 1 },
	subtitle: { marginTop: 6, flexShrink: 1 },
	children: { marginTop: 10 },
});

