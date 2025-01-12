import { Pressable, View, Text, TextInput } from 'react-native';
import { styles } from '../../style/estilos';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import consultasDatosUsuario from '../consultas/datosUsuario';

export default function Perfil() {

  const [usuario, setUsuario] = useState(null);
  const [respuesta, setRespuesta] = useState(null);
  const [formDatos, setFormDatos] = useState(null);

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
      const getRespuesta = await consultasDatosUsuario.select(usuario);
      setRespuesta(getRespuesta);

      setFormDatos({
        usuarioAntiguo: getRespuesta.usuario,
        usuario: getRespuesta.usuario,
        clave: getRespuesta.clave,
        edad: getRespuesta.edad || null,
        peso: getRespuesta.peso || null,
        altura: getRespuesta.altura || null,
        genero: getRespuesta.genero || null
      });
    };

    if (usuario != null) getDatosUsuario();

  }, [usuario]);

  // Función para actualizar los datos del usuario
  const guardar = async () => {
        
    const hayCambios = Object.keys(formDatos)
      .filter((key) => key !== 'usuarioAntiguo')
      .some((key) => {
        console.log(`Comparando ${key}: ${formDatos[key]} !== ${respuesta[key]}`);
        return formDatos[key] !== respuesta[key]});

    if (hayCambios) {
      if (formDatos.usuario.length < 4) {
        alert("El usuario como mínimo debe tener 4 caracteres"); 
        return;
      }
      if (formDatos.clave.length < 6) {
        alert("La clave como mínimo debe tener 6 caracteres");
        return;
      }

      /* setUsuario(formDatos.usuario); */
      
      const actualizar = await consultasDatosUsuario.update(formDatos);

      alert(actualizar.mensaje);
      console.log("Respuesta: ", respuesta);
      console.log("FormDatos: ", formDatos);
      console.log("Usuario: ", usuario);


      if (actualizar.estado == true) {

        await AsyncStorage.removeItem("usuario");
        await AsyncStorage.setItem("usuario", formDatos.usuario);

        // No refresca bien

      } else {
        alert("Algo ha salido mal")
      }

    } else {
      console.log("Respuesta: ", respuesta);
      console.log("FormDatos: ", formDatos);
      console.log("Usuario: ", usuario);
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
          <TextInput style={styles.inputsPerfil} value={formDatos?.usuario || 'error'} onChangeText={(value) => actualizarDatos('usuario', value)} />
        </View>
        <View style={styles.perfilLayouts}>
          <Text style={styles.labelPerfil}>Clave:</Text>
          <TextInput style={styles.inputsPerfil} onChangeText={(value) => actualizarDatos('clave', value)} secureTextEntry />
        </View>
        <View style={styles.perfilLayouts}>
          <Text style={styles.labelPerfil}>Edad:</Text>
          <TextInput style={styles.inputsPerfil} value={formDatos?.edad || 'error'} onChangeText={(value) => actualizarDatos('edad', value)} keyboardType="numeric" />
        </View>
        <View style={styles.perfilLayouts}>
          <Text style={styles.labelPerfil}>Peso:</Text>
          <TextInput style={styles.inputsPerfil} value={formDatos?.peso || 'error'} onChangeText={(value) => actualizarDatos('peso', value)} keyboardType="numeric" />
        </View>
        <View style={styles.perfilLayouts}>
          <Text style={styles.labelPerfil}>Altura:</Text>
          <TextInput style={styles.inputsPerfil} value={formDatos?.altura || 'error'} onChangeText={(value) => actualizarDatos('altura', value)} keyboardType="numeric" />
        </View>
        <View style={styles.perfilLayouts}>
          <Text style={styles.labelPerfil}>Género:</Text>
          <TextInput style={styles.inputsPerfil} value={formDatos?.genero || 'error'} onChangeText={(value) => actualizarDatos('genero', value)} />
        </View>
        <Pressable onPress={guardar} style={({ pressed }) => [{ backgroundColor: pressed ? "#f8ad2a" : "white" }, styles.botonPerfil]} >
          <Text style={styles.textoPerfil}>Guardar</Text>
        </Pressable>
      </View>
    </View>
  )
}