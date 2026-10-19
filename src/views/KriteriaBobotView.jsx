import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Edit3, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Info,
  ShieldCheck,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useSpk } from '../context/SpkContext';
import Modal from '../components/Modal';

export default function KriteriaBobotView() {
  const { kriteriaList, totalBobot, updateKriteria, resetKriteriaToDefault } = useSpk();

  // Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKode, setEditingKode] = useState(null);
  const [formData, setFormData] = useState({
    kode: '',
    nama: '',
    bobot: '',
    jenis: 'Benefit',
    keterangan: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Feedback Notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Open Edit Modal
  const handleOpenEdit = (kriteria) => {
    setEditingKode(kriteria.kode);
    setFormData({
      kode: kriteria.kode,
      nama: kriteria.nama,
      bobot: kriteria.bobot,
      jenis: kriteria.jenis,
      keterangan: kriteria.keterangan || ''
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Validate & Save Kriteria
  const handleSave = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.nama.trim()) {
      errors.nama = 'Nama kriteria wajib diisi';
    }

    const bobotNum = parseFloat(formData.bobot);
    if (isNaN(bobotNum) || bobotNum <= 0) {
      errors.bobot = 'Bobot harus berupa angka positif lebih dari 0';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    updateKriteria(editingKode, {
      nama: formData.nama.trim(),
      bobot: bobotNum,
      jenis: formData.jenis,
      keterangan: formData.keterangan.trim()
    });

    showToast(`Kriteria ${editingKode} (${formData.nama}) berhasil diperbarui!`);
    setIsModalOpen(false);
  };

  // Handle Reset to SOT PRD Defaults
  const handleReset = () => {
    if (window.confirm('Kembalikan seluruh 8 kriteria dan bobot ke standar default PRD (Total 100%)?')) {
      resetKriteriaToDefault();
      showToast('Seluruh kriteria telah dikembalikan ke standar PRD.', 'info');
    }
  };

  // Validation Status evaluation
  const isAuditPassed = totalBobot === 100;
  const isWeightValid = totalBobot > 0;

  return (
    <div>
      {/* Toast Alert Feedback */}
      {toastMessage && (
        <div className={`alert-toast alert-toast-${toastMessage.type}`}>
          <CheckCircle2 size={18} />
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top Audit & Weight Validation Card */}
      <div className="content-card" style={{ marginBottom: '24px' }}>
        <div className="content-card-header">
          <div className="card-title-group">
            <h3>Audit Validasi Total Bobot Keputusan</h3>
            <p>Pemeriksaan kepatuhan total bobot kriteria untuk rumus normalisasi SAW</p>
          </div>
          <button
            onClick={handleReset}
            className="btn btn-secondary btn-icon"
            title="Reset ke bobot standar PRD"
          >
            <RotateCcw size={15} />
            <span>Reset Standar PRD</span>
          </button>
        </div>

        <div className="content-card-body">
          <div className="weight-audit-summary">
            <div className="audit-kpi">
              <span className="audit-kpi-label">Total Bobot Saat Ini</span>
              <div className="audit-kpi-value-row">
                <span className={`audit-kpi-value ${isAuditPassed ? 'text-success' : 'text-warning'}`}>
                  {totalBobot}%
                </span>
                <span className={`badge ${isAuditPassed ? 'badge-success' : isWeightValid ? 'badge-warning' : 'badge-danger'}`}>
                  {isAuditPassed
                    ? '100% Sesuai Standar Audit'
                    : isWeightValid
                    ? `Perhatian: Total ${totalBobot}% (Disarankan 100%)`
                    : 'Tidak Valid (Total ≤ 0)'}
                </span>
              </div>
            </div>

            <div className="audit-explanation">
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <ShieldCheck size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  <strong>Kaidah Normalisasi Bobot PRD:</strong> Bobot ternormalisasi dihitung dengan rumus{' '}
                  <code style={{ background: '#EFF6FF', padding: '2px 6px', borderRadius: '4px', color: 'var(--color-primary-dark)' }}>
                    w_j = bobot_j / total_bobot
                  </code>
                  . Total bobot harus lebih dari 0. Walaupun rumus SAW mentoleransi total selain 100, PRD menyarankan total 100 agar mudah diaudit dan dipahami pemangku kepentingan.
                </div>
              </div>
            </div>
          </div>

          {/* Visual Distribution Segmented Bar */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-navy)' }}>
              <span>Proporsi Bobot Antar Kriteria (C1 — C8)</span>
              <span>100% Terdistribusi</span>
            </div>
            <div className="segmented-bar-container">
              {kriteriaList.map((c, idx) => {
                const colors = [
                  '#3B82F6', '#60A5FA', '#2563EB', '#1D4ED8', 
                  '#0284C7', '#0EA5E9', '#38BDF8', '#7DD3FC'
                ];
                return (
                  <div
                    key={c.kode}
                    className="segmented-bar-item"
                    style={{
                      width: totalBobot > 0 ? `${(c.rawBobot / totalBobot) * 100}%` : '0%',
                      backgroundColor: colors[idx % colors.length]
                    }}
                    title={`${c.kode} - ${c.nama}: ${c.rawBobot}% (w_${idx + 1} = ${c.normalizedWeight})`}
                  >
                    {c.rawBobot >= 7 && <span>{c.kode}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Criteria Table Card */}
      <div className="content-card">
        <div className="content-card-header">
          <div className="card-title-group">
            <h3>Daftar Kriteria dan Bobot Evaluasi</h3>
            <p>8 kriteria penilaian guru bimbingan belajar Nurul Fikri</p>
          </div>
          <span className="badge badge-benefit">
            {kriteriaList.filter((k) => k.jenis === 'Benefit').length} Benefit
            {kriteriaList.filter((k) => k.jenis === 'Cost').length > 0 &&
              ` / ${kriteriaList.filter((k) => k.jenis === 'Cost').length} Cost`}
          </span>
        </div>

        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th style={{ width: '90px' }}>Kode</th>
                <th>Nama Kriteria</th>
                <th style={{ width: '120px' }}>Bobot Asli</th>
                <th style={{ width: '150px' }}>Bobot Ternormalisasi (w_j)</th>
                <th style={{ width: '130px' }}>Jenis Atribut</th>
                <th>Keterangan / Indikator</th>
                <th style={{ width: '90px', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {kriteriaList.map((kriteria) => (
                <tr key={kriteria.kode}>
                  <td>
                    <span className="badge badge-benefit" style={{ fontWeight: 700 }}>
                      {kriteria.kode}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{kriteria.nama}</div>
                  </td>
                  <td>
                    <strong style={{ fontSize: '14px', color: 'var(--color-text-main)' }}>
                      {kriteria.bobot}%
                    </strong>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--color-primary)' }}>
                        {kriteria.normalizedWeight.toFixed(4)}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                        ({kriteria.percentNormalized})
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${kriteria.jenis === 'Benefit' ? 'badge-benefit' : 'badge-warning'}`}>
                      {kriteria.jenis === 'Benefit' ? (
                        <TrendingUp size={12} style={{ marginRight: '4px' }} />
                      ) : (
                        <TrendingDown size={12} style={{ marginRight: '4px' }} />
                      )}
                      {kriteria.jenis}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)' }}>
                      {kriteria.keterangan || '-'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn-action btn-action-edit"
                      onClick={() => handleOpenEdit(kriteria)}
                      title={`Ubah kriteria ${kriteria.kode}`}
                      aria-label={`Ubah kriteria ${kriteria.kode}`}
                    >
                      <Edit3 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: '#F8FAFC', fontWeight: 700 }}>
                <td colSpan={2} style={{ textAlign: 'right', padding: '14px 16px' }}>
                  Total Bobot:
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ color: isAuditPassed ? 'var(--color-success)' : 'var(--color-warning)' }}>
                    {totalBobot}%
                  </span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontFamily: 'monospace', color: 'var(--color-primary)' }}>
                    {kriteriaList.reduce((acc, k) => acc + k.normalizedWeight, 0).toFixed(4)} (100%)
                  </span>
                </td>
                <td colSpan={3}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Edit Kriteria Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Ubah Kriteria & Bobot (${formData.kode})`}
      >
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Kode Kriteria</label>
            <input
              type="text"
              value={formData.kode}
              disabled
              className="form-input"
              style={{ backgroundColor: '#F1F5F9', cursor: 'not-allowed' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Nama Kriteria <span className="required-star">*</span>
            </label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              className={`form-input ${formErrors.nama ? 'is-invalid' : ''}`}
            />
            {formErrors.nama && <div className="form-error-text">{formErrors.nama}</div>}
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">
                Bobot Kepentingan (%) <span className="required-star">*</span>
              </label>
              <input
                type="number"
                step="1"
                min="1"
                max="100"
                value={formData.bobot}
                onChange={(e) => setFormData({ ...formData, bobot: e.target.value })}
                className={`form-input ${formErrors.bobot ? 'is-invalid' : ''}`}
              />
              {formErrors.bobot && <div className="form-error-text">{formErrors.bobot}</div>}
              <div className="form-help-text">Nilai harus berupa bilangan positif &gt; 0.</div>
            </div>

            <div className="form-group">
              <label className="form-label">Jenis Atribut</label>
              <select
                value={formData.jenis}
                onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
                className="form-select"
              >
                <option value="Benefit">Benefit (Semakin besar semakin baik)</option>
                <option value="Cost">Cost (Semakin kecil semakin baik)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Keterangan / Indikator Penilaian</label>
            <textarea
              rows={3}
              value={formData.keterangan}
              onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
              placeholder="Deskripsi penilaian untuk kriteria ini..."
              className="form-input"
              style={{ resize: 'vertical' }}
            />
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
              Simpan Perubahan Kriteria
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
