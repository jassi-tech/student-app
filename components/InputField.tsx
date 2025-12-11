import React from "react";
import {
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

interface Props extends TextInputProps {
	label?: string;
	error?: string;
	containerStyle?: StyleProp<ViewStyle>;
}

export default function InputField({ label, error, containerStyle, ...rest }: Props) {
	const { colors } = useTheme();

	return (
		<View style={[styles.container, containerStyle]}>
			{label ? <Text style={[styles.label, { color: colors.muted }]}>{label}</Text> : null}
			<TextInput placeholderTextColor={colors.muted} style={[styles.input, { borderColor: colors.inputBorder, backgroundColor: colors.surface, color: colors.text }]} {...rest} />
			{error ? <Text style={[styles.error, { color: colors.danger }]}>{error}</Text> : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { marginBottom: 12 },
	label: { marginBottom: 6, fontSize: 13 },
	input: {
		borderWidth: 1,
		paddingVertical: 12,
		paddingHorizontal: 14,
		borderRadius: 10,
	},
	error: { marginTop: 6, fontSize: 12 },
});

