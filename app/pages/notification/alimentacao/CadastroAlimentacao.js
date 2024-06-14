import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getObjectLocalStorage, setObjectLocalStorage } from '../../../services/localstorage';

export default function CadastroAlimentacao() {
  const [mercado, setMercado] = useState('');
  const [restaurante, setRestaurante] = useState('');
  const [outros, setOutros] = useState('');

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
        const allValues = await getObjectLocalStorage(`${userEmail}${userId}alimentacao`);

        if (allValues !== null) {
          setMercado(formatarValor(allValues.mercado));
          setRestaurante(formatarValor(allValues.restaurante));
          setOutros(formatarValor(allValues.outros));
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
        mercado: parseFloat(mercado.replace(',', '.')) || "",
        restaurante: parseFloat(restaurante.replace(',', '.')) || "",
        outros: parseFloat(outros.replace(',', '.')) || "",
        total
      };

      await setObjectLocalStorage(`${userEmail}${userId}alimentacao`, gastos);
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
    const valores = [mercado, restaurante, outros];
    const total = valores.reduce((acc, valor) => acc + (parseFloat(valor.replace(',', '.')) || 0), 0);
    return total.toFixed(2);
  };

  return (
    <ScrollView>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Cadastro de Gastos - Alimentação</Text>

          {/* Campos de entrada para os gastos */}
          <TextInput
            style={styles.input}
            placeholder="Mercado"
            value={mercado}
            onChangeText={(text) => setMercado(text)}
            keyboardType="numeric" placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Restaurante"
            value={restaurante}
            onChangeText={(text) => setRestaurante(text)}
            keyboardType="numeric" placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Outros"
            value={outros}
            onChangeText={(text) => setOutros(text)}
            keyboardType="numeric" placeholderTextColor="#888"
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
