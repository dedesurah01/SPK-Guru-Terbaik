# Panduan Pengguna (User Manual)
## Sistem Pendukung Keputusan (SPK) Pemilihan Guru Terbaik
### Bimbingan Belajar Nurul Fikri

---

## Daftar Isi
1. [Tentang Sistem](#1-tentang-sistem)
2. [Akses dan Antarmuka Utama (App Shell)](#2-akses-dan-antarmuka-utama-app-shell)
3. [Panduan Operasional Tiap Modul](#3-panduan-operasional-tiap-modul)
   - [Modul 1: Dashboard Eksekutif](#modul-1-dashboard-eksekutif)
   - [Modul 2: Data Guru (Master Alternatif)](#modul-2-data-guru-master-alternatif)
   - [Modul 3: Kriteria dan Bobot](#modul-3-kriteria-dan-bobot)
   - [Modul 4: Penilaian Guru](#modul-4-penilaian-guru)
   - [Modul 5: Perhitungan SAW](#modul-5-perhitungan-saw)
   - [Modul 6: Hasil dan Laporan](#modul-6-hasil-dan-laporan)
4. [Alur Evaluasi Berkala (Workflow Standar)](#4-alur-evaluasi-berkala-workflow-standar)
5. [Pertanyaan yang Sering Diajukan (FAQ)](#5-pertanyaan-yang-sering-diajukan-faq)

---

## 1. Tentang Sistem
Sistem Pendukung Keputusan (SPK) Pemilihan Guru Terbaik Bimbingan Belajar Nurul Fikri adalah aplikasi web berbasis metode **Simple Additive Weighting (SAW)** yang dirancang untuk membantu manajemen dan pengelola cabang mengevaluasi, membandingkan, serta menentukan guru berprestasi secara objektif, transparan, dan berbasis data.

### Prinsip Utama Sistem:
- **Transparansi Perhitungan**: Seluruh tahapan matematis (matriks keputusan, normalisasi, pembobotan, hingga skor preferensi) dapat ditinjau secara langsung.
- **Rekomendasi Objektif**: Hasil akhir peringkat bertindak sebagai bahan pertimbangan pendukung keputusan manajemen, bukan pengganti mutlak otoritas manajerial.
- **Kemudahan Akses**: Desain modern, responsif (dapat digunakan di laptop, tablet, maupun smartphone), dan dilengkapi fitur cetak serta ekspor data.

---

## 2. Akses dan Antarmuka Utama (App Shell)

Antarmuka SPK terdiri dari tiga area utama:
1. **Sidebar Navigasi (Kiri)**:
   - Menampilkan logo identitas Bimbingan Belajar Nurul Fikri.
   - Menu pintas menuju 6 modul utama:
     - Dashboard
     - Data Guru
     - Kriteria & Bobot
     - Penilaian Guru
     - Perhitungan SAW
     - Hasil & Laporan
   - Indikator modul aktif berwarna biru dengan penanda visual tegas.
2. **Header Bar (Atas)**:
   - Judul modul aktif dan sub-judul konteks.
   - Status indikator sistem (*Sistem Terintegrasi* / *Siap Digunakan*).
   - Tombol toggle navigasi pada perangkat layar kecil (mobile).
3. **Area Konten Utama (Tengah)**:
   - Menampilkan lembar kerja dari modul yang sedang dibuka.
   - Dilengkapi kartu KPI, filter pencarian, tabel data, serta tombol aksi cepat.

---

## 3. Panduan Operasional Tiap Modul

### Modul 1: Dashboard Eksekutif
Dashboard memberikan ringkasan status operasional SPK secara cepat dan menyeluruh.

#### Fitur Utama:
- **Kartu Indikator Kunci (KPI Cards)**:
  - *Total Guru Terdaftar*: Menampilkan total guru dan jumlah guru aktif.
  - *Kriteria Keputusan*: Menampilkan jumlah kriteria aktif (standar 8 kriteria) dan total bobot.
  - *Kelengkapan Penilaian*: Menunjukkan persentase dan rasio guru yang nilainya sudah lengkap diisi.
  - *Kandidat Teratas*: Menampilkan nama guru peraih skor preferensi tertinggi saat ini.
- **Banner Status Kesiapan Sistem**:
  - Memberi notifikasi apakah data sudah lengkap untuk diproses oleh algoritma SAW atau masih membutuhkan pengisian nilai.
- **Rangkuman Top 3 Guru Terbaik**:
  - Menampilkan ringkasan podium 3 besar beserta mata pelajaran dan skor akhir.
- **Alur Kerja SPK**:
  - Panduan interaktif 5 langkah evaluasi yang memudahkan pengguna baru memahami urutan proses.

---

### Modul 2: Data Guru (Master Alternatif)
Modul ini digunakan untuk mengelola data tenaga pengajar yang menjadi alternatif penilaian.

#### Cara Menambah Guru Baru:
1. Buka menu **Data Guru**.
2. Klik tombol **+ Tambah Guru Baru** di pojok kanan atas tabel.
3. Pada jendela modal yang muncul, isi data:
   - **ID Guru**: Contoh `G-006` (harus unik).
   - **Nama Lengkap & Gelar**: Contoh `Fathia Rahma, S.Pd.`.
   - **Mata Pelajaran**: Contoh `Matematika Saintek`.
   - **Pengalaman Mengajar**: Contoh `3 Tahun`.
   - **Status Keaktifan**: Pilih `Aktif` atau `Cuti`.
4. Klik tombol **Simpan Data**. Notifikasi sukses akan muncul dan data otomatis masuk ke tabel serta tersimpan di *local storage*.

#### Cara Mencari dan Menyaring Guru:
- Masukkan nama guru, ID guru, atau mata pelajaran pada kotak pencarian **Cari guru...**.
- Tabel akan memfilter data secara instan (*real-time*).

#### Cara Mengubah Data Guru:
1. Temukan nama guru pada tabel.
2. Klik tombol **Edit** (ikon pensil).
3. Perbarui informasi yang diperlukan.
4. Klik **Simpan Perubahan**.

#### Cara Menghapus Guru:
1. Klik tombol **Hapus** (ikon tempat sampah).
2. Kotak dialog konfirmasi keamanan akan muncul untuk mencegah penghapusan tidak disengaja.
3. Klik **Ya, Hapus Data** untuk mengonfirmasi. Nilai penilaian guru yang bersangkutan juga akan dihapus secara otomatis demi menjaga integritas data.

---

### Modul 3: Kriteria dan Bobot
Modul ini mengelola 8 kriteria standar penilaian kinerja guru dan bobot masing-masing kriteria.

#### Daftar 8 Kriteria Standar Nurul Fikri:
| Kode | Nama Kriteria | Bobot Awal | Jenis | Deskripsi |
|:---:|:---|:---:|:---:|:---|
| **C1** | Kehadiran | 10 | Benefit | Persentase kehadiran tatap muka & daring |
| **C2** | Kedisiplinan | 10 | Benefit | Ketepatan waktu memulai & menyelesaikan KBM |
| **C3** | Kualitas Mengajar | 10 | Benefit | Metode penyampaian & interaksi dengan siswa |
| **C4** | Penguasaan Materi | 40 | Benefit | Kedalaman & pemahaman kurikulum bimbingan belajar |
| **C5** | Persiapan Mengajar | 8 | Benefit | Kelengkapan modul, silabus & latihan soal |
| **C6** | Kemampuan Komunikasi | 8 | Benefit | Komunikasi persuasif dengan siswa & orang tua |
| **C7** | Pengelolaan Kelas | 7 | Benefit | Kondusivitas & keterlibatan aktif kelas |
| **C8** | Hasil Belajar Siswa | 7 | Benefit | Rata-rata peningkatan nilai try out / evaluasi siswa |
| | **TOTAL** | **100** | | |

#### Cara Mengubah Bobot Kriteria:
1. Klik tombol **Ubah Bobot** pada kriteria yang ingin disesuaikan.
2. Masukkan bobot baru dalam angka positif (misal: 15).
3. Klik **Simpan**.
4. Perhatikan **Indikator Total Bobot** di bagian atas:
   - Jika total bobot tepat **100**, status bertanda hijau (*Ideal & Terverifikasi*).
   - Jika tidak sama dengan 100 namun > 0, sistem tetap menormalisasi bobot secara proporsional (`w_j = bobot_j / total_bobot`), tetapi menyarankan penyesuaian agar genap 100 agar mudah diaudit.
5. Jika ingin kembali ke pengaturan awal resmi, klik tombol **Reset ke Default PRD**.

---

### Modul 4: Penilaian Guru
Modul ini merupakan tempat pengisian nilai evaluasi kinerja masing-masing guru pada setiap kriteria.

#### Skala Nilai:
- Rentang nilai yang valid adalah **1 hingga 100**.
- Nilai di luar rentang atau format non-angka akan ditolak dengan pesan kesalahan otomatis.

#### Cara Mengisi atau Mengubah Nilai Guru:
1. Buka menu **Penilaian Guru**.
2. Anda dapat melihat ringkasan status setiap guru:
   - Badge hijau **Lengkap (8/8)** jika semua kriteria sudah dinilai.
   - Badge kuning **Belum Lengkap** jika ada kriteria yang belum terisi.
3. Klik tombol **Input / Edit Nilai** pada baris guru yang dipilih.
4. Masukkan skor 1-100 untuk masing-masing kriteria C1 sampai C8.
5. Klik **Simpan Penilaian**.

#### Fitur Bantuan Cepat:
- **Filter Status**: Saring guru berdasarkan status penilaian (*Semua*, *Lengkap*, atau *Belum Lengkap*).
- **Isi Nilai Default Simulasi**: Memudahkan pengujian sistem dengan mengisi nilai contoh resmi dalam satu klik.
- **Reset Penilaian**: Mengembalikan seluruh data penilaian ke setelan awal.

---

### Modul 5: Perhitungan SAW
Modul ini menyajikan transparansi penuh atas proses kalkulasi algoritma *Simple Additive Weighting*.

#### 4 Tahapan Perhitungan yang Ditampilkan:
1. **Tahap 1: Matriks Keputusan ($X$)**:
   - Menampilkan tabel nilai mentah $x_{ij}$ dari seluruh guru untuk setiap kriteria.
   - Menampilkan baris nilai **Maksimum ($Max$)** dan **Minimum ($Min$)** untuk setiap kriteria.
2. **Tahap 2: Matriks Normalisasi ($R$)**:
   - Menampilkan tabel nilai ternormalisasi $r_{ij}$ (berkisar antara 0.0000 hingga 1.0000).
   - Menggunakan rumus Benefit: $r_{ij} = \frac{x_{ij}}{\max(x_j)}$.
   - Dilengkapi rumus eksplisit per sel saat disentuh kursor.
3. **Tahap 3: Pembobotan Kriteria ($W$)**:
   - Menampilkan bobot awal dan bobot ternormalisasi: $w_j = \frac{\text{bobot}_j}{\sum \text{bobot}}$.
   - Menampilkan persentase kontribusi kriteria (misal: Penguasaan Materi C4 = 40%).
4. **Tahap 4: Nilai Preferensi Akhir ($V$)**:
   - Menampilkan hasil perkalian dan penjumlahan: $V_i = \sum (w_j \times r_{ij})$.
   - Rincian kontribusi poin per kriteria untuk setiap guru.

#### Fitur Salin Ringkasan:
- Klik tombol **Salin Ringkasan** untuk menyalin daftar skor SAW ke *clipboard* komputer agar mudah ditempelkan ke pesan WhatsApp, email, atau catatan rapat.

---

### Modul 6: Hasil dan Laporan
Modul ini adalah keluaran akhir sistem yang menyajikan daftar peringkat resmi guru terbaik beserta utilitas penerbitan dokumen laporan.

#### Fitur Utama:
- **Podium Top 3 Guru Terbaik**:
  - Penekanan visual elegan untuk Peringkat 1 (Emas/Juara), Peringkat 2 (Perak), dan Peringkat 3 (Perunggu).
- **Tabel Peringkat Lengkap**:
  - Kolom Peringkat, ID Guru, Nama Lengkap, Mata Pelajaran, Nilai Akhir Preferensi ($V$), dan Status Rekomendasi (*Sangat Direkomendasikan*, *Direkomendasikan*, *Cukup*).
- **Cetak Laporan Resmi (*Print Document*)**:
  - Klik tombol **Cetak Laporan**.
  - Sistem otomatis menyusun tampilan cetak standar berkop resmi Bimbingan Belajar Nurul Fikri, menyembunyikan sidebar/tombol navigasi yang tidak relevan, dan menampilkan kolom tanda tangan pimpinan cabang serta tanggal laporan.
  - Anda dapat langsung mencetak ke printer fisik atau menyimpannya sebagai file **PDF**.
- **Ekspor Data ke CSV/Excel**:
  - Klik tombol **Ekspor CSV**.
  - File spreadsheet `.csv` berisi data peringkat lengkap akan diunduh secara instan ke komputer Anda.

---

## 4. Alur Evaluasi Berkala (Workflow Standar)

Untuk pelaksanaan penilaian kinerja guru rutin (misal semesteran atau tahunan), ikuti urutan berikut:
1. **Langkah 1**: Perbarui daftar guru di modul **Data Guru** (tambahkan guru baru atau nonaktifkan guru yang sudah tidak mengajar).
2. **Langkah 2**: Tinjau modul **Kriteria & Bobot** bersama tim akademik untuk memastikan bobot kriteria masih relevan.
3. **Langkah 3**: Buka modul **Penilaian Guru**, masukkan evaluasi skor (1-100) dari hasil supervisi kelas, rekap absensi, dan kuisioner siswa.
4. **Langkah 4**: Periksa modul **Perhitungan SAW** untuk memverifikasi tahapan normalisasi dan kalkulasi skor preferensi.
5. **Langkah 5**: Buka modul **Hasil & Laporan**, cetak dokumen resmi untuk rapat pleno manajemen atau simpan arsip dalam bentuk PDF/CSV.

---

## 5. Pertanyaan yang Sering Diajukan (FAQ)

**Q: Mengapa modul Perhitungan SAW atau Hasil & Laporan menampilkan peringatan 'Data Belum Lengkap'?**  
*A: Algoritma SAW membutuhkan matriks keputusan yang lengkap. Jika ada salah satu guru yang memiliki kriteria bernilai kosong, kalkulasi belum dapat dijalankan demi menjaga keadilan hasil. Silakan lengkapi nilai di modul Penilaian Guru.*

**Q: Apakah data yang saya ubah akan hilang jika tab browser ditutup?**  
*A: Tidak. Sistem secara otomatis menyimpan seluruh perubahan data guru, kriteria, dan penilaian ke media penyimpanan lokal peramban (Web LocalStorage).*

**Q: Bagaimana jika saya ingin mengembalikan data ke contoh awal untuk latihan?**  
*A: Setiap modul dilengkapi tombol Reset ke Default (misal: 'Reset Nilai ke Default' di modul Penilaian Guru atau 'Reset ke Default' di modul Kriteria).*

**Q: Apakah kriteria bertipe Cost didukung?**  
*A: Ya. Meskipun secara default seluruh kriteria Nurul Fikri bertipe Benefit, mesin kalkulasi `sawCalculation.js` telah mendukung kriteria Cost dengan rumus $r_{ij} = \frac{\min(x_j)}{x_{ij}}$ lengkap dengan pencegahan pembagian bernilai nol.*
