# Implementation Plan — SPK Guru Terbaik Nurul Fikri

## Prinsip Eksekusi
- Ikuti PRD dan UI-GUIDELINE sebagai sumber kebenaran.
- Satu fase dikerjakan pada satu waktu.
- Setelah keluaran fase ditampilkan dan diperiksa, berhenti dan minta persetujuan eksplisit sebelum fase berikutnya.
- Jangan menjalankan fase berikutnya berdasarkan asumsi atau persetujuan lama jika pengguna meminta peninjauan ulang.
- Perubahan ruang lingkup harus diajukan sebagai keputusan, bukan diterapkan diam-diam.

## Phase 0 — SOT
**Keluaran:** `PRD.md`, `UI-GUIDELINE.md`, `IMPLEMENTATION_PLAN.md`.
**Validasi:** cakupan enam modul, bobot dan rumus SAW, desain, batasan, kriteria penerimaan.
**Gate:** persetujuan eksplisit pengguna.

## Phase 1 — UI Foundation dan Shell
**Keluaran:** proyek React + Vite, token/style dasar, app shell, navigasi enam modul, layout responsif, dashboard awal dengan data simulasi yang ditandai.
**Tidak termasuk:** backend/database, autentikasi nyata, dan logika modul lengkap.
**Validasi:** aplikasi berjalan, navigasi utama tampil, responsive check, build berhasil.
**Gate:** tampilkan preview/catatan implementasi dan minta persetujuan sebelum Phase 2.

## Phase 2 — Modul Data Master
**Keluaran:** UI Data Guru serta Kriteria dan Bobot, form dan validasi dasar.
**Validasi:** operasi UI utama, keadaan kosong, konfirmasi hapus, validasi total bobot.
**Gate:** persetujuan eksplisit.

## Phase 3 — Modul Penilaian Guru
**Keluaran:** antarmuka input/edit nilai guru per kriteria, validasi data lengkap.
**Validasi:** guru dan kriteria terhubung secara konsisten; nilai tidak valid ditolak.
**Gate:** persetujuan eksplisit.

## Phase 4 — Perhitungan SAW
**Keluaran:** perhitungan SAW dan tampilan matriks keputusan, normalisasi, bobot, nilai preferensi.
**Validasi:** contoh uji perhitungan manual, kasus nilai nol, dan data tidak lengkap.
**Gate:** persetujuan eksplisit.

## Phase 5 — Hasil dan Laporan
**Keluaran:** ranking, nilai akhir, ringkasan, dan tampilan cetak laporan bila sesuai ruang lingkup.
**Validasi:** urutan ranking sesuai nilai SAW; data dan label konsisten.
**Gate:** persetujuan eksplisit.

## Phase 6 — Integrasi dan Quality Check
**Keluaran:** penyatuan alur enam modul, pemeriksaan responsivitas, aksesibilitas dasar, dan build.
**Validasi:** checklist PRD, uji alur utama, tidak ada error build yang diketahui.
**Gate:** persetujuan eksplisit sebelum pekerjaan tambahan atau rilis.

## Phase 7 — Dokumentasi dan Panduan Pengguna (Serah Terima)
**Keluaran:** Panduan Pengguna (`USER_MANUAL.md`), Penjelasan Algoritma SAW (`SAW_EXPLANATION.md`), dan Dokumentasi Serah Terima (`README.md`).
**Validasi:** kelengkapan panduan untuk 6 modul, verifikasi kesesuaian matematis SAW dengan PRD, dan panduan instalasi/operasional terverifikasi.
**Gate:** persetujuan eksplisit pengguna untuk penyelesaian akhir proyek.

## Phase 8 - authentication 
**Keluaran:** login dan logout untuk pengguna.
**Validasi:** login dan logout berfungsi.
**Gate:** persetujuan eksplisit sebelum pekerjaan tambahan atau rilis.


## Format Laporan Tiap Fase
1. Fase dan tujuan.
2. File yang dibuat/diubah.
3. Preview atau ringkasan hasil.
4. Validasi yang dijalankan dan hasilnya.
5. Batasan yang masih ada.
6. Pertanyaan keputusan: setuju atau revisi.

## Aturan Berhenti
Setelah setiap fase selesai, jangan lanjut otomatis. Tunggu respons pengguna yang jelas, misalnya `SETUJU, lanjut Phase N` atau instruksi revisi.
