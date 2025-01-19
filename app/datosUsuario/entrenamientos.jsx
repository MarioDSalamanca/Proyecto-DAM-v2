import { Pressable, View, Text, TextInput, ScrollView } from 'react-native';
import { styles } from '../../style/estilos';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import consultasDatosUsuario from '../consultas/datosUsuario';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';

export default function Entrenamientos() {

  const [ejercicios, setEjercicios] = useState([]);
  const [formDatos, setFormDatos] = useState({});
  const [checkbox, setCheckbox] = useState({});

  useEffect(() => {
    const getEjercicios = async () => {
      const getEjercicios = await consultasDatosUsuario.selectEjercicios();
      setEjercicios(getEjercicios);
      console.log("Ejercicios: ", getEjercicios);
    };

    getEjercicios();
  }, []);

  const filtrarEjercicios = async (grupo_muscular) => {
    const getEjercicios = await consultasDatosUsuario.selectEjerciciosFiltrados(grupo_muscular);
    setEjercicios(getEjercicios);
  }

  // Función para actualizar los datos del usuario
  const guardar = async () => {
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
  }

  const actualizarDatos = (name, value) => {
    setFormDatos((prev) => ({
      ...prev,
      [name]: value,
    }));      
  };

  // Función para manejar el cambio del checkbox
  function cambiarEstadoChechbox(id) {
    setCheckbox(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.entrenamientosLayout}>
        <View style={styles.entrenamientosLayouts}>
          <Text style={styles.labelEntrenamientos}>Fecha:</Text>
          <TextInput style={styles.inputsEntrenamientos} placeholder="dd" placeholderTextColor="gray" value={formDatos.usuario ? formDatos.usuario : ''} onChangeText={(value) => actualizarDatos('usuario', value)} keyboardType="numeric" />
          <Text style={styles.textoEntrenamientos}>/</Text>
          <TextInput style={styles.inputsEntrenamientos} placeholder="mm" placeholderTextColor="gray" value={formDatos.usuario ? formDatos.usuario : ''} onChangeText={(value) => actualizarDatos('usuario', value)} keyboardType="numeric" />
          <Text style={styles.textoEntrenamientos}>/</Text>
          <TextInput style={styles.inputsEntrenamientos} placeholder="aaaa" placeholderTextColor="gray" value={formDatos.usuario ? formDatos.usuario : ''} onChangeText={(value) => actualizarDatos('usuario', value)} keyboardType="numeric" />
        </View>
        <View style={styles.entrenamientosLayouts}>
          <Text style={styles.labelEntrenamientos}>Duración:</Text>
          <TextInput style={styles.inputsEntrenamientos} placeholder="hh" placeholderTextColor="gray" value={formDatos.usuario ? formDatos.usuario : ''} onChangeText={(value) => actualizarDatos('clave', value)} keyboardType="numeric" />
          <Text style={styles.textoEntrenamientos}>hora y</Text>
          <TextInput style={styles.inputsEntrenamientos} placeholder="mm" placeholderTextColor="gray" value={formDatos.usuario ? formDatos.usuario : ''} onChangeText={(value) => actualizarDatos('clave', value)} keyboardType="numeric" />
          <Text style={styles.textoEntrenamientos}>min</Text>
        </View>
        <View style={styles.entrenamientosLayouts}>
          <Text style={styles.labelEntrenamientos}>Grupo muscular:</Text>
          <View style={[styles.piker,{ width: "60%", marginVertical: 0, marginHorizontal: "1%" }]}>
            <Picker style={styles.filtroEntrenamientos} onValueChange={(value) => filtrarEjercicios(value)} >
              <Picker.Item label="Todos" value="Todos" />
              <Picker.Item label="Tren superior" value="Tren superior" />
              <Picker.Item label="Tren inferior" value="Tren inferior" />
              <Picker.Item label="Core" value="Core" />
            </Picker>
          </View>
        </View>
      </View>
      <ScrollView style={{ borderWidth: 1, borderColor: "#f8ad2a", }}>
        {ejercicios.length > 0 ? (
          ejercicios.map((ejercicio) => (
            <View key={ejercicio.id}>
              <View style={styles.datosEntrenamientos}>
                <Checkbox value={checkbox[ejercicio.id] || false} onValueChange={() => cambiarEstadoChechbox(ejercicio.id)} color={checkbox[ejercicio.id] ? '#f8ad2a' : null} />
                <Text style={styles.textoDatosEntrenamientos}>{ejercicio.nombre}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: "center", color: "white", fontSize: 18 }}>No hay ejercicios disponibles</Text>
        )}
      </ScrollView>
      <Pressable onPress={guardar} style={styles.guardarEntrenamiento} >
        <Text style={styles.textoPerfil}>Registrar entrenamiento</Text>
      </Pressable>
    </View>
  );
}
