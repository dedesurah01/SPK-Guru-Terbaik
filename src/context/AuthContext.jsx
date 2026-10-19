import React, { createContext, useContext, useState, useCallback } from 'react';

// ============================================================
// AuthContext — Phase 8 Autentikasi Front-End
// Catatan: Sistem autentikasi ini menggunakan kredensial hardcoded
// untuk keperluan demonstrasi. Tidak ada backend/database nyata.
// ============================================================

const AuthContext = createContext(null);

// Kredensial demonstrasi (hardcoded — ditandai sebagai DEMO)
const DEMO_CREDENTIALS = [
  {
    username: 'admin',
    password: 'nurul2025',
    displayName: 'Administrator',
    role: 'Pengelola / Admin',
    avatar: 'AD',
  },
  {
    username: 'pengelola',
    password: 'nf2025',
    displayName: 'Pengelola Cabang',
    role: 'Pengelola Cabang',
    avatar: 'NF',
  },
];

const SESSION_KEY = 'spk_nf_auth_session';

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => loadSession());

  // Returns { success: true, user } or { success: false, error: string }
  const login = useCallback((username, password) => {
    const trimUser = (username || '').trim().toLowerCase();
    const trimPass = (password || '').trim();

    const match = DEMO_CREDENTIALS.find(
      (c) => c.username === trimUser && c.password === trimPass
    );

    if (!match) {
      return { success: false, error: 'Nama pengguna atau kata sandi tidak valid.' };
    }

    const user = {
      username: match.username,
      displayName: match.displayName,
      role: match.role,
      avatar: match.avatar,
      loginAt: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn('Gagal menyimpan sesi ke sessionStorage:', e);
    }

    setSession(user);
    return { success: true, user };
  }, []);

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch (e) {
      console.warn('Gagal menghapus sesi:', e);
    }
    setSession(null);
  }, []);

  const isAuthenticated = session !== null;

  return (
    <AuthContext.Provider value={{ session, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return ctx;
}

export { DEMO_CREDENTIALS };
