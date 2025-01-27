import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Utilise cette icône pour le "+".

const DishEmplacement = ({onEmptyClicked}) => {

    return (
        <TouchableOpacity style={styles.container} onPress={onEmptyClicked}>
            <MaterialIcons name="add-circle-outline" size={100} color="black" />
            <Text style={styles.text}>Ajouter une commande</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d3d3d3',
        borderWidth: 2,
        borderColor: '#000',
        borderStyle: 'dashed',
        padding: 10,
        borderRadius: 25,
        height: 350,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
        color: '#000',
        textAlign:"center",
    },
});

export default DishEmplacement;