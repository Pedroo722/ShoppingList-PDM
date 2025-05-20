import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Provider as PaperProvider } from 'react-native-paper';

import Pantry from './src/screens/Pantry';
import ShoppingList from './src/screens/ShoppingList';
import Purchase from './src/screens/Purchase';
import { ProductProvider } from './src/context/ProductContext';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <PaperProvider>
      <ProductProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: React.ComponentProps<typeof Ionicons>['name'];

                if (route.name === 'Pantry') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Shopping List') {
                  iconName = focused ? 'cart' : 'cart-outline';
                } else {
                  iconName = focused ? 'list' : 'list-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Dispensa" component={Pantry} />
            <Tab.Screen name="Lista de Compras" component={ShoppingList} />
            <Tab.Screen name="Compras" component={Purchase} />
          </Tab.Navigator>
        </NavigationContainer>
      </ProductProvider>
    </PaperProvider>
  );
};

export default App;