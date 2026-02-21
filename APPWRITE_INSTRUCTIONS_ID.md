# PANDUAN SETUP APPWRITE (UPDATE TERBARU)

Sesuai permintaan Anda, sekarang kita hanya menggunakan **SATU Collection** bernama `chats` untuk menyimpan semua data (pesanan, pesan, info toko, dll).

## 1. Konfigurasi Project
- **Project ID**: `69912660003e0e220cfe`
- **Database ID**: `69990b77002ee59b3fbf`

## 2. Instruksi Pembuatan Collection `chats`

Anda hanya perlu membuat **1 Collection** ini saja. Jika sebelumnya sudah ada, silakan **HAPUS** dulu collection `chats` yang lama, lalu buat baru dengan konfigurasi berikut agar bersih.

### Langkah-langkah:
1. Masuk ke Database `69990b77002ee59b3fbf`.
2. Klik **Create collection**.
3. Isi **Name**: `Chats`
4. Isi **Collection ID**: `chats` (Huruf kecil semua).
5. Klik **Create**.

### 3. Buat Attributes (Kolom)
Masuk ke tab **Attributes** di dalam collection `chats`, lalu tambahkan kolom-kolom berikut satu per satu. **Semua kolom di bawah ini WAJIB dibuat**.

| Key (Nama Kolom) | Type | Size | Required | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| `type` | String | 50 | **Yes** | Menandakan jenis data (order, review, setting, dll) |
| `name` | String | 255 | No | Nama User / Nama Toko |
| `whatsapp` | String | 50 | No | Nomor WA User / Toko |
| `message` | String | 5000 | No | Pesan Chat / Alamat / Isi Review / Jawaban FAQ |
| `location` | String | 255 | No | Koordinat Lokasi User |
| `items` | String | 5000 | No | JSON Data Barang Pesanan |
| `total` | Integer | - | No | Total Harga / Timer QRIS |
| `status` | String | 50 | No | Status Pesanan / Tipe Fee |
| `rating` | Double | - | No | Rating Bintang / Nilai Fee |
| `title` | String | 255 | No | Judul Info / Pertanyaan FAQ |
| `image` | String | 5000 | No | URL Gambar Bukti / Produk / QRIS |
| `active` | Boolean | - | No | Status Aktif Info Toko |
| `timestamp` | String | 100 | No | Waktu Kejadian |

> **Catatan:** Pilih "Double" atau "Float" untuk kolom `rating`.

### 4. Atur Permissions (Hak Akses)
1. Masuk ke tab **Settings**.
2. Scroll ke bagian **Permissions**.
3. Klik **Add Role**, pilih `Any`.
4. Centang semua akses: **Create**, **Read**, **Update**, **Delete**.
5. Klik **Update**.

### 5. Aktifkan Anonymous Auth
1. Klik menu **Auth** di sidebar kiri.
2. Klik tab **Settings**.
3. Pastikan **Anonymous Session** dalam keadaan **Enabled**.

## 6. Setup Webhook (Agar Lebih Real-Time / Integrasi Server)
Sesuai permintaan Anda, tambahkan Webhook ini agar sistem bisa mengirim notifikasi ke server Anda saat ada pesanan baru.

1. Masuk ke menu **Webhooks** (di sidebar kiri paling bawah, atau di dalam settings project).
2. Klik **Create webhook**.
3. Isi form sesuai data berikut:
   - **Name**: `Tokoshop`
   - **POST URL**: `https://tokoshopyklt-l8zz.vercel.app/callback`
4. **Events (PENTING)**:
   - Klik tombol **Add an event**.
   - Di jendela yang muncul (seperti di screenshot Anda):
     - Klik ikon **Pensil** ✏️ di baris paling bawah (sebelah kanan kolom input).
     - Hapus teks yang ada.
     - Copy & Paste teks ini: `databases.69990b77002ee59b3fbf.collections.chats.documents.create`
   - Klik **Create**.
5. **Security (HTTP authentication)**:
   - **User**: `tokoshop`
   - **Password**: `Atshal5445`
6. Klik **Create webhook**.

---

## Selesai!
Sekarang satu collection `chats` ini sudah sakti mandraguna.
- Saat ada pesanan, data akan masuk dengan `type: "order"`.
- Saat ada pesan chat, data masuk dengan `type: "chat"` (jika nanti diaktifkan lagi).
- Pengaturan toko, testimoni, dll juga akan tersimpan di sini.
- Admin bisa mereset semua data ini sekaligus lewat tombol "RESET CLOUD DATA".
