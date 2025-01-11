import { Pressable, View, Text, TextInput } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { styles } from '../../style/estilos';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from 'expo-router';
import consultasDatosUsuario from '../consultas/datosUsuario';

export default function Perfil() {

  const [usuario, setUsuario] = useState(null);
  const [respuesta, setRespuesta] = useState(null);

  useEffect(() => {

    const getUsuario = async () => {
      const getUsuario = await AsyncStorage.getItem("usuario");
      setUsuario(getUsuario);
    };

    getUsuario();

  }, [])

  useEffect(() => {

    const getDatosUsuario = async () => {
      const getRespuesta = await consultasDatosUsuario.select(usuario);
      setRespuesta(getRespuesta);
    };

    if (usuario != null) getDatosUsuario();

  }, [usuario])

  function guardar() {
    console.log("Listo para ser guardado: ", respuesta)
  }

  const actualizarDatos = (name, value) => {
    setRespuesta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.perfilLayout}>
        <View style={styles.perfilLayouts}>
          <Text style={styles.labelPerfil}>Usuario:</Text>
          <TextInput style={styles.inputsPerfil} value={respuesta?.usuario || ''} onChangeText={(value) => actualizarDatos('usuario', value)} />
        </View>
        <View style={styles.perfilLayouts}>
          <Text style={styles.labelPerfil}>Clave:</Text>
          <TextInput style={styles.inputsPerfil} value={respuesta?.clave || ''} onChangeText={(value) => actualizarDatos('clave', value)} />
        </View>
        <View style={styles.perfilLayouts}>
          <Text style={styles.labelPerfil}>Edad:</Text>
          <TextInput style={styles.inputsPerfil} value={respuesta?.edad || ''} onChangeText={(value) => actualizarDatos('edad', value)} keyboardType="numeric" />
        </View>
        <View style={styles.perfilLayouts}>
          <Text style={styles.labelPerfil}>Peso:</Text>
          <TextInput style={styles.inputsPerfil} value={respuesta?.peso || ''} onChangeText={(value) => actualizarDatos('peso', value)} keyboardType="numeric" />
        </View>
        <View style={styles.perfilLayouts}>
          <Text style={styles.labelPerfil}>Altura:</Text>
          <TextInput style={styles.inputsPerfil} value={respuesta?.altura || ''} onChangeText={(value) => actualizarDatos('altura', value)} keyboardType="numeric" />
        </View>
        <View style={styles.perfilLayouts}>
          <Text style={styles.labelPerfil}>Género:</Text>
          <TextInput style={styles.inputsPerfil} value={respuesta?.genero || ''} onChangeText={(value) => actualizarDatos('genero', value)} />
        </View>
        <Pressable style={styles.botonPerfil} onPress={guardar} >
          <Text style={styles.textoPerfil}>Guardar</Text>
        </Pressable>
      </View>
    </View>
  )
}