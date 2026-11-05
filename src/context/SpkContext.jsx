import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { KRITERIA_SIMULASI, GURU_SIMULASI, NILAI_SIMULASI_DEFAULT } from '../data/simulationData';
import { calculateSaw } from '../utils/sawCalculation';
import { 
  checkApiHealth, 
  fetchGuruFromDb, 
  createGuruInDb, 
  updateGuruInDb, 
  deleteGuruFromDb 
} from '../services/api';

const SpkContext = createContext();

const STORAGE_KEY_GURU = 'spk_nf_guru_master_v2';
const STORAGE_KEY_KRITERIA = 'spk_nf_kriteria_master';
const STORAGE_KEY_PENILAIAN = 'spk_nf_penilaian_master_v2';
const STORAGE_KEY_TANGGAL_PENILAIAN = 'spk_nf_tanggal_penilaian_v2';

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

  // Initialize Evaluation Date (Default: Hari Ini)
  const [tanggalPenilaian, setTanggalPenilaian] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TANGGAL_PENILAIAN);
      return saved || new Date().toISOString().split('T')[0];
    } catch {
      return new Date().toISOString().split('T')[0];
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
  const [penilaianMap, setPenilaianMap] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PENILAIAN);
      return saved ? JSON.parse(saved) : NILAI_SIMULASI_DEFAULT;
    } catch {
      return NILAI_SIMULASI_DEFAULT;
    }
  });

  // Database Connection State
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [isLoadingGuru, setIsLoadingGuru] = useState(false);

  // Fetch Guru dari MySQL Backend
  const refreshGuruFromDb = useCallback(async () => {
    setIsLoadingGuru(true);
    try {
      const isOnline = await checkApiHealth();
      if (isOnline) {
        setIsDbConnected(true);
        const dataFromDb = await fetchGuruFromDb();
        setGuruList(dataFromDb);
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

  // Operations: Kriteria
  const updateKriteria = (kode, updatedData) => {
    setKriteriaList((prev) =>
      prev.map((k) => (k.kode === kode ? { ...k, ...updatedData } : k))
    );
  };

  const resetKriteriaToDefault = () => {
    setKriteriaList(KRITERIA_SIMULASI);
  };

  // Operations: Penilaian Guru
  const setGuruScores = (guruId, scores) => {
    setPenilaianMap((prev) => ({
      ...prev,
      [guruId]: {
        ...(prev[guruId] || {}),
        ...scores
      }
    }));
  };

  const fillDefaultScores = (guruId) => {
    const defaultScores = {};
    kriteriaList.forEach((k) => {
      defaultScores[k.kode] = 80;
    });
    setGuruScores(guruId, defaultScores);
  };

  const resetPenilaianToDefault = () => {
    setPenilaianMap(NILAI_SIMULASI_DEFAULT);
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
      return val !== undefined && val !== null && val !== '' && !isNaN(val) && Number(val) >= 0;
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
    setTanggalPenilaian,
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
