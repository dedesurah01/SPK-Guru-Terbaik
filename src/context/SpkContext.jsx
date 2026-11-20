import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { KRITERIA_SIMULASI, GURU_SIMULASI, NILAI_SIMULASI_DEFAULT } from '../data/simulationData';
import { calculateSaw } from '../utils/sawCalculation';
import { 
  checkApiHealth, 
  fetchGuruFromDb, 
  createGuruInDb, 
  updateGuruInDb, 
  deleteGuruFromDb,
  fetchPenilaianFromDb,
  saveGuruScoresInDb,
  saveBatchPenilaianInDb,
  saveTanggalPenilaianInDb,
  deleteGuruScoresFromDb,
  fetchKriteriaFromDb,
  updateKriteriaInDb,
  resetKriteriaInDb
} from '../services/api';

const SpkContext = createContext();

const STORAGE_KEY_GURU = 'spk_nf_guru_master_v2';
const STORAGE_KEY_KRITERIA = 'spk_nf_kriteria_master';
const STORAGE_KEY_PENILAIAN = 'spk_nf_penilaian_master_v2';
const STORAGE_KEY_TANGGAL_PENILAIAN = 'spk_nf_tanggal_penilaian_v2';
const STORAGE_KEY_PENILAIAN_BY_DATE = 'spk_nf_penilaian_by_date_v2';

export function SpkProvider({ children }) {
  // Initialize Guru Data
  const [guruList, setGuruList] = useState(() => {
    try {
      // Clear legacy dummy cache if present
      if (typeof window !== 'undefined' && window.localStorage) {
        if (localStorage.getItem('spk_nf_guru_master')) {
          localStorage.removeItem('spk_nf_guru_master');
          localStorage.removeItem('spk_nf_penilaian_master');
        }
      }
      const saved = localStorage.getItem(STORAGE_KEY_GURU);
      return saved ? JSON.parse(saved) : GURU_SIMULASI;
    } catch {
      return GURU_SIMULASI;
    }
  });

  // Initialize Evaluation Date (Default: 2026-11-06 atau yang tersimpan)
  const [tanggalPenilaian, setTanggalPenilaian] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TANGGAL_PENILAIAN);
      return saved || '2026-11-06';
    } catch {
      return '2026-11-06';
    }
  });

  // Multi-date Penilaian History Map: { [tanggal]: { [guruId]: { [kriteriaKode]: number } } }
  const [penilaianHistory, setPenilaianHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PENILAIAN_BY_DATE);
      if (saved) return JSON.parse(saved);
      const legacy = localStorage.getItem(STORAGE_KEY_PENILAIAN);
      const parsedLegacy = legacy ? JSON.parse(legacy) : NILAI_SIMULASI_DEFAULT;
      return {
        '2026-11-06': parsedLegacy
      };
    } catch {
      return { '2026-11-06': NILAI_SIMULASI_DEFAULT };
    }
  });

  // Initialize Kriteria Data
  const [kriteriaList, setKriteriaList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_KRITERIA);
      return saved ? JSON.parse(saved) : KRITERIA_SIMULASI;
    } catch {
      return KRITERIA_SIMULASI;
    }
  });

  // Initialize Penilaian Map: { [guruId]: { [kriteriaKode]: number } }
  // Otomatis disesuaikan dengan tanggal aktif: jika tanggal belum pernah dinilai, nilai kosong ({})
  const [penilaianMap, setPenilaianMap] = useState(() => {
    try {
      const savedDate = localStorage.getItem(STORAGE_KEY_TANGGAL_PENILAIAN) || '2026-11-06';
      const historyStr = localStorage.getItem(STORAGE_KEY_PENILAIAN_BY_DATE);
      if (historyStr) {
        const history = JSON.parse(historyStr);
        if (history && history[savedDate]) {
          return history[savedDate];
        }
      }
      const savedSingle = localStorage.getItem(STORAGE_KEY_PENILAIAN);
      return savedSingle ? JSON.parse(savedSingle) : (savedDate === '2026-11-06' ? NILAI_SIMULASI_DEFAULT : {});
    } catch {
      return NILAI_SIMULASI_DEFAULT;
    }
  });

  // Database Connection State
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [isLoadingGuru, setIsLoadingGuru] = useState(false);

  // Fetch Guru & Penilaian dari MySQL Backend
  const refreshGuruFromDb = useCallback(async (targetDate) => {
    setIsLoadingGuru(true);
    try {
      const isOnline = await checkApiHealth();
      if (isOnline) {
        setIsDbConnected(true);
        // 1. Ambil data guru dari MySQL
        const dataFromDb = await fetchGuruFromDb();
        setGuruList(dataFromDb);

        // 2. Ambil data kriteria dari MySQL
        try {
          const kriteriaFromDb = await fetchKriteriaFromDb();
          if (kriteriaFromDb && kriteriaFromDb.length > 0) {
            setKriteriaList(kriteriaFromDb);
            localStorage.setItem(STORAGE_KEY_KRITERIA, JSON.stringify(kriteriaFromDb));
          }
        } catch (critErr) {
          console.warn('Gagal memuat kriteria dari MySQL:', critErr);
        }

        // 3. Ambil data penilaian & tanggal evaluasi dari MySQL
        const { penilaianMap: dbPenilaian, tanggalPenilaian: dbTanggal } = await fetchPenilaianFromDb(targetDate);
        
        const activeDate = targetDate || dbTanggal || '2026-11-06';
        if (dbTanggal) {
          setTanggalPenilaian(dbTanggal);
          localStorage.setItem(STORAGE_KEY_TANGGAL_PENILAIAN, dbTanggal);
        }

        const loadedScores = dbPenilaian || {};
        setPenilaianMap(loadedScores);
        localStorage.setItem(STORAGE_KEY_PENILAIAN, JSON.stringify(loadedScores));

        setPenilaianHistory((prev) => {
          const updated = { ...prev, [activeDate]: loadedScores };
          localStorage.setItem(STORAGE_KEY_PENILAIAN_BY_DATE, JSON.stringify(updated));
          return updated;
        });

        return { success: true, count: dataFromDb.length };
      } else {
        setIsDbConnected(false);
        return { success: false, reason: 'offline' };
      }
    } catch (err) {
      console.warn('Gagal memuat data dari database MySQL:', err);
      setIsDbConnected(false);
      return { success: false, error: err.message };
    } finally {
      setIsLoadingGuru(false);
    }
  }, []);

  // Sync saat pertama kali aplikasi dimuat
  useEffect(() => {
    refreshGuruFromDb();
  }, [refreshGuruFromDb]);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_GURU, JSON.stringify(guruList));
    } catch (e) {
      console.warn('Gagal menyimpan guru ke localStorage:', e);
    }
  }, [guruList]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_KRITERIA, JSON.stringify(kriteriaList));
    } catch (e) {
      console.warn('Gagal menyimpan kriteria ke localStorage:', e);
    }
  }, [kriteriaList]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PENILAIAN, JSON.stringify(penilaianMap));
    } catch (e) {
      console.warn('Gagal menyimpan penilaian ke localStorage:', e);
    }
  }, [penilaianMap]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TANGGAL_PENILAIAN, tanggalPenilaian);
    } catch (e) {
      console.warn('Gagal menyimpan tanggal penilaian ke localStorage:', e);
    }
  }, [tanggalPenilaian]);

  // Operations: Guru (dengan dukungan MySQL API & fallback)
  const addGuru = async (newGuru) => {
    if (isDbConnected) {
      try {
        const savedGuru = await createGuruInDb(newGuru);
        setGuruList((prev) => [...prev, savedGuru]);
        return savedGuru;
      } catch (err) {
        console.error('Gagal simpan guru ke DB, fallback ke local:', err);
        setGuruList((prev) => [...prev, newGuru]);
        throw err;
      }
    } else {
      setGuruList((prev) => [...prev, newGuru]);
      return newGuru;
    }
  };

  const updateGuru = async (id, updatedData) => {
    if (isDbConnected) {
      try {
        const savedGuru = await updateGuruInDb(id, updatedData);
        setGuruList((prev) =>
          prev.map((g) => (g.id === id || g.kode_guru === id ? { ...g, ...savedGuru } : g))
        );
        return savedGuru;
      } catch (err) {
        console.error('Gagal update guru ke DB, fallback ke local:', err);
        setGuruList((prev) =>
          prev.map((g) => (g.id === id ? { ...g, ...updatedData } : g))
        );
        throw err;
      }
    } else {
      setGuruList((prev) =>
        prev.map((g) => (g.id === id ? { ...g, ...updatedData } : g))
      );
    }
  };

  const deleteGuru = async (id) => {
    if (isDbConnected) {
      try {
        await deleteGuruFromDb(id);
        await deleteGuruScoresFromDb(id);
      } catch (err) {
        console.error('Gagal hapus guru dari DB:', err);
      }
    }
    setGuruList((prev) => prev.filter((g) => g.id !== id && g.kode_guru !== id));
    setPenilaianMap((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const resetGuruToDefault = () => {
    setGuruList(GURU_SIMULASI);
  };

  // Operations: Kriteria (Sinkron ke MySQL & Local)
  const updateKriteria = async (kode, updatedData) => {
    setKriteriaList((prev) =>
      prev.map((k) => (k.kode === kode ? { ...k, ...updatedData } : k))
    );

    if (isDbConnected) {
      try {
        await updateKriteriaInDb(kode, updatedData);
      } catch (err) {
        console.warn('Gagal menyimpan perubahan kriteria ke MySQL:', err);
      }
    }
  };

  const resetKriteriaToDefault = async () => {
    setKriteriaList(KRITERIA_SIMULASI);
    if (isDbConnected) {
      try {
        const fresh = await resetKriteriaInDb();
        if (fresh && fresh.length > 0) {
          setKriteriaList(fresh);
        }
      } catch (err) {
        console.warn('Gagal mereset kriteria di MySQL:', err);
      }
    }
  };

  // Operations: Penilaian Guru (Sinkron ke MySQL & Local per Tanggal Evaluasi)
  const setGuruScores = async (guruId, scores) => {
    const updatedGuruScores = {
      ...(penilaianMap[guruId] || {}),
      ...scores
    };
    const nextMap = {
      ...penilaianMap,
      [guruId]: updatedGuruScores
    };

    setPenilaianMap(nextMap);
    try {
      localStorage.setItem(STORAGE_KEY_PENILAIAN, JSON.stringify(nextMap));
    } catch (e) {
      console.warn('Gagal menyimpan penilaian aktif ke localStorage:', e);
    }

    // Perbarui riwayat untuk tanggal aktif
    setPenilaianHistory((prev) => {
      const updated = {
        ...prev,
        [tanggalPenilaian]: nextMap
      };
      try {
        localStorage.setItem(STORAGE_KEY_PENILAIAN_BY_DATE, JSON.stringify(updated));
      } catch (e) {
        console.warn('Gagal menyimpan riwayat tanggal ke localStorage:', e);
      }
      return updated;
    });

    if (isDbConnected) {
      try {
        await saveGuruScoresInDb(guruId, scores, tanggalPenilaian);
      } catch (err) {
        console.warn('Gagal menyimpan nilai guru ke MySQL:', err);
        throw err;
      }
    }
  };

  const fillDefaultScores = async (guruId) => {
    const defaultScores = {};
    kriteriaList.forEach((k) => {
      defaultScores[k.kode] = 80;
    });
    await setGuruScores(guruId, defaultScores);
  };

  // Mengubah tanggal evaluasi:
  // - Nilai tanggal sebelumnya otomatis tersimpan
  // - Nilai untuk tanggal baru otomatis kosong ({}) jika belum pernah diinput
  const updateTanggalPenilaian = async (newDate) => {
    if (!newDate || newDate === tanggalPenilaian) return;

    // 1. Simpan nilai tanggal saat ini ke histori lokal
    const currentScores = { ...penilaianMap };
    setPenilaianHistory((prev) => {
      const updated = {
        ...prev,
        [tanggalPenilaian]: currentScores
      };
      try {
        localStorage.setItem(STORAGE_KEY_PENILAIAN_BY_DATE, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });

    // 2. Set tanggal penilaian aktif yang baru
    setTanggalPenilaian(newDate);
    localStorage.setItem(STORAGE_KEY_TANGGAL_PENILAIAN, newDate);

    // 3. Muat nilai untuk tanggal baru
    if (isDbConnected) {
      try {
        const result = await saveTanggalPenilaianInDb(newDate);
        const newMap = result?.data?.penilaianMap || {};
        setPenilaianMap(newMap);
        localStorage.setItem(STORAGE_KEY_PENILAIAN, JSON.stringify(newMap));

        setPenilaianHistory((prev) => {
          const updated = { ...prev, [newDate]: newMap };
          try {
            localStorage.setItem(STORAGE_KEY_PENILAIAN_BY_DATE, JSON.stringify(updated));
          } catch (e) {
            console.warn(e);
          }
          return updated;
        });
      } catch (err) {
        console.warn('Gagal mengambil data penilaian tanggal baru dari MySQL:', err);
        const fallbackMap = penilaianHistory[newDate] || {};
        setPenilaianMap(fallbackMap);
        localStorage.setItem(STORAGE_KEY_PENILAIAN, JSON.stringify(fallbackMap));
      }
    } else {
      const fallbackMap = penilaianHistory[newDate] || {};
      setPenilaianMap(fallbackMap);
      localStorage.setItem(STORAGE_KEY_PENILAIAN, JSON.stringify(fallbackMap));
    }
  };

  const resetPenilaianToDefault = async () => {
    setPenilaianMap(NILAI_SIMULASI_DEFAULT);
    localStorage.setItem(STORAGE_KEY_PENILAIAN, JSON.stringify(NILAI_SIMULASI_DEFAULT));

    setPenilaianHistory((prev) => {
      const updated = {
        ...prev,
        [tanggalPenilaian]: NILAI_SIMULASI_DEFAULT
      };
      try {
        localStorage.setItem(STORAGE_KEY_PENILAIAN_BY_DATE, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });

    if (isDbConnected) {
      try {
        await saveBatchPenilaianInDb(NILAI_SIMULASI_DEFAULT, tanggalPenilaian);
      } catch (err) {
        console.warn('Gagal reset nilai ke database MySQL:', err);
      }
    }
  };

  // Derived calculations: Total Bobot & Normalisasi Bobot (w_j)
  const totalBobot = kriteriaList.reduce((acc, k) => acc + (Number(k.bobot) || 0), 0);
  
  const kriteriaWithNormalizedWeights = kriteriaList.map((k) => {
    const rawBobot = Number(k.bobot) || 0;
    const w_j = totalBobot > 0 ? (rawBobot / totalBobot) : 0;
    return {
      ...k,
      rawBobot,
      normalizedWeight: Number(w_j.toFixed(4)),
      percentNormalized: (w_j * 100).toFixed(1) + '%'
    };
  });

  // Completeness check
  const isGuruComplete = (guruId) => {
    const scores = penilaianMap[guruId];
    if (!scores) return false;
    return kriteriaList.length > 0 && kriteriaList.every((k) => {
      const val = scores[k.kode];
      return val !== undefined && val !== null && val !== '' && !isNaN(val) && Number(val) >= 0 && Number(val) <= 100;
    });
  };

  const completedGuruCount = guruList.filter((g) => isGuruComplete(g.id)).length;
  const totalGuruCount = guruList.length;
  const isAllComplete = totalGuruCount > 0 && completedGuruCount === totalGuruCount;
  const completenessPercentage = totalGuruCount > 0 ? Math.round((completedGuruCount / totalGuruCount) * 100) : 0;

  // Real-time SAW calculation
  const sawResults = useMemo(() => {
    return calculateSaw(guruList, kriteriaWithNormalizedWeights, penilaianMap);
  }, [guruList, kriteriaWithNormalizedWeights, penilaianMap]);

  const value = {
    guruList,
    kriteriaList: kriteriaWithNormalizedWeights,
    penilaianMap,
    totalBobot,
    tanggalPenilaian,
    setTanggalPenilaian: updateTanggalPenilaian,
    sawResults,
    isDbConnected,
    isLoadingGuru,
    refreshGuruFromDb,
    addGuru,
    updateGuru,
    deleteGuru,
    resetGuruToDefault,
    updateKriteria,
    resetKriteriaToDefault,
    setGuruScores,
    fillDefaultScores,
    resetPenilaianToDefault,
    isGuruComplete,
    completeness: {
      totalGuruCount,
      completedGuruCount,
      incompleteCount: totalGuruCount - completedGuruCount,
      percentage: completenessPercentage,
      isAllComplete
    }
  };

  return <SpkContext.Provider value={value}>{children}</SpkContext.Provider>;
}

export function useSpk() {
  const context = useContext(SpkContext);
  if (!context) {
    throw new Error('useSpk harus digunakan di dalam SpkProvider');
  }
  return context;
}
