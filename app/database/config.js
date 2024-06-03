import * as SQLite from 'expo-sqlite';

const DB_NAME = 'tcc';

// Função para abrir o banco de dados
export async function openDatabase() {
  try {
    const db = await SQLite.openDatabaseAsync(DB_NAME);
    console.info('Banco de dados aberto com sucesso');
    return db;
  } catch (error) {
    console.error('Erro ao abrir o banco de dados:', error);
    throw error;
  }
}

// Função para deletar tabelas (utilizada para debugging ou reinicialização)
const dropTables = async () => {
  console.info('Iniciando a exclusão de tabelas...');
  const db = await openDatabase();
  try {
    await db.execAsync(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS projects;
        DROP TABLE IF EXISTS images;
      `
    );
    console.info('Tabelas deletadas com sucesso');
  } catch (error) {
    console.error('Falha ao deletar tabelas:', error);
    throw error;
  }
};

// Função para inicializar o banco de dados
export async function initializeDatabase() {
  const db = await openDatabase();
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
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
        project_name TEXT,
        FOREIGN KEY (project_id) REFERENCES projects(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );`
    );
    console.info('Banco de dados inicializado com sucesso');
  } catch (error) {
    console.error('Falha ao inicializar o banco de dados:', error);
    throw error;
  }
}

// Chamada para inicializar o banco de dados ao carregar o módulo
initializeDatabase().catch(error => {
  console.error('Falha ao inicializar o banco de dados:', error);
});

// Função para criar um usuário
export async function createUser(email, password) {
  try {
    const db = await openDatabase();

    const existingUser = await db.getFirstAsync('SELECT * FROM users WHERE email = ?;', [email]);

    if (existingUser) {
      console.warn('Usuário já cadastrado:', email);
      return false;
    }

    await db.runAsync('INSERT INTO users (email, password) VALUES (?, ?);', [email, password]);
    console.info('Usuário criado com sucesso:', email);
    return true;
  } catch (error) {
    console.error('Falha ao criar usuário:', error);
    return false;
  }
}

// Função para obter um usuário pelo email
export async function getUserByEmail(email) {
  try {
    const db = await openDatabase();
    const user = await db.getFirstAsync('SELECT * FROM users WHERE email = ?;', [email]);
    if (user) {
      console.info('Usuário encontrado:', email);
    } else {
      console.info('Usuário não encontrado:', email);
    }
    return user;
  } catch (error) {
    console.error('Falha ao obter usuário por email:', error);
    throw error;
  }
}

// Função para salvar caminhos das imagens
export async function saveImagePaths(projectId, userId, imagePaths, projectName) {
  try {
    const db = await openDatabase();
    for (const path of imagePaths) {
      if (path) {
        const existingImage = await db.getFirstAsync(
          'SELECT * FROM images WHERE project_id = ? AND user_id = ? AND path = ?;',
          [projectId, userId, path]
        );

        if (existingImage) {
          await db.runAsync(
            'UPDATE images SET path = ?, project_name = ? WHERE id = ?;',
            [path, projectName, existingImage.id]
          );
        } else {
          await db.runAsync(
            'INSERT INTO images (project_id, user_id, path, project_name) VALUES (?, ?, ?, ?);',
            [projectId, userId, path, projectName]
          );
        }
      }
    }
    console.info('Caminhos das imagens do projeto salvos com sucesso:', projectId, userId);
  } catch (error) {
    console.error('Falha ao salvar caminhos das imagens:', error);
    throw error;
  }
}

// Função para obter imagens pelo ID do usuário
export async function getImagesByUserId(userId) {
  try {
    const db = await openDatabase();
    const images = await db.getAllAsync('SELECT * FROM images WHERE user_id = ?;', [userId]);
    console.info('Imagens obtidas para o usuário:', userId);
    return images;
  } catch (error) {
    console.error('Falha ao obter caminhos das imagens por usuário:', error);
    throw error;
  }
}

// Função para obter imagens pelo ID do projeto e do usuário
export async function getImagesByProjectId(userId, projectId) {
  try {
    const db = await openDatabase();
    const images = await db.getAllAsync('SELECT * FROM images WHERE user_id = ? AND project_id = ?;', [userId, projectId]);
    console.info('Imagens obtidas para o projeto:', projectId, 'e usuário:', userId);
    return images;
  } catch (error) {
    console.error('Falha ao obter caminhos das imagens por projeto:', error);
    throw error;
  }
}
