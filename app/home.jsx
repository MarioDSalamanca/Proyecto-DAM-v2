import { Pressable, Text, View } from "react-native";
import { styles } from "../style/estilos";

export default function Home() {
  return (
    <View style={styles.container} >
      <View style={styles.homeLayout}>
        <Pressable style={styles.homeLayouts} onPress={() => alert("train")}>
            <Text style={styles.textoHome}>
              Crea tus entrenamientos
            </Text>
        </Pressable>
        <Pressable style={styles.homeLayouts} onPress={() =>  alert("nutricion")}>
            <Text style={styles.textoHome}>
              Nutrición
            </Text>
        </Pressable>
        <Pressable style={styles.homeLayouts} onPress={() =>  alert("calendario")}>
            <Text style={styles.textoHome}>
              Calendario
            </Text>
        </Pressable>
        <Pressable style={styles.homeLayouts} onPress={() =>  alert("de otros")}>
            <Text style={styles.textoHome}>
              Descubre entrenamientos
            </Text>
        </Pressable>
        <Pressable style={{
          width: "95%",
          height: "15%",
          backgroundColor: "#f8ad2a",
          padding: 15,
          marginVertical: 10,
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 5,
        }} onPress={() =>  alert("salud")}>
            <Text style={styles.textoHome}>
              Salud
            </Text>
        </Pressable>
      </View>
    </View>
  );
}