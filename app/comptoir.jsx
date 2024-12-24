import React  ,{ useState } from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity  } from 'react-native';
import OrderItem from './orders';

const initialOrders = [
  {
    id: 351,
    items: [
      { name: "Cheese Burger", quantity: 2 },
      { name: "French Fries", quantity: 1 },
      { name: "Coca Cola", quantity: 1 },
    ],
    PayedHour: "18h38",
    Type: "DineIn"
  },
  {
    id: 352,
    items: [
      { name: "Chicken Nuggets", quantity: 1 },
      { name: "Salad", quantity: 1 },
      { name: "Orange Juice", quantity: 1 },
    ],
    PayedHour: "18h48",
    Type: "DineIn"
  },
];

const Comptoir = () => {
    const [orders, setOrders] = useState(initialOrders);

  const handleValidate = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comptoir</Text>
      <ScrollView contentContainerStyle={styles.ordersContainer}>
        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <OrderItem order={order} />
            <TouchableOpacity
              style={styles.validateButton}
              onPress={() => handleValidate(order.id)}
            >
              <Text style={styles.validateButtonText}>Valider</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5FCFF'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  scrollContainer: {
    flex: 1
  },
  ordersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permet d'afficher plusieurs commandes sur la même ligne
    justifyContent: 'space-between',
  },
  orderCard: {
    width: '48%', 
    marginBottom: 15,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  validateButton: {
    backgroundColor: '#19C319',
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  validateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Comptoir;
