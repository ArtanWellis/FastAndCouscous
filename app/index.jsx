import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Kitchen from './kitchen';
import Telephone from "./telephone";

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
      <Button
        title="Aller à la Cuisine"
        onPress={() => navigation.navigate("Kitchen")}
        color={Platform.OS === 'ios' ? '#007AFF' : '#2196F3'}
        style={[
          styles.button,
          isLandscape && styles.landscapeButton
        ]}
      />
      <Button
          title="Adaptation pour téléphone"
          onPress={() => navigation.navigate("Telephone")}
          color={Platform.OS === 'ios' ? '#007AFF' : '#2196F3'}
          style={[
            styles.button,
            isLandscape && styles.landscapeButton
          ]}
      />
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
    marginTop: 20,
    marginBottom: 20
  },

  landscapeButton: {
    width: 'auto',
    marginTop: 0
  },
  card: {
    backgroundColor: '#F5FCFF'
  }
});

export default App;