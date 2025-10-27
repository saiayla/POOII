const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
require('dotenv').config()

const router = express.Router();
const SECRET = process.env.JWT_SECRET;

const dbPath = path.join(__dirname, '../db/database.db');

async function openDB() {
  return open({ filename: dbPath, driver: sqlite3.Database });
}

// POST /cadastrar
router.post('/cadastrar', async (req, res) => {
  try {
    const { nome, sobrenome, email, celular, senha, cnh } = req.body;

    if (!nome || !sobrenome || !email || !celular || !senha)
      return res.status(400).json({ message: 'Campos obrigatórios faltando.' });

    const db = await openDB();
    const userExists = await db.get('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (userExists) return res.status(400).json({ message: 'E-mail já cadastrado.' });

    const hash = await bcrypt.hash(senha, 10);
    const tipo = cnh ? 'motorista' : 'passageiro';

    await db.run(
      'INSERT INTO usuarios (nome, sobrenome, email, celular, senha, tipo, cnh) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nome, sobrenome, email, celular, hash, tipo, cnh || null]
    );

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const db = await openDB();
    const user = await db.get('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (!user) return res.status(401).json({ message: 'Usuário não encontrado.' });

    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) return res.status(401).json({ message: 'Senha incorreta.' });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '2h' });

    res.json({ message: 'Login realizado com sucesso!', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

module.exports = router;
