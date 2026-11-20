import express from 'express';
import pool from '../db.js';

const router = express.Router();

const DEFAULT_KRITERIA = [
  { kode: 'C1', nama: 'Kehadiran', bobot: 10, jenis: 'Benefit', keterangan: 'Persentase kehadiran tatap muka & daring' },
  { kode: 'C2', nama: 'Kedisiplinan', bobot: 10, jenis: 'Benefit', keterangan: 'Ketepatan waktu memulai & menyelesaikan KBM' },
  { kode: 'C3', nama: 'Kualitas Mengajar', bobot: 10, jenis: 'Benefit', keterangan: 'Metode penyampaian & interaksi dengan siswa' },
  { kode: 'C4', nama: 'Penguasaan Materi', bobot: 40, jenis: 'Benefit', keterangan: 'Kedalaman & pemahaman kurikulum bimbingan belajar' },
  { kode: 'C5', nama: 'Persiapan Mengajar', bobot: 8, jenis: 'Benefit', keterangan: 'Kelengkapan modul, silabus & latihan soal' },
  { kode: 'C6', nama: 'Kemampuan Komunikasi', bobot: 8, jenis: 'Benefit', keterangan: 'Komunikasi persuasif dengan siswa & orang tua' },
  { kode: 'C7', nama: 'Pengelolaan Kelas', bobot: 7, jenis: 'Benefit', keterangan: 'Kondusivitas & keterlibatan aktif kelas' },
  { kode: 'C8', nama: 'Hasil Belajar Siswa', bobot: 7, jenis: 'Benefit', keterangan: 'Rata-rata peningkatan nilai try out / evaluasi siswa' }
];

// 1. GET /api/kriteria - Ambil semua kriteria evaluasi dari database
router.get('/', async (req, res) => {
  try {
    let [rows] = await pool.query(
      'SELECT id, kode, nama, CAST(bobot AS DOUBLE) as bobot, jenis, keterangan FROM kriteria ORDER BY id ASC'
    );

    // Jika tabel kriteria masih kosong, lakukan auto-seeding
    if (rows.length === 0) {
      for (const k of DEFAULT_KRITERIA) {
        await pool.query(
          `INSERT INTO kriteria (kode, nama, bobot, jenis, keterangan) 
           VALUES (?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE nama = VALUES(nama), bobot = VALUES(bobot), jenis = VALUES(jenis), keterangan = VALUES(keterangan)`,
          [k.kode, k.nama, k.bobot, k.jenis, k.keterangan]
        );
      }
      [rows] = await pool.query(
        'SELECT id, kode, nama, CAST(bobot AS DOUBLE) as bobot, jenis, keterangan FROM kriteria ORDER BY id ASC'
      );
    }

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error GET /api/kriteria:', error.message);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data kriteria dari database',
      error: error.message
    });
  }
});

// 2. PUT /api/kriteria/:kode - Perbarui kriteria dan bobot tertentu
router.put('/:kode', async (req, res) => {
  const { kode } = req.params;
  const { nama, bobot, jenis, keterangan } = req.body;

  try {
    const [existing] = await pool.query('SELECT * FROM kriteria WHERE kode = ?', [kode]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Kriteria dengan kode '${kode}' tidak ditemukan`
      });
    }

    if (bobot !== undefined) {
      const parsedBobot = parseFloat(bobot);
      if (isNaN(parsedBobot) || parsedBobot <= 0 || parsedBobot > 100) {
        return res.status(400).json({
          success: false,
          message: 'Bobot kriteria harus berupa angka positif antara 1 hingga 100'
        });
      }
    }

    const updatedNama = nama !== undefined ? nama : existing[0].nama;
    const updatedBobot = bobot !== undefined ? parseFloat(bobot) : existing[0].bobot;
    const updatedJenis = jenis !== undefined ? jenis : existing[0].jenis;
    const updatedKeterangan = keterangan !== undefined ? keterangan : existing[0].keterangan;

    await pool.query(
      `UPDATE kriteria 
       SET nama = ?, bobot = ?, jenis = ?, keterangan = ? 
       WHERE kode = ?`,
      [updatedNama, updatedBobot, updatedJenis, updatedKeterangan, kode]
    );

    const [updatedRows] = await pool.query(
      'SELECT id, kode, nama, CAST(bobot AS DOUBLE) as bobot, jenis, keterangan FROM kriteria WHERE kode = ?',
      [kode]
    );

    res.json({
      success: true,
      message: `Kriteria '${kode}' berhasil diperbarui di database`,
      data: updatedRows[0]
    });
  } catch (error) {
    console.error(`Error PUT /api/kriteria/${kode}:`, error.message);
    res.status(500).json({
      success: false,
      message: 'Gagal memperbarui kriteria di database',
      error: error.message
    });
  }
});

// 3. POST /api/kriteria/reset - Reset seluruh kriteria ke standar default PRD
router.post('/reset', async (req, res) => {
  try {
    for (const k of DEFAULT_KRITERIA) {
      await pool.query(
        `INSERT INTO kriteria (kode, nama, bobot, jenis, keterangan) 
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE nama = VALUES(nama), bobot = VALUES(bobot), jenis = VALUES(jenis), keterangan = VALUES(keterangan)`,
        [k.kode, k.nama, k.bobot, k.jenis, k.keterangan]
      );
    }

    const [rows] = await pool.query(
      'SELECT id, kode, nama, CAST(bobot AS DOUBLE) as bobot, jenis, keterangan FROM kriteria ORDER BY id ASC'
    );

    res.json({
      success: true,
      message: 'Seluruh kriteria berhasil di-reset ke nilai standar PRD',
      data: rows
    });
  } catch (error) {
    console.error('Error POST /api/kriteria/reset:', error.message);
    res.status(500).json({
      success: false,
      message: 'Gagal mereset kriteria',
      error: error.message
    });
  }
});

export default router;
