import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { styles } from "../style/estilos";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import consultas from "./consultas/db";

// Funciones y constantes para el efecto visual del login
const InicioSesion = ({ vuelta, validar, setUsuario, setClave, usuario, clave }) => {
  return (
    <View style={styles.login}>
      <Text style={styles.h2Login}>Nombre de usuario:</Text>
      <TextInput style={styles.inputsLogin} value={usuario} onChangeText={setUsuario} />
      <Text style={styles.h2Login}>Contraseña:</Text>
      <TextInput style={styles.inputsLogin} secureTextEntry value={clave} onChangeText={setClave} />
      <Pressable style={styles.botonIniciarSesion} onPress={() => validar("inicioSesion")}>
        <Text style={styles.textoIniciarSesion}>Iniciar Sesión</Text>
      </Pressable>
      <Text style={{ textAlign: "center", marginVertical: 10, color: "#f8ad2a" }}>o</Text>
      <View style={{ alignItems: "center" }}>
        <Pressable style={styles.botonRegistrarse} onPress={vuelta}>
          <Text style={styles.textoRegistrarse}>Registrate</Text>
        </Pressable>
      </View>
    </View>
  );
};

const Registrate = ({ vuelta, validar, setUsuario, setClave, setClave2,  usuario, clave, clave2 }) => {
  return (
    <View style={styles.login}>
      <Text style={styles.h2Login}>Nombre de usuario:</Text>
      <TextInput style={styles.inputsLogin} value={usuario} onChangeText={setUsuario} />
      <Text style={styles.h2Login}>Contraseña:</Text>
      <TextInput style={styles.inputsLogin} secureTextEntry value={clave} onChangeText={setClave} />
      <Text style={styles.h2Login}>Confirmar contraseña:</Text>
      <TextInput style={styles.inputsLogin} secureTextEntry value={clave2} onChangeText={setClave2} />
      <Pressable style={styles.botonIniciarSesion}>
        <Text style={styles.textoIniciarSesion} onPress={() => validar("registro")}>Registrate</Text>
      </Pressable>
      <Text style={{ textAlign: "center", marginVertical: 10, color: "#f8ad2a" }}>o</Text>
      <View style={{ alignItems: "center" }}>
        <Pressable style={styles.botonRegistrarse} onPress={vuelta}>
          <Text style={styles.textoRegistrarse}>Iniciar Sesión</Text>
        </Pressable>
      </View>
    </View>
  );
};

// Constante / Función que controla la animación (sacado de React Native Animated)
const FlipCard = ({
  isFlipped,
  direction = 'y',
  duration = 500,
  InicioSesion,
  Registrate,
}) => {
  const isDirectionX = direction === 'x';

  const inicioSesionAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 90]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
      opacity: isFlipped.value ? 0 : 1,
      pointerEvents: isFlipped.value ? 'none' : 'auto',
    };
  });

  const RegistrateAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [270, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
      opacity: isFlipped.value ? 1 : 0,
      pointerEvents: isFlipped.value ? 'auto' : 'none',
    };
  });

  // Pintar los bloques con los estilos
  return (
    <View>
      <Animated.View
        style={[
          styles.regularCard,
          inicioSesionAnimatedStyle,
        ]}>
        {InicioSesion}
      </Animated.View>
      <Animated.View
        style={[
          styles.flippedCard,
          RegistrateAnimatedStyle,
        ]}>
        {Registrate}
      </Animated.View>
    </View>
  );
};

export default function Index() {

  // Hooks para manejar los datos de los formularios
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [clave2, setClave2] = useState('');

  const [loading, setLoading] = useState(true);

  // Como definir una variable pero de React Native Animated
  const isFlipped = useSharedValue(false);

    // Comprobar si ya se ha iniciado sesión e inicializar db
    useEffect(() => {

      consultas.inicializarDB();

      const comprobarAuth = async () => {

        const token = await AsyncStorage.getItem("authToken");
      
        if (token) {
          // Redirige si hay token
          router.replace("/home");
        }
      };

      comprobarAuth();

      setTimeout(() => {
        setLoading(false);
      }, 1000);

    }, [])

  // Función para la animación del login
  function vuelta() { isFlipped.value = !isFlipped.value; };

  async function validar(evento) {

    if (evento === 'inicioSesion') {

      if (usuario.length > 3 && clave.trim().length > 6) {

        const usuarioObj = { usuario: usuario, clave: clave };
        
        const respuesta = await consultas.login(usuarioObj);

        if (respuesta) {

          await AsyncStorage.setItem('usuario', respuesta);
          await AsyncStorage.setItem('authToken', '1');
          router.replace('/home');

        } else {

          alert("Usuario o contraseña incorrecto");

        }
        
      } else {

        alert('Datos insuficientes para iniciar sesión');

      }
    }
    if (evento == 'registro') {

      if (usuario.trim().length > 3 && clave.trim().length >= 6 && clave == clave2) {
        
        const usuarioObj = { usuario: usuario, clave: clave };
        
        const respuesta = await consultas.registro(usuarioObj);

        if (respuesta) {

          alert("Usuario registrado con éxito");
          vuelta(); 

        } else {

          alert("No se ha podido realizar el registro, intentalo más tarde");

        }

      } else {
        alert("El usuario como mínimo debe tener 4 caracteres y la contraseña 6 caracteres")
      }
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#303030" }}>
        <ActivityIndicator size="60" color="#f8ad2a" />
        <Text style={{ color: "white", marginTop: 20 }}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <View style={styles.viewLogin}>
      <Text style={styles.h1Login}>VitalPower</Text>
      <FlipCard
        isFlipped={isFlipped}
        InicioSesion={<InicioSesion
          vuelta={vuelta} validar={validar} setUsuario={setUsuario} setClave={setClave} usuario={usuario} clave={clave} />}
        Registrate={<Registrate 
          vuelta={vuelta} validar={validar} setUsuario={setUsuario} setClave={setClave} setClave2={setClave2} usuario={usuario} clave={clave} clave2={clave2} />}
      />
    </View>
  </View>
  );
}