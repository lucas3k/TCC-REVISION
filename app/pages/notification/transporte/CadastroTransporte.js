import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getObjectLocalStorage, setObjectLocalStorage } from '../../../services/localstorage';

export default function CadastroTransporte() {
  const [transporteP, setTransporteP] = useState('');
  const [combustivel, setCombustivel] = useState('');
  const [estacionamento, setEstacionamento] = useState('');
  const [manutencao, setManutencao] = useState('');
  const [seguro, setSeguro] = useState('');
  const [IPVA, setIPVA] = useState('');
  const [uber, setUber] = useState('');
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
        const allValues = await getObjectLocalStorage(`${userEmail}${userId}transporte`);

        if (allValues !== null) {
          setTransporteP(formatarValor(allValues.transporteP));
          setCombustivel(formatarValor(allValues.combustivel));
          setEstacionamento(formatarValor(allValues.estacionamento));
          setManutencao(formatarValor(allValues.manutencao));
          setSeguro(formatarValor(allValues.seguro));
          setIPVA(formatarValor(allValues.IPVA));
          setUber(formatarValor(allValues.uber));
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
        transporteP: parseFloat(transporteP.replace(',', '.')) || "",
        combustivel: parseFloat(combustivel.replace(',', '.')) || "",
        estacionamento: parseFloat(estacionamento.replace(',', '.')) || "",
        manutencao: parseFloat(manutencao.replace(',', '.')) || "",
        seguro: parseFloat(seguro.replace(',', '.')) || "",
        IPVA: parseFloat(IPVA.replace(',', '.')) || "",
        uber: parseFloat(uber.replace(',', '.')) || "",
        outros: parseFloat(outros.replace(',', '.')) || "",
        total
      };

      await setObjectLocalStorage(`${userEmail}${userId}transporte`, gastos);
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
    const valores = [transporteP, combustivel, estacionamento, manutencao, seguro, IPVA, uber, outros];
    const total = valores.reduce((acc, valor) => acc + (parseFloat(valor.replace(',', '.')) || 0), 0);
    return total.toFixed(2);
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Cadastro de Gastos - Transporte</Text>

          {/* Campos de entrada para os gastos */}
          <TextInput
            style={styles.input}
            placeholder="Transporte Público"
            value={transporteP}
            onChangeText={(text) => setTransporteP(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Combustível"
            value={combustivel}
            onChangeText={(text) => setCombustivel(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Estacionamento"
            value={estacionamento}
            onChangeText={(text) => setEstacionamento(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Manutenções do Automóvel"
            value={manutencao}
            onChangeText={(text) => setManutencao(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Seguro"
            value={seguro}
            onChangeText={(text) => setSeguro(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="IPVA"
            value={IPVA}
            onChangeText={(text) => setIPVA(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Uber/ APP de transporte"
            value={uber}
            onChangeText={(text) => setUber(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Outros"
            value={outros}
            onChangeText={(text) => setOutros(text)}
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
