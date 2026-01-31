import React, { useState, useEffect, useRef } from 'react';

const translations = {
  ko: {
    nav: {
      home: '홈',
      intro: '소개',
      features: '기능',
      help: '도움말',
      graphBible: '그래프 성경',
      download: '다운로드'
    },
    hero: {
      badge: '성경 인물 관계 시각화',
      title: '그래프 성경',
      subtitle: '성경 속 600명 이상의 인물들과 350개 이상의 관계를 인터랙티브 그래프로 탐험하세요',
      cta: '지금 시작하기',
      webVersion: '웹에서 바로 사용',
      appVersion: '앱 다운로드'
    },
    intro: {
      title: '성경을 새로운 방식으로',
      description: '그래프 성경은 성경 속 인물들의 관계를 인터랙티브한 그래프로 시각화하여 성경을 새로운 방식으로 이해할 수 있게 도와줍니다.',
      stats: [
        { value: '600+', label: '성경 인물' },
        { value: '350+', label: '인물 관계' },
        { value: '66권', label: '개역개정 성경' },
        { value: '2개', label: '지원 언어' }
      ]
    },
    features: {
      title: '주요 기능',
      items: [
        {
          icon: '🔗',
          title: '인물 관계 그래프',
          description: '600명 이상의 성경 인물과 350개 이상의 관계를 시각적으로 탐색'
        },
        {
          icon: '📅',
          title: '타임라인',
          description: '창조 시대부터 초대교회까지, 시대별 주요 사건 정리'
        },
        {
          icon: '📖',
          title: '성경 읽기',
          description: '개역개정 성경 전문 66권을 깔끔한 UI로 읽기'
        },
        {
          icon: '🔍',
          title: '검색 기능',
          description: '인물 이름, 역할, 설명으로 빠르게 검색'
        },
        {
          icon: '🧠',
          title: 'MBTI 매칭',
          description: '나와 닮은 성경 인물 찾기'
        },
        {
          icon: '🌐',
          title: '이중 언어',
          description: '한국어/영어 자유롭게 전환'
        }
      ]
    },
    help: {
      title: '사용 방법',
      items: [
        { icon: '👆', title: '인물 선택', description: '노드 클릭으로 상세 정보 확인' },
        { icon: '✋', title: '이동하기', description: '화면 드래그로 그래프 이동' },
        { icon: '🔎', title: '확대/축소', description: '휠/핀치로 줌 인/아웃' },
        { icon: '📚', title: '성경 구절', description: '관련 구절 클릭으로 바로 읽기' }
      ]
    },
    download: {
      title: '앱 다운로드',
      description: '모바일에서 더 편하게 사용하세요',
      googlePlay: 'Google Play',
      appStore: 'App Store (준비중)'
    },
    footer: {
      copyright: '© 2024-2025 그래프 성경',
      privacy: '개인정보처리방침'
    },
    video: {
      skip: '건너뛰기',
      mute: '음소거',
      unmute: '소리 켜기'
    }
  },
  en: {
    nav: {
      home: 'Home',
      intro: 'About',
      features: 'Features',
      help: 'Help',
      graphBible: 'Graph Bible',
      download: 'Download'
    },
    hero: {
      badge: 'Bible Character Visualization',
      title: 'Graph Bible',
      subtitle: 'Explore 600+ Bible characters and 350+ relationships through interactive graphs',
      cta: 'Get Started',
      webVersion: 'Use on Web',
      appVersion: 'Download App'
    },
    intro: {
      title: 'Experience the Bible in a New Way',
      description: 'Graph Bible helps you understand the Bible by visualizing relationships between characters through interactive graphs.',
      stats: [
        { value: '600+', label: 'Characters' },
        { value: '350+', label: 'Relationships' },
        { value: '66', label: 'Bible Books' },
        { value: '2', label: 'Languages' }
      ]
    },
    features: {
      title: 'Key Features',
      items: [
        { icon: '🔗', title: 'Relationship Graph', description: 'Visually explore 600+ characters and 350+ relationships' },
        { icon: '📅', title: 'Timeline', description: 'From Creation to Early Church, major events at a glance' },
        { icon: '📖', title: 'Bible Reading', description: 'Read all 66 books with clean UI' },
        { icon: '🔍', title: 'Search', description: 'Quick search by name, role, or description' },
        { icon: '🧠', title: 'MBTI Matching', description: 'Find your Bible character match' },
        { icon: '🌐', title: 'Bilingual', description: 'Switch between Korean and English' }
      ]
    },
    help: {
      title: 'How to Use',
      items: [
        { icon: '👆', title: 'Select', description: 'Click node for details' },
        { icon: '✋', title: 'Navigate', description: 'Drag to move around' },
        { icon: '🔎', title: 'Zoom', description: 'Wheel/pinch to zoom' },
        { icon: '📚', title: 'Verses', description: 'Click verses to read' }
      ]
    },
    download: {
      title: 'Download App',
      description: 'Use more conveniently on mobile',
      googlePlay: 'Google Play',
      appStore: 'App Store (Soon)'
    },
    footer: {
      copyright: '© 2024-2025 Graph Bible',
      privacy: 'Privacy Policy'
    },
    video: {
      skip: 'Skip',
      mute: 'Mute',
      unmute: 'Unmute'
    }
  }
};

// 전체화면 인트로 비디오 컴포넌트
export function IntroVideo({ lang, onSkip, onEnd }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const tr = translations[lang] || translations.ko;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 비디오 로드 타임아웃 - 3초 내 재생 안되면 스킵
    const timeout = setTimeout(() => {
      if (!isPlaying) {
        onSkip();
      }
    }, 3000);

    const handleCanPlay = () => {
      setIsLoading(false);
      video.play()
        .then(() => setIsPlaying(true))
        .catch(() => onSkip()); // 자동재생 차단 시 스킵
    };

    const handleError = () => onSkip();

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    return () => {
      clearTimeout(timeout);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [onSkip, isPlaying]);

  // 컨트롤 숨기기 타이머
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  }, [isPlaying]);

  const handleVideoEnd = () => {
    onEnd();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#000',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      background: '#000'
    },
    controls: {
      position: 'absolute',
      top: '24px',
      right: '24px',
      display: 'flex',
      gap: '10px',
      opacity: showControls ? 1 : 0.3,
      transition: 'opacity 0.3s',
      zIndex: 10000
    },
    muteButton: {
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.1rem',
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(8px)',
      color: '#fff',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    skipButton: {
      padding: '10px 20px',
      fontSize: '0.9rem',
      fontWeight: '600',
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(8px)',
      color: '#fff',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '20px',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    loading: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#fff',
      fontSize: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px'
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '3px solid rgba(255, 255, 255, 0.2)',
      borderTopColor: '#fbbf24',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };

  // CSS 애니메이션 추가
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div
      style={styles.container}
      onClick={() => setShowControls(true)}
      onMouseMove={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        style={{ ...styles.video, opacity: isPlaying ? 1 : 0 }}
        src="/promo.mp4"
        muted={isMuted}
        playsInline
        onEnded={handleVideoEnd}
      />

      {/* 로딩 중 표시 */}
      {isLoading && (
        <div style={styles.loading}>
          <div style={styles.spinner} />
          <span>Loading...</span>
        </div>
      )}

      {/* 컨트롤 버튼 - 재생 중일 때만 표시 */}
      {isPlaying && (
        <div style={styles.controls}>
          <button style={styles.muteButton} onClick={(e) => { e.stopPropagation(); toggleMute(); }}>
            {isMuted ? '🔇' : '🔊'}
          </button>
          <button style={styles.skipButton} onClick={(e) => { e.stopPropagation(); onSkip(); }}>
            {tr.video.skip}
          </button>
        </div>
      )}
    </div>
  );
}

// 메인 랜딩 페이지
export default function LandingPage({ lang, setLang, onEnterGraph }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const tr = translations[lang] || translations.ko;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a1a 0%, #0d0f1a 50%, #0a0a1a 100%)',
      color: '#f4f6fb',
      fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
      overflowX: 'hidden'
    },
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(10, 10, 26, 0.9)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: isMobile ? '10px 12px' : '12px 32px'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      flexShrink: 0
    },
    logoIcon: { fontSize: '1.4rem' },
    logoText: {
      fontSize: isMobile ? '0.95rem' : '1.05rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    nav: {
      display: isMobile ? 'none' : 'flex',
      alignItems: 'center',
      gap: '20px'
    },
    navLink: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.85rem',
      fontWeight: '500',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: '6px 0',
      transition: 'color 0.2s'
    },
    headerButtons: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flexShrink: 0
    },
    graphBtn: {
      padding: isMobile ? '6px 10px' : '8px 14px',
      fontSize: isMobile ? '0.75rem' : '0.85rem',
      fontWeight: '600',
      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      color: '#000',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    },
    downloadBtn: {
      padding: isMobile ? '6px 10px' : '8px 14px',
      fontSize: isMobile ? '0.75rem' : '0.85rem',
      fontWeight: '600',
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#fff',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      cursor: 'pointer',
      textDecoration: 'none',
      whiteSpace: 'nowrap'
    },
    langBtn: {
      padding: '6px 8px',
      fontSize: '0.8rem',
      fontWeight: '600',
      background: 'rgba(255, 255, 255, 0.08)',
      color: '#a5b4fc',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '6px',
      cursor: 'pointer'
    },
    heroSection: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '100px 20px 60px' : '120px 40px 80px',
      textAlign: 'center'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(251, 191, 36, 0.15)',
      color: '#fbbf24',
      padding: '8px 16px',
      borderRadius: '20px',
      border: '1px solid rgba(251, 191, 36, 0.3)',
      fontSize: '0.85rem',
      fontWeight: '600',
      marginBottom: '24px'
    },
    heroTitle: {
      fontSize: isMobile ? '2.8rem' : '4rem',
      fontWeight: '800',
      margin: '0 0 20px',
      background: 'linear-gradient(135deg, #fff, #e3e8ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      lineHeight: 1.1
    },
    heroSubtitle: {
      fontSize: isMobile ? '1.05rem' : '1.25rem',
      color: 'rgba(255, 255, 255, 0.7)',
      maxWidth: '600px',
      margin: '0 0 40px',
      lineHeight: '1.6'
    },
    heroButtons: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '16px',
      alignItems: 'center'
    },
    primaryBtn: {
      padding: '16px 36px',
      fontSize: '1.1rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      color: '#000',
      border: 'none',
      borderRadius: '14px',
      cursor: 'pointer',
      boxShadow: '0 10px 40px rgba(251, 191, 36, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    secondaryBtn: {
      padding: '14px 28px',
      fontSize: '1rem',
      fontWeight: '600',
      background: 'rgba(255, 255, 255, 0.08)',
      color: '#fff',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '14px',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    section: {
      padding: isMobile ? '60px 20px' : '100px 40px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    sectionTitle: {
      fontSize: isMobile ? '1.8rem' : '2.5rem',
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: '16px',
      background: 'linear-gradient(135deg, #fff, #a5b4fc)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    sectionDescription: {
      fontSize: '1.05rem',
      color: 'rgba(255, 255, 255, 0.7)',
      textAlign: 'center',
      maxWidth: '700px',
      margin: '0 auto 50px',
      lineHeight: '1.7'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: '16px',
      marginTop: '40px'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      padding: '24px 16px',
      textAlign: 'center'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: '800',
      color: '#fbbf24',
      marginBottom: '4px'
    },
    statLabel: {
      fontSize: '0.9rem',
      color: 'rgba(255, 255, 255, 0.6)'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '20px'
    },
    featureCard: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02))',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      padding: '28px 20px',
      textAlign: 'center',
      transition: 'transform 0.3s, box-shadow 0.3s'
    },
    featureIcon: { fontSize: '2.2rem', marginBottom: '12px' },
    featureTitle: { fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px', color: '#fff' },
    featureDescription: { fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' },
    helpGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '16px'
    },
    helpCard: {
      display: 'flex',
      gap: '16px',
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      borderRadius: '12px',
      padding: '20px'
    },
    helpIcon: { fontSize: '1.8rem', flexShrink: 0 },
    helpContent: { flex: 1 },
    helpTitle: { fontSize: '1rem', fontWeight: '700', marginBottom: '4px', color: '#fff' },
    helpDescription: { fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.4' },
    downloadSection: {
      padding: isMobile ? '60px 20px' : '80px 40px',
      background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(251, 191, 36, 0.03))',
      textAlign: 'center'
    },
    downloadButtons: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '16px',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '32px'
    },
    storeBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 24px',
      borderRadius: '10px',
      background: '#000',
      color: '#fff',
      textDecoration: 'none',
      fontSize: '0.95rem',
      fontWeight: '600',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    footer: {
      padding: '32px 20px',
      textAlign: 'center',
      borderTop: '1px solid rgba(255, 255, 255, 0.06)'
    },
    footerText: { color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' },
    footerLink: { color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', marginLeft: '16px' }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo} onClick={() => scrollToSection('hero')}>
            <span style={styles.logoIcon}>✝️</span>
            <span style={styles.logoText}>{tr.hero.title}</span>
          </div>

          <nav style={styles.nav}>
            <button style={styles.navLink} onClick={() => scrollToSection('intro')}>{tr.nav.intro}</button>
            <button style={styles.navLink} onClick={() => scrollToSection('features')}>{tr.nav.features}</button>
            <button style={styles.navLink} onClick={() => scrollToSection('help')}>{tr.nav.help}</button>
            <button style={styles.navLink} onClick={() => scrollToSection('download')}>{tr.nav.download}</button>
          </nav>

          <div style={styles.headerButtons}>
            <button style={styles.graphBtn} onClick={onEnterGraph}>
              {tr.nav.graphBible}
            </button>
            <a
              href="https://play.google.com/store/apps/details?id=com.graphbible.app"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.downloadBtn}
            >
              {tr.nav.download}
            </a>
            <button style={styles.langBtn} onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}>
              {lang === 'ko' ? 'EN' : 'KO'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" style={styles.heroSection}>
        <div style={styles.badge}>📖 {tr.hero.badge}</div>
        <h1 style={styles.heroTitle}>{tr.hero.title}</h1>
        <p style={styles.heroSubtitle}>{tr.hero.subtitle}</p>
        <div style={styles.heroButtons}>
          <button style={styles.primaryBtn} onClick={onEnterGraph}>
            🔗 {tr.hero.webVersion}
          </button>
          <a
            href="https://play.google.com/store/apps/details?id=com.graphbible.app"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.secondaryBtn}
          >
            📱 {tr.hero.appVersion}
          </a>
        </div>
      </section>

      {/* Intro */}
      <section id="intro" style={styles.section}>
        <h2 style={styles.sectionTitle}>{tr.intro.title}</h2>
        <p style={styles.sectionDescription}>{tr.intro.description}</p>
        <div style={styles.statsGrid}>
          {tr.intro.stats.map((stat, i) => (
            <div key={i} style={styles.statCard}>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={styles.section}>
        <h2 style={styles.sectionTitle}>{tr.features.title}</h2>
        <div style={styles.featuresGrid}>
          {tr.features.items.map((item, i) => (
            <div key={i} style={styles.featureCard}>
              <div style={styles.featureIcon}>{item.icon}</div>
              <h3 style={styles.featureTitle}>{item.title}</h3>
              <p style={styles.featureDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Help */}
      <section id="help" style={styles.section}>
        <h2 style={styles.sectionTitle}>{tr.help.title}</h2>
        <div style={styles.helpGrid}>
          {tr.help.items.map((item, i) => (
            <div key={i} style={styles.helpCard}>
              <span style={styles.helpIcon}>{item.icon}</span>
              <div style={styles.helpContent}>
                <h3 style={styles.helpTitle}>{item.title}</h3>
                <p style={styles.helpDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Download */}
      <section id="download" style={styles.downloadSection}>
        <h2 style={styles.sectionTitle}>{tr.download.title}</h2>
        <p style={{ ...styles.sectionDescription, marginBottom: '24px' }}>{tr.download.description}</p>
        <div style={styles.downloadButtons}>
          <a
            href="https://play.google.com/store/apps/details?id=com.graphbible.app"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.storeBtn}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
              <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.54.68.54 1.13 0 .45-.2.86-.54 1.13l-2.59 1.52-2.89-2.89 2.89-2.89 2.59 1.52zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/>
            </svg>
            {tr.download.googlePlay}
          </a>
          <span style={{ ...styles.storeBtn, opacity: 0.4, cursor: 'not-allowed' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            {tr.download.appStore}
          </span>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          {tr.footer.copyright}
          <a href="/privacy.html" style={styles.footerLink}>{tr.footer.privacy}</a>
        </p>
      </footer>
    </div>
  );
}
