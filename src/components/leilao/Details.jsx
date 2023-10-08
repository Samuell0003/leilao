import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function Details( { route } ) {
    const [lance, setLance] = useState();
    const [idUser, setIdUser] = useState();
    const [data, setData] = useState({});
    const { id } = route.params;

    useEffect(() => {
        fetch("https://leilao-rest-api.herokuapp.com/itemdeleilao/" + id)
            .then((resp) => resp.json())
            .then((json) => setData(json))
            .catch((error) => console.log(error))
        // .finally(() => setLoading(false));
    });

    const cadastrarLance = () => {
        console.log(lance);
        fetch("https://leilao-rest-api.herokuapp.com/lance/" + id, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                valor: lance,
                arrematante: {
                    id: idUser
                }
            }),
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                setLance("");
                setIdUser("");
            })
            .catch(error => console.log(error))
    }

    const encerrarLance = () => {
        fetch("https://leilao-rest-api.herokuapp.com/itemdeleilao/" + id, {
                method: "PATCH"
            })
                .catch(error => console.log(error))
    }
    return (
        <View style={styles.container}>

            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.valor}>{data.nome}</Text>

            <Text style={styles.label}>Valor Mínimo:</Text>
            <Text style={styles.valor}>R$ {data.valorMinimo}</Text>

            <Text style={styles.label}>Leilão Aberto:</Text>
            <Text style={styles.valor}>{data.leilaoAberto ? 'Sim' : 'Não'}</Text>

            <Text style={styles.label}>Lance Vencedor:</Text>
            <Text style={styles.valor}>{data.lanceVencedor ? `R$ ${data.lanceVencedor.valor}` : 'Nenhum'}</Text>

            <Text style={styles.label}>Lances Recebidos:</Text>
            <View style={{marginBottom: 20}}>
                {data.lancesRecebidos?.map((lance, index) => (
                    <Text style={styles.valor}>
                        {`Lance ${index + 1}: R$ ${lance.valor}`}
                    </Text>
                ))}
            </View>
            {data.leilaoAberto ?
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu lance"
                        onChangeText={(text) => setLance(text)}
                        value={lance}
                        keyboardType="numeric"

                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o id do usuario"
                        onChangeText={(text) => setIdUser(text)}
                        value={idUser}
                        keyboardType="numeric"

                    />
                    <TouchableOpacity style={styles.button.cadastro} onPress={cadastrarLance}>
                        <Text>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button.encerrar} onPress={encerrarLance}>
                        <Text>Encerrar leilao</Text>
                    </TouchableOpacity>
                </View>
                :
                <></>
            }
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
        fontWeight: 'bold',
        marginTop: 8,
    },
    valor: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        marginBottom: 20,
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
        fontSize: 16,
    },
    button: {
        cadastro: {
            backgroundColor: "green",
            padding: 20,
            alignItems: "center",
            marginBottom: 10,
        },
        encerrar: {
            backgroundColor: "red",
            padding: 20,
            alignItems: "center"
        },
    }
});

