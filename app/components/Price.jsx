import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';

export default function Price(props) {


    return (
        <View style={styles.buttonContainer}>

            <View style={styles.priceContainer}>
                <Text style={styles.priceText1}>AKZ </Text>
                <Text style={styles.priceText2}>{props.preco}</Text>
                <Text style={styles.priceText1}> /mês</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    priceContainer: {
        backgroundColor: '#fff',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'red',
        border: 'solid',
        paddingVertical: 5,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginTop: 30,
        flexDirection: 'row',

    },
    priceText1: {
        color: 'grey',
        fontSize: 20,
        paddingTop: 40,
    },
    priceText2: {
        color: 'black',
        fontSize: 50,
        fontWeight: 'bold',
        paddingVertical: 10,
    },
});
