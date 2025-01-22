import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Utilise cette icône pour le "+".

const DishEmplacement = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <MaterialIcons name="add-circle-outline" size={24} color="black" />
            <Text style={styles.text}>Faites glisser un plat</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d3d3d3',
        borderWidth: 2,
        borderColor: '#000',
        borderStyle: 'dashed',
        padding: 10,
        borderRadius: 25,
        width: 300,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
        color: '#000',
    },
});

export default DishEmplacement;