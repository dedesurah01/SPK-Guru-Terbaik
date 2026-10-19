import React from 'react';
import { 
  Users, 
  SlidersHorizontal, 
  ClipboardCheck, 
  Calculator, 
  FileText, 
  Clock, 
  CheckCircle, 
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';

const MODULE_DETAILS = {
  'data-guru': {
    title: 'Data Guru',
    phase: 'Phase 2 — Modul Data Master',
    icon: Users,
    desc: 'Modul untuk mengelola data identitas pengajar di Bimbingan Belajar Nurul Fikri secara terstruktur.',
    features: [
      'Pencarian dan penyaringan data guru aktif/nonaktif',
      'Form penambahan guru baru dengan validasi data lengkap',
      'Pengubahan data profil guru dan mata pelajaran yang diampu',
      'Penghapusan data guru dengan modal konfirmasi keselamatan'
    ],
    rules: [
      'ID guru unik untuk setiap pengajar',
      'Nama lengkap dan mata pelajaran wajib diisi',
      'Keadaan kosong (empty state) yang informatif saat belum ada data'
    ]
  },
  'kriteria-bobot': {
    title: 'Kriteria dan Bobot',
    phase: 'Phase 2 — Modul Data Master',
    icon: SlidersHorizontal,
    desc: 'Modul untuk mengelola nama kriteria, bobot kepentingan, dan atribut kriteria (benefit/cost).',
    features: [
      'Tabel daftar 8 kriteria standar sesuai dokumen PRD',
      'Pengaturan bobot kepentingan setiap kriteria',
      'Penentuan sifat kriteria (Benefit atau Cost)',
      'Indikator validasi kalkulasi total bobot secara real-time'
    ],
    rules: [
      'Total bobot diwajibkan bernilai 100% untuk kemudahan audit',
      'Bobot tiap kriteria harus bernilai positif (> 0)',
      'Tidak diperkenankan mengubah kriteria tanpa persetujuan eksplisit'
    ]
  },
  'penilaian-guru': {
    title: 'Penilaian Guru',
    phase: 'Phase 3 — Modul Penilaian Guru',
    icon: ClipboardCheck,
    desc: 'Antarmuka terpadu untuk pengisian dan pembaruan nilai kinerja setiap guru pada masing-masing kriteria evaluasi.',
    features: [
      'Matriks formulir input nilai guru per kriteria C1 - C8',
      'Validasi batasan rentang nilai (skala 1 - 100 atau rubrik penilaian)',
      'Deteksi kelengkapan data (indikator guru yang belum dinilai)',
      'Fitur simpan draf dan pembaruan massal'
    ],
    rules: [
      'Perhitungan SAW hanya dapat diproses bila seluruh nilai terisi lengkap',
      'Nilai negatif atau non-numerik otomatis ditolak oleh validasi',
      'Riwayat perubahan nilai tercatat secara transparan'
    ]
  },
  'perhitungan-saw': {
    title: 'Perhitungan SAW',
    phase: 'Phase 4 — Perhitungan SAW',
    icon: Calculator,
    desc: 'Mesin kalkulasi Simple Additive Weighting otomatis dengan visualisasi tahapan matriks yang transparan dan dapat ditelusuri.',
    features: [
      'Matriks Keputusan Awal (X) berukuran m × n',
      'Matriks Ternormalisasi (R) dengan rumus benefit/cost sesuai PRD',
      'Matriks Bobot Ternormalisasi (W)',
      'Kalkulasi Nilai Preferensi Akhir (V_i) untuk setiap guru'
    ],
    rules: [
      'Benefit: r_ij = x_ij / max(x_j)',
      'Cost: r_ij = min(x_j) / x_ij (dengan pencegahan pembagian dengan nol)',
      'V_i = Σ(w_j × r_ij)',
      'Auditabilitas penuh pada setiap langkah perhitungan'
    ]
  },
  'hasil-laporan': {
    title: 'Hasil dan Laporan',
    phase: 'Phase 5 — Hasil dan Laporan',
    icon: FileText,
    desc: 'Penyajian peringkat rekomendasi guru terbaik, ringkasan eksekutif pengambil keputusan, dan fitur cetak laporan.',
    features: [
      'Peringkat berurutan dari nilai preferensi tertinggi ke terendah',
      'Badge penghargaan guru teladan / peringkat 1, 2, 3',
      'Ringkasan eksekutif komparatif untuk pimpinan cabang',
      'Tampilan siap cetak (print stylesheet) untuk dokumen fisik'
    ],
    rules: [
      'Urutan peringkat diverifikasi matematis dari nilai SAW',
      'Hasil disajikan sebagai rekomendasi pendukung keputusan pengelola',
      'Format cetak rapi dan profesional dengan identitas Nurul Fikri'
    ]
  }
};

export default function ModulePlaceholder({ moduleId }) {
  const mod = MODULE_DETAILS[moduleId] || {
    title: 'Modul Sistem',
    phase: 'Phase Mendatang',
    icon: FileSpreadsheet,
    desc: 'Modul ini disiapkan untuk tahap implementasi berikutnya.',
    features: [],
    rules: []
  };

  const Icon = mod.icon;

  return (
    <div className="placeholder-container">
      {/* Hero Header */}
      <div className="placeholder-hero">
        <div className="placeholder-icon-circle">
          <Icon size={34} />
        </div>
        <span className="badge badge-phase" style={{ fontSize: '12px', padding: '4px 12px' }}>
          <Clock size={14} style={{ marginRight: '4px' }} />
          {mod.phase}
        </span>
        <h3>Modul {mod.title}</h3>
        <p>{mod.desc}</p>
      </div>

      {/* Specification Details Grid */}
      <div className="placeholder-specs-grid">
        <div className="spec-box">
          <h4>
            <CheckCircle size={18} color="var(--color-primary)" />
            Rencana Fitur & Kapabilitas
          </h4>
          <ul className="spec-list">
            {mod.features.map((feat, idx) => (
              <li key={idx}>
                <span className="spec-bullet">•</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="spec-box">
          <h4>
            <ShieldCheck size={18} color="var(--color-success)" />
            Kriteria Penerimaan & Validasi SOT
          </h4>
          <ul className="spec-list">
            {mod.rules.map((rule, idx) => (
              <li key={idx}>
                <span className="spec-bullet">•</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
