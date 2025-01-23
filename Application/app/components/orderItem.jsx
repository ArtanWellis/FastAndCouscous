import React from 'react';
import {StyleSheet,View,Text,Image,TouchableOpacity, ScrollView} from 'react-native';
import Type from '../models/Type.js';
import Items  from './items.jsx';

const OrderItem = ({order , onOrderClick}) => {

    const getImageSource = (type) => {
        switch (type) {
          case Type.DINE_IN:
            return require('../../assets/images/DineIn.png');
          case Type.TAKE_AWAY:
            return require('../../assets/images/Delivery.png');
          case Type.DELIVERY:
            return require('../../assets/images/TakeAway.png');
          default:
            return require('../../assets/images/icon.png');
        }
    };        
    if (!order) {
      return <Text>No order provided</Text>; // Gestion des cas où la prop est undefined
    }
    return (
      <ScrollView style={styles.OrderItem}>
        <TouchableOpacity onPress={() => onOrderClick ? onOrderClick(order) : onOrderClick(null)}>
  
          <View style={styles.upOrder}>
            <Text style={[styles.textOrder]}>Commande #{order.id}</Text>
            <Text style={[styles.textOrder ,{ color : "#797B7E"}]}>Payée à {order.PayedHour}</Text>
            <Image 
              style={{width: 25, height: 25}}
              source = {(getImageSource(order.Type))}
            />
          </View>
          <View style={styles.bottomOrder}>
            <Items items={order.items}/>  
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }

const styles = StyleSheet.create({
    OrderItem:{
        backgroundColor: '#FFFEEB', 
        marginBottom:20,
        borderRadius: 10,
        width:'100%',
        height:'100%',
      },
      upOrder:{
        flex:0.05,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding:10,
        borderBottomWidth: 1,
        borderBottomColor: '#B0B0B0', 
      },
      textOrder:{
        flex:0.49, 
        fontSize: 10,
        fontWeight: 'bold',
      },
      bottomOrder:{
        flex:0.95,
        padding:10,
      },
});


export default OrderItem;