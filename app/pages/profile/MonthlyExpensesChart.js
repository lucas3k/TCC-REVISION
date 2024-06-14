import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const MonthlyExpensesChart = ({ monthlyData }) => {
  const processData = (data) => {
    const categories = Object.keys(data);
    const valuesSum = Object.values(data).reduce((acc, value) => acc + Number(value), 0);

    if (valuesSum === 0) {
      return { labels: ['Sem despesas'], values: [0] };
    }

    const labels = categories.slice(0, 3);
    const values = labels.map(label => data[label]);

    return { labels, values };
  };

  const { labels, values } = processData(monthlyData);

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.container}>
      <BarChart
        data={{
          labels: labels,
          datasets: [{ data: values }],
        }}
        width={315}
        height={200}
        yAxisLabel="R$"
        chartConfig={chartConfig}
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
