import React  ,{ useState } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Button} from 'react-native';
import CookEmplacement from "@/app/tableTactile/cookEmplacement";

//mock

const Table = () =>{

    return(<View>
        <View style={styles.cookUp}>
            <View style={{maxWidth:"50%"}} >
           <CookEmplacement/>
            </View>
        <View style={{maxWidth:"50%"}}>
            <CookEmplacement/>
        </View>

    </View>
    <View style={styles.cookDown}>
        <View >
            <CookEmplacement/>
        </View>
        <View >
            <CookEmplacement/>
        </View>

    </View>
    </View>);
};

const styles = StyleSheet.create({
    cookUp:{
        flexDirection:"row",
        transform: [{ rotate: '180deg' }],
        width:'100%',
        justifyContent:"space-between",
    },
    cookDown:{
        flexDirection:"row",
        width:'100%',
        justifyContent:"space-between",
    },
});
export default Table;