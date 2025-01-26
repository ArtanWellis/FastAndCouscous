import {Button} from "react-native-elements";
import {Image, StyleSheet} from "react-native";
import React from "react";



export const NoviceButton = ({ isNoviceMode, setIsNoviceMode,setHiddenRecipes }) => {
    const toggleNoviceMode = () => {
        setIsNoviceMode(!isNoviceMode);
        setHiddenRecipes(new Set());
    };
    return (
        <Button
            onPress={toggleNoviceMode}
            buttonStyle={[
                styles.Button,
                { backgroundColor: isNoviceMode ? '#19C319' : '#FF0F00' },
            ]}
            titleStyle={[styles.titleStyle, { fontSize: 17 }]}
            title="Mode novice : "
            icon={
                <Image
                    source={
                        isNoviceMode
                            ? require('../../../assets/images/unlock.png')
                            : require('../../../assets/images/lock.png')
                    }
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                />
            }
            iconRight
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
