import React from 'react';
import {StyleSheet,View,Text,Image,TouchableOpacity, ScrollView} from 'react-native';

const getImageSource = (type) => {
  switch (type) {
    case 'DineIn':
      return require('../assets/images/DineIn.png');
    case 'Delivery':
      return require('../assets/images/Delivery.png');
    case 'TakeAway':
      return require('../assets/images/TakeAway.png');
    default:
      return require('../assets/images/icon.png');
  }
};

const OrderItem = ({order , onOrderClick}) => {
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

const Items = ({ items }) =>{
    return (
      <View>
        {items.map((item) => (
          <View style={styles.Items} key={item.id}>            
            <Image
              style={{width: 25, height: 25}}
              source = {require('../assets/images/favicon.png')}
            />
            <Text style = {styles.Quantity}>{item.quantity}X</Text>
            <View style={styles.WrapperIngredient}>
              <Text style = {{fontSize:15}} >{item.name}</Text>
              <Ingredients ingredients = {item.Ingredients}/>
            </View>
          </View>

        ))}
      </View>
    );
}

function Ingredients({ ingredients }) {
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
    Items:{
      flexDirection: 'row', 
      justifyContent: 'space-around',
      borderBottomWidth: 1,
      borderBottomColor: '#E3E3E3', 
    },
    WrapperIngredient:{
        flex:0.5,
    },
    Quantity:{
      fontSize:22,
      fontWeight: 'bold',
    },
    ingredient: {
      fontWeight: 'bold',
      
    },
    ingredientItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    positiveItem: {
      color: 'green',
    },
    negativeItem: {
      color: 'red',
    }
  });
  
export default OrderItem;
export {Items,Ingredients};