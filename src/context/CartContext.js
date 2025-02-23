// CartContext.js
import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useState,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }

    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + action.payload.amount),
            }
          : item
      );

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [transactions, setTransactions] = useState([]);

  // 🔑 Ambil Transaksi dari AsyncStorage saat aplikasi dimulai
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const storedTransactions = await AsyncStorage.getItem("transactions");
        if (storedTransactions) {
          setTransactions(JSON.parse(storedTransactions)); // 🚀 Load data transaksi
        }
      } catch (error) {
        console.error("Failed to load transactions:", error);
      }
    };
    loadTransactions();
  }, []);

  // 🔄 Simpan Transaksi ke AsyncStorage setiap kali berubah
  useEffect(() => {
    const saveTransactions = async () => {
      try {
        await AsyncStorage.setItem(
          "transactions",
          JSON.stringify(transactions)
        ); // 🚀 Simpan transaksi
      } catch (error) {
        console.error("Failed to save transactions:", error);
      }
    };
    saveTransactions();
  }, [transactions]);

  // 🔑 Hitung Badge Keranjang
  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  // 🚀 Tambah Transaksi
  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
    dispatch({ type: "CLEAR_CART" }); // Kosongkan keranjang setelah payment
    // console.log("Transaction Added:", transaction);
  };

  // Fungsi Keranjang
  const addToCart = (product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });
  const updateQuantity = (id, amount) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, amount } });
  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  // 🚀 Hapus Transaksi
  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(updatedTransactions);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        transactions,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
