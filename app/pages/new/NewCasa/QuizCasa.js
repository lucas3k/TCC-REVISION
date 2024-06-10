import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getObjectLocalStorage, setObjectLocalStorage } from '../../../services/localstorage';

export default function QuizCasa() {
  const [areia, setAreia] = useState('');
  const [pedra, setPedra] = useState('');
  const [cimento, setCimento] = useState('');
  const [ferro, setFerro] = useState('');
  const [argamassa, setArgamassa] = useState('');
  const [tijolo, setTijolo] = useState('');
  const [madeira, setMadeira] = useState('');
  const [telha, setTelha] = useState('');
  const [vidro, setVidro] = useState('');
  const [luz, setLuz] = useState('');
  const [piso, setPiso] = useState('');
  const [acabamento, setAcabamento] = useState('');
  const [pintura, setPintura] = useState('');
  const [mao, setMao] = useState('');
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
        const allValues = await getObjectLocalStorage(`${userEmail}${userId}casa`);

        if (allValues !== null) {
          setAreia(formatarValor(allValues.areia));
          setPedra(formatarValor(allValues.pedra));
          setCimento(formatarValor(allValues.cimento));
          setFerro(formatarValor(allValues.ferro));
          setArgamassa(formatarValor(allValues.argamassa));
          setTijolo(formatarValor(allValues.tijolo));
          setMadeira(formatarValor(allValues.madeira));
          setTelha(formatarValor(allValues.telha));
          setVidro(formatarValor(allValues.vidro));
          setLuz(formatarValor(allValues.luz));
          setPiso(formatarValor(allValues.piso));
          setAcabamento(formatarValor(allValues.acabamento));
          setPintura(formatarValor(allValues.pintura));
          setMao(formatarValor(allValues.mao));
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
        areia: parseFloat(areia.replace(',', '.')) || "",
        pedra: parseFloat(pedra.replace(',', '.')) || "",
        cimento: parseFloat(cimento.replace(',', '.')) || "",
        ferro: parseFloat(ferro.replace(',', '.')) || "",
        argamassa: parseFloat(argamassa.replace(',', '.')) || "",
        tijolo: parseFloat(tijolo.replace(',', '.')) || "",
        madeira: parseFloat(madeira.replace(',', '.')) || "",
        telha: parseFloat(telha.replace(',', '.')) || "",
        vidro: parseFloat(vidro.replace(',', '.')) || "",
        luz: parseFloat(luz.replace(',', '.')) || "",
        piso: parseFloat(piso.replace(',', '.')) || "",
        acabamento: parseFloat(acabamento.replace(',', '.')) || "",
        pintura: parseFloat(pintura.replace(',', '.')) || "",
        mao: parseFloat(mao.replace(',', '.')) || "",
        outro: parseFloat(outro.replace(',', '.')) || "",
        total
      };

      await setObjectLocalStorage(`${userEmail}${userId}casa`, gastos);
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
    const valores = [areia, pedra, cimento, ferro, argamassa, tijolo, madeira, telha, vidro, luz, piso, acabamento, pintura, mao, outro];
    const total = valores.reduce((acc, valor) => acc + (parseFloat(valor.replace(',', '.')) || 0), 0);
    return total.toFixed(2);
  };

  const exibirDicas = () => {
    Alert.alert(
      'Dicas',
      'Lembre-se de manter atualizado o seu Orçamento. E que você precisa ter uma margem de erro pois pode haver imprevistos, como as condições climáticas. ATENTE-SE a não estourar o seu orçamento, Tenha uma reserva emergencial.',
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

          <Text style={styles.titulo}>Controle de Orçamento de Obra</Text>
          {/* Campos de entrada para os gastos */}
          <TextInput
            style={styles.input}
            placeholder="Areia"
            value={areia}
            onChangeText={(text) => setAreia(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Pedra"
            value={pedra}
            onChangeText={(text) => setPedra(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Cimento e Concreto"
            value={cimento}
            onChangeText={(text) => setCimento(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Ferro e Aço"
            value={ferro}
            onChangeText={(text) => setFerro(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Argamassa"
            value={argamassa}
            onChangeText={(text) => setArgamassa(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Tijolo"
            value={tijolo}
            onChangeText={(text) => setTijolo(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Madeira"
            value={madeira}
            onChangeText={(text) => setMadeira(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Telhado"
            value={telha}
            onChangeText={(text) => setTelha(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Vidro"
            value={vidro}
            onChangeText={(text) => setVidro(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Elétrica e Hidráulica"
            value={luz}
            onChangeText={(text) => setLuz(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Piso e Revestimento"
            value={piso}
            onChangeText={(text) => setPiso(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Acabamentos"
            value={acabamento}
            onChangeText={(text) => setAcabamento(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Pintura"
            value={pintura}
            onChangeText={(text) => setPintura(text.replace(',', '.'))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Mão de Obra"
            value={mao}
            onChangeText={(text) => setMao(text.replace(',', '.'))}
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
