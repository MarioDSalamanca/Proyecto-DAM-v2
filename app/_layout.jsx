import { Stack, router} from "expo-router";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, Text } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "./menu";

export default function Layout() {

  const [menuVisible, setMenuVisible] = useState(false);

  // Función para mostrar u ocultar el menú
  const mostrarMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // Función de logout
  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("usuario");
    router.replace("/");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="black" />
        <Stack
          screenOptions={({ route }) => ({
            headerShown: route.name !== "index",
            headerStyle: {
              backgroundColor: "#303030",
            },
            headerTitleAlign: "center",
            headerTitle: () => (
              <Pressable onPress={() => router.replace('/')}>
                <Text style={{ color: "#f8ad2a", fontSize: 20, fontWeight: "500", letterSpacing: 1,}}>
                  VitalPower
                </Text>
              </Pressable>
            ),
            headerLeft: () => (
              <Pressable onPress={mostrarMenu}
                style={({ pressed }) => [{ backgroundColor: pressed ? 'grey' : null }]}>
                <MaterialCommunityIcons name="menu" size={35} color="#f8ad2a" />
              </Pressable>
            ),
            headerRight: () => (
              <Pressable onPress={logout}
                style={({ pressed }) => [{ backgroundColor: pressed ? 'grey' : null }]}>
                <MaterialCommunityIcons name="logout" size={35} color="#f8ad2a" />
              </Pressable>
            ),
          })}
        />
      <Menu menuVisible={menuVisible} mostrarMenu={mostrarMenu} />
    </SafeAreaView>
  );
}
