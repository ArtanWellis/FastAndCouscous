import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";

export const RenderRecipe = ({ item, hiddenRecipes, setHiddenRecipes} ) => {
    const burgerRecipes = {
        "Cheese Burger": ["Pain sésame haut", "Salade", "Tomate", "Oignon", "Cornichon", "Cheddar", "Steak haché", "Ketchup", "Moutarde", "Pain sésame bas", "Temps cuisson steak : 5min"],
        "Bacon Burger": ["Pain sésame haut", "Salade", "Tomate", "Oignon", "Cornichon", "Bacon", "Cheddar", "Steak haché", "Ketchup", "Moutarde", "Pain sésame bas", "Temps cuisson steak : 5min"],
        "Double Cheese Burger": ["Pain sésame haut", "Salade", "Tomate", "Oignon", "Cornichon", "Cheddar", "Steak haché", "Cheddar", "Steak haché", "Ketchup", "Moutarde", "Pain sésame bas", "Temps cuisson steak : 5min"],
        "Veggie Burger": ["Pain sésame haut", "Salade", "Tomate", "Oignon", "Cornichon", "Cheddar", "Steak veggie", "Ketchup", "Moutarde", "Pain sésame bas", "Temps cuisson steak : 7min"],
        "Chicken Burger": ["Pain sésame haut", "Salade", "Tomate", "Oignon", "Cornichon", "Cheddar", "Poulet pané", "Ketchup", "Moutarde", "Pain sésame bas", "Temps cuisson poulet : 8min"],
        "Fish Burger": ["Pain sésame haut", "Salade", "Tomate", "Oignon", "Cornichon", "Cheddar", "Poisson pané", "Tartare sauce", "Pain sésame bas", "Temps cuisson poisson : 6min"],
        "BBQ Burger": ["Pain sésame haut", "Salade", "Tomate", "Onion rings", "Cornichon", "Cheddar", "Steak haché", "BBQ Sauce", "Pain sésame bas", "Temps cuisson steak : 5min"],
    };

    const ingredientIcons = {
        "Ketchup": require('../../assets/images/ketchup.png'),
        "Moutarde": require('../../assets/images/moutarde.png'),
        "Salade": require('../../assets/images/salade.png'),
        "Tomate": require('../../assets/images/tomate.png'),
        "Oignon": require('../../assets/images/onion.png'),
        "Cornichon": require('../../assets/images/cornichon.png'),
        "Cheddar": require('../../assets/images/cheese.png'),
        "Steak haché": require('../../assets/images/steak.png'),
        "Pain sésame haut": require('../../assets/images/pain-haut.png'),
        "Pain sésame bas": require('../../assets/images/pain-bas.png'),
        "Bacon": require('../../assets/images/bacon.png'),
        "Steak veggie": require('../../assets/images/veggie.png'),
        "Poulet pané": require('../../assets/images/chicken.png'),
        "Poisson pané": require('../../assets/images/fish.png'),
        "Tartare sauce": require('../../assets/images/tartare.png'),
        "BBQ Sauce": require('../../assets/images/BBQ.png'),
        "Onion rings": require('../../assets/images/onion-rings.png'),
        "Avocado": require('../../assets/images/avocat.png'),
        "Spicy Sauce": require('../../assets/images/spicy.png'),
    };
    const handleCloseRecipe = () => {
        setHiddenRecipes(prev => {
            const newHidden = new Set(prev);
            newHidden.add(item);
            return newHidden;
        });
    };
    return(
        <View>
            {!hiddenRecipes.has(item) && (
                <View style={styles.recipeBox}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => handleCloseRecipe()}
                    >
                        <Image
                            source={require('../../assets/images/close.png')}
                            style={{ width: 20, height: 20 }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Text style={styles.recipeItem}>{item.name}:</Text>
                    {burgerRecipes[item.name]?.map((ingredient, index) => (
                        <View key={index} style={styles.ingredientRow}>
                            {ingredientIcons[ingredient] && (
                                <Image
                                    source={ingredientIcons[ingredient]}
                                    style={styles.ingredientIcon}
                                    resizeMode="contain"
                                />
                            )}
                            <Text style={styles.recipeIngredient}>{ingredient}</Text>
                        </View>
                    ))}
                    {item.Ingredients?.map((customIngredient, index) => (
                        <View key={index} style={styles.ingredientRow}>
                            {ingredientIcons[customIngredient.replace(/[+-]/, '')] && (
                                <Image
                                    source={ingredientIcons[customIngredient.replace(/[+-]/, '')]}
                                    style={styles.ingredientIcon}
                                    resizeMode="contain"
                                />
                            )}
                            <Text
                                style={[
                                    styles.recipeIngredient,
                                    customIngredient.startsWith('+') ? styles.ingredientAdd : styles.ingredientRemove
                                ]}
                            >
                                {customIngredient}
                            </Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    recipeItem: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5,
    },
    recipeIngredient: {
        fontSize: 14,
        marginLeft: 10,
    },
    recipeScroll: {
        maxHeight: 550,
        paddingRight: 5,
    },
    recipeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    recipeBox: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    ingredientAdd: {
        color: 'green',
        fontWeight: 'bold',
    },
    ingredientRemove: {
        color: 'red',
        fontWeight: 'bold',
    },
    ingredientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    ingredientIcon: {
        width: 28,
        height: 28,
        marginRight: 5,
    },
    closeButton: { position: 'absolute', top: 2, right: 5, zIndex: 1 },
    closeIcon: { width: 400, height: 40 },
});