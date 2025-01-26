import { Pressable, Text, View } from "react-native";
import { ScrollView } from 'react-native';
import { router } from "expo-router";
import { styles } from '../../style/estilos';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Salud() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.tituloSalud}>Un cuerpo en forma necesita un corazón sano</Text>
      </View>
      <View>
        <Text style={styles.titulosBlog}>Los pilares de tu salud: Tensión, Colesteról y Glucosa bajo control</Text>
      </View>
      <View style={styles.saludLayout}>
        <Pressable style={styles.saludLayouts} onPress={() => router.replace("/blog/salud/tension")}>
            <Text style={styles.textoSalud}>
              Presión arterial
            </Text>
            <MaterialCommunityIcons name="arrow-right-bold-outline" size={20} color="#f8ad2a" style={{paddingRight: "2%"}}/>
        </Pressable>
        <Pressable style={styles.saludLayouts} onPress={() =>  router.replace("/blog/salud/colesterol")}>
            <Text style={styles.textoSalud}>
              Colesterol
            </Text>
            <MaterialCommunityIcons name="arrow-right-bold-outline" size={20} color="#f8ad2a" style={{paddingRight: "2%"}}/>
        </Pressable>
        <Pressable style={styles.saludLayouts} onPress={() =>  router.replace("/blog/salud/glucosa")}>
            <Text style={styles.textoSalud}>
              Glucosa en sangre
            </Text>
            <MaterialCommunityIcons name="arrow-right-bold-outline" size={20} color="#f8ad2a" style={{paddingRight: "2%"}}/>
        </Pressable>
      </View>
    </View>
  );
}