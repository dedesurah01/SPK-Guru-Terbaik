import React from 'react';
import { Menu, Sparkles, User, CheckCircle2 } from 'lucide-react';
import { MODULES } from '../data/modulesData';

export default function Header({ activeModule, onToggleMobileMenu }) {
  const currentMod = MODULES.find(m => m.id === activeModule) || { name: 'Modul SPK' };

  return (
    <header className="app-header">
      <div className="header-left">
        <button 
          className="mobile-menu-toggle" 
          onClick={onToggleMobileMenu}
          aria-label="Toggle Menu Sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="header-title-box">
          <h2>{currentMod.name}</h2>
          <p>Sistem Pendukung Keputusan Pemilihan Guru Terbaik</p>
        </div>
      </div>

      <div className="header-right">
        <div className="simulation-pill" style={{ background: '#DCFCE7', borderColor: '#86EFAC', color: '#15803D' }} title="Status implementasi: Phase 6 Sistem Terintegrasi Penuh">
          <CheckCircle2 size={14} />
          <span>Sistem Terintegrasi Penuh</span>
        </div>

        <div className="user-profile-badge">
          <div className="user-avatar">NF</div>
          <div className="user-info">
            <span className="user-name">Pengelola / Admin</span>
            <span className="user-role">Bimbel Nurul Fikri</span>
          </div>
        </div>
      </div>
    </header>
  );
}
