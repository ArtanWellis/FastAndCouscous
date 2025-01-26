import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import OrderItem from "../components/orderItem";

const OrderTable = ({ order, finished = true ,onOrderItemClicked}) => {
    const [isOrderItemVisible, setOrderItemVisible] = useState(false);
    const [isOrderItemFlipped, setOrderItemFlipped] = useState(false);

    const totalQuantity = order.items.reduce((total, item) => total + item.quantity, 0);

    // Gestion du clic sur la partie haute (flip)
    const handleFlipClick = () => {
        setOrderItemVisible(true);
        setOrderItemFlipped(true);
    };

    // Gestion du clic sur la partie basse
    const handleNormalClick = () => {
        setOrderItemVisible(true);
        setOrderItemFlipped(false);
    };

    return (
        <View style={styles.parentContainer}>
            {/* Affiche OrderItem au-dessus */}
            {isOrderItemVisible && (
                <View style={[styles.overlay, isOrderItemFlipped && styles.flippedOverlay]}>

                    <OrderItem
                        order={order}
                        onOrderClick={()=>

                        {   setOrderItemVisible(false);
                            onOrderItemClicked()}}
                    />

                </View>
            )}

            <TouchableOpacity style={styles.container} onPress={ ()=>{if(!finished)
                handleNormalClick()}}>
                {/* Partie haute (flip) */}
                {!finished ? (
                    <TouchableOpacity onPress={()=>{if(!finished)
                        handleFlipClick()}}>
                        <View>
                            <Text style={styles.textFlip}>Burger : x{totalQuantity}</Text>
                            <Text style={styles.textFlip}>Burger différents : x{order.items.length}</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <View></View>
                )}

                <Text style={styles.textFlip}>Order # {order.id}</Text>
                <View style={styles.line}></View>

                {/* Partie basse */}
                <Text style={styles.text}>Order # {order.id}</Text>
                {!finished ? (
                    <View>
                        <Text style={styles.text}>Burger: x{totalQuantity}</Text>
                        <Text style={styles.text}>Burger différents : x{order.items.length}</Text>
                    </View>
                ) : (
                    <View></View>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    parentContainer: {
        position: 'relative',
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFEEB',
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        borderRadius: 25,
        width: 'max-content',
    },
    overlay: {
        position: 'absolute',
        top: -200,
        left: -50,
        right: -50,
        zIndex: 100,
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    flippedOverlay: {
        transform: [{ rotate: '180deg' }],
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
        color: '#000',
        textAlign: 'center',
    },
    textFlip: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
        color: '#000',
        transform: [{ rotate: '180deg' }],
        textAlign: 'center',
    },
    line: {
        height: 2,
        width: '110%',
        backgroundColor: '#A9A9A9',
    },
});

export default OrderTable;
