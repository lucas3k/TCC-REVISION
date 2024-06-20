import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import moment from 'moment';
import { setStringLocalStorage, getStringLocalStorage } from '../../services/localstorage';

const MonthlyExpensesChart = ({ valorTotalMesAtual }) => {
  const [valorAtual, setValorAtual] = useState(0);
  const [mesAtual, setMesAtual] = useState(moment().format('MM/YYYY'));
  const [dadosGrafico, setDadosGrafico] = useState({ labels: [], data: [] });

  useEffect(() => {
    const filtrarValor = (value) => {
      // se o valor for menor que mil não tirar o ponto dos centavos
      if (value.indexOf(",") === -1) {
        return Number(value.replace("R$", "").replace(",", "."))
      }

      return Number(value.replace("R$", "").replace(".", "").replace(",", "."))
    };

    const valor = filtrarValor(valorTotalMesAtual);

    if (!isNaN(valor)) {
      setValorAtual(valor);
    }
  }, [valorTotalMesAtual]);

  useEffect(() => {
    const salvar = async () => {
      const totalMesesJSON = await getStringLocalStorage('totalMeses');
      const totalMeses = totalMesesJSON ? JSON.parse(totalMesesJSON) : [];

      const mesAtualFormatado = moment().format('MM/YYYY');

      const indexMesAtual = totalMeses.findIndex((mes) => mes.mes === mesAtualFormatado);

      if (indexMesAtual !== -1) {
        totalMeses[indexMesAtual].total = valorAtual;
      } else {
        totalMeses.push({ mes: mesAtualFormatado, total: valorAtual });
      }

      await setStringLocalStorage('totalMeses', JSON.stringify(totalMeses));
      atualizarDadosGrafico(totalMeses);
    };

    salvar();
  }, [valorAtual, mesAtual]);

  useEffect(() => {
    const verificarMes = async () => {
      const mesAtualFormatado = moment().format('MM/YYYY');
      setMesAtual(mesAtualFormatado);

      const totalMesesJSON = await getStringLocalStorage('totalMeses');
      const totalMeses = totalMesesJSON ? JSON.parse(totalMesesJSON) : [];

      const indexMesAtual = totalMeses.findIndex((mes) => mes.mes === mesAtualFormatado);

      if (indexMesAtual === -1) {
        totalMeses.push({ mes: mesAtualFormatado, total: 0 });
        await setStringLocalStorage('totalMeses', JSON.stringify(totalMeses));
        setValorAtual(0);
      } else {
        setValorAtual(totalMeses[indexMesAtual].total);
      }

      atualizarDadosGrafico(totalMeses);
    };

    verificarMes();
  }, []);

  const atualizarDadosGrafico = (totalMeses) => {
    const labels = totalMeses.map((mes) => mes.mes);
    const data = totalMeses.map((mes) => mes.total);
    setDadosGrafico({ labels, data });
  };

  return (
    <View style={styles.container}>
      <BarChart
        data={{
          labels: dadosGrafico.labels,
          datasets: [
            {
              data: dadosGrafico.data,
            },
          ],
        }}
        width={300}
        height={200}
        yAxisLabel="R$"
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
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
