import React , {useState, useEffect} from 'react';
import axios from 'axios';
import { View, Image, Text, Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Button  } from 'react-native-elements';
import OrderItem from '@/app/components/orderItem'; 
import {RenderRecipe} from "@/app/components/recette";
import {NoviceButton} from "@/app/components/UI/noviceButton";
import {RetrieveButton} from "@/app/components/UI/retrieveButton";
import config from '@/config';


const ip = config.serverIp;

const Kitchen = () => {
    const [orders, setOrders] = useState([]);
    const [lastOrder, setLastOrder] = useState(null);
    const [isNoviceMode, setIsNoviceMode] = useState(false);
    const [orderIndex, setOrderIndex] = useState(0);
    const [hiddenRecipes, setHiddenRecipes] = useState(new Set());
    const firstOrder = orders[0];
    const waitingOrders = orders.slice(1, 4);
    
    let nbLeft = orders.length - 4 > 0 ? orders.length - 4 : 0;

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://'+ip+':3010/kitchen/preparations');
            console.log(response.data);
            console.log('Commandes récupérées:', response.data[0]);
            setOrders(response.data);
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
            try {
                const response = await axios.get('http://'+ip+':3010/kitchen/validation/' + firstOrder.id);
                console.log('Commande validée:', response.data);
            } catch (error) {
                console.error('Erreur lors de la validation de la commande:', error.message);
            }
        }
    };

    const handleCloseRecipe = (orderIndex, itemIndex) => {
        const recipeId = `${orders[orderIndex]?.id}-${itemIndex}`;
        setHiddenRecipes(prev => {
            const newHidden = new Set(prev);
            newHidden.add(recipeId);
            return newHidden;
        });
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
                        const index = orders.findIndex(o => o.id === order.id);
                        if (index !== -1) {
                            const newOrders = [...orders];
                            newOrders[0] = order;
                            newOrders[index] = firstOrder;
                            setOrders(newOrders);
                        }
                    }
                }
            ]
        );
    };
   
  

    return (
        <View style={styles.container}>
            <View style={[
                styles.InProgress,
                isNoviceMode ? { flex: 0.6 } : { flex: 0.5}
            ]}>
                <View style={styles.ButtonDiv}>
                    <View style={styles.ButtonWrapper}>
                       <RetrieveButton retrieveFunction={retrieveLastOrder} text={"Récupérer la dernière commande"}/>
                    </View>
                    <View style={styles.ButtonWrapper}>
                        <NoviceButton isNoviceMode={isNoviceMode} setIsNoviceMode={setIsNoviceMode} setHiddenRecipes={setHiddenRecipes} />

                    </View>
                </View>
                <View style={styles.firstOrder}>
                    <View style={styles.TextWrapper}>
                        <Text style={styles.Text}>EN COURS</Text>
                    </View>
                    <View style={styles.orderAndRecipe}>
                        <View style={[
                            styles.OrderItem,
                            isNoviceMode ? styles.OrderItemPartial : styles.OrderItemFull
                        ]}>
                            <OrderItem order={firstOrder} onOrderClick={handleOrderClick} />
                        </View>
                        {isNoviceMode && (
                            <View style={styles.recipeContainer}>
                                <Text style={styles.recipeTitle}>Recettes :</Text>
                                <ScrollView style={styles.recipeScroll} showsVerticalScrollIndicator={true}>

                                        <View key={orders[orderIndex].id} style={styles.recipeFlex}>
                                            {orders[orderIndex].items.map((item, index) => (
                                                <View key={index} style={styles.recipeItem}>
                                            <RenderRecipe  item={item} hiddenRecipes ={hiddenRecipes}
                                                           setHiddenRecipes = {setHiddenRecipes}/>

                                                </View>))}
                                        </View>
                                    </ScrollView>
                            </View>
                        )}
                    </View>
                    <View style={styles.BottomButton}>
                        <Button
                            onPress={handleSuppOrder}
                            buttonStyle={[styles.Button, { backgroundColor: '#87B6A1' }]}
                            title='Terminer la commande'
                            titleStyle={[styles.titleStyle, { fontSize: 15 }]}
                        />
                    </View>
                </View>
            </View>

            <View style={[
                styles.Waiting,
                isNoviceMode ? { flex: 0.4 } : { flex: 0.5 }
            ]}>
                <View style={styles.OrdersWrapper}>
                    {waitingOrders.map((order, index) => (
                        <OrderItem key={index} order={order} onOrderClick={handleOrderClick} />
                    ))}

                </View>
                <Text style={styles.nbLeft}>
                    Nombre de commande restantes : {nbLeft} / {orders.length}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
