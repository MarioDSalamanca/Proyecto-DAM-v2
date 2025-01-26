import { Pressable, Text, View, TextInput, Modal, Image } from "react-native";
import { ScrollView } from 'react-native';
import { styles } from '../../style/estilos';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";

const imagenPlato = require("../../assets/plato.jpg");
const imagenEnergia = require("../../assets/energía.jpg");

export default function Nutricion() {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const mostrarModal = (contenido) => {
    setModalContent(contenido);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setModalContent("");
  };

  const textoVitaminas = () => (
    <Text style={{ color: "white", fontSize: 15, textAlign: "justify" }}>
      <Text style={{fontWeight: "800"}}>Vitamina A:</Text> distinguimos el retinol y los carotenos. El retinol se encuentra en lácteos enteros, huevos e hígado, 
      los carotenos en vegetales de hoja verde, zanahorias, albaricoques.{"\n\n"}
      <Text style={{fontWeight: "800"}}>Vitamina D:</Text> pescados grasos, lácteos enteros, huevo e hígado.{"\n\n"}
      <Text style={{fontWeight: "800"}}>Vitamina E:</Text> aceites vegetales y frutos secos.{"\n\n"}
      <Text style={{fontWeight: "800"}}>Vitamina K:</Text> repollo, coles, coliflor, espinacas, brecol, lechuga, carnes e hígado.{"\n\n"}
      <Text style={{fontWeight: "800"}}>Tiamina:</Text> carne de cerdo, cereales, legumbres y frutos secos.{"\n\n"}
      <Text style={{fontWeight: "800"}}>Riboflavina:</Text> lácteos, vegetales de hoja verde y cereales integrales.{"\n\n"}
      <Text style={{fontWeight: "800"}}>Vitamina B6:</Text> carnes, pescados, legumbres, frutas, vegetales de hoja verde y cereales integrales.{"\n\n"}
      <Text style={{fontWeight: "800"}}>Folato:</Text> vegetales de hoja verde, legumbres e hígado.{"\n\n"}
      <Text style={{fontWeight: "800"}}>Vitamina B12:</Text> carnes, pescados, lácteos y huevos.{"\n\n"}
      <Text style={{fontWeight: "800"}}>Biotina:</Text> vísceras, yema de huevo, soja, pescados, cereales integrales.{"\n\n"}
      <Text style={{fontWeight: "800"}}>Ácido pantoténico:</Text> vísceras, setas, aguacate, brecol y cereales integrales.{"\n\n"}
      <Text style={{fontWeight: "800"}}>Vitamina C:</Text> pimientos, lechuga, tomate, peregil, cítricos y kiwi.{"\n\n"}
    </Text>
  );

  const textoMinerales = () => (
    <Text style={{ color: "white", fontSize: 15, textAlign: "justify" }}>
      Los cereales completos son ricos en selenio y magnesio.{"\n\n"}
      Los alimentos proteicos son ricos en minerales menos en calcio. El hígado aporta hierro hemo y selenio.{"\n\n"}
      Los frutos secos aportan magnesio.{"\n\n"}
      Las legumbres aportan hierro no hemo y magnesio.{"\n\n"}
      Frutas, verduras y hortalizas aportan sobre todo hierro no hemo y magnesio.{"\n\n"}
      La leche y derivados aportan calcio, fósforo y zinc.{"\n\n"}
      La sal yodada, pescados y mariscos aportan yodo.{"\n\n"}
    </Text>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titulosBlog}>Tu dieta: tu aliada en el camino al bienestar</Text>
      </View>
      <ScrollView style={{ margin: "6%" }}>
        <Text style={{ color: "white", fontSize: 15, textAlign: "justify" }}>
          Para que una dieta sea saludable debe ser equilibrada, habiendo una promoción entre los distintos nutrientes en cuanto a ingestas energéticas:{"\n\n"}

          - 30 - 35% grasas{"\n"}
          - 10 - 15% proteínas{"\n"}
          - 50 - 60% glúcidos{"\n\n"}

          El reparto de energía a lo largo del día debe ser:{"\n\n\n"}

          <Image source={imagenEnergia} style={styles.imagenes}/>{"\n\n\n"}

          <Text style={{fontWeight: "800", textDecorationLine: "underline", color: "#f8ad2a"}}>Lípidos:</Text>{"\n\n"}

          Deben aportar el 30 - 35% de energía, de la cual:{"\n\n"}

          - Menos del 10% grasas saturadas.{"\n"}

          - Menos del 10% grasa insaturada como ácido graso Omega-3 y Omega-6, estos son ácidos grasos esenciales que deben ingerirse a través de la dieta.{"\n\n"}

          {"\t\t"}* Omega-3: en aceites de pescado, pescado azul, nueces.{"\n"}

          {"\t\t"}* Omega-6: en aceites de semillas (como el aceite de girasol), aguacate, frutos secos.{"\n\n"}

          - 15% ácido oleico, encontrado en el aceite de oliva.{"\n"}

          - Menos de 300mg de colesterol.{"\n\n"}

          <Text style={{fontWeight: "800", textDecorationLine: "underline", color: "#f8ad2a"}}>Carbohidratos:</Text>{"\n\n"}

          Estos deben aportar el 50 - 60% de la energía total. Es imprescindible distinguir 2 tipos de carbohidratos, simples como la fructosa y la glucosa,
          y complejos como el almidón. La ingesta mayoritaria debe ser de carbohidratos complejos, evita los azucares refinados.{"\n\n"}

          ¿Sabes dónde encontrarlos? Frutas, verduras, legumbres, tubérculos, cereales...{"\n\n"}

          La fibra la podemos clasificar en este grupo, es indispensable, la cantidad ingerida de esta debe ser de 25g al día, en niños debe ser de su edad + 5g.{"\n\n"}

          <MaterialCommunityIcons name="alert-outline" size={20} color="white" /> La glucosa de los hidratos de carbono es imprescindible para nuestro cuerpo ya que es la única fuente de energía para nuestro cerebro.{"\n\n"}

          <Text style={{fontWeight: "800", textDecorationLine: "underline", color: "#f8ad2a"}}>Proteínas:</Text>{"\n\n"}

          Debe aportar el 13 - 15% de la energía total, se deberá aumentar su ingesta en casos como la gestación, lactancia, vegez y determinadas patologías {"\n\n"}
          
          Calcula tus requerimientos de proteínas 0.8g * Kg peso{"\n\n"}

          <MaterialCommunityIcons name="alert-outline" size={20} color="white" /> El huevo es el alimento con mayor calidad proteica ya que posee un gran número de aminoácidos esenciales.{"\n\n"}

          Hay aminoácidos esenciales aportados en poca cantidad en la dieta, estos son la treonina, triptófano, 
          lisina (se encuentra en cereales) y metionina (se encuentra en legumbres).{"\n\n"}

          <Text style={{fontWeight: "800", textDecorationLine: "underline", color: "#f8ad2a"}}>Micronutrientes:</Text> {"\n\n"}

          Se encuentran en poca cantidad en los alimentos, estos son indispensables para el correcto funcionamiento del organismo.{"\n\n"}

          - Descubre dónde encontrar cada tipo de vitamina:{"\n\n"}
            <Pressable style={styles.verMas} onPress={() => mostrarModal("vitaminas")}>
              <Text style={{ color: "black", fontSize: 15, fontWeight: "600", textAlign: "center" }}>Ver más</Text>
            </Pressable>{"\n\n"}

          - Descubre dónde encontrar cada tipo de mineral:{"\n\n"}
            <Pressable style={styles.verMas} onPress={() => mostrarModal("minerales")}>
              <Text style={{ color: "black", fontSize: 15, fontWeight: "600", textAlign: "center" }}>Ver más</Text>
            </Pressable>{"\n\n"}

          Como puedes ver, una dieta variada ¡te ayudará a estar saludable!

        </Text>
        <View>
          <Image source={imagenPlato} style={{width: "100%", margin: 0}} resizeMode="contain"/>
        </View>
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => cerrarModal()} >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.cabeceraModal}>
              <Text style={styles.cabeceraUsuario}>{modalContent == "vitaminas" ? "Vitaminas" : "Minerales"}</Text>
            </View>
            <ScrollView style={styles.linksMenu}>
              {modalContent == "vitaminas" ? textoVitaminas() : textoMinerales()}
            </ScrollView>
            <Pressable onPress={() => cerrarModal()} style={styles.cerrarModal}>
              <Text style={styles.textoCerrarModal}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}