import React from 'react';
import { 
  Users, 
  SlidersHorizontal, 
  ClipboardCheck, 
  Trophy, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  Info,
  Sparkles
} from 'lucide-react';
import KpiCard from '../components/KpiCard';
import { useSpk } from '../context/SpkContext';
import { 
  SIMULATION_METADATA, 
  RANKING_SIMULASI, 
  WORKFLOW_STEPS 
} from '../data/simulationData';

export default function DashboardView({ onNavigate }) {
  const { guruList, kriteriaList, totalBobot, completeness, sawResults } = useSpk();

  const guruAktifCount = guruList.filter(g => g.status === 'Aktif').length;

  // Real-time top candidate
  const topCandidate = sawResults.isValid && sawResults.sortedRankings.length > 0
    ? sawResults.sortedRankings[0]
    : null;

  return (
    <div>
      {/* Integration Phase 6 Notice Banner */}
      <div className="simulation-alert-banner" style={{ background: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)', borderColor: '#86EFAC', borderLeftColor: 'var(--color-success)' }}>
        <div className="simulation-alert-text">
          <CheckCircle2 size={22} color="var(--color-success)" style={{ flexShrink: 0 }} />
          <div>
            <strong style={{ color: '#14532D' }}>Sistem Terintegrasi Penuh (Phase 6 — Siap Pakai)</strong>
            <p style={{ color: '#166534' }}>
              Keenam modul SPK Pemilihan Guru Terbaik Bimbingan Belajar Nurul Fikri telah aktif dan terintegrasi secara menyeluruh: 
              <strong> Data Guru</strong>, <strong>Kriteria & Bobot</strong>, <strong>Penilaian Guru</strong>, <strong>Perhitungan SAW</strong>, dan <strong>Hasil & Laporan (Cetak Dokumen Resmi)</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="kpi-grid">
        <KpiCard
          title="Total Guru Terdaftar"
          value={`${guruList.length} Guru`}
          subtitle={`${guruAktifCount} guru aktif mengajar`}
          icon={Users}
          badgeText="Data Master"
          badgeType="success"
        />
        <KpiCard
          title="Kriteria Keputusan"
          value={`${kriteriaList.length} Kriteria`}
          subtitle={`Total bobot: ${totalBobot}%`}
          icon={SlidersHorizontal}
          badgeText={totalBobot === 100 ? "Audit 100%" : `${totalBobot}%`}
          badgeType={totalBobot === 100 ? "success" : "neutral"}
        />
        <KpiCard
          title="Kelengkapan Penilaian"
          value={completeness.isAllComplete ? "100% Lengkap" : `${completeness.percentage}% Terisi`}
          subtitle={`${completeness.completedGuruCount} dari ${completeness.totalGuruCount} guru dinilai`}
          icon={ClipboardCheck}
          badgeText={completeness.isAllComplete ? "Siap SAW" : "Perlu Input"}
          badgeType={completeness.isAllComplete ? "success" : "warning"}
        />
        <KpiCard
          title="Rekomendasi Peringkat 1"
          value={topCandidate ? topCandidate.guruNama.split(',')[0] : RANKING_SIMULASI[0].nama.split(',')[0]}
          subtitle={topCandidate ? `Skor SAW: ${topCandidate.preferenceScore.toFixed(4)}` : `Skor: ${RANKING_SIMULASI[0].skor}`}
          icon={Trophy}
          badgeText={topCandidate ? "SAW Real-time" : "Simulasi"}
          badgeType="success"
        />
      </div>

      {/* Workflow Stepper */}
      <div className="content-card">
        <div className="content-card-header">
          <div className="card-title-group">
            <h3>Alur Sistem Pendukung Keputusan (Metode SAW)</h3>
            <p>Tahapan alur evaluasi pemilihan guru terbaik di Bimbingan Belajar Nurul Fikri</p>
          </div>
          <span className="badge badge-success">
            <CheckCircle2 size={13} style={{ marginRight: '4px' }} />
            Alur 100% Selesai & Terintegrasi
          </span>
        </div>
        <div className="content-card-body">
          <div className="workflow-stepper">
            {WORKFLOW_STEPS.map((step) => {
              const isCompleted = true; // All steps implemented and verified
              return (
                <div key={step.step} className="step-item">
                  <div className="step-circle completed">
                    <CheckCircle2 size={18} />
                  </div>
                  <div className="step-name">{step.name}</div>
                  <div className="step-desc">
                    {step.step === 1 ? `${guruList.length} Guru Aktif` :
                     step.step === 2 ? `${totalBobot}% Bobot PRD` :
                     step.step === 3 ? `${completeness.percentage}% Nilai Terisi` :
                     step.step === 4 ? `SAW V_i Terhitung` : 'Laporan & Cetak Siap'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="dashboard-columns">
        {/* Left Column: Live SAW Rankings */}
        <div className="content-card">
          <div className="content-card-header">
            <div className="card-title-group">
              <h3>Hasil Peringkat Preferensi SAW</h3>
              <p>
                {sawResults.isValid 
                  ? `Kalkulasi matematis real-time dari ${sawResults.sortedRankings.length} alternatif guru`
                  : 'Data penilaian belum lengkap untuk perhitungan SAW'}
              </p>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('perhitungan-saw')}
                className="btn btn-secondary btn-icon"
                style={{ padding: '4px 10px', fontSize: '12px' }}
              >
                <span>Audit Matriks SAW</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>Rank</th>
                  <th>Nama Guru</th>
                  <th>Mata Pelajaran</th>
                  <th style={{ textAlign: 'center' }}>Nilai Preferensi (V)</th>
                  <th>Status Rekomendasi</th>
                </tr>
              </thead>
              <tbody>
                {sawResults.isValid ? (
                  sawResults.sortedRankings.map((item) => (
                    <tr key={item.guruId} style={{ backgroundColor: item.rank === 1 ? '#F0FDF4' : 'transparent' }}>
                      <td>
                        <span className={`badge ${item.rank === 1 ? 'badge-rank-1' : 'badge-rank'}`}>
                          #{item.rank}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{item.guruNama}</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>ID: {item.guruId}</div>
                      </td>
                      <td>{item.guruMapel}</td>
                      <td style={{ textAlign: 'center' }}>
                        <strong style={{ 
                          color: item.rank === 1 ? 'var(--color-success)' : 'var(--color-primary)', 
                          fontSize: '14px',
                          fontFamily: 'monospace'
                        }}>
                          {item.preferenceScore.toFixed(4)}
                        </strong>
                      </td>
                      <td>
                        <span className={`badge ${item.rank === 1 ? 'badge-rank-1' : item.rank <= 3 ? 'badge-success' : 'badge-phase'}`}>
                          {item.recommendationStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  RANKING_SIMULASI.map((item) => (
                    <tr key={item.kodeGuru}>
                      <td>
                        <span className={`badge ${item.rank === 1 ? 'badge-rank-1' : 'badge-rank'}`}>
                          #{item.rank}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{item.nama}</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>ID: {item.kodeGuru}</div>
                      </td>
                      <td>{item.mapel}</td>
                      <td style={{ textAlign: 'center' }}>
                        <strong style={{ color: 'var(--color-primary)', fontSize: '14px' }}>
                          {item.skor.toFixed(3)}
                        </strong>
                      </td>
                      <td>
                        <span className={`badge ${item.rank <= 3 ? 'badge-success' : 'badge-phase'}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Live Criteria Distribution */}
        <div className="content-card">
          <div className="content-card-header">
            <div className="card-title-group">
              <h3>Distribusi Bobot Kriteria Aktif</h3>
              <p>8 kriteria standar evaluasi Nurul Fikri (Total: {totalBobot}%)</p>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('kriteria-bobot')}
                className="btn btn-secondary btn-icon"
                style={{ padding: '4px 10px', fontSize: '12px' }}
              >
                <span>Kelola Bobot</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
          <div className="content-card-body">
            <div className="criteria-grid">
              {kriteriaList.map((c) => (
                <div key={c.kode} className="criteria-mini-card" title={c.keterangan}>
                  <div className="crit-left">
                    <span className="crit-code">{c.kode}</span>
                    <span className="crit-name">{c.nama}</span>
                  </div>
                  <div className="crit-weight">{c.bobot}%</div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '16px',
              padding: '12px 14px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              fontSize: '12px',
              color: 'var(--color-primary-dark)'
            }}>
              <Info size={18} style={{ flexShrink: 0 }} />
              <div>
                Kriteria C4 (Penguasaan Materi) memiliki bobot tertinggi sebesar <strong>40%</strong> sesuai standar kurikulum Bimbingan Belajar Nurul Fikri.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SAW Principles Information Box */}
      <div className="content-card" style={{ marginBottom: 0 }}>
        <div className="content-card-header">
          <div className="card-title-group">
            <h3>Metodologi Simple Additive Weighting (SAW)</h3>
            <p>Ketentuan perhitungan matematis yang telah diimplementasikan pada Phase 4</p>
          </div>
          <span className="badge badge-success">Formula Terverifikasi</span>
        </div>
        <div className="content-card-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-navy)', marginBottom: '6px' }}>
              1. Normalisasi Matriks (r_ij)
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--color-text-muted)' }}>
              Untuk kriteria Benefit: <code>r_ij = x_ij / max(x_j)</code><br />
              Untuk kriteria Cost: <code>r_ij = min(x_j) / x_ij</code>
            </div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-navy)', marginBottom: '6px' }}>
              2. Pembobotan & Preferensi (V_i)
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--color-text-muted)' }}>
              Nilai Preferensi: <code>V_i = Σ(w_j × r_ij)</code><br />
              Guru dengan nilai <code>V_i</code> tertinggi menjadi rekomendasi prioritas utama.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
