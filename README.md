# 📱 Marketplace App

Marketplace App adalah aplikasi demo marketplace sederhana yang dibangun menggunakan **React Native**, **Expo**, dan **AsyncStorage**. Aplikasi ini memungkinkan pengguna untuk melihat produk, menambahkannya ke keranjang, melakukan pembayaran, dan melihat riwayat transaksi.

## 🎯 Tujuan Aplikasi
Aplikasi ini bertujuan untuk memberikan pemahaman dasar tentang:
- Penggunaan **React Native** untuk mobile development.
- Integrasi **API** untuk mendapatkan data produk.
- Manajemen state menggunakan **Context API**.
- Penyimpanan data lokal dengan **AsyncStorage**.

## 📂 Struktur Folder
```
marketplace-app/
├── assets/                # Gambar dan ikon
├── src/
│   ├── components/        # Komponen UI terpisah (CartItem.js, ProductCard.js)
│   ├── context/           # CartContext.js untuk manajemen state
│   ├── screens/           # Halaman utama aplikasi
│   │   ├── ProductScreen.js
│   │   ├── CartScreen.js
│   │   ├── TransactionList.js
│   │   └── TransactionDetail.js
│   ├── AppNavigator.js    # Navigasi aplikasi
│   └── api.js             # Konfigurasi endpoint API
├── App.js                 # Entry point aplikasi
├── package.json           # Dependensi proyek
└── README.md              # Dokumentasi proyek
```

## 🌐 API
Aplikasi ini menggunakan **DummyJSON API** untuk data produk:
- Endpoint: [https://dummyjson.com/products](https://dummyjson.com/products)

## 🚀 Fitur Utama
1. **Halaman Produk:**
   - Menampilkan daftar produk dalam bentuk grid.
   - Klik produk untuk melihat detail atau tambahkan ke keranjang.

2. **Keranjang:**
   - Lihat daftar produk yang dipilih.
   - Update jumlah produk (+/-).
   - Hapus produk dengan tombol **X** di pojok kanan atas.
   - **Badge Keranjang** menunjukkan jumlah item yang dipilih.

3. **Pembayaran:**
   - Input jumlah pembayaran.
   - Kembalian otomatis dihitung.
   - Transaksi disimpan ke **AsyncStorage**.

4. **Riwayat Transaksi:**
   - Tampilkan daftar transaksi dengan ID unik.
   - Klik transaksi untuk melihat detailnya.
   - Hapus transaksi jika tidak diperlukan.

## 🔨 Build & Deploy
Untuk menjalankan proyek ini secara lokal:

1. **Clone Repository:**
```bash
git clone https://github.com/username/marketplace-app.git
cd marketplace-app
```

2. **Install Dependensi:**
```bash
npm install
```

3. **Jalankan Aplikasi:**
```bash
npx expo start
```

4. **Build APK (Production):**
```bash
eas build -p android --profile production
```

## 📄 Lisensi & Kontributor
- **Lisensi:** MIT License
- **Kontributor:** Akbar Maulana Rahmat (Developer Utama)

Jika Anda ingin berkontribusi, silakan buat pull request atau laporkan masalah pada repository GitHub. 😊

