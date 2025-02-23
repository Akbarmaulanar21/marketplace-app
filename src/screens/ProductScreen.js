import React, { useEffect, useState, memo } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "../api";

// Komponen Produk (React.memo untuk optimasi)
const ProductCard = memo(({ item, onPress, onAddToCart }) => (
  <View style={styles.card}>
    <TouchableOpacity onPress={onPress}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.price}>Rp{item.price.toLocaleString()}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={onAddToCart}>
      <Text style={styles.buttonText}>Add to Cart</Text>
    </TouchableOpacity>
  </View>
));

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  // Fetch Produk & Kategori
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data.products);
      setFilteredProducts(res.data.products);

      // Ambil kategori unik untuk filter
      const uniqueCategories = [
        "All",
        ...new Set(res.data.products.map((item) => item.category)),
      ];
      setCategories(uniqueCategories);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Pencarian Produk berdasarkan judul
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Filter Produk berdasarkan Kategori
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  // Menampilkan Detail Produk
  const showProductDetail = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  // Menampilkan Alert Modern
  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  // Render Produk
  const renderItem = ({ item }) => (
    <ProductCard
      item={item}
      onPress={() => showProductDetail(item)}
      onAddToCart={() => {
        addToCart(item);
        showAlert("Produk berhasil ditambahkan ke keranjang!");
      }}
    />
  );

  return (
    <View style={styles.container}>
      {/* Pencarian & Filter */}
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Cari produk..."
          value={searchQuery}
          onChangeText={handleSearch}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => handleCategoryFilter(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Produk List */}
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          initialNumToRender={10} // Render pertama 10 item
          windowSize={5} // Optimasi memori
          getItemLayout={(data, index) => ({
            length: 250, // Perkiraan tinggi item
            offset: 250 * index,
            index,
          })}
          contentContainerStyle={styles.list}
        />
      )}

      {/* Modal Detail Produk */}
      {selectedProduct && (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {/* Header Modal */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={28} color="#ff0000" />
                </TouchableOpacity>
              </View>

              {/* Konten Detail Produk */}
              <ScrollView style={styles.modalBody}>
                <Image
                  source={{ uri: selectedProduct.thumbnail }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalPrice}>
                  Rp{selectedProduct.price.toLocaleString()}
                </Text>
                <Text style={styles.modalDesc}>
                  {selectedProduct.description}
                </Text>

                <View style={styles.infoSection}>
                  <Text style={styles.infoText}>
                    🏷️ Brand: {selectedProduct.brand}
                  </Text>
                  <Text style={styles.infoText}>
                    💰 Diskon: {selectedProduct.discountPercentage}%
                  </Text>
                  <Text style={styles.infoText}>
                    ⭐ Rating: {selectedProduct.rating}
                  </Text>
                  <Text style={styles.infoText}>
                    📦 Stok: {selectedProduct.stock}
                  </Text>
                  <Text style={styles.infoText}>
                    🔖 SKU: {selectedProduct.sku}
                  </Text>
                  <Text style={styles.infoText}>
                    🏷️ Kategori: {selectedProduct.category}
                  </Text>
                  <Text style={styles.infoText}>
                    📐 Dimensi: {selectedProduct.dimensions?.width} x{" "}
                    {selectedProduct.dimensions?.height} x{" "}
                    {selectedProduct.dimensions?.depth} cm
                  </Text>
                  <Text style={styles.infoText}>
                    ⚖️ Berat: {selectedProduct.weight} kg
                  </Text>
                  <Text style={styles.infoText}>
                    🔐 Garansi: {selectedProduct.warrantyInformation}
                  </Text>
                  <Text style={styles.infoText}>
                    🚚 Pengiriman: {selectedProduct.shippingInformation}
                  </Text>
                  <Text style={styles.infoText}>
                    📊 Status: {selectedProduct.availabilityStatus}
                  </Text>
                  <Text style={styles.infoText}>
                    🏷️ Tags: {selectedProduct.tags?.join(", ")}
                  </Text>
                </View>

                {/* Review Produk */}
                <Text style={styles.sectionTitle}>📝 Customer Reviews:</Text>
                {selectedProduct.reviews?.length > 0 ? (
                  selectedProduct.reviews.map((review, index) => (
                    <View key={index} style={styles.reviewCard}>
                      <Text style={styles.reviewName}>
                        {review.reviewerName}
                      </Text>
                      <Text style={styles.reviewRating}>
                        ⭐ {review.rating}
                      </Text>
                      <Text style={styles.reviewComment}>
                        "{review.comment}"
                      </Text>
                      <Text style={styles.reviewDate}>
                        📅 {new Date(review.date).toLocaleDateString()}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noReview}>🚫 Belum ada ulasan.</Text>
                )}
              </ScrollView>

              {/* Tombol Tambah ke Keranjang */}
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.footerButton}
                  onPress={() => {
                    addToCart(selectedProduct);
                    alert("Produk berhasil ditambahkan ke keranjang!");
                  }}
                >
                  <Text style={styles.footerButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Modal Alert */}
      <Modal
        visible={alertVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.alertContainer}>
            <Ionicons name="checkmark-circle" size={50} color="#007bff" />
            <Text style={styles.alertText}>{alertMessage}</Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setAlertVisible(false)}
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
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  list: { padding: 10 },

  // Pencarian & Filter
  filterContainer: { padding: 10, backgroundColor: "#fff", marginBottom: 10 },
  searchInput: {
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    marginBottom: 10,
  },
  categoryScroll: { flexDirection: "row", paddingVertical: 5 },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonActive: { backgroundColor: "#007bff" },
  categoryText: { fontSize: 14, color: "#333" },
  categoryTextActive: { color: "#fff", fontWeight: "bold" },

  // Produk Card
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  image: { width: 120, height: 120, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 14, fontWeight: "bold", textAlign: "center" },
  price: { fontSize: 14, color: "#555", marginBottom: 10 },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 5,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },

  // Modal Detail Product
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: "90%",
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold" },
  modalBody: { padding: 10 },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalPrice: { fontSize: 18, color: "#007bff", marginBottom: 10 },
  modalDesc: { fontSize: 14, marginBottom: 10, textAlign: "justify" },
  infoSection: { marginVertical: 10 },
  infoText: { fontSize: 14, color: "#555", marginBottom: 5 },

  // Review Section
  reviewCard: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  reviewName: { fontWeight: "bold", color: "#333" },
  reviewRating: { color: "#ffa500", marginTop: 2 },
  reviewComment: { fontStyle: "italic", marginTop: 5 },
  reviewDate: { fontSize: 12, color: "#777", marginTop: 2 },
  noReview: { fontSize: 14, color: "#888", marginVertical: 10 },

  // modal alert
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

  // Footer Modal
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  footerButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  footerButtonText: { color: "#fff", fontWeight: "bold" },
});

export default ProductScreen;
