import { useEffect, useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../style/estilos";

export default function Menu({ menuVisible, mostrarMenu }) {

  // Estados para mostrar el nombre del usuario y la animación del menú
  const [usuario, setUsuario] = useState('');
  const [isPressed, setIsPressed] = useState(false);

  // Modificar el estado de la animación
  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  // Rescatar el usuario
  useEffect(() => {
    const usuario = AsyncStorage.getItem("usuario");
    setUsuario(usuario);
  }, []);

  return (
      <Modal animationType="fade" transparent={true} visible={menuVisible} onRequestClose={mostrarMenu} >
        <View style={styles.overlay}>
          <View style={styles.menu}>
            <View style={styles.cabeceraMenu}>
              <MaterialCommunityIcons name="account" size={30} color="black" style={styles.cabeceraIcono} />
              <Text style={styles.cabeceraUsuario}>{usuario}</Text>
              <Pressable onPress={mostrarMenu} style={styles.cerrarMenu}>
                <MaterialCommunityIcons name="close-circle-outline" size={30} color="white" />
              </Pressable>
            </View>
            <View style={styles.linksMenu}>
              <Pressable
                onPress={() => {
                  mostrarMenu();
                  router.replace("/datosUsuario/perfil");
                }}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={({ pressed }) => [{ backgroundColor: pressed ? "white" : "black" }, styles.cajaLinksMenu, ]} >
                <Text style={[ styles.linkMenu, { color: isPressed ? "black" : "white" }, ]} >
                  <MaterialCommunityIcons name="account-edit" size={18} color={isPressed ? "black" : "white"} /> Mi Perfil
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  mostrarMenu();
                  router.replace("/datosUsuario/datos");
                }}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={({ pressed }) => [{ backgroundColor: pressed ? "white" : "black" }, styles.cajaLinksMenu, ]} >
                <Text style={[ styles.linkMenu, { color: isPressed ? "black" : "white" }, ]} >
                  <MaterialCommunityIcons name="google-analytics" size={18} color={isPressed ? "black" : "white"} /> Datos
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  mostrarMenu();
                  router.replace("/datosUsuario/entrenamientos");
                }}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={({ pressed }) => [{ backgroundColor: pressed ? "white" : "black" }, styles.cajaLinksMenu, ]} >
                <Text style={[ styles.linkMenu, { color: isPressed ? "black" : "white" }, ]} >
                  <MaterialCommunityIcons name="arm-flex-outline" size={18} color={isPressed ? "black" : "white"} /> Entrenamientos
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  mostrarMenu();
                  router.replace("/datosUsuario/info");
                }}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={({ pressed }) => [{ backgroundColor: pressed ? "white" : "black" }, styles.cajaLinksMenu, ]} >
                <Text style={[ styles.linkMenu, { color: isPressed ? "black" : "white" }, ]} >
                  <MaterialCommunityIcons name="information-outline" size={18} color={isPressed ? "black" : "white"} /> Info
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
  );
}
