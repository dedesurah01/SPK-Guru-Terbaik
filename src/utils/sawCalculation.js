/**
 * sawCalculation.js
 * Utilitas murni untuk implementasi algoritma Simple Additive Weighting (SAW)
 * Sesuai aturan matematis pada PRD SOT SPK Guru Terbaik Nurul Fikri.
 */

/**
 * Menghitung seluruh tahapan SAW secara transparan dan terstruktur
 * @param {Array} guruList - Daftar guru alternatif
 * @param {Array} kriteriaList - Daftar kriteria dengan bobot dan jenis (Benefit/Cost)
 * @param {Object} penilaianMap - Peta nilai { [guruId]: { [kriteriaKode]: number } }
 * @returns {Object} Hasil perhitungan SAW per tahap
 */
export function calculateSaw(guruList, kriteriaList, penilaianMap) {
  // 1. Validasi Input Dasar
  if (!guruList || guruList.length === 0) {
    return {
      isValid: false,
      error: 'Data guru masih kosong. Tambahkan guru terlebih dahulu.',
      stage: 'validation'
    };
  }

  if (!kriteriaList || kriteriaList.length === 0) {
    return {
      isValid: false,
      error: 'Data kriteria masih kosong. Tentukan kriteria terlebih dahulu.',
      stage: 'validation'
    };
  }

  // Periksa total bobot
  const totalBobot = kriteriaList.reduce((acc, k) => acc + (Number(k.bobot) || 0), 0);
  if (totalBobot <= 0) {
    return {
      isValid: false,
      error: 'Total bobot kriteria harus lebih dari 0.',
      stage: 'validation'
    };
  }

  // Periksa kelengkapan nilai untuk setiap guru
  const incompleteGurus = [];
  guruList.forEach((guru) => {
    const scores = penilaianMap[guru.id] || {};
    const missingKriteria = kriteriaList.filter((k) => {
      const val = scores[k.kode];
      return val === undefined || val === null || val === '' || isNaN(val);
    });
    if (missingKriteria.length > 0) {
      incompleteGurus.push({
        guru,
        missingKriteria: missingKriteria.map((k) => k.kode)
      });
    }
  });

  if (incompleteGurus.length > 0) {
    return {
      isValid: false,
      error: `Terdapat ${incompleteGurus.length} guru dengan nilai belum lengkap. Seluruh nilai kriteria harus diisi untuk membentuk Matriks Keputusan X.`,
      incompleteGurus,
      stage: 'data_completeness'
    };
  }

  // 2. Tahap 1: Matriks Keputusan (X)
  // X = [x_ij]
  const decisionMatrix = guruList.map((guru) => {
    const scores = penilaianMap[guru.id];
    const row = {};
    kriteriaList.forEach((k) => {
      row[k.kode] = Number(scores[k.kode]);
    });
    return {
      guruId: guru.id,
      guruNama: guru.nama,
      guruMapel: guru.mapel,
      values: row
    };
  });

  // Cari Max dan Min per kriteria
  const criteriaExtremes = {};
  kriteriaList.forEach((k) => {
    const columnValues = decisionMatrix.map((row) => row.values[k.kode]);
    const maxVal = Math.max(...columnValues);
    const minVal = Math.min(...columnValues);
    criteriaExtremes[k.kode] = {
      max: maxVal,
      min: minVal,
      jenis: k.jenis || 'Benefit'
    };
  });

  // 3. Tahap 2: Normalisasi Matriks (R)
  // Benefit: r_ij = x_ij / max(x_j)
  // Cost: r_ij = min(x_j) / x_ij
  const normalizedMatrix = decisionMatrix.map((row) => {
    const normalizedRow = {};
    kriteriaList.forEach((k) => {
      const x_ij = row.values[k.kode];
      const { max, min, jenis } = criteriaExtremes[k.kode];
      let r_ij = 0;

      if (jenis === 'Benefit') {
        r_ij = max > 0 ? x_ij / max : 0;
      } else {
        // Cost (dengan pencegahan pembagian dengan nol)
        r_ij = x_ij > 0 ? min / x_ij : 0;
      }

      normalizedRow[k.kode] = {
        raw: x_ij,
        normalized: Number(r_ij.toFixed(4)),
        formula: jenis === 'Benefit' ? `${x_ij} / ${max}` : `${min} / ${x_ij}`
      };
    });

    return {
      guruId: row.guruId,
      guruNama: row.guruNama,
      guruMapel: row.guruMapel,
      normalizedValues: normalizedRow
    };
  });

  // 4. Tahap 3: Bobot Ternormalisasi (W)
  // w_j = bobot_j / total_bobot
  const weights = {};
  kriteriaList.forEach((k) => {
    const rawBobot = Number(k.bobot) || 0;
    const w_j = totalBobot > 0 ? rawBobot / totalBobot : 0;
    weights[k.kode] = {
      rawBobot,
      w_j: Number(w_j.toFixed(4)),
      percent: (w_j * 100).toFixed(1) + '%'
    };
  });

  // 5. Tahap 4: Nilai Preferensi (V_i)
  // V_i = sum(w_j * r_ij)
  const preferenceScores = normalizedMatrix.map((row) => {
    let totalScore = 0;
    const breakdown = {};

    kriteriaList.forEach((k) => {
      const r_ij = row.normalizedValues[k.kode].normalized;
      const w_j = weights[k.kode].w_j;
      const weightedScore = r_ij * w_j;
      totalScore += weightedScore;

      breakdown[k.kode] = {
        r_ij,
        w_j,
        weightedScore: Number(weightedScore.toFixed(4))
      };
    });

    return {
      guruId: row.guruId,
      guruNama: row.guruNama,
      guruMapel: row.guruMapel,
      preferenceScore: Number(totalScore.toFixed(4)),
      breakdown
    };
  });

  // Urutkan nilai preferensi V_i dari tertinggi ke terendah
  const sortedRankings = [...preferenceScores]
    .sort((a, b) => b.preferenceScore - a.preferenceScore)
    .map((item, index) => {
      let recommendationStatus = 'Direkomendasikan';
      if (index === 0) recommendationStatus = 'Sangat Direkomendasikan (Peringkat 1)';
      else if (index <= 2) recommendationStatus = 'Direkomendasikan (Top 3)';
      else recommendationStatus = 'Cukup';

      return {
        ...item,
        rank: index + 1,
        recommendationStatus
      };
    });

  return {
    isValid: true,
    guruCount: guruList.length,
    kriteriaCount: kriteriaList.length,
    decisionMatrix,
    criteriaExtremes,
    normalizedMatrix,
    weights,
    preferenceScores,
    sortedRankings
  };
}
