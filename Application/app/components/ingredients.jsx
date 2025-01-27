import React from 'react';
import {StyleSheet,View,Text} from 'react-native';

function Ingredients({ ingredients }) {
  if(!ingredients){
    return;
  }
  return (
    <View style={styles.ingredient} >
      {ingredients.map((ingredient,key) => {
        let moreOrLess = ingredient.startsWith('+');
        return (
          <View
            style={[
              styles.ingredientItem
            ]}
            key ={ingredient.name}>
            <Text style ={[ styles.ingredient ,moreOrLess ? styles.positiveItem : styles.negativeItem ]}>{ingredient}</Text>
          </View>
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
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
  
export default Ingredients;