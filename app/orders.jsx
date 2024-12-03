import React from 'react';
import {StyleSheet,View,Text} from 'react-native';

const OrderItem = ({order}) => {
  print(order.items);
  if (!order) {
    return <Text>No order provided</Text>; // Gestion des cas où la prop est undefined
  }
  return (
    <View>
        <Text >{order.id}</Text>
        <Text>{order.PayedHour}</Text>
        <Text>{order.Type}</Text>
        <Items items={order.items} />  
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