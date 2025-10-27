const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.db');

if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

async function init() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      sobrenome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      celular TEXT NOT NULL,
      senha TEXT NOT NULL,
      tipo TEXT NOT NULL,
      cnh TEXT
    );
  `);

  console.log('✅ Tabela "usuarios" criada com sucesso!');
  process.exit();
}

init();
