
import React , {useState, useEffect} from 'react';
import axios from 'axios';
import { View, Image, Text, Alert, ScrollView, StyleSheet, TouchableOpacity,Modal } from 'react-native';
import { Button  } from 'react-native-elements';
import OrderItem from '@/app/components/orderItem'; 
import {RenderRecipe} from "@/app/components/recette";
import {NoviceButton} from "@/app/components/UI/noviceButton";
import {RetrieveButton} from "@/app/components/UI/retrieveButton";
import config from '@/config';
import KitchenEmplacement from "@/app/components/UI/KitchenEmplacement";



const ip = config.serverIp;

const Kitchen = () => {
    const [orders, setOrders] = useState([]);
    const [lastOrder, setLastOrder] = useState(null);
    const [isNoviceMode, setIsNoviceMode] = useState(false);
    const [orderIndex, setOrderIndex] = useState(0);
    const [hiddenRecipes, setHiddenRecipes] = useState(new Set());
    const [firstOrder, setFirstOrder] = useState(orders[0]);
    const [isIntervalRunning, setIsIntervalRunning] = useState(false);
    const waitingOrders = orders.slice(1, 4);
    
    let nbLeft = orders.length - 4 > 0 ? orders.length - 4 : 0;
    const [isRushMode, setIsRushMode] = useState(false);
    const generateRandomOrder = () => {
        const burgerTypes = [
            "cheese-burger", "bacon-burger", "veggie-burger",
            "chicken-burger", "fish-burger", "bbq-burger",
            "double-cheese-burger"
        ];
        const orderTypes = ["TakeAway", "DineIn", "Delivery"];


        const newOrder = {
            id: orders.length + 350,
            items: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
                name: burgerTypes[Math.floor(Math.random() * burgerTypes.length)],
                type:"burger",
                quantity: Math.floor(Math.random() * 3) + 1,
                })),
            PayedHour: `${Math.floor(Math.random() * 24)}h${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            Type: orderTypes[Math.floor(Math.random() * orderTypes.length)]
        };
        return newOrder;
    };
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://' + ip + ':3010/kitchen/preparations');
            console.log('Commandes récupérées:', response.data);
            setOrders(response.data);
            setFirstOrder(response.data[0])
        } catch (error) {
            console.error('Erreur lors de la récupération des commandes:', error.message);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const retrieveLastOrder = async () => {
        if (lastOrder) {
            try {
                const response = await axios.get('http://'+ip+':3010/kitchen/retrieve/' + lastOrder.id);
                console.log('Commande validée:', response.data);
                fetchOrders();
                //handleOrderRetrieve();
            } catch (error) {
                console.error('Erreur lors de la validation de la commande:', error.message);
            }
            setLastOrder(null);
        }
    };

    const handleSuppOrder = async () => {
        if (firstOrder) {
            setLastOrder(firstOrder);
            setHiddenRecipes(new Set());
            fetchOrders();
            handleOrderFinish();
            try {
                const response = await axios.get('http://'+ip+':3010/kitchen/validation/' + firstOrder.id);
                console.log('Commande validée:', response.data);
            } catch (error) {
                console.error('Erreur lors de la validation de la commande:', error.message);
            }
        }
    };


    const startOrderInterval = () => {
        if (!isIntervalRunning) {
            setIsIntervalRunning(true);

            const orderInterval = setInterval(() => {
                setOrders((prevOrders) => {
                    const newOrders = [...prevOrders, generateRandomOrder()];
                    setFirstOrder(newOrders[0]);
                    if (newOrders.length >= 10) {
                        setIsRushMode(true);
                        clearInterval(orderInterval);
                        setIsIntervalRunning(false); // Arrête l'intervalle quand rush mode est atteint
                    }
                    return newOrders;
                });
            }, 3000);

            // Nettoyage si le composant est démonté
            return () => clearInterval(orderInterval);
        }
    };

    const handleOrderClick = (order) => {

        if (order == firstOrder) return;


        Alert.alert(
            "Confirmer l'action",
            "Voulez-vous vraiment sélectionner cette commande ?",
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Confirmer",
                    onPress: () => {
                        const newOrders = [...orders];
                        const index = newOrders.findIndex(o => o.id === order.id);

                        if (index !== -1) {
                            // Swap the orders
                            [newOrders[0], newOrders[index]] = [newOrders[index], newOrders[0]];

                            // Update both orders and firstOrder
                            setOrders([...newOrders]);
                            setFirstOrder(newOrders[0]); // Explicitly update firstOrder
                        }
                    }
                }
            ]
        );
    };



    const handleOrderFinish = () => {
        const newOrders = orders.slice(1);
        setOrders(newOrders);
        setFirstOrder(newOrders[0] || null);
    };


    return (
        <View style={styles.container}>
            <KitchenEmplacement onEmptyClicked={()=>{}} firstOrder={firstOrder} orderList={orders} onOrderFinish={handleSuppOrder} onOrderRetrieve={retrieveLastOrder}/>

            <View style={[
                styles.Waiting,
                isNoviceMode ? {flex: 0.4} : {flex: 0.5}
            ]}>
                <View style={styles.OrdersWrapper}>
                    {waitingOrders.map((order, index) => (
                        <OrderItem key={index} order={order} onOrderClick={handleOrderClick}/>
                    ))}

                </View>
                <Text style={styles.nbLeft}>
                    Nombre de commande restantes : {nbLeft} / {orders.length}
                </Text>
                <button
                    onClick={startOrderInterval}
                    disabled={isIntervalRunning}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: isIntervalRunning ? "#ccc" : "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: isIntervalRunning ? "not-allowed" : "pointer",
                    }}
                >
                    {isIntervalRunning ? "Interval Running..." : "Start Orders"}
                </button>
            </View>
            <Modal
                transparent={true}
                visible={isRushMode}
                animationType="fade"
            >
                <View style={styles.rushModeOverlay}>
                    <View style={styles.rushModeContainer}>
                        <Text style={styles.rushModeText}>Mode Rush - Allez sur la table !</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    rushModeOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rushModeContainer: {
        backgroundColor: 'red',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    rushModeText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    container: {
        margin: 20,
        flex: 1,
        flexDirection: 'row',
    },
    InProgress: {
        flex: 0.35,

        flexDirection: 'column',
        marginRight: 40,
    },

    Waiting: {
        flex: 0.7,
        flexDirection: 'column',
    },
    ButtonDiv: {
        flex: 0.08,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    Button: {
        borderRadius: 5,
        width: '100%',
        height: '100%',
    },

    titleStyle: {
        color: 'white',
        fontSize: 17,

    },
    ButtonWrapper: {
        flex: 0.45,
    },
    firstOrder: {
        flex: 0.92,
        flexDirection: 'column',
        borderRadius: 10,
        backgroundColor: '#F0CA81',
        padding: 10,
    },
    TextWrapper: {
        flex: 0.05,
        justifyContent: 'center',
        marginBottom: 10,
    },
    Text: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    OrderItemFull: { flex: 0.95 },
    OrderItemPartial: { flex: 0.4 },
    BottomButton: {
        flex: 0.1,
        justifyContent: 'flex-end',
        marginTop: 'auto',
    },
    OrdersWrapper: {
        flex: 0.95,
    },
    nbLeft: {
        flex: 0.03,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    orderAndRecipe: {
        flexDirection: 'row',
        flex: 1,
    },
    recipeContainer: {
        flex: 0.6,
        padding: 10,
        marginLeft: 10,
        borderRadius: 10,
        backgroundColor: '#FFF8DC',
        marginBottom: 10,
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    recipeItem: {
        width: "48%",
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5,
    },
    recipeIngredient: {
        fontSize: 14,
        marginLeft: 10,
    },
    recipeScroll: {
        maxHeight: 550,
        paddingRight: 5,
    },
    recipeFlex: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-between',
    },
    recipeBox: {
        flex: 0.48,
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    ingredientAdd: {
        color: 'green',
        fontWeight: 'bold',
    },
    ingredientRemove: {
        color: 'red',
        fontWeight: 'bold',
    },
    ingredientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    ingredientIcon: {
        width: 28,
        height: 28,
        marginRight: 5,
    },
    closeButton: { position: 'absolute', top: 5, right: 5, zIndex: 1 },
    closeIcon: { width: 400, height: 40 }, 
});

export default Kitchen;
