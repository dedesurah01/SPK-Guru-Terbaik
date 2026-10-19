import React from 'react';
import { X } from 'lucide-react';
import { MODULES } from '../data/modulesData';

export default function Sidebar({ activeModule, onSelectModule, isOpen, onClose }) {
  // Group modules by category for clean structure
  const categories = ['Ringkasan & Analisis', 'Data Master', 'Proses Evaluasi', 'Output & Keputusan'];

  return (
    <>
      <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-logo-mark">NF</div>
          <div className="brand-text">
            <h1>Nurul Fikri</h1>
            <p>SPK Guru Terbaik</p>
          </div>
          {isOpen && (
            <button 
              onClick={onClose} 
              aria-label="Tutup Menu"
              style={{
                marginLeft: 'auto',
                background: 'transparent',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="sidebar-menu">
          {categories.map((cat) => {
            const items = MODULES.filter(m => m.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat}>
                <div className="menu-category-title">{cat}</div>
                {items.map((mod) => {
                  const Icon = mod.icon;
                  const isActive = activeModule === mod.id;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => {
                        onSelectModule(mod.id);
                        if (isOpen) onClose();
                      }}
                      className={`nav-item-btn ${isActive ? 'active' : ''}`}
                    >
                      <span className="nav-icon">
                        <Icon size={18} />
                      </span>
                      <span>{mod.name}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="footer-system-status">
            <span className="status-dot"></span>
            <div>
              <div style={{ fontWeight: 600, color: '#E2E8F0', fontSize: '12px' }}>Metode SAW</div>
              <div style={{ fontSize: '11px', color: '#86EFAC' }}>Phase 6 — Sistem Siap Pakai</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
