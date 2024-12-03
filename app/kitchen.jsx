import React from 'react';
import { View , Image , Text} from 'react-native';
import { Button  } from 'react-native-elements';

import OrderItem from './orders';

const orders = [
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
];

const Kitchen=()=> {
    const firstOrder = orders[0];   
  return (
    <View style={styles.container}>
        <View style={styles.InProgress}>
            <View style={styles.ButtonDiv}>
                <View style={styles.ButtonWrapper}>
                    <Button 
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
                    <OrderItem order={firstOrder}/>
                </View>
                <View style={styles.BottomButton}>
                        <View style={styles.ButtonWrapper}>
                            <Button 
                                buttonStyle={[styles.Button , {backgroundColor:'#87B6A1'}]} 
                                title='Terminer la dernière commande'
                                titleStyle={styles.titleStyle}
                            />
                        </View>
                        <View style={styles.ButtonWrapper}>
                            <Button 
                                buttonStyle={[styles.Button , {backgroundColor:'#19C319'}]} 
                                icon = {
                                    <Image
                                        source={require('../assets/images/arrow.png')}
                                        style={{width: 25, height: 25}}
                                        resizeMode="contain"
                                    />
                                }
                            />
                        </View>
                    </View>
            </View>  
        </View>
        <View style={styles.Waiting}>

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
        flex:0.35,
        flexDirection: 'column',
        marginRight:40,
    },
    Waiting:{
        flex:0.7,
        backgroundColor:'red'
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
        fontSize:9,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        position:'abosolute',
    },
};
export default Kitchen;
