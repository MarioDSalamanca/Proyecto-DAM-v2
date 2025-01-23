import { Pressable, View, Text, TextInput, ScrollView } from 'react-native';
import { styles } from '../../style/estilos';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import consultasDatosUsuario from '../consultas/datosUsuario';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from "expo-router";


export default function Entrenamientos() {

  const [ejercicios, setEjercicios] = useState([]);
  const [formDatos, setFormDatos] = useState({
    fecha: new Date(),
    horas: '',
    minutos: '',
    ejerciciosSeleccionados: {}
  });
  const [mostrarFecha, setMostrarFecha] = useState(false);

  useEffect(() => {
    getEjercicios();
    getUsuario();
  }, []);

  const getEjercicios = async () => {
    const getEjercicios = await consultasDatosUsuario.selectEjercicios();
    setEjercicios(getEjercicios);
  };

  const getUsuario = async () => {
    const getUsuario = await AsyncStorage.getItem("usuario");
    setFormDatos((prev) => ({
      ...prev,
      usuario: getUsuario,
    }));
  };

  const filtrarEjercicios = async (grupo_muscular) => {
    const getEjercicios = await consultasDatosUsuario.selectEjerciciosFiltrados(grupo_muscular);
    setEjercicios(getEjercicios);
  }

  const actualizarDatos = (name, value) => {
    setFormDatos((prev) => ({
      ...prev,
      [name]: value,
    }));      
  };

  function agregarEjercicio(id, campo, valor) {
    setFormDatos((prev) => ({
      ...prev,
      ejerciciosSeleccionados: {
        ...prev.ejerciciosSeleccionados,
        [id]: {
          ...prev.ejerciciosSeleccionados[id],
          [campo]: valor,
        },
      },
    }));
  }

  function validarFormulario() {
    const errores = [];
    if (Object.entries(formDatos.ejerciciosSeleccionados).length > 0) {
      Object.entries(formDatos.ejerciciosSeleccionados).forEach(([id, datos]) => {
        if (datos.seleccionado) {
          if (!datos.series || !datos.reps) {
            errores.push(`Faltan datos en el ejercicio "${datos.nombre}"`);
          }
        }
      });
    } else {
      errores.push('No has seleccionado ningún ejercicio');
    }

    if (formDatos.horas == '' && formDatos.minutos == '') {
      errores.push('Indica la duración de tu entrenamiento');
    }
  
    if (errores.length > 0) {
      alert(errores.join("\n\n"));
      return false;
    }
    return true;
  }

  const guardar = async () => {
    if (validarFormulario()) {
      setFormDatos((prev) => ({
        ...prev,
        fechaFormateada: formDatos.fecha.toLocaleDateString(),
      }));

      const guardarEntrenamiento = await consultasDatosUsuario.insertEntrenamiento(formDatos);

      alert(guardarEntrenamiento.mensaje)
      router.replace("/datosUsuario/entrenamientos");

    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.entrenamientosLayout}>
        <View style={styles.entrenamientosLayouts}>
          <Text style={styles.labelEntrenamientos}>Fecha:</Text>
          <Pressable onPress={() => setMostrarFecha(true)}>
            <Text style={styles.botonFecha}>{ formDatos.fecha.toLocaleDateString() }</Text>
          </Pressable>
            { mostrarFecha && (
              <DateTimePicker value={formDatos.fecha} mode={'date'} is24Hour={true}
              onChange={ (event, value) => { setMostrarFecha(false); if (value) actualizarDatos('fecha', value); }} />
            )}
        </View>
        <View style={styles.entrenamientosLayouts}>
          <Text style={styles.labelEntrenamientos}>Duración:</Text>
          <TextInput style={styles.inputsEntrenamientos} placeholder="hh"
           placeholderTextColor="gray" onChangeText={(value) => actualizarDatos('horas', value)} keyboardType="numeric" />
          <Text style={styles.textoEntrenamientos}>hora y</Text>
          <TextInput style={styles.inputsEntrenamientos} placeholder="mm"
           placeholderTextColor="gray" onChangeText={(value) => actualizarDatos('minutos', value)} keyboardType="numeric" />
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
      <ScrollView style={{ maxHeight: "55%" }}>
        {ejercicios.length > 0 ? (
          ejercicios.map((ejercicio) => (
            <View key={ejercicio.id}>
              <View style={styles.ejerciciosEntrenamientos}>
                <View>
                <Checkbox 
                  value={formDatos.ejerciciosSeleccionados[ejercicio.id]?.seleccionado || false} 
                  onValueChange={(value) => { 
                    agregarEjercicio(ejercicio.id, "seleccionado", value); 
                    value ? agregarEjercicio(ejercicio.id, "nombre", ejercicio.nombre) : null} } 
                  color={formDatos.ejerciciosSeleccionados[ejercicio.id]?.seleccionado ? '#f8ad2a' : undefined}
                />
                </View>
                <View style={styles.datosEjerciciosEntrenamientos}>
                  <Text style={styles.textoEntrenamientos}>{ejercicio.nombre}</Text>
                </View>
                <View style={styles.datosEjerciciosEntrenamientos}>
                  <TextInput 
                    style={[
                      styles.inputsEjerciciosEntrenamientos, 
                      { backgroundColor: formDatos.ejerciciosSeleccionados[ejercicio.id]?.seleccionado ? "black" : "transparent" }
                    ]}
                    onChangeText={(value) => agregarEjercicio(ejercicio.id, "series", value)}
                    editable={formDatos.ejerciciosSeleccionados[ejercicio.id]?.seleccionado || false}
                    keyboardType="numeric"
                  />
                  <Text style={{ color: "white", fontSize: 15 }}> series</Text>
                </View>
                <View style={styles.datosEjerciciosEntrenamientos}>
                  <TextInput 
                    style={[
                      styles.inputsEjerciciosEntrenamientos, 
                      { backgroundColor: formDatos.ejerciciosSeleccionados[ejercicio.id]?.seleccionado ? "black" : "transparent" }
                    ]}
                    onChangeText={(value) => agregarEjercicio(ejercicio.id, "reps", value)}
                    editable={formDatos.ejerciciosSeleccionados[ejercicio.id]?.seleccionado || false}
                    keyboardType="numeric"
                  />
                  <Text style={{ color: "white", fontSize: 15 }}> reps</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: "center", color: "white", fontSize: 18, marginTop: "3%" }}>No hay ejercicios disponibles</Text>
        )}
      </ScrollView>
      <Pressable onPress={() => guardar()} style={styles.guardarEntrenamiento} >
        <Text style={styles.textoPerfil}>Registrar entrenamiento</Text>
      </Pressable>
    </View>
  );
}
