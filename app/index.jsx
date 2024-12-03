import { Button, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';

import Kitchen from './kitchen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Index" component={Index} />
      <Stack.Screen name="Kitchen" component={Kitchen} />
    </Stack.Navigator>
  );
};


function Index({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Go to Kitchen" onPress={() => navigation.navigate("Kitchen")} />
    </View>
  );
}

export default App;
