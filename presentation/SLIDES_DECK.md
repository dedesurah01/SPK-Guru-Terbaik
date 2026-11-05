# NASKAH PRESENTASI & SLIDE DECK PROYEK AKHIR
## Sistem Pendukung Keputusan Pemilihan Guru Terbaik — Bimbingan Belajar Nurul Fikri
### Metode: Simple Additive Weighting (SAW)

---

### PANDUAN PENGGUNAAN
1. **Slide Interaktif di Browser:** Buka file **[`presentation/index.html`](./index.html)** di Google Chrome / Microsoft Edge.
   - Tekan **`F`** untuk mode layar penuh (*Fullscreen*).
   - Tekan **`N`** untuk membuka/menutup naskah contekan pembicara (*Speaker Notes*).
   - Tekan **`Ctrl + P`** untuk mencetak seluruh slide menjadi berkas PDF presentasi.
2. **Impor ke Platform Presentasi:** Dokumen Markdown ini dapat langsung disalin ke PowerPoint, Google Slides, Canva, atau Gamma AI.

---

### SLIDE 1: COVER (JUDUL & IDENTITAS PROYEK)
- **Judul Proyek:** Sistem Pendukung Keputusan Pemilihan Guru Terbaik
- **Sub-judul:** Penerapan Metode Simple Additive Weighting (SAW) Berbasis Web Modern pada Bimbingan Belajar Nurul Fikri
- **Identitas:** Laporan Kemajuan & Presentasi Proyek Akhir / Semester 5
- **Studi Kasus:** Bimbingan Belajar Nurul Fikri
- **Teknologi:** React 18, Vite 6, Tailwind CSS
- **Status Proyek:** Phase 0 hingga Phase 8 Selesai (100% Siap Digunakan)

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Selamat pagi/siang bapak/ibu dosen penguji dan rekan-rekan sekalian. Pada kesempatan ini, saya mempresentasikan laporan proyek pembangunan Sistem Pendukung Keputusan Pemilihan Guru Terbaik di Bimbingan Belajar Nurul Fikri dengan menggunakan metode Simple Additive Weighting (SAW). Presentasi ini akan memaparkan 6 poin inti: latar belakang, rumusan masalah, batasan masalah, progres pengerjaan hingga tahap terakhir, peran dan fungsi setiap modul, serta rincian modul-modul yang telah selesai dikerjakan."*

---

### SLIDE 2: 1. LATAR BELAKANG
- **Konteks Lembaga:**  
  Bimbingan Belajar Nurul Fikri merupakan institusi bimbingan belajar terkemuka dengan komitmen tinggi mengantarkan siswa menembus PTN impian. Tenaga pengajar (guru) memegang peran paling sentral dalam menjaga mutu pembelajaran, kedisiplinan, dan motivasi belajar siswa.
- **Urgensi Pemilihan Guru Terbaik:**  
  Apresiasi berkala terhadap guru berprestasi sangat penting guna meningkatkan motivasi, loyalitas, dan standarisasi kualitas KBM (*Kegiatan Belajar Mengajar*).
- **Kelemahan Sistem Konvensional Saat Ini:**  
  - Penilaian masih dilakukan secara manual menggunakan lembar kerja terpisah, memakan waktu berhari-hari.  
  - Rentan terhadap bias subjektif atau kedekatan emosional evaluator karena ketiadaan pembobotan kriteria terstandarisasi.  
  - Tidak memiliki rekam jejak matematis (*audit trail*) transparan yang dapat dipertanggungjawabkan kepada guru lain.
- **Solusi yang Dibangun:**  
  Sistem Pendukung Keputusan berbasis web modern yang mengotomatisasi perhitungan multi-kriteria menggunakan metode *Simple Additive Weighting* (SAW) secara instan, objektif, dan transparan.

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Latar belakang proyek ini berakar pada kebutuhan Bimbingan Belajar Nurul Fikri dalam mengapresiasi guru-guru terbaiknya secara adil. Guru adalah ujung tombak kelulusan siswa ke perguruan tinggi negeri. Selama ini proses evaluasi manual memakan waktu lama, rentan subjektivitas pimpinan, dan sulit dipertanggungjawabkan perhitungannya. Oleh sebab itu, kami menghadirkan SPK berbasis web metode SAW untuk mengotomatisasi seleksi secara adil dan transparan."*

---

### SLIDE 3: 2. RUMUSAN MASALAH
Berdasarkan latar belakang di atas, rumusan masalah dirumuskan ke dalam 3 pertanyaan kunci:

1. **Manajemen Data Terpadu:**  
   *Bagaimana merancang sistem berbasis web yang mampu mengelola data profil guru alternatif, parameter 8 kriteria kompetensi, dan input penilaian harian/berkala secara terpusat dan terstruktur?*
2. **Otomasi Algoritma SAW yang Akurat:**  
   *Bagaimana mengimplementasikan metode Simple Additive Weighting (SAW) ke dalam sistem komputasi agar normalisasi matriks dan pembobotan berjalan otomatis, konsisten, serta bebas dari kesalahan hitung manual?*
3. **Transparansi Hasil & Pelaporan Resmi:**  
   *Bagaimana menyajikan alur perhitungan matematis yang terbuka (tidak black-box) dan menerbitkan Surat Keputusan (SK) rekomendasi guru terbaik yang siap cetak bagi pimpinan Nurul Fikri?*

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Rumusan masalah kami bagi menjadi 3 hal pokok: pertama, bagaimana menyediakan sistem manajemen data yang rapi untuk alternatif guru dan kriteria. Kedua, bagaimana mengotomatisasi algoritma SAW agar perhitungannya presisi dan bebas human-error. Dan ketiga, bagaimana menyajikan transparansi matriks hingga menghasilkan laporan resmi siap cetak bagi jajaran pimpinan."*

---

### SLIDE 4: 3. BATASAN MASALAH
Agar pengembangan sistem tetap terarah dan memenuhi standar mutu, ditetapkan batasan-batasan berikut:

- **Batasan Metode Keputusan:**  
  Menggunakan metode *Simple Additive Weighting* (SAW) dengan formula atribut benefit: $r_{ij} = \frac{x_{ij}}{\max(x_j)}$ dan preferensi $V_i = \sum (w_j \times r_{ij})$.
- **Batasan Kriteria & Bobot (8 Kriteria Benefit, Total 100%):**  
  - C1: Kehadiran (10%)  
  - C2: Kedisiplinan (10%)  
  - C3: Kualitas Mengajar (10%)  
  - C4: Penguasaan Materi (40% — Kompetensi Inti)  
  - C5: Persiapan Mengajar (8%)  
  - C6: Kemampuan Komunikasi (8%)  
  - C7: Pengelolaan Kelas (7%)  
  - C8: Hasil Belajar Siswa (7%)  
  *(Semua kriteria bertipe benefit; semakin tinggi nilai semakin baik)*.
- **Batasan Modul Sistem:**  
  Sistem dibatasi secara ketat pada 6 modul inti (*Dashboard, Data Guru, Kriteria & Bobot, Penilaian Guru, Perhitungan SAW, Hasil & Laporan*) serta modul Autentikasi Pengguna (*Login/Logout*).
- **Batasan Arsitektur & Teknologi:**  
  Dibangun sebagai *Single Page Application* (SPA) menggunakan **React 18 + Vite**, dengan penyimpanan status lokal browser (*localStorage*) tanpa ketergantungan database backend pihak ketiga.
- **Sifat Keputusan:**  
  Hasil luaran sistem berfungsi sebagai **instrumen pendukung keputusan** (*Decision Support*) yang merekomendasikan prioritas urutan guru, bukan pengambil keputusan mutlak.

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Batasan masalah sistem ini mencakup metode SAW dengan 8 kriteria benefit berbobot total 100%, di mana penguasaan materi memiliki bobot terbesar yaitu 40%. Sistem dirancang dalam 6 modul utama plus autentikasi berbasis React dan Vite. Hasil perhitungan adalah rekomendasi terukur untuk membantu pimpinan mengambil keputusan."*

---

### SLIDE 5: 4. PROGRESS ATAU PERKEMBANGAN PROYEK HINGGA TAHAP TERAKHIR
Proyek telah dikerjakan secara bertahap dan terstruktur melalui **9 Fase Pengembangan (Phase 0 s.d. Phase 8)** dengan status **100% SELESAI & LULUS UJI**:

| Fase | Nama Fase | Status | Keluaran Utama |
|:---:|:---|:---:|:---|
| **Phase 0** | **Source of Truth (SOT)** | Selesai | Dokumen PRD, UI Guideline, dan Implementation Plan disahkan. |
| **Phase 1** | **UI Foundation & Shell** | Selesai | Kerangka aplikasi React + Vite, navigasi 6 modul, responsivitas mobile-desktop. |
| **Phase 2** | **Modul Data Master** | Selesai | CRUD Data Guru dan pengelolaan bobot kriteria terstandarisasi. |
| **Phase 3** | **Modul Penilaian Guru** | Selesai | Form input nilai 8 kriteria skala 0-100 dan validasi kelengkapan data. |
| **Phase 4** | **Perhitungan SAW** | Selesai | Mesin komputasi matriks X, matriks R, bobot W, dan skor akhir preferensi V. |
| **Phase 5** | **Hasil dan Laporan** | Selesai | Podium visual Top 3, ekspor file CSV, dan layout cetak Surat Keputusan resmi. |
| **Phase 6** | **Integrasi & Quality Check** | Selesai | Penyatuan alur 6 modul, uji fungsionalitas menyeluruh, dan build produksi sukses. |
| **Phase 7** | **Dokumentasi Pengguna** | Selesai | Penyusunan `USER_MANUAL.md`, `SAW_EXPLANATION.md`, dan `README.md`. |
| **Phase 8** | **Autentikasi & Fitur Tanggal** | Selesai | Fitur Login/Logout, input tanggal pendaftaran guru, pemilih tanggal evaluasi aktif, dan push ke GitHub. |

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Progres pengerjaan proyek telah selesai secara menyeluruh dari Phase 0 hingga Phase 8. Setiap tahapan telah divalidasi dengan baik, mulai dari perancangan arsitektur, implementasi rumus SAW, laporan cetak resmi, integrasi fitur input tanggal evaluasi, sistem login, hingga kompilasi build produksi dan sinkronisasi ke repositori GitHub."*

---

### SLIDE 6: 5. PENJELASAN PERAN DAN FUNGSI SETIAP MODUL DALAM SISTEM
Arsitektur sistem dibangun atas modul-modul independen yang saling berinteraksi dalam satu alur kerja utuh:

1. **Modul Autentikasi (Login & Logout):**  
   *Peran:* Gerbang pengamanan akses.  
   *Fungsi:* Memastikan hanya pimpinan atau pengelola berwenang yang dapat mengakses data pengajar, melakukan penilaian, dan menerbitkan laporan.
2. **Modul Dashboard Eksekutif:**  
   *Peran:* Pusat pemantauan utama (*control center*).  
   *Fungsi:* Menyajikan ringkasan KPI (total guru, total kriteria, persentase kelengkapan nilai, calon guru terbaik), alur tahapan kerja (*stepper*), dan banner tanggal evaluasi aktif.
3. **Modul Data Guru:**  
   *Peran:* Pengelolaan data master alternatif guru.  
   *Fungsi:* Menambah, mengubah, mencari, dan menghapus profil guru beserta mata pelajaran dan rekam jejak tanggal pendaftaran/bergabung.
4. **Modul Kriteria dan Bobot:**  
   *Peran:* Pengaturan parameter preferensi institusi.  
   *Fungsi:* Menampung 8 kriteria standar Nurul Fikri, memastikan jenis benefit, serta mengunci validasi audit total bobot harus tepat 100%.
5. **Modul Penilaian Guru:**  
   *Peran:* Lembar kerja evaluator kinerja pengajar.  
   *Fungsi:* Memilih tanggal evaluasi yang sedang berjalan, menginput skor per kriteria (skala 0-100), dan menyediakan tombol *quick-fill* nilai standar.
6. **Modul Perhitungan SAW:**  
   *Peran:* Mesin komputasi matematis transparan (*Glass Box Engine*).  
   *Fungsi:* Menyajikan tahapan kalkulasi secara terpisah: Matriks Mentah ($X$), Normalisasi ($R$), Pembobotan ($W$), dan Nilai Preferensi ($V$).
7. **Modul Hasil dan Laporan:**  
   *Peran:* Instrumen luaran penetapan keputusan.  
   *Fungsi:* Menampilkan podium visual Top 3, tabel rekapitulasi peringkat terurut, unduh data CSV, serta pencetakan dokumen resmi Surat Keputusan lengkap dengan tanda tangan pimpinan.

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Setiap modul memiliki peran yang saling melengkapi: Login mengamankan hak akses; Dashboard memberikan gambaran umum; Data Guru dan Kriteria menjadi penyedia input master; Penilaian Guru mencatat evaluasi berkala; Perhitungan SAW memproses formula secara transparan; dan Hasil Laporan menyajikan rekomendasi akhir yang siap disahkan oleh pimpinan."*

---

### SLIDE 7: 6. PENJELASAN MASING-MASING MODUL YANG TELAH DIKERJAKAN (MASTER DATA & PARAMETER)
Rincian implementasi teknis pada bagian Master Data dan Parameter:

- **Modul 1: Dashboard Eksekutif**
  - Dilengkapi 4 kartu KPI (*Total Guru, Bobot Audit Kriteria, Kelengkapan Nilai, Rekomendasi Peringkat 1*).
  - Indikator alur *Workflow Stepper* interaktif 5 tahap.
  - Banner dinamis yang menampilkan tanggal evaluasi yang sedang aktif.
  - Tabel peringkat cepat yang langsung menyesuaikan hasil begitu nilai diinputkan.
- **Modul 2: Data Guru**
  - Formulir modal dialog modern untuk input ID guru, nama, mata pelajaran, dan pengalaman.
  - Fitur **Tanggal Terdaftar / Bergabung** otomatis berbasis tanggal riil hari ini.
  - Fitur pencarian instan (*live search*) dan filter status keaktifan (Aktif/Cuti).
  - Dialog konfirmasi pengaman sebelum penghapusan data guru untuk mencegah kelalaian pengguna.
- **Modul 3: Kriteria dan Bobot**
  - Standarisasi 8 kriteria penilaian institusi Bimbel Nurul Fikri bertipe benefit.
  - Komponen audit total bobot *real-time* yang otomatis memberikan peringatan visual jika total belum mencapai 100%.
  - Kolom perhitungan otomatis bobot ternormalisasi ($w_j = \frac{\text{bobot}_j}{\sum \text{bobot}}$) hingga 4 digit desimal.

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Pada bagian master data, Dashboard menyediakan pemantauan metrik secara instan. Modul Data Guru memiliki formulir CRUD lengkap dengan fitur pencatatan tanggal bergabung otomatis. Dan modul Kriteria mengunci validitas pembobotan 100% sehingga proses evaluasi selalu memenuhi standar audit institusi."*

---

### SLIDE 8: 6. PENJELASAN MASING-MASING MODUL YANG TELAH DIKERJAKAN (EVALUASI, KOMPUTASI & LAPORAN)
Rincian implementasi teknis pada bagian Evaluasi Kinerja, Mesin Perhitungan, dan Pelaporan:

- **Modul 4: Penilaian Guru**
  - Dilengkapi komponen pemilih **Tanggal Evaluasi** pada bagian *toolbar* atas.
  - Input penilaian per kriteria menggunakan slider/input angka valid dengan batas skala 0 s.d. 100.
  - Fitur bantuan *Quick Fill* untuk mengisi nilai acuan (80) dengan satu klik.
  - Pengaman kelengkapan nilai: sistem mencegah proses SAW berjalan jika terdapat guru yang nilainya belum lengkap.
- **Modul 5: Perhitungan SAW**
  - Tampilan tabulasi transparan untuk memeriksa 4 tahapan matematis:
    1. Tab Matriks Keputusan ($X$) beserta baris nilai maksimum kolom ($\max x_j$).
    2. Tab Matriks Ternormalisasi ($R$) dengan rumus $r_{ij} = \frac{x_{ij}}{\max(x_j)}$.
    3. Tab Bobot Preferensi ($W$).
    4. Tab Nilai Akhir Preferensi ($V_i = \sum w_j \cdot r_{ij}$).
  - Fitur salin ringkasan hitungan ke *clipboard* untuk kebutuhan dokumentasi.
  - Terverifikasi 100% konsisten dengan perhitungan manual (*hand calculation*).
- **Modul 6: Hasil dan Laporan**
  - Visualisasi podium penghargaan untuk Juara 1 (Emas), Juara 2 (Perak), dan Juara 3 (Perunggu).
  - Tombol Ekspor CSV untuk mengunduh rekapitulasi data peringkat.
  - Format cetak formal (*Print to PDF*) yang memuat kop surat resmi Bimbel Nurul Fikri, nomor SK, tanggal evaluasi yang sinkron, dan kolom tanda tangan Kepala Cabang serta Tim Penilai.

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Pada bagian evaluasi dan laporan, pengelola dapat menentukan tanggal penilaian secara fleksibel. Modul Perhitungan SAW membuka seluruh proses kalkulasi matriks sehingga dapat diaudit dengan mudah. Terakhir, modul Hasil dan Laporan menyediakan visualisasi podium serta lembar cetak Surat Keputusan resmi yang siap ditandatangani pimpinan."*

---

### SLIDE 9: KUALITAS TEKNIS & KEUNGGULAN SISTEM
Faktor keunggulan arsitektur dan pengalaman pengguna yang telah dicapai:

1. **Performa & Kecepatan:**  
   React 18 + Vite menghasilkan aplikasi Single Page Application yang sangat ringan, tanpa *lag*, dan waktu muat awal di bawah 1 detik.
2. **Kesesuaian Desain (*UI Guideline*):**  
   Mengusung estetika *Modern Futuristic SaaS* dengan dominasi palet biru Nurul Fikri (`#2563EB`) dan kartu metrik yang bersih serta mudah dibaca.
3. **Responsif & Aksesibel:**  
   Bisa diakses nyaman melalui komputer desktop, tablet, maupun ponsel pintar tanpa merusak susunan tabel.
4. **Validasi Data Menyeluruh:**  
   Mencegah kesalahan input ID duplikat, bobot tidak genap 100%, nilai di luar skala rubrik, maupun kalkulasi data kosong.
5. **Kesiapan Rilis Produksi:**  
   Proses kompilasi `npm run build` tuntas tanpa error atau peringatan, dan kode sumber tersimpan aman di repositori GitHub.

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Secara teknis, aplikasi ini dibangun dengan standar perangkat lunak modern: sangat cepat, responsif di berbagai ukuran layar, memiliki validasi data yang ketat di setiap formulir, dan telah teruji lolos kompilasi build produksi tanpa ada kesalahan."*

---

### SLIDE 10: KESIMPULAN & SESI TANYA JAWAB (Q&A)
- **Kesimpulan Capaian Proyek:**  
  1. Seluruh 6 modul inti ditambah autentikasi telah berhasil dibangun dan terintegrasi penuh sesuai Dokumen Kontrak (PRD).  
  2. Algoritma SAW terbukti akurat 100% dan mampu menghasilkan rekomendasi pemilihan guru terbaik secara objektif.  
  3. Fitur input tanggal terdaftar dan tanggal evaluasi berkala telah terintegrasi harmonis hingga ke lembar cetak Surat Keputusan.
- **Penutup:**  
  Terima kasih banyak atas bimbingan dan perhatian bapak/ibu dosen serta rekan-rekan.  
- **Sesi Diskusi:**  
  Membuka sesi tanya jawab, kritik, dan masukan membangun.

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Sebagai penutup, sistem pendukung keputusan pemilihan guru terbaik Bimbel Nurul Fikri dengan metode SAW telah selesai dikerjakan secara tuntas dan siap digunakan. Sistem ini diharapkan mampu memberikan dampak nyata dalam meningkatkan objektivitas dan efisiensi apresiasi pengajar. Terima kasih banyak atas perhatian bapak/ibu dosen. Saya membuka sesi tanya jawab untuk saran dan diskusi lebih lanjut. Terima kasih."*
