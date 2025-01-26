import {Button} from "react-native-elements";
import {Image, StyleSheet} from "react-native";
import React from "react";



export const RetrieveButton = ({ retrieveFunction, text }) => {
    return (
        <Button
            onPress={retrieveFunction}
            buttonStyle={[styles.Button, { backgroundColor: '#FF8181' }]}
            title={text}
            titleStyle={styles.titleStyle}
        />
    );
};

const styles = StyleSheet.create({
    Button: {
        borderRadius: 5,
        width: '100%',
        height: '100%',
    },

    titleStyle: {
        color: 'white',
        fontSize: 17,

    }
});
