# PRD — SPK Pemilihan Guru Terbaik Nurul Fikri

## 1. Ringkasan
Aplikasi web Sistem Pendukung Keputusan untuk membantu pengelola Bimbingan Belajar Nurul Fikri mengevaluasi dan memberi peringkat guru berdasarkan kriteria terukur menggunakan metode Simple Additive Weighting (SAW).

## 2. Tujuan
- Mengelola data guru, kriteria, bobot, dan nilai secara terstruktur.
- Mengotomatisasi perhitungan SAW secara konsisten dan dapat ditelusuri.
- Menyajikan peringkat dan laporan sebagai bahan pertimbangan pengelola.

## 3. Pengguna
- Pengelola/Admin: mengelola data, kriteria, penilaian, perhitungan, dan laporan.

## 4. Ruang Lingkup Modul
1. **Dashboard** — ringkasan jumlah guru, kriteria, status penilaian, hasil/peringkat ringkas.
2. **Data Guru** — melihat, mencari, menambah, mengubah, dan menghapus data guru.
3. **Kriteria dan Bobot** — mengelola nama kriteria, bobot, jenis benefit/cost, serta validasi total bobot.
4. **Penilaian Guru** — memasukkan dan mengubah nilai guru per kriteria; validasi kelengkapan nilai.
5. **Perhitungan SAW** — menampilkan matriks keputusan, normalisasi, bobot ternormalisasi, dan nilai preferensi.
6. **Hasil dan Laporan** — peringkat guru, skor akhir, dan tampilan laporan yang dapat dicetak melalui fungsi cetak browser jika diimplementasikan.

## 5. Kriteria dan Bobot Awal
| Kode | Kriteria | Bobot awal | Jenis |
|---|---|---:|---|
| C1 | Kehadiran | 10 | Benefit |
| C2 | Kedisiplinan | 10 | Benefit |
| C3 | Kualitas Mengajar | 10 | Benefit |
| C4 | Penguasaan Materi | 40 | Benefit |
| C5 | Persiapan Mengajar | 8 | Benefit |
| C6 | Kemampuan Komunikasi | 8 | Benefit |
| C7 | Pengelolaan Kelas | 7 | Benefit |
| C8 | Hasil Belajar Siswa | 7 | Benefit |
| | **Total** | **100** | |

Bobot awal dinormalisasi dengan `w_j = bobot_j / total_bobot`. Total bobot harus lebih dari nol; validasi menyarankan total 100 agar mudah diaudit. Semua kriteria awal adalah benefit.

## 6. Aturan SAW
- Bentuk matriks keputusan `X` dari nilai guru pada setiap kriteria.
- Untuk benefit: `r_ij = x_ij / max(x_j)`.
- Untuk cost, bila kelak digunakan: `r_ij = min(x_j) / x_ij`, dengan validasi agar penyebut tidak nol.
- Hitung preferensi: `V_i = Σ(w_j × r_ij)`.
- Urutkan nilai `V_i` dari tertinggi ke terendah.
- Perhitungan hanya boleh dilakukan jika data guru, kriteria, bobot, dan nilai yang diperlukan valid dan lengkap.
- Tampilkan tahapan perhitungan agar hasil dapat diverifikasi. Hasil adalah rekomendasi, bukan keputusan otomatis.

## 7. Kebutuhan Nonfungsional
- Antarmuka responsif untuk desktop, tablet, dan ponsel.
- Navigasi konsisten, label berbahasa Indonesia, serta keadaan kosong/error/loading yang jelas.
- Komponen dapat digunakan ulang dan kode dipisahkan secara wajar.
- Validasi input dan konfirmasi sebelum penghapusan.
- Tidak mengklaim penyimpanan permanen atau autentikasi nyata jika belum diimplementasikan.

## 8. Batasan
- Front-end menggunakan React + Vite.
- Fase UI Foundation boleh menggunakan data simulasi yang diberi penanda jelas.
- Backend, database, autentikasi, integrasi eksternal, dan fitur di luar enam modul tidak termasuk kecuali disetujui pada revisi SOT.
- Jangan mengubah bobot/kriteria atau menambah modul tanpa persetujuan.

## 9. Kriteria Penerimaan
- Keenam modul dapat diakses melalui navigasi.
- Tata letak konsisten dengan UI Guideline dan responsif.
- Data simulasi diberi penanda jika digunakan.
- Formulir dan aksi utama memiliki validasi serta umpan balik.
- Perhitungan SAW mengikuti rumus yang ditetapkan dan dapat diperiksa.
- Build proyek berhasil tanpa error yang diketahui pada akhir fase implementasi terkait.
