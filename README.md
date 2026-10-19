# SPK Pemilihan Guru Terbaik — Bimbingan Belajar Nurul Fikri

Aplikasi web Sistem Pendukung Keputusan (SPK) untuk mengevaluasi, membandingkan, dan menentukan peringkat tenaga pengajar berprestasi di lingkungan Bimbingan Belajar Nurul Fikri menggunakan metode **Simple Additive Weighting (SAW)**.

---

## 🌟 Fitur Utama

Aplikasi ini mencakup 6 modul inti sesuai spesifikasi dokumen kebutuhan produk (*Product Requirement Document*):

1. **Dashboard Eksekutif**: Ringkasan metrik data guru, status kelengkapan penilaian, KPI kunci, serta kandidat teratas secara *real-time*.
2. **Data Guru (Master Alternatif)**: Manajemen data guru lengkap dengan operasi CRUD (Tambah, Edit, Hapus dengan dialog konfirmasi, dan pencarian instan).
3. **Kriteria dan Bobot**: Manajemen 8 kriteria standar Nurul Fikri (C1–C8) dengan validasi total bobot (100%), atribut *benefit*, dan opsi *reset*.
4. **Penilaian Guru**: Antarmuka penilaian interaktif dengan validasi rentang skor 1–100, indikator kelengkapan penilaian, modal edit cepat, serta fitur *auto-fill* simulasi.
5. **Perhitungan SAW**: Visualisasi transparan 4 tahapan matematis:
   - Tahap 1: Matriks Keputusan ($X$) & nilai ekstrem ($Max$/$Min$).
   - Tahap 2: Matriks Normalisasi ($R$) dengan rumus eksplisit per kriteria.
   - Tahap 3: Pembobotan Kriteria Ternormalisasi ($W$).
   - Tahap 4: Matriks Nilai Preferensi ($V$) & rincian kontribusi skor.
6. **Hasil dan Laporan**: Podium Top 3 Guru Terbaik, tabel peringkat lengkap, utilitas ekspor data ke format **CSV**, serta **Cetak Laporan Resmi** (tata letak standar lembaga dengan kop dan kolom tanda tangan pimpinan).

---

## 🛠️ Tumpukan Teknologi (Tech Stack)

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Desain & Gaya**: Vanilla CSS dengan Sistem Desain Terpadu (mengacu pada `UI-GUIDELINE.md` dengan palet biru institusi Nurul Fikri `#1E40AF`, `#0284C7`, `#0EA5E9`).
- **Ikon**: [Lucide React](https://lucide.dev/)
- **Penyimpanan Lokal**: Browser `LocalStorage` untuk persistensi data tanpa ketergantungan backend eksternal.

---

## 📂 Struktur Proyek

```
SPK_Nurul_Fikri_SOT/
├── src/
│   ├── components/            # Komponen UI modular
│   │   ├── ConfirmDialog.jsx  # Dialog konfirmasi aksi destruktif
│   │   ├── Header.jsx         # Header bar & tombol navigasi mobile
│   │   ├── KpiCard.jsx        # Kartu statistik ringkasan dashboard
│   │   ├── Modal.jsx          # Jendela dialog formulir input
│   │   └── Sidebar.jsx        # Navigasi utama 6 modul
│   ├── context/
│   │   └── SpkContext.jsx     # State management terpusat & persistensi LocalStorage
│   ├── data/
│   │   ├── modulesData.js     # Metadata konfigurasi modul
│   │   └── simulationData.js  # Data awal simulasi (8 kriteria, 5 guru, skor default)
│   ├── utils/
│   │   └── sawCalculation.js  # Implementasi murni algoritma SAW
│   ├── views/                 # Tampilan 6 modul utama
│   │   ├── DashboardView.jsx
│   │   ├── DataGuruView.jsx
│   │   ├── KriteriaBobotView.jsx
│   │   ├── PenilaianGuruView.jsx
│   │   ├── PerhitunganSawView.jsx
│   │   └── HasilLaporanView.jsx
│   ├── App.jsx                # Layout shell & perutean modul
│   ├── index.css              # Sistem token desain, komponen, & gaya cetak
│   └── main.jsx               # Titik masuk React
├── AGENTS.md                  # Kontrak eksekusi & aturan kerja agen
├── PRD.md                     # Dokumen kebutuhan produk & aturan SAW
├── UI-GUIDELINE.md            # Panduan desain & visual UI
├── IMPLEMENTATION_PLAN.md     # Rencana implementasi bertahap (Phase 0–7)
├── USER_MANUAL.md             # Panduan pengoperasian aplikasi untuk pengguna
├── SAW_EXPLANATION.md         # Penjelasan matematis & hitungan manual rinci SAW
├── package.json
└── vite.config.js
```

---

## 🚀 Panduan Instalasi dan Menjalankan

### Prasyarat
- [Node.js](https://nodejs.org/) versi 18.0.0 atau lebih baru.
- `npm` (bawaan dari instalasi Node.js).

### Langkah Instalasi
1. Buka terminal pada direktori proyek:
   ```bash
   cd "SPK_Nurul_Fikri_SOT"
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan lokal (*development mode*):
   ```bash
   npm run dev
   ```
   Buka peramban di alamat: `http://localhost:5173/`

4. Membangun bundel produksi (*production build*):
   ```bash
   npm run build
   ```
5. Menjalankan pratinjau hasil build (*production preview*):
   ```bash
   npm run preview
   ```

---

## 📑 Dokumentasi Tambahan

- 📖 **[Panduan Pengguna (User Manual)](USER_MANUAL.md)**: Panduan langkah-demi-langkah pengoperasian seluruh modul, alur evaluasi rutin, dan FAQ.
- 🧮 **[Penjelasan Matematis SAW (Hand Calculation)](SAW_EXPLANATION.md)**: Formulasi matematis, studi kasus, dan pembuktian hitungan manual 5 guru & 8 kriteria yang terbukti 100% konsisten dengan komputasi sistem.
- 📋 **[Product Requirement Document (PRD)](PRD.md)**: Spesifikasi fungsional, kriteria dan bobot awal, serta kriteria penerimaan.
- 🎨 **[UI Guideline](UI-GUIDELINE.md)**: Spesifikasi palet warna, tipografi, radius, dan perilaku antarmuka.

---

## 🔒 Integritas dan Kepatuhan Sumber Kebenaran (SOT)

Aplikasi dibangun dengan mematuhi batasan kontrak dalam `AGENTS.md`:
- Menggunakan arsitektur front-end murni (React + Vite) tanpa backend/database eksternal.
- Algoritma perhitungan Simple Additive Weighting (SAW) diimplementasikan secara murni, transparan, dan dapat diaudit.
- Data contoh awal ditandai secara transparan sebagai data simulasi untuk keperluan evaluasi awal.
- Menyediakan fasilitas cetak dokumen standar resmi untuk laporan penilaian guru terbaik.
