import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { useCart } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";

const TransactionList = ({ navigation }) => {
  const { transactions, deleteTransaction } = useCart();
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // 🚀 Buka Modal Konfirmasi
  const handleDelete = (id) => {
    setSelectedId(id);
    setModalVisible(true);
  };

  // 🚀 Hapus Transaksi
  const confirmDelete = () => {
    deleteTransaction(selectedId);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Ionicons name="receipt-outline" size={22} color="#007bff" />
          <Text style={styles.title}>Transaction ID: {item.id}</Text>
        </View>

        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash-outline" size={20} color="#dc3545" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.total}>
          💰 Total:{" "}
          <Text style={styles.totalHighlight}>Rp{item.total.toFixed(2)}</Text>
        </Text>
        <Text style={styles.itemCount}>🛒 Items: {item.items.length}</Text>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.date}>
          📅 {new Date(item.id).toLocaleDateString()} -{" "}
          {new Date(item.id).toLocaleTimeString()}
        </Text>

        <TouchableOpacity
          style={styles.detailButton}
          onPress={() =>
            navigation.navigate("TransactionDetail", { transaction: item })
          }
        >
          <Text style={styles.detailButtonText}>Lihat Detail</Text>
          <Ionicons
            name="chevron-forward-circle-outline"
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📜 Transaction List</Text>

      {transactions.length > 0 ? (
        <FlatList
          data={transactions.slice().reverse()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.emptyText}>No transactions yet! 🛒</Text>
      )}

      {/* 🚀 Modal Konfirmasi Hapus */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Ionicons name="alert-circle" size={50} color="#dc3545" />
            <Text style={styles.modalTitle}>Konfirmasi Hapus</Text>
            <Text style={styles.modalText}>
              Apakah Anda yakin ingin menghapus transaksi ini?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={confirmDelete}
              >
                <Text style={styles.deleteText}>Hapus</Text>
              </TouchableOpacity>
            </View>
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
    marginBottom: 15,
    color: "#007bff",
  },
  list: { paddingBottom: 20 },

  // Kartu Transaksi
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  title: { fontSize: 16, fontWeight: "bold", color: "#333", marginLeft: 8 },

  // Body Kartu
  cardBody: { marginVertical: 8 },
  total: { fontSize: 16, color: "#555" },
  totalHighlight: { fontSize: 18, fontWeight: "bold", color: "#007bff" },
  itemCount: { fontSize: 14, color: "#666", marginTop: 5 },

  // Footer Kartu
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 8,
  },
  date: { fontSize: 12, color: "#888" },

  // Tombol Detail
  detailButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  detailButtonText: { color: "#fff", fontSize: 12, marginRight: 5 },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  modalText: { fontSize: 16, color: "#555", textAlign: "center" },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelText: { color: "#fff", fontWeight: "bold" },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  deleteText: { color: "#fff", fontWeight: "bold" },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});

export default TransactionList;
