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

-- Tabel: penilaian (Skor evaluasi guru per kriteria C1 - C8)
CREATE TABLE IF NOT EXISTS penilaian (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kode_guru VARCHAR(50) NOT NULL,
  kode_kriteria VARCHAR(20) NOT NULL,
  nilai DECIMAL(5,2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_guru_kriteria (kode_guru, kode_kriteria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabel: pengaturan (Pengaturan sistem seperti tanggal_penilaian)
CREATE TABLE IF NOT EXISTS pengaturan (
  kunci VARCHAR(100) PRIMARY KEY,
  nilai TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

