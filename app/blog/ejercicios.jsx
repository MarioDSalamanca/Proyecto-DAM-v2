import { Text, View } from "react-native";
import { useEffect, useState } from 'react';
import consultasDatosUsuario from '../consultas/datosUsuario';
import { ScrollView } from 'react-native';
import { styles } from '../../style/estilos';

export default function Ejercicios() {

  const [ejercicios, setEjercicios] = useState({});

  useEffect(() => {
    const getEjercicios = async () => {
      const getEjercicios = await consultasDatosUsuario.selectEjercicios();
      setEjercicios(getEjercicios);
    };
    getEjercicios();
  }, []);

  return (
    <View style={styles.container}>
    <View>
      <Text style={styles.titulosBlog}>Conoce todos los ejercicios con los que te puedes poner en forma</Text>
    </View>
    <ScrollView style={{ margin: "6%" }}>
      {ejercicios.length > 0 && (
        ejercicios.map((ejercicio) => (
          <View key={ejercicio.id}>
            <View style={styles.bloqueEjercicio}>
              <Text style={styles.nombreEjercicio}>{ejercicio.nombre}</Text>
              <Text style={styles.grupoMuscularEjercicio}>{ejercicio.grupo_muscular}</Text>
              <Text style={styles.descripcionEjercicio}>{ejercicio.descripcion}</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
    </View>
  );
}