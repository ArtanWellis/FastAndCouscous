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
          temperature : "chaud",
          type : "burger",
          Ingredients : ["-Fromage" , "+Bacon"]
      },
      {
          name: "Burger Bacon",
          quantity: 3,
      },{
            name: "Double Cheese Burger",
            quantity: 1,
            temperature : "chaud",
              type : "burger",
            Ingredients: ["+Extra Cheese"]
      },
      {
        name: "Veggie Burger",
        quantity: 2,
          temperature : "chaud",
          type : "burger",
        Ingredients: ["-Meat", "+Avocado"]
      },
      {
        name: "McFlurry Oreo",
        quantity: 1,
          temperature : "froid",
          type : "glace",
      },
      {
        name: "Fish Burger",
        quantity: 1,
          temperature : "chaud",
          type : "burger",
        Ingredients: ["-Tartar Sauce"]
      },
      {
        name: "BBQ Burger",
        quantity: 2,
          temperature : "chaud",
          type : "burger",
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
          temperature : "chaud",
          type : "burger",
          Ingredients : ["+Fromage" , "-Bacon"]

      },
      {
          name: "Bacon Burger",
          quantity: 3,
          temperature : "chaud",
          type : "burger",
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
          temperature : "chaud",
          type : "burger",
          Ingredients : ["+Fromage" ,"+Tomates","-Oignons","-Bacon"]
      },
      {
          name: "Coca cola",
          quantity: 3,
          temperature : "froid",
          type : "boisson",
      },
      {
          name: "Cheese Burger",
          quantity: 3,
          temperature : "chaud",
          type : "burger",
      },
      {
          name: "Moyenne frites",
          quantity: 5,
          temperature : "chaud",
          type : "frite",
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
        temperature : "chaud",
        type : "burger",
        Ingredients : ["+Fromage" ,"+Tomates","-Oignons","-Bacon"]
    },
    {
        name: "Nuggets x6",
        quantity: 3,
        temperature : "chaud",
        type : "nugget",
    },
    {
        name: "Cheese Burger",
        quantity: 3,
        temperature : "chaud",
        type : "burger",
    },
    {
        name: "Salade cesar",
        quantity: 5,
        temperature : "froid",
        type : "salade",
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
        temperature : "chaud",
        type : "burger",
        Ingredients : ["+Fromage" ,"+Tomates","-Oignons","-Bacon"]
    },
    {
        name: "Bacon Burger",
        quantity: 3,
        temperature : "chaud",
        type : "burger",
    },
    {
        name: "Cheese Burger",
        quantity: 3,
        temperature : "chaud",
        type : "burger",
    },
    {
        name: "Double Meat Burger",
        quantity: 5,
        temperature : "chaud",
        type : "burger",
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
        temperature : "chaud",
        type : "burger",
        Ingredients : ["+Fromage" ,"+Tomates","-Oignons","-Bacon"]
    },
    {
        name: "Bacon Burger",
        quantity: 3,
        temperature : "chaud",
        type : "burger",
    },
    {
        name: "Cheese Burger",
        quantity: 3,
        temperature : "chaud",
        type : "burger",
    },
    {
        name: "Double Meat Burger",
        quantity: 5,
        temperature : "chaud",
        type : "burger",
    }],
    PayedHour: "19h08",
    Type : "Delivery"
},
];

const Telephone = () => {
    const [orders, setOrders] = useState(initialOrders);
    const [indiceOrder, setIndiceOrder] = useState(0);
    const [actualOrder, setActualOrder] = useState(orders[0]);
    const [filteredOrder, setFilteredOrder] = useState(orders[0]); // Nouvelle variable pour l'ordre filtré
    const [selectedFilter, setSelectedFilter] = useState('complet');

    const filterOptions = [
        { label: 'Complet', value: 'complet' },
        { label: 'Chaud', value: 'chaud' },
        { label: 'Froid', value: 'froid' },
        { label: 'Burger', value: 'burger' },
        { label: 'Nuggets', value: 'nugget' },
        { label: 'Frites', value: 'frite' },
        { label: 'Salades', value: 'salade' },
        { label: 'Boissons', value: 'boisson' },
        { label: 'Glaces', value: 'glace' },
    ];

    const applyFilter = (filter) => {
        const findNextOrderWithItems = (startIndex) => {
            let index = startIndex;
            let looped = false;

            while (true) {
                const order = orders[index];
                let filteredItems;

                if (filter === 'complet') {
                    filteredItems = order.items; // Pas de filtre
                } else if (filter === 'chaud' || filter === 'froid') {
                    filteredItems = order.items.filter(item => item.temperature === filter); // Filtrer par température
                } else {
                    filteredItems = order.items.filter(item => item.type === filter); // Filtrer par type
                }

                if (filteredItems.length > 0) {
                    return { order, filteredItems };
                }

                index = (index + 1) % orders.length;
                if (index === startIndex) {
                    if (looped) break;
                    looped = true;
                }
            }

            return null;
        };

        const result = findNextOrderWithItems(indiceOrder);

        if (result) {
            const { order, filteredItems } = result;
            setActualOrder(order);
            setFilteredOrder({ ...order, items: filteredItems });
            setIndiceOrder(orders.indexOf(order));
        } else {
            setActualOrder(null);
            setFilteredOrder(null);
        }
    };

    const switchOrder = () => {
        let newIndice = indiceOrder + 1;
        if (newIndice >= orders.length) {
            newIndice = 0;
        }
        setIndiceOrder(newIndice);
        setActualOrder(orders[newIndice]);
        setFilteredOrder(orders[newIndice]); // Réinitialiser au changement de commande
    };

    // Appeler `applyFilter` à chaque changement de filtre
    React.useEffect(() => {
        applyFilter(selectedFilter);
    }, [selectedFilter, actualOrder]);

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
                            setFilteredOrder(updatedOrders[0]); // Réinitialiser la commande filtrée
                        } else {
                            setActualOrder(null);
                            setFilteredOrder(null);
                        }
                    }
                }
            ]
        );
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
                style={{
                    inputIOS: styles.input, // iOS style
                    inputAndroid: styles.input, // Android style
                }}
            />
            <View style={styles.actualOrder}>
                {filteredOrder && filteredOrder.items.length > 0 ? (
                    <OrderItem order={filteredOrder} onOrderClick={switchOrder} />
                ) : (
                    <Text>Aucune commande ne correspond au filtre.</Text>
                )}
                <Button
                    title="Valider"
                    color={Platform.OS === 'ios' ? '#19C319' : '#19C319'}
                    style={styles.button}
                    onPress={finishOrder}
                />
            </View>

            <Text style={styles.nbLeft}>
                Commande actuelle Numéro : {indiceOrder + 1} / {orders.length}
            </Text>
        </View>
    );
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
