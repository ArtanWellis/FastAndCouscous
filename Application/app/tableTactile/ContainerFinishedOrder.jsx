import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import FinishedOrder from './finishedOrder';
import OrderTable from "./finishedOrder";

const FinishedOrdersList = ({ orders }) => {
    return (
        <View style={{height:250}}>
            <View style={{backgroundColor:"#BD68EE"}}>
                <Text style={styles.titreFlip}>Commandes terminées</Text>
            </View>
        <View style={styles.container}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <OrderTable order={item} />}
                numColumns={2} // Afficher en 2 colonnes
                contentContainerStyle={styles.list}
            />
        </View>
            <View style={{backgroundColor:"#BD68EE",width:"100%"}}>
                <Text style={styles.titre}>Commandes terminées</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    list: {
        paddingBottom: 20,
    },
    titre:{
        fontWeight:"bold",
        fontSize:20,
        textAlign:"center"
    },
    titreFlip:{
        fontWeight:"bold",
        fontSize:20,
        textAlign:"center",
        transform: [{ rotate: '180deg' }]
    }
});

export default FinishedOrdersList;
