import React from 'react';
import {StyleSheet,View,Text,Image} from 'react-native';

const getImageSource = (type) => {
  switch (type) {
    case 'DineIn':
      return require('../assets/images/DineIn.png');
    case 'Delivery':
      return require('../assets/images/Delivery.png');
    default:
      return require('../assets/images/icon.png');
  }
};

const OrderItem = ({order}) => {
  if (!order) {
    return <Text>No order provided</Text>; // Gestion des cas où la prop est undefined
  }
  return (
    <View style={styles.OrderItem}>
        <Text style={styles.Id}>Commande #{order.id}</Text>
        <Text>Payée à {order.PayedHour}</Text>
        <Image
          source = {(getImageSource(order.Type))}
        />
        <Items items={order.items}/>  
    </View>
  );
}

const Items = ({ items }) =>{
    return (
      <View>
        {items.map((item) => (
          <View key={item.id}>
            <Text>{item.name}</Text>
            <Text>{item.quantity}</Text>
            <Ingredients ingredients = {item.Ingredients}/>
          </View>
        ))}
      </View>
    );
}

function Ingredients({ ingredients }) {
  console.log(ingredients);
  if(!ingredients){
    return;
  }
  return (
    <View style={styles.ingredients}>
      {ingredients.map((ingredient) => {
        let moreOrLess = ingredient.startsWith('+');
        return (
          <View
            style={[
              styles.ingredientItem
            ]}>
            <Text style ={[ styles.ingredient ,moreOrLess ? styles.positiveItem : styles.negativeItem ]}>{ingredient}</Text>
          </View>
        );
      })}
    </View>
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
    Id:{
      fontSize: 10,
      fontWeight: 'bold',
    },











    ingredient: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    ingredientItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    positiveItem: {
      color: 'red',
    },
    negativeItem: {
      color: 'green',
    }
  });
  
export default OrderItem;
export {Items,Ingredients};