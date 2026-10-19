import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  Filter, 
  CheckCircle2, 
  AlertCircle,
  UserCheck,
  GraduationCap
} from 'lucide-react';
import { useSpk } from '../context/SpkContext';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';

export default function DataGuruView() {
  const { guruList, addGuru, updateGuru, deleteGuru, resetGuruToDefault } = useSpk();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [editingGuruId, setEditingGuruId] = useState(null);

  // Form Fields
  const [formData, setFormData] = useState({
    id: '',
    nama: '',
    mapel: '',
    pengalaman: '',
    status: 'Aktif'
  });
  const [formErrors, setFormErrors] = useState({});

  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Feedback Notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Guru List
  const filteredGuru = useMemo(() => {
    return guruList.filter((guru) => {
      const matchSearch = 
        guru.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guru.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guru.mapel.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchStatus = statusFilter === 'Semua' ? true : guru.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [guruList, searchQuery, statusFilter]);

  // Handle Open Add Modal
  const handleOpenAdd = () => {
    // Generate next ID like G-00X
    const maxNum = guruList.reduce((max, g) => {
      const num = parseInt(g.id.replace(/\D/g, ''), 10);
      return !isNaN(num) && num > max ? num : max;
    }, 0);
    const nextId = `G-${String(maxNum + 1).padStart(3, '0')}`;

    setModalMode('add');
    setEditingGuruId(null);
    setFormData({
      id: nextId,
      nama: '',
      mapel: '',
      pengalaman: '3 Tahun',
      status: 'Aktif'
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Handle Open Edit Modal
  const handleOpenEdit = (guru) => {
    setModalMode('edit');
    setEditingGuruId(guru.id);
    setFormData({
      id: guru.id,
      nama: guru.nama,
      mapel: guru.mapel,
      pengalaman: guru.pengalaman || '',
      status: guru.status || 'Aktif'
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Validate & Save Form
  const handleSave = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.nama.trim()) {
      errors.nama = 'Nama lengkap guru wajib diisi';
    }
    if (!formData.mapel.trim()) {
      errors.mapel = 'Mata pelajaran wajib diisi';
    }
    if (!formData.id.trim()) {
      errors.id = 'ID guru wajib diisi';
    } else if (modalMode === 'add') {
      const exists = guruList.some((g) => g.id.toLowerCase() === formData.id.trim().toLowerCase());
      if (exists) {
        errors.id = 'ID Guru sudah digunakan';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (modalMode === 'add') {
      addGuru({
        id: formData.id.trim(),
        nama: formData.nama.trim(),
        mapel: formData.mapel.trim(),
        pengalaman: formData.pengalaman.trim() || '1 Tahun',
        status: formData.status
      });
      showToast(`Guru ${formData.nama} berhasil ditambahkan!`);
    } else {
      updateGuru(editingGuruId, {
        nama: formData.nama.trim(),
        mapel: formData.mapel.trim(),
        pengalaman: formData.pengalaman.trim() || '1 Tahun',
        status: formData.status
      });
      showToast(`Data guru ${formData.nama} berhasil diperbarui!`);
    }

    setIsModalOpen(false);
  };

  // Handle Delete Request
  const handleRequestDelete = (guru) => {
    setDeleteTarget(guru);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteGuru(deleteTarget.id);
      showToast(`Data guru ${deleteTarget.nama} telah dihapus.`, 'info');
      setDeleteTarget(null);
    }
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

      {/* Control Toolbar */}
      <div className="content-card" style={{ marginBottom: '20px' }}>
        <div className="toolbar-container">
          <div className="toolbar-left">
            <div className="search-input-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Cari berdasarkan nama, mapel, atau ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="clear-search-btn"
                  title="Hapus pencarian"
                >
                  ×
                </button>
              )}
            </div>

            <div className="filter-select-box">
              <Filter size={16} className="filter-icon" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-select filter-select"
              >
                <option value="Semua">Semua Status</option>
                <option value="Aktif">Status Aktif</option>
                <option value="Cuti">Status Cuti</option>
              </select>
            </div>
          </div>

          <div className="toolbar-right">
            <button
              onClick={resetGuruToDefault}
              className="btn btn-secondary btn-icon"
              title="Kembalikan data awal simulasi 5 guru"
            >
              <RotateCcw size={16} />
              <span>Reset Data Contoh</span>
            </button>

            <button
              onClick={handleOpenAdd}
              className="btn btn-primary btn-icon"
            >
              <Plus size={18} />
              <span>Tambah Guru Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="content-card">
        <div className="content-card-header">
          <div className="card-title-group">
            <h3>Daftar Guru Pengajar ({filteredGuru.length} Data)</h3>
            <p>Data master guru bimbingan belajar Nurul Fikri sebagai alternatif SPK</p>
          </div>
          <span className="badge badge-rank">
            Total Terdaftar: {guruList.length} Guru
          </span>
        </div>

        {filteredGuru.length === 0 ? (
          <div className="empty-state-box">
            <div className="empty-state-icon">
              <Users size={36} />
            </div>
            <h4>Data Guru Tidak Ditemukan</h4>
            <p>
              {searchQuery || statusFilter !== 'Semua'
                ? `Tidak ada guru yang sesuai dengan kriteria filter "${searchQuery}".`
                : 'Belum ada guru yang terdaftar dalam sistem.'}
            </p>
            {searchQuery || statusFilter !== 'Semua' ? (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('Semua');
                }}
              >
                Bersihkan Filter Pencarian
              </button>
            ) : (
              <button className="btn btn-primary btn-icon" onClick={handleOpenAdd}>
                <Plus size={16} />
                <span>Tambah Guru Sekarang</span>
              </button>
            )}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th style={{ width: '100px' }}>ID Guru</th>
                  <th>Nama Lengkap & Gelar</th>
                  <th>Mata Pelajaran</th>
                  <th>Pengalaman</th>
                  <th style={{ width: '120px' }}>Status</th>
                  <th style={{ width: '140px', textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuru.map((guru) => (
                  <tr key={guru.id}>
                    <td>
                      <span className="badge badge-rank" style={{ fontWeight: 700 }}>
                        {guru.id}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="avatar-initials">
                          {guru.nama.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{guru.nama}</div>
                          <div style={{ fontSize: '11.5px', color: 'var(--color-text-muted)' }}>
                            Pengajar Nurul Fikri
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <GraduationCap size={15} color="var(--color-primary)" />
                        {guru.mapel}
                      </span>
                    </td>
                    <td>{guru.pengalaman || '-'}</td>
                    <td>
                      <span className={`badge ${guru.status === 'Aktif' ? 'badge-success' : 'badge-phase'}`}>
                        <UserCheck size={12} style={{ marginRight: '4px' }} />
                        {guru.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          className="btn-action btn-action-edit"
                          onClick={() => handleOpenEdit(guru)}
                          title="Ubah data guru"
                          aria-label={`Ubah data ${guru.nama}`}
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          className="btn-action btn-action-delete"
                          onClick={() => handleRequestDelete(guru)}
                          title="Hapus guru"
                          aria-label={`Hapus ${guru.nama}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Guru Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'add' ? 'Tambah Data Guru Baru' : `Ubah Data Guru (${formData.id})`}
      >
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">
              ID / Kode Guru <span className="required-star">*</span>
            </label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              disabled={modalMode === 'edit'}
              placeholder="Contoh: G-006"
              className={`form-input ${formErrors.id ? 'is-invalid' : ''}`}
            />
            {formErrors.id && <div className="form-error-text">{formErrors.id}</div>}
            <div className="form-help-text">ID unik untuk membedakan alternatif pada matriks SAW.</div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Nama Lengkap & Gelar <span className="required-star">*</span>
            </label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              placeholder="Contoh: Muhammad Ilham, M.Pd."
              className={`form-input ${formErrors.nama ? 'is-invalid' : ''}`}
            />
            {formErrors.nama && <div className="form-error-text">{formErrors.nama}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Mata Pelajaran yang Diampu <span className="required-star">*</span>
            </label>
            <input
              type="text"
              value={formData.mapel}
              onChange={(e) => setFormData({ ...formData, mapel: e.target.value })}
              placeholder="Contoh: Matematika Saintek / Fisika"
              className={`form-input ${formErrors.mapel ? 'is-invalid' : ''}`}
            />
            {formErrors.mapel && <div className="form-error-text">{formErrors.mapel}</div>}
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Pengalaman Mengajar</label>
              <input
                type="text"
                value={formData.pengalaman}
                onChange={(e) => setFormData({ ...formData, pengalaman: e.target.value })}
                placeholder="Contoh: 4 Tahun"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Status Keaktifan</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="form-select"
              >
                <option value="Aktif">Aktif</option>
                <option value="Cuti">Cuti</option>
              </select>
            </div>
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
              {modalMode === 'add' ? 'Simpan Guru' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Safety Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus Guru"
        message={
          deleteTarget
            ? `Apakah Anda yakin ingin menghapus data pengajar "${deleteTarget.nama}" (${deleteTarget.id})? Data guru yang dihapus tidak akan diikutsertakan dalam penilaian SAW.`
            : ''
        }
      />
    </div>
  );
}
