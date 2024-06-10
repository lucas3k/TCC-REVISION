import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getObjectLocalStorage, setObjectLocalStorage } from '../../../services/localstorage';

export default function QuizCar() {
  const [valor, setValor] = useState('');
  const [seguro, setSeguro] = useState('');
  const [licenca, setLicenca] = useState('');
  const [documentos, setDocumentos] = useState('');
  const [manutencao, setManutencao] = useState('');
  const [taxa, setTaxa] = useState('');
  const [financiamento, setFinanciamento] = useState('');

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
        const allValues = await getObjectLocalStorage(`${userEmail}${userId}carro`);

        if (allValues !== null) {
          setValor(formatarValor(allValues.valor));
          setSeguro(formatarValor(allValues.seguro));
          setLicenca(formatarValor(allValues.licenca));
          setDocumentos(formatarValor(allValues.documentos));
          setManutencao(formatarValor(allValues.manutencao));
          setTaxa(formatarValor(allValues.taxa));
          setFinanciamento(formatarValor(allValues.financiamento));
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
        valor: parseFloat(valor.replace(',', '.')) || "",
        seguro: parseFloat(seguro.replace(',', '.')) || "",
        licenca: parseFloat(licenca.replace(',', '.')) || "",
        documentos: parseFloat(documentos.replace(',', '.')) || "",
        manutencao: parseFloat(manutencao.replace(',', '.')) || "",
        taxa: parseFloat(taxa.replace(',', '.')) || "",
        financiamento: parseFloat(financiamento.replace(',', '.')) || "",
        total
      };

      await setObjectLocalStorage(`${userEmail}${userId}carro`, gastos);
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
    const valores = [valor, seguro, licenca, documentos, manutencao, taxa, financiamento];
    const total = valores.reduce((acc, valor) => acc + (parseFloat(valor.replace(',', '.')) || 0), 0);
    return total.toFixed(2);
  };

  const exibirDicas = () => {
    Alert.alert(
      'Dicas',
      'Antes de começar a procurar um veículo, determine quanto você pode pagar. Considere não apenas o preço do carro ou moto, mas também os custos de seguro, manutenção, combustível e possíveis reparos.',
      [
        {
          text: 'OK',
          onPress: () => console.log('Botão OK Pressionado'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>

          {/* Botão de dicas */}
          <TouchableOpacity style={styles.botaoDicas} onPress={exibirDicas}>
            <Text style={styles.textoBotaoDicas}>Dicas</Text>
          </TouchableOpacity>

          <Text style={styles.titulo}>Orçamento de Veiculo</Text>

          {/* Campos de entrada para os gastos */}
          <TextInput
            style={styles.input}
            placeholder="Valor do Veiculo"
            value={valor}
            onChangeText={(text) => setValor(text)}
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
            placeholder="Licença do Veiculo"
            value={licenca}
            onChangeText={(text) => setLicenca(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Documentação e Taxas"
            value={documentos}
            onChangeText={(text) => setDocumentos(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Manutenção Inicial"
            value={manutencao}
            onChangeText={(text) => setManutencao(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Taxas do revendedor"
            value={taxa}
            onChangeText={(text) => setTaxa(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Financiamento"
            value={financiamento}
            onChangeText={(text) => setFinanciamento(text)}
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
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 150,
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
