import { Pressable, View, Text } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { styles } from '../style/estilos';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from 'expo-router';

export default function Menu({ mostrarMenu }) {

  // Estados para mostrar el nombre del usuario y la animación del menú
  const [usuario, setUsuario] = useState('');
  const [isPressed, setIsPressed] = useState(false);

  // Modificar el estado de la animación
  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  // Rescatar el usuario
  useEffect(() => {
    const getUsuario = async () => {
      const usuario = await AsyncStorage.getItem("usuario");
      usuario ? setUsuario(usuario) : setUsuario('nose');
    }

    getUsuario();
  }, []);

  return (
    <View style={ styles.menu }>
      <View style={ styles.cabeceraMenu }>
        <Pressable onPress={() => { mostrarMenu(); router.replace('/(usuario)/usuario'); }} style={ styles.cabeceraIcono }>
          <MaterialCommunityIcons name="account" size={30} color="black" />
        </Pressable>
        <Text style={styles.cabeceraUsuario}>{usuario}</Text>
        <Pressable onPress={mostrarMenu} style={ styles.cerrarMenu }>
          <MaterialCommunityIcons name="keyboard-backspace" size={30} color="white" />
        </Pressable>
      </View>
      <View style={ styles.linksMenu }>
      <Pressable onPress={() => { mostrarMenu(); router.replace('/(usuario)/perfil'); }}
          onPressIn={ handlePressIn }
          onPressOut={ handlePressOut }
          style={({ pressed }) => [{ backgroundColor: pressed ? 'white' : 'black' }, styles.cajaLinksMenu]}>
          <Text style={[styles.linkMenu, { color: isPressed ? 'black' : 'white' }]}>
          <MaterialCommunityIcons name="account-edit" size={18} color={ isPressed ? 'black' : 'white' } />    Mi Perfil
          </Text>
        </Pressable>
        <Pressable onPress={() => { mostrarMenu(); router.replace('/(usuario)/datos'); }}
          onPressIn={ handlePressIn }
          onPressOut={ handlePressOut }
          style={({ pressed }) => [{ backgroundColor: pressed ? 'white' : 'black' }, styles.cajaLinksMenu]}>
          <Text style={[styles.linkMenu, { color: isPressed ? 'black' : 'white' }]}>
          <MaterialCommunityIcons name="google-analytics" size={18} color={ isPressed ? 'black' : 'white' } />    Datos
          </Text>
        </Pressable>
        <Pressable onPress={() => { mostrarMenu(); router.replace('/(usuario)/entrenamientos'); }}
          onPressIn={ handlePressIn } 
          onPressOut={ handlePressOut }
          style={({ pressed }) => [{ backgroundColor: pressed ? 'white' : 'black' }, styles.cajaLinksMenu]}>
          <Text style={[styles.linkMenu, { color: isPressed ? 'black' : 'white' }]}>
          <MaterialCommunityIcons name="arm-flex-outline" size={18} color={ isPressed ? 'black' : 'white' } />    Entrenamientos
          </Text>
        </Pressable>
        <Pressable onPress={() => { mostrarMenu(); router.replace('/(usuario)/info'); }}
          onPressIn={ handlePressIn } 
          onPressOut={ handlePressOut }
          style={({ pressed }) => [{ backgroundColor: pressed ? 'white' : 'black' }, styles.cajaLinksMenu]}>
          <Text style={[styles.linkMenu, { color: isPressed ? 'black' : 'white' }]}>
            <MaterialCommunityIcons name="information-outline" size={18} color={ isPressed ? 'black' : 'white' } />    Info
          </Text>
        </Pressable>
        
      </View>
    </View>
  );
}