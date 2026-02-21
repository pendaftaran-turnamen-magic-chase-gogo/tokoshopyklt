# PANDUAN SETUP APPWRITE (WAJIB DILAKUKAN)

Agar fitur Real-time Chat dan Sinkronisasi Pesanan berfungsi, Anda harus membuat Database dan Collections di Appwrite Console.

## 1. Login ke Appwrite Console
Buka project Anda: `69912660003e0e220cfe`

## 2. Masuk ke Database
Buka Database ID: `69990b77002ee59b3fbf`

## 3. Buat Collections Berikut:

### A. Collection: `chats`
- **ID Collection**: `chats` (Pastikan ID sama persis)
- **Attributes (Kolom)**:
  1. `message` (Type: String, Size: 1000, Required: Yes)
  2. `sender` (Type: String, Size: 255, Required: Yes)
- **Permissions**:
  - Role: `Any` -> Read, Create, Update, Delete (Agar user anonim bisa chat)

### B. Collection: `detailU` (User Details)
- **ID Collection**: `detailU`
- **Attributes**:
  1. `name` (Type: String, Size: 255)
  2. `whatsapp` (Type: String, Size: 50)
  3. `location` (Type: String, Size: 255) - Menyimpan "lat,lng"
  4. `timestamp` (Type: String, Size: 100) - Menyimpan waktu order (ISO String)
- **Permissions**:
  - Role: `Any` -> Create
  - Role: `Any` -> Read (Opsional, untuk Admin)

### C. Collection: `detailP` (Product Details)
- **ID Collection**: `detailP`
- **Attributes**:
  1. `orderId` (Type: String, Size: 100)
  2. `items` (Type: String, Size: 5000) - Menyimpan JSON string item yang dibeli
  3. `total` (Type: Integer)
  4. `status` (Type: String, Size: 50)
- **Permissions**:
  - Role: `Any` -> Create
  - Role: `Any` -> Read

## 4. Aktifkan Anonymous Auth
1. Masuk ke menu **Auth** -> **Settings**.
2. Pastikan **Anonymous Session** diaktifkan (Enabled).

## 5. Selesai!
Setelah langkah di atas dilakukan, fitur chat dan order real-time akan otomatis berjalan.
