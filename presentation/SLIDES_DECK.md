# NASKAH & SLIDE DECK LENGKAP PRESENTASI
## Sistem Pendukung Keputusan Pemilihan Guru Terbaik — Bimbingan Belajar Nurul Fikri
### Metode: Simple Additive Weighting (SAW)

> **Panduan Penggunaan:**
> 1. Dokumen ini dapat langsung di-*copy-paste* ke Microsoft PowerPoint, Google Slides, Canva, atau Gamma.app.
> 2. Anda juga dapat langsung membuka file interaktif **[`presentation/index.html`](./index.html)** di Google Chrome / Microsoft Edge untuk presentasi langsung di layar atau cetak ke PDF (`Ctrl + P`).
> 3. Setiap slide dilengkapi **Speaker Notes** (teks yang bisa Anda baca/hafalkan saat presentasi di depan dosen/penguji).

---

### SLIDE 1: JUDUL & IDENTITAS PROYEK
- **Judul:** Sistem Pendukung Keputusan Pemilihan Guru Terbaik
- **Sub-judul:** Implementasi Metode Simple Additive Weighting (SAW) Berbasis Web Modern pada Bimbingan Belajar Nurul Fikri
- **Identitas:** Presentasi Proyek Akhir / Semester 5
- **Studi Kasus:** Bimbingan Belajar Nurul Fikri
- **Teknologi:** React 18, Vite, Tailwind CSS

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Selamat pagi/siang bapak/ibu dosen penguji dan rekan-rekan sekalian. Pada kesempatan ini, saya mempresentasikan hasil perancangan dan implementasi Sistem Pendukung Keputusan Pemilihan Guru Terbaik di Bimbingan Belajar Nurul Fikri dengan menggunakan metode Simple Additive Weighting (SAW). Sistem ini dirancang untuk mengatasi subjektivitas dalam evaluasi kinerja guru melalui pendekatan kuantitatif yang transparan dan dapat diaudit."*

---

### SLIDE 2: LATAR BELAKANG & RUMUSAN MASALAH
- **Poin Masalah Konvensional:**
  - Evaluasi berkala memerlukan rekapitulasi data lembar kerja yang memakan waktu lama.
  - Penentuan guru terbaik rentan bias subjektif pimpinan tanpa standardisasi bobot kriteria.
  - Tidak adanya rekam jejak matematis transparan yang dapat menjelaskan alasan terpilihnya guru tertentu.
- **Poin Solusi Sistem:**
  - Sistem terkomputerisasi mengelola data guru dan kriteria multi-dimensi secara terpusat.
  - Penerapan metode SAW untuk normalisasi matriks dan pembobotan yang objektif.
  - Transparansi komputasi dari matriks mentah hingga laporan akhir.

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Latar belakang dibangunnya sistem ini didasari oleh pentingnya peran guru sebagai pilar kualitas di Nurul Fikri. Selama ini, evaluasi berkala sering memakan waktu lama dan rentan bias subjektif jika hanya mengandalkan penilaian impresi. Melalui SPK ini, seluruh kriteria dinilai secara adil dengan rumus matematis yang jelas, sehingga hasilnya dapat dipertanggungjawabkan kepada seluruh pengajar."*

---

### SLIDE 3: TUJUAN & MANFAAT SISTEM
- **Tujuan 1 (Otomasi):** Mengotomatisasi seluruh proses perhitungan SAW sehingga bebas dari potensi kesalahan hitung manual (*human error*).
- **Tujuan 2 (Objektivitas):** Memberikan rekomendasi peringkat guru terbaik secara objektif berdasarkan 8 kriteria kompetensi terstandarisasi.
- **Tujuan 3 (Akuntabilitas):** Menyediakan laporan peringkat resmi yang transparan dan siap cetak untuk keperluan arsip institusi.

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Tujuan utama sistem ini ada tiga: pertama, mengotomatisasi komputasi instan dari hari menjadi hitungan detik. Kedua, menyajikan rekomendasi keputusan yang objektif berdasarkan bobot kepentingan institusi. Ketiga, menghasilkan laporan akuntabel yang siap dicetak untuk evaluasi berkala manajemen."*

---

### SLIDE 4: METODOLOGI SIMPLE ADDITIVE WEIGHTING (SAW)
- **Konsep Dasar:** Sering dikenal sebagai metode penjumlahan terbobot (*weighted sum model*). Mencari penjumlahan terbobot dari rating kinerja ternormalisasi pada setiap alternatif guru.
- **Langkah-langkah Inti SAW:**
  1. **Matriks Keputusan ($X$):** Menampung nilai kinerja alternatif $A_i$ pada kriteria $C_j$.
  2. **Normalisasi Matriks ($R$):**
     - Kriteria Benefit (Keuntungan): $r_{ij} = \frac{x_{ij}}{\max(x_j)}$
     - Kriteria Cost (Biaya): $r_{ij} = \frac{\min(x_j)}{x_{ij}}$
  3. **Normalisasi Bobot ($W$):** $w_j = \frac{\text{bobot}_j}{\sum \text{bobot}}$ (menjamin $\sum w_j = 1.0$)
  4. **Perhitungan Preferensi ($V_i$):** $V_i = \sum (w_j \times r_{ij})$

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Metode yang kami terapkan adalah Simple Additive Weighting (SAW). Keunggulan metode ini adalah kemampuannya melakukan penilaian multi-kriteria secara presisi namun tetap efisien dalam komputasi. Prosesnya diawali dengan pembentukan matriks keputusan, dilanjutkan normalisasi matriks R ke skala 0 sampai 1, dan diakhiri dengan perkalian terhadap vektor bobot preferensi W untuk menghasilkan nilai akhir V."*

---

### SLIDE 5: KRITERIA & BOBOT PENILAIAN
| Kode | Nama Kriteria | Bobot | Bobot Relatif ($W$) | Tipe | Keterangan |
|:---:|:---|:---:|:---:|:---:|:---|
| **C1** | Kehadiran | 10 | 0.10 (10%) | Benefit | Presensi dan komitmen mengajar |
| **C2** | Kedisiplinan | 10 | 0.10 (10%) | Benefit | Kepatuhan SOP & ketepatan waktu |
| **C3** | Kualitas Mengajar | 10 | 0.10 (10%) | Benefit | Metodologi penyampaian interaktif |
| **C4** | **Penguasaan Materi** | **40** | **0.40 (40%)** | **Benefit** | **Kompetensi Inti Pengajar Bimbel** |
| **C5** | Persiapan Mengajar | 8 | 0.08 (8%) | Benefit | Kesiapan modul, RPP, dan soal |
| **C6** | Kemampuan Komunikasi | 8 | 0.08 (8%) | Benefit | Interaksi persuasif terhadap siswa |
| **C7** | Pengelolaan Kelas | 7 | 0.07 (7%) | Benefit | Kondusivitas belajar di kelas |
| **C8** | Hasil Belajar Siswa | 7 | 0.07 (7%) | Benefit | Peningkatan skor tryout siswa |
| | **TOTAL** | **100** | **1.00 (100%)** | | |

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Kriteria penilaian terdiri dari 8 indikator dengan total bobot 100 persen. Kriteria Penguasaan Materi (C4) diberi porsi bobot tertinggi yaitu 40 persen, karena di lembaga bimbingan belajar, kedalaman materi pengajar adalah diferensiasi utama. Seluruh 8 kriteria bersifat Benefit, artinya semakin tinggi nilai yang diraih seorang guru, semakin besar peluangnya terpilih."*

---

### SLIDE 6: STRUKTUR DATA ALTERNATIF & MATRIKS KEPUTUSAN ($X$)
- **Format Matriks Fleksibel:** Siap menampung input pengajar riil dari Bimbingan Belajar Nurul Fikri melalui modul Data Guru dan Penilaian Guru.

| Kode | Alternatif Pengajar | Mapel | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **A1** | *[Input Guru Alternatif 1]* | *[Mapel 1]* | $x_{11}$ | $x_{12}$ | $x_{13}$ | $x_{14}$ | $x_{15}$ | $x_{16}$ | $x_{17}$ | $x_{18}$ |
| **A2** | *[Input Guru Alternatif 2]* | *[Mapel 2]* | $x_{21}$ | $x_{22}$ | $x_{23}$ | $x_{24}$ | $x_{25}$ | $x_{26}$ | $x_{27}$ | $x_{28}$ |
| **A3** | *[Input Guru Alternatif 3]* | *[Mapel 3]* | $x_{31}$ | $x_{32}$ | $x_{33}$ | $x_{34}$ | $x_{35}$ | $x_{36}$ | $x_{37}$ | $x_{38}$ |
| **A4** | *[Input Guru Alternatif 4]* | *[Mapel 4]* | $x_{41}$ | $x_{42}$ | $x_{43}$ | $x_{44}$ | $x_{45}$ | $x_{46}$ | $x_{47}$ | $x_{48}$ |
| **A...** | *[Input Guru Alternatif n]* | *[Mapel n]* | $x_{n1}$ | $x_{n2}$ | $x_{n3}$ | $x_{n4}$ | $x_{n5}$ | $x_{n6}$ | $x_{n7}$ | $x_{n8}$ |
| **Max ($x_j$)** | *Nilai Maksimum Kolom* | | **$\max(C_1)$** | **$\max(C_2)$** | **$\max(C_3)$** | **$\max(C_4)$** | **$\max(C_5)$** | **$\max(C_6)$** | **$\max(C_7)$** | **$\max(C_8)$** |

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Sistem kami rancang agar bersih dan fleksibel, siap menerima pendaftaran data guru dan nilai kinerja riil dari pengelola Bimbel Nurul Fikri. Pengelola cukup menambahkan guru di modul Data Guru dan mengisi nilai di modul Penilaian Guru, sistem secara otomatis mengekstrak nilai tertinggi pada setiap kriteria untuk proses kalkulasi."*

---

### SLIDE 7: PROSES NORMALISASI MATRIKS ($R$) DINAMIS
- Rumus Benefit: $r_{ij} = \frac{x_{ij}}{\max(x_j)}$

| Alternatif | Status Alternatif | r1 | r2 | r3 | r4 | r5 | r6 | r7 | r8 |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **A1** | Alternatif Pengajar 1 | $r_{11}$ | $r_{12}$ | $r_{13}$ | $r_{14}$ | $r_{15}$ | $r_{16}$ | $r_{17}$ | $r_{18}$ |
| **A2** | Alternatif Pengajar 2 | $r_{21}$ | $r_{22}$ | $r_{23}$ | $r_{24}$ | $r_{25}$ | $r_{26}$ | $r_{27}$ | $r_{28}$ |
| **A3** | Alternatif Pengajar 3 | $r_{31}$ | $r_{32}$ | $r_{33}$ | $r_{34}$ | $r_{35}$ | $r_{36}$ | $r_{37}$ | $r_{38}$ |
| **A4** | Alternatif Pengajar 4 | $r_{41}$ | $r_{42}$ | $r_{43}$ | $r_{44}$ | $r_{45}$ | $r_{46}$ | $r_{47}$ | $r_{48}$ |
| **A...** | Alternatif Pengajar n | $r_{n1}$ | $r_{n2}$ | $r_{n3}$ | $r_{n4}$ | $r_{n5}$ | $r_{n6}$ | $r_{n7}$ | $r_{n8}$ |

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Pada slide ini ditunjukkan proses normalisasi matriks R secara real-time. Karena seluruh kriteria bertipe benefit, sistem membagi nilai mentah tiap guru dengan nilai maksimum di kolom tersebut, menghasilkan nilai terstandarisasi antara skala 0.0000 hingga 1.0000 sehingga semua aspek kompetensi dapat diperbandingkan secara adil."*

---

### SLIDE 8: HASIL PERANGKINGAN AKHIR ($V_i$) & PENETAPAN REKOMENDASI
- Rumus Preferensi: $V_i = \sum_{j=1}^8 (w_j \times r_{ij})$

| Peringkat | Kandidat Pengajar | Nilai Akhir ($V$) | Status Rekomendasi |
|:---:|:---|:---:|:---|
| **Peringkat 1** | **Kandidat Terbaik #1** | **$\max(V_i)$** | **Sangat Direkomendasikan (Guru Terbaik)** |
| **Peringkat 2** | Kandidat #2 | $V_2$ | Direkomendasikan (Top 3) |
| **Peringkat 3** | Kandidat #3 | $V_3$ | Direkomendasikan (Top 3) |
| **Peringkat 4** | Kandidat #4 | $V_4$ | Cukup |
| **...** | Peringkat Seterusnya | $V_n$ | Cukup |

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Setelah normalisasi dikalikan dengan bobot preferensi 8 kriteria, sistem secara otomatis mengurutkan guru dari nilai tertinggi ke terendah. Pengajar yang memperoleh skor preferensi tertinggi secara langsung ditetapkan sebagai peringkat pertama rekomendasi Guru Terbaik Bimbel Nurul Fikri secara objektif dan transparan."*

---

### SLIDE 9: ARSITEKTUR & TEKNOLOGI SISTEM
- **Front-end Engine:** React 18 + Vite (keringanan performa & reaktivitas tinggi).
- **Desain & Gaya Antarmuka:** Clean Modern Futuristic SaaS berbasis UI-Guideline palet biru `#2563EB`.
- **Ikonografi:** Lucide React untuk kejelasan visual.
- **Struktur Modular (6 Modul Utama):**
  1. Modul Dashboard Eksekutif
  2. Modul Data Guru
  3. Modul Kriteria & Bobot
  4. Modul Penilaian Guru
  5. Modul Perhitungan SAW
  6. Modul Hasil & Laporan Siap Cetak

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Aplikasi ini dikembangkan menggunakan teknologi React 18 dan Vite. Arsitektur sistem menerapkan konsep modularitas yang ketat sesuai PRD, terdiri dari 6 modul independen. Antarmuka mengusung konsep Modern Futuristic SaaS yang bersih, responsif di berbagai perangkat, dan memudahkan navigasi pengguna."*

---

### SLIDE 10: FITUR UNGGULAN APLIKASI
- **1. Dashboard Interaktif:** Memantau metrik total guru, kriteria aktif, dan kandidat teratas.
- **2. Validasi Kelayakan Bobot:** Sistem secara otomatis mendeteksi dan memperingatkan jika total bobot belum bernilai 100%.
- **3. Transparansi Komputasi SAW:** Menyediakan tab langkah demi langkah (Matriks Mentah, Normalisasi, Bobot, dan Skor Akhir) sehingga tidak terjadi *black box* komputasi.
- **4. Cetak Laporan Formal:** Tampilan laporan cetak yang rapi, lengkap dengan tempat pengesahan tanda tangan pimpinan bimbel.

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Beberapa fitur unggulan yang membedakan sistem ini adalah transparansi komputasi di mana evaluator dapat melihat setiap tahap matriks, validasi cerdas saat bobot belum genap 100 persen, serta kemudahan mencetak lembar rekomendasi resmi langsung dari browser untuk keperluan administrasi institusi."*

---

### SLIDE 11: KESIMPULAN & PENGEMBANGAN LANJUTAN
- **Kesimpulan:**
  - Metode SAW berhasil diterapkan pada sistem berbasis web dengan akurasi matematis 100%.
  - Sistem berhasil mengeliminasi bias subjektivitas dan memangkas waktu seleksi guru terbaik.
  - Memenuhi seluruh kriteria penerimaan pada spesifikasi kebutuhan perangkat lunak (PRD).
- **Rencana Pengembangan Selanjutnya:**
  - Integrasi dengan mesin absensi biometrik untuk pengisian nilai kehadiran otomatis.
  - Form evaluasi kepuasan siswa secara daring (*online survey*) untuk kriteria kualitas mengajar.
  - Penyimpanan multi-cabang terpusat berbasis cloud database.

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Dapat disimpulkan bahwa sistem pendukung keputusan ini telah berjalan sesuai rancangan, memberikan luaran yang valid dan teruji, serta mempermudah pengambilan keputusan di Bimbel Nurul Fikri. Untuk pengembangan ke depan, sistem dapat dihubungkan langsung dengan mesin presensi dan kuesioner digital siswa agar penilaian semakin otomatis."*

---

### SLIDE 12: PENUTUP & SESI TANYA JAWAB (Q&A)
- **Terima Kasih** atas perhatian bapak/ibu dosen dan rekan-rekan.
- Sesi tanya jawab, kritik, dan saran dibuka.

> **🎙️ Speaker Notes (Teks Pembicara):**  
> *"Demikian presentasi mengenai Sistem Pendukung Keputusan Pemilihan Guru Terbaik Bimbel Nurul Fikri dengan metode SAW. Terima kasih banyak atas waktu dan perhatian bapak/ibu dosen serta rekan-rekan. Sekarang saya membuka ruang diskusi untuk pertanyaan atau masukan. Terima kasih."*

