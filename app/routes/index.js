import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Feather } from '@expo/vector-icons';

import Welcome from '../pages/welcome';
import Signin from '../pages/signin';
import Cadastro from '../pages/cadastro';

//Pagina de dentro
import Home from '../pages/home';
import New from '../pages/new';
import Notification from '../pages/notification';
import Profile from '../pages/profile';
import Search from '../pages/search';
import ButtonNew from '../components/ButtonNew';

//Aqui faz a parte do Notification
import CadastroCasa from '../pages/notification/casa';
import CadastroAlimentacao from '../pages/notification/alimentacao';
import CadastroTransporte from '../pages/notification/transporte';
import CadastrosaudeBeleza from '../pages/notification/saudeBeleza';
import CadastroEducacao from '../pages/notification/educacao';
import CadastroLazer from '../pages/notification/lazer';

//aqui faz a parte do NEW
import QuizCar from '../pages/new/NewCar';
import QuizCasa from '../pages/new/NewCasa';
import QuizViagem from '../pages/new/NewViagem';

//aqui faz o search projects
import SearchCar from '../pages/search/News/SearchCar/SearchCar';
import SearchCasa from '../pages/search/News/SearchCasa/SearchCasa';
import SearchViagem from '../pages/search/News/SearchViagem/SearchViagem';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
      <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
      <Stack.Screen name="Dash" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroCasa" component={CadastroCasa} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroAlimentacao" component={CadastroAlimentacao} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroTransporte" component={CadastroTransporte} options={{ headerShown: false }} />
      <Stack.Screen name="CadastrosaudeBeleza" component={CadastrosaudeBeleza} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroEducacao" component={CadastroEducacao} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroLazer" component={CadastroLazer} options={{ headerShown: false }} />
      <Stack.Screen name="QuizCasa" component={QuizCasa} options={{ headerShown: false }} />
      <Stack.Screen name="QuizViagem" component={QuizViagem} options={{ headerShown: false }} />
      <Stack.Screen name="QuizCar" component={QuizCar} options={{ headerShown: false }} />
      <Stack.Screen name="SearchCar" component={SearchCar} options={{ headerShown: false }} />
      <Stack.Screen name="SearchCasa" component={SearchCasa} options={{ headerShown: false }} />
      <Stack.Screen name="SearchViagem" component={SearchViagem} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  return (
    //O tabNavigator é responsável pela barra onde fica os ícones
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0fffc9',
        tabBarStyle: {
          display: 'flex',
          backgroundColor: '#38a69d',
          borderTopColor: 'transparent',
        },
        tabBarItemStyle: {
          paddingBottom: 8, //escrita
          paddingTop: 0.1, //ícones
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, white }) => (
            <Entypo name="home" size={size} color={white} />
          )
        }}
      />
      <Tab.Screen
        name="Projetos"
        component={Search}
        options={{
          tabBarIcon: ({ size, white }) => (
            <Feather name="briefcase" size={size} color={white} />
          )
        }}
      />
      <Tab.Screen
        name="Novo"
        component={New}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, size }) => (
            <ButtonNew size={size} focused={focused} />
          )
        }}
      />
      <Tab.Screen
        name="Orçamento"
        component={Notification}
        options={{
          tabBarIcon: ({ size, white }) => (
            <Entypo name="wallet" size={size} color={white} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ size, white }) => (
            <Feather name="user" size={size} color={white} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return <MainStack />
}
