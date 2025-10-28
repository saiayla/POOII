import { Alert, Platform } from 'react-native';
const BASE_URL = 'http://localhost:3000';

async function validarCampos({ nome, email, num_telefone, endereco, senha, cnh, motorista = false }) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const senhaRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
  const num_telefoneRegex = /^\d{10,11}$/;
  const cnhRegex = /^\d{11}$/;

  if (
    !nome?.trim() ||
    !email?.trim() ||
    !num_telefone?.trim() ||
    !endereco?.trim() ||
    (motorista && !cnh?.trim()) ||
    !senha?.trim() 
  ) {
    throw new Error('Por favor, preencha todos os campos.');
  }

  if (!emailRegex.test(email)) throw new Error('Por favor, insira um e-mail válido.');
  if (!senhaRegex.test(senha)) throw new Error('Senha deve conter pelo menos 1 letra maiúscula e 1 número.');
  if (!num_telefoneRegex.test(num_telefone)) throw new Error('Insira um número válido (com DDD).');
  if (motorista && !cnhRegex.test(cnh)) throw new Error('CNH inválida. Deve conter 11 dígitos numéricos.');
}

async function cadastrarUsuario(dados, motorista = false) {
  const { router } = dados;
  try {
    // Validação básica
    await validarCampos(dados);

    // Endpoint
    const endpoint = motorista ? '/users/motorista' : '/users/passageiro';

    // Corpo da requisição
    const body = {
      nome: dados.nome,
      email: dados.email,
      num_telefone: dados.num_telefone,
      endereco: dados.endereco,
      senha: dados.senha,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
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
    console.log('Erro no cadastro:', error);
    if (Platform.OS === 'web') {
      alert(error.message || 'Erro inesperado.');
    } else {
      Alert.alert('Erro', error.message || 'Erro inesperado.');
    }
  }
}

export async function cadastroPassageiro({ nome, email, num_telefone, endereco, senha, router }) {
  await cadastrarUsuario({ nome, email, num_telefone, endereco, senha, router });
}

export async function cadastroMotorista({ nome, email, num_telefone, endereco, senha, cnh, router }) {
  await cadastrarUsuario({ nome, email, num_telefone, endereco, senha, cnh, router }, true);
}

async function validarCamposLogin({ email, senha }) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const senhaRegex = /^(?=.*[A-Z])(?=.*\d).+$/;

  if (!email?.trim() || !senha?.trim()) {
    throw new Error('Por favor, preencha todos os campos.');
  }

  if (!emailRegex.test(email)) throw new Error('Por favor, insira um e-mail válido.');
  if (!senhaRegex.test(senha)) throw new Error('Senha deve conter pelo menos 1 letra maiúscula e 1 número.');
}

export async function login({ email, senha, router }) {
  try {
    await validarCamposLogin({ email, senha });

    const BASE_URL = 'http://localhost:3000';
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
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
