import { useRootNavigationState, Stack, router, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Pressable, View, Text } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "./menu";

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(false);
  const [navigationReady, setNavigationReady] = useState(false);

  // Utiliza useRootNavigationState para obtener el estado de navegación
  const rootNavigationState = useRootNavigationState();

  // Effect para comprobar cuando el estado de navegación esté listo
  useEffect(() => {
    console.log("Estado de navegación:", rootNavigationState);

    // Si la navegación está lista y no está en estado stale, establecer el estado de navegación como listo
    if (rootNavigationState?.key && !rootNavigationState.stale) {
      setNavigationReady(true);
    }
  }, [rootNavigationState]);

  // Efecto para comprobar la autenticación solo cuando la navegación esté lista
  useEffect(() => {
    if (navigationReady) {
      const comprobarAuth = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
          if (!token) {
            // Redirige si no hay token
            router.replace("/");
          }
        } catch (error) {
          console.error("Error al comprobar la autenticación:", error);
        } finally {
          setLoading(false);
        }
      };

      comprobarAuth();
    }
  }, [navigationReady]);

  // Si el estado de navegación no está listo o hay carga, mostrar indicador de carga
  if (!rootNavigationState || rootNavigationState.stale || loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#303030" }}>
        <ActivityIndicator size="large" color="red" />
        <Text style={{ color: "white", marginTop: 10 }}>Cargando navegación...</Text>
      </View>
    );
  }

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
            headerShown: route.name !== "/",
            headerStyle: {
              backgroundColor: "#303030",
              paddingTop: 0,
            },
            headerTitleAlign: "center",
            headerTitle: () => (
              <Pressable onPress={() => router.replace('/home')}>
                <Text style={{ color: "red", fontSize: 20, fontWeight: "500", letterSpacing: 1 }}>
                  VitalPower
                </Text>
              </Pressable>
            ),
            headerLeft: () => (
              <Pressable onPress={mostrarMenu}>
                <MaterialCommunityIcons name="menu" size={24} color="red" />
              </Pressable>
            ),
            headerRight: () => (
              <Pressable onPress={logout}>
                <MaterialCommunityIcons name="logout" size={24} color="red" />
              </Pressable>
            ),
          })}
        />
      </Pressable>
      {menu && <Menu mostrarMenu={mostrarMenu} />}
    </SafeAreaView>
  );
}
