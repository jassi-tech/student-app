import React from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface Props {
	title: string;
	onPress?: () => void;
	style?: ViewStyle;
	textStyle?: TextStyle;
	disabled?: boolean;
}

export default function CustomButton({ title, onPress, style, textStyle, disabled }: Props) {
	const { colors } = useTheme();

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={onPress}
			style={[{ backgroundColor: colors.primary }, styles.button, style, disabled && styles.disabled]}
			disabled={disabled}
		>
			<Text style={[styles.text, textStyle]}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingVertical: 14,
		borderRadius: 10,
		alignItems: "center",
	},
	text: { color: "#fff", fontWeight: "600", fontSize: 16 },
	disabled: { opacity: 0.6 },
});

