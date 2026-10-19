# UI Guideline — SPK Guru Terbaik Nurul Fikri

## 1. Arah Visual
Modern futuristic SaaS: bersih, profesional, ringan, terstruktur, dengan aksen biru. Hindari dekorasi berlebihan yang mengganggu pembacaan data.

## 2. Palet Warna
- Primary: `#2563EB`
- Primary dark: `#1D4ED8`
- Navy / sidebar: `#0F172A`
- Page background: `#F5F8FF`
- Surface/card: `#FFFFFF`
- Border: `#E2E8F0`
- Main text: `#0F172A`
- Muted text: `#64748B`
- Success: `#16A34A`
- Warning: `#D97706`
- Danger: `#DC2626`

Pastikan teks memiliki kontras yang baik. Warna status selalu disertai label, bukan warna saja.

## 3. Tipografi dan Spasi
- Gunakan font sans-serif modern seperti Inter; fallback `system-ui, sans-serif`.
- Judul halaman jelas, subjudul ringkas, angka KPI mudah dipindai.
- Gunakan skala spasi konsisten berbasis kelipatan 4/8 px.
- Radius kartu 12–16 px; tombol dan input konsisten.

## 4. App Shell
- Sidebar navigasi dengan identitas Nurul Fikri dan enam modul.
- Header berisi judul/konteks halaman dan area profil pengguna simulasi bila diperlukan.
- Konten utama memiliki lebar fleksibel dan padding yang cukup.
- Pada layar kecil, sidebar berubah menjadi navigasi yang dapat dibuka/tutup; tabel tetap dapat diakses tanpa merusak layout.

## 5. Komponen
- **KPI cards:** label singkat, angka utama, ikon sederhana, konteks bila relevan.
- **Tables:** judul kolom jelas, pencarian/filter bila diperlukan, aksi konsisten, empty state.
- **Forms:** label eksplisit, input yang sesuai, validasi dekat dengan field, tombol simpan/batal.
- **Buttons:** primary untuk aksi utama; secondary/outline untuk aksi pendukung; destructive untuk hapus.
- **Badges:** status dengan teks, warna netral sebagai default.
- **Charts:** hanya untuk membantu membaca data; beri judul dan label yang jelas.
- **SAW results:** pisahkan matriks keputusan, normalisasi, dan nilai akhir agar transparan.
- **Feedback:** gunakan pesan berhasil/gagal dan konfirmasi sebelum tindakan destruktif.

## 6. Perilaku dan Aksesibilitas
- Semua kontrol interaktif memiliki label yang bermakna.
- Tampilkan focus state yang terlihat dan navigasi keyboard yang wajar.
- Jangan menggunakan warna sebagai satu-satunya pembeda.
- Berikan empty state, error state, dan placeholder yang informatif.
- Hindari animasi berlebihan; transisi singkat dan halus bila diperlukan.

## 7. Responsivitas
- Desktop: sidebar tetap dan konten multi-kolom.
- Tablet: kurangi jumlah kolom KPI dan beri ruang pada tabel.
- Mobile: satu kolom, sidebar collapsible, aksi formulir mudah dijangkau.
- Tidak boleh ada elemen penting yang terpotong pada lebar layar kecil.

## 8. Prinsip Konsistensi
- Gunakan token warna, radius, spasi, dan komponen yang dapat digunakan ulang.
- Bahasa antarmuka: Bahasa Indonesia.
- Pertahankan istilah modul persis seperti yang ditetapkan dalam PRD.
- Jangan menambahkan modul atau pola visual di luar ruang lingkup tanpa persetujuan.
