import React from 'react';

const translations = {
  ko: {
    nav: {
      home: '홈',
      intro: '소개',
      features: '기능',
      help: '도움말',
      download: '앱 다운로드'
    },
    hero: {
      badge: '성경 인물 관계 시각화',
      title: '그래프 성경',
      subtitle: '성경 속 600명 이상의 인물들과 350개 이상의 관계를 인터랙티브 그래프로 탐험하세요',
      cta: '그래프 성경 시작하기',
      watchVideo: '영상 보기'
    },
    intro: {
      title: '성경을 새로운 방식으로',
      description: '그래프 성경은 성경 속 인물들의 관계를 인터랙티브한 그래프로 시각화하여 성경을 새로운 방식으로 이해할 수 있게 도와주는 앱입니다.',
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
          description: '600명 이상의 성경 인물과 350개 이상의 관계를 시각적으로 탐색. 드래그와 줌으로 자유롭게 탐험하세요.'
        },
        {
          icon: '📅',
          title: '타임라인',
          description: '창조 시대부터 초대교회까지, 시대별 주요 사건을 한눈에 파악하고 시간적 맥락을 이해하세요.'
        },
        {
          icon: '📖',
          title: '성경 읽기',
          description: '개역개정 성경 전문 66권을 깔끔한 다크 테마 UI로 편하게 읽으세요.'
        },
        {
          icon: '🔍',
          title: '검색 기능',
          description: '인물 이름, 역할, 설명으로 빠르게 검색. 선지자, 왕, 제자 등 빠른 필터 제공.'
        },
        {
          icon: '🧠',
          title: 'MBTI 매칭',
          description: '나와 닮은 성경 인물은 누구일까? MBTI 테스트로 확인해보세요.'
        },
        {
          icon: '🌐',
          title: '이중 언어',
          description: '한국어와 영어를 자유롭게 전환하며 사용하세요.'
        }
      ]
    },
    help: {
      title: '사용 방법',
      items: [
        {
          icon: '👆',
          title: '인물 선택',
          description: '그래프에서 인물 노드를 클릭하면 상세 정보를 볼 수 있습니다.'
        },
        {
          icon: '✋',
          title: '이동하기',
          description: '화면을 드래그하여 그래프를 이동시킬 수 있습니다.'
        },
        {
          icon: '🔎',
          title: '확대/축소',
          description: '마우스 휠이나 핀치 제스처로 그래프를 확대하거나 축소하세요.'
        },
        {
          icon: '📚',
          title: '성경 구절',
          description: '인물 상세에서 관련 구절을 클릭하면 성경을 바로 읽을 수 있습니다.'
        }
      ]
    },
    download: {
      title: '앱 다운로드',
      description: '모바일에서 더 편하게 사용하세요',
      googlePlay: 'Google Play에서 다운로드',
      appStore: 'App Store 출시 예정'
    },
    footer: {
      copyright: '2024-2025 그래프 성경. 성경 콘텐츠는 공개 도메인입니다.',
      privacy: '개인정보처리방침'
    }
  },
  en: {
    nav: {
      home: 'Home',
      intro: 'About',
      features: 'Features',
      help: 'Help',
      download: 'Download App'
    },
    hero: {
      badge: 'Bible Character Visualization',
      title: 'Graph Bible',
      subtitle: 'Explore 600+ Bible characters and 350+ relationships through interactive graphs',
      cta: 'Start Graph Bible',
      watchVideo: 'Watch Video'
    },
    intro: {
      title: 'Experience the Bible in a New Way',
      description: 'Graph Bible helps you understand the Bible in a new way by visualizing the relationships between Bible characters through interactive graphs.',
      stats: [
        { value: '600+', label: 'Bible Characters' },
        { value: '350+', label: 'Relationships' },
        { value: '66', label: 'Bible Books' },
        { value: '2', label: 'Languages' }
      ]
    },
    features: {
      title: 'Key Features',
      items: [
        {
          icon: '🔗',
          title: 'Character Relationship Graph',
          description: 'Visually explore 600+ Bible characters and 350+ relationships. Freely navigate with drag and zoom.'
        },
        {
          icon: '📅',
          title: 'Timeline',
          description: 'From Creation to Early Church, understand major events at a glance and their temporal context.'
        },
        {
          icon: '📖',
          title: 'Bible Reading',
          description: 'Read all 66 books of the Bible with a clean dark theme UI.'
        },
        {
          icon: '🔍',
          title: 'Search',
          description: 'Quickly search by character name, role, or description. Quick filters for prophets, kings, disciples, etc.'
        },
        {
          icon: '🧠',
          title: 'MBTI Matching',
          description: 'Which Bible character are you most like? Find out with the MBTI test.'
        },
        {
          icon: '🌐',
          title: 'Bilingual',
          description: 'Switch freely between Korean and English.'
        }
      ]
    },
    help: {
      title: 'How to Use',
      items: [
        {
          icon: '👆',
          title: 'Select Character',
          description: 'Click on a character node in the graph to view detailed information.'
        },
        {
          icon: '✋',
          title: 'Navigate',
          description: 'Drag the screen to move around the graph.'
        },
        {
          icon: '🔎',
          title: 'Zoom',
          description: 'Use mouse wheel or pinch gesture to zoom in/out.'
        },
        {
          icon: '📚',
          title: 'Bible Verses',
          description: 'Click related verses in character details to read the Bible directly.'
        }
      ]
    },
    download: {
      title: 'Download App',
      description: 'Use more conveniently on mobile',
      googlePlay: 'Download on Google Play',
      appStore: 'Coming to App Store'
    },
    footer: {
      copyright: '2024-2025 Graph Bible. Bible content is in the public domain.',
      privacy: 'Privacy Policy'
    }
  }
};

const t = (lang, key) => {
  const keys = key.split('.');
  let value = translations[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
};

export default function LandingPage({ lang, setLang, onEnterGraph }) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    videoRef.current?.play();
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
      background: 'rgba(10, 10, 26, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: isMobile ? '12px 16px' : '14px 40px'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer'
    },
    logoIcon: {
      fontSize: '1.6rem'
    },
    logoText: {
      fontSize: '1.1rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    nav: {
      display: isMobile ? 'none' : 'flex',
      alignItems: 'center',
      gap: '24px'
    },
    navLink: {
      color: 'rgba(255, 255, 255, 0.7)',
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'color 0.2s',
      background: 'none',
      border: 'none',
      padding: 0
    },
    langBtn: {
      padding: '6px 12px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      background: 'rgba(255, 255, 255, 0.05)',
      color: '#a5b4fc',
      fontSize: '0.85rem',
      fontWeight: '600',
      cursor: 'pointer'
    },
    heroSection: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '100px 20px 60px' : '120px 40px 80px',
      textAlign: 'center',
      position: 'relative'
    },
    heroVideo: {
      width: isMobile ? '90%' : '320px',
      maxWidth: '360px',
      aspectRatio: '9/16',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 25px 80px rgba(251, 191, 36, 0.2), 0 10px 40px rgba(0, 0, 0, 0.5)',
      marginBottom: '40px',
      position: 'relative',
      background: '#000'
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    playButton: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'rgba(251, 191, 36, 0.9)',
      border: 'none',
      cursor: 'pointer',
      display: isVideoPlaying ? 'none' : 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      color: '#000',
      boxShadow: '0 10px 40px rgba(251, 191, 36, 0.4)'
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
      marginBottom: '20px'
    },
    heroTitle: {
      fontSize: isMobile ? '2.5rem' : '3.5rem',
      fontWeight: '800',
      margin: '0 0 16px',
      background: 'linear-gradient(135deg, #fff, #e3e8ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    heroSubtitle: {
      fontSize: isMobile ? '1rem' : '1.2rem',
      color: 'rgba(255, 255, 255, 0.7)',
      maxWidth: '600px',
      margin: '0 0 32px',
      lineHeight: '1.6'
    },
    ctaButton: {
      padding: isMobile ? '14px 32px' : '16px 40px',
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      color: '#000',
      border: 'none',
      borderRadius: '14px',
      cursor: 'pointer',
      boxShadow: '0 10px 40px rgba(251, 191, 36, 0.3)',
      transition: 'transform 0.2s, box-shadow 0.2s'
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
      fontSize: '1.1rem',
      color: 'rgba(255, 255, 255, 0.7)',
      textAlign: 'center',
      maxWidth: '700px',
      margin: '0 auto 50px',
      lineHeight: '1.7'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: '20px',
      marginTop: '50px'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      padding: '24px',
      textAlign: 'center'
    },
    statValue: {
      fontSize: '2.2rem',
      fontWeight: '800',
      color: '#fbbf24',
      marginBottom: '8px'
    },
    statLabel: {
      fontSize: '0.95rem',
      color: 'rgba(255, 255, 255, 0.6)'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '24px'
    },
    featureCard: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02))',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '20px',
      padding: '32px 24px',
      textAlign: 'center',
      transition: 'transform 0.3s, box-shadow 0.3s'
    },
    featureIcon: {
      fontSize: '2.5rem',
      marginBottom: '16px'
    },
    featureTitle: {
      fontSize: '1.2rem',
      fontWeight: '700',
      marginBottom: '12px',
      color: '#fff'
    },
    featureDescription: {
      fontSize: '0.95rem',
      color: 'rgba(255, 255, 255, 0.6)',
      lineHeight: '1.6'
    },
    helpGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '20px'
    },
    helpCard: {
      display: 'flex',
      gap: '20px',
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      borderRadius: '16px',
      padding: '24px'
    },
    helpIcon: {
      fontSize: '2rem',
      flexShrink: 0
    },
    helpContent: {
      flex: 1
    },
    helpTitle: {
      fontSize: '1.1rem',
      fontWeight: '700',
      marginBottom: '8px',
      color: '#fff'
    },
    helpDescription: {
      fontSize: '0.9rem',
      color: 'rgba(255, 255, 255, 0.6)',
      lineHeight: '1.5'
    },
    downloadSection: {
      padding: isMobile ? '60px 20px' : '100px 40px',
      background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(251, 191, 36, 0.05))',
      textAlign: 'center'
    },
    downloadButtons: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '16px',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '40px'
    },
    downloadBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 28px',
      borderRadius: '12px',
      background: '#000',
      color: '#fff',
      textDecoration: 'none',
      fontSize: '1rem',
      fontWeight: '600',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      cursor: 'pointer',
      transition: 'transform 0.2s'
    },
    footer: {
      padding: '40px 20px',
      textAlign: 'center',
      borderTop: '1px solid rgba(255, 255, 255, 0.06)'
    },
    footerText: {
      color: 'rgba(255, 255, 255, 0.4)',
      fontSize: '0.85rem'
    },
    footerLink: {
      color: 'rgba(255, 255, 255, 0.6)',
      textDecoration: 'none',
      marginLeft: '16px'
    }
  };

  const tr = translations[lang] || translations.ko;

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
            <button style={styles.langBtn} onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}>
              {lang === 'ko' ? '🌐 EN' : '🌐 KO'}
            </button>
          </nav>
          {isMobile && (
            <button style={styles.langBtn} onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}>
              {lang === 'ko' ? '🌐 EN' : '🌐 KO'}
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" style={styles.heroSection}>
        <div style={styles.heroVideo}>
          <video
            ref={videoRef}
            style={styles.video}
            src="/promo.mp4"
            poster="/og-image.png"
            playsInline
            muted
            loop
            onClick={handlePlayVideo}
          />
          <button style={styles.playButton} onClick={handlePlayVideo}>
            ▶
          </button>
        </div>
        <div style={styles.badge}>📖 {tr.hero.badge}</div>
        <h1 style={styles.heroTitle}>{tr.hero.title}</h1>
        <p style={styles.heroSubtitle}>{tr.hero.subtitle}</p>
        <button
          style={styles.ctaButton}
          onClick={onEnterGraph}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 15px 50px rgba(251, 191, 36, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 40px rgba(251, 191, 36, 0.3)';
          }}
        >
          {tr.hero.cta}
        </button>
      </section>

      {/* Intro Section */}
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

      {/* Features Section */}
      <section id="features" style={styles.section}>
        <h2 style={styles.sectionTitle}>{tr.features.title}</h2>
        <div style={styles.featuresGrid}>
          {tr.features.items.map((item, i) => (
            <div
              key={i}
              style={styles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={styles.featureIcon}>{item.icon}</div>
              <h3 style={styles.featureTitle}>{item.title}</h3>
              <p style={styles.featureDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Help Section */}
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

      {/* Download Section */}
      <section id="download" style={styles.downloadSection}>
        <h2 style={styles.sectionTitle}>{tr.download.title}</h2>
        <p style={styles.sectionDescription}>{tr.download.description}</p>
        <div style={styles.downloadButtons}>
          <a
            href="https://play.google.com/store/apps/details?id=com.graphbible.app"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.downloadBtn}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
              <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.54.68.54 1.13 0 .45-.2.86-.54 1.13l-2.59 1.52-2.89-2.89 2.89-2.89 2.59 1.52zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/>
            </svg>
            {tr.download.googlePlay}
          </a>
          <span style={{ ...styles.downloadBtn, opacity: 0.5, cursor: 'not-allowed' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
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
