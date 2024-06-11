import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getObjectLocalStorage, setObjectLocalStorage } from '../../../services/localstorage';

export default function CadastroCasa() {
  const [aluguel, setAluguel] = useState('');
  const [agua, setAgua] = useState('');
  const [luz, setLuz] = useState('');
  const [internet, setInternet] = useState('');
  const [emprestimo, setEmprestimo] = useState('');
  const [condominio, setCondominio] = useState('');
  const [gas, setGas] = useState('');
  const [manutencoes, setManutencoes] = useState('');
  const [iptu, setIptu] = useState('');

  const navigation = useNavigation();

  const formatarValor = (valor) => {
    return valor ? valor.toFixed(2).toString() : '';
  }

  useEffect(() => {
    const fetchLocalHost = async () => {
      try {
        const usuario = await getObjectLocalStorage('usuario');
        const userId = usuario.id;
        const userEmail = usuario.email;
        const allValues = await getObjectLocalStorage(`${userEmail}${userId}cadastroCasa`);

        if (allValues !== null) {
          setAluguel(formatarValor(allValues.aluguel));
          setAgua(formatarValor(allValues.agua));
          setLuz(formatarValor(allValues.luz));
          setInternet(formatarValor(allValues.internet));
          setEmprestimo(formatarValor(allValues.emprestimo));
          setCondominio(formatarValor(allValues.condominio));
          setGas(formatarValor(allValues.gas));
          setManutencoes(formatarValor(allValues.manutencoes));
          setIptu(formatarValor(allValues.iptu));
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchLocalHost();
  }, []);

  const salvarLocalHost = async (total) => {
    try {
      const usuario = await getObjectLocalStorage('usuario');
      const userId = usuario.id;
      const userEmail = usuario.email;

      const gastos = {
        aluguel: parseFloat(aluguel.replace(',', '.')) || "",
        agua: parseFloat(agua.replace(',', '.')) || "",
        luz: parseFloat(luz.replace(',', '.')) || "",
        internet: parseFloat(internet.replace(',', '.')) || "",
        emprestimo: parseFloat(emprestimo.replace(',', '.')) || "",
        condominio: parseFloat(condominio.replace(',', '.')) || "",
        gas: parseFloat(gas.replace(',', '.')) || "",
        manutencoes: parseFloat(manutencoes.replace(',', '.')) || "",
        iptu: parseFloat(iptu.replace(',', '.')) || "",
        total
      };

      await setObjectLocalStorage(`${userEmail}${userId}cadastroCasa`, gastos);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  const salvarOrcamento = () => {
    const total = calcularTotal();
    salvarLocalHost(total);
    Alert.alert('Orçamento salvo com sucesso!');
  };

  const calcularTotal = () => {
    const valores = [aluguel, agua, luz, internet, emprestimo, condominio, gas, manutencoes, iptu];
    const total = valores.reduce((acc, valor) => acc + (parseFloat(valor.replace(',', '.')) || 0), 0);
    return total.toFixed(2);
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Cadastro de Gastos - Casa</Text>
          {/* Campos de entrada para os gastos */}
          <TextInput
            style={styles.input}
            placeholder="Aluguel"
            value={aluguel}
            onChangeText={(text) => setAluguel(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Água"
            value={agua}
            onChangeText={(text) => setAgua(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Luz"
            value={luz}
            onChangeText={(text) => setLuz(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Internet"
            value={internet}
            onChangeText={(text) => setInternet(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Empréstimo ou Financiamento"
            value={emprestimo}
            onChangeText={(text) => setEmprestimo(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Valor do Condomínio"
            value={condominio}
            onChangeText={(text) => setCondominio(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Gás"
            value={gas}
            onChangeText={(text) => setGas(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Manutenções"
            value={manutencoes}
            onChangeText={(text) => setManutencoes(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="IPTU"
            value={iptu}
            onChangeText={(text) => setIptu(text)}
            keyboardType="numeric"
          />

          {/* Exibir o total de gastos */}
          <Text style={styles.total}>Total de Gastos: R$ {calcularTotal()}</Text>

          {/* Botão para salvar os dados */}
          <TouchableOpacity style={styles.botaoSalvar} onPress={salvarOrcamento}>
            <Text style={styles.textoBotao}>Salvar</Text>
          </TouchableOpacity>

          {/* Botão para voltar */}
          <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
            <Text style={styles.textoBotao}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
    borderRadius: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
  botaoSalvar: {
    height: 50,
    width: '80%',
    backgroundColor: '#32CD32',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  botaoVoltar: {
    height: 50,
    width: '80%',
    backgroundColor: '#00BFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textoBotao: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  botaoDicas: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: '#32CD32',
    borderRadius: 5,
  },
  textoBotaoDicas: {
    color: 'white',
    fontWeight: 'bold',
  },
});
