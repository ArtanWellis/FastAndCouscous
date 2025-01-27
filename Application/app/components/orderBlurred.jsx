import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const OrderBlurred = ({ order, onOrderClick }) => {
    if (!order) {
        return <Text>No order provided</Text>; // Gestion des cas où la prop est undefined
    }

    // Fonction pour calculer le total d'items à partir des quantités
    const getTotalItems = (items) => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <ScrollView style={styles.OrderItem}>
            <TouchableOpacity onPress={() => (onOrderClick ? onOrderClick(order) : onOrderClick(null))}>
                <View style={styles.upOrder}>
                    <Text style={styles.textOrderBlurred}>
                        Prochaine commande : #{order.id.substring(0, 10)}... ({getTotalItems(order.items)} items)
                    </Text>
                </View>
                <View style={styles.bottomOrder}>
                    <ItemsBlurred items={order.items} />
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

const ItemsBlurred = ({ items }) => {
    return (
        <View>
            {items.map((item) => (
                <View style={styles.Items} key={item.id}>
                    <Text style={styles.Quantity}>{item.quantity}X</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>       {item.name}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = {
    Items: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E3E3E3',
    },
    textOrderBlurred: {
        flex: 0.49,
        fontSize: 20,
        fontWeight: 'bold',
    },
    OrderItem: {
        backgroundColor: '#FFFEEB',
        borderRadius: 10,
        width: '100%',
        height: '100%',
    },
    bottomOrder: {
        flex: 0.95,
        padding: 10,
    },
};

export default OrderBlurred;
