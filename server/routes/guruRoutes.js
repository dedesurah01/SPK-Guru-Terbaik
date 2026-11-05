import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Helper untuk format data dari MySQL ke struktur frontend
function formatGuruRow(row) {
  let tanggalBergabung = '';
  if (row.created_at) {
    try {
      tanggalBergabung = new Date(row.created_at).toISOString().split('T')[0];
    } catch {
      tanggalBergabung = new Date().toISOString().split('T')[0];
    }
  }

  return {
    id: row.kode_guru || `G-${String(row.id).padStart(3, '0')}`,
    db_id: row.id,
    kode_guru: row.kode_guru,
    nama: row.nama_guru,
    mapel: row.mata_pelajaran,
    pengalaman: row.pengalaman || '3 Tahun',
    status: row.status || 'Aktif',
    tanggalBergabung: tanggalBergabung || new Date().toISOString().split('T')[0]
  };
}

// 1. GET /api/guru - Ambil semua data guru
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM guru ORDER BY id ASC');
    const formatted = rows.map(formatGuruRow);
    res.json({
      success: true,
      count: formatted.length,
      data: formatted
    });
  } catch (error) {
    console.error('Error GET /api/guru:', error.message);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data guru dari database',
      error: error.message
    });
  }
});

// 2. GET /api/guru/:id - Ambil detail 1 guru berdasarkan kode_guru atau id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM guru WHERE kode_guru = ? OR id = ? LIMIT 1',
      [id, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Guru dengan ID/Kode '${id}' tidak ditemukan`
      });
    }

    res.json({
      success: true,
      data: formatGuruRow(rows[0])
    });
  } catch (error) {
    console.error(`Error GET /api/guru/${id}:`, error.message);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil detail data guru',
      error: error.message
    });
  }
});

// 3. POST /api/guru - Tambah guru baru
router.post('/', async (req, res) => {
  const { id, kode_guru, nama, nama_guru, mapel, mata_pelajaran, pengalaman, status } = req.body;

  const finalKode = (kode_guru || id || '').trim();
  const finalNama = (nama_guru || nama || '').trim();
  const finalMapel = (mata_pelajaran || mapel || '').trim();
  const finalPengalaman = (pengalaman || '3 Tahun').trim();
  const finalStatus = (status || 'Aktif').trim();

  if (!finalNama || !finalMapel) {
    return res.status(400).json({
      success: false,
      message: 'Nama guru dan mata pelajaran wajib diisi'
    });
  }

  try {
    // Generate kode_guru otomatis jika tidak diberikan
    let kode = finalKode;
    if (!kode) {
      const [maxRows] = await pool.query('SELECT MAX(id) as maxId FROM guru');
      const nextNum = (maxRows[0]?.maxId || 0) + 1;
      kode = `G-${String(nextNum).padStart(3, '0')}`;
    }

    // Cek apakah kode_guru sudah ada
    const [existing] = await pool.query('SELECT id FROM guru WHERE kode_guru = ?', [kode]);
    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: `Kode guru '${kode}' sudah digunakan`
      });
    }

    const [result] = await pool.query(
      'INSERT INTO guru (kode_guru, nama_guru, mata_pelajaran, pengalaman, status) VALUES (?, ?, ?, ?, ?)',
      [kode, finalNama, finalMapel, finalPengalaman, finalStatus]
    );

    const [newRow] = await pool.query('SELECT * FROM guru WHERE id = ?', [result.insertId]);

    res.status(201).json({
      success: true,
      message: 'Data guru berhasil ditambahkan ke MySQL',
      data: formatGuruRow(newRow[0])
    });
  } catch (error) {
    console.error('Error POST /api/guru:', error.message);
    res.status(500).json({
      success: false,
      message: 'Gagal menambahkan data guru ke database',
      error: error.message
    });
  }
});

// 4. PUT /api/guru/:id - Perbarui data guru
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nama, nama_guru, mapel, mata_pelajaran, pengalaman, status } = req.body;

  const finalNama = (nama_guru || nama || '').trim();
  const finalMapel = (mata_pelajaran || mapel || '').trim();
  const finalPengalaman = (pengalaman || '3 Tahun').trim();
  const finalStatus = (status || 'Aktif').trim();

  if (!finalNama || !finalMapel) {
    return res.status(400).json({
      success: false,
      message: 'Nama guru dan mata pelajaran wajib diisi'
    });
  }

  try {
    const [result] = await pool.query(
      'UPDATE guru SET nama_guru = ?, mata_pelajaran = ?, pengalaman = ?, status = ? WHERE kode_guru = ? OR id = ?',
      [finalNama, finalMapel, finalPengalaman, finalStatus, id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Guru dengan ID/Kode '${id}' tidak ditemukan untuk diperbarui`
      });
    }

    const [updatedRow] = await pool.query(
      'SELECT * FROM guru WHERE kode_guru = ? OR id = ? LIMIT 1',
      [id, id]
    );

    res.json({
      success: true,
      message: 'Data guru berhasil diperbarui di MySQL',
      data: formatGuruRow(updatedRow[0])
    });
  } catch (error) {
    console.error(`Error PUT /api/guru/${id}:`, error.message);
    res.status(500).json({
      success: false,
      message: 'Gagal memperbarui data guru di database',
      error: error.message
    });
  }
});

// 5. DELETE /api/guru/:id - Hapus data guru
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'DELETE FROM guru WHERE kode_guru = ? OR id = ?',
      [id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Guru dengan ID/Kode '${id}' tidak ditemukan untuk dihapus`
      });
    }

    res.json({
      success: true,
      message: `Data guru '${id}' berhasil dihapus dari database`
    });
  } catch (error) {
    console.error(`Error DELETE /api/guru/${id}:`, error.message);
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus data guru dari database',
      error: error.message
    });
  }
});

export default router;

