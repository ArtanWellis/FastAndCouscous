import React , {useState} from 'react';
import { View , Image , Text , Alert} from 'react-native';
import { Button  } from 'react-native-elements';

import OrderItem from './orders';

let initialOrders = [
  {   
      id:351,
      items :[
      {
          name: "Cheese Burger",
          quantity: 2,
          Ingredients : ["-Fromage" , "+Bacon"]
      },
      {
          name: "Burger Bacon",
          quantity: 3,
      },{
        name: "Double Cheese Burger",
        quantity: 1,
        Ingredients: ["+Extra Cheese"]
      },
      {
        name: "Veggie Burger",
        quantity: 2,
        Ingredients: ["-Meat", "+Avocado"]
      },
      {
        name: "Chicken Burger",
        quantity: 1,
        Ingredients: ["+Spicy Sauce"]
      },
      {
        name: "Fish Burger",
        quantity: 1,
        Ingredients: ["-Tartar Sauce"]
      },
      {
        name: "BBQ Burger",
        quantity: 2,
        Ingredients: ["+BBQ Sauce", "-Onion Rings"]
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
          Ingredients : ["+Fromage" , "-Bacon"]

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
          Ingredients : ["+Fromage" ,"+Tomates","-Oignons","-Bacon"]
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
          name: "Double Meat Burger",
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
        Ingredients : ["+Fromage" ,"+Tomates","-Oignons","-Bacon"]
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
        name: "Double Meat Burger",
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
        Ingredients : ["+Fromage" ,"+Tomates","-Oignons","-Bacon"]
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
        name: "Double Meat Burger",
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
        Ingredients : ["+Fromage" ,"+Tomates","-Oignons","-Bacon"]
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
        name: "Double Meat Burger",
        quantity: 5,
    }],
    PayedHour: "19h08",
    Type : "Delivery"
},
];

const Kitchen=()=> {
    const [orders, setOrders] = useState(initialOrders);
    const [lastOrder, setLastOrder] = useState(null);
    const firstOrder = orders[0];
    const waitingOrders= orders.slice(1,4)
    let nbLeft=orders.length-4 > 0 ? orders.length-4 : 0

    const handleOrderClick = (order) => {
        if(order==firstOrder) return;
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

    const handleSuppOrder = ()=>{
            const newOrders = orders.slice(1)
            setOrders(newOrders)
            setLastOrder(firstOrder)
            console.log(lastOrder)


    }

    const retrieveLastOrder = () => {
        console.log(lastOrder)
        if(lastOrder){
            const newOrders = [lastOrder,...orders];
            setOrders(newOrders);
            setLastOrder(null)
        }
    }
  return (
    <View style={styles.container}>
        <View style={styles.InProgress}>
            <View style={styles.ButtonDiv}>
                <View style={styles.ButtonWrapper}>
                    <Button 
                        onPress={ () => retrieveLastOrder()}
                        buttonStyle={[styles.Button , {backgroundColor:'#FF8181'}]} 
                        title='Récupérer la dernière commande'
                        titleStyle={styles.titleStyle}
                    />
                </View>
                <View style={styles.ButtonWrapper}>
                    <Button 
                        buttonStyle={[styles.Button , {backgroundColor:'#19C319'}]} 
                        titleStyle={[styles.titleStyle ,{fontSize:15}]}
                        title='Mode novice : ' 
                        icon = {
                            <Image
                                source={require('../assets/images/lock.png')}
                                style={{width: 20, height: 20}}
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
                <View style={styles.OrderItem}>
                    <OrderItem order={firstOrder}  onOrderClick={handleOrderClick}/>
                </View>
                <View style={styles.BottomButton}>
                    <Button 
                        onPress={ () => handleSuppOrder()}
                        buttonStyle={[styles.Button , {backgroundColor:'#87B6A1'}]} 
                        title='Terminer la commande'
                        titleStyle={[styles.titleStyle,{fontSize:15}]}
                    />
                </View>
            </View>  
        </View>
        <View style={styles.Waiting}>
            <View style={styles.OrdersWrapper}>
                {waitingOrders.map((order,index)=>(
                    <OrderItem key={index} order={order} onOrderClick={handleOrderClick} />
                ))}
            </View>
            <Text style={styles.nbLeft}>
                Nombre de commande restantes : {nbLeft} / {orders.length}
            </Text>
        </View>
    </View>);
};

const styles = {
    container:{
        margin:20,
        flex:1,
        flexDirection: 'row',
    } ,
    InProgress:{
        flex:0.5,
        flexDirection: 'column',
        marginRight:40,
    },
    Waiting:{
        flex:0.5,
        flexDirection :'column',
    },
    ButtonDiv:{
        flex:0.08,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:10,
    },
    Button:{
        borderRadius:5,
        width:'100%',
        height:'100%',
    },
    titleStyle:{
        color : 'white',
        fontSize:11,
    },
    ButtonWrapper: {
        flex: 0.45,
    },
    firstOrder:{
        flex:0.92,
        flexDirection: 'column',
        borderRadius:10,
        backgroundColor:'#F0CA81',
        padding:10,

    },
    TextWrapper:{
        flex:0.05,
        justifyContent:'center',
        marginBottom:10,
    },
    Text:{
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center',
    },
    OrderItem:{
        flex:0.95,
    },
    BottomButton:{
        flex:0.10,
        justifyContent: 'center',
        position:'abosolute',
        
    },
    OrdersWrapper:{
        flex:0.95,
    },
    nbLeft:{
        flex:0.03,
        textAlign : 'center',
        fontWeight:'bold',
    }
};
export default Kitchen;
