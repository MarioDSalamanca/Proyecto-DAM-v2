import { Pressable, View, Text, Alert, ScrollView } from 'react-native';
import { styles } from '../../style/estilos';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import consultasDatosUsuario from '../consultas/datosUsuario';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Datos() {

  const [usuario, setUsuario] = useState(null);
  const [respuesta, setRespuesta] = useState({});
  const [expandido, setExpandido] = useState(null);

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
      const getRespuesta = await consultasDatosUsuario.selectDatos(usuario);
      setRespuesta(getRespuesta);
    };

    if (usuario != null) getDatosUsuario();

  }, [usuario]);

  function mostrar(id) {
    setExpandido(expandido === id ? null : id);
  }

  function eliminar(entrenamiento) {
    Alert.alert(
      "Eliminar entrenamiento ",
      "¿Deseas eliminar el entrenamiento del " + entrenamiento.fecha + "?",
      [
        {
          text: "Cancelar",
        },
        {
          text: "Aceptar",
          onPress: async () => {
            const eliminado = await consultasDatosUsuario.deleteDatos(entrenamiento);
            if (eliminado) {
              alert("Entrenamiento eliminado");
              const getRespuesta = await consultasDatosUsuario.selectDatos(usuario);
              setRespuesta(getRespuesta);
            } else {
              alert("No se ha podido eliminar el entrenamiento");
            }
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.datosUsuario}>
        <MaterialCommunityIcons name="account" size={30} color="#f8ad2a" />
        <Text style={styles.textoDatosUsuario}>{respuesta.usuario ? respuesta.usuario : ''}</Text>
        <Text style={styles.textoDatosUsuario}>{respuesta.edad ? respuesta.edad : ''} años</Text>
        <Text style={styles.textoDatosUsuario}>{respuesta.altura ? respuesta.altura : ''}m</Text>
        <Text style={styles.textoDatosUsuario}>{respuesta.peso ? respuesta.peso : ''}kg</Text>
      </View>
      <ScrollView>
        {respuesta.entrenamientos ? ( respuesta.entrenamientos.map((entrenamiento) => (
          <View key={entrenamiento.id} >
            <View style={styles.datosEntrenamientos}>
              <Pressable onPress={() => setExpandido(expandido == entrenamiento.id ? null : entrenamiento.id)}>
                <MaterialCommunityIcons name={expandido == entrenamiento.id ? "menu-up" : "menu-down"} size={25} color="#f8ad2a" />
              </Pressable>
              <Text style={styles.textoDatosEntrenamientos}>{entrenamiento.fecha}</Text>
              <Text style={styles.textoDatosEntrenamientos}>{entrenamiento.duracion}</Text>
              <Text style={styles.textoDatosEntrenamientos}>{entrenamiento.num_ejercicios} ejercicios</Text>
              <Pressable onPress={() => eliminar(entrenamiento)}>
                <MaterialCommunityIcons name="delete" size={20} color="red" />
              </Pressable>
            </View>
            {expandido === entrenamiento.id && (
              <View style={{ backgroundColor: "black", marginHorizontal: "2%", borderTopWidth: 1, borderColor: "#f8ad2a", }}>
                {respuesta.ejercicios.filter((ejercicio) => ejercicio.entrenamiento_id === entrenamiento.id).map((ejercicio) => (
                  <View key={ejercicio.id} style={styles.datosEjercicios}>
                    <View style={styles.celdaEjercicios}>
                      <Text style={styles.textoDatosEjercicios}>{ejercicio.nombre}</Text>
                    </View>
                    <View style={styles.celdaEjercicios}>
                      <Text style={styles.textoDatosEjercicios}>{ejercicio.grupo_muscular}</Text>
                    </View>
                    <View style={styles.celdaEjercicios}>
                      <Text style={styles.textoDatosEjercicios}>{ejercicio.series} series</Text>
                    </View>
                    <View style={styles.celdaEjercicios}>
                      <Text style={styles.textoDatosEjercicios}>{ejercicio.repeticiones} reps</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
          ))
        ) : (
          <Text style={{ textAlign: "center", color: "white", fontSize: 18, marginTop: "3%" }}> Todavía no has realizado entrenamientos </Text>
        )}
      </ScrollView>
    </View>
  );  
}