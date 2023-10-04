import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function Details({ route }) {
    const [lance, setLance] = useState("");
    const { id, nome, valorMinimo, leilaoAberto, lanceVencedor, lancesRecebidos } = route.params;

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
                    id: 1
                }
            }),
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                setLance("");
            })
            .catch(error => console.log(error))
    }

    const encerrarLance = () => {
        fetch("https://leilao-rest-api.herokuapp.com/itemdeleilao" + id, {
                method: "PATCH"
                // headers: {
                //     Accept: "application/json",
                //     "Content-Type": "application/json",
                // },
                // body: JSON.stringify({
                //     valor: lance,
                //     arrematante: {
                //         id: 1
                //     }
                // }),
            })
                .then((response) => response)
                .then((responseData) => console.log(responseData))
                .catch(error => console.log(error))
    }
    return (
        <View style={styles.container}>

            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.valor}>{nome}</Text>

            <Text style={styles.label}>Valor Mínimo:</Text>
            <Text style={styles.valor}>R$ {valorMinimo}</Text>

            <Text style={styles.label}>Leilão Aberto:</Text>
            <Text style={styles.valor}>{leilaoAberto ? 'Sim' : 'Não'}</Text>

            <Text style={styles.label}>Lance Vencedor:</Text>
            <Text style={styles.valor}>{lanceVencedor ? `R$ ${lanceVencedor.valor}` : 'Nenhum'}</Text>

            <Text style={styles.label}>Lances Recebidos:</Text>
            <View>
                {lancesRecebidos.map((lance, index) => (
                    <Text style={styles.valor}>
                        {`Lance ${index + 1}: R$ ${lance.valor}`}
                    </Text>
                ))}
            </View>
            {leilaoAberto ?
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu lance"
                        onChangeText={(text) => setLance(text)}
                        value={lance}
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
        marginTop: 20,
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

