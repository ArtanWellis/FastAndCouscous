import React  ,{ useState } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Button} from 'react-native';
import {RetrieveButton} from "@/app/components/UI/retrieveButton";
import {NoviceButton} from "@/app/components/UI/noviceButton";
import {RenderRecipe} from "@/app/components/recette";
import DishEmplacement from "@/app/tableTactile/dishEmplacement";

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

const CookEmplacement = () =>{
    const [orders, setOrders] = useState(initialOrders);
    const [orderIndex, setOrderIndex] = useState(0);
    const retrieveLastItem = () => {console.log("retrieveLastItem");}
    const [isNoviceMode, setIsNoviceMode] = useState(true);
    const [hiddenRecipes, setHiddenRecipes] = useState(new Set());
    return(<View style={styles.container}>
        <View style={styles.TodoDish}>
            <View style={styles.ButtonContainer}>
                <RetrieveButton retrieveFunction={retrieveLastItem} text={"Récupérer le dernier plat"}/>
                <NoviceButton isNoviceMode={isNoviceMode} setIsNoviceMode={setIsNoviceMode} setHiddenRecipes={setHiddenRecipes}/>
            </View>
            <View style={styles.DishEmplacements}>
                <View>
                    <DishEmplacement/>
                </View>
            </View>
        </View>
        <View style={styles.RecipesContainer}>
            {orders[2].items.map((item, index) => (
                <View style={styles.ARecipe}>

                    <RenderRecipe  item={item} hiddenRecipes ={hiddenRecipes}
                                   setHiddenRecipes = {setHiddenRecipes}/>

                    <Button title={"Valider le plat"}/>

                </View>
            ))}

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

    RecipesContainer:{
        flex:0.7,
        flexDirection:'row',
        justifyContent:"space-evenly"

    },
    ARecipe:{
        gap :10,
        justifyContent:"flex-end",

    }
});
export default CookEmplacement;