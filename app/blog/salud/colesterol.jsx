import { Pressable, Text, View, TextInput, Image, ScrollView } from "react-native";
import { useState } from "react";
import { styles } from "../../../style/estilos";

const imagen = require("../../../assets/colesterol.jpg");

export default function Colesterol() {

  const [trigliceridos, setTrigliceridos] = useState("");
  const [ldl, setLdl] = useState("");
  const [hdl, setHdl] = useState("");
  const [colesterol, setColesterol] = useState("");

  const getTrigliceridos = (valor) => {
    const num = parseFloat(valor, 10);
    if (isNaN(num)) return "gray";
    if (num <= 150) return "green";
    if (num > 150 && num <= 160) return "yellow";
    if (num > 160) return "red";
  };
  const getLdl = (valor) => {
    const num = parseFloat(valor, 10);
    if (isNaN(num)) return "gray";
    if (num <= 100) return "green";
    if (num > 100 && num <= 110) return "yellow";
    if (num > 110) return "red";
  };
  const getHdl = (valor) => {
    const num = parseFloat(valor, 10);
    if (isNaN(num)) return "gray";
    if (num >= 60) return "green";
    if (num < 60 && num >= 50) return "yellow";
    if (num < 50) return "red";
  };
  const getColesterol = (valor) => {
    const num = parseFloat(valor, 10);
    if (isNaN(num)) return "gray";
    if (num <= 200) return "green";
    if (num > 200 && num <= 210) return "yellow";
    if (num > 210) return "red";
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ margin: "6%" }}>
        <Image source={imagen} style={styles.imagenes} />
        <Text style={{ color: "white", fontSize: 15, textAlign: "justify" }}>
          ¡Introduce tus valores más recientes!{"\n\n"}

        <View style={styles.contenedoresColesterol}>
          <Text style={{ color: "white", fontSize: 15 }}>Triglicéridos</Text>
          <TextInput value={trigliceridos} style={[ styles.inputsColesterol, { backgroundColor: getTrigliceridos(trigliceridos) },]}
            onChangeText={(text) => setTrigliceridos(text)} keyboardType="decimal-pad" placeholderTextColor="gray"
          />
          <Text style={{ color: "white", fontSize: 15 }}> mg/dl</Text>
        </View>

        <View style={styles.contenedoresColesterol}>
          <Text style={{ color: "white", fontSize: 15 }}>LDL</Text>
          <TextInput value={ldl} style={[ styles.inputsColesterol, { backgroundColor: getLdl(ldl) },]}
            onChangeText={(text) => setLdl(text)} keyboardType="decimal-pad" placeholderTextColor="gray"
          />
          <Text style={{ color: "white", fontSize: 15 }}> mg/dl</Text>
        </View>

        <View style={styles.contenedoresColesterol}>
          <Text style={{ color: "white", fontSize: 15 }}>HDL</Text>
          <TextInput value={hdl} style={[ styles.inputsColesterol, { backgroundColor: getHdl(hdl) },]}
            onChangeText={(text) => setHdl(text)} keyboardType="decimal-pad" placeholderTextColor="gray"
          />
          <Text style={{ color: "white", fontSize: 15 }}> mg/dl</Text>
        </View>

        <View style={styles.contenedoresColesterol}>
          <Text style={{ color: "white", fontSize: 15 }}>Colesterol</Text>
          <TextInput value={colesterol} style={[ styles.inputsColesterol, { backgroundColor: getColesterol(colesterol) },]}
            onChangeText={(text) => setColesterol(text)} keyboardType="decimal-pad" placeholderTextColor="gray"
          />
          <Text style={{ color: "white", fontSize: 15 }}> mg/dl</Text>
        </View>{"\n\n"}

        
        ¿Sabías que el colesterol es una sustancia necesaria para el cuerpo? Posee numerosas funciones como la producción de algunas hormonas.{"\n\n"}

        Un exceso de esta sustancia debido a antecedentes familiares, edad, sobrepeso y alimentación no adecuada puede tener 
        efectos perjudiciales sobre todo a nivel cardiovascular.{"\n\n"}

        Consejos para tratar de controlarlo:{"\n\n"}

          - El ejercicio físico aeróbico será tu mejor aliado! Procura hacerlo entre 3 - 5 veces por semana.{"\n\n"}

          - Evita la bollería, fritos y precocinados, los cuales son ricos en ácidos grasos saturados.{"\n\n"}

          - Introduce en tu dieta pescado azul como salmón, sardinas o caballa, ricos en Omega-3.{"\n\n"}

          - Que no falten en tu dieta frutas, verduras, cereales integrales y legumbres.{"\n\n"}
        </Text>
      </ScrollView>
    </View>
  );
}
