import React from "react";
import { CartProvider } from "./src/context/CartContext";
import AppNavigator from "./src/AppNavigator";

export default function App() {
  return (
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
}
