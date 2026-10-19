import React, { useState } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  AlertTriangle, 
  FileSpreadsheet, 
  ArrowRight, 
  Copy, 
  Check, 
  Sparkles, 
  TrendingUp, 
  Info,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useSpk } from '../context/SpkContext';

export default function PerhitunganSawView({ onNavigate }) {
  const { sawResults, kriteriaList, guruList, completeness } = useSpk();

  // Active calculation tab
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'x' | 'r' | 'w' | 'v'
  const [copied, setCopied] = useState(false);

  // Copy Summary Handler
  const handleCopySummary = () => {
    if (!sawResults.isValid) return;
    const text = sawResults.sortedRankings
      .map(r => `Rank ${r.rank}: ${r.guruNama} (${r.guruId}) - Skor: ${r.preferenceScore.toFixed(4)}`)
      .join('\n');
    navigator.clipboard.writeText(`HASIL PERHITUNGAN METODE SAW — BIMBEL NURUL FIKRI\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // If data is invalid / incomplete
  if (!sawResults.isValid) {
    return (
      <div>
        <div className="content-card" style={{ borderLeft: '4px solid var(--color-warning)' }}>
          <div className="content-card-body" style={{ padding: '32px' }}>
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
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '8px' }}>
                  Perhitungan SAW Belum Dapat Diproses
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: 1.6 }}>
                  {sawResults.error}
                </p>

                {sawResults.incompleteGurus && sawResults.incompleteGurus.length > 0 && (
                  <div style={{
                    background: '#F8FAFC',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    marginBottom: '20px'
                  }}>
                    <strong style={{ fontSize: '13px', color: 'var(--color-navy)', display: 'block', marginBottom: '8px' }}>
                      Daftar Guru yang Belum Lengkap Dinilai:
                    </strong>
                    <ul style={{ paddingLeft: '20px', fontSize: '13px', color: 'var(--color-text-main)' }}>
                      {sawResults.incompleteGurus.map(({ guru, missingKriteria }) => (
                        <li key={guru.id} style={{ marginBottom: '4px' }}>
                          <strong>{guru.nama} ({guru.id})</strong> — Kriteria belum terisi: <span style={{ color: 'var(--color-danger)', fontWeight: 600 }}>{missingKriteria.join(', ')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {onNavigate && (
                  <button 
                    className="btn btn-primary btn-icon"
                    onClick={() => onNavigate('penilaian-guru')}
                  >
                    <span>Lengkapi Nilai di Penilaian Guru</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { decisionMatrix, criteriaExtremes, normalizedMatrix, weights, sortedRankings } = sawResults;

  return (
    <div>
      {/* Top Summary & Success Audit Banner */}
      <div className="content-card" style={{ marginBottom: '24px' }}>
        <div className="content-card-header">
          <div className="card-title-group">
            <h3>Audit Algoritma Simple Additive Weighting (SAW)</h3>
            <p>Tahapan verifikasi matematis matriks keputusan, normalisasi, dan nilai preferensi</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleCopySummary}
              className="btn btn-secondary btn-icon"
              title="Salin ringkasan peringkat ke clipboard"
            >
              {copied ? <Check size={16} color="var(--color-success)" /> : <Copy size={16} />}
              <span>{copied ? 'Tersalin!' : 'Salin Hasil SAW'}</span>
            </button>
          </div>
        </div>

        <div className="content-card-body">
          <div className="weight-audit-summary">
            <div className="audit-kpi">
              <span className="audit-kpi-label">Status Algoritma SAW</span>
              <div className="audit-kpi-value-row">
                <span className="audit-kpi-value text-success">Valid</span>
                <span className="badge badge-success">
                  <CheckCircle2 size={13} style={{ marginRight: '4px' }} />
                  Kalkulasi 100% Terverifikasi
                </span>
              </div>
            </div>

            <div className="audit-explanation">
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Sparkles size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  <strong>Kaidah Keputusan PRD:</strong> Nilai Preferensi dihitung dengan rumus{' '}
                  <code style={{ background: '#EFF6FF', padding: '2px 6px', borderRadius: '4px', color: 'var(--color-primary-dark)' }}>
                    V_i = Σ(w_j × r_ij)
                  </code>
                  . Rekomendasi urutan guru terbaik ditentukan dari nilai preferensi tertinggi ke terendah sebagai bahan pertimbangan pengelola Bimbingan Belajar Nurul Fikri.
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tab Selector */}
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            marginTop: '20px', 
            flexWrap: 'wrap',
            borderTop: '1px solid var(--color-border)',
            paddingTop: '16px'
          }}>
            <button
              className={`btn ${activeTab === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('all')}
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              Semua Tahapan Matriks
            </button>
            <button
              className={`btn ${activeTab === 'x' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('x')}
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              1. Matriks Keputusan (X)
            </button>
            <button
              className={`btn ${activeTab === 'r' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('r')}
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              2. Matriks Ternormalisasi (R)
            </button>
            <button
              className={`btn ${activeTab === 'w' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('w')}
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              3. Bobot Ternormalisasi (W)
            </button>
            <button
              className={`btn ${activeTab === 'v' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('v')}
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              4. Nilai Preferensi (V)
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================================
          TAHAP 1: MATRIKS KEPUTUSAN (X)
          ==================================================================== */}
      {(activeTab === 'all' || activeTab === 'x') && (
        <div className="content-card">
          <div className="content-card-header">
            <div className="card-title-group">
              <h3>Tahap 1: Matriks Keputusan (X)</h3>
              <p>Nilai riil evaluasi setiap guru terhadap masing-masing kriteria evaluasi (m × n)</p>
            </div>
            <span className="badge badge-rank">
              X = [{decisionMatrix.length} × {kriteriaList.length}]
            </span>
          </div>
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>Alternatif</th>
                  <th style={{ minWidth: '170px' }}>Nama Guru</th>
                  {kriteriaList.map((k) => (
                    <th key={k.kode} style={{ textAlign: 'center', minWidth: '65px' }}>
                      <div>{k.kode}</div>
                      <div style={{ fontSize: '10px', color: 'var(--color-primary)' }}>{k.jenis}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {decisionMatrix.map((row) => (
                  <tr key={row.guruId}>
                    <td>
                      <span className="badge badge-rank" style={{ fontWeight: 700 }}>
                        {row.guruId}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{row.guruNama}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{row.guruMapel}</div>
                    </td>
                    {kriteriaList.map((k) => (
                      <td key={k.kode} style={{ textAlign: 'center', fontWeight: 600, fontFamily: 'monospace' }}>
                        {row.values[k.kode]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ backgroundColor: '#F8FAFC', fontWeight: 700, borderTop: '2px solid var(--color-border)' }}>
                  <td colSpan={2} style={{ padding: '10px 16px', color: 'var(--color-navy)' }}>
                    Nilai Maksimum [Max(x_j)]
                  </td>
                  {kriteriaList.map((k) => (
                    <td key={k.kode} style={{ textAlign: 'center', color: 'var(--color-success)', fontFamily: 'monospace' }}>
                      {criteriaExtremes[k.kode].max}
                    </td>
                  ))}
                </tr>
                <tr style={{ backgroundColor: '#F8FAFC', fontWeight: 700 }}>
                  <td colSpan={2} style={{ padding: '10px 16px', color: 'var(--color-navy)' }}>
                    Nilai Minimum [Min(x_j)]
                  </td>
                  {kriteriaList.map((k) => (
                    <td key={k.kode} style={{ textAlign: 'center', color: 'var(--color-primary)', fontFamily: 'monospace' }}>
                      {criteriaExtremes[k.kode].min}
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* ====================================================================
          TAHAP 2: MATRIKS TERNORMALISASI (R)
          ==================================================================== */}
      {(activeTab === 'all' || activeTab === 'r') && (
        <div className="content-card">
          <div className="content-card-header">
            <div className="card-title-group">
              <h3>Tahap 2: Matriks Ternormalisasi (R)</h3>
              <p>
                Kriteria Benefit: <code>r_ij = x_ij / max(x_j)</code> | Kriteria Cost: <code>r_ij = min(x_j) / x_ij</code>
              </p>
            </div>
            <span className="badge badge-benefit">Skala Normalisasi 0 — 1</span>
          </div>
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>Alternatif</th>
                  <th style={{ minWidth: '170px' }}>Nama Guru</th>
                  {kriteriaList.map((k) => (
                    <th key={k.kode} style={{ textAlign: 'center', minWidth: '85px' }}>
                      <div>r_{k.kode}</div>
                      <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                        Max: {criteriaExtremes[k.kode].max}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {normalizedMatrix.map((row) => (
                  <tr key={row.guruId}>
                    <td>
                      <span className="badge badge-rank" style={{ fontWeight: 700 }}>
                        {row.guruId}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{row.guruNama}</div>
                    </td>
                    {kriteriaList.map((k) => {
                      const item = row.normalizedValues[k.kode];
                      return (
                        <td 
                          key={k.kode} 
                          style={{ 
                            textAlign: 'center', 
                            fontFamily: 'monospace',
                            fontWeight: 600,
                            color: item.normalized === 1 ? 'var(--color-success)' : 'var(--color-text-main)'
                          }}
                          title={`Formula: ${item.formula} = ${item.normalized}`}
                        >
                          {item.normalized.toFixed(4)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ====================================================================
          TAHAP 3: BOBOT TERNORMALISASI (W)
          ==================================================================== */}
      {(activeTab === 'all' || activeTab === 'w') && (
        <div className="content-card">
          <div className="content-card-header">
            <div className="card-title-group">
              <h3>Tahap 3: Vektor Bobot Ternormalisasi (W)</h3>
              <p>Perhitungan bobot relatif: <code>w_j = bobot_j / Σ(bobot)</code> (Total bobot = 1.0000)</p>
            </div>
            <span className="badge badge-phase">Vektor W</span>
          </div>
          <div className="content-card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
              {kriteriaList.map((k) => {
                const w = weights[k.kode];
                return (
                  <div 
                    key={k.kode} 
                    style={{ 
                      background: '#F8FAFC', 
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-primary)' }}>
                      w_{k.kode}
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-navy)', margin: '4px 0' }}>
                      {w.w_j.toFixed(4)}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      {k.nama} ({w.rawBobot}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          TAHAP 4: NILAI PREFERENSI (V) & HASIL PERHITUNGAN
          ==================================================================== */}
      {(activeTab === 'all' || activeTab === 'v') && (
        <div className="content-card" style={{ marginBottom: 0 }}>
          <div className="content-card-header">
            <div className="card-title-group">
              <h3>Tahap 4: Matriks Nilai Preferensi Akhir (V)</h3>
              <p>Kalkulasi perkalian bobot dan nilai ternormalisasi: <code>V_i = Σ(w_j × r_ij)</code></p>
            </div>
            <span className="badge badge-success">Rekomendasi Terurut</span>
          </div>
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th style={{ width: '70px', textAlign: 'center' }}>Rank</th>
                  <th style={{ width: '90px' }}>ID Guru</th>
                  <th>Nama Lengkap Guru</th>
                  <th>Mata Pelajaran</th>
                  {kriteriaList.map((k) => (
                    <th key={k.kode} style={{ textAlign: 'center', fontSize: '10px' }}>
                      w_{k.kode}×r_{k.kode}
                    </th>
                  ))}
                  <th style={{ textAlign: 'center', minWidth: '130px' }}>Nilai Akhir (V_i)</th>
                  <th style={{ textAlign: 'center', minWidth: '160px' }}>Status Rekomendasi</th>
                </tr>
              </thead>
              <tbody>
                {sortedRankings.map((item) => (
                  <tr key={item.guruId} style={{ backgroundColor: item.rank === 1 ? '#F0FDF4' : 'transparent' }}>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`badge ${item.rank === 1 ? 'badge-rank-1' : 'badge-rank'}`}>
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
                    </td>
                    <td>{item.guruMapel}</td>
                    {kriteriaList.map((k) => {
                      const val = item.breakdown[k.kode];
                      return (
                        <td key={k.kode} style={{ textAlign: 'center', fontSize: '11.5px', fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>
                          {val.weightedScore.toFixed(3)}
                        </td>
                      );
                    })}
                    <td style={{ textAlign: 'center' }}>
                      <strong style={{ 
                        fontSize: '15px', 
                        fontFamily: 'monospace', 
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
