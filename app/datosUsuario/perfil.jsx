import { Pressable, View, Text, TextInput } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { styles } from '../../style/estilos';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from 'expo-router';

export default function Perfil() {
  return (
    <View style={styles.container}>
      <View style={styles.perfilLayout}>
        <View>
          <Text style={styles.h2Login}>Contraseña:</Text>
          <TextInput style={styles.inputsLogin} />
        </View>
        <View>
          <Text style={styles.h2Login}>Contraseña:</Text>
          <TextInput style={styles.inputsLogin} />
        </View>
        <View>
          <Text style={styles.h2Login}>Contraseña:</Text>
          <TextInput style={styles.inputsLogin} />
        </View>
        <View>
          <Text style={styles.h2Login}>Contraseña:</Text>
          <TextInput style={styles.inputsLogin} />
        </View>
        <View>
          <Text style={styles.h2Login}>Contraseña:</Text>
          <TextInput style={styles.inputsLogin} />
        </View>
        <View>
          <Text style={styles.h2Login}>Contraseña:</Text>
          <TextInput style={styles.inputsLogin} />
        </View>
      </View>
    </View>
  )
}