import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CadastroScreen from './src/components/cadastro/CadastroParticipantes';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ListLeilao from './src/components/leilao/ListLeilao';
import CadastroLeilao from './src/components/leilao/CadastroLeilao';
import Details from './src/components/leilao/Details';
import { Icon } from 'react-native-elements';
import ListLance from './src/components/lance/ListLance';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const Participantes = () => {
  return (
        <Stack.Navigator>
          <Stack.Screen name="Cadastro" component={CadastroScreen}/>
        </Stack.Navigator>
  );
}
const Leiloes = () => {
  return (
        <Stack.Navigator>
          <Stack.Screen name='Todos' component={ListLeilao}/>
          <Stack.Screen name='Cadastro Leilao' component={CadastroLeilao}/>
          <Stack.Screen name='Detalhes' component={Details}/>
        </Stack.Navigator>
  );
}
const Lances = () => {
  return (
        <Stack.Navigator>
          <Stack.Screen name='Lances' component={ListLance}/>
        </Stack.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator >
          <Tab.Screen 
            name="Participantes" 
            component={Participantes} 
            options={{tabBarIcon:

           () => <Icon name='user' type='feather' />
          }}
          />
          <Tab.Screen 
            name="Leilão" 
            component={Leiloes} 
            options={{tabBarIcon:

              () => <Icon name='list' type='feather' />
             }}
          />
          <Tab.Screen 
            name='Lance'
            component={Lances}
            options={{tabBarIcon:

              () => <Icon name='money' />
             }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
