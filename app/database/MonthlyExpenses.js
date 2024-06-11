// Importe as funções necessárias do seu módulo do banco de dados
import { getImagesByUserId } from './config';

// Função para calcular os gastos mensais de cada categoria e o total do mês atual
export async function getMonthlyExpenses(userId) {
  try {
    // Obtenha o nome do mês atual
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const currentDate = new Date();
    const currentMonthName = monthNames[currentDate.getMonth()];

    // Inicialize o total de gastos
    let totalGastos = 0;

    // Array para armazenar os gastos mensais de cada categoria
    const monthlyExpenses = [];

    // Função para obter os gastos de uma categoria específica
    const getCategoryExpenses = async (category) => {
      try {
        // Substitua este bloco com a lógica real para buscar os gastos da categoria no seu banco de dados
        const categoryExpenses = await getImagesByUserId(userId);
        return categoryExpenses.reduce((total, image) => total + image.path, 0);
      } catch (error) {
        console.error('Erro ao obter os gastos da categoria', category, ':', error);
        return 0; // Retorne 0 se houver um erro ao buscar os gastos da categoria
      }
    };

    // Calcule os gastos de cada categoria e adicione ao array monthlyExpenses
    const casaExpenses = await getCategoryExpenses('casa');
    monthlyExpenses.push({ category: 'Casa', total: casaExpenses });

    const alimentacaoExpenses = await getCategoryExpenses('alimentacao');
    monthlyExpenses.push({ category: 'Alimentação', total: alimentacaoExpenses });

    // Adicione as outras categorias aqui...

    // Calcule o total dos gastos mensais e adicione ao array monthlyExpenses
    totalGastos = monthlyExpenses.reduce((total, category) => total + category.total, 0);
    monthlyExpenses.push({ category: currentMonthName, total: totalGastos });

    // Retorne os gastos mensais de cada categoria e o total do mês atual
    return monthlyExpenses;
  } catch (error) {
    console.error('Erro ao calcular os gastos mensais:', error);
    throw error;
  }
}
