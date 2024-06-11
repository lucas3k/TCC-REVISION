import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const MonthlyExpensesChart = ({ monthlyData }) => {
  const labels = [""];
  const values = [""];

  const categories = Object.keys(monthlyData);

  categories.forEach((category) => {
    labels.push(category);
    values.push(monthlyData[category]);
  });

  const numberLabels = 3 || labels.length;

  if (labels.length > numberLabels) {
    labels.splice(numberLabels);
    values.splice(numberLabels);
  }

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  }

  return (
    <View style={styles.container}>
      <BarChart
        data={{
          labels: labels,
          datasets: [{data: values}],
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
