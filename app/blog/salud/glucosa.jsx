import { Pressable, Text, View, Image, TextInput } from "react-native";
import { ScrollView } from 'react-native';
import { styles } from "../../../style/estilos";
import { useState } from "react";

const imagen = require("../../../assets/glucosa.jpg")

export default function Glucosa() {

  const [emoglobina, setEmoglobina] = useState("");
  const [azucar, setAzucar] = useState("");

  const getEmoglobina = (valor) => {
    const num = parseFloat(valor, 10);
    if (isNaN(num)) return "gray";
    if (num <= 5.7) return "green";
    if (num > 5.7 && num <= 6.5) return "yellow";
    if (num > 6.5) return "red";
  };
  const getAzucar = (valor) => {
    const num = parseFloat(valor, 10);
    if (isNaN(num)) return "gray";
    if (num >= 70 && num <= 100) return "green";
    if (num > 100 && num <= 125) return "yellow";
    if (num > 125 || num < 70) return "red";
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ margin: "6%" }}>
        <Image source={imagen} style={styles.imagenes}/>
        <Text style={{ color: "white", fontSize: 15, textAlign: "justify" }}>
          Hay 2 tipos de pruebas que te ayudarán a conocer tu estado de salud.{"\n\n"}
          
          Comprueba los datos de tus niveles de glucosa en sangre durante tus últimos 3 meses{"\n\n"}

          <View style={styles.contenedoresColesterol}>
            <Text style={{ color: "white", fontSize: 15 }}>Emoglobina glicosilada</Text>
            <TextInput value={emoglobina} style={[ styles.inputsColesterol, { backgroundColor: getEmoglobina(emoglobina) },]}
              onChangeText={(text) => setEmoglobina(text)} keyboardType="decimal-pad" placeholderTextColor="gray"
            />
            <Text style={{ color: "white", fontSize: 15 }}> %</Text>
          </View>

          <View style={styles.contenedoresColesterol}>
            <Text style={{ color: "white", fontSize: 15 }}>Azucar en sangre en ayunas</Text>
            <TextInput value={azucar} style={[ styles.inputsColesterol, { backgroundColor: getAzucar(azucar) },]}
              onChangeText={(text) => setAzucar(text)} keyboardType="decimal-pad" placeholderTextColor="gray"
            />
            <Text style={{ color: "white", fontSize: 15 }}> mg/dl</Text>
          </View>{"\n\n"}

          Un estilo de vida saludable puede ayudarte a que los niveles de glucosa en sangre vuelvan a la normalidad o a evitar que se eleven más.{"\n\n"}

          Consejos:{"\n\n"}

            - Come alimentos saludables: una dieta con frutas, verduras, frutos secos, granos integrales y aceite de oliva se asocia con un menor riesgo de prediabetes.{"\n"}

            - Disminuye la ingesta de grasa y aumenta la de fibra.{"\n"}

            - ¡La actividad física será una gran aliada! trata de realizar 150 minutos de actividad aeróbica moderada 
            o 75 minutos de actividad aeróbica intensa a la semana. También puedes hacer una combinación de ambas.{"\n\n"}

          Si tienes sobrepeso, la pérdida de un 5/7% de tu peso corporal puede ayudar a reducir el riesgo de diabetes.
        </Text>
      </ScrollView>
    </View>
  );
}