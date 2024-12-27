import React , {useState} from 'react';
import {View, Image, Text, Alert, Platform,StyleSheet} from 'react-native';
import { Button  } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
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

const Telephone=()=> {

    const [orders, setOrders] = useState(initialOrders);
    const [indiceOrder, setIndiceOrder] = useState(0);
    const [actualOrder, setActualOrder] = useState(orders[0]);

    let nbLeft=orders.length-4 > 0 ? orders.length-4 : 0
    const [selectedFilter, setSelectedFilter] = useState('complet');
    const filterOptions = [
        { label: 'Complet', value: 'complet' },
        { label: 'Chaud', value: 'chaud' },
        { label: 'Froid', value: 'froid' },
        { label: 'Burger', value: 'burger' },
        { label: 'Nuggets', value: 'nuggets' },
        { label: 'Frites', value: 'frites' },
        { label: 'Salades', value: 'salades' },
        { label: 'Boissons', value: 'boissons' },
        { label: 'Glaces', value: 'glaces' },

    ];
    const finishOrder = () => {
        Alert.alert(
            "Confirmer l'action",
            "Cette commande est-elle terminée ?",
            [
              {
                text: "Annuler",
                style: "cancel"
              },
              {
                text: "Confirmer",
                onPress: () => {
                    const updatedOrders = orders.filter((_, index) => index !== indiceOrder);

                    setOrders(updatedOrders);
                    setIndiceOrder(0);


                    if (updatedOrders.length > 0) {
                        setActualOrder(updatedOrders[0]);
                    } else {
                        setActualOrder(null);
                    }

                }
              }
            ]
        );
    };
    const switchOrder = () => {
        let newIndice = indiceOrder + 1;
        if (newIndice >= orders.length) {
            newIndice = 0;
        }
          setIndiceOrder(newIndice);
          setActualOrder(orders[newIndice]);

        };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>
            Mode Rush Version Téléphone
        </Text>

        <RNPickerSelect
            onValueChange={(value) => setSelectedFilter(value)}
            items={filterOptions}
            value={selectedFilter}
            placeholder={{ label: 'Choisissez un filtre...', value: null }}
            style={{
                inputIOS: styles.input, // iOS style
                inputAndroid: styles.input, // Android style
            }}
        />
        <View style={styles.actualOrder}>
            <OrderItem order={actualOrder}  onOrderClick={switchOrder}/>
            <Button
                title="Valider"
                color={Platform.OS === 'ios' ? '#19C319' : '#19C319'}
                style={styles.button}
                onPress={finishOrder}
           />
        </View>

            <Text style={styles.nbLeft}>
                Commande actuelle Numéro : {indiceOrder+1} / {orders.length}
            </Text>

    </View>);
};

const styles = {
    container:{
        height: '100%',
        margin:20,
        flex:1,
        flexDirection: 'column',
    } ,
    title:{
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 24
    },
    actualOrder: {
        backgroundColor: '#DEDEDE80',
        padding: 10,
        marginBottom: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '75%'
    },
    button: {
        borderRadius: 5,
        width: '80%',
        height: 50,
        marginTop: 10,
    },
    nbLeft: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 16,
    },
   

};
export default Telephone;
