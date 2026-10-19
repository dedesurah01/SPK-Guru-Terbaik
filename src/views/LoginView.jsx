import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, AlertCircle, Shield, User, Lock } from 'lucide-react';
import { useAuth, DEMO_CREDENTIALS } from '../context/AuthContext';

export default function LoginView() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Nama pengguna dan kata sandi wajib diisi.');
      return;
    }

    setIsLoading(true);
    // Simulasi delay autentikasi agar terasa natural
    await new Promise((resolve) => setTimeout(resolve, 600));

    const result = login(username, password);
    if (!result.success) {
      setError(result.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-page">
      {/* Left Panel — Branding */}
      <div className="login-brand-panel">
        <div className="login-brand-content">
          <div className="login-brand-logo-wrap">
            <div className="login-brand-logo">NF</div>
          </div>
          <h1 className="login-brand-title">Bimbingan Belajar<br />Nurul Fikri</h1>
          <p className="login-brand-subtitle">
            Sistem Pendukung Keputusan (SPK)<br />Pemilihan Guru Terbaik
          </p>

          {/* Feature highlights */}
          <div className="login-brand-features">
            {[
              { icon: '📊', text: 'Evaluasi objektif berbasis data' },
              { icon: '🔢', text: 'Algoritma SAW teraudit & transparan' },
              { icon: '📄', text: 'Laporan resmi siap cetak' },
            ].map((f, i) => (
              <div key={i} className="login-brand-feature-item">
                <span className="login-feature-icon">{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Decorative circles */}
          <div className="login-decor-circle login-decor-circle-1" />
          <div className="login-decor-circle login-decor-circle-2" />
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="login-form-panel">
        <div className="login-form-card">
          {/* Header */}
          <div className="login-form-header">
            <div className="login-form-icon-wrap">
              <Shield size={28} color="var(--color-primary)" />
            </div>
            <h2 className="login-form-title">Masuk ke Sistem SPK</h2>
            <p className="login-form-desc">
              Masukkan kredensial Anda untuk mengakses dasbor evaluasi guru.
            </p>
          </div>

          {/* Demo notice */}
          <div className="login-demo-notice">
            <AlertCircle size={14} />
            <div>
              <strong>Mode Demonstrasi</strong>
              <p>
                Gunakan akun: <code>admin</code> / <code>nurul2025</code>
                &nbsp;atau&nbsp;
                <code>pengelola</code> / <code>nf2025</code>
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Username */}
            <div className="login-field">
              <label htmlFor="login-username" className="login-label">
                Nama Pengguna
              </label>
              <div className="login-input-wrap">
                <User size={16} className="login-input-icon" />
                <input
                  id="login-username"
                  type="text"
                  className={`login-input ${error ? 'login-input-error' : ''}`}
                  placeholder="Masukkan nama pengguna"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(''); }}
                  autoComplete="username"
                  disabled={isLoading}
                  autoFocus
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-field">
              <label htmlFor="login-password" className="login-label">
                Kata Sandi
              </label>
              <div className="login-input-wrap">
                <Lock size={16} className="login-input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className={`login-input login-input-pass ${error ? 'login-input-error' : ''}`}
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="login-toggle-pass"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="login-error-msg" role="alert">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              id="login-submit-btn"
              className="login-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="login-spinner" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Masuk ke Sistem</span>
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="login-footer-note">
            Sistem ini hanya dapat diakses oleh Pengelola dan Admin resmi Bimbingan Belajar Nurul Fikri.
          </p>
        </div>
      </div>
    </div>
  );
}
