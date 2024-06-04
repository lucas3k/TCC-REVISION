import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,ScrollView,Alert,TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { getObjectLocalStorage, setObjectLocalStorage } from '../../../services/localstorage';

export default function QuizCasa() {
  const [areia, setAreia] = useState(0);
  const [pedra, setPedra] = useState(0);
  const [cimento, setCimento] = useState(0);
  const [ferro, setFerro] = useState(0);
  const [argamassa, setArgamassa] = useState(0);
  const [tijolo, setTijolo] = useState(0);
  const [madeira, setMadeira] = useState(0);
  const [telha, setTelha] = useState(0);
  const [vidro, setVidro] = useState(0);
  const [luz, setLuz] = useState(0);
  const [piso, setPiso] = useState(0);
  const [acabamento, setAcabamento] = useState(0);
  const [pintura, setPintura] = useState(0);
  const [mao, setMao] = useState(0);
  const [outro, setOutro] = useState(0);

  const navigation = useNavigation()

  useEffect(() => {
    const fetchLocalHost = async () => {
      try {
        const usuario = await getObjectLocalStorage('usuario');
        const userId = usuario.id;
        const userEmail = usuario.email;
        const allValues = await getObjectLocalStorage(`${userEmail}${userId}`);

        if (allValues !== null) {
          setAreia(Number(allValues.areia));
          setPedra(Number(allValues.pedra));
          setCimento(Number(allValues.cimento));
          setFerro(Number(allValues.ferro));
          setArgamassa(Number(allValues.argamassa));
          setTijolo(Number(allValues.tijolo));
          setMadeira(Number(allValues.madeira));
          setTelha(Number(allValues.telha));
          setVidro(Number(allValues.vidro));
          setLuz(Number(allValues.luz));
          setPiso(Number(allValues.piso));
          setAcabamento(Number(allValues.acabamento));
          setPintura(Number(allValues.pintura));
          setMao(Number(allValues.mao));
          setOutro(Number(allValues.outro));
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
        areia,
        pedra,
        cimento,
        ferro,
        argamassa,
        tijolo,
        madeira,
        telha,
        vidro,
        luz,
        piso,
        acabamento,
        pintura,
        mao,
        outro,
        total
      };

      await setObjectLocalStorage(`${userEmail}${userId}`, gastos);
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
    const valores = [areia,pedra,cimento,ferro,argamassa,tijolo,madeira,telha,vidro,luz,piso,acabamento,pintura,mao,outro];
    const total = valores.reduce((acc, valor) => acc + valor || 0, 0);
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
                value={`${areia ? areia : ''}`}
                onChangeText={(text) => setAreia(Number(text))}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Pedra"
                value={`${pedra ? pedra : ''}`}
                onChangeText={(text) => setPedra(Number(text))}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Cimento e Concreto"
                value={`${cimento ? cimento : ''}`}
                onChangeText={(text) => setCimento(Number(text))}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Ferro e Aço"
                value={`${ferro ? ferro : ''}`}
                onChangeText={(text) => setFerro(Number(text))}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Argamassa"
                value={`${argamassa ? argamassa : ''}`}
                onChangeText={(text) => setArgamassa(Number(text))}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Tijolo"
                value={`${tijolo ? tijolo : ''}`}
                onChangeText={(text) => setTijolo(Number(text))}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Madeira"
                value={`${madeira ? madeira : ''}`}
                onChangeText={(text) => setMadeira(Number(text))}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Telhado"
                value={`${telha ? telha : ''}`}
                onChangeText={(text) => setTelha(Number(text))}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Vidro"
                value={`${vidro ? vidro : ''}`}
                onChangeText={(text) => setVidro(Number(text))}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Elétrica e Hidráulica"
                value={`${luz ? luz : ''}`}
                onChangeText={(text) => setLuz(Number(text))}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Piso e Revestimento"
                value={`${piso ? piso : ''}`}
                onChangeText={(text) => setPiso(Number(text))}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Acabamentos"
                value={`${acabamento ? acabamento : ''}`}
                onChangeText={(text) => setAcabamento(Number(text))}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Pintura"
                value={`${pintura ? pintura : ''}`}
                onChangeText={(text) => setPintura(Number(text))}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Mão de Obra"
                value={`${mao ? mao : ''}`}
                onChangeText={(text) => setMao(Number(text))}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Outros"
                value={`${outro ? outro : ''}`}
                onChangeText={(text) => setOutro(Number(text))}
                keyboardType="numeric"
              />

              {/* Exibir o total de gastos */}
              <Text style={styles.total}>Total de Gastos: R$ {calcularTotal()}</Text>

              {/* Botão para salvar os dados */}
              <TouchableOpacity style={styles.botaoSalvar}
                onPress={salvarOrcamento}
              >
                <Text style={styles.textoBotao}>Salvar</Text>
              </TouchableOpacity>

              {/* Botão para voltar */}
              <TouchableOpacity
                style={styles.botaoVoltar}
                onPress={() => navigation.goBack()} // Usar navigation.goBack() para voltar
              >
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
    paddingTop: 150, // Espaçamento superior para afastar o conteúdo do topo
    paddingBottom: 40, // Espaçamento inferior para afastar o conteúdo da parte inferior
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  botaoSalvar: {
    backgroundColor: '#03BB85',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  botaoVoltar: {
    backgroundColor: '#E84803', // Cor de fundo do botão de voltar
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
  botaoDicas: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  oBotaoDicas: {
    color: 'white',
    fontWeight: 'bold',
  },
});
