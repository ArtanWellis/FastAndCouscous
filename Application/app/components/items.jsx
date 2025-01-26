import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Ingredients from './ingredients';

const imageMap = {
    "bacon-burger": require('../../assets/images/burger bacon.png'),
    "cheese-burger": require('../../assets/images/cheese burger.png'),
    "moyenne-frites": require('../../assets/images/moyenne frite.png'),
    "veggie-burger": require('../../assets/images/veggie burger.png'),
    "jus-d'orange": require('../../assets/images/jus d\'orange.png'),
    "double-cheese-burger": require('../../assets/images/double cheese burger.png'),
    "coca-cola": require('../../assets/images/coca cola.png'),
    "fish-burger": require('../../assets/images/fish burger.png'),
    "bbq-burger": require('../../assets/images/bbq burger.png'),
    "mcflurry-oreo": require('../../assets/images/mcfluzzy oreo.png'),
    "salade-cesar": require('../../assets/images/salade cesar.png'),
    "nuggets-x6": require('../../assets/images/nuggets x6.png'),
    "double-meat-burger": require('../../assets/images/double meat burger.png'),
    "chicken-burger": require('../../assets/images/chicken burger.png'),
    "burger-bacon": require('../../assets/images/burger bacon.png'),
};

const Items = ({ items, type }) => {
    const filteredItems = items.filter(item => {
        if (type === "complet") {
            return true;
        }
        if (type === "HOT_DISH" || type === "COLD_DISH") {
            return item.category === type;
        }
        return item.type === type;
    });

    return (
        <View>
            {filteredItems.map((item) => (
                <View style={styles.items} key={item.id}>
                    <Image
                        style={{ width: 25, height: 25, resizeMode: 'contain' }}
                        source={imageMap[item.name.toLowerCase()] || require('../../assets/images/adaptive-icon.png')}
                    />
                    <Text style={styles.Quantity}>{item.quantity}X</Text>
                    <View style={styles.WrapperIngredient}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                        <Ingredients ingredients={item.Ingredients} />
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    items: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#E3E3E3',
    },
    WrapperIngredient: {
        flex: 0.5,
    },
    Quantity: {
        fontSize: 22,
    },
});

export default Items;
