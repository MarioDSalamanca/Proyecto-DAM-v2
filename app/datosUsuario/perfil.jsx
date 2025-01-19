import { Pressable, View, Text, TextInput } from 'react-native';
import { styles } from '../../style/estilos';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import consultasDatosUsuario from '../consultas/datosUsuario';
import { Picker } from '@react-native-picker/picker';

export default function Perfil() {

  const [usuario, setUsuario] = useState(null);
  const [respuesta, setRespuesta] = useState(null);
  const [formDatos, setFormDatos] = useState({});

  useEffect(() => {

    const getUsuario = async () => {
      const getUsuario = await AsyncStorage.getItem("usuario");
      setUsuario(getUsuario);
    };

    getUsuario();

  }, []);

  // Capturar todos los datos del usuario conectado
  useEffect(() => {

    const getDatosUsuario = async () => {
      const getRespuesta = await consultasDatosUsuario.selectPerfil(usuario);
      setRespuesta(getRespuesta);

      setFormDatos({
        usuarioAntiguo: getRespuesta.usuario,
        usuario: getRespuesta.usuario,
        clave: getRespuesta.clave,
        edad: getRespuesta.edad,
        peso: getRespuesta.peso,
        altura: getRespuesta.altura,
        genero: getRespuesta.genero
      });
    };

    if (usuario != null) getDatosUsuario();

  }, [usuario]);

  // Función para actualizar los datos del usuario
  const guardar = async () => {
        
    const hayCambios = Object.keys(formDatos)
      .filter((key) => key !== 'usuarioAntiguo')
      .some((key) => { return formDatos[key] !== respuesta[key] });

    if (hayCambios) {
      if (formDatos.usuario.length < 4) {
        alert("El usuario como mínimo debe tener 4 caracteres"); 
        return;
      }
      if (formDatos.clave.length < 6) {
        alert("La clave como mínimo debe tener 6 caracteres");
        return;
      }
      
      const actualizar = await consultasDatosUsuario.updatePerfil(formDatos);
      alert(actualizar.mensaje);

      if (actualizar.estado == true) {

        await AsyncStorage.setItem("usuario", formDatos.usuario);

      } else {
        alert("Algo ha salido mal")
      }

    } else {
      alert("No se ha modificado ningun dato");
    }

  }

  const actualizarDatos = (name, value) => {
    setFormDatos((prev) => ({
      ...prev,
      [name]: value,
    }));      
  };

  return (
    <View style={styles.container}>
      <View style={styles.perfilLayout}>
        <View style={styles.perfilLayouts}>
          <Text style={styles.labelPerfil}>Usuario:</Text>
          <TextInput style={styles.inputsPerfil} value={formDatos.usuario ? formDatos.usuario : ''} onChangeText={(value) => actualizarDatos('usuario', value)} />
        </View>
        <View style={styles.perfilLayouts}>
          <Text style={styles.labelPerfil}>Clave:</Text>
          <TextInput style={styles.inputsPerfil} onChangeText={(value) => actualizarDatos('clave', value)} secureTextEntry />
        </View>
        <View style={styles.perfilLayouts}>
          <Text style={styles.labelPerfil}>Edad:</Text>
          <TextInput style={styles.inputsPerfil} value={formDatos.edad ? formDatos.edad.toString() : ''} onChangeText={(value) => actualizarDatos('edad', value)} keyboardType="decimal-pad" />
        </View>
        <View style={styles.perfilLayouts}>
          <Text style={styles.labelPerfil}>Peso:</Text>
          <TextInput style={styles.inputsPerfil} value={formDatos.peso ? formDatos.peso.toString() : ''} onChangeText={(value) => actualizarDatos('peso', value)} keyboardType="decimal-pad" />
        </View>
        <View style={styles.perfilLayouts}>
          <Text style={styles.labelPerfil}>Altura:</Text>
          <TextInput style={styles.inputsPerfil} value={formDatos.altura ? formDatos.altura.toString() : ''} onChangeText={(value) => actualizarDatos('altura', value)} keyboardType="decimal-pad" />
        </View>
        <View style={[styles.perfilLayouts, styles.piker]}>
          <Text style={styles.labelPerfil}>Género:</Text>
          <Picker selectedValue={formDatos.genero ? formDatos.genero : ''} onValueChange={(value) => actualizarDatos('genero', value)} style={styles.inputsPerfil} >
            <Picker.Item label="" value="" />
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Femenino" value="Femenino" />
          </Picker>
        </View>
        <Pressable onPress={guardar} style={({ pressed }) => [{ backgroundColor: pressed ? "#f8ad2a" : "white" }, styles.botonPerfil]} >
          <Text style={styles.textoPerfil}>Guardar</Text>
        </Pressable>
      </View>
    </View>
  )
}