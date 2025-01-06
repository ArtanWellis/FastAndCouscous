import React , {useState} from 'react';
import {View, Image, Text, Alert, Platform, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { Button  } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import OrderItem from './orders';
import OrderBlurred from "@/app/orderBlurred";

let initialOrders = [
  {
      id:351,
      items :[
      {
          name: "Cheese Burger",
          quantity: 2,
          category : "hot",
          type : "burger",
          Ingredients : ["-Fromage" , "+Bacon"]
      },
      {
          name: "Burger Bacon",
          quantity: 3,
      },{
            name: "Double Cheese Burger",
            quantity: 1,
            category : "hot",
              type : "burger",
            Ingredients: ["+Extra Cheese"]
      },
      {
        name: "Veggie Burger",
        quantity: 2,
          category : "hot",
          type : "burger",
        Ingredients: ["-Meat", "+Avocado"]
      },
      {
        name: "McFlurry Oreo",
        quantity: 1,
          category : "cold",
          type : "glace",
      },
      {
        name: "Fish Burger",
        quantity: 1,
          category : "hot",
          type : "burger",
        Ingredients: ["-Tartar Sauce"]
      },
      {
        name: "BBQ Burger",
        quantity: 2,
          category : "hot",
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
          category : "hot",
          type : "burger",
          Ingredients : ["+Fromage" , "-Bacon"]

      },
      {
          name: "Bacon Burger",
          quantity: 3,
          category : "hot",
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
          category : "hot",
          type : "burger",
          Ingredients : ["+Fromage" ,"+Tomates","-Oignons","-Bacon"]
      },
      {
          name: "Coca cola",
          quantity: 3,
          category : "cold",
          type : "boisson",
      },
      {
          name: "Cheese Burger",
          quantity: 3,
          category : "hot",
          type : "burger",
      },
      {
          name: "Moyenne frites",
          quantity: 5,
          category : "hot",
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
        category : "hot",
        type : "burger",
        Ingredients : ["+Fromage" ,"+Tomates","-Oignons","-Bacon"]
    },
    {
        name: "Nuggets x6",
        quantity: 3,
        category : "hot",
        type : "nugget",
    },
    {
        name: "Cheese Burger",
        quantity: 3,
        category : "hot",
        type : "burger",
    },
    {
        name: "Salade cesar",
        quantity: 5,
        category : "cold",
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
        category : "hot",
        type : "burger",
        Ingredients : ["+Fromage" ,"+Tomates","-Oignons","-Bacon"]
    },
    {
        name: "Bacon Burger",
        quantity: 3,
        category : "hot",
        type : "burger",
    },
    {
        name: "Cheese Burger",
        quantity: 3,
        category : "hot",
        type : "burger",
    },
    {
        name: "Double Meat Burger",
        quantity: 5,
        category : "hot",
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
        category : "hot",
        type : "burger",
        Ingredients : ["+Fromage" ,"+Tomates","-Oignons","-Bacon"]
    },
    {
        name: "Bacon Burger",
        quantity: 3,
        category : "hot",
        type : "burger",
    },
    {
        name: "Cheese Burger",
        quantity: 3,
        category : "hot",
        type : "burger",
    },
    {
        name: "Double Meat Burger",
        quantity: 5,
        category : "hot",
        type : "burger",
    },{
            name: "Veggie Burger",
            quantity: 2,
            category : "hot",
            type : "burger",
            Ingredients : ["+Fromage" ,"+Tomates","-Oignons","-Bacon"]
        },
        {
            name: "Bacon Burger",
            quantity: 3,
            category : "hot",
            type : "burger",
        },
        {
            name: "Cheese Burger",
            quantity: 3,
            category : "hot",
            type : "burger",
        },
        {
            name: "Double Meat Burger",
            quantity: 5,
            category : "hot",
            type : "burger",
        },{
            name: "Cheese Burger",
            quantity: 3,
            category : "hot",
            type : "burger",
        },
        {
            name: "Double Meat Burger",
            quantity: 5,
            category : "hot",
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
    const [filteredOrder, setFilteredOrder] = useState(orders[0]);
    const [nextFilteredOrder, setNextFilteredOrder] = useState(orders[1]);
    const [selectedFilter, setSelectedFilter] = useState('complet');

    const filterOptions = [
        { label: 'Complet', value: 'complet' },
        { label: 'Chaud', value: 'hot' },
        { label: 'Froid', value: 'cold' },
        { label: 'Burger', value: 'burger' },
        { label: 'Nuggets', value: 'nugget' },
        { label: 'Frites', value: 'frite' },
        { label: 'Salades', value: 'salade' },
        { label: 'Boissons', value: 'boisson' },
        { label: 'Glaces', value: 'glace' },
    ];



    const findNextOrderWithFilter = (currentIndex, filter, includeCurrentIndex = true) => {
        let index = includeCurrentIndex ? currentIndex : currentIndex + 1;
        let looped = false;

        while (true) {
            if (index >= orders.length) {
                if (looped) return null;
                index = 0;
                looped = true;
            }

            const order = orders[index];
            let filteredItems;

            if (filter === 'complet') {
                filteredItems = order.items;
            } else if (filter === 'hot' || filter === 'cold') {
                filteredItems = order.items.filter(item => item.category === filter);
            } else {
                filteredItems = order.items.filter(item => item.type === filter);
            }

            if (filteredItems.length > 0) {
                return {
                    order,
                    filteredItems,
                    index
                };
            }

            index++;
        }
    };

    const areOrdersEqual = (order1, order2) => {
        if (!order1 || !order2) return false;
        return order1.id === order2.id;
    };

    const applyFilter = (filter) => {
        const currentOrderResult = findNextOrderWithFilter(indiceOrder, filter, true);

        if (currentOrderResult) {
            const { order, filteredItems, index } = currentOrderResult;
            setActualOrder(order);
            setFilteredOrder({ ...order, items: filteredItems });
            setIndiceOrder(index);

            const nextOrderResult = findNextOrderWithFilter(index, filter, false);
            if (nextOrderResult && !areOrdersEqual(nextOrderResult.order, order)) {
                setNextFilteredOrder({ ...nextOrderResult.order, items: nextOrderResult.filteredItems });
            } else {
                setNextFilteredOrder(null);
            }
        } else {
            setActualOrder(null);
            setFilteredOrder(null);
            setNextFilteredOrder(null);
        }
    };

    const switchOrder = () => {
        const nextOrderResult = findNextOrderWithFilter(indiceOrder, selectedFilter, false);

        if (nextOrderResult) {
            const { order, filteredItems, index } = nextOrderResult;
            setIndiceOrder(index);
            setActualOrder(order);
            setFilteredOrder({ ...order, items: filteredItems });

            const nextNextOrder = findNextOrderWithFilter(index, selectedFilter, false);
            if (nextNextOrder && !areOrdersEqual(nextNextOrder.order, order)) {
                setNextFilteredOrder({ ...nextNextOrder.order, items: nextNextOrder.filteredItems });
            } else {
                setNextFilteredOrder(null);
            }
        } else {
            setActualOrder(null);
            setFilteredOrder(null);
            setNextFilteredOrder(null);
        }
    };
    React.useEffect(() => {
        applyFilter(selectedFilter);
    }, [selectedFilter]);

    const finishOrder = () => {
        Alert.alert(
            "Confirmer l'action",
            "Cette commande est-elle terminée ?",
            [
                {
                    text: "Annuler",
                    style: "cancel",
                },
                {
                    text: "Confirmer",
                    onPress: () => {

                        const updatedOrders = orders.filter((_, index) => index !== indiceOrder);
                        setOrders(updatedOrders);


                    },
                },
            ]
        );
    };
    React.useEffect(() =>{
        if (orders.length === 0) {
            setActualOrder(null);
            setFilteredOrder(null);
            setNextFilteredOrder(null);
        } else {
            // Ajuster l'indice si nécessaire
            const newIndice = indiceOrder >= orders.length ? 0 : indiceOrder;
            setIndiceOrder(newIndice);
            // Réappliquer le filtre pour mettre à jour l'affichage
            const currentOrderResult = findNextOrderWithFilter(newIndice, selectedFilter, true);

            if (currentOrderResult) {
                const { order, filteredItems, index } = currentOrderResult;
                setActualOrder(order);
                setFilteredOrder({ ...order, items: filteredItems });

                // Mettre à jour la prochaine commande filtrée
                const nextOrderResult = findNextOrderWithFilter(index, selectedFilter, false);
                if (nextOrderResult && !areOrdersEqual(nextOrderResult.order, order)) {
                    setNextFilteredOrder({ ...nextOrderResult.order, items: nextOrderResult.filteredItems });
                } else {
                    setNextFilteredOrder(null);
                }

            }
        }},[orders]);

    const validateFilteredItems = () => {
        Alert.alert(
            "Confirmer l'action",
            "Voulez-vous valider les éléments filtrés de cette commande ?",
            [
                {
                    text: "Annuler",
                    style: "cancel",
                },
                {
                    text: "Confirmer",
                    onPress: () => {
                        const updatedOrders = orders.map((order, index) => {
                            if (index === indiceOrder) {
                                const filteredItemNames = new Set(
                                    filteredOrder.items.map(item => item.name)
                                );
                                const remainingItems = order.items.filter(
                                    item => !filteredItemNames.has(item.name)
                                );
                                return {
                                    ...order,
                                    items: remainingItems
                                };
                            }
                            return order;
                        }).filter(order => order.items.length > 0);

                        setOrders(updatedOrders);

                    },
                },
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
                placeholder={{}}
                style={{
                    inputIOS: styles.input,
                    inputAndroid: styles.input,
                }}
            />
            <Text style={styles.nbLeft}>
                Commande actuelle N° {indiceOrder + 1} / {orders.length}
            </Text>
            <View style={styles.actualOrder}>
                {filteredOrder && filteredOrder.items.length > 0 ? (
                    <OrderItem order={filteredOrder} onOrderClick={function (){}}/>
                ) : (
                    <Text>Aucune commande ne correspond au filtre.</Text>
                )}
                {filteredOrder && filteredOrder.items.length > 0 ? (
                    <View>
                        <View style={styles.buttonSuiv}>
                            <TouchableOpacity
                                style={[styles.button2, { display: "flex", justifyContent: "center",backgroundColor: '#0080FF' }]}
                                onPress={switchOrder}
                            >
                                <Text style={{ color: 'white', textAlign: 'center',fontSize:20 }}>Suivant</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonDiv}>
                            <TouchableOpacity
                                style={[styles.button2, { display: "flex", justifyContent: "center",backgroundColor: '#FFB700' }]}
                                onPress={validateFilteredItems}
                            >
                                <Text style={{ color: 'white', textAlign: 'center',fontSize:20 }}>Valider aliments</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button2, { display: "flex", justifyContent: "center", backgroundColor: '#19C319' }]}
                                onPress={finishOrder}
                            >
                                <Text style={{ color: 'white', textAlign: 'center',fontSize:20}}>Valider commande</Text>
                            </TouchableOpacity>
                    </View>
                </View>):(<Text> </Text>)}
            </View>
            <View style={styles.centeredContainer}>
            {nextFilteredOrder && nextFilteredOrder.items.length > 0 ? (
                    <View style={{display:'flex'}}>
                <OrderBlurred  order={nextFilteredOrder} onOrderClick={function (){}}/>
                    </View>
            ) : (
                <Text>Aucune autre commande ne correspond au filtre.</Text>
            )}
            </View>
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
    buttonDiv:  {
        flexDirection : 'row',
       gap : 50
    },
    actualOrder: {
        backgroundColor: '#DEDEDE80',
        padding: 10,
        marginBottom: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '65%'
    },
    button2: {
        borderRadius: 5,
        width: '40%',
        height: 50,
        marginTop: 10,
        alignItems: 'center',

    },
    nbLeft: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 25,
    },

    buttonSuiv:{
        padding : 10,
        display: "flex",
        alignItems: "center",
},


};
export default Telephone;

