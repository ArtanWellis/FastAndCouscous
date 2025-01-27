import React  ,{ useState,useEffect } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Button} from 'react-native';
import CookEmplacement from "@/app/components/UI/cookEmplacement";
import OrdersEmplacement from "@/app/components/UI/ordersEmplacement";


import FinishedOrdersList from "@/app/components/UI/ContainerFinishedOrder";
import OrderTable from "@/app/components/finishedOrder";

//mock

const Table = () =>{
    let initialOrders = [
        {
            id:351,
            items :[
                {
                    name: "cheese-burger",
                    type:"burger",
                    quantity: 2,
                    Ingredients : ["-Cheddar" , "+Bacon"],
                },
                {
                    name: "bacon-burger",
                    type:"burger",
                    quantity: 3,
                },{
                    name: "double-cheese-burger",
                    type:"burger",
                    quantity: 1,
                    Ingredients: ["+Cheddar"],
                },
                {
                    name: "veggie-burger",
                    type:"burger",
                    quantity: 2,
                    Ingredients: ["-Steak veggie", "+Avocado"],
                },
                {
                    name: "chicken-burger",
                    type:"burger",
                    quantity: 1,
                    Ingredients: ["+Spicy Sauce"],
                },
                {
                    name: "fish-burger",
                    type:"burger",
                    quantity: 1,
                    Ingredients: ["-Tartare sauce"],
                },
                {
                    name: "bbq-burger",
                    type:"burger",
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
                    name: "cheese-burger",
                    type:"burger",
                    quantity: 2,
                    Ingredients : ["+Cheddar" , "-Bacon"]

                },
                {
                    name: "bacon-burger",
                    type:"burger",
                    quantity: 3,
                }],
            PayedHour: "18h48",
            Type : "DineIn"
        },
        {
            id:353,
            items :[
                {
                    name: "veggie-burger",
                    type:"burger",
                    quantity: 2,
                    Ingredients : ["+Cheddar" ,"+Tomate","-Oignon"]
                },
                {
                    name: "bacon-burger",
                    type:"burger",
                    quantity: 3,
                },
                {
                    name: "cheese-burger",
                    type:"burger",
                    quantity: 3,
                },
                {
                    name: "double-cheese-burger",
                    type:"burger",
                    quantity: 5,
                }],
            PayedHour: "19h08",
            Type : "Delivery"
        },
        {
            id:354,
            items :[
                {
                    name: "veggie-burger",
                    type:"burger",
                    quantity: 2,
                    Ingredients : ["+Cheddar" ,"+Tomate","-Oignon","-Bacon"]
                },
                {
                    name: "bacon-burger",
                    type:"burger",
                    quantity: 3,
                },
                {
                    name: "cheese-burger",
                    type:"burger",
                    quantity: 3,
                },
                {
                    name: "double-cheese-burger",
                    type:"burger",
                    quantity: 5,
                }],
            PayedHour: "19h08",
            Type : "Delivery"
        },
        {
            id:355,
            items :[
                {
                    name: "veggie-burger",
                    type:"burger",
                    quantity: 2,
                    Ingredients : ["+Cheddar" ,"+Tomate","-Oignon"]
                },
                {
                    name: "bacon-burger",
                    type:"burger",
                    quantity: 3,
                },
                {
                    name: "cheese-burger",
                    type:"burger",
                    quantity: 3,
                },
                {
                    name: "double-cheese-burger",
                    type:"burger",
                    quantity: 5,
                }],
            PayedHour: "19h08",
            Type : "Delivery"
        },
        {
            id:356,
            items :[
                {
                    name: "veggie-burger",
                    type:"burger",
                    quantity: 2,
                    Ingredients : ["+Cheddar" ,"+Tomate","-Oignon"]
                },
                {
                    name: "bacon-burger",
                    type:"burger",
                    quantity: 3,
                },
                {
                    name: "cheese-burger",
                    type:"burger",
                    quantity: 3,
                },
                {
                    name: "double-cheese-burger",
                    type:"burger",
                    quantity: 5,
                }],
            PayedHour: "19h08",
            Type : "Delivery"
        },
        {
            id:357,
            items :[
                {
                    name: "bbq-burger",
                    type:"burger",
                    quantity: 4,
                    Ingredients: ["+Extra BBQ Sauce", "-Onions"]
                },
                {
                    name: "chicken-burger",
                    type:"burger",
                    quantity: 2,
                    Ingredients: ["+Spicy Mayo", "+Jalapeños"]
                }],
            PayedHour: "19h30",
            Type : "Delivery"
        },
        {
            id:358,
            items :[
                {
                    name: "veggie-burger",
                    type:"burger",
                    quantity: 3,
                    Ingredients: ["+Avocado", "-Lettuce", "+Mushrooms"]
                },
                {
                    name: "fish-burger",
                    type:"burger",
                    quantity: 1,
                    Ingredients: ["-Tartare Sauce", "+Lemon"]
                }],
            PayedHour: "19h45",
            Type : "TakeAway"
        },
        {
            id:359,
            items :[
                {
                    name: "double-cheese-burger",
                    type:"burger",
                    quantity: 2,
                    Ingredients: ["+Extra Cheddar", "+Bacon"]
                },
                {
                    name: "cheese-burger",
                    type:"burger",
                    quantity: 3,
                    Ingredients: ["-Pickles"]
                }],
            PayedHour: "20h00",
            Type : "DineIn"
        },
        {
            id:360,
            items :[
                {
                    name: "bacon-burger",
                    type:"burger",
                    quantity: 5,
                    Ingredients: ["+Crispy Bacon", "+BBQ Sauce"]
                },
                {
                    name: "chicken-burger",
                    type:"burger",
                    quantity: 2,
                    Ingredients: ["+Garlic Aioli"]
                }],
            PayedHour: "20h15",
            Type : "Delivery"
        },
    ];
    const [cookOrders, setCookOrders] = useState([
        null,null,null,null
    ]);
    const [orders, setOrders] = useState(initialOrders);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [finishedOrders, setFinishedOrders] = useState([]);
    function handleOrderSelect(order) {
        setSelectedOrder(order);
    }

    const handleCookStationTransfer = (cookIndex) => {
        let previousOrder = undefined;
        if(cookOrders[cookIndex] != null){
            previousOrder = cookOrders[cookIndex];
        }
        if (selectedOrder) {
            const updatedCookOrders = [...cookOrders];
            updatedCookOrders[cookIndex] = selectedOrder;

            setCookOrders(updatedCookOrders);

            // Remove from initial orders
            const updatedInitialOrders = orders.filter(o => o.id !== selectedOrder.id);

            if (previousOrder !== undefined) {
                updatedInitialOrders.push(previousOrder);
            }
            updatedInitialOrders.sort((a, b) => a.id - b.id);
            setOrders(updatedInitialOrders);

            // Reset selected order
            setSelectedOrder(null);
        }
    };
    const handleFinishOrder = (numCook) =>{
        if(cookOrders[numCook] != null){
            const finishedOrder = cookOrders[numCook];

            // Mettre à jour les commandes en cours
            const updatedCookOrders = [...cookOrders];
            updatedCookOrders[numCook] = null;
            setCookOrders(updatedCookOrders);

            // Mettre à jour les commandes terminées (garder uniquement les 4 dernières)
            setFinishedOrders((prevFinishedOrders) => {
                const updatedFinishedOrders = [...prevFinishedOrders, finishedOrder];
                return updatedFinishedOrders.slice(-4); // Garder uniquement les 4 dernières commandes
            });
        }
    }
    const handleRetrieveOrder= (newOrders) =>{

        const updatedOrders = new Set([
            ...orders,
            ...newOrders
        ]);


        const updatedOrdersArray = Array.from(updatedOrders).sort((a, b) => a.id - b.id);

        updatedOrdersArray.map((order) =>{
            console.log("id : " + order.id);
        })

        setOrders(updatedOrdersArray);

        const filteredOrders = finishedOrders.filter(order =>
            !updatedOrdersArray.some(finishedOrder => finishedOrder.id === order.id)
        );

        setFinishedOrders(filteredOrders);

    }
    return(
        <View style={{flex:1, justifyContent:"space-between" }}>
        <View style={styles.cookUp}>
            <View style={{maxWidth:"50%"}} >

           <CookEmplacement  onEmptyClicked={() => handleCookStationTransfer(0)}
               order={cookOrders[0]} orderList={orders} onOrderFinish={() => handleFinishOrder(0)} onOrderRetrive={handleRetrieveOrder}/>

            </View>
        <View style={{maxWidth:"50%"}}>
            <CookEmplacement onEmptyClicked={() => handleCookStationTransfer(1)}
                order={cookOrders[1]} orderList={orders} onOrderFinish={() => handleFinishOrder(1)} onOrderRetrive={handleRetrieveOrder}/>

        </View>

    </View>
        <View style={styles.ordersLine}>
            <FinishedOrdersList
                orders={finishedOrders}
            />
            <OrdersEmplacement orders={orders} onOrderClick={handleOrderSelect}/>
            <FinishedOrdersList
                orders={finishedOrders}
            />
        </View>
    <View style={styles.cookDown}>
        <View >

            <CookEmplacement onEmptyClicked={() => handleCookStationTransfer(2)} order={cookOrders[2]} orderList={orders} onOrderFinish={() => handleFinishOrder(2)} onOrderRetrive={handleRetrieveOrder}/>

        </View>
        <View >

            <CookEmplacement onEmptyClicked={() => handleCookStationTransfer(3)} order={cookOrders[3]} orderList={orders} onOrderFinish={() => handleFinishOrder(3)} onOrderRetrive={handleRetrieveOrder}/>

        </View>

    </View>
    </View>);
};

const styles = StyleSheet.create({
    cookUp:{
        flexDirection:"row",
        transform: [{ rotate: '180deg' }],
        width:'100%',
        justifyContent:"space-between",
    },
    cookDown:{
        flexDirection:"row",
        width:'100%',
        justifyContent:"space-between",

    },
    ordersLine:{flex :1,
        flexDirection:"row",
    maxHeight:300},
});
export default Table;