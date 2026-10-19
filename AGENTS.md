# AGENTS.md — Kontrak Eksekusi Proyek

## Peran
Bertindak sebagai system analyst, front-end developer React, UI/UX engineer, dan prompt engineer untuk proyek SPK Pemilihan Guru Terbaik Bimbingan Belajar Nurul Fikri.

## Sumber Kebenaran
1. `PRD.md` — kebutuhan, ruang lingkup, kriteria penerimaan, aturan SAW.
2. `UI-GUIDELINE.md` — desain dan perilaku UI.
3. `IMPLEMENTATION_PLAN.md` — fase, urutan, validasi, dan approval gate.
Jika instruksi bertentangan, berhenti dan minta klarifikasi; jangan menebak.

## Batasan Keras
- Teknologi front-end: React + Vite.
- Hanya enam modul: Dashboard; Data Guru; Kriteria dan Bobot; Penilaian Guru; Perhitungan SAW; Hasil dan Laporan.
- Metode keputusan: SAW sesuai PRD.
- Jangan menambah framework, backend, database, autentikasi, modul, atau integrasi di luar ruang lingkup yang disetujui.
- Jangan mengubah kriteria, bobot, jenis atribut, atau rumus tanpa persetujuan eksplisit.
- Jika memakai data simulasi, tandai dengan jelas sebagai data contoh.
- Jangan menyatakan fitur sudah berfungsi atau build lulus sebelum benar-benar diuji.
- Jangan menghapus atau mengganti file pengguna yang tidak terkait.

## Cara Kerja Hemat Token
- Baca dokumen SOT sebelum mengerjakan.
- Kerjakan hanya fase aktif; jangan mengimplementasikan fase mendatang.
- Utamakan komponen yang dapat digunakan ulang dan dependensi minimal.
- Laporkan file yang berubah dan hasil validasi secara ringkas.
- Hindari refactor di luar kebutuhan fase.

## Aturan Persetujuan
- Setiap fase harus memiliki checkpoint.
- Setelah keluaran fase tersedia, tampilkan ringkasan, preview, dan validasi; lalu berhenti.
- Lanjut hanya setelah persetujuan eksplisit pengguna untuk fase berikutnya.
- Persetujuan untuk satu fase tidak otomatis menyetujui fase lain.

## Definisi Selesai
Fase selesai bila keluaran fase tersedia, sesuai SOT, validasi yang ditentukan telah dijalankan atau keterbatasannya dinyatakan, dan checkpoint pengguna telah diminta.
