import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CadastroScreen = () => {
    //   const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const navigation = useNavigation();
    const handleCadastro = () => {
        
        // fetch("https://leilao-rest-api.herokuapp.com/participante", {
        //     method: "POST",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         cpf: cpf,
        //         nome: nome,
                
        //     }),
        // })
        //     .then((response) => response.json())
        //     .then((responseData) => {
        //         console.log(JSON.stringify(responseData));
        //     })


        setCpf("");
        setNome("");
        navigation.navigate('Leiloes');
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o Nome"
                onChangeText={(text) => setNome(text)}
                value={nome}
                
            />

            <Text style={styles.label}>CPF:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o CPF"
                onChangeText={(text) => setCpf(text)}
                value={cpf}
            />

            <Button title="Cadastrar" onPress={handleCadastro} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
        fontSize: 16,
    },
});

export default CadastroScreen;
