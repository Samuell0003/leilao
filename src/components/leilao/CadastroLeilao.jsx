import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CadastroLeilao = () => {
    const [nome, setNome] = useState('');
    const [valorMinimo, setValorMinimo] = useState('');
    const [leilaoAberto, setLeilaoAberto] = useState(false);
    const navigation = useNavigation();

    const handleSalvar = () => {

        fetch("https://leilao-rest-api.herokuapp.com/itemdeleilao/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: nome,
                valorMinimo: valorMinimo,
                leilaoAberto: leilaoAberto,

            }),
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(JSON.stringify(responseData));
            })

        navigation.navigate('Leiloes');

    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o nome"
                value={nome}
                onChangeText={(text) => setNome(text)}
            />

            <Text style={styles.label}>Valor Mínimo:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o valor mínimo"
                value={valorMinimo}
                onChangeText={(text) => setValorMinimo(text)}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Leilão Aberto:</Text>
            <Switch
                value={leilaoAberto}
                onValueChange={(value) => setLeilaoAberto(value)}
            />

            <Button title="Salvar" onPress={handleSalvar} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

export default CadastroLeilao;
