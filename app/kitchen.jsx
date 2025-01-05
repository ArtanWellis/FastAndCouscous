import React , {useState} from 'react';
import { View, Image, Text, Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Button  } from 'react-native-elements';
import OrderItem from './orders';

let initialOrders = [
  {   
      id:351,
      items :[
      {
          name: "Cheese Burger",
          quantity: 2,
          Ingredients : ["-Cheddar" , "+Bacon"],
      },
      {
          name: "Bacon Burger",
          quantity: 3,
      },{
        name: "Double Cheese Burger",
        quantity: 1,
        Ingredients: ["+Cheddar"],
      },
      {
        name: "Veggie Burger",
        quantity: 2,
        Ingredients: ["-Steak veggie", "+Avocado"],
      },
      {
        name: "Chicken Burger",
        quantity: 1,
        Ingredients: ["+Spicy Sauce"],
      },
      {
        name: "Fish Burger",
        quantity: 1,
        Ingredients: ["-Tartare sauce"],
      },
      {
        name: "BBQ Burger",
        quantity: 2,
        Ingredients: ["+BBQ Sauce", "-Onion rings"],
      },
      
    ],
      PayedHour: "18h38",
      Type : "TakeAway"
  },
  {   
      id:352,
      items :[
      {
          name: "Cheese Burger",
          quantity: 2,
          Ingredients : ["+Cheddar" , "-Bacon"]

      },
      {
          name: "Bacon Burger",
          quantity: 3,
      }],
      PayedHour: "18h48",
      Type : "DineIn"
  },
  {   
      id:353,
      items :[
      {
          name: "Veggie Burger",
          quantity: 2,
          Ingredients : ["+Cheddar" ,"+Tomate","-Oignon"]
      },
      {
          name: "Bacon Burger",
          quantity: 3,
      },
      {
          name: "Cheese Burger",
          quantity: 3,
      },
      {
          name: "Double Cheese Burger",
          quantity: 5,
      }],
      PayedHour: "19h08",
      Type : "Delivery"
  },
  {   
    id:354,
    items :[
    {
        name: "Veggie Burger",
        quantity: 2,
        Ingredients : ["+Cheddar" ,"+Tomate","-Oignon","-Bacon"]
    },
    {
        name: "Bacon Burger",
        quantity: 3,
    },
    {
        name: "Cheese Burger",
        quantity: 3,
    },
    {
        name: "Double Cheese Burger",
        quantity: 5,
    }],
    PayedHour: "19h08",
    Type : "Delivery"
},
{   
    id:355,
    items :[
    {
        name: "Veggie Burger",
        quantity: 2,
        Ingredients : ["+Cheddar" ,"+Tomate","-Oignon"]
    },
    {
        name: "Bacon Burger",
        quantity: 3,
    },
    {
        name: "Cheese Burger",
        quantity: 3,
    },
    {
        name: "Double Cheese Burger",
        quantity: 5,
    }],
    PayedHour: "19h08",
    Type : "Delivery"
},
{   
    id:356,
    items :[
    {
        name: "Veggie Burger",
        quantity: 2,
        Ingredients : ["+Cheddar" ,"+Tomate","-Oignon"]
    },
    {
        name: "Bacon Burger",
        quantity: 3,
    },
    {
        name: "Cheese Burger",
        quantity: 3,
    },
    {
        name: "Double Cheese Burger",
        quantity: 5,
    }],
    PayedHour: "19h08",
    Type : "Delivery"
},
];

const burgerRecipes = {
    "Cheese Burger": ["Pain sésame haut", "Salade", "Tomate", "Oignon", "Cornichon", "Cheddar", "Steak haché", "Ketchup", "Moutarde", "Pain sésame bas", "Temps cuisson steak : 5min"],
    "Bacon Burger": ["Pain sésame haut", "Salade", "Tomate", "Oignon", "Cornichon", "Bacon", "Cheddar", "Steak haché", "Ketchup", "Moutarde", "Pain sésame bas", "Temps cuisson steak : 5min"],
    "Double Cheese Burger": ["Pain sésame haut", "Salade", "Tomate", "Oignon", "Cornichon", "Cheddar", "Steak haché", "Cheddar", "Steak haché", "Ketchup", "Moutarde", "Pain sésame bas", "Temps cuisson steak : 5min"],
    "Veggie Burger": ["Pain sésame haut", "Salade", "Tomate", "Oignon", "Cornichon", "Cheddar", "Steak veggie", "Ketchup", "Moutarde", "Pain sésame bas", "Temps cuisson steak : 7min"],
    "Chicken Burger": ["Pain sésame haut", "Salade", "Tomate", "Oignon", "Cornichon", "Cheddar", "Poulet pané", "Ketchup", "Moutarde", "Pain sésame bas", "Temps cuisson poulet : 8min"],
    "Fish Burger": ["Pain sésame haut", "Salade", "Tomate", "Oignon", "Cornichon", "Cheddar", "Poisson pané", "Tartare sauce", "Pain sésame bas", "Temps cuisson poisson : 6min"],
    "BBQ Burger": ["Pain sésame haut", "Salade", "Tomate", "Onion rings", "Cornichon", "Cheddar", "Steak haché", "BBQ Sauce", "Pain sésame bas", "Temps cuisson steak : 5min"],
};

const ingredientIcons = {
    "Ketchup": require('../assets/images/ketchup.png'),
    "Moutarde": require('../assets/images/moutarde.png'),
    "Salade": require('../assets/images/salade.png'),
    "Tomate": require('../assets/images/tomate.png'),
    "Oignon": require('../assets/images/onion.png'),
    "Cornichon": require('../assets/images/cornichon.png'),
    "Cheddar": require('../assets/images/cheese.png'),
    "Steak haché": require('../assets/images/steak.png'),
    "Pain sésame haut": require('../assets/images/pain-haut.png'),
    "Pain sésame bas": require('../assets/images/pain-bas.png'),
    "Bacon": require('../assets/images/bacon.png'),
    "Steak veggie": require('../assets/images/veggie.png'),
    "Poulet pané": require('../assets/images/chicken.png'),
    "Poisson pané": require('../assets/images/fish.png'),
    "Tartare sauce": require('../assets/images/tartare.png'),
    "BBQ Sauce": require('../assets/images/BBQ.png'),
    "Onion rings": require('../assets/images/onion-rings.png'),
    "Avocado": require('../assets/images/avocat.png'),
    "Spicy Sauce": require('../assets/images/spicy.png'),
};


const Kitchen = () => {
    const [orders, setOrders] = useState(initialOrders);
    const [lastOrder, setLastOrder] = useState(null);
    const [isNoviceMode, setIsNoviceMode] = useState(false);
    const [orderIndex, setOrderIndex] = useState(0);
    const [hiddenRecipes, setHiddenRecipes] = useState(new Set());
    const firstOrder = orders[0];
    const waitingOrders = orders.slice(1, 4);
    let nbLeft = orders.length - 4 > 0 ? orders.length - 4 : 0;

    const toggleNoviceMode = () => {
        setIsNoviceMode(!isNoviceMode);
        setHiddenRecipes(new Set());
    };

    const handleCloseRecipe = (orderIndex, itemIndex) => {
        const recipeId = `${orderIndex}-${itemIndex}`;
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

    const handleSuppOrder = () => {
        const newOrders = orders.slice(1);
        setOrders(newOrders);
        setLastOrder(firstOrder);
        console.log(lastOrder);
    };

    const retrieveLastOrder = () => {
        console.log(lastOrder);
        if (lastOrder) {
            const newOrders = [lastOrder, ...orders];
            setOrders(newOrders);
            setLastOrder(null);
        }
    };

    const renderRecipeRows = (orderIndex, items) => {
        const rows = [];
        for (let i = 0; i < items.length; i += 2) {
            const recipe1Id = `${orderIndex}-${i}`;
            const recipe2Id = `${orderIndex}-${i + 1}`;
            
            // Ne créer une rangée que si au moins une des recettes n'est pas masquée
            if (!hiddenRecipes.has(recipe1Id) || (items[i + 1] && !hiddenRecipes.has(recipe2Id))) {
                rows.push(
                    <View style={styles.recipeRow} key={i}>
                        {/* Première recette */}
                        {!hiddenRecipes.has(recipe1Id) && (
                            <View style={styles.recipeBox}>
                                <TouchableOpacity 
                                    style={styles.closeButton} 
                                    onPress={() => handleCloseRecipe(orderIndex, i)}
                                >
                                    <Image 
                                        source={require('../assets/images/close.png')} 
                                        style={{ width: 20, height: 20 }} 
                                        resizeMode="contain" 
                                    />
                                </TouchableOpacity>
                                <Text style={styles.recipeItem}>{items[i].name}:</Text>
                                {burgerRecipes[items[i].name]?.map((ingredient, index) => (
                                    <View key={index} style={styles.ingredientRow}>
                                        {ingredientIcons[ingredient] && (
                                            <Image 
                                                source={ingredientIcons[ingredient]} 
                                                style={styles.ingredientIcon} 
                                                resizeMode="contain" 
                                            />
                                        )}
                                        <Text style={styles.recipeIngredient}>{ingredient}</Text>
                                    </View>
                                ))}
                                {items[i].Ingredients?.map((customIngredient, index) => (
                                    <View key={index} style={styles.ingredientRow}>
                                        {ingredientIcons[customIngredient.replace(/[+-]/, '')] && (
                                            <Image 
                                                source={ingredientIcons[customIngredient.replace(/[+-]/, '')]} 
                                                style={styles.ingredientIcon} 
                                                resizeMode="contain" 
                                            />
                                        )}
                                        <Text
                                            style={[
                                                styles.recipeIngredient,
                                                customIngredient.startsWith('+') ? styles.ingredientAdd : styles.ingredientRemove
                                            ]}
                                        >
                                            {customIngredient}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        )}
    
                        {/* Deuxième recette */}
                        {items[i + 1] && !hiddenRecipes.has(recipe2Id) && (
                            <View style={styles.recipeBox}>
                                <TouchableOpacity 
                                    style={styles.closeButton} 
                                    onPress={() => handleCloseRecipe(orderIndex, i + 1)}
                                >
                                    <Image 
                                        source={require('../assets/images/close.png')} 
                                        style={{ width: 20, height: 20 }} 
                                        resizeMode="contain" 
                                    />
                                </TouchableOpacity>
                                <Text style={styles.recipeItem}>{items[i + 1].name}:</Text>
                                {burgerRecipes[items[i + 1].name]?.map((ingredient, index) => (
                                    <View key={index} style={styles.ingredientRow}>
                                        {ingredientIcons[ingredient] && (
                                            <Image 
                                                source={ingredientIcons[ingredient]} 
                                                style={styles.ingredientIcon} 
                                                resizeMode="contain" 
                                            />
                                        )}
                                        <Text style={styles.recipeIngredient}>{ingredient}</Text>
                                    </View>
                                ))}
                                {items[i + 1].Ingredients?.map((customIngredient, index) => (
                                    <View key={index} style={styles.ingredientRow}>
                                        {ingredientIcons[customIngredient.replace(/[+-]/, '')] && (
                                            <Image 
                                                source={ingredientIcons[customIngredient.replace(/[+-]/, '')]} 
                                                style={styles.ingredientIcon} 
                                                resizeMode="contain" 
                                            />
                                        )}
                                        <Text
                                            style={[
                                                styles.recipeIngredient,
                                                customIngredient.startsWith('+') ? styles.ingredientAdd : styles.ingredientRemove
                                            ]}
                                        >
                                            {customIngredient}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                );
            }
        }
        return rows;
    };
    

    return (
        <View style={styles.container}>
            <View style={[
                styles.InProgress,
                isNoviceMode ? { flex: 0.6 } : { flex: 0.35 }
            ]}>
                <View style={styles.ButtonDiv}>
                    <View style={styles.ButtonWrapper}>
                        <Button
                            onPress={retrieveLastOrder}
                            buttonStyle={[styles.Button, { backgroundColor: '#FF8181' }]}
                            title='Récupérer la dernière commande'
                            titleStyle={styles.titleStyle}
                        />
                    </View>
                    <View style={styles.ButtonWrapper}>
                        <Button
                            onPress={toggleNoviceMode}
                            buttonStyle={[
                                styles.Button,
                                { backgroundColor: isNoviceMode ? '#19C319' : '#FFA500' }
                            ]}
                            titleStyle={[styles.titleStyle, { fontSize: 15 }]}
                            title='Mode novice'
                            icon={
                                <Image
                                    source={
                                        isNoviceMode
                                            ? require('../assets/images/unlock.png')
                                            : require('../assets/images/lock.png')
                                    }
                                    style={{ width: 20, height: 20 }}
                                    resizeMode="contain"
                                />
                            }
                            iconRight
                        />
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
                                    {renderRecipeRows(orderIndex, firstOrder?.items)}
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
                isNoviceMode ? { flex: 0.4 } : { flex: 0.7 }
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
        fontSize: 9,

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
    OrderItemPartial: { flex: 0.6 },
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
        flex: 0.4,
        padding: 10,
        marginLeft: 10,
        borderRadius: 10,
        backgroundColor: '#FFF8DC',
        marginBottom: 10,
    },
    recipeTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    recipeItem: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
    },
    recipeIngredient: {
        fontSize: 12,
        marginLeft: 10,
    },
    recipeScroll: {
        maxHeight: 500,
        paddingRight: 5,
    },
    recipeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
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
        width: 20,
        height: 20,
        marginRight: 8,
    },
    closeButton: { position: 'absolute', top: 5, right: 5, zIndex: 1 },
    closeIcon: { width: 20, height: 20 }, 
});

export default Kitchen;
