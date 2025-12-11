import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function MainLayout() {
  const { colors } = useTheme();
  const router = useRouter();

  function CustomDrawerContent(props: any) {
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Image source={require("../../assets/images/icon.png")} style={styles.logo} />
          <Text style={[styles.appName, { color: colors.text }]}>SchoolApp</Text>
        </View>
        <DrawerItemList {...props} />
        <View style={styles.spacer} />
        <View style={[styles.footer, { borderTopColor: colors.inputBorder }]}> 
          <DrawerItem
            label="Logout"
            labelStyle={{ color: colors.danger }}
            onPress={() => {
              // navigate to logout screen which handles clearing auth and redirecting
              props.navigation.closeDrawer();
              router.replace("/(auth)/login");
            }}
          />
        </View>
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        drawerStyle: { backgroundColor: colors.background },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.muted,
      }}
    >
      <Drawer.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Drawer.Screen name="attendance" options={{ title: "Attendance" }} />
      <Drawer.Screen name="homework" options={{ title: "Homework" }} />
      <Drawer.Screen name="fees" options={{ title: "Fees" }} />
      <Drawer.Screen name="profile" options={{ title: "Profile" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
      <Drawer.Screen name="logout" options={{ title: "Logout", drawerItemStyle: { display: "none" } }} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  headerContainer: { alignItems: "center", paddingVertical: 20, borderBottomWidth: 0, marginBottom: 6 },
  logo: { width: 64, height: 64, borderRadius: 12, marginBottom: 8 },
  appName: { fontSize: 16, fontWeight: "700" },
  spacer: { flex: 1 },
  footer: { borderTopWidth: 1 },
});
