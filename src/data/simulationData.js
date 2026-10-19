/**
 * SIMULATION DATA — DATA CONTOH AWAL (PHASE 1)
 * PERINGATAN: Seluruh data di bawah ini adalah data simulasi semata
 * untuk keperluan visualisasi fondasi UI pada Phase 1.
 */

export const SIMULATION_METADATA = {
  isSimulated: true,
  label: "DATA SIMULASI — CONTOH AWAL",
  description: "Data contoh untuk keperluan demonstrasi visualisasi fondasi antarmuka Phase 1."
};

export const KRITERIA_SIMULASI = [
  { kode: "C1", nama: "Kehadiran", bobot: 10, jenis: "Benefit", keterangan: "Persentase kehadiran tatap muka & daring" },
  { kode: "C2", nama: "Kedisiplinan", bobot: 10, jenis: "Benefit", keterangan: "Ketepatan waktu memulai & menyelesaikan KBM" },
  { kode: "C3", nama: "Kualitas Mengajar", bobot: 10, jenis: "Benefit", keterangan: "Metode penyampaian & interaksi dengan siswa" },
  { kode: "C4", nama: "Penguasaan Materi", bobot: 40, jenis: "Benefit", keterangan: "Kedalaman & pemahaman kurikulum bimbingan belajar" },
  { kode: "C5", nama: "Persiapan Mengajar", bobot: 8, jenis: "Benefit", keterangan: "Kelengkapan modul, silabus & latihan soal" },
  { kode: "C6", nama: "Kemampuan Komunikasi", bobot: 8, jenis: "Benefit", keterangan: "Komunikasi persuasif dengan siswa & orang tua" },
  { kode: "C7", nama: "Pengelolaan Kelas", bobot: 7, jenis: "Benefit", keterangan: "Kondusivitas & keterlibatan aktif kelas" },
  { kode: "C8", nama: "Hasil Belajar Siswa", bobot: 7, jenis: "Benefit", keterangan: "Rata-rata peningkatan nilai try out / evaluasi siswa" },
];

export const GURU_SIMULASI = [
  { id: "G-001", nama: "Ahmad Fauzi, M.Pd.", mapel: "Matematika Saintek", status: "Aktif", pengalaman: "6 Tahun" },
  { id: "G-002", nama: "Siti Nurhaliza, S.Si.", mapel: "Fisika", status: "Aktif", pengalaman: "4 Tahun" },
  { id: "G-003", nama: "Budi Santoso, S.Pd.", mapel: "Kimia", status: "Aktif", pengalaman: "5 Tahun" },
  { id: "G-004", nama: "Dewi Lestari, S.S.", mapel: "Bahasa Inggris", status: "Aktif", pengalaman: "3 Tahun" },
  { id: "G-005", nama: "Rizky Pratama, M.Kom.", mapel: "Biologi & TPS", status: "Aktif", pengalaman: "4 Tahun" },
];

export const RANKING_SIMULASI = [
  { rank: 1, kodeGuru: "G-001", nama: "Ahmad Fauzi, M.Pd.", mapel: "Matematika Saintek", skor: 0.942, status: "Sangat Direkomendasikan" },
  { rank: 2, kodeGuru: "G-002", nama: "Siti Nurhaliza, S.Si.", mapel: "Fisika", skor: 0.885, status: "Direkomendasikan" },
  { rank: 3, kodeGuru: "G-005", nama: "Rizky Pratama, M.Kom.", mapel: "Biologi & TPS", skor: 0.834, status: "Direkomendasikan" },
  { rank: 4, kodeGuru: "G-003", nama: "Budi Santoso, S.Pd.", mapel: "Kimia", skor: 0.795, status: "Cukup" },
  { rank: 5, kodeGuru: "G-004", nama: "Dewi Lestari, S.S.", mapel: "Bahasa Inggris", skor: 0.748, status: "Cukup" },
];

export const WORKFLOW_STEPS = [
  { step: 1, name: "Data Guru", status: "completed", desc: "Data master pengajar NF" },
  { step: 2, name: "Kriteria & Bobot", status: "completed", desc: "8 Kriteria standar (100% bobot)" },
  { step: 3, name: "Penilaian Guru", status: "active", desc: "Input evaluasi kinerja" },
  { step: 4, name: "Perhitungan SAW", status: "pending", desc: "Normalisasi matriks & preferensi" },
  { step: 5, name: "Hasil & Laporan", status: "pending", desc: "Peringkat & unduh laporan" },
];

export const NILAI_SIMULASI_DEFAULT = {
  "G-001": { C1: 95, C2: 92, C3: 94, C4: 98, C5: 90, C6: 92, C7: 88, C8: 94 },
  "G-002": { C1: 90, C2: 88, C3: 90, C4: 90, C5: 86, C6: 88, C7: 85, C8: 88 },
  "G-003": { C1: 85, C2: 82, C3: 80, C4: 82, C5: 78, C6: 80, C7: 76, C8: 78 },
  "G-004": { C1: 80, C2: 78, C3: 75, C4: 76, C5: 74, C6: 78, C7: 72, C8: 75 },
  "G-005": { C1: 88, C2: 86, C3: 85, C4: 86, C5: 82, C6: 85, C7: 80, C8: 82 }
};
