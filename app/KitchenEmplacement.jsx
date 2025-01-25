import {ScrollView, StyleSheet, Text, View} from "react-native";
import {RetrieveButton} from "./retrieveButton";
import {NoviceButton} from "./noviceButton";
import OrderItem from "./orders";
import {RenderRecipe} from "./recette";
import {Button} from "react-native-elements";
import React, {useState} from "react";
import DishEmplacement from "@/app/tableTactile/dishEmplacement";


const KitchenEmplacement = ({onEmptyClicked,firstOrder,orderList,onOrderFinish,onOrderRetrieve,noviceActive=true})=>{
    const [orders, setOrders] = useState(orderList);
    const [lastOrder, setLastOrder] = useState(null);
    const [isNoviceMode, setIsNoviceMode] = useState(false);
    const [orderIndex, setOrderIndex] = useState(0);
    const [hiddenRecipes, setHiddenRecipes] = useState(new Set());

    const handleSuppOrder = () => {
        const newOrders = orders.slice(1);
        setOrders(newOrders);
        setLastOrder(firstOrder);
        console.log(firstOrder);
        onOrderFinish();
        setHiddenRecipes(new Set());
        console.log(lastOrder);
    };
    const retrieveLastOrder = () => {
        console.log(lastOrder);
        if (lastOrder) {
            const newOrders = [lastOrder, ...orders];
            setOrders(newOrders);
            setLastOrder(null);
            onOrderRetrieve(newOrders);
        }
    };
   return( <View style={[
    styles.InProgress,
    isNoviceMode ? { flex: 0.6 } : { flex: 0.5}
]}>

        {noviceActive ?(
            <View style={styles.ButtonDiv}>
        <View style={styles.ButtonWrapper}>
            <RetrieveButton retrieveFunction={retrieveLastOrder} text={"Récupérer la dernière commande"}/>
        </View>
        <View style={styles.ButtonWrapper}>
            <NoviceButton isNoviceMode={isNoviceMode} setIsNoviceMode={setIsNoviceMode} setHiddenRecipes={setHiddenRecipes} />

        </View>
            </View>
            ):(<View style={styles.ButtonDiv}>
                <View style={styles.ButtonAlone}>
                <RetrieveButton retrieveFunction={retrieveLastOrder} text={"Récupérer la dernière commande"}/>
            </View>
        </View>)}

    <View style={styles.firstOrder}>
        <View style={styles.TextWrapper}>
            <Text style={styles.Text}>EN COURS</Text>
        </View>
        <View style={styles.orderAndRecipe}>
            <View style={[
                noviceActive ? styles.OrderItem : styles.OrderItemTable,
                isNoviceMode ? styles.OrderItemPartial : styles.OrderItemFull

            ]}>
                {firstOrder != null ?(<OrderItem order={firstOrder} onOrderClick={()=>{}} />)
                    :(<DishEmplacement onEmptyClicked={onEmptyClicked}/>)}
            </View>
            {isNoviceMode && (
                <View style={styles.recipeContainer}>
                    <Text style={styles.recipeTitle}>Recettes :</Text>
                    <ScrollView style={styles.recipeScroll} showsVerticalScrollIndicator={true}>

                        <View key={firstOrder.id} style={styles.recipeFlex}>
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
</View>);}



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
    ButtonAlone: {
        flex: 0.95,
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
    OrderItemFull: { flex: 0.95,
    },
    OrderItemTable:{maxHeight:380},
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

export default KitchenEmplacement;