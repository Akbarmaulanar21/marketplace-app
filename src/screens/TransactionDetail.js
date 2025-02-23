import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

const TransactionDetail = ({ route }) => {
  const { transaction } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemText}>🛒 Qty: {item.quantity}</Text>
        <Text style={styles.itemText}>
          💰 Price: Rp{item.price?.toFixed(2)}
        </Text>
        <Text style={styles.itemTotal}>
          🔖 Total: Rp{(item.price * item.quantity)?.toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* 🔖 Header Detail Transaksi */}
      <View style={styles.detailHeader}>
        <Text style={styles.headerTitle}>🧾 Transaction Detail</Text>
        <Text style={styles.headerSubTitle}>ID: {transaction?.id}</Text>
      </View>

      {/* 💰 Ringkasan Pembayaran */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>
          🛍️ Total Belanja:{" "}
          <Text style={styles.highlight}>
            Rp{transaction?.total?.toFixed(2) || "0.00"}
          </Text>
        </Text>
        <Text style={styles.summaryText}>
          💵 Pembayaran User:{" "}
          <Text style={styles.highlight}>
            Rp{transaction?.paymentAmount?.toFixed(2) || "0.00"}
          </Text>
        </Text>
        <Text style={styles.summaryText}>
          💰 Kembalian:{" "}
          <Text style={styles.highlight}>
            Rp{transaction?.change?.toFixed(2) || "0.00"}
          </Text>
        </Text>
      </View>

      {/* 🛒 Daftar Produk */}
      <Text style={styles.sectionTitle}>🛒 Daftar Produk</Text>

      {/* ✅ FlatList dengan nestedScrollEnabled */}
      <FlatList
        data={transaction.items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        nestedScrollEnabled={true} // 🚀 Mencegah error
        scrollEnabled={false} // 🌟 Menggunakan ScrollView utama
        keyboardShouldPersistTaps="handled"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8", padding: 10 },

  // 🔖 Header Transaksi
  detailHeader: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  headerSubTitle: { fontSize: 14, color: "#e0e0e0", marginTop: 5 },

  // 💰 Ringkasan Pembayaran
  summaryCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  summaryText: { fontSize: 16, color: "#555", marginBottom: 5 },
  highlight: { fontSize: 18, fontWeight: "bold", color: "#007bff" },

  // 🛍️ Judul Daftar Produk
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 10,
    marginTop: 10,
  },

  // 🛒 Kartu Produk
  itemCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    alignItems: "center",
  },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  itemText: { fontSize: 14, color: "#666", marginVertical: 2 },
  itemTotal: { fontSize: 16, color: "#007bff", fontWeight: "bold" },

  // 📋 FlatList Styling
  list: { paddingBottom: 20 },
});

export default TransactionDetail;
