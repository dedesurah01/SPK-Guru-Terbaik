import { 
  LayoutDashboard, 
  Users, 
  SlidersHorizontal, 
  ClipboardCheck, 
  Calculator, 
  FileText 
} from 'lucide-react';

export const MODULES = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, category: 'Ringkasan & Analisis' },
  { id: 'data-guru', name: 'Data Guru', icon: Users, category: 'Data Master' },
  { id: 'kriteria-bobot', name: 'Kriteria dan Bobot', icon: SlidersHorizontal, category: 'Data Master' },
  { id: 'penilaian-guru', name: 'Penilaian Guru', icon: ClipboardCheck, category: 'Proses Evaluasi' },
  { id: 'perhitungan-saw', name: 'Perhitungan SAW', icon: Calculator, category: 'Proses Evaluasi' },
  { id: 'hasil-laporan', name: 'Hasil dan Laporan', icon: FileText, category: 'Output & Keputusan' },
];
