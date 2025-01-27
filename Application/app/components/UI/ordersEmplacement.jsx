import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import OrderItem from "../orderItem";
import OrderTable from "@/app/components/finishedOrder";


const OrdersEmplacement = ({orders, onOrderClick}) => {
    const displayedOrders = orders?.slice(0, 8) || [];
    return (
        <View style={styles.container}>
            {displayedOrders.map((order, index) => (
                <OrderTable
                    key={order.id}
                    order={order}
                    finished={false}
                    onOrderItemClicked={() => { onOrderClick(order)}}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex :1,
        flexDirection:'row',
        gap : 30,
        justifyContent:"center",
        alignItems:'center',

    },
});

export default OrdersEmplacement;