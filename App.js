import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CadastroScreen from './src/components/cadastro/CadastroSreen';
// import { SafeAreaViewBase } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ListLeilao from './src/components/leilao/ListLeilao';
import CadastroLeilao from './src/components/leilao/CadastroLeilao';
import Details from './src/components/leilao/Details';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Cadastro" component={CadastroScreen}/>
          <Stack.Screen name="Leiloes" component={ListLeilao}/>
          <Stack.Screen name='Cadastro Leilao' component={CadastroLeilao}/>
          <Stack.Screen name='Detalhes' component={Details}/>
          <Stack.Screen name='Lances' component={ListLeilao}/>
        </Stack.Navigator>
        {/* <CadastroScreen></CadastroScreen> */}
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
