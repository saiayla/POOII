import React from 'react';
import {Image, Text, TouchableOpacity } from 'react-native';
import { globalStyles as styles } from '../style';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#1974F3', '#85E0FA']} style={styles.container}>
      <Image source={require('../../assets/images/bus.png')} style={styles.logo} resizeMode="contain"/>
      <Text style={styles.title}>Bem-vindo ao Mova</Text>
      <Text style={styles.subtitle}>Conecte-se com o seu destino.</Text>
      <TouchableOpacity style={styles.Button} onPress={() => router.push('./cadastroPassageiro')}>
        <Text style={styles.buttonText}>Sou passageiro</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Button} onPress={() => router.push('./cadastroMotorista')}>
        <Text style={styles.buttonText}>Sou motorista</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => router.push('./login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
