import React, { useState } from 'react';
import { SpkProvider } from './context/SpkContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import DataGuruView from './views/DataGuruView';
import KriteriaBobotView from './views/KriteriaBobotView';
import PenilaianGuruView from './views/PenilaianGuruView';
import PerhitunganSawView from './views/PerhitunganSawView';
import HasilLaporanView from './views/HasilLaporanView';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Tampilkan halaman login jika belum terautentikasi
  if (!isAuthenticated) {
    return <LoginView />;
  }

  // Router dispatcher
  const renderCurrentModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardView onNavigate={(id) => setActiveModule(id)} />;
      case 'data-guru':
        return <DataGuruView />;
      case 'kriteria-bobot':
        return <KriteriaBobotView />;
      case 'penilaian-guru':
        return <PenilaianGuruView onNavigate={(id) => setActiveModule(id)} />;
      case 'perhitungan-saw':
        return <PerhitunganSawView onNavigate={(id) => setActiveModule(id)} />;
      case 'hasil-laporan':
        return <HasilLaporanView onNavigate={(id) => setActiveModule(id)} />;
      default:
        return <DashboardView onNavigate={(id) => setActiveModule(id)} />;
    }
  };

  return (
    <div className="app-layout">
      {/* Mobile Backdrop Overlay */}
      <div
        className={`sidebar-overlay ${isMobileSidebarOpen ? 'active' : ''}`}
        onClick={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Sidebar */}
      <Sidebar
        activeModule={activeModule}
        onSelectModule={(id) => setActiveModule(id)}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header
          activeModule={activeModule}
          onToggleMobileMenu={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        <main className="page-content">
          {renderCurrentModule()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SpkProvider>
        <AppContent />
      </SpkProvider>
    </AuthProvider>
  );
}
