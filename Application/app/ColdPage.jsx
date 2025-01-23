import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import OrderItem from '@/app/components/orderItem';

const ColdPage = ({ route }) => {
    const { coldOrders } = route.params; // Récupération des commandes froides via les props de navigation
  


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
