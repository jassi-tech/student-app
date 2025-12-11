import { Stack } from "expo-router";
import LoadingScreen from "../components/LoadingScreen";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LoadingScreen>
        <Stack screenOptions={{ headerShown: false }} />
      </LoadingScreen>
    </ThemeProvider>
  );
}
