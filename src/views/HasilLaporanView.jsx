import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  Trophy, 
  Medal, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  FileText, 
  FileSpreadsheet, 
  Share2, 
  Sparkles,
  Calendar,
  Building
} from 'lucide-react';
import { useSpk } from '../context/SpkContext';

export default function HasilLaporanView({ onNavigate }) {
  const { sawResults, kriteriaList, guruList } = useSpk();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // If SAW calculations are invalid / data incomplete
  if (!sawResults.isValid) {
    return (
      <div className="content-card" style={{ borderLeft: '4px solid var(--color-warning)' }}>
        <div className="content-card-body" style={{ padding: '36px' }}>
          <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-warning-bg)',
              color: 'var(--color-warning)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '8px' }}>
                Laporan Hasil Belum Dapat Diterbitkan
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: 1.6 }}>
                Laporan penetapan peringkat guru terbaik memerlukan data penilaian yang lengkap pada seluruh 8 kriteria.
                Silakan lengkapi nilai kinerja guru pada modul Penilaian Guru terlebih dahulu.
              </p>
              {onNavigate && (
                <button 
                  className="btn btn-primary btn-icon"
                  onClick={() => onNavigate('penilaian-guru')}
                >
                  <span>Buka Modul Penilaian Guru</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { sortedRankings } = sawResults;
  const top1 = sortedRankings[0];
  const top2 = sortedRankings[1];
  const top3 = sortedRankings[2];

  // Print Report Handler
  const handlePrint = () => {
    window.print();
  };

  // Export CSV Handler
  const handleExportCSV = () => {
    const headers = ['Peringkat', 'ID Guru', 'Nama Guru', 'Mata Pelajaran', 'Skor Preferensi (V)', 'Status Rekomendasi'];
    const rows = sortedRankings.map(r => [
      r.rank,
      `"${r.guruId}"`,
      `"${r.guruNama}"`,
      `"${r.guruMapel}"`,
      r.preferenceScore.toFixed(4),
      `"${r.recommendationStatus}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_SPK_Guru_Terbaik_Nurul_Fikri_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const currentDateFormatted = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long'
  }).format(new Date());

  return (
    <div>
      {/* ====================================================================
          PRINT ONLY HEADER (Tampil saat Cetak Fisik / PDF)
          ==================================================================== */}
      <div className="print-only">
        <div className="print-letterhead">
          <div className="print-logo-circle">NF</div>
          <div className="print-letterhead-text">
            <h2>Bimbingan Belajar Nurul Fikri</h2>
            <p>Sistem Pendukung Keputusan Pemilihan Guru Terbaik — Metode Simple Additive Weighting (SAW)</p>
            <p>Jl. Margonda Raya No. 12, Depok, Jawa Barat | Telp: (021) 7888-0000 | Website: nurulfikri.ac.id</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '14pt', textDecoration: 'underline', margin: 0 }}>
            SURAT KEPUTUSAN REKOMENDASI GURU TERBAIK
          </h3>
          <p style={{ fontSize: '10pt', margin: '4px 0 0', color: '#555555' }}>
            Nomor: 042/SK-GURU/BIMBEL-NF/2026 • Tanggal: {currentDateFormatted}
          </p>
        </div>
      </div>

      {/* Screen Toolbar (Disembunyikan saat cetak) */}
      <div className="content-card no-print" style={{ marginBottom: '24px' }}>
        <div className="toolbar-container">
          <div className="toolbar-left">
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-navy)' }}>
                Hasil Akhir dan Laporan Rekomendasi
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                Dokumen keputusan penetapan guru terbaik periode evaluasi berjalan
              </p>
            </div>
          </div>

          <div className="toolbar-right">
            <button
              onClick={handleExportCSV}
              className="btn btn-secondary btn-icon"
              title="Unduh rekapitulasi data format CSV"
            >
              <Download size={16} />
              <span>{downloadSuccess ? 'CSV Diunduh!' : 'Ekspor CSV'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="btn btn-primary btn-icon"
              title="Cetak dokumen resmi atau simpan sebagai PDF"
            >
              <Printer size={16} />
              <span>Cetak Laporan Resmi</span>
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================================
          PODIUM JUARA (TOP 3 GURU TERBAIK)
          ==================================================================== */}
      <div className="podium-grid no-print">
        {/* Juara 2 (Perak) */}
        {top2 && (
          <div className="podium-card podium-rank-2">
            <div className="podium-trophy-circle trophy-silver">
              <Medal size={28} />
            </div>
            <div className="podium-rank-label" style={{ color: '#64748B' }}>Peringkat 2</div>
            <div className="podium-name">{top2.guruNama}</div>
            <div className="podium-mapel">{top2.guruMapel}</div>
            <div className="podium-score-pill score-pill-silver">
              Skor: {top2.preferenceScore.toFixed(4)}
            </div>
            <span className="badge badge-phase">Rekomendasi Utama 2</span>
          </div>
        )}

        {/* Juara 1 (Emas - Posisi Tengah Terdepan) */}
        {top1 && (
          <div className="podium-card podium-rank-1">
            <div className="podium-trophy-circle trophy-gold">
              <Trophy size={32} />
            </div>
            <div className="podium-rank-label" style={{ color: '#D97706' }}>Peringkat 1 — Guru Terbaik</div>
            <div className="podium-name" style={{ fontSize: '18px' }}>{top1.guruNama}</div>
            <div className="podium-mapel" style={{ fontWeight: 600 }}>{top1.guruMapel}</div>
            <div className="podium-score-pill score-pill-gold">
              Skor: {top1.preferenceScore.toFixed(4)}
            </div>
            <span className="badge badge-rank-1">
              <Sparkles size={12} style={{ marginRight: '4px' }} />
              Terpilih Sebagai Guru Terbaik
            </span>
          </div>
        )}

        {/* Juara 3 (Perunggu) */}
        {top3 && (
          <div className="podium-card podium-rank-3">
            <div className="podium-trophy-circle trophy-bronze">
              <Award size={28} />
            </div>
            <div className="podium-rank-label" style={{ color: '#C2410C' }}>Peringkat 3</div>
            <div className="podium-name">{top3.guruNama}</div>
            <div className="podium-mapel">{top3.guruMapel}</div>
            <div className="podium-score-pill score-pill-bronze">
              Skor: {top3.preferenceScore.toFixed(4)}
            </div>
            <span className="badge badge-phase">Rekomendasi Utama 3</span>
          </div>
        )}
      </div>

      {/* ====================================================================
          EXECUTIVE SUMMARY CALLOUT
          ==================================================================== */}
      <div className="executive-callout no-print">
        <div className="executive-icon">
          <FileText size={24} />
        </div>
        <div className="executive-text">
          <h4>Ringkasan Eksekutif Rekomendasi Pimpinan</h4>
          <p>
            Berdasarkan audit kalkulasi metode <strong>Simple Additive Weighting (SAW)</strong> terhadap{' '}
            <strong>{guruList.length} guru alternatif</strong> pada <strong>8 kriteria standar</strong>, diperoleh
            bahwa <strong>{top1?.guruNama || '-'}</strong> menduduki peringkat prioritas tertinggi dengan skor preferensi akhir{' '}
            <strong>{top1 ? top1.preferenceScore.toFixed(4) : '0.0000'}</strong>. Hasil perhitungan ini sah dan dapat ditelusuri per langkahnya
            sebagai instrumen pendukung keputusan pengelola Bimbingan Belajar Nurul Fikri dalam menetapkan penghargaan
            dan apresiasi kinerja pengajar.
          </p>
        </div>
      </div>

      {/* ====================================================================
          FULL RANKING TABLE (Tampil di Layar & Tampilan Cetak)
          ==================================================================== */}
      <div className="content-card">
        <div className="content-card-header">
          <div className="card-title-group">
            <h3>Daftar Rekapitulasi Peringkat Rekomendasi Guru</h3>
            <p>Urutan alternatif berdasarkan preferensi matematis SAW dari nilai tertinggi</p>
          </div>
          <span className="badge badge-success no-print">
            {sortedRankings.length} Guru Terurut
          </span>
        </div>

        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th style={{ width: '70px', textAlign: 'center' }}>Rank</th>
                <th style={{ width: '90px' }}>ID Guru</th>
                <th>Nama Lengkap & Gelar</th>
                <th>Mata Pelajaran</th>
                <th>Pengalaman</th>
                <th style={{ textAlign: 'center', width: '150px' }}>Skor Akhir (V_i)</th>
                <th style={{ width: '180px', textAlign: 'center' }}>Status Rekomendasi</th>
              </tr>
            </thead>
            <tbody>
              {sortedRankings.map((item) => {
                const guruProfile = guruList.find(g => g.id === item.guruId) || {};
                return (
                  <tr key={item.guruId} style={{ backgroundColor: item.rank === 1 ? '#F0FDF4' : 'transparent' }}>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`badge ${item.rank === 1 ? 'badge-rank-1' : 'badge-rank'}`} style={{ fontWeight: 700 }}>
                        #{item.rank}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-rank" style={{ fontWeight: 700 }}>
                        {item.guruId}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--color-navy)' }}>{item.guruNama}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Pengajar Nurul Fikri</div>
                    </td>
                    <td>{item.guruMapel}</td>
                    <td>{guruProfile.pengalaman || '-'}</td>
                    <td style={{ textAlign: 'center' }}>
                      <strong style={{ 
                        fontFamily: 'monospace', 
                        fontSize: '15px', 
                        color: item.rank === 1 ? 'var(--color-success)' : 'var(--color-primary)' 
                      }}>
                        {item.preferenceScore.toFixed(4)}
                      </strong>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`badge ${item.rank === 1 ? 'badge-rank-1' : item.rank <= 3 ? 'badge-success' : 'badge-phase'}`}>
                        {item.recommendationStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ====================================================================
          PRINT ONLY SIGNATURE AREA (Tampil saat Cetak Fisik / PDF)
          ==================================================================== */}
      <div className="print-only">
        <div style={{ marginTop: '20px', fontSize: '10pt', color: '#555555' }}>
          <em>Catatan: Dokumen ini diterbitkan secara otomatis melalui Sistem Pendukung Keputusan Metode Simple Additive Weighting (SAW) Bimbingan Belajar Nurul Fikri.</em>
        </div>

        <div className="print-signature-area">
          <div className="print-signature-box">
            <div>Mengetahui,</div>
            <div style={{ fontWeight: 'bold' }}>Kepala Cabang Bimbingan Belajar</div>
            <div className="signature-line">
              ( Ir. H. Syarifuddin, M.M. )
            </div>
            <div style={{ fontSize: '9pt', color: '#555' }}>NIP: 19800512 200501 1 002</div>
          </div>

          <div className="print-signature-box">
            <div>Depok, {currentDateFormatted}</div>
            <div style={{ fontWeight: 'bold' }}>Ketua Tim Penilai Akademis</div>
            <div className="signature-line">
              ( Dr. Hj. Nur Aini, M.Pd. )
            </div>
            <div style={{ fontSize: '9pt', color: '#555' }}>NIP: 19840819 200802 2 001</div>
          </div>
        </div>
      </div>
    </div>
  );
}
