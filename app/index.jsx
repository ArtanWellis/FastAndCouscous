import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Kitchen from './kitchen';
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
      <Text style={[
        styles.title, 
        isLandscape && styles.landscapeTitle
      ]}>
        Bienvenue sur votre application
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Aller à la Cuisine"
          onPress={() => navigation.navigate("Kitchen")}
          color={Platform.OS === 'ios' ? '#007AFF' : '#2196F3'}
        />
        <View style={{ marginVertical: 10 }} /> {/* Espacement ajouté */}
        <Button
          title="Aller au Comptoir"
          onPress={() => navigation.navigate("Comptoir")}
          color={Platform.OS === 'ios' ? '#007AFF' : '#2196F3'}
        />
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
    fontSize: 20,
    marginBottom: 0
  },
  button: {
    width: '80%',
    marginTop: 20
  },
  landscapeButton: {
    width: 'auto',
    marginTop: 20
  },
  buttonContainer: {
    alignItems: 'center', // Centre les boutons horizontalement
  },
  card: {
    backgroundColor: '#F5FCFF'
  }
});

export default App;