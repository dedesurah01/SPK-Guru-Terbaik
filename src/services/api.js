// API Client untuk SPK Guru Nurul Fikri
// Menghubungkan Frontend React ke Express.js Backend & MySQL

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Cek apakah server backend dan database aktif
 */
export async function checkApiHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE_URL}/health`, { signal: controller.signal });
    clearTimeout(timeoutId);
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Mengambil semua data guru dari database MySQL
 */
export async function fetchGuruFromDb() {
  try {
    const res = await fetch(`${API_BASE_URL}/guru`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const result = await res.json();
    return result.data || [];
  } catch (error) {
    console.warn('[API] Gagal mengambil data guru dari MySQL backend:', error.message);
    throw error;
  }
}

/**
 * Menambahkan data guru baru ke database MySQL
 */
export async function createGuruInDb(guruData) {
  try {
    const res = await fetch(`${API_BASE_URL}/guru`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        kode_guru: guruData.id || guruData.kode_guru,
        nama_guru: guruData.nama,
        mata_pelajaran: guruData.mapel,
        pengalaman: guruData.pengalaman || '3 Tahun',
        status: guruData.status || 'Aktif',
        tanggalBergabung: guruData.tanggalBergabung
      })
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Gagal menambahkan guru ke database');
    }
    return result.data;
  } catch (error) {
    console.error('[API] Error createGuruInDb:', error);
    throw error;
  }
}

/**
 * Memperbarui data guru di database MySQL
 */
export async function updateGuruInDb(id, guruData) {
  try {
    const res = await fetch(`${API_BASE_URL}/guru/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nama_guru: guruData.nama,
        mata_pelajaran: guruData.mapel,
        pengalaman: guruData.pengalaman,
        status: guruData.status,
        tanggalBergabung: guruData.tanggalBergabung
      })
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Gagal memperbarui data guru di database');
    }
    return result.data;
  } catch (error) {
    console.error(`[API] Error updateGuruInDb (${id}):`, error);
    throw error;
  }
}

/**
 * Menghapus data guru dari database MySQL
 */
export async function deleteGuruFromDb(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/guru/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Gagal menghapus data guru dari database');
    }
    return result;
  } catch (error) {
    console.error(`[API] Error deleteGuruFromDb (${id}):`, error);
    throw error;
  }
}

/**
 * Mengambil data nilai penilaian dan tanggal evaluasi dari MySQL
 * @param {string} [tanggal] - Opsional: filter berdasarkan tanggal YYYY-MM-DD
 */
export async function fetchPenilaianFromDb(tanggal) {
  try {
    const url = tanggal 
      ? `${API_BASE_URL}/penilaian?tanggal=${encodeURIComponent(tanggal)}` 
      : `${API_BASE_URL}/penilaian`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const result = await res.json();
    return result.data || { penilaianMap: {}, tanggalPenilaian: null };
  } catch (error) {
    console.warn('[API] Gagal mengambil data penilaian dari MySQL backend:', error.message);
    throw error;
  }
}

/**
 * Menyimpan nilai seorang guru ke database MySQL untuk tanggal tertentu
 * @param {string} kodeGuru - ID / Kode Guru
 * @param {Object} scores - Peta nilai kriteria { C1: 80, C2: 90, ... }
 * @param {string} [tanggal] - Tanggal evaluasi (opsional, default aktif)
 */
export async function saveGuruScoresInDb(kodeGuru, scores, tanggal) {
  try {
    const res = await fetch(`${API_BASE_URL}/penilaian`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        kode_guru: kodeGuru,
        scores,
        tanggal_penilaian: tanggal
      })
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Gagal menyimpan nilai guru ke database');
    }
    return result;
  } catch (error) {
    console.error(`[API] Error saveGuruScoresInDb (${kodeGuru}):`, error);
    throw error;
  }
}

/**
 * Menyimpan seluruh matriks penilaian (batch) ke MySQL untuk tanggal tertentu
 * @param {Object} penilaianMap - Peta seluruh penilaian { [guruId]: { [kriteria]: score } }
 * @param {string} [tanggal] - Tanggal evaluasi
 */
export async function saveBatchPenilaianInDb(penilaianMap, tanggal) {
  try {
    const res = await fetch(`${API_BASE_URL}/penilaian/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        penilaianMap,
        tanggal_penilaian: tanggal
      })
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Gagal menyimpan batch penilaian ke database');
    }
    return result;
  } catch (error) {
    console.error('[API] Error saveBatchPenilaianInDb:', error);
    throw error;
  }
}

/**
 * Menyimpan tanggal evaluasi ke database MySQL
 */
export async function saveTanggalPenilaianInDb(tanggal) {
  try {
    const res = await fetch(`${API_BASE_URL}/penilaian/tanggal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tanggal })
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Gagal menyimpan tanggal evaluasi');
    }
    return result;
  } catch (error) {
    console.error('[API] Error saveTanggalPenilaianInDb:', error);
    throw error;
  }
}

/**
 * Menghapus nilai guru dari database MySQL (opsional filter per tanggal)
 */
export async function deleteGuruScoresFromDb(kodeGuru, tanggal) {
  try {
    const url = tanggal
      ? `${API_BASE_URL}/penilaian/${encodeURIComponent(kodeGuru)}?tanggal=${encodeURIComponent(tanggal)}`
      : `${API_BASE_URL}/penilaian/${encodeURIComponent(kodeGuru)}`;
    const res = await fetch(url, {
      method: 'DELETE'
    });
    return await res.json();
  } catch (error) {
    console.error(`[API] Error deleteGuruScoresFromDb (${kodeGuru}):`, error);
  }
}

/**
 * Mengambil seluruh data kriteria evaluasi dari database MySQL
 */
export async function fetchKriteriaFromDb() {
  try {
    const res = await fetch(`${API_BASE_URL}/kriteria`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const result = await res.json();
    return result.data || [];
  } catch (error) {
    console.warn('[API] Gagal mengambil data kriteria dari MySQL backend:', error.message);
    throw error;
  }
}

/**
 * Memperbarui data kriteria dan bobot di database MySQL
 */
export async function updateKriteriaInDb(kode, kriteriaData) {
  try {
    const res = await fetch(`${API_BASE_URL}/kriteria/${encodeURIComponent(kode)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nama: kriteriaData.nama,
        bobot: kriteriaData.bobot,
        jenis: kriteriaData.jenis,
        keterangan: kriteriaData.keterangan
      })
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Gagal memperbarui kriteria di database');
    }
    return result.data;
  } catch (error) {
    console.error(`[API] Error updateKriteriaInDb (${kode}):`, error);
    throw error;
  }
}

/**
 * Mereset seluruh kriteria dan bobot ke standar default PRD di database MySQL
 */
export async function resetKriteriaInDb() {
  try {
    const res = await fetch(`${API_BASE_URL}/kriteria/reset`, {
      method: 'POST'
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Gagal mereset kriteria di database');
    }
    return result.data;
  } catch (error) {
    console.error('[API] Error resetKriteriaInDb:', error);
    throw error;
  }
}

