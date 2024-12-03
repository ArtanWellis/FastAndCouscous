import React from 'react';
import { View , Text} from 'react-native';

import OrderItem from './orders';

const orders = [
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
      }],
      PayedHour: "18h38",
      Type : "Sur Place"
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
      Type : "Sur Place"
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
      Type : "A emporter"
  },
];

const Kitchen=()=> {
    const firstOrder = orders[0];   
  return (
    <View>
        <OrderItem order={firstOrder} />
    </View>
  );
};

export default Kitchen;
