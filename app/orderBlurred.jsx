import React from 'react';
import {StyleSheet,View,Text,Image,TouchableOpacity, ScrollView} from 'react-native';
import OrderItem from "./orders";

const OrderBlurred = ({order , onOrderClick}) => {
    if (!order) {
        return <Text>No order provided</Text>; // Gestion des cas où la prop est undefined
    }
    return (
        <ScrollView style={styles.OrderItem}>
            <TouchableOpacity onPress={() => onOrderClick ? onOrderClick(order) : onOrderClick(null)}>

                <View style={styles.upOrder}>
                    <Text style={[styles.textOrderBlurred]}>Prochaine commande : #{order.id} </Text>
                </View>
                <View style={styles.bottomOrder}>
                    <ItemsBlurred items={order.items}/>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
}
const ItemsBlurred = ({ items }) =>{
    return (
        <View>
            {items.map((item,key) => (
                <View style={styles.Items} key={item.id}>
                    <Text style = {styles.Quantity}>{item.quantity}X</Text>
                    <Text style = {{fontSize:18,fontWeight:'bold'}} >       {item.name}</Text>
                </View>

            ))}
        </View>
    );
}

const styles = {

    Items:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E3E3E3',
    },

    textOrderBlurred:{
        flex:0.49,
        fontSize: 20,
        fontWeight: 'bold',
    },
};

export default OrderBlurred;
