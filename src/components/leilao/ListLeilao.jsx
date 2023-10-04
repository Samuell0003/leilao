import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ListLeilao() {
    const [data, setData] = useState([]);
    const navigation = useNavigation();


    const cadastro = () => {
        navigation.navigate('Cadastro Leilao');

    }

    const excluirItem = (id) => {
        console.log(id);
        if (id)
            fetch("https://leilao-rest-api.herokuapp.com/itemdeleilao/" + id, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {response})
                .then((responseData) => {
                    // console.log(JSON.stringify(responseData));
                })
    }

    useEffect(() => {
        fetch("https://leilao-rest-api.herokuapp.com/itemdeleilao/")
            .then((resp) => resp.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
        // .finally(() => setLoading(false));
    });
    const ItemLista = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Detalhes', item)}>
            <View style={styles.itemContainer} >
                <View>
                    <Text style={styles.itemNome}>{item.nome}</Text>
                    <Text style={styles.itemValorMinimo}>Valor Mínimo: R$ {item.valorMinimo}</Text>
                </View>
                <TouchableOpacity onPress={() => excluirItem(item.id)} style={styles.excluir}>
                    <Text style={{ fontWeight: 'bold' }}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
    return (
        <View style={{ height: '100%' }}>
            <FlatList
                data={data}
                renderItem={({ item }) => <ItemLista item={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
            {/* <TouchableOpacity title="Cadastrar leilao" style={{position: 'absolute', bottom: 0,}} onPress={cadastro} > */}
            <TouchableOpacity onPress={cadastro} style={styles.botaoFlutuante}>
                <Text style={styles.textoBotao}>Cadastrar leilao</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: 'white',
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    itemNome: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemValorMinimo: {
        marginTop: 8,
        fontSize: 16,
    },
    botaoFlutuante: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        backgroundColor: 'blue',
        borderRadius: 50,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    textoBotao: {
        color: 'white',
        fontWeight: 'bold',
    },
    excluir: {
        backgroundColor: "red",
        width: 70,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    }
});

