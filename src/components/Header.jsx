import React, { useState } from 'react';
import { Menu, CheckCircle2, LogOut, ChevronDown } from 'lucide-react';
import { MODULES } from '../data/modulesData';
import { useAuth } from '../context/AuthContext';

export default function Header({ activeModule, onToggleMobileMenu }) {
  const { session, logout } = useAuth();
  const currentMod = MODULES.find((m) => m.id === activeModule) || { name: 'Modul SPK' };
  const [showUserMenu, setShowUserMenu] = useState(false);

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
        <div
          className="simulation-pill"
          style={{ background: '#DCFCE7', borderColor: '#86EFAC', color: '#15803D' }}
          title="Status implementasi: Phase 8 — Autentikasi Aktif"
        >
          <CheckCircle2 size={14} />
          <span>Sistem Terintegrasi Penuh</span>
        </div>

        {/* User Profile Dropdown */}
        <div className="user-profile-dropdown-wrap">
          <button
            className="user-profile-badge user-profile-btn"
            onClick={() => setShowUserMenu((s) => !s)}
            aria-haspopup="true"
            aria-expanded={showUserMenu}
            id="user-menu-trigger"
          >
            <div className="user-avatar">{session?.avatar || 'NF'}</div>
            <div className="user-info">
              <span className="user-name">{session?.displayName || 'Pengguna'}</span>
              <span className="user-role">{session?.role || 'Bimbel Nurul Fikri'}</span>
            </div>
            <ChevronDown
              size={14}
              style={{
                marginLeft: 4,
                transition: 'transform 0.2s',
                transform: showUserMenu ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <>
              {/* Backdrop */}
              <div
                className="user-menu-backdrop"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="user-dropdown-menu" role="menu">
                <div className="user-dropdown-header">
                  <div className="user-dropdown-avatar">{session?.avatar || 'NF'}</div>
                  <div>
                    <p className="user-dropdown-name">{session?.displayName}</p>
                    <p className="user-dropdown-role">{session?.role}</p>
                  </div>
                </div>
                <div className="user-dropdown-divider" />
                <button
                  id="logout-btn"
                  className="user-dropdown-item user-dropdown-logout"
                  onClick={() => { setShowUserMenu(false); logout(); }}
                  role="menuitem"
                >
                  <LogOut size={15} />
                  <span>Keluar dari Sistem</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
