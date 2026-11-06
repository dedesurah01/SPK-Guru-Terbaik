import express from 'express';
import pool from '../db.js';

const router = express.Router();

// 1. GET /api/penilaian - Ambil semua nilai penilaian dan tanggal evaluasi dari MySQL
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT kode_guru, kode_kriteria, nilai FROM penilaian');
    
    const penilaianMap = {};
    rows.forEach((r) => {
      if (!penilaianMap[r.kode_guru]) {
        penilaianMap[r.kode_guru] = {};
      }
      penilaianMap[r.kode_guru][r.kode_kriteria] = Number(r.nilai);
    });

    // Ambil juga tanggal_penilaian jika ada
    let tanggalPenilaian = null;
    const [settingRows] = await pool.query(
      'SELECT nilai FROM pengaturan WHERE kunci = ? LIMIT 1',
      ['tanggal_penilaian']
    );
    if (settingRows.length > 0) {
      tanggalPenilaian = settingRows[0].nilai;
    }

    res.json({
      success: true,
      data: {
        penilaianMap,
        tanggalPenilaian
      }
    });
  } catch (error) {
    console.error('Error GET /api/penilaian:', error.message);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data penilaian dari database',
      error: error.message
    });
  }
});

// 2. POST /api/penilaian - Simpan / perbarui nilai seorang guru
router.post('/', async (req, res) => {
  const { kode_guru, guru_id, scores } = req.body;
  const targetId = (kode_guru || guru_id || '').trim();

  if (!targetId || !scores || typeof scores !== 'object') {
    return res.status(400).json({
      success: false,
      message: 'ID Guru dan objek scores wajib diisi'
    });
  }

  try {
    const entries = Object.entries(scores);
    for (const [kodeKriteria, nilai] of entries) {
      const numericVal = Number(nilai);
      if (!isNaN(numericVal)) {
        await pool.query(
          `INSERT INTO penilaian (kode_guru, kode_kriteria, nilai) 
           VALUES (?, ?, ?) 
           ON DUPLICATE KEY UPDATE nilai = VALUES(nilai)`,
          [targetId, kodeKriteria, numericVal]
        );
      }
    }

    res.json({
      success: true,
      message: `Nilai guru '${targetId}' berhasil disimpan ke MySQL`
    });
  } catch (error) {
    console.error('Error POST /api/penilaian:', error.message);
    res.status(500).json({
      success: false,
      message: 'Gagal menyimpan nilai ke database',
      error: error.message
    });
  }
});

// 3. POST /api/penilaian/batch - Simpan seluruh matriks penilaian sekaligus
router.post('/batch', async (req, res) => {
  const { penilaianMap } = req.body;

  if (!penilaianMap || typeof penilaianMap !== 'object') {
    return res.status(400).json({
      success: false,
      message: 'Objek penilaianMap wajib disertakan'
    });
  }

  try {
    for (const [kodeGuru, scores] of Object.entries(penilaianMap)) {
      if (scores && typeof scores === 'object') {
        for (const [kodeKriteria, nilai] of Object.entries(scores)) {
          const numericVal = Number(nilai);
          if (!isNaN(numericVal)) {
            await pool.query(
              `INSERT INTO penilaian (kode_guru, kode_kriteria, nilai) 
               VALUES (?, ?, ?) 
               ON DUPLICATE KEY UPDATE nilai = VALUES(nilai)`,
              [kodeGuru, kodeKriteria, numericVal]
            );
          }
        }
      }
    }

    res.json({
      success: true,
      message: 'Seluruh data penilaian berhasil disinkronkan ke MySQL'
    });
  } catch (error) {
    console.error('Error POST /api/penilaian/batch:', error.message);
    res.status(500).json({
      success: false,
      message: 'Gagal melakukan sinkronisasi batch penilaian',
      error: error.message
    });
  }
});

// 4. DELETE /api/penilaian/:id - Hapus seluruh nilai seorang guru
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM penilaian WHERE kode_guru = ?', [id]);
    res.json({
      success: true,
      message: `Nilai guru '${id}' berhasil dihapus dari database`
    });
  } catch (error) {
    console.error(`Error DELETE /api/penilaian/${id}:`, error.message);
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus nilai guru dari database',
      error: error.message
    });
  }
});

// 5. POST /api/penilaian/tanggal - Simpan tanggal evaluasi ke database
router.post('/tanggal', async (req, res) => {
  const { tanggal } = req.body;
  if (!tanggal) {
    return res.status(400).json({
      success: false,
      message: 'Tanggal evaluasi wajib diisi'
    });
  }

  try {
    await pool.query(
      `INSERT INTO pengaturan (kunci, nilai) 
       VALUES ('tanggal_penilaian', ?) 
       ON DUPLICATE KEY UPDATE nilai = VALUES(nilai)`,
      [tanggal]
    );

    res.json({
      success: true,
      message: 'Tanggal evaluasi berhasil disimpan ke MySQL'
    });
  } catch (error) {
    console.error('Error POST /api/penilaian/tanggal:', error.message);
    res.status(500).json({
      success: false,
      message: 'Gagal menyimpan tanggal evaluasi',
      error: error.message
    });
  }
});

export default router;
