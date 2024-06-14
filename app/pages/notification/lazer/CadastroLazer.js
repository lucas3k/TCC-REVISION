import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getObjectLocalStorage, setObjectLocalStorage } from '../../../services/localstorage';

export default function CadastroLazer() {
  const [viagem, setViagem] = useState('');
  const [roupa, setRoupa] = useState('');
  const [cinema, setCinema] = useState('');
  const [show, setShow] = useState('');
  const [festa, setFesta] = useState('');
  const [presente, setPresente] = useState('');
  const [animais, setAnimais] = useState('');
  const [streaming, setStreaming] = useState('');
  const [outro, setOutro] = useState('');

  const navigation = useNavigation();

  const formatarValor = (valor) => {
    return valor ? valor.toFixed(2).toString() : '';
  };

  useEffect(() => {
    const fetchLocalHost = async () => {
      try {
        const usuario = await getObjectLocalStorage('usuario');
        const userId = usuario.id;
        const userEmail = usuario.email;
        const allValues = await getObjectLocalStorage(`${userEmail}${userId}lazer`);

        if (allValues !== null) {
          setViagem(formatarValor(allValues.viagem));
          setRoupa(formatarValor(allValues.roupa));
          setCinema(formatarValor(allValues.cinema));
          setShow(formatarValor(allValues.show));
          setFesta(formatarValor(allValues.festa));
          setPresente(formatarValor(allValues.presente));
          setAnimais(formatarValor(allValues.animais));
          setStreaming(formatarValor(allValues.streaming));
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
        viagem: parseFloat(viagem.replace(',', '.')) || "",
        roupa: parseFloat(roupa.replace(',', '.')) || "",
        cinema: parseFloat(cinema.replace(',', '.')) || "",
        show: parseFloat(show.replace(',', '.')) || "",
        festa: parseFloat(festa.replace(',', '.')) || "",
        presente: parseFloat(presente.replace(',', '.')) || "",
        animais: parseFloat(animais.replace(',', '.')) || "",
        streaming: parseFloat(streaming.replace(',', '.')) || "",
        outro: parseFloat(outro.replace(',', '.')) || "",
        total
      };

      await setObjectLocalStorage(`${userEmail}${userId}lazer`, gastos);
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
    const valores = [viagem, roupa, cinema, show, festa, presente, animais, streaming, outro];
    const total = valores.reduce((acc, valor) => acc + (parseFloat(valor.replace(',', '.')) || 0), 0);
    return total.toFixed(2);
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Cadastro de Gastos - Lazer & Outros</Text>

          {/* Campos de entrada para os gastos */}
          <TextInput
            style={styles.input}
            placeholder="Viagens"
            value={viagem}
            onChangeText={(text) => setViagem(text)}
            keyboardType="numeric" placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Vestimentas"
            value={roupa}
            onChangeText={(text) => setRoupa(text)}
            keyboardType="numeric" placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Cinema"
            value={cinema}
            onChangeText={(text) => setCinema(text)}
            keyboardType="numeric" placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Shows"
            value={show}
            onChangeText={(text) => setShow(text)}
            keyboardType="numeric" placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Festas"
            value={festa}
            onChangeText={(text) => setFesta(text)}
            keyboardType="numeric" placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Presentes"
            value={presente}
            onChangeText={(text) => setPresente(text)}
            keyboardType="numeric" placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Serviços de Streaming"
            value={streaming}
            onChangeText={(text) => setStreaming(text)}
            keyboardType="numeric" placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Animais Domésticos"
            value={animais}
            onChangeText={(text) => setAnimais(text)}
            keyboardType="numeric" placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Outros"
            value={outro}
            onChangeText={(text) => setOutro(text)}
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
