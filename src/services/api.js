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
        status: guruData.status || 'Aktif'
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
        status: guruData.status
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

