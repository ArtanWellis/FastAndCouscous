import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Button, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Kitchen from './kitchen';

import Telephone from "./telephone";

import Comptoir from './comptoir';
import ColdPage from './ColdPage';


const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: styles.card
        }}
      >
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Kitchen" component={Kitchen} options={{ title: 'Cuisine' }} />

        <Stack.Screen name="Telephone" component={Telephone} options={{ title: 'Telephone' }} />

        <Stack.Screen name="Comptoir" component={Comptoir} options={{ title: 'Comptoir' }} />
        <Stack.Screen name="ColdScreen" component={ColdPage} />

    </Stack.Navigator>
  );
};

const Index = ({ navigation }) => {
  const { width, height } = Dimensions.get('window');
  const isLandscape = width > height;

  return (
    <View style={[
      styles.container,
      isLandscape && styles.landscapeContainer
    ]}>
      <Image 
        source={require('../assets/images/logoo.png')} 
        style={styles.logo} 
        resizeMode="contain" 
      />
      <Text style={[
        styles.title,
        isLandscape && styles.landscapeTitle
      ]}>
        Bienvenue sur Fast and Couscous
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Kitchen")}
        >
          <Text style={styles.buttonText}>Aller à la Cuisine</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Comptoir")}
        >
          <Text style={styles.buttonText}>Aller au Comptoir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Telephone")}
        >
          <Text style={styles.buttonText}>Adaptation pour téléphone</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5FCFF'
  },
  landscapeContainer: {
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  landscapeTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Platform.OS === 'ios' ? '#007AFF' : '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default App;