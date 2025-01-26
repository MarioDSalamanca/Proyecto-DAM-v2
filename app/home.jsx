import { Pressable, Text, View } from "react-native";
import { styles } from "../style/estilos";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container} >
      <View style={styles.homeLayout}>
        <Pressable style={styles.homeLayouts} onPress={() => router.replace("/blog/ejercicios")}>
            <Text style={styles.textoHome}>
              Ejercicios
            </Text>
        </Pressable>
        <Pressable style={styles.homeLayouts} onPress={() =>  router.replace("/blog/nutricion")}>
            <Text style={styles.textoHome}>
              Nutrición
            </Text>
        </Pressable>
        <Pressable style={styles.homeLayouts} onPress={() =>  router.replace("/blog/salud")}>
            <Text style={styles.textoHome}>
              Salud
            </Text>
        </Pressable>
      </View>
    </View>
  );
}