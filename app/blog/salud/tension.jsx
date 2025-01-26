import { Pressable, Text, View, Image } from "react-native";
import { ScrollView } from 'react-native';
import { styles } from '../../../style/estilos';

const imagen = require("../../../assets/presion-arterial.jpg")

export default function Tension() {
  return (
    <View style={styles.container}>
      <ScrollView style={{ margin: "6%" }}>
        <Image source={imagen} style={styles.imagenes} />
        <Text style={{ color: "white", fontSize: 15, textAlign: "justify" }}>
        Los valores acpetado como óptimos varían mucho entre las personas. En general, el umbral para considerar cifras de normalidad es 135 - 85 mmHg.{"\n\n"}

        Consejos para mantener una tensión bajo control:{"\n\n"}

          - Trata de tomar menos de 2 gramos de sal al día (1 cucharadita).{"\n\n"}
          
          - El alcohol y tabaco son vasopresores, por lo que contribuyen a aumentar tu presión arterial. Trata de eliminarlo o reducirlo.{"\n\n"}

          - Evita carnes rojas, bebidas azucaradas y grasas saturadas.{"\n\n"}

          - Hay que tener en cuenta que las cifras de presión arterial pueden aparecer elevadas por otras enfermedades como diabetes, uso de medicamentos
            como corticoides y antihistamínicos y por altos valores de IMC (Índice de Masa Corporal).{"\n\n"}
        </Text>
      </ScrollView>
    </View>
  );
}