import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import OrderItem from '@/app/components/orderItem';
import axios from 'axios';
import config from '@/config';

const ip = config.serverIp;

const ColdPage = ({ route }) => {
  const [coldOrders, setColdOrders] = useState([]); // Récupération des commandes froides via les props de navigation
 
  useEffect(() => {
    const fetchColdOrders = async () => {
      try {
        const response = await axios.get('http://' + ip + ':3010/rush/validated');
        setColdOrders(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes froides :', error.message);
      }
    };
    fetchColdOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plats Froids et Boissons</Text>
      <ScrollView  contentContainerStyle={styles.ordersContainer}>
        {coldOrders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <OrderItem order={order} />
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
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  ordersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    elevation: 3,
  },
});

export default ColdPage;
