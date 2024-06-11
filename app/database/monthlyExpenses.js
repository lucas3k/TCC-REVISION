// Importe as funções necessárias do seu módulo do banco de dados
import { getObjectLocalStorage } from '../services/localstorage';

// Função para calcular os gastos mensais de cada categoria e o total do mês atual
export async function getMonthlyExpenses(user) {
  try {
    // Obtenha os dados do usuário
    const usuario = user || (await getObjectLocalStorage('usuario'));

    // Obtenha os gastos mensais de cada categoria
    const casa = await getObjectLocalStorage(`${usuario.email}${usuario.id}cadastroCasa`);
    const alimentacao = await getObjectLocalStorage(`${usuario.email}${usuario.id}alimentacao`);
    const transporte = await getObjectLocalStorage(`${usuario.email}${usuario.id}transporte`);
    const saudeBeleza = await getObjectLocalStorage(`${usuario.email}${usuario.id}saudeBeleza`);
    const educacao = await getObjectLocalStorage(`${usuario.email}${usuario.id}educacao`);
    const lazer = await getObjectLocalStorage(`${usuario.email}${usuario.id}lazer`);

    return {
      casa: casa.total || 0,
      alimentacao: alimentacao.total || 0,
      transporte: transporte.total || 0,
      saudeBeleza: saudeBeleza.total || 0,
      educacao: educacao.total || 0,
      lazer: lazer.total || 0,
    };
  } catch (error) {
    console.error('Erro ao calcular os gastos mensais:', error);
    throw error;
  }
}
