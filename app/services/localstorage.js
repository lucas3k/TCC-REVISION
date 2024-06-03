import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStringLocalStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('Erro ao salvar usuário logado:', e);
  }
};

export const getStringLocalStorage = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error('Erro ao buscar usuário logado:', e);
  }
}

export const removeLocalStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Erro ao remover do storage:', e);
  }
}

export const setObjectLocalStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  }
  catch (e) {
    console.error('Erro ao salvar objeto:', e);
  }
}

export const getObjectLocalStorage = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Erro ao buscar objeto:', e);
  }
}
