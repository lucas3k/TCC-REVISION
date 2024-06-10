import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getObjectLocalStorage, setObjectLocalStorage } from '../../../services/localstorage';

export default function QuizViagem() {
  const [passagens, setPassagens] = useState('');
  const [acomodacao, setAcomodacao] = useState('');
  const [alimentacao, setAlimentacao] = useState('');
  const [passeio, setPasseio] = useState('');
  const [transporte, setTransporte] = useState('');
  const [documentacao, setDocumentacao] = useState('');
  const [seguro, setSeguro] = useState('');
  const [emergencia, setEmergencia] = useState('');
  const [compras, setCompras] = useState('');
  const [outro, setOutro] = useState('');

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
        const allValues = await getObjectLocalStorage(`${userEmail}${userId}viagem`);

        if (allValues !== null) {
          setPassagens(formatarValor(allValues.passagens));
          setAcomodacao(formatarValor(allValues.acomodacao));
          setAlimentacao(formatarValor(allValues.alimentacao));
          setPasseio(formatarValor(allValues.passeio));
          setTransporte(formatarValor(allValues.transporte));
          setDocumentacao(formatarValor(allValues.documentacao));
          setSeguro(formatarValor(allValues.seguro));
          setEmergencia(formatarValor(allValues.emergencia));
          setCompras(formatarValor(allValues.compras));
          setOutro(formatarValor(allValues.outro));
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
        passagens: parseFloat(passagens.replace(',', '.')) || "",
        acomodacao: parseFloat(acomodacao.replace(',', '.')) || "",
        alimentacao: parseFloat(alimentacao.replace(',', '.')) || "",
        passeio: parseFloat(passeio.replace(',', '.')) || "",
        transporte: parseFloat(transporte.replace(',', '.')) || "",
        documentacao: parseFloat(documentacao.replace(',', '.')) || "",
        seguro: parseFloat(seguro.replace(',', '.')) || "",
        emergencia: parseFloat(emergencia.replace(',', '.')) || "",
        compras: parseFloat(compras.replace(',', '.')) || "",
        outro: parseFloat(outro.replace(',', '.')) || "",
        total
      };

      await setObjectLocalStorage(`${userEmail}${userId}viagem`, gastos);
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
    const valores = [passagens, acomodacao, alimentacao, passeio, transporte, documentacao, seguro, emergencia, compras, outro];
    const total = valores.reduce((acc, valor) => acc + (parseFloat(valor.replace(',', '.')) || 0), 0);
    return total.toFixed(2);
  };

  const exibirDicas = () => {
    Alert.alert(
      'Dicas',
      'Destino e Duração: Escolha para onde quer ir e por quanto tempo, considerando clima, atrações e custo de vida.- Orçamento: Estabeleça um limite realista para gastos em passagens, hospedagem, alimentação, transporte e atividades.-Passagens e Hospedagem: Reserve passagens com antecedência para obter melhores preços e encontre acomodações que se encaixem no seu orçamento e preferências.-Itinerário: Liste as atrações que deseja visitar, considerando localização, custo e tempo necessário.-Seguro de Viagem: Proteja-se com um seguro que cubra despesas médicas, cancelamentos e emergências.-Documentos: Certifique-se de ter todos os documentos necessários, como passaporte, visto e carteira de vacinação.-Bagagem: Faça uma lista dos itens essenciais e organize suas malas com antecedência.-Transporte Local: Pesquise opções de transporte no destino e planeje seu deslocamento do aeroporto para o hotel e entre as atrações.-Contingências: Tenha um plano para lidar com imprevistos, como atrasos ou emergências médicas, e mantenha contato com pessoas em casa.',
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

          <Text style={styles.titulo}>Orçamento de uma Nova Viagem</Text>
          {/* Campos de entrada para os gastos */}
          <TextInput
            style={styles.input}
            placeholder="Passagens"
            value={passagens}
            onChangeText={(text) => setPassagens(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Acomodações"
            value={acomodacao}
            onChangeText={(text) => setAcomodacao(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Alimentação"
            value={alimentacao}
            onChangeText={(text) => setAlimentacao(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Passeio"
            value={passeio}
            onChangeText={(text) => setPasseio(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Transporte"
            value={transporte}
            onChangeText={(text) => setTransporte(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Documentações"
            value={documentacao}
            onChangeText={(text) => setDocumentacao(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Seguro"
            value={seguro}
            onChangeText={(text) => setSeguro(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Emergências"
            value={emergencia}
            onChangeText={(text) => setEmergencia(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Compras"
            value={compras}
            onChangeText={(text) => setCompras(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Outros"
            value={outro}
            onChangeText={(text) => setOutro(text.replace(',', '.'))}
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
