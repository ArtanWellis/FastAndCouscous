import React  ,{ useState } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Button} from 'react-native';
import OrderItem, {Items} from '../components/orderItem';
import {RenderRecipe} from "../components/recette";
import KitchenEmplacement from "../components/KitchenEmplacement";

//mock
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

const CookEmplacement = ({order,orderList,onOrderFinish, onEmptyClicked}) =>{
    const [orders, setOrders] = useState(initialOrders);
    const [orderIndex, setOrderIndex] = useState(0);

    const [isNoviceMode, setIsNoviceMode] = useState(true);
    const [hiddenRecipes, setHiddenRecipes] = useState(new Set());
    return(<View style={styles.container} >
        <KitchenEmplacement onEmptyClicked={onEmptyClicked}
                            firstOrder={order} orderList={orderList} noviceActive={false} onOrderFinish={onOrderFinish}/>
        <View style={styles.RecipesContainer}>
            <ScrollView horizontal  contentContainerStyle={styles.scrollContainer}     showsHorizontalScrollIndicator={false}>
            {order?.items.map((item, index) => (
                <RenderRecipe  item={item} hiddenRecipes ={hiddenRecipes}
                               setHiddenRecipes = {setHiddenRecipes}/>
            ))}
            </ScrollView>
        </View>
    </View>);
};

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        flexDirection: 'row',

    },
    TodoDish:{
        flex:0.30,
        gap : 10,
    },
    ButtonContainer:{
        flexDirection:"row",
        gap:20,
    },
    DishEmplacements:{
        flex: 1,
        flexDirection: 'column',
        borderRadius: 10,
        alignItems:"center",
        backgroundColor: '#F0CA81',
        padding: 10,},

    RecipesContainer: {
        flex: 1,
        width:800,
        justifyContent: "flex-start", // aligne le contenu en haut
    },
    scrollContainer: {
        flexDirection:"row",
        flexGrow: 1,
        paddingHorizontal: 10, // pour un peu d'espacement
        flexWrap:"nowrap"
    },
    ARecipe:{
        gap :10,
        justifyContent:"flex-end",

    }
});
export default CookEmplacement;