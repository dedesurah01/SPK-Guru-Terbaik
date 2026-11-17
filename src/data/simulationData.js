/**
 * DATA MASTER GURU & PENILAIAN AWAL
 * Bimbingan Belajar Nurul Fikri
 */

export const SIMULATION_METADATA = {
  isSimulated: false,
  label: "DATA MASTER GURU NURUL FIKRI",
  description: "Data pengajar dan nilai evaluasi kinerja Bimbingan Belajar Nurul Fikri."
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
  {
    "id": "G-001",
    "nama": "AINI ALFATIAH",
    "mapel": "BAHASA INGGRIS",
    "pengalaman": "4 Tahun",
    "status": "Aktif",
    "tanggalBergabung": "2022-07-01"
  },
  {
    "id": "G-002",
    "nama": "AKHMAD FITRIADI",
    "mapel": "SEJARAH",
    "pengalaman": "11 Tahun",
    "status": "Aktif",
    "tanggalBergabung": "2015-05-10"
  },
  {
    "id": "G-003",
    "nama": "CAHYA SEPTIYANTI",
    "mapel": "KIMIA",
    "pengalaman": "10 Tahun",
    "status": "Aktif",
    "tanggalBergabung": "2016-08-08"
  },
  {
    "id": "G-004",
    "nama": "JAELANI SIDIK",
    "mapel": "BIP",
    "pengalaman": "10 Tahun",
    "status": "Aktif",
    "tanggalBergabung": "2016-07-10"
  },
  {
    "id": "G-005",
    "nama": "LALA MEIRANI",
    "mapel": "EKONOMI",
    "pengalaman": "5 Tahun",
    "status": "Aktif",
    "tanggalBergabung": "2016-07-10"
  },
  {
    "id": "G-006",
    "nama": "KUSUMAH ARSANUL ROKHMAN",
    "mapel": "GEOGRAFI",
    "pengalaman": "16 Tahun",
    "status": "Aktif",
    "tanggalBergabung": "2010-11-05"
  },
  {
    "id": "G-007",
    "nama": "M FAKIIH KURNIAWAN",
    "mapel": "KIMIA",
    "pengalaman": "10 Tahun",
    "status": "Aktif",
    "tanggalBergabung": "2016-03-18"
  },
  {
    "id": "G-008",
    "nama": "NOVI SELVIA",
    "mapel": "FISIKA",
    "pengalaman": "10 Tahun",
    "status": "Aktif",
    "tanggalBergabung": "2016-03-09"
  },
  {
    "id": "G-009",
    "nama": "RAHMAWATI SATAR",
    "mapel": "BAHASA INDONESIA",
    "pengalaman": "10 Tahun",
    "status": "Aktif",
    "tanggalBergabung": "2016-04-07"
  },
  {
    "id": "G-010",
    "nama": "REVAL",
    "mapel": "FISIKA",
    "pengalaman": "10 Tahun",
    "status": "Aktif",
    "tanggalBergabung": "2016-04-05"
  },
  {
    "id": "G-011",
    "nama": "RIMA YURINA NABILA",
    "mapel": "MATEMATIKA",
    "pengalaman": "5 Tahun",
    "status": "Aktif",
    "tanggalBergabung": "2021-03-02"
  },
  {
    "id": "G-012",
    "nama": "SAMINO",
    "mapel": "BIOLOGI",
    "pengalaman": "10 Tahun",
    "status": "Aktif",
    "tanggalBergabung": "2016-06-30"
  },
  {
    "id": "G-013",
    "nama": "TRI FITRI",
    "mapel": "BIOLOGI",
    "pengalaman": "16 Tahun",
    "status": "Aktif",
    "tanggalBergabung": "2008-03-14"
  },
  {
    "id": "G-014",
    "nama": "VICKY SAPUTRA",
    "mapel": "MATEMATIKA",
    "pengalaman": "16 Tahun",
    "status": "Aktif",
    "tanggalBergabung": "2010-03-02"
  },
  {
    "id": "G-015",
    "nama": "WINNY LANSANY",
    "mapel": "MATEMATIKA",
    "pengalaman": "16 Tahun",
    "status": "Aktif",
    "tanggalBergabung": "2010-03-02"
  },
  {
    "id": "G-016",
    "nama": "YUNITA PURNAMASARI",
    "mapel": "SOSIOLOGI",
    "pengalaman": "10 Tahun",
    "status": "Aktif",
    "tanggalBergabung": "2016-08-10"
  },
  {
    "id": "G-018",
    "nama": "YANUARDY",
    "mapel": "BIP",
    "pengalaman": "14 Tahun",
    "status": "Aktif",
    "tanggalBergabung": "2012-03-02"
  }
];

export const WORKFLOW_STEPS = [
  { step: 1, name: "Data Guru", status: "completed", desc: "Data master pengajar NF" },
  { step: 2, name: "Kriteria & Bobot", status: "completed", desc: "8 Kriteria standar (100% bobot)" },
  { step: 3, name: "Penilaian Guru", status: "completed", desc: "Input evaluasi kinerja" },
  { step: 4, name: "Perhitungan SAW", status: "completed", desc: "Normalisasi matriks & preferensi" },
  { step: 5, name: "Hasil & Laporan", status: "completed", desc: "Peringkat & unduh laporan" },
];

export const NILAI_SIMULASI_DEFAULT = {
  "G-001": { "C1": 80, "C2": 80, "C3": 80, "C4": 80, "C5": 80, "C6": 80, "C7": 80, "C8": 80 },
  "G-002": { "C1": 80, "C2": 80, "C3": 80, "C4": 80, "C5": 80, "C6": 80, "C7": 80, "C8": 80 },
  "G-003": { "C1": 80, "C2": 80, "C3": 80, "C4": 80, "C5": 80, "C6": 80, "C7": 80, "C8": 80 },
  "G-004": { "C1": 80, "C2": 80, "C3": 80, "C4": 80, "C5": 80, "C6": 80, "C7": 80, "C8": 80 },
  "G-005": { "C1": 80, "C2": 80, "C3": 80, "C4": 80, "C5": 80, "C6": 80, "C7": 80, "C8": 80 },
  "G-006": { "C1": 100, "C2": 90, "C3": 90, "C4": 90, "C5": 75, "C6": 80, "C7": 95, "C8": 90 },
  "G-007": { "C1": 80, "C2": 80, "C3": 80, "C4": 80, "C5": 80, "C6": 80, "C7": 80, "C8": 80 },
  "G-008": { "C1": 80, "C2": 80, "C3": 80, "C4": 80, "C5": 80, "C6": 80, "C7": 80, "C8": 80 },
  "G-009": { "C1": 80, "C2": 80, "C3": 80, "C4": 80, "C5": 80, "C6": 80, "C7": 80, "C8": 80 },
  "G-010": { "C1": 80, "C2": 80, "C3": 80, "C4": 80, "C5": 80, "C6": 80, "C7": 80, "C8": 80 },
  "G-011": { "C1": 80, "C2": 80, "C3": 80, "C4": 80, "C5": 80, "C6": 80, "C7": 80, "C8": 80 },
  "G-012": { "C1": 80, "C2": 80, "C3": 80, "C4": 80, "C5": 80, "C6": 80, "C7": 80, "C8": 80 },
  "G-013": { "C1": 80, "C2": 80, "C3": 80, "C4": 80, "C5": 80, "C6": 80, "C7": 80, "C8": 80 },
  "G-014": { "C1": 80, "C2": 80, "C3": 80, "C4": 80, "C5": 80, "C6": 80, "C7": 80, "C8": 80 },
  "G-015": { "C1": 80, "C2": 80, "C3": 80, "C4": 80, "C5": 80, "C6": 80, "C7": 80, "C8": 80 },
  "G-016": { "C1": 80, "C2": 80, "C3": 80, "C4": 80, "C5": 80, "C6": 80, "C7": 80, "C8": 80 },
  "G-018": { "C1": 80, "C2": 80, "C3": 80, "C4": 80, "C5": 80, "C6": 80, "C7": 80, "C8": 80 }
};

export const RANKING_SIMULASI = [];
