import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';

export default function CadastroParticipantes() {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [data, setData] = useState([]);

    const cadastro = () => {
        if (nome && cpf)
            fetch("https://leilao-rest-api.herokuapp.com/participante", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cpf: cpf,
                    nome: nome,

                }),
            })
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(JSON.stringify(responseData));
                    setCpf("");
                    setNome("");
                })
    };

    useEffect(() => {
        fetch("https://leilao-rest-api.herokuapp.com/participante/")
            .then((resp) => resp.json())
            .then((json) => setData(json))
            .catch((error) => console.log(error))
    });
    const ItemLista = ({ item }) => (
        <View style={styles.itemContainer} >
            <Text style={styles.itemNome}>Nome: <Text style={{ fontWeight: "normal" }}>{item.nome}</Text></Text>
            <Text style={styles.itemNome}>CPF: {item.cpf}</Text>
        </View>
    );

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

            <Button title="Cadastrar" onPress={cadastro} />
            <FlatList
                data={data}
                renderItem={({ item }) => <ItemLista item={item} />}
                keyExtractor={(item) => item.id.toString()}
                style={{ width: "100%" }}
            />
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
    itemContainer: {
        backgroundColor: 'white',
        padding: 16,
        marginVertical: 8,
        // marginHorizontal: 16,
        borderRadius: 8,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
    },
    itemNome: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});


