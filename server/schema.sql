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

-- Tabel: penilaian (Skor evaluasi guru per kriteria C1 - C8 per tanggal evaluasi)
CREATE TABLE IF NOT EXISTS penilaian (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kode_guru VARCHAR(50) NOT NULL,
  kode_kriteria VARCHAR(20) NOT NULL,
  tanggal_penilaian VARCHAR(20) NOT NULL DEFAULT '2026-11-06',
  nilai DECIMAL(5,2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_guru_kriteria_tanggal (kode_guru, kode_kriteria, tanggal_penilaian)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabel: kriteria (Data kriteria evaluasi dan bobot preferensi SAW)
CREATE TABLE IF NOT EXISTS kriteria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kode VARCHAR(20) NOT NULL UNIQUE,
  nama VARCHAR(255) NOT NULL,
  bobot DECIMAL(5,2) NOT NULL DEFAULT 0,
  jenis VARCHAR(20) NOT NULL DEFAULT 'Benefit',
  keterangan TEXT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Data Kriteria Awal SOT PRD
INSERT INTO kriteria (kode, nama, bobot, jenis, keterangan) VALUES
('C1', 'Kehadiran', 10, 'Benefit', 'Persentase kehadiran tatap muka & daring'),
('C2', 'Kedisiplinan', 10, 'Benefit', 'Ketepatan waktu memulai & menyelesaikan KBM'),
('C3', 'Kualitas Mengajar', 10, 'Benefit', 'Metode penyampaian & interaksi dengan siswa'),
('C4', 'Penguasaan Materi', 40, 'Benefit', 'Kedalaman & pemahaman kurikulum bimbingan belajar'),
('C5', 'Persiapan Mengajar', 8, 'Benefit', 'Kelengkapan modul, silabus & latihan soal'),
('C6', 'Kemampuan Komunikasi', 8, 'Benefit', 'Komunikasi persuasif dengan siswa & orang tua'),
('C7', 'Pengelolaan Kelas', 7, 'Benefit', 'Kondusivitas & keterlibatan aktif kelas'),
('C8', 'Hasil Belajar Siswa', 7, 'Benefit', 'Rata-rata peningkatan nilai try out / evaluasi siswa')
ON DUPLICATE KEY UPDATE nama = VALUES(nama), bobot = VALUES(bobot), jenis = VALUES(jenis), keterangan = VALUES(keterangan);

-- Tabel: pengaturan (Pengaturan sistem seperti tanggal_penilaian)
CREATE TABLE IF NOT EXISTS pengaturan (
  kunci VARCHAR(100) PRIMARY KEY,
  nilai TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

