-- ============================================================
-- Skema Database SPK Pemilihan Guru Terbaik Nurul Fikri
-- Tabel: guru
-- ============================================================

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

