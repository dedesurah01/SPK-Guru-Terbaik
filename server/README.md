# Backend API & Database MySQL - SPK Pemilihan Guru Nurul Fikri

Modul backend ini menyediakan antarmuka REST API berbasis **Express.js** yang terhubung langsung ke database **MySQL** (XAMPP) untuk persistensi data master guru.

---

## 1. Struktur Database & Tabel `guru`

Database yang digunakan: `spk_guru_db`

```sql
CREATE DATABASE IF NOT EXISTS spk_guru_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE spk_guru_db;

CREATE TABLE IF NOT EXISTS guru (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kode_guru VARCHAR(50) NOT NULL UNIQUE,
  nama_guru VARCHAR(255) NOT NULL,
  mata_pelajaran VARCHAR(255) NOT NULL,
  pengalaman VARCHAR(50) DEFAULT '1 Tahun',
  status VARCHAR(50) DEFAULT 'Aktif',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

> **Catatan:** File skema lengkap tersedia di `server/schema.sql`.

---

## 2. Konfigurasi Koneksi (`server/.env`)

File konfigurasi berada di `server/.env`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=spk_guru_db
DB_PORT=3306
```

---

## 3. Daftar Endpoint API (CRUD)

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Status kesehatan API & server |
| `GET` | `/api/guru` | Ambil seluruh data guru dari MySQL |
| `GET` | `/api/guru/:id` | Ambil detail satu guru berdasarkan kode/id |
| `POST` | `/api/guru` | Tambah guru baru ke MySQL |
| `PUT` | `/api/guru/:id` | Perbarui data guru berdasarkan kode/id |
| `DELETE`| `/api/guru/:id` | Hapus guru dari database MySQL |

### Contoh Request Body `POST /api/guru`:
```json
{
  "kode_guru": "G-001",
  "nama_guru": "Ahmad Fauzi, M.Pd.",
  "mata_pelajaran": "Matematika Saintek",
  "pengalaman": "4 Tahun",
  "status": "Aktif"
}
```

---

## 4. Cara Menjalankan

### Langkah 1: Pastikan MySQL XAMPP Aktif
Buka **XAMPP Control Panel**, lalu klik **Start** pada modul **MySQL**.

### Langkah 2: Jalankan Backend Server
Buka terminal baru di folder proyek:
```bash
npm run server
```
Server akan berjalan di `http://localhost:5000`.

### Langkah 3: Jalankan Frontend Vite
Di terminal lain:
```bash
npm run dev
```
Buka browser pada alamat yang diberikan Vite (biasanya `http://localhost:5173`). Di halaman **Data Guru**, Anda akan melihat badge **🟢 MySQL Aktif**. Data yang Anda masukkan akan langsung tersimpan permanen di database MySQL dan tidak akan hilang saat halaman ditutup atau direfresh.

