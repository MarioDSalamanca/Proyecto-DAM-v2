import { Pressable, Text, View } from "react-native";
import { styles } from "../style/estilos";

export default function Home() {
  return (
    <View style={styles.container} >
      <View style={styles.homeLayout}>
        <Pressable style={styles.homeLayouts} onPress={() => alert("train")}>
            <Text style={styles.textoHome}>
              Ejercicios
            </Text>
        </Pressable>
        <Pressable style={styles.homeLayouts} onPress={() =>  alert("nutricion")}>
            <Text style={styles.textoHome}>
              Nutrición
            </Text>
        </Pressable>
        <Pressable style={styles.homeLayouts} onPress={() =>  alert("salud")}>
            <Text style={styles.textoHome}>
              Salud
            </Text>
        </Pressable>
      </View>
    </View>
  );
}