import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import TransactionList from "./screens/TransactionList";
import TransactionDetail from "./screens/TransactionDetail";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "./context/CartContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TransactionStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="TransactionList" component={TransactionList} />
    <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { cartCount } = useCart(); // 👈 Ambil cartCount untuk badge

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Products") iconName = "pricetag-outline";
            else if (route.name === "Cart") iconName = "cart-outline";
            else if (route.name === "Transactions")
              iconName = "receipt-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007bff",
          tabBarInactiveTintColor: "gray",
        })}
      >
        {/* Tab Produk */}
        <Tab.Screen name="Products" component={ProductScreen} />

        {/* Tab Keranjang dengan Badge */}
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarBadge: cartCount > 0 ? cartCount : null,
            tabBarBadgeStyle: { backgroundColor: "red", color: "white" },
          }}
        />

        {/* Tab Transaksi */}
        <Tab.Screen name="Transactions" component={TransactionStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
