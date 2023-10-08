import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ListLance() {
    const [data, setData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetch("https://leilao-rest-api.herokuapp.com/lance/")
            .then((resp) => resp.json())
            .then((json) => setData(json))
            .catch((error) => console.log(error))
        // .finally(() => setLoading(false));
    });
    const ItemLista = ({ item }) => (
        <View style={styles.itemContainer} >
            <Text style={styles.itemNome}>Nome: <Text style={{fontWeight:"normal"}}>{item.arrematante.nome}</Text></Text>
            <Text styl={styles.itemValorMinimo}>Valor: R$ {item.valor}</Text>
        </View>
    );
    return (
        <View style={{ height: '100%' }}>
            <FlatList
                data={data}
                renderItem={({ item }) => <ItemLista item={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
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
        justifyContent: 'space-between',
        alignItems: "center"
    },
    itemNome: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});