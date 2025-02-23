// CartContext.js - Context untuk manajemen keranjang dan transaksi

import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useState,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Membuat Context untuk Keranjang
const CartContext = createContext();

// Reducer untuk mengelola state keranjang
const cartReducer = (state, action) => {
  switch (action.type) {
    // 🛒 Menambahkan produk ke keranjang
    case "ADD_TO_CART":
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // Jika produk sudah ada, tambahkan jumlahnya
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Jika belum ada, tambahkan produk baru dengan quantity = 1
        return [...state, { ...action.payload, quantity: 1 }];
      }

    // 🔄 Mengupdate jumlah produk
    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + action.payload.amount),
            }
          : item
      );

    // ❌ Menghapus produk dari keranjang
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);

    // 🧹 Mengosongkan keranjang
    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

// Provider untuk memberikan akses Context ke seluruh aplikasi
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []); // State keranjang
  const [transactions, setTransactions] = useState([]); // State transaksi

  // 🔑 Load transaksi dari AsyncStorage saat aplikasi dimulai
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

  // 🔄 Simpan transaksi ke AsyncStorage setiap kali berubah
  useEffect(() => {
    const saveTransactions = async () => {
      try {
        await AsyncStorage.setItem(
          "transactions",
          JSON.stringify(transactions)
        );
      } catch (error) {
        console.error("Failed to save transactions:", error);
      }
    };
    saveTransactions();
  }, [transactions]);

  // 🟢 Hitung total item di keranjang (untuk badge)
  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  // 🚀 Menambah transaksi baru dan mengosongkan keranjang
  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
    dispatch({ type: "CLEAR_CART" });
  };

  // 🛒 Fungsi-fungsi Keranjang
  const addToCart = (product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });

  const updateQuantity = (id, amount) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, amount } });

  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  // ❌ Menghapus transaksi berdasarkan ID
  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(updatedTransactions);
  };

  // 🔑 Menyediakan nilai Context untuk digunakan di komponen lain
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

// Hook untuk menggunakan Context di komponen lain
export const useCart = () => useContext(CartContext);
