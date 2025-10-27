import { Alert, Platform } from 'react-native';
const BASE_URL = 'http://192.168.0.18:3000';

async function validarCampos({ nome, sobrenome, email, celular, senha, cnh, motorista = false }) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const senhaRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
  const celularRegex = /^\d{10,11}$/;
  const cnhRegex = /^\d{11}$/;

  if (
    !nome?.trim() ||
    !sobrenome?.trim() ||
    !email?.trim() ||
    !celular?.trim() ||
    !senha?.trim() ||
    (motorista && !cnh?.trim())
  ) {
    throw new Error('Por favor, preencha todos os campos.');
  }

  if (!emailRegex.test(email)) throw new Error('Por favor, insira um e-mail válido.');
  if (!senhaRegex.test(senha)) throw new Error('Senha deve conter pelo menos 1 letra maiúscula e 1 número.');
  if (!celularRegex.test(celular)) throw new Error('Insira um número válido (com DDD).');
  if (motorista && !cnhRegex.test(cnh)) throw new Error('CNH inválida. Deve conter 11 dígitos numéricos.');
}

async function cadastrarUsuario(dados, motorista = false) {
  const { router } = dados;
  try {
    await validarCampos({ ...dados, motorista });

    const response = await fetch(`${BASE_URL}/cadastrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Erro ao cadastrar.');

    if (Platform.OS === 'web') {
      alert('Sucesso! Cadastro realizado.');
    } else {
      Alert.alert('Sucesso', 'Cadastro realizado!');
      router.push('./login');
    }
  } catch (error) {
    if (Platform.OS === 'web') {
      alert(error.message || 'Erro inesperado.');
    } else {
      Alert.alert('Erro', error.message || 'Erro inesperado.');
    }
  }
}

export async function cadastroPassageiro({ nome, sobrenome, email, celular, senha, router }) {
  await cadastrarUsuario({ nome, sobrenome, email, celular, senha, router });
}

export async function cadastroMotorista({ nome, sobrenome, email, celular, senha, cnh, router }) {
  await cadastrarUsuario({ nome, sobrenome, email, celular, senha, cnh, router }, true);
}

export async function login({ email, senha, router }) {
  try {
    await validarCampos({ email, senha });

    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (response.ok) {
      Alert.alert('Sucesso', 'Login realizado!');
      router.push('../index');
    } else {
      Alert.alert('Erro', data.message || 'Falha no login.');
    }
  } catch (error) {
    Alert.alert('Erro', error.message || 'Erro inesperado.');
  }
}