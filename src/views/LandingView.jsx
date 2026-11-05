import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Medal,
  Scale,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';

/* ─── animated counter hook ─── */
function useCountUp(target, duration, start) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

/* ─── intersection observer hook ─── */
function useInView(threshold) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function StatCard({ value, suffix, label, icon: Icon, start }) {
  const count = useCountUp(value, 1800, start);
  return (
    <div className="lp-stat-card">
      <div className="lp-stat-icon"><Icon size={22} /></div>
      <div className="lp-stat-number">{count}{suffix}</div>
      <div className="lp-stat-label">{label}</div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, color, delay }) {
  return (
    <div className="lp-feature-card" style={{ animationDelay: delay }}>
      <div className="lp-feature-icon-wrap" style={{ '--fc': color }}>
        <Icon size={24} />
      </div>
      <h3 className="lp-feature-title">{title}</h3>
      <p className="lp-feature-desc">{desc}</p>
    </div>
  );
}

function StepCard({ number, title, desc, last }) {
  return (
    <div className="lp-step">
      <div className="lp-step-left">
        <div className="lp-step-num">{number}</div>
        {!last && <div className="lp-step-line" />}
      </div>
      <div className="lp-step-body">
        <h4 className="lp-step-title">{title}</h4>
        <p className="lp-step-desc">{desc}</p>
      </div>
    </div>
  );
}

export default function LandingView({ onEnterApp }) {
  const [statsRef, statsInView] = useInView(0.3);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    { icon: LayoutDashboard, title: 'Dashboard Interaktif',    desc: 'Pantau ringkasan jumlah guru, kriteria, status penilaian, dan peringkat terkini dalam satu tampilan terpadu.',                            color: '#2563EB', delay: '0ms'   },
    { icon: Users,           title: 'Manajemen Data Guru',     desc: 'Tambah, ubah, cari, dan hapus data guru dengan antarmuka yang mudah digunakan dan validasi data lengkap.',                                 color: '#7C3AED', delay: '80ms'  },
    { icon: Scale,           title: 'Kriteria & Bobot',        desc: 'Kelola delapan kriteria evaluasi beserta bobotnya secara fleksibel. Validasi otomatis memastikan total bobot selalu 100.',                  color: '#0891B2', delay: '160ms' },
    { icon: ClipboardList,   title: 'Penilaian Guru',          desc: 'Masukkan nilai guru per kriteria dengan panduan validasi kelengkapan data sebelum perhitungan dijalankan.',                                 color: '#D97706', delay: '240ms' },
    { icon: BarChart3,       title: 'Perhitungan SAW',         desc: 'Lihat matriks keputusan, normalisasi, dan skor preferensi secara transparan — setiap langkah dapat diverifikasi.',                         color: '#16A34A', delay: '320ms' },
    { icon: Medal,           title: 'Hasil & Laporan',         desc: 'Peringkat guru disajikan dengan skor akhir, siap dicetak sebagai laporan resmi untuk keperluan evaluasi.',                                  color: '#DC2626', delay: '400ms' },
  ];

  const steps = [
    { number: 1, title: 'Input Data Guru',          desc: 'Daftarkan seluruh guru beserta informasi dasarnya ke dalam sistem.' },
    { number: 2, title: 'Atur Kriteria & Bobot',    desc: 'Tetapkan delapan kriteria penilaian dan bobotnya sesuai kebijakan lembaga.' },
    { number: 3, title: 'Berikan Penilaian',        desc: 'Masukkan nilai masing-masing guru pada setiap kriteria yang telah ditetapkan.' },
    { number: 4, title: 'Jalankan Perhitungan SAW', desc: 'Sistem otomatis menghitung normalisasi dan preferensi menggunakan metode SAW.' },
    { number: 5, title: 'Lihat Hasil & Cetak',      desc: 'Peringkat guru tersaji lengkap dan siap dicetak sebagai dokumen resmi.' },
  ];

  const criteria = [
    { code: 'C1', name: 'Kehadiran',               weight: 10 },
    { code: 'C2', name: 'Kedisiplinan',             weight: 10 },
    { code: 'C3', name: 'Kualitas Mengajar',        weight: 10 },
    { code: 'C4', name: 'Penguasaan Materi',        weight: 40 },
    { code: 'C5', name: 'Persiapan Mengajar',       weight: 8  },
    { code: 'C6', name: 'Kemampuan Komunikasi',     weight: 8  },
    { code: 'C7', name: 'Pengelolaan Kelas',        weight: 7  },
    { code: 'C8', name: 'Hasil Belajar Siswa',      weight: 7  },
  ];

  const mockupRows = [
    { rank: 1, name: 'Ustadz Ahmad',   score: '0.934', pct: 93 },
    { rank: 2, name: 'Ustadzah Siti',  score: '0.871', pct: 87 },
    { rank: 3, name: 'Ustadz Rizky',   score: '0.812', pct: 81 },
    { rank: 4, name: 'Ustadzah Dewi',  score: '0.754', pct: 75 },
  ];

  return (
    <div className="lp-root">

      {/* ── Navbar ── */}
      <nav className={`lp-nav ${scrolled ? 'lp-nav-scrolled' : ''}`}>
        <div className="lp-nav-inner">
          <div className="lp-nav-brand">
            <div className="lp-nav-logo">NF</div>
            <span className="lp-nav-brand-name">SPK Nurul Fikri</span>
          </div>
          <div className="lp-nav-links">
            <button className="lp-nav-link" onClick={() => scrollToSection('lp-features')}>Fitur</button>
            <button className="lp-nav-link" onClick={() => scrollToSection('lp-how')}>Cara Kerja</button>
            <button className="lp-nav-link" onClick={() => scrollToSection('lp-criteria')}>Kriteria</button>
          </div>
          <button id="lp-masuk-btn" className="lp-btn-primary lp-btn-sm" onClick={onEnterApp}>
            Masuk ke Sistem <ArrowRight size={15} />
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="lp-hero">
        <div className="lp-blob lp-blob-1" />
        <div className="lp-blob lp-blob-2" />
        <div className="lp-blob lp-blob-3" />

        <div className="lp-hero-inner">
          <div className="lp-hero-badge">
            <Sparkles size={14} />
            <span>Sistem Pendukung Keputusan &bull; Metode SAW</span>
          </div>

          <h1 className="lp-hero-title">
            Evaluasi Guru Terbaik
            <span className="lp-hero-title-accent"> Nurul Fikri</span>
            <br />
            <span className="lp-hero-title-sub">Secara Objektif &amp; Transparan</span>
          </h1>

          <p className="lp-hero-desc">
            Platform digital untuk membantu pengelola Bimbingan Belajar Nurul Fikri
            mengevaluasi dan memberi peringkat guru berdasarkan{' '}
            <strong>8 kriteria terukur</strong> menggunakan metode Simple Additive Weighting (SAW).
          </p>

          <div className="lp-hero-ctas">
            <button id="lp-hero-masuk-btn" className="lp-btn-primary lp-btn-lg" onClick={onEnterApp}>
              <GraduationCap size={20} />
              Masuk ke Sistem
            </button>
            <button className="lp-btn-ghost lp-btn-lg" onClick={() => scrollToSection('lp-features')}>
              Pelajari Fitur <ChevronDown size={18} />
            </button>
          </div>

          {/* mockup card */}
          <div className="lp-hero-mockup">
            <div className="lp-mockup-topbar">
              <span className="lp-mockup-dot dot-red" />
              <span className="lp-mockup-dot dot-yellow" />
              <span className="lp-mockup-dot dot-green" />
              <span className="lp-mockup-url">spk.nurulfikri.id / hasil-laporan</span>
            </div>
            <div className="lp-mockup-body">
              <div className="lp-mockup-sidebar">
                {['Dashboard','Data Guru','Kriteria','Penilaian','Htng. SAW','Laporan'].map((m, i) => (
                  <div key={m} className={`lp-mockup-menu-item ${i === 5 ? 'lp-mockup-menu-active' : ''}`}>{m}</div>
                ))}
              </div>
              <div className="lp-mockup-main">
                <div className="lp-mockup-head">
                  <span className="lp-mockup-page-title">Hasil &amp; Laporan</span>
                  <span className="lp-mockup-tag">Data Simulasi</span>
                </div>
                {mockupRows.map((r) => (
                  <div key={r.rank} className="lp-mockup-row">
                    <span className={`lp-mockup-rank lp-rank-${r.rank}`}>#{r.rank}</span>
                    <span className="lp-mockup-name">{r.name}</span>
                    <div className="lp-mockup-bar-track">
                      <div className="lp-mockup-bar-fill" style={{ width: `${r.pct}%` }} />
                    </div>
                    <span className="lp-mockup-score">{r.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button className="lp-hero-scroll" onClick={() => scrollToSection('lp-stats')} aria-label="Scroll ke bawah">
          <ChevronDown size={22} className="lp-bounce" />
        </button>
      </section>

      {/* ── Stats ── */}
      <section id="lp-stats" ref={statsRef} className="lp-stats-section">
        <div className="lp-container">
          <div className="lp-stats-grid">
            <StatCard value={8}   suffix=""      label="Kriteria Evaluasi"        icon={CheckCircle2}    start={statsInView} />
            <StatCard value={100} suffix="%"     label="Total Bobot Tervalidasi"  icon={Scale}           start={statsInView} />
            <StatCard value={6}   suffix=" Modul" label="Modul Terintegrasi"      icon={LayoutDashboard} start={statsInView} />
            <StatCard value={100} suffix="%"     label="Berbasis Web, Responsif"  icon={TrendingUp}      start={statsInView} />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="lp-features" className="lp-section">
        <div className="lp-container">
          <div className="lp-section-head">
            <div className="lp-section-badge">Fitur Lengkap</div>
            <h2 className="lp-section-title">Semua yang Anda Butuhkan</h2>
            <p className="lp-section-desc">
              Enam modul terintegrasi yang membentuk alur evaluasi guru yang lengkap, konsisten, dan dapat ditelusuri.
            </p>
          </div>
          <div className="lp-features-grid">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="lp-how" className="lp-section lp-section-dark">
        <div className="lp-container">
          <div className="lp-section-head">
            <div className="lp-section-badge lp-section-badge-dark">Cara Kerja</div>
            <h2 className="lp-section-title lp-title-light">5 Langkah Mudah</h2>
            <p className="lp-section-desc lp-desc-light">
              Dari input data hingga laporan resmi — prosesnya sederhana, cepat, dan transparan.
            </p>
          </div>
          <div className="lp-steps">
            {steps.map((s, i) => (
              <StepCard key={s.number} {...s} last={i === steps.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Criteria ── */}
      <section id="lp-criteria" className="lp-section">
        <div className="lp-container">
          <div className="lp-section-head">
            <div className="lp-section-badge">Kriteria SAW</div>
            <h2 className="lp-section-title">8 Kriteria Evaluasi Terukur</h2>
            <p className="lp-section-desc">
              Setiap guru dinilai berdasarkan delapan kriteria dengan bobot yang sudah ditetapkan dan dapat dikustomisasi.
            </p>
          </div>
          <div className="lp-criteria-grid">
            {criteria.map((c) => (
              <div key={c.code} className="lp-criteria-card">
                <div className="lp-criteria-top">
                  <span className="lp-criteria-code">{c.code}</span>
                  <span className="lp-criteria-weight">{c.weight}%</span>
                </div>
                <div className="lp-criteria-name">{c.name}</div>
                <div className="lp-criteria-bar-track">
                  <div className="lp-criteria-bar-fill" style={{ width: `${c.weight * 2.5}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="lp-criteria-note">
            <CheckCircle2 size={14} />
            <span>Total bobot: <strong>100%</strong> &nbsp;&bull;&nbsp; Semua kriteria berjenis <strong>Benefit</strong> &nbsp;&bull;&nbsp; <em>Data simulasi</em></span>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lp-cta-section">
        <div className="lp-blob lp-blob-cta-1" />
        <div className="lp-blob lp-blob-cta-2" />
        <div className="lp-container lp-cta-inner">
          <Star size={36} className="lp-cta-star" />
          <h2 className="lp-cta-title">Siap Mengevaluasi Guru Terbaik?</h2>
          <p className="lp-cta-desc">
            Masuk ke sistem dan mulai proses evaluasi yang objektif, transparan, dan dapat dipertanggungjawabkan.
          </p>
          <button id="lp-cta-btn" className="lp-btn-white lp-btn-lg" onClick={onEnterApp}>
            <GraduationCap size={20} />
            Masuk ke Sistem SPK
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="lp-footer">
        <div className="lp-container lp-footer-inner">
          <div className="lp-footer-brand">
            <div className="lp-nav-logo lp-logo-sm">NF</div>
            <div>
              <div className="lp-footer-brand-name">SPK Nurul Fikri</div>
              <div className="lp-footer-sub">Sistem Pendukung Keputusan Pemilihan Guru Terbaik</div>
            </div>
          </div>
          <div className="lp-footer-copy">
            &copy; {new Date().getFullYear()} Bimbingan Belajar Nurul Fikri &nbsp;&bull;&nbsp; Data yang ditampilkan adalah data contoh/simulasi
          </div>
        </div>
      </footer>
    </div>
  );
}
