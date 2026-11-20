import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Helper untuk mendapatkan tanggal aktif saat ini
async function getActiveTanggal() {
  const [settingRows] = await pool.query(
    'SELECT nilai FROM pengaturan WHERE kunci = ? LIMIT 1',
    ['tanggal_penilaian']
  );
  return settingRows[0]?.nilai || new Date().toISOString().split('T')[0];
}

// 1. GET /api/penilaian - Ambil nilai penilaian berdasarkan tanggal (query ?tanggal=YYYY-MM-DD)
router.get('/', async (req, res) => {
  try {
    let targetTanggal = req.query.tanggal;
    if (!targetTanggal) {
      targetTanggal = await getActiveTanggal();
    }

    const [rows] = await pool.query(
      'SELECT kode_guru, kode_kriteria, nilai FROM penilaian WHERE tanggal_penilaian = ?',
      [targetTanggal]
    );

    const penilaianMap = {};
    rows.forEach((r) => {
      if (!penilaianMap[r.kode_guru]) {
        penilaianMap[r.kode_guru] = {};
      }
      penilaianMap[r.kode_guru][r.kode_kriteria] = Number(r.nilai);
    });

    res.json({
      success: true,
      data: {
        penilaianMap,
        tanggalPenilaian: targetTanggal,
        totalTersimpan: rows.length
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

// 2. GET /api/penilaian/history - Ambil semua riwayat tanggal yang pernah dinilai
router.get('/history', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT DISTINCT tanggal_penilaian, COUNT(DISTINCT kode_guru) as total_guru FROM penilaian GROUP BY tanggal_penilaian ORDER BY tanggal_penilaian DESC'
    );
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error GET /api/penilaian/history:', error.message);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil riwayat penilaian',
      error: error.message
    });
  }
});

// 3. POST /api/penilaian - Simpan / perbarui nilai seorang guru untuk tanggal tertentu
router.post('/', async (req, res) => {
  const { kode_guru, guru_id, scores, tanggal_penilaian, tanggal } = req.body;
  const targetId = (kode_guru || guru_id || '').trim();

  let targetTanggal = (tanggal_penilaian || tanggal || '').trim();
  if (!targetTanggal) {
    targetTanggal = await getActiveTanggal();
  }

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
      if (!isNaN(numericVal) && numericVal >= 0 && numericVal <= 100) {
        await pool.query(
          `INSERT INTO penilaian (kode_guru, kode_kriteria, tanggal_penilaian, nilai) 
           VALUES (?, ?, ?, ?) 
           ON DUPLICATE KEY UPDATE nilai = VALUES(nilai)`,
          [targetId, kodeKriteria, targetTanggal, numericVal]
        );
      }
    }

    res.json({
      success: true,
      message: `Nilai guru '${targetId}' untuk tanggal '${targetTanggal}' berhasil disimpan ke MySQL`
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

// 4. POST /api/penilaian/batch - Simpan seluruh matriks penilaian untuk tanggal tertentu
router.post('/batch', async (req, res) => {
  const { penilaianMap, tanggal_penilaian, tanggal } = req.body;

  let targetTanggal = (tanggal_penilaian || tanggal || '').trim();
  if (!targetTanggal) {
    targetTanggal = await getActiveTanggal();
  }

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
          if (!isNaN(numericVal) && numericVal >= 0 && numericVal <= 100) {
            await pool.query(
              `INSERT INTO penilaian (kode_guru, kode_kriteria, tanggal_penilaian, nilai) 
               VALUES (?, ?, ?, ?) 
               ON DUPLICATE KEY UPDATE nilai = VALUES(nilai)`,
              [kodeGuru, kodeKriteria, targetTanggal, numericVal]
            );
          }
        }
      }
    }

    res.json({
      success: true,
      message: `Seluruh data penilaian untuk tanggal '${targetTanggal}' berhasil disimpan ke MySQL`
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

// 5. POST /api/penilaian/tanggal - Ubah tanggal evaluasi dan ambil data penilaian untuk tanggal baru
router.post('/tanggal', async (req, res) => {
  const { tanggal } = req.body;
  if (!tanggal) {
    return res.status(400).json({
      success: false,
      message: 'Tanggal evaluasi wajib diisi'
    });
  }

  try {
    // 1. Simpan tanggal aktif di pengaturan
    await pool.query(
      `INSERT INTO pengaturan (kunci, nilai) 
       VALUES ('tanggal_penilaian', ?) 
       ON DUPLICATE KEY UPDATE nilai = VALUES(nilai)`,
      [tanggal]
    );

    // 2. Ambil nilai yang sudah ada untuk tanggal baru ini
    const [rows] = await pool.query(
      'SELECT kode_guru, kode_kriteria, nilai FROM penilaian WHERE tanggal_penilaian = ?',
      [tanggal]
    );

    const penilaianMap = {};
    rows.forEach((r) => {
      if (!penilaianMap[r.kode_guru]) {
        penilaianMap[r.kode_guru] = {};
      }
      penilaianMap[r.kode_guru][r.kode_kriteria] = Number(r.nilai);
    });

    res.json({
      success: true,
      message: `Tanggal evaluasi diubah ke '${tanggal}'. Nilai tanggal sebelumnya tetap aman tersimpan.`,
      data: {
        tanggalPenilaian: tanggal,
        penilaianMap,
        totalTersimpan: rows.length
      }
    });
  } catch (error) {
    console.error('Error POST /api/penilaian/tanggal:', error.message);
    res.status(500).json({
      success: false,
      message: 'Gagal mengubah tanggal evaluasi',
      error: error.message
    });
  }
});

// 6. DELETE /api/penilaian/:id - Hapus nilai seorang guru
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { tanggal } = req.query;

  try {
    if (tanggal) {
      await pool.query(
        'DELETE FROM penilaian WHERE kode_guru = ? AND tanggal_penilaian = ?',
        [id, tanggal]
      );
    } else {
      await pool.query('DELETE FROM penilaian WHERE kode_guru = ?', [id]);
    }

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

export default router;
