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

export const GURU_SIMULASI = [];

export const RANKING_SIMULASI = [];

export const WORKFLOW_STEPS = [
  { step: 1, name: "Data Guru", status: "completed", desc: "Data master pengajar NF" },
  { step: 2, name: "Kriteria & Bobot", status: "completed", desc: "8 Kriteria standar (100% bobot)" },
  { step: 3, name: "Penilaian Guru", status: "active", desc: "Input evaluasi kinerja" },
  { step: 4, name: "Perhitungan SAW", status: "pending", desc: "Normalisasi matriks & preferensi" },
  { step: 5, name: "Hasil & Laporan", status: "pending", desc: "Peringkat & unduh laporan" },
];

export const NILAI_SIMULASI_DEFAULT = {};
