# PANDUAN LENGKAP SETUP APPWRITE (WAJIB)

Agar aplikasi berjalan lancar, Anda harus membuat **Database** dan **Collections** di Appwrite Console sesuai dengan kode yang sudah saya buat.

## 1. Konfigurasi Project & Database
Pastikan Anda berada di project dan database yang benar:
- **Project ID**: `69912660003e0e220cfe`
- **Database ID**: `69990b77002ee59b3fbf`

## 2. Instruksi Pembuatan Collection (Satu per Satu)

Anda harus membuat **7 Collection** dengan **Collection ID** yang persis sama dengan yang ada di kode.

---

### 1. Collection: `chats` (Pesan dari Pembeli)
*Digunakan untuk menyimpan pesan yang dikirim pembeli saat checkout.*

1. Klik **Create collection**.
2. Isi **Name**: `Chats`
3. Isi **Collection ID**: `chats` (Harus huruf kecil semua, tanpa spasi)
4. Klik **Create**.
5. Masuk ke tab **Attributes**, lalu klik **Create attribute**:
   - **Key**: `message` | **Type**: String | **Size**: 1000 | **Required**: Yes
   - **Key**: `sender` | **Type**: String | **Size**: 255 | **Required**: Yes
   - **Key**: `timestamp` | **Type**: Integer | **Required**: No (Opsional)
6. Masuk ke tab **Settings** -> **Permissions**:
   - Tambahkan Role: `Any`
   - Centang: **Create**, **Read**, **Update**, **Delete**.

---

### 2. Collection: `detailU` (Data Pembeli)
*Menyimpan nama, WhatsApp, dan lokasi pembeli.*

1. Buat collection baru.
2. **Name**: `Detail User` | **Collection ID**: `detailU`
3. **Attributes**:
   - `name` (String, 255, Required)
   - `whatsapp` (String, 50, Required)
   - `location` (String, 255, Required)
   - `timestamp` (String, 100, Required)
4. **Permissions**: Role `Any` -> **Create**, **Read**.

---

### 3. Collection: `detailP` (Detail Pesanan)
*Menyimpan item yang dibeli, total harga, dan status.*

1. Buat collection baru.
2. **Name**: `Detail Product` | **Collection ID**: `detailP`
3. **Attributes**:
   - `orderId` (String, 100, Required)
   - `items` (String, 5000, Required)
   - `total` (Integer, Required)
   - `status` (String, 50, Required)
4. **Permissions**: Role `Any` -> **Create**, **Read**.

---

### 4. Collection: `storeSettings` (Pengaturan Toko)
*Menyimpan nama toko, nomor WA admin, dan pengaturan fee.*

1. Buat collection baru.
2. **Name**: `Store Settings` | **Collection ID**: `storeSettings`
3. **Attributes**:
   - `storeName` (String, 255)
   - `whatsapp` (String, 50)
   - `qrisImageUrl` (String, 5000)
   - `qrisTimerMinutes` (Integer)
   - `feeType` (String, 20)
   - `feeValue` (Integer)
4. **Permissions**: Role `Any` -> **Read**, **Create**, **Update**.

---

### 5. Collection: `testimonials` (Testimoni)
*Menyimpan ulasan dari pembeli.*

1. Buat collection baru.
2. **Name**: `Testimonials` | **Collection ID**: `testimonials`
3. **Attributes**:
   - `name` (String, 255)
   - `text` (String, 1000)
   - `rating` (Float) - *Pilih Double atau Float*
   - `role` (String, 100)
   - `img` (String, 5000)
4. **Permissions**: Role `Any` -> **Read**, **Create**, **Update**, **Delete**.

---

### 6. Collection: `faqs` (Tanya Jawab)
*Menyimpan daftar pertanyaan umum.*

1. Buat collection baru.
2. **Name**: `FAQs` | **Collection ID**: `faqs`
3. **Attributes**:
   - `question` (String, 500)
   - `answer` (String, 2000)
4. **Permissions**: Role `Any` -> **Read**, **Create**, **Update**, **Delete**.

---

### 7. Collection: `storeInfo` (Info Toko)
*Menyimpan informasi seperti jam buka, garansi, dll.*

1. Buat collection baru.
2. **Name**: `Store Info` | **Collection ID**: `storeInfo`
3. **Attributes**:
   - `title` (String, 255)
   - `content` (String, 1000)
   - `icon` (String, 50)
   - `isActive` (Boolean)
4. **Permissions**: Role `Any` -> **Read**, **Create**, **Update**, **Delete**.

---

## PENTING: Anonymous Auth
Agar pembeli bisa mengirim data tanpa harus login/register:
1. Di Appwrite Console, klik menu **Auth** (sebelah kiri).
2. Klik tab **Settings**.
3. Cari bagian **Anonymous Session**.
4. Ubah menjadi **Enabled**.

## Fitur Admin: Hapus Riwayat
Saya sudah menambahkan tombol **"RESET CLOUD DATA"** di halaman Admin Dashboard. Tombol ini berfungsi untuk menghapus semua data di collection `chats`, `detailP`, dan `detailU` sekaligus, sehingga Anda bisa membersihkan data sampah dengan mudah.
