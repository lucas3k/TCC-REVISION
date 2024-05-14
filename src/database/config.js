import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Abre ou cria o banco de dados
const db = SQLite.openDatabase('database.db');

// Cria a tabela (chamada 'usuarios')
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, senha TEXT);'
  );
});

// Função para validar o email
const validarEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// Função para validar a senha
const validarSenha = senha => {
  // Aqui você pode adicionar suas próprias regras de validação para a senha, como comprimento mínimo, caracteres especiais, etc.
  return senha.length >= 6; // Exemplo simples: senha deve ter no mínimo 6 caracteres
};

// Função para salvar um novo usuário
const salvarUsuario = (email, senha) => {
  return new Promise((resolve, reject) => {
    // Verifica se o email e senha são fornecidos e válidos
    if (!email.trim() || !senha.trim()) {
      reject(new Error('Email e senha são obrigatórios.'));
      return;
    }
    if (!validarEmail(email.trim())) {
      reject(new Error('Email inválido'));
      return;
    }
    if (!validarSenha(senha.trim())) {
      reject(new Error('Senha inválida. Deve ter no mínimo 6 caracteres.'));
      return;
    }

    // Se o email e a senha forem válidos, continua com a inserção do usuário
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO usuarios (email, senha) VALUES (?, ?);',
        [email, senha],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) {
            console.log('Usuário inserido com sucesso!');
            resolve(insertId); // Retorna o ID do novo usuário inserido
          } else {
            reject(new Error('Falha ao inserir usuário.'));
          }
        },
        error => {
          console.error('Erro ao inserir usuário: ', error);
          reject(error);
        }
      );
    });
  });
};

// Função para recuperar todos os usuários
const obterUsuarios = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT id, email, senha FROM usuarios;',
        [],
        (_, { rows }) => {
          const usuarios = rows._array;
          resolve(usuarios);
        },
        error => {
          console.error('Erro ao obter usuários: ', error);
          reject(error);
        }
      );
    });
  });
};

// Função para obter um único usuário com base no ID
const obterUsuarioPorId = id => {
  return new Promise((resolve, reject) => {
    if (!id.trim()) {
      reject(new Error('ID do usuário é obrigatório.'));
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM usuarios WHERE id = ? LIMIT 1;',
        [id],
        (_, { rows }) => {
          const usuario = rows._array[0];
          if (usuario) {
            resolve(usuario); // Usuário encontrado
          } else {
            reject(new Error('Usuário não encontrado')); // Usuário não encontrado
          }
        },
        error => {
          console.error('Erro ao obter usuário: ', error);
          reject(error);
        }
      );
    });
  });
};

const obterUsuarioPorEmail = email => {
  return new Promise((resolve, reject) => {
    if (!email.trim()) {
      reject(new Error('Email do usuário é obrigatório.'));
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM usuarios WHERE email = ? LIMIT 1;',
        [email],
        (_, { rows }) => {
          const usuario = rows._array[0];
          if (usuario) {
            resolve(usuario); // Usuário encontrado
          } else {
            reject(new Error('Usuário não encontrado')); // Usuário não encontrado
          }
        },
        error => {
          console.error('Erro ao obter usuário por email: ', error);
          reject(error);
        }
      );
    });
  });
};

// Função para atualizar um usuário existente
const atualizarUsuario = (id, email, senha) => {
  return new Promise((resolve, reject) => {
    // Verifica se o ID, email e senha (se fornecida) são fornecidos e válidos
    if (!id.trim() || !email.trim()) {
      reject(new Error('ID do usuário e email são obrigatórios.'));
      return;
    }
    if (!validarEmail(email.trim())) {
      reject(new Error('Email inválido'));
      return;
    }
    if (senha.trim() && !validarSenha(senha.trim())) {
      reject(new Error('Senha inválida. Deve ter no mínimo 6 caracteres.'));
      return;
    }

    // Se o email e a senha (se fornecida) forem válidos, continua com a atualização do usuário
    db.transaction(tx => {
      if (!senha.trim()) {
        // Se a senha não for fornecida, atualiza apenas o email
        tx.executeSql(
          'UPDATE usuarios SET email = ? WHERE id = ?;',
          [email, id],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              console.log('Email do usuário atualizado com sucesso!');
              resolve(true);
            } else {
              reject(new Error('Usuário não encontrado'));
            }
          },
          error => {
            console.error('Erro ao atualizar email do usuário: ', error);
            reject(error);
          }
        );
      } else {
        // Se a senha for fornecida, atualiza tanto o email quanto a senha
        tx.executeSql(
          'UPDATE usuarios SET email = ?, senha = ? WHERE id = ?;',
          [email, senha, id],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              console.log('Usuário atualizado com sucesso!');
              resolve(true);
            } else {
              reject(new Error('Usuário não encontrado'));
            }
          },
          error => {
            console.error('Erro ao atualizar usuário: ', error);
            reject(error);
          }
        );
      }
    });
  });
};

// Função para excluir um usuário
const excluirUsuario = id => {
  return new Promise((resolve, reject) => {
    if (!id.trim()) {
      reject(new Error('ID do usuário é obrigatório.'));
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM usuarios WHERE id = ?;',
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log('Usuário excluído com sucesso!');
            resolve(true);
          } else {
            reject(new Error('Usuário não encontrado'));
          }
        },
        error => {
          console.error('Erro ao excluir usuário: ', error);
          reject(error);
        }
      );
    });
  });
};

export { salvarUsuario, obterUsuarios, obterUsuarioPorId, obterUsuarioPorEmail, atualizarUsuario, excluirUsuario };

// Função para criar um item
export const createItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Item criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar item:', error);
  }
};

// Função para ler um item
export const readItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Valor encontrado:', value);
      return value;
    } else {
      console.log('Nenhum valor encontrado para a chave:', key);
    }
  } catch (error) {
    console.error('Erro ao ler item:', error);
  }
};

// Função para atualizar um item
export const updateItem = async (key, newValue) => {
  try {
    await AsyncStorage.setItem(key, newValue);
    console.log('Item atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar item:', error);
  }
};

// Função para deletar um item
export const deleteItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Item deletado com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar item:', error);
  }
};
