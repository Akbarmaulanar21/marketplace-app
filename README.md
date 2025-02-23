# Marketplace App

Marketplace App adalah aplikasi sederhana berbasis React Native yang memungkinkan pengguna untuk melihat daftar produk, menambahkannya ke keranjang, melakukan pembayaran, dan melihat riwayat transaksi.

## 🎯 **Tujuan Aplikasi**
Aplikasi ini dibuat sebagai demo untuk menampilkan proses transaksi marketplace sederhana, termasuk pengelolaan keranjang belanja, pembayaran, dan pencatatan transaksi.

---

---

## 🌐 **API yang Digunakan**
Aplikasi ini menggunakan DummyJSON API:
- **Produk:** `https://dummyjson.com/products`

---

## 🚀 **Fitur Utama**

### 1. **Halaman Produk**
- Menampilkan produk dalam bentuk grid.
- Pencarian produk berdasarkan nama.
- Detail produk termasuk deskripsi, harga, dan stok.
- Tombol *Add to Cart* untuk menambah produk ke keranjang.

### 2. **Keranjang Belanja**
- Menampilkan produk yang ditambahkan ke keranjang.
- Mengubah jumlah produk dengan tombol **+** dan **-**.
- Menghapus produk dari keranjang dengan ikon **X** di pojok kanan atas.
- Badge keranjang di tab navigasi yang menunjukkan jumlah item.

### 3. **Input Pembayaran** *(Fitur Tambahan)*
- Input jumlah pembayaran saat checkout.
- Menghitung kembalian secara otomatis.
- Notifikasi modern setelah transaksi berhasil.

### 4. **Riwayat Transaksi**
- Menampilkan daftar transaksi yang telah dilakukan.
- Transaksi terbaru muncul di bagian atas.
- Menampilkan detail setiap transaksi, termasuk daftar produk, total pembayaran, dan kembalian.
- **Fitur Hapus Transaksi**: Setiap transaksi dapat dihapus.

### 5. **Manajemen Data Lokal** *(Fitur Tambahan)*
- Data keranjang dan transaksi disimpan secara lokal menggunakan **AsyncStorage**, sehingga tetap tersedia setelah aplikasi ditutup.

---

## ⚙️ **Instalasi dan Menjalankan Proyek**

1. **Kloning Repositori:**
```bash
git clone https://github.com/username/marketplace-app.git
cd marketplace-app
```

2. **Instal Dependensi:**
```bash
npm install
```

3. **Jalankan Aplikasi:**
```bash
npx expo start
```

---

## 📦 **Build APK (Android)** *(Fitur Build & Deploy)*

1. **Instal EAS CLI:**
```bash
npm install -g eas-cli
```

2. **Login ke Expo:**
```bash
eas login
```

3. **Konfigurasi Build:**
Buat file `eas.json` di root proyek dengan isi:
```json
{
  "build": {
    "production": {
      "distribution": "apk",
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

4. **Build APK:**
```bash
eas build -p android --profile production
```

5. **Hasil Build:**
Setelah build selesai, Anda akan mendapatkan link unduhan APK di terminal.

---

## 📝 **Lisensi**
Aplikasi ini dilisensikan di bawah lisensi MIT. Anda bebas menggunakan, mengubah, dan mendistribusikan proyek ini dengan tetap mencantumkan kredit kepada pembuat.

---

## 👥 **Kontributor**
- **[Akbar Maulana R]** – *Pengembang Utama*

---

## 📞 **Kontak**
Untuk pertanyaan atau kolaborasi, silakan hubungi: [akbarmaulanar21@gmail.com]

