import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";

export const renderRecipeRows = (orderIndex, items, hiddenRecipes, handleCloseRecipe, burgerRecipes, ingredientIcons) => {
    const rows = [];
    if (items == null) return rows;

    for (let i = 0; i < items.length; i += 2) {
        const recipe1Id = `${orderIndex}-${i}`;
        const recipe2Id = `${orderIndex}-${i + 1}`;

        if (!hiddenRecipes.has(recipe1Id) || (items[i + 1] && !hiddenRecipes.has(recipe2Id))) {
            rows.push(
                <View style={styles.recipeRow} key={i}>
                    {!hiddenRecipes.has(recipe1Id) && (
                        <View style={styles.recipeBox}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => handleCloseRecipe(orderIndex, i)}
                            >
                                <Image
                                    source={require('../assets/images/close.png')}
                                    style={{ width: 20, height: 20 }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <Text style={styles.recipeItem}>{items[i].name}:</Text>
                            {burgerRecipes[items[i].name]?.map((ingredient, index) => (
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
                            {items[i].Ingredients?.map((customIngredient, index) => (
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

                    {items[i + 1] && !hiddenRecipes.has(recipe2Id) && (
                        <View style={styles.recipeBox}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => handleCloseRecipe(orderIndex, i + 1)}
                            >
                                <Image
                                    source={require('../assets/images/close.png')}
                                    style={{ width: 20, height: 20 }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <Text style={styles.recipeItem}>{items[i + 1].name}:</Text>
                            {burgerRecipes[items[i + 1].name]?.map((ingredient, index) => (
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
                            {items[i + 1].Ingredients?.map((customIngredient, index) => (
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
        }
    }

    return rows;
};


const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        flexDirection: 'row',
    },
    InProgress: {
        flex: 0.35,

        flexDirection: 'column',
        marginRight: 40,
    },

    Waiting: {
        flex: 0.7,
        flexDirection: 'column',
    },
    ButtonDiv: {
        flex: 0.08,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    Button: {
        borderRadius: 5,
        width: '100%',
        height: '100%',
    },

    titleStyle: {
        color: 'white',
        fontSize: 17,

    },
    ButtonWrapper: {
        flex: 0.45,
    },
    firstOrder: {
        flex: 0.92,
        flexDirection: 'column',
        borderRadius: 10,
        backgroundColor: '#F0CA81',
        padding: 10,
    },
    TextWrapper: {
        flex: 0.05,
        justifyContent: 'center',
        marginBottom: 10,
    },
    Text: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    OrderItemFull: { flex: 0.95 },
    OrderItemPartial: { flex: 0.4 },
    BottomButton: {
        flex: 0.1,
        justifyContent: 'flex-end',
        marginTop: 'auto',
    },
    OrdersWrapper: {
        flex: 0.95,
    },
    nbLeft: {
        flex: 0.03,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    orderAndRecipe: {
        flexDirection: 'row',
        flex: 1,
    },
    recipeContainer: {
        flex: 0.6,
        padding: 10,
        marginLeft: 10,
        borderRadius: 10,
        backgroundColor: '#FFF8DC',
        marginBottom: 10,
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
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
        flex: 0.48,
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
    closeButton: { position: 'absolute', top: 5, right: 5, zIndex: 1 },
    closeIcon: { width: 400, height: 40 },
});