import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";

const CartScreen = () => {
  const { cart, clearCart, addTransaction, updateQuantity, removeFromCart } =
    useCart();

  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [change, setChange] = useState(0);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Menampilkan Alert Modern
  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertModalVisible(true);
  };

  const handlePayment = () => {
    const payment = parseFloat(paymentAmount);
    if (isNaN(payment) || payment < totalPrice) {
      showAlert("Jumlah pembayaran tidak cukup atau tidak valid!");
      return;
    }

    const kembalian = payment - totalPrice;
    setChange(kembalian);

    const transaction = {
      id: Date.now(),
      items: cart,
      total: totalPrice,
      paymentAmount: payment,
      change: kembalian,
    };

    addTransaction(transaction);
    clearCart();
    setPaymentModalVisible(false);
    showAlert(`Pembayaran berhasil! Kembalian Anda: Rp${kembalian.toFixed(2)}`);
    setPaymentAmount("");
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <TouchableOpacity
        style={styles.deleteIcon}
        onPress={() => removeFromCart(item.id)}
      >
        <Ionicons name="close-sharp" size={22} color="red" />
      </TouchableOpacity>

      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>
          Rp{item.price} x {item.quantity}
        </Text>
        <Text style={styles.itemTotal}>
          Total: Rp{(item.price * item.quantity).toFixed(2)}
        </Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, -1)}
          >
            <Ionicons name="remove-circle" size={24} color="red" />
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, 1)}
          >
            <Ionicons name="add-circle" size={24} color="green" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 Keranjang Belanja</Text>

      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />

          <View style={styles.footer}>
            <Text style={styles.totalText}>
              Total: Rp{totalPrice.toFixed(2)}
            </Text>
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={() => setPaymentModalVisible(true)}
            >
              <Text style={styles.buttonText}>Lanjutkan Pembayaran</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.emptyText}>Keranjang Anda kosong! 🛒</Text>
      )}

      {/* Modal Pembayaran */}
      <Modal
        visible={paymentModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>💰 Pembayaran</Text>
              <TouchableOpacity onPress={() => setPaymentModalVisible(false)}>
                <Ionicons name="close" size={24} color="red" />
              </TouchableOpacity>
            </View>

            <Text style={styles.totalText}>
              Total Belanja: Rp{totalPrice.toFixed(2)}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Masukkan jumlah pembayaran"
              keyboardType="numeric"
              value={paymentAmount}
              onChangeText={(value) =>
                setPaymentAmount(value.replace(/[^0-9.]/g, ""))
              }
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.paymentButton}
                onPress={handlePayment}
              >
                <Text style={styles.buttonText}>Bayar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setPaymentModalVisible(false)}
              >
                <Text style={styles.cancelText}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Alert  */}
      <Modal
        visible={alertModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setAlertModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.alertContainer}>
            <Ionicons name="information-circle" size={50} color="#007bff" />
            <Text style={styles.alertText}>{alertMessage}</Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setAlertModalVisible(false)}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8", padding: 10 },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#007bff",
  },
  itemCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginVertical: 5,
    alignItems: "center",
    elevation: 3,
    position: "relative",
  },
  deleteIcon: { position: "absolute", top: 5, right: 5 },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  itemPrice: { fontSize: 14, color: "#555", marginTop: 5 },
  itemTotal: { fontSize: 14, color: "#007bff", fontWeight: "bold" },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: { marginHorizontal: 5 },
  quantityText: { fontSize: 16, fontWeight: "bold" },

  footer: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  paymentButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
    marginTop: 20,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "90%",
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: { fontSize: 22, fontWeight: "bold", color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelText: { color: "#fff", fontWeight: "bold" },

  // Alert
  alertContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    width: "85%",
    elevation: 5,
  },
  alertText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginVertical: 10,
  },
  okButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  okButtonText: { color: "#fff", fontWeight: "bold" },
});

export default CartScreen;
