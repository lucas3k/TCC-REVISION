import * as SQLite from 'expo-sqlite'
// import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getDbInstance() {
  try {
    const db = await SQLite.openDatabaseAsync('tcc');
    console.log('Banco de dados aberto com sucesso');
    return db;
  } catch (error) {
    console.error('Erro ao abrir o banco de dados:', error);
    throw error;  // Re-lança o erro para ser tratado posteriormente, se necessário
  }
}

// Função para inicializar o banco de dados
async function initializeDatabase() {
  const db = await getDbInstance();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      password TEXT
    );
  `);
}

// Chamada inicial para garantir que a tabela seja criada
initializeDatabase().catch(error => {
  console.error('Failed to initialize the database:', error);
});

export async function createUser(email, password) {
  try {
    const db = await getDbInstance();
    await db.runAsync('INSERT INTO users (email, password) VALUES (?, ?);', email, password);

    console.log('Usuário criado com sucesso');
    return true;
  } catch (error) {
    console.error('Failed to create user:', error);
    return false;
  }
}

export async function getUserByEmail(email) {
  try {
    const db = await getDbInstance();
    const result = await db.getFirstAsync('SELECT * FROM users WHERE email = ?;', email);
    return result;
  } catch (error) {
    console.error('Failed to get user by email:', error);
    throw error;
  }
}
