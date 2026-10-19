import React, { useState, useMemo } from 'react';
import { 
  ClipboardCheck, 
  Search, 
  Edit3, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  HelpCircle,
  Sparkles,
  Info,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useSpk } from '../context/SpkContext';
import Modal from '../components/Modal';

export default function PenilaianGuruView({ onNavigate }) {
  const { 
    guruList, 
    kriteriaList, 
    penilaianMap, 
    setGuruScores, 
    fillDefaultScores,
    resetPenilaianToDefault, 
    isGuruComplete,
    completeness 
  } = useSpk();

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua'); // 'Semua' | 'Lengkap' | 'Belum'

  // Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuru, setSelectedGuru] = useState(null);
  const [scoresInput, setScoresInput] = useState({});
  const [errorsInput, setErrorsInput] = useState({});

  // Toast Feedback
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Teachers
  const filteredGuru = useMemo(() => {
    return guruList.filter((guru) => {
      const matchSearch = 
        guru.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guru.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guru.mapel.toLowerCase().includes(searchQuery.toLowerCase());

      const complete = isGuruComplete(guru.id);
      const matchFilter = 
        filterStatus === 'Semua' 
          ? true 
          : filterStatus === 'Lengkap' 
          ? complete 
          : !complete;

      return matchSearch && matchFilter;
    });
  }, [guruList, searchQuery, filterStatus, penilaianMap, kriteriaList]);

  // Open Edit Modal for a Guru
  const handleOpenEdit = (guru) => {
    setSelectedGuru(guru);
    const existingScores = penilaianMap[guru.id] || {};
    const initialInput = {};
    
    kriteriaList.forEach((k) => {
      initialInput[k.kode] = existingScores[k.kode] !== undefined ? existingScores[k.kode] : '';
    });

    setScoresInput(initialInput);
    setErrorsInput({});
    setIsModalOpen(true);
  };

  // Save Modal Input
  const handleSaveScores = (e) => {
    e.preventDefault();
    const errors = {};
    const sanitizedScores = {};

    kriteriaList.forEach((k) => {
      const val = scoresInput[k.kode];
      if (val === '' || val === undefined || val === null) {
        errors[k.kode] = `Nilai ${k.kode} wajib diisi`;
      } else {
        const num = parseFloat(val);
        if (isNaN(num)) {
          errors[k.kode] = 'Harus berupa angka';
        } else if (num < 0 || num > 100) {
          errors[k.kode] = 'Skala nilai harus 0 - 100';
        } else {
          sanitizedScores[k.kode] = num;
        }
      }
    });

    if (Object.keys(errors).length > 0) {
      setErrorsInput(errors);
      return;
    }

    setGuruScores(selectedGuru.id, sanitizedScores);
    showToast(`Nilai evaluasi ${selectedGuru.nama} berhasil disimpan!`);
    setIsModalOpen(false);
  };

  // Quick fill default for a teacher
  const handleQuickFill = (guru) => {
    fillDefaultScores(guru.id);
    showToast(`Nilai standar (80) telah diisikan untuk ${guru.nama}.`);
  };

  // Calculate live average in modal
  const liveAverage = useMemo(() => {
    const values = Object.values(scoresInput)
      .map(v => parseFloat(v))
      .filter(v => !isNaN(v) && v >= 0 && v <= 100);
    if (values.length === 0) return 0;
    const sum = values.reduce((a, b) => a + b, 0);
    return (sum / values.length).toFixed(1);
  }, [scoresInput]);

  // Color helper for matrix cell
  const getCellScoreColor = (val) => {
    if (val === undefined || val === null || val === '') return '#94A3B8';
    if (val >= 90) return '#15803D'; // green
    if (val >= 80) return '#2563EB'; // blue
    if (val >= 70) return '#D97706'; // amber
    return '#DC2626'; // red
  };

  return (
    <div>
      {/* Toast Alert Feedback */}
      {toastMessage && (
        <div className={`alert-toast alert-toast-${toastMessage.type}`}>
          <CheckCircle2 size={18} />
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Completeness & Audit Status Card */}
      <div className="content-card" style={{ marginBottom: '24px' }}>
        <div className="content-card-header">
          <div className="card-title-group">
            <h3>Audit Kesiapan Matriks Penilaian (Matriks Keputusan X)</h3>
            <p>Pemeriksaan kelengkapan input evaluasi guru untuk perhitungan SAW Phase 4</p>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Reset seluruh nilai evaluasi ke data simulasi default PRD?')) {
                resetPenilaianToDefault();
                showToast('Nilai evaluasi telah di-reset ke data simulasi default.', 'info');
              }
            }}
            className="btn btn-secondary btn-icon"
            title="Kembalikan seluruh penilaian ke contoh default"
          >
            <RotateCcw size={15} />
            <span>Reset Nilai Contoh</span>
          </button>
        </div>

        <div className="content-card-body">
          <div className="weight-audit-summary">
            <div className="audit-kpi">
              <span className="audit-kpi-label">Status Kelengkapan Evaluasi</span>
              <div className="audit-kpi-value-row">
                <span className={`audit-kpi-value ${completeness.isAllComplete ? 'text-success' : 'text-warning'}`}>
                  {completeness.percentage}%
                </span>
                <span className={`badge ${completeness.isAllComplete ? 'badge-success' : 'badge-warning'}`}>
                  {completeness.isAllComplete
                    ? '100% Lengkap (Siap Dihitung SAW)'
                    : `${completeness.incompleteCount} Guru Belum Lengkap`}
                </span>
              </div>
            </div>

            <div className="audit-explanation">
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Info size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  <strong>Kaidah Prasyarat Perhitungan SAW:</strong> Menurut PRD, pembentukan matriks keputusan{' '}
                  <code style={{ background: '#EFF6FF', padding: '2px 6px', borderRadius: '4px', color: 'var(--color-primary-dark)' }}>
                    X = [x_ij]
                  </code>{' '}
                  mewajibkan seluruh kriteria terisi lengkap untuk setiap guru alternatif. Nilai yang belum terisi akan menghambat normalisasi kriteria secara objektif.
                </div>
              </div>
            </div>
          </div>

          {/* Completeness Progress Bar */}
          <div style={{ marginTop: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--color-navy)' }}>
              <span>
                Progress Penilaian: {completeness.completedGuruCount} dari {completeness.totalGuruCount} Guru Terpenuhi
              </span>
              <span>{completeness.percentage}%</span>
            </div>
            <div style={{
              height: '10px',
              backgroundColor: '#E2E8F0',
              borderRadius: '9999px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${completeness.percentage}%`,
                backgroundColor: completeness.isAllComplete ? 'var(--color-success)' : 'var(--color-primary)',
                transition: 'width 0.4s ease'
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="content-card" style={{ marginBottom: '20px' }}>
        <div className="toolbar-container">
          <div className="toolbar-left">
            <div className="search-input-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Cari guru untuk dinilai..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input search-input"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="clear-search-btn">×</button>
              )}
            </div>

            <div className="filter-select-box">
              <Filter size={16} className="filter-icon" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="form-select filter-select"
              >
                <option value="Semua">Semua Guru ({guruList.length})</option>
                <option value="Lengkap">Nilai Lengkap ({completeness.completedGuruCount})</option>
                <option value="Belum">Belum Lengkap ({completeness.incompleteCount})</option>
              </select>
            </div>
          </div>

          <div className="toolbar-right">
            <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)' }}>
              Skala Penilaian: <strong>0 – 100</strong> (Rubrik Akademis NF)
            </span>
          </div>
        </div>
      </div>

      {/* Evaluation Matrix Table */}
      <div className="content-card">
        <div className="content-card-header">
          <div className="card-title-group">
            <h3>Matriks Evaluasi Kinerja Guru (Data Nilai per Kriteria)</h3>
            <p>Nilai riil setiap guru terhadap 8 kriteria evaluasi Bimbingan Belajar Nurul Fikri</p>
          </div>
          <span className="badge badge-rank">
            {guruList.length} Guru Alternatif × {kriteriaList.length} Kriteria
          </span>
        </div>

        {guruList.length === 0 ? (
          <div className="empty-state-box">
            <div className="empty-state-icon">
              <ClipboardCheck size={36} />
            </div>
            <h4>Belum Ada Data Guru Terdaftar</h4>
            <p>Silakan tambahkan data guru terlebih dahulu melalui modul Data Guru untuk melakukan penilaian.</p>
            {onNavigate && (
              <button 
                className="btn btn-primary btn-icon"
                onClick={() => onNavigate('data-guru')}
              >
                <span>Buka Modul Data Guru</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        ) : filteredGuru.length === 0 ? (
          <div className="empty-state-box">
            <h4>Data Guru Tidak Ditemukan</h4>
            <p>Tidak ada guru yang cocok dengan kata kunci "{searchQuery}" atau filter "{filterStatus}".</p>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSearchQuery('');
                setFilterStatus('Semua');
              }}
            >
              Bersihkan Filter
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>ID</th>
                  <th style={{ minWidth: '180px' }}>Nama Guru</th>
                  {kriteriaList.map((k) => (
                    <th key={k.kode} style={{ textAlign: 'center', minWidth: '70px' }} title={`${k.nama} (Bobot: ${k.bobot}%)`}>
                      <div>{k.kode}</div>
                      <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: 400 }}>
                        {k.bobot}%
                      </div>
                    </th>
                  ))}
                  <th style={{ textAlign: 'center', width: '90px' }}>Rata-rata</th>
                  <th style={{ textAlign: 'center', width: '120px' }}>Status</th>
                  <th style={{ textAlign: 'center', width: '130px' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuru.map((guru) => {
                  const scores = penilaianMap[guru.id] || {};
                  const isComplete = isGuruComplete(guru.id);

                  // Calculate average for row
                  const validVals = kriteriaList
                    .map(k => scores[k.kode])
                    .filter(v => v !== undefined && v !== null && v !== '');
                  const rowAvg = validVals.length > 0 
                    ? (validVals.reduce((a, b) => a + Number(b), 0) / validVals.length).toFixed(1) 
                    : '-';

                  return (
                    <tr key={guru.id}>
                      <td>
                        <span className="badge badge-rank" style={{ fontWeight: 700 }}>
                          {guru.id}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{guru.nama}</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{guru.mapel}</div>
                      </td>
                      {kriteriaList.map((k) => {
                        const val = scores[k.kode];
                        const isFilled = val !== undefined && val !== null && val !== '';
                        return (
                          <td 
                            key={k.kode} 
                            style={{ 
                              textAlign: 'center', 
                              fontWeight: 600,
                              fontFamily: 'monospace',
                              fontSize: '13px',
                              color: getCellScoreColor(val)
                            }}
                          >
                            {isFilled ? val : (
                              <span style={{ color: '#CBD5E1', fontStyle: 'italic' }}>—</span>
                            )}
                          </td>
                        );
                      })}
                      <td style={{ textAlign: 'center' }}>
                        <strong style={{ 
                          color: rowAvg !== '-' && Number(rowAvg) >= 80 ? 'var(--color-primary)' : 'var(--color-text-main)',
                          fontFamily: 'monospace',
                          fontSize: '13px'
                        }}>
                          {rowAvg}
                        </strong>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`badge ${isComplete ? 'badge-success' : 'badge-warning'}`}>
                          {isComplete ? 'Lengkap' : 'Belum Lengkap'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button
                            className="btn btn-secondary btn-icon"
                            style={{ padding: '5px 10px', fontSize: '12px' }}
                            onClick={() => handleOpenEdit(guru)}
                            title={`Edit nilai ${guru.nama}`}
                          >
                            <Edit3 size={14} />
                            <span>Input Nilai</span>
                          </button>

                          {!isComplete && (
                            <button
                              className="btn btn-secondary btn-icon"
                              style={{ padding: '5px 8px', fontSize: '12px' }}
                              onClick={() => handleQuickFill(guru)}
                              title="Isi otomatis dengan nilai standar (80)"
                            >
                              <Sparkles size={14} color="var(--color-primary)" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Scores Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedGuru ? `Input Nilai Evaluasi: ${selectedGuru.nama} (${selectedGuru.id})` : 'Input Nilai Guru'}
        maxWidth="680px"
      >
        {selectedGuru && (
          <form onSubmit={handleSaveScores}>
            <div style={{ 
              background: '#F8FAFC', 
              padding: '12px 16px', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-navy)' }}>
                  {selectedGuru.nama}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  Mata Pelajaran: {selectedGuru.mapel} • ID: {selectedGuru.id}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  Live Rata-rata
                </div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-primary)' }}>
                  {liveAverage}
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '16px',
              maxHeight: '380px',
              overflowY: 'auto',
              paddingRight: '6px'
            }}>
              {kriteriaList.map((k) => (
                <div key={k.kode} className="form-group" style={{ marginBottom: '10px' }}>
                  <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>
                      <strong style={{ color: 'var(--color-primary)' }}>{k.kode}</strong> — {k.nama}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      Bobot: {k.bobot}%
                    </span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    placeholder="Skala 0 - 100"
                    value={scoresInput[k.kode] ?? ''}
                    onChange={(e) => {
                      setScoresInput({
                        ...scoresInput,
                        [k.kode]: e.target.value
                      });
                      if (errorsInput[k.kode]) {
                        setErrorsInput({ ...errorsInput, [k.kode]: null });
                      }
                    }}
                    className={`form-input ${errorsInput[k.kode] ? 'is-invalid' : ''}`}
                  />
                  {errorsInput[k.kode] && (
                    <div className="form-error-text">{errorsInput[k.kode]}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan Nilai Evaluasi
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
