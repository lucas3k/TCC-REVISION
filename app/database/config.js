import * as SQLite from 'expo-sqlite';

const DB_NAME = 'tcc';

export async function openDatabase() {
  try {
    const db = await SQLite.openDatabaseAsync(DB_NAME);
    console.log('Banco de dados aberto com sucesso');
    return db;
  } catch (error) {
    console.error('Erro ao abrir o banco de dados:', error);
    throw error;
  }
}

const dropTables = async () => {
  const db = await openDatabase();
  await db.execAsync(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS projects;
    DROP TABLE IF EXISTS images;
  `);
}

// dropTables().catch(error => {
//   console.error('Falha ao deletar tabelas:', error);
// })

export async function initializeDatabase() {
  const db = await openDatabase();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      password TEXT
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER,
      user_id INTEGER,
      path TEXT,
      FOREIGN KEY (project_id) REFERENCES projects(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);
}

initializeDatabase().catch(error => {
  console.error('Falha ao inicializar o banco de dados:', error);
});

export async function createUser(email, password) {
  try {
    const db = await openDatabase();
    await db.runAsync('INSERT INTO users (email, password) VALUES (?, ?);', email, password);

    console.log('Usuário criado com sucesso');
    return true;
  } catch (error) {
    console.error('Falha ao criar usuário:', error);
    return false;
  }
}

export async function getUserByEmail(email) {
  try {
    const db = await openDatabase();
    return await db.getFirstAsync('SELECT * FROM users WHERE email = ?;', email);
  } catch (error) {
    console.error('Falha ao obter usuário por email:', error);
    throw error;
  }
}

export async function saveImagePaths(projectId, userId, imagePaths) {
  try {
    const db = await openDatabase();
    await db.runAsync('DELETE FROM images WHERE project_id = ? AND user_id = ?;', projectId, userId);

    imagePaths.forEach(async path => {
      if (path) {
        await db.runAsync('INSERT INTO images (project_id, user_id, path) VALUES (?, ?, ?);', projectId, userId, path);
      }
    });

    console.log('Caminhos das imagens do projeto salvos com sucesso');
  } catch (error) {
    console.error('Falha ao salvar caminhos das imagens:', error);
    throw error;
  }
}

export async function getImagesByUserId(userId) {
  try {
    const db = await openDatabase();
    return await db.getAllAsync('SELECT * FROM images WHERE user_id = ?;', userId);
  } catch (error) {
    console.error('Falha ao obter caminhos das imagens por usuário:', error);
    throw error;
  }
}

export async function getImagesByProjectId(userId, projectId) {
  try {
    const db = await openDatabase();
    return await db.getAllAsync('SELECT * FROM images WHERE user_id = ? AND project_id = ?;', userId, projectId);
  } catch (error) {
    console.error('Falha ao obter caminhos das imagens por projeto:', error);
    throw error;
  }
}
