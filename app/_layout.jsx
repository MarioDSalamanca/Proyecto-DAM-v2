import { Stack, router} from "expo-router";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, Text } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "./menu";

export default function Layout() {

  const [menu, setMenu] = useState(false);

  // Modificar el estado de la animación
  const [isPressed, setIsPressed] = useState(false);
  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  // Función para mostrar u ocultar el menú
  function mostrarMenu() {
    setMenu(!menu);
  }

  // Función de logout
  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    router.replace("/");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="black" />
      <Pressable style={{ flex: 1 }} onPress={() => { menu ? mostrarMenu() : null; }}>
        <Stack
          screenOptions={({ route }) => ({
            headerShown: route.name !== "index",
            headerStyle: {
              backgroundColor: "#303030",
              paddingTop: 0,
            },
            headerTitleAlign: "center",
            headerTitle: () => (
              <Pressable onPress={() => router.replace('/')}>
                <Text style={{ color: "#f8ad2a", fontSize: 20, fontWeight: "500", letterSpacing: 1 }}>
                  VitalPower
                </Text>
              </Pressable>
            ),
            headerLeft: () => (
              <Pressable onPress={mostrarMenu}
                onPressIn={ handlePressIn }
                onPressOut={ handlePressOut }
                style={({ pressed }) => [{ backgroundColor: pressed ? 'grey' : null }]}>
                <MaterialCommunityIcons name="menu" size={30} color="#f8ad2a" />
              </Pressable>
            ),
            headerRight: () => (
              <Pressable onPress={logout}
                onPressIn={ handlePressIn }
                onPressOut={ handlePressOut }
                style={({ pressed }) => [{ backgroundColor: pressed ? 'grey' : null }]}>
                <MaterialCommunityIcons name="logout" size={30} color="#f8ad2a" />
              </Pressable>
            ),
          })}
        />
      </Pressable>
      {menu && <Menu mostrarMenu={mostrarMenu} />}
    </SafeAreaView>
  );
}
