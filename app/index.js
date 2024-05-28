import { SQLiteProvider } from 'expo-sqlite';
import { Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppIntroSlider from 'react-native-app-intro-slider';

import Routes from './routes';

const pathImages = '../assets/images'

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38a69d',
  },
  slideText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    marginBottom: 10,
  },
  slideTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
});

const slides = [
  {
    key: 1,
    title: 'Organize',
    text: 'Organize seus projetos de forma simples e prática de qualquer lugar.',
    image: require(`${pathImages}/organizar.png`)
  },
  {
    key: 2,
    title: 'Planeje',
    text: 'Facilite seu planejamento e despeça-se das dívidas com praticidade.',
    image: require(`${pathImages}/planejar.png`)
  },
  {
    key: 3,
    title: 'Aprenda',
    text: 'Desfrute de uma fonte rica de conhecimento sobre Educação Financeira à sua disposição.',
    image: require(`${pathImages}/aprender.png`)
  },
  {
    key: 4,
    title: 'Conquiste',
    text: 'Com Planejamento e Conhecimento, transformamos sonhos em realidade.',
    image: require(`${pathImages}/conquistar.png`)
  },
];

function renderSlides({ item }) {
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={item.image}
        style={{
          resizeMode: 'cover',
          height: '63%',
          width: '100%',
        }}
      />
      <Text style={styles.slideTitle}>{item.title}</Text>
      <Text style={styles.slideText}>{item.text}</Text>
    </View>
  );
}

function IntroScreen() {
  const navigation = useNavigation();

  const ativarDone = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.container}>
      <AppIntroSlider
        renderItem={renderSlides}
        data={slides}
        onDone={ativarDone}
        activeDotStyle={{
          backgroundColor: '#009CFF',
          width: 30,
        }}
      />
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Routes />
    </View>
  );
}

export default function App() {
  return (
    <SQLiteProvider databaseName="tcc.db" >
      <NavigationContainer
        independent={true}
      >
        <Stack.Navigator
          initialRouteName="Intro"
          screenOptions={{
            headerMode: 'none'
          }}
        >
          <Stack.Screen
            name="Intro"
            component={IntroScreen}
          />
          <Stack.Screen name="Dashboard" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer >
    </SQLiteProvider>
  );
}
