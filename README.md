# 📱 Marketplace App Documentation

## 📝 **1. Pendahuluan**
Marketplace App adalah aplikasi mobile sederhana berbasis React Native yang memungkinkan pengguna untuk:
1. Melihat produk dari API `https://dummyjson.com/products`.
2. Menambahkan produk ke keranjang belanja.
3. Melakukan pembayaran dengan input jumlah pembayaran.
4. Menyimpan riwayat transaksi ke `AsyncStorage`.
5. Melihat detail transaksi dan menghapus transaksi jika diperlukan.

---

## 📂 **2. Struktur Folder**
```
marketplace-app/
├─ assets/                   # Ikon & gambar aplikasi
├─ src/
│  ├─ components/            # Komponen UI terpisah (CartItem, ProductCard)
│  ├─ context/               # CartContext untuk state global
│  ├─ screens/               # Halaman utama aplikasi (ProductScreen, CartScreen, dll.)
│  ├─ AppNavigator.js        # Navigasi antar halaman
│  └─ App.js                 # Entry point aplikasi
├─ .env                      # Konfigurasi environment (opsional)
├─ package.json              # Dependensi dan script
├─ eas.json                  # Konfigurasi build Expo
└─ README.md                 # Dokumentasi ini
```

---

## ⚙️ **3. Instalasi & Konfigurasi**
### 💻 **Setup Project**
1. **Kloning Repositori:**
```bash
git clone https://github.com/username/marketplace-app.git
cd marketplace-app
```

2. **Instalasi Dependensi:**
```bash
npm install
# atau
yarn install
```

3. **Jalankan Aplikasi:**
```bash
npx expo start
```

### 🔑 **Konfigurasi API**
API produk menggunakan `https://dummyjson.com/products` yang sudah tertanam di `ProductScreen.js`.

---

## 📜 **4. Penjelasan Kode Per File**

### **1. `CartContext.js`** *(src/context/)*
Mengelola state global untuk keranjang belanja dan transaksi.
- `addToCart(product)`: Menambah produk ke keranjang.
- `updateQuantity(id, amount)`: Update jumlah produk.
- `removeFromCart(id)`: Hapus produk dari keranjang.
- `addTransaction(transaction)`: Menyimpan transaksi ke `AsyncStorage`.
- `deleteTransaction(id)`: Menghapus transaksi dari `AsyncStorage`.

### **2. `ProductScreen.js`** *(src/screens/)*
Menampilkan daftar produk.
- Data produk diambil dari API menggunakan `axios`.
- Produk ditampilkan dalam **Grid 2 Kolom**.
- **Pencarian & Filter:** Filter produk berdasarkan kategori.
- **Modal Detail:** Ketika produk diklik, tampil detail beserta tombol `Add to Cart`.

### **3. `CartScreen.js`** *(src/screens/)*
Menampilkan produk yang ditambahkan ke keranjang.
- **Update:** Tambah/kurangi jumlah produk.
- **Hapus:** Produk bisa dihapus dengan ikon `X` di pojok kanan atas.
- **Payment:** Tombol "Lanjutkan Pembayaran" akan membuka modal input pembayaran.

### **4. `TransactionList.js`** *(src/screens/)*
Menampilkan daftar transaksi yang tersimpan di `AsyncStorage`.
- **Detail:** Klik transaksi untuk melihat detail produk.
- **Hapus:** Tombol sampah (trash) untuk menghapus transaksi.

### **5. `TransactionDetail.js`** *(src/screens/)*
Menampilkan detail setiap transaksi, termasuk:
- Produk yang dibeli.
- Total belanja, jumlah pembayaran, dan kembalian.

---

## 🚀 **5. Fitur Utama**
1. **Product Page:** Lihat produk, filter, cari, dan detail.
2. **Cart Page:** Tambah, kurangi, hapus produk dari keranjang.
3. **Payment:** Input pembayaran & hitung kembalian.
4. **Transaction History:** Riwayat transaksi dengan detail.
5. **Delete Transaction:** Hapus transaksi jika tidak diperlukan.
6. **Badge Keranjang:** Menampilkan jumlah item di header.

---

## 📦 **6. Build & Deploy APK**

1. **Login Expo:**
```bash
npx expo login
```

2. **Build APK:**
```bash
eas build -p android --profile production
```

3. **Download APK:** Link akan muncul setelah build selesai.

---

## 📜 **7. Lisensi & Kontributor**
### **Lisensi:** MIT License

### **Kontributor:**
1. **Developer:** [Nama Anda]
2. **Dokumentasi:** ChatGPT

Terima kasih telah menggunakan aplikasi ini! Jika ada pertanyaan atau saran, silakan hubungi saya. 😊

