import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  allCharacters,
  getCharacterById,
  searchCharacters,
  relationships,
  relationshipColors,
  getRelationshipsByCharacter,
  events,
  eras,
  getEventsByCharacter,
  eventsByChronology,
  bibleBooks,
  getHymnsByCharacter
} from './data/index.js';

// ==================== 고급 스타일 정의 ====================
const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    background: 'radial-gradient(ellipse at 20% 20%, #1a1a3e 0%, #0d0d1a 50%, #050510 100%)',
    fontFamily: "'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif",
    color: '#fff',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  // 글래스모피즘 헤더
  header: {
    padding: '12px 24px',
    background: 'rgba(15, 15, 35, 0.8)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    zIndex: 100,
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ffd700 0%, #ff6b6b 50%, #a855f7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginRight: '20px',
    whiteSpace: 'nowrap',
    letterSpacing: '-0.5px',
    textShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
  },
  searchInput: {
    padding: '10px 18px',
    borderRadius: '24px',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    width: '180px',
    outline: 'none',
    fontSize: '0.9rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1)'
  },
  select: {
    padding: '10px 14px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.12)',
    background: 'rgba(20, 20, 40, 0.9)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    cursor: 'pointer',
    outline: 'none',
    fontSize: '0.85rem',
    minWidth: '120px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  },
  button: {
    padding: '10px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '0.9rem',
    fontWeight: '500',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  },
  activeButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
    position: 'relative'
  },
  graphContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden'
  },
  // 글래스모피즘 사이드바
  sidebar: {
    width: '360px',
    background: 'rgba(10, 10, 25, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderLeft: '1px solid rgba(255,255,255,0.08)',
    overflowY: 'auto',
    padding: '20px',
    boxShadow: '-10px 0 40px rgba(0,0,0,0.3)'
  },
  // 글래스모피즘 타임라인
  timeline: {
    height: '70px',
    background: 'rgba(10, 10, 25, 0.85)',
    backdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    overflowX: 'auto',
    boxShadow: '0 -10px 40px rgba(0,0,0,0.3)'
  },
  popup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(15, 15, 35, 0.95)',
    backdropFilter: 'blur(30px)',
    borderRadius: '24px',
    padding: '30px',
    maxWidth: '580px',
    maxHeight: '85vh',
    overflowY: 'auto',
    zIndex: 1000,
    boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 100px rgba(102, 126, 234, 0.1)',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.8)',
    backdropFilter: 'blur(8px)',
    zIndex: 999
  },
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    marginRight: '6px',
    marginBottom: '6px',
    fontWeight: '500',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
  },
  card: {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '16px',
    padding: '16px',
    marginBottom: '16px',
    border: '1px solid rgba(255,255,255,0.06)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease'
  }
};

// ==================== 노드 색상 (개선된 팔레트) ====================
const getNodeColor = (character, isHighlighted, isSelected) => {
  if (!isHighlighted && !isSelected) {
    return { fill: '#1a1a2e', stroke: '#2a2a4e', opacity: 0.2, glow: 'transparent' };
  }

  const colors = {
    god: { fill: '#ffd700', stroke: '#ffed4a', glow: 'rgba(255, 215, 0, 0.6)', gradient: ['#ffd700', '#ffed4a'] },
    jesus: { fill: '#ff6b6b', stroke: '#ff8787', glow: 'rgba(255, 107, 107, 0.6)', gradient: ['#ff6b6b', '#ff8787'] },
    holy_spirit: { fill: '#74b9ff', stroke: '#a3d5ff', glow: 'rgba(116, 185, 255, 0.6)', gradient: ['#74b9ff', '#a3d5ff'] }
  };

  if (colors[character.id]) {
    return { ...colors[character.id], opacity: 1 };
  }

  const testamentColors = {
    old: { fill: '#4a90d9', stroke: '#6ba3e0', glow: 'rgba(74, 144, 217, 0.5)', gradient: ['#4a90d9', '#6ba3e0'] },
    new: { fill: '#e056fd', stroke: '#e878fc', glow: 'rgba(224, 86, 253, 0.5)', gradient: ['#e056fd', '#e878fc'] },
    both: { fill: '#a29bfe', stroke: '#b8b3ff', glow: 'rgba(162, 155, 254, 0.5)', gradient: ['#a29bfe', '#b8b3ff'] }
  };

  return { ...testamentColors[character.testament] || testamentColors.old, opacity: 1 };
};

// ==================== 유틸리티 함수 ====================
const getNodeSize = (character) => {
  return character.importance * 1.5 + 5;
};

const getConnectedCharacters = (characterId) => {
  const connected = new Set();
  relationships.forEach(rel => {
    if (rel.source === characterId) connected.add(rel.target);
    if (rel.target === characterId) connected.add(rel.source);
  });
  return connected;
};

const initializePositions = (characters, width, height) => {
  const positions = {};
  const centerX = width / 2;
  const centerY = height / 2;

  characters.forEach((char, index) => {
    const angle = (index / characters.length) * Math.PI * 2;
    const radius = 180 + Math.random() * 280;
    positions[char.id] = {
      x: centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 120,
      y: centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 120,
      vx: 0,
      vy: 0
    };
  });

  return positions;
};

// ==================== 배경 파티클 컴포넌트 ====================
const BackgroundParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // 파티클 초기화
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 112, 219, ${p.opacity})`;
        ctx.fill();
      });

      // 파티클 연결선
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(147, 112, 219, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
};

// ==================== 메인 App 컴포넌트 ====================
export default function App() {
  const [lang, setLang] = useState('ko');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestament, setSelectedTestament] = useState('both');
  const [selectedBook, setSelectedBook] = useState('all');
  const [selectedEra, setSelectedEra] = useState('all');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(null);
  const [positions, setPositions] = useState({});
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragTarget, setDragTarget] = useState(null);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [animationTime, setAnimationTime] = useState(0);

  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pulseRef = useRef(null);

  // 펄스 애니메이션
  useEffect(() => {
    const animate = () => {
      setAnimationTime(t => (t + 0.02) % (Math.PI * 2));
      pulseRef.current = requestAnimationFrame(animate);
    };
    pulseRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(pulseRef.current);
  }, []);

  const filteredCharacters = useMemo(() => {
    let chars = allCharacters;

    if (selectedTestament !== 'both') {
      chars = chars.filter(c => c.testament === selectedTestament || c.testament === 'both');
    }

    if (selectedBook !== 'all') {
      chars = chars.filter(c => c.books && c.books.includes(selectedBook));
    }

    if (selectedEra !== 'all') {
      chars = chars.filter(c => c.era === selectedEra);
    }

    if (searchQuery) {
      chars = searchCharacters(searchQuery, lang);
    }

    return chars;
  }, [selectedTestament, selectedBook, selectedEra, searchQuery, lang]);

  const highlightedIds = useMemo(() => {
    const ids = new Set(filteredCharacters.map(c => c.id));

    if (selectedCharacter) {
      ids.add(selectedCharacter);
      getConnectedCharacters(selectedCharacter).forEach(id => ids.add(id));
    }

    filteredCharacters.forEach(char => {
      getConnectedCharacters(char.id).forEach(id => ids.add(id));
    });

    return ids;
  }, [filteredCharacters, selectedCharacter]);

  const visibleRelationships = useMemo(() => {
    return relationships.filter(rel =>
      highlightedIds.has(rel.source) || highlightedIds.has(rel.target)
    );
  }, [highlightedIds]);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setPositions(initializePositions(allCharacters, width, height));
    }
  }, []);

  // 물리 시뮬레이션
  useEffect(() => {
    if (Object.keys(positions).length === 0) return;

    const simulate = () => {
      setPositions(prev => {
        const newPos = { ...prev };

        allCharacters.forEach(char1 => {
          if (!newPos[char1.id]) return;

          allCharacters.forEach(char2 => {
            if (char1.id === char2.id || !newPos[char2.id]) return;

            const dx = newPos[char1.id].x - newPos[char2.id].x;
            const dy = newPos[char1.id].y - newPos[char2.id].y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const minDist = 50;

            if (dist < minDist) {
              const force = (minDist - dist) / dist * 0.25;
              newPos[char1.id].vx += dx * force;
              newPos[char1.id].vy += dy * force;
            }
          });
        });

        relationships.forEach(rel => {
          if (!newPos[rel.source] || !newPos[rel.target]) return;

          const dx = newPos[rel.target].x - newPos[rel.source].x;
          const dy = newPos[rel.target].y - newPos[rel.source].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const idealDist = 90;

          if (dist > idealDist) {
            const force = (dist - idealDist) / dist * 0.012;
            newPos[rel.source].vx += dx * force;
            newPos[rel.source].vy += dy * force;
            newPos[rel.target].vx -= dx * force;
            newPos[rel.target].vy -= dy * force;
          }
        });

        Object.keys(newPos).forEach(id => {
          if (dragTarget === id) return;

          newPos[id].x += newPos[id].vx;
          newPos[id].y += newPos[id].vy;
          newPos[id].vx *= 0.94;
          newPos[id].vy *= 0.94;
        });

        return newPos;
      });

      animationRef.current = requestAnimationFrame(simulate);
    };

    animationRef.current = requestAnimationFrame(simulate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [positions, dragTarget]);

  const handleMouseDown = useCallback((e, characterId = null) => {
    if (characterId) {
      setDragTarget(characterId);
      setSelectedCharacter(characterId);
    } else {
      setIsDragging(true);
    }
    setLastMouse({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e) => {
    const dx = e.clientX - lastMouse.x;
    const dy = e.clientY - lastMouse.y;

    if (dragTarget) {
      setPositions(prev => ({
        ...prev,
        [dragTarget]: {
          ...prev[dragTarget],
          x: prev[dragTarget].x + dx / zoom,
          y: prev[dragTarget].y + dy / zoom
        }
      }));
    } else if (isDragging) {
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    }

    setLastMouse({ x: e.clientX, y: e.clientY });
  }, [dragTarget, isDragging, lastMouse, zoom]);

  const handleMouseUp = useCallback(() => {
    setDragTarget(null);
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.92 : 1.08;
    setZoom(prev => Math.max(0.15, Math.min(5, prev * delta)));
  }, []);

  const handleCharacterClick = useCallback((characterId) => {
    setSelectedCharacter(characterId);
  }, []);

  const handleEventClick = useCallback((eventId) => {
    setSelectedEvent(eventId);
    setShowPopup('event');
  }, []);

  const selectedCharacterData = selectedCharacter ? getCharacterById(selectedCharacter) : null;
  const selectedEventData = selectedEvent ? events.find(e => e.id === selectedEvent) : null;

  const relatedHymns = selectedCharacter ? getHymnsByCharacter(selectedCharacter) : [];
  const relatedEvents = selectedCharacter ? getEventsByCharacter(selectedCharacter) : [];
  const relatedRelationships = selectedCharacter ? getRelationshipsByCharacter(selectedCharacter) : [];

  const handleReset = () => {
    setSelectedCharacter(null);
    setSelectedBook('all');
    setSelectedEra('all');
    setSelectedTestament('both');
    setSearchQuery('');
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div style={styles.container}>
      {/* 배경 파티클 */}
      <BackgroundParticles />

      {/* 글래스모피즘 헤더 */}
      <header style={styles.header}>
        <h1 style={styles.title}>성경 인물 관계도</h1>

        <input
          type="text"
          placeholder="인물 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
          onFocus={(e) => e.target.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.4), inset 0 1px 1px rgba(255,255,255,0.1)'}
          onBlur={(e) => e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1)'}
        />

        <select value={selectedTestament} onChange={(e) => setSelectedTestament(e.target.value)} style={styles.select}>
          <option value="both">전체</option>
          <option value="old">구약</option>
          <option value="new">신약</option>
        </select>

        <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)} style={styles.select}>
          <option value="all">전체 성경</option>
          <optgroup label="구약 39권">
            {bibleBooks.old.map(book => (
              <option key={book.id} value={book.id}>{book.name_ko}</option>
            ))}
          </optgroup>
          <optgroup label="신약 27권">
            {bibleBooks.new.map(book => (
              <option key={book.id} value={book.id}>{book.name_ko}</option>
            ))}
          </optgroup>
        </select>

        <select value={selectedEra} onChange={(e) => setSelectedEra(e.target.value)} style={styles.select}>
          <option value="all">전체 시대</option>
          {eras.map(era => (
            <option key={era.id} value={era.id}>{era.name_ko}</option>
          ))}
        </select>

        <button
          style={{...styles.button, ...(lang === 'en' ? styles.activeButton : {})}}
          onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          {lang === 'ko' ? 'EN' : 'KO'}
        </button>

        <button
          style={styles.button}
          onClick={handleReset}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          초기화
        </button>

        <div style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '8px 16px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '12px',
          fontSize: '0.85rem'
        }}>
          <span style={{ opacity: 0.7 }}>인물 <strong style={{ color: '#74b9ff' }}>{filteredCharacters.length}</strong></span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span style={{ opacity: 0.7 }}>관계 <strong style={{ color: '#a29bfe' }}>{visibleRelationships.length}</strong></span>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div style={styles.mainContent}>
        {/* 그래프 영역 */}
        <div
          ref={containerRef}
          style={styles.graphContainer}
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <svg ref={svgRef} width="100%" height="100%" style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
            <defs>
              {/* 고급 글로우 필터 */}
              <filter id="glow-gold" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feFlood floodColor="#ffd700" floodOpacity="0.5"/>
                <feComposite in2="coloredBlur" operator="in"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="glow-blue" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feFlood floodColor="#4a90d9" floodOpacity="0.5"/>
                <feComposite in2="coloredBlur" operator="in"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="glow-purple" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feFlood floodColor="#e056fd" floodOpacity="0.5"/>
                <feComposite in2="coloredBlur" operator="in"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="glow-soft" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* 그라디언트 */}
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#667eea" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#764ba2" stopOpacity="0.8"/>
              </linearGradient>

              <radialGradient id="nodeGlow">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
              </radialGradient>
            </defs>

            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {/* 관계선 - 애니메이션 효과 */}
              {visibleRelationships.map((rel, index) => {
                const sourcePos = positions[rel.source];
                const targetPos = positions[rel.target];
                if (!sourcePos || !targetPos) return null;

                const isActive = selectedCharacter === rel.source || selectedCharacter === rel.target;
                const relColor = relationshipColors[rel.type]?.color || '#666';
                const opacity = isActive ? 0.9 : (highlightedIds.has(rel.source) && highlightedIds.has(rel.target) ? 0.35 : 0.08);

                const midX = (sourcePos.x + targetPos.x) / 2;
                const midY = (sourcePos.y + targetPos.y) / 2;

                return (
                  <g key={`rel-${index}`}>
                    {/* 글로우 라인 */}
                    {isActive && (
                      <line
                        x1={sourcePos.x}
                        y1={sourcePos.y}
                        x2={targetPos.x}
                        y2={targetPos.y}
                        stroke={relColor}
                        strokeWidth={4}
                        opacity={0.3}
                        filter="url(#glow-soft)"
                      />
                    )}
                    {/* 메인 라인 */}
                    <line
                      x1={sourcePos.x}
                      y1={sourcePos.y}
                      x2={targetPos.x}
                      y2={targetPos.y}
                      stroke={relColor}
                      strokeWidth={isActive ? 2 : 1}
                      opacity={opacity}
                      strokeLinecap="round"
                    />
                    {/* 파티클 애니메이션 (활성화된 관계만) */}
                    {isActive && (
                      <circle
                        r={2}
                        fill={relColor}
                        opacity={0.8}
                      >
                        <animateMotion
                          dur="2s"
                          repeatCount="indefinite"
                          path={`M${sourcePos.x},${sourcePos.y} L${targetPos.x},${targetPos.y}`}
                        />
                      </circle>
                    )}
                    {/* 관계 라벨 */}
                    {isActive && (
                      <g transform={`translate(${midX}, ${midY})`}>
                        <rect
                          x={-30}
                          y={-10}
                          width={60}
                          height={16}
                          rx={8}
                          fill="rgba(0,0,0,0.7)"
                          stroke={relColor}
                          strokeWidth={0.5}
                        />
                        <text
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#fff"
                          fontSize="8"
                          fontWeight="500"
                          style={{ pointerEvents: 'none' }}
                        >
                          {lang === 'ko' ? rel.label_ko : rel.label_en}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* 노드 */}
              {allCharacters.map(char => {
                const pos = positions[char.id];
                if (!pos) return null;

                const isHighlighted = highlightedIds.has(char.id);
                const isSelected = selectedCharacter === char.id;
                const isHovered = hoveredNode === char.id;
                const nodeColor = getNodeColor(char, isHighlighted, isSelected);
                const size = getNodeSize(char);
                const pulseScale = isSelected ? 1 + Math.sin(animationTime * 3) * 0.08 : 1;

                const glowFilter = char.id === 'god' || char.id === 'jesus' ? 'url(#glow-gold)' :
                                   char.testament === 'new' ? 'url(#glow-purple)' : 'url(#glow-blue)';

                return (
                  <g
                    key={char.id}
                    transform={`translate(${pos.x}, ${pos.y}) scale(${pulseScale})`}
                    style={{ cursor: 'pointer', transition: 'transform 0.15s ease' }}
                    onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, char.id); }}
                    onClick={() => handleCharacterClick(char.id)}
                    onMouseEnter={() => setHoveredNode(char.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    opacity={nodeColor.opacity}
                  >
                    {/* 외부 글로우 링 (중요 인물) */}
                    {isHighlighted && char.importance >= 8 && (
                      <>
                        <circle
                          r={size + 8}
                          fill="none"
                          stroke={nodeColor.glow}
                          strokeWidth="1"
                          opacity={0.3 + Math.sin(animationTime * 2) * 0.2}
                        />
                        <circle
                          r={size + 15}
                          fill="none"
                          stroke={nodeColor.glow}
                          strokeWidth="0.5"
                          opacity={0.15 + Math.sin(animationTime * 2 + 1) * 0.1}
                        />
                      </>
                    )}

                    {/* 선택/호버 글로우 */}
                    {(isSelected || isHovered) && isHighlighted && (
                      <circle
                        r={size + 5}
                        fill={nodeColor.glow}
                        opacity={0.4}
                        filter={glowFilter}
                      />
                    )}

                    {/* 메인 노드 */}
                    <circle
                      r={size}
                      fill={nodeColor.fill}
                      stroke={isSelected ? '#fff' : nodeColor.stroke}
                      strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
                      filter={isHighlighted && char.importance >= 7 ? 'url(#glow-soft)' : undefined}
                    />

                    {/* 내부 하이라이트 */}
                    {isHighlighted && (
                      <circle
                        r={size * 0.4}
                        fill="rgba(255,255,255,0.3)"
                        cx={-size * 0.2}
                        cy={-size * 0.2}
                      />
                    )}

                    {/* 이름 라벨 */}
                    <text
                      y={size + 12}
                      textAnchor="middle"
                      fill={isHighlighted ? '#fff' : '#444'}
                      fontSize={isSelected ? 11 : isHovered ? 10 : 9}
                      fontWeight={isSelected ? '700' : isHovered ? '600' : '400'}
                      style={{
                        pointerEvents: 'none',
                        textShadow: isHighlighted ? '0 1px 4px rgba(0,0,0,0.8)' : 'none'
                      }}
                    >
                      {lang === 'ko' ? char.name_ko : char.name_en}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* 줌 컨트롤 - 글래스모피즘 */}
          <div style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            background: 'rgba(15, 15, 35, 0.8)',
            backdropFilter: 'blur(15px)',
            padding: '12px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
          }}>
            <button
              style={{...styles.button, padding: '8px 14px'}}
              onClick={() => setZoom(z => Math.min(5, z * 1.3))}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.08)'}
            >+</button>
            <span style={{
              fontSize: '0.8rem',
              color: '#a0a0c0',
              textAlign: 'center',
              padding: '4px 0'
            }}>{Math.round(zoom * 100)}%</span>
            <button
              style={{...styles.button, padding: '8px 14px'}}
              onClick={() => setZoom(z => Math.max(0.15, z / 1.3))}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.08)'}
            >-</button>
          </div>

          {/* 범례 */}
          <div style={{
            position: 'absolute',
            bottom: 20,
            right: 380,
            background: 'rgba(15, 15, 35, 0.8)',
            backdropFilter: 'blur(15px)',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
            fontSize: '0.75rem',
            display: 'flex',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#4a90d9' }}/>
              <span style={{ opacity: 0.7 }}>구약</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#e056fd' }}/>
              <span style={{ opacity: 0.7 }}>신약</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffd700' }}/>
              <span style={{ opacity: 0.7 }}>삼위일체</span>
            </div>
          </div>
        </div>

        {/* 사이드바 */}
        <aside style={styles.sidebar}>
          {selectedCharacterData ? (
            <>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 16,
                paddingBottom: 16,
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${getNodeColor(selectedCharacterData, true, true).fill}, ${getNodeColor(selectedCharacterData, true, true).stroke})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 20px ${getNodeColor(selectedCharacterData, true, true).glow}`
                }}>
                  <span style={{ fontSize: '1.2rem' }}>
                    {selectedCharacterData.testament === 'old' ? '📜' : '✝️'}
                  </span>
                </div>
                <div>
                  <h2 style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    background: `linear-gradient(90deg, ${getNodeColor(selectedCharacterData, true, true).fill}, #fff)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {lang === 'ko' ? selectedCharacterData.name_ko : selectedCharacterData.name_en}
                  </h2>
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <span style={{
                      ...styles.badge,
                      background: selectedCharacterData.testament === 'old' ? 'rgba(74, 144, 217, 0.3)' : 'rgba(224, 86, 253, 0.3)',
                      border: `1px solid ${selectedCharacterData.testament === 'old' ? '#4a90d9' : '#e056fd'}`,
                      fontSize: '0.7rem'
                    }}>
                      {selectedCharacterData.testament === 'old' ? '구약' : selectedCharacterData.testament === 'new' ? '신약' : '구약+신약'}
                    </span>
                    <span style={{
                      ...styles.badge,
                      background: 'rgba(243, 156, 18, 0.2)',
                      border: '1px solid #f39c12',
                      fontSize: '0.7rem'
                    }}>
                      중요도 {selectedCharacterData.importance}/10
                    </span>
                  </div>
                </div>
              </div>

              <div style={styles.card}>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, opacity: 0.9 }}>
                  {lang === 'ko' ? selectedCharacterData.description_ko : selectedCharacterData.description_en}
                </p>
              </div>

              {selectedCharacterData.labels && (
                <div style={{ marginBottom: 16 }}>
                  {selectedCharacterData.labels.map((label, i) => (
                    <span key={i} style={{
                      ...styles.badge,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>{label}</span>
                  ))}
                </div>
              )}

              {selectedCharacterData.verses && selectedCharacterData.verses.length > 0 && (
                <div style={styles.card}>
                  <h4 style={{
                    marginBottom: 12,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <span style={{ opacity: 0.7 }}>📜</span> 주요 구절
                  </h4>
                  {selectedCharacterData.verses.slice(0, 2).map((verse, i) => (
                    <div key={i} style={{
                      marginBottom: 10,
                      padding: '12px',
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: 10,
                      borderLeft: '3px solid #ffd700'
                    }}>
                      <strong style={{ color: '#ffd700', fontSize: '0.8rem' }}>{verse.ref}</strong>
                      <p style={{ marginTop: 6, fontStyle: 'italic', opacity: 0.85, fontSize: '0.85rem', lineHeight: 1.5 }}>
                        "{lang === 'ko' ? verse.text_ko : verse.text_en}"
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {relatedEvents.length > 0 && (
                <div style={styles.card}>
                  <h4 style={{
                    marginBottom: 12,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <span style={{ opacity: 0.7 }}>📌</span> 관련 사건
                  </h4>
                  {relatedEvents.slice(0, 4).map(event => (
                    <div
                      key={event.id}
                      style={{
                        padding: '10px 12px',
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: 10,
                        marginBottom: 8,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        border: '1px solid transparent'
                      }}
                      onClick={() => handleEventClick(event.id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(102, 126, 234, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
                        e.currentTarget.style.borderColor = 'transparent';
                      }}
                    >
                      <span style={{ marginRight: 8 }}>{event.icon}</span>
                      <span style={{ fontSize: '0.85rem' }}>{lang === 'ko' ? event.name_ko : event.name_en}</span>
                    </div>
                  ))}
                </div>
              )}

              {relatedHymns.length > 0 && (
                <div style={styles.card}>
                  <h4 style={{
                    marginBottom: 12,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <span style={{ opacity: 0.7 }}>🎵</span> 관련 찬송가
                  </h4>
                  {relatedHymns.slice(0, 3).map(hymn => (
                    <div key={hymn.id} style={{
                      padding: '10px 12px',
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: 10,
                      marginBottom: 8,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        padding: '4px 10px',
                        borderRadius: 6,
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        marginRight: 10
                      }}>{hymn.number}장</span>
                      <span style={{ fontSize: '0.85rem' }}>{lang === 'ko' ? hymn.title_ko : hymn.title_en}</span>
                    </div>
                  ))}
                </div>
              )}

              {relatedRelationships.length > 0 && (
                <div style={styles.card}>
                  <h4 style={{
                    marginBottom: 12,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <span style={{ opacity: 0.7 }}>👥</span> 관련 인물
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {relatedRelationships.slice(0, 10).map((rel, i) => {
                      const otherId = rel.source === selectedCharacter ? rel.target : rel.source;
                      const other = getCharacterById(otherId);
                      if (!other) return null;

                      return (
                        <button
                          key={i}
                          style={{
                            ...styles.button,
                            fontSize: '0.8rem',
                            padding: '6px 12px',
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.1)'
                          }}
                          onClick={() => setSelectedCharacter(otherId)}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(102, 126, 234, 0.3)';
                            e.target.style.borderColor = '#667eea';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255,255,255,0.06)';
                            e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                          }}
                        >
                          {lang === 'ko' ? other.name_ko : other.name_en}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              opacity: 0.6
            }}>
              <div style={{
                width: 80,
                height: 80,
                margin: '0 auto 20px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '2.5rem' }}>📖</span>
              </div>
              <p style={{ fontSize: '1rem', fontWeight: '500' }}>인물을 선택하세요</p>
              <p style={{ fontSize: '0.85rem', marginTop: 8, opacity: 0.6 }}>
                노드를 클릭하여 상세 정보 확인
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* 타임라인 */}
      <div style={styles.timeline}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          minWidth: '100%',
          paddingRight: 20
        }}>
          {eventsByChronology.slice(0, 40).map((event, index) => (
            <div
              key={event.id}
              style={{
                padding: '8px 14px',
                background: selectedEvent === event.id
                  ? 'linear-gradient(135deg, rgba(255,215,0,0.3), rgba(255,107,107,0.3))'
                  : 'rgba(255,255,255,0.05)',
                borderRadius: 10,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '0.8rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: selectedEvent === event.id
                  ? '1px solid rgba(255,215,0,0.5)'
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: selectedEvent === event.id
                  ? '0 4px 15px rgba(255,215,0,0.2)'
                  : 'none'
              }}
              onClick={() => handleEventClick(event.id)}
              onMouseEnter={(e) => {
                if (selectedEvent !== event.id) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedEvent !== event.id) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <span style={{ marginRight: 6 }}>{event.icon}</span>
              {lang === 'ko' ? event.name_ko : event.name_en}
            </div>
          ))}
        </div>
      </div>

      {/* 팝업 */}
      {showPopup === 'event' && selectedEventData && (
        <>
          <div style={styles.overlay} onClick={() => setShowPopup(null)} />
          <div style={styles.popup}>
            <button
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                ...styles.button,
                padding: '8px 12px',
                borderRadius: '50%'
              }}
              onClick={() => setShowPopup(null)}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,100,100,0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.08)'}
            >✕</button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 20,
              paddingBottom: 20,
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{
                width: 60,
                height: 60,
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
              }}>
                <span style={{ fontSize: '1.8rem' }}>{selectedEventData.icon}</span>
              </div>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: 6 }}>
                  {lang === 'ko' ? selectedEventData.name_ko : selectedEventData.name_en}
                </h2>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{
                    ...styles.badge,
                    background: eras.find(e => e.id === selectedEventData.era)?.color || '#666',
                    margin: 0
                  }}>
                    {eras.find(e => e.id === selectedEventData.era)?.name_ko}
                  </span>
                  <span style={{ opacity: 0.6, fontSize: '0.85rem' }}>
                    {selectedEventData.year > 0 ? `AD ${selectedEventData.year}` : `BC ${Math.abs(selectedEventData.year)}`}
                  </span>
                </div>
              </div>
            </div>

            <p style={{ margin: '20px 0', lineHeight: 1.8, fontSize: '0.95rem', opacity: 0.9 }}>
              {lang === 'ko' ? selectedEventData.description_ko : selectedEventData.description_en}
            </p>

            <div style={styles.card}>
              <h4 style={{ marginBottom: 12, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>📜</span> 성경 구절
              </h4>
              <p style={{ color: '#ffd700', marginBottom: 8, fontSize: '0.9rem', fontWeight: '500' }}>
                {selectedEventData.verses.join(', ')}
              </p>
              <p style={{
                fontStyle: 'italic',
                opacity: 0.85,
                fontSize: '0.9rem',
                lineHeight: 1.7,
                padding: '12px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: 10,
                borderLeft: '3px solid #ffd700'
              }}>
                "{lang === 'ko' ? selectedEventData.verse_text_ko : selectedEventData.verse_text_en}"
              </p>
            </div>

            {selectedEventData.commentary_ko && (
              <div style={styles.card}>
                <h4 style={{ marginBottom: 12, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>📝</span> 간략 강해
                </h4>
                <p style={{ lineHeight: 1.8, opacity: 0.9, fontSize: '0.9rem' }}>
                  {selectedEventData.commentary_ko}
                </p>
              </div>
            )}

            <div style={styles.card}>
              <h4 style={{ marginBottom: 12, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>👥</span> 관련 인물
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {selectedEventData.characters.map(charId => {
                  const char = getCharacterById(charId);
                  if (!char) return null;
                  return (
                    <button
                      key={charId}
                      style={{
                        ...styles.button,
                        fontSize: '0.85rem',
                        padding: '8px 14px'
                      }}
                      onClick={() => { setSelectedCharacter(charId); setShowPopup(null); }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255,255,255,0.08)';
                      }}
                    >
                      {lang === 'ko' ? char.name_ko : char.name_en}
                    </button>
                  );
                })}
              </div>
            </div>

            <p style={{ opacity: 0.4, fontSize: '0.8rem', marginTop: 16, textAlign: 'center' }}>
              📍 {selectedEventData.location}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
