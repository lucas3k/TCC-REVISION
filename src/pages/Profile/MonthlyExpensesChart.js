import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { createItem, readItem } from '../../database/config';

const DATABASE_KEYS = {
  casa: 'fullCasa',
  viagem: 'fullViagem',
  carro: 'fullCarro',
  monthlyExpenses: 'monthlyExpenses',
  labels: 'labels',
};

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const parseData = (data) => (data ? +JSON.parse(data).vTotal : 0);

const fetchData = async (setMonthlyExpenses, setLabels) => {
  try {
    const [casaData, viagemData, carroData] = await Promise.all([
      readItem(DATABASE_KEYS.casa),
      readItem(DATABASE_KEYS.viagem),
      readItem(DATABASE_KEYS.carro)
    ]);

    const currentMonth = new Date().getMonth();

    const casaExpenses = parseData(casaData);
    const viagemExpenses = parseData(viagemData);
    const carroExpenses = parseData(carroData);

    const allExpenses = [casaExpenses, viagemExpenses, carroExpenses];

    let monthlyTotals = Array(12).fill(0);
    monthlyTotals[currentMonth] = allExpenses.reduce((acc, value) => acc + value, 0);

    // Reorganizar os dados para começar no mês atual
    const fullTotals = monthlyTotals.slice(currentMonth).concat(monthlyTotals.slice(0, currentMonth));
    const fullMonthNames = monthNames.slice(currentMonth).concat(monthNames.slice(0, currentMonth));

    // Verificar se existem meses subsequentes com dados e somá-los ao mês atual
    for (let i = currentMonth + 1; i < 12; i++) {
      if (monthlyTotals[i] !== 0) {
        fullTotals[0] += monthlyTotals[i];
      }
    }

    // Filtrar para mostrar apenas meses com dados e pelo menos o mês atual
    const filteredTotals = fullTotals.slice(0, fullTotals.findIndex(total => total !== 0) + 1);
    const filteredLabels = fullMonthNames.slice(0, filteredTotals.length);

    setMonthlyExpenses(filteredTotals);
    setLabels(filteredLabels);

    await createItem(DATABASE_KEYS.monthlyExpenses, JSON.stringify(filteredTotals));
    await createItem(DATABASE_KEYS.labels, JSON.stringify(filteredLabels));

  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }
};

const loadSavedData = async (setMonthlyExpenses, setLabels) => {
  try {
    const savedExpenses = await readItem(DATABASE_KEYS.monthlyExpenses);
    const savedLabels = await readItem(DATABASE_KEYS.labels);

    if (savedExpenses) {
      setMonthlyExpenses(JSON.parse(savedExpenses));
    }

    if (savedLabels) {
      setLabels(JSON.parse(savedLabels));
    }
  } catch (error) {
    console.error("Erro ao carregar dados salvos:", error);
  }
};

const MonthlyExpensesChart = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    fetchData(setMonthlyExpenses, setLabels);
  }, []);

  useEffect(() => {
    loadSavedData(setMonthlyExpenses, setLabels);
  }, []);

  const screenWidth = Dimensions.get("window").width;

  const data = {
    labels,
    datasets: [
      {
        data: monthlyExpenses,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <BarChart
        data={data}
        width={310}
        height={220}
        yAxisLabel="R$"
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default MonthlyExpensesChart;
