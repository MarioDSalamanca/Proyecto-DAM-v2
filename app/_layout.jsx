import { Stack, Tabs, router } from "expo-router";
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

  // Cuando se inicie la vista se ejecutará el useEffect una vez para comprobar la autenticación
  useEffect(() => {
    
    const comprobarAuth = async () => {
      try {
        // AsyncStorage es para acceder al almacenamiento local persistente
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          router.replace("/");
        }
      } catch (error) {
        console.error("Error al comprobar la autenticación:", error);
      } finally {
        setLoading(false);
      }
    }

    comprobarAuth();

  }, []);

  if (loading) {
    // Mostrar un indicador de carga mientras se valida el token
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#303030" }}>
        <ActivityIndicator size="100" color="red" />
      </View>
    );
  }

  function mostrarMenu() {
    setMenu(!menu);
  }

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    router.replace("/");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="black" />
      <Pressable style={{ flex: 1 }} onPress={() => { menu ? mostrarMenu() : null; }}>
        <Stack
          screenOptions={({ route }) => ({
            headerShown: route.name !== "(login)/index",
            headerStyle: {
              backgroundColor: "#303030",
              paddingTop: 0,
            },
            headerTitleAlign: "center",
            headerTitle: () => (
              <Pressable onPress={ () => router.replace('/home') }>
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
      {menu && (
        <Menu mostrarMenu={mostrarMenu}/>
      )}
    </SafeAreaView>
  );
}