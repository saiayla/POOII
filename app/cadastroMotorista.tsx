import React from 'react';
import { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { globalStyles as styles } from './style';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { cadastroMotorista } from './script.js'

export default function motorista() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [celular, setCelular] = useState('');
    const [cnh, setCnh] = useState('');

    return (
        <LinearGradient colors={['#1974F3', '#85E0FA']} style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title2}>Cadastro</Text>
                <View style={{ width: '100%', gap: 30, padding: 20, alignItems: 'center' }}>
                    <View style={{ gap: 5, width: '80%' }}>
                        <Text>Nome</Text>
                        <TextInput value={nome} onChangeText={setNome} style={styles.input} />
                    </View>
                    <View style={{ gap: 5, width: '80%' }}>
                        <Text>Sobrenome</Text>
                        <TextInput value={sobrenome} onChangeText={setSobrenome} style={styles.input} />
                    </View>
                    <View style={{ gap: 5, width: '80%' }}>
                        <Text>E-mail</Text>
                        <TextInput value={email} onChangeText={setEmail} style={styles.input} />
                    </View>
                    <View style={{ gap: 5, width: '80%' }}>
                        <Text>Celular</Text>
                        <TextInput value={celular} onChangeText={setCelular} secureTextEntry style={styles.input} />
                    </View>
                    <View style={{ gap: 5, width: '80%' }}>
                        <Text>CNH</Text>
                        <TextInput value={cnh} onChangeText={setCnh} secureTextEntry style={styles.input} />
                    </View>
                    <View style={{ gap: 5, width: '80%' }}>
                        <Text>Senha</Text>
                        <TextInput value={senha} onChangeText={setSenha} secureTextEntry style={styles.input} />
                    </View>
                    <TouchableOpacity style={styles.Button} onPress={() =>
                        cadastroMotorista({ nome, sobrenome, email, celular, senha, cnh, router })}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
}