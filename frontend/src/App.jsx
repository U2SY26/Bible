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

// ==================== 모바일 감지 ====================
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
};

// ==================== 스타일 정의 ====================
const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    background: '#000',
    fontFamily: "'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif",
    color: '#fff',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  header: {
    padding: '8px 16px',
    background: 'rgba(20, 20, 30, 0.95)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    zIndex: 100
  },
  headerTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px'
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ffd700, #ff6b6b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    whiteSpace: 'nowrap'
  },
  filterToggle: {
    padding: '6px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(255,255,255,0.1)',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  filterSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    marginTop: '10px',
    paddingTop: '10px',
    borderTop: '1px solid rgba(255,255,255,0.1)'
  },
  searchInput: {
    padding: '8px 14px',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.08)',
    color: '#fff',
    width: '140px',
    outline: 'none',
    fontSize: '0.85rem'
  },
  select: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(30, 30, 50, 0.95)',
    color: '#fff',
    cursor: 'pointer',
    outline: 'none',
    fontSize: '0.8rem',
    minWidth: '90px'
  },
  button: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.1)',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '500'
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
    overflow: 'hidden',
    background: '#000'
  },
  sidebar: {
    width: '320px',
    background: 'rgba(15, 15, 25, 0.98)',
    borderLeft: '1px solid rgba(255,255,255,0.1)',
    overflowY: 'auto',
    padding: '16px'
  },
  characterList: {
    marginTop: '10px',
    maxHeight: '120px',
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px'
  },
  characterChip: {
    padding: '4px 10px',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.1)',
    fontSize: '0.75rem',
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'all 0.2s'
  },
  popup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(20, 20, 35, 0.98)',
    borderRadius: '16px',
    padding: '20px',
    width: 'calc(100vw - 32px)',
    maxWidth: '500px',
    maxHeight: '85vh',
    overflowY: 'auto',
    zIndex: 1000,
    border: '1px solid rgba(255,255,255,0.15)'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.85)',
    zIndex: 999
  },
  badge: {
    display: 'inline-block',
    padding: '3px 8px',
    borderRadius: '12px',
    fontSize: '0.7rem',
    marginRight: '5px',
    marginBottom: '5px',
    fontWeight: '500'
  },
  card: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
    padding: '14px',
    marginBottom: '12px',
    border: '1px solid rgba(255,255,255,0.08)'
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.75rem'
  },
  slider: {
    width: '80px',
    height: '4px',
    cursor: 'pointer',
    accentColor: '#667eea'
  }
};

// ==================== 노드 색상 ====================
const getNodeColor = (character, isHighlighted, isSelected) => {
  if (!isHighlighted && !isSelected) {
    return { fill: '#222', stroke: '#333', opacity: 0.15, glow: 'transparent' };
  }

  const colors = {
    god: { fill: '#ffd700', stroke: '#ffed4a', glow: 'rgba(255, 215, 0, 0.5)' },
    jesus: { fill: '#ff6b6b', stroke: '#ff8787', glow: 'rgba(255, 107, 107, 0.5)' },
    holy_spirit: { fill: '#74b9ff', stroke: '#a3d5ff', glow: 'rgba(116, 185, 255, 0.5)' }
  };

  if (colors[character.id]) {
    return { ...colors[character.id], opacity: 1 };
  }

  const testamentColors = {
    old: { fill: '#4a90d9', stroke: '#6ba3e0', glow: 'rgba(74, 144, 217, 0.4)' },
    new: { fill: '#e056fd', stroke: '#e878fc', glow: 'rgba(224, 86, 253, 0.4)' },
    both: { fill: '#a29bfe', stroke: '#b8b3ff', glow: 'rgba(162, 155, 254, 0.4)' }
  };

  return { ...testamentColors[character.testament] || testamentColors.old, opacity: 1 };
};

// ==================== 유틸리티 함수 ====================
const getConnectedCharacters = (characterId) => {
  const connected = new Set();
  relationships.forEach(rel => {
    if (rel.source === characterId) connected.add(rel.target);
    if (rel.target === characterId) connected.add(rel.source);
  });
  return connected;
};

// 넓게 펼쳐진 초기 배치
const initializePositions = (characters, width, height) => {
  const positions = {};
  const centerX = width / 2;
  const centerY = height / 2;
  const count = characters.length;

  // 여러 겹의 원형 배치로 더 넓게 분산
  characters.forEach((char, index) => {
    const layer = Math.floor(index / 20); // 20개씩 레이어 분리
    const indexInLayer = index % 20;
    const angle = (indexInLayer / 20) * Math.PI * 2 + (layer * 0.5);
    const baseRadius = 250 + layer * 180; // 레이어마다 더 넓게
    const radius = baseRadius + Math.random() * 100;

    positions[char.id] = {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      vx: 0,
      vy: 0
    };
  });

  return positions;
};

// ==================== 메인 App 컴포넌트 ====================
export default function App() {
  const isMobile = useIsMobile();
  const [lang, setLang] = useState('ko');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestament, setSelectedTestament] = useState('both');
  const [selectedBook, setSelectedBook] = useState('all');
  const [selectedEra, setSelectedEra] = useState('all');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(null);
  const [positions, setPositions] = useState({});
  const [zoom, setZoom] = useState(isMobile ? 0.6 : 0.8);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragTarget, setDragTarget] = useState(null);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [animationTime, setAnimationTime] = useState(0);
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [nodeScale, setNodeScale] = useState(1.0);

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

  // 물리 시뮬레이션 - 더 넓은 간격
  useEffect(() => {
    if (Object.keys(positions).length === 0) return;

    const simulate = () => {
      setPositions(prev => {
        const newPos = { ...prev };

        // 반발력 - 더 강하고 넓은 범위
        allCharacters.forEach(char1 => {
          if (!newPos[char1.id]) return;

          allCharacters.forEach(char2 => {
            if (char1.id === char2.id || !newPos[char2.id]) return;

            const dx = newPos[char1.id].x - newPos[char2.id].x;
            const dy = newPos[char1.id].y - newPos[char2.id].y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const minDist = 100; // 최소 거리 증가

            if (dist < minDist) {
              const force = (minDist - dist) / dist * 0.4;
              newPos[char1.id].vx += dx * force;
              newPos[char1.id].vy += dy * force;
            }
          });
        });

        // 연결된 노드 끌어당김 - 더 느슨하게
        relationships.forEach(rel => {
          if (!newPos[rel.source] || !newPos[rel.target]) return;

          const dx = newPos[rel.target].x - newPos[rel.source].x;
          const dy = newPos[rel.target].y - newPos[rel.source].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const idealDist = 150; // 이상적 거리 증가

          if (dist > idealDist) {
            const force = (dist - idealDist) / dist * 0.008;
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
          newPos[id].vx *= 0.92;
          newPos[id].vy *= 0.92;
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
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (characterId) {
      setDragTarget(characterId);
      setSelectedCharacter(characterId);
      if (isMobile) {
        setShowPopup('character');
      }
    } else {
      setIsDragging(true);
    }
    setLastMouse({ x: clientX, y: clientY });
  }, [isMobile]);

  const handleMouseMove = useCallback((e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - lastMouse.x;
    const dy = clientY - lastMouse.y;

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

    setLastMouse({ x: clientX, y: clientY });
  }, [dragTarget, isDragging, lastMouse, zoom]);

  const handleMouseUp = useCallback(() => {
    setDragTarget(null);
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.92 : 1.08;
    setZoom(prev => Math.max(0.1, Math.min(5, prev * delta)));
  }, []);

  const handleCharacterClick = useCallback((characterId) => {
    setSelectedCharacter(characterId);
    if (isMobile) {
      setShowPopup('character');
    }
  }, [isMobile]);

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
    setZoom(isMobile ? 0.6 : 0.8);
    setPan({ x: 0, y: 0 });
  };

  // 노드 크기 계산 함수
  const getNodeSize = (character) => {
    const baseSize = character.importance * 1.2 + 4;
    return baseSize * nodeScale;
  };

  // 필터 적용 여부
  const isFiltering = selectedTestament !== 'both' || selectedBook !== 'all' || selectedEra !== 'all' || searchQuery;

  return (
    <div style={styles.container}>
      {/* 헤더 */}
      <header style={styles.header}>
        <div style={styles.headerTop}>
          <h1 style={styles.title}>성경 인물 관계도</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
              {filteredCharacters.length}명
            </span>
            <button
              style={styles.filterToggle}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? '▲ 접기' : '▼ 필터'}
            </button>
          </div>
        </div>

        {showFilters && (
          <div style={styles.filterSection}>
            <input
              type="text"
              placeholder="검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />

            <select value={selectedTestament} onChange={(e) => setSelectedTestament(e.target.value)} style={styles.select}>
              <option value="both">전체</option>
              <option value="old">구약</option>
              <option value="new">신약</option>
            </select>

            <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)} style={styles.select}>
              <option value="all">성경</option>
              <optgroup label="구약">
                {bibleBooks.old.slice(0, 10).map(book => (
                  <option key={book.id} value={book.id}>{book.name_ko}</option>
                ))}
              </optgroup>
              <optgroup label="신약">
                {bibleBooks.new.slice(0, 10).map(book => (
                  <option key={book.id} value={book.id}>{book.name_ko}</option>
                ))}
              </optgroup>
            </select>

            <select value={selectedEra} onChange={(e) => setSelectedEra(e.target.value)} style={styles.select}>
              <option value="all">시대</option>
              {eras.map(era => (
                <option key={era.id} value={era.id}>{era.name_ko}</option>
              ))}
            </select>

            {/* 노드 크기 조절 슬라이더 */}
            <div style={styles.sliderContainer}>
              <span>크기</span>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={nodeScale}
                onChange={(e) => setNodeScale(parseFloat(e.target.value))}
                style={styles.slider}
              />
              <span>{Math.round(nodeScale * 100)}%</span>
            </div>

            <button style={styles.button} onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}>
              {lang === 'ko' ? 'EN' : 'KO'}
            </button>

            <button style={styles.button} onClick={handleReset}>초기화</button>
          </div>
        )}

        {/* 필터링된 인물 리스트 */}
        {isFiltering && showFilters && (
          <div style={styles.characterList}>
            {filteredCharacters.slice(0, 30).map(char => (
              <span
                key={char.id}
                style={{
                  ...styles.characterChip,
                  background: selectedCharacter === char.id ? 'rgba(102,126,234,0.4)' : 'rgba(255,255,255,0.1)',
                  borderColor: selectedCharacter === char.id ? '#667eea' : 'transparent'
                }}
                onClick={() => handleCharacterClick(char.id)}
              >
                {lang === 'ko' ? char.name_ko : char.name_en}
              </span>
            ))}
            {filteredCharacters.length > 30 && (
              <span style={{ ...styles.characterChip, opacity: 0.5 }}>
                +{filteredCharacters.length - 30}명
              </span>
            )}
          </div>
        )}
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
          onTouchStart={(e) => handleMouseDown(e)}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          onWheel={handleWheel}
        >
          <svg ref={svgRef} width="100%" height="100%" style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {/* 관계선 */}
              {visibleRelationships.map((rel, index) => {
                const sourcePos = positions[rel.source];
                const targetPos = positions[rel.target];
                if (!sourcePos || !targetPos) return null;

                const isActive = selectedCharacter === rel.source || selectedCharacter === rel.target;
                const relColor = relationshipColors[rel.type]?.color || '#444';
                const opacity = isActive ? 0.8 : (highlightedIds.has(rel.source) && highlightedIds.has(rel.target) ? 0.25 : 0.05);

                return (
                  <line
                    key={`rel-${index}`}
                    x1={sourcePos.x}
                    y1={sourcePos.y}
                    x2={targetPos.x}
                    y2={targetPos.y}
                    stroke={relColor}
                    strokeWidth={isActive ? 2 : 1}
                    opacity={opacity}
                    strokeLinecap="round"
                  />
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
                const pulseScale = isSelected ? 1 + Math.sin(animationTime * 3) * 0.1 : 1;

                return (
                  <g
                    key={char.id}
                    transform={`translate(${pos.x}, ${pos.y}) scale(${pulseScale})`}
                    style={{ cursor: 'pointer' }}
                    onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, char.id); }}
                    onTouchStart={(e) => { e.stopPropagation(); handleMouseDown(e, char.id); }}
                    onClick={() => handleCharacterClick(char.id)}
                    onMouseEnter={() => setHoveredNode(char.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    opacity={nodeColor.opacity}
                  >
                    {/* 선택/호버 글로우 */}
                    {(isSelected || isHovered) && isHighlighted && (
                      <circle r={size + 4} fill={nodeColor.glow} opacity={0.5} filter="url(#glow)" />
                    )}

                    {/* 메인 노드 */}
                    <circle
                      r={size}
                      fill={nodeColor.fill}
                      stroke={isSelected ? '#fff' : nodeColor.stroke}
                      strokeWidth={isSelected ? 2 : 1}
                    />

                    {/* 이름 라벨 */}
                    <text
                      y={size + 10}
                      textAnchor="middle"
                      fill={isHighlighted ? '#fff' : '#444'}
                      fontSize={isSelected ? 10 : 8}
                      fontWeight={isSelected ? '600' : '400'}
                      style={{ pointerEvents: 'none' }}
                    >
                      {lang === 'ko' ? char.name_ko : char.name_en}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* 줌 컨트롤 */}
          <div style={{
            position: 'absolute',
            bottom: isMobile ? 10 : 20,
            left: isMobile ? 10 : 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            background: 'rgba(20, 20, 30, 0.9)',
            padding: '8px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <button style={{...styles.button, padding: '6px 10px'}} onClick={() => setZoom(z => Math.min(5, z * 1.3))}>+</button>
            <span style={{ fontSize: '0.7rem', color: '#888', textAlign: 'center' }}>{Math.round(zoom * 100)}%</span>
            <button style={{...styles.button, padding: '6px 10px'}} onClick={() => setZoom(z => Math.max(0.1, z / 1.3))}>-</button>
          </div>

          {/* 범례 - 모바일에서는 숨김 */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              bottom: 20,
              right: selectedCharacter ? 340 : 20,
              background: 'rgba(20, 20, 30, 0.9)',
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.1)',
              fontSize: '0.7rem',
              display: 'flex',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4a90d9' }}/>
                <span style={{ opacity: 0.7 }}>구약</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#e056fd' }}/>
                <span style={{ opacity: 0.7 }}>신약</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffd700' }}/>
                <span style={{ opacity: 0.7 }}>삼위일체</span>
              </div>
            </div>
          )}
        </div>

        {/* 사이드바 - 데스크탑만 */}
        {!isMobile && selectedCharacterData && (
          <aside style={styles.sidebar}>
            <CharacterDetail
              character={selectedCharacterData}
              lang={lang}
              relatedEvents={relatedEvents}
              relatedHymns={relatedHymns}
              relatedRelationships={relatedRelationships}
              selectedCharacter={selectedCharacter}
              onCharacterSelect={setSelectedCharacter}
              onEventClick={handleEventClick}
            />
          </aside>
        )}
      </div>

      {/* 타임라인 - 모바일에서는 숨김 */}
      {!isMobile && (
        <div style={{
          height: '55px',
          background: 'rgba(15, 15, 25, 0.95)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          overflowX: 'auto'
        }}>
          <div style={{ display: 'flex', gap: 6, minWidth: '100%' }}>
            {eventsByChronology.slice(0, 35).map(event => (
              <div
                key={event.id}
                style={{
                  padding: '6px 12px',
                  background: selectedEvent === event.id ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.05)',
                  borderRadius: 8,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontSize: '0.75rem',
                  border: selectedEvent === event.id ? '1px solid rgba(255,215,0,0.4)' : '1px solid transparent'
                }}
                onClick={() => handleEventClick(event.id)}
              >
                <span style={{ marginRight: 4 }}>{event.icon}</span>
                {lang === 'ko' ? event.name_ko : event.name_en}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 모바일 인물 팝업 */}
      {showPopup === 'character' && selectedCharacterData && (
        <>
          <div style={styles.overlay} onClick={() => setShowPopup(null)} />
          <div style={styles.popup}>
            <button
              style={{ position: 'absolute', top: 12, right: 12, ...styles.button, padding: '6px 10px' }}
              onClick={() => setShowPopup(null)}
            >✕</button>
            <CharacterDetail
              character={selectedCharacterData}
              lang={lang}
              relatedEvents={relatedEvents}
              relatedHymns={relatedHymns}
              relatedRelationships={relatedRelationships}
              selectedCharacter={selectedCharacter}
              onCharacterSelect={(id) => { setSelectedCharacter(id); }}
              onEventClick={handleEventClick}
            />
          </div>
        </>
      )}

      {/* 이벤트 팝업 */}
      {showPopup === 'event' && selectedEventData && (
        <>
          <div style={styles.overlay} onClick={() => setShowPopup(null)} />
          <div style={styles.popup}>
            <button
              style={{ position: 'absolute', top: 12, right: 12, ...styles.button, padding: '6px 10px' }}
              onClick={() => setShowPopup(null)}
            >✕</button>
            <EventDetail
              event={selectedEventData}
              lang={lang}
              eras={eras}
              onCharacterSelect={(id) => { setSelectedCharacter(id); setShowPopup(isMobile ? 'character' : null); }}
            />
          </div>
        </>
      )}
    </div>
  );
}

// ==================== 인물 상세 컴포넌트 ====================
function CharacterDetail({ character, lang, relatedEvents, relatedHymns, relatedRelationships, selectedCharacter, onCharacterSelect, onEventClick }) {
  const nodeColor = getNodeColor(character, true, true);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${nodeColor.fill}, ${nodeColor.stroke})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ fontSize: '1rem' }}>{character.testament === 'old' ? '📜' : '✝️'}</span>
        </div>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: nodeColor.fill }}>
            {lang === 'ko' ? character.name_ko : character.name_en}
          </h2>
          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
            <span style={{ ...styles.badge, background: character.testament === 'old' ? 'rgba(74, 144, 217, 0.3)' : 'rgba(224, 86, 253, 0.3)' }}>
              {character.testament === 'old' ? '구약' : character.testament === 'new' ? '신약' : '구약+신약'}
            </span>
            <span style={{ ...styles.badge, background: 'rgba(243, 156, 18, 0.2)' }}>
              중요도 {character.importance}/10
            </span>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <p style={{ fontSize: '0.85rem', lineHeight: 1.6, opacity: 0.9 }}>
          {lang === 'ko' ? character.description_ko : character.description_en}
        </p>
      </div>

      {character.labels && (
        <div style={{ marginBottom: 12 }}>
          {character.labels.map((label, i) => (
            <span key={i} style={{ ...styles.badge, background: 'rgba(255,255,255,0.08)' }}>{label}</span>
          ))}
        </div>
      )}

      {character.verses && character.verses.length > 0 && (
        <div style={styles.card}>
          <h4 style={{ marginBottom: 10, fontSize: '0.8rem' }}>📜 주요 구절</h4>
          {character.verses.slice(0, 2).map((verse, i) => (
            <div key={i} style={{ marginBottom: 8, padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: 8, borderLeft: '3px solid #ffd700' }}>
              <strong style={{ color: '#ffd700', fontSize: '0.75rem' }}>{verse.ref}</strong>
              <p style={{ marginTop: 4, fontStyle: 'italic', opacity: 0.85, fontSize: '0.8rem', lineHeight: 1.4 }}>
                "{lang === 'ko' ? verse.text_ko : verse.text_en}"
              </p>
            </div>
          ))}
        </div>
      )}

      {relatedEvents.length > 0 && (
        <div style={styles.card}>
          <h4 style={{ marginBottom: 10, fontSize: '0.8rem' }}>📌 관련 사건</h4>
          {relatedEvents.slice(0, 3).map(event => (
            <div
              key={event.id}
              style={{ padding: '8px 10px', background: 'rgba(0,0,0,0.3)', borderRadius: 8, marginBottom: 6, cursor: 'pointer', fontSize: '0.8rem' }}
              onClick={() => onEventClick(event.id)}
            >
              <span style={{ marginRight: 6 }}>{event.icon}</span>
              {lang === 'ko' ? event.name_ko : event.name_en}
            </div>
          ))}
        </div>
      )}

      {relatedHymns.length > 0 && (
        <div style={styles.card}>
          <h4 style={{ marginBottom: 10, fontSize: '0.8rem' }}>🎵 관련 찬송가</h4>
          {relatedHymns.slice(0, 3).map(hymn => (
            <div key={hymn.id} style={{ padding: '8px 10px', background: 'rgba(0,0,0,0.3)', borderRadius: 8, marginBottom: 6, fontSize: '0.8rem' }}>
              <span style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', padding: '2px 8px', borderRadius: 4, fontSize: '0.7rem', marginRight: 8 }}>
                {hymn.number}장
              </span>
              {lang === 'ko' ? hymn.title_ko : hymn.title_en}
            </div>
          ))}
        </div>
      )}

      {relatedRelationships.length > 0 && (
        <div style={styles.card}>
          <h4 style={{ marginBottom: 10, fontSize: '0.8rem' }}>👥 관련 인물</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {relatedRelationships.slice(0, 8).map((rel, i) => {
              const otherId = rel.source === selectedCharacter ? rel.target : rel.source;
              const other = getCharacterById(otherId);
              if (!other) return null;
              return (
                <button key={i} style={{ ...styles.button, fontSize: '0.75rem', padding: '4px 10px' }} onClick={() => onCharacterSelect(otherId)}>
                  {lang === 'ko' ? other.name_ko : other.name_en}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

// ==================== 이벤트 상세 컴포넌트 ====================
function EventDetail({ event, lang, eras, onCharacterSelect }) {
  const era = eras.find(e => e.id === event.era);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{
          width: 50,
          height: 50,
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ fontSize: '1.5rem' }}>{event.icon}</span>
        </div>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: 4 }}>
            {lang === 'ko' ? event.name_ko : event.name_en}
          </h2>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ ...styles.badge, background: era?.color || '#666', margin: 0 }}>
              {era?.name_ko}
            </span>
            <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>
              {event.year > 0 ? `AD ${event.year}` : `BC ${Math.abs(event.year)}`}
            </span>
          </div>
        </div>
      </div>

      <p style={{ marginBottom: 16, lineHeight: 1.7, fontSize: '0.9rem', opacity: 0.9 }}>
        {lang === 'ko' ? event.description_ko : event.description_en}
      </p>

      <div style={styles.card}>
        <h4 style={{ marginBottom: 10, fontSize: '0.85rem' }}>📜 성경 구절</h4>
        <p style={{ color: '#ffd700', marginBottom: 6, fontSize: '0.85rem', fontWeight: '500' }}>
          {event.verses.join(', ')}
        </p>
        <p style={{
          fontStyle: 'italic',
          opacity: 0.85,
          fontSize: '0.85rem',
          lineHeight: 1.6,
          padding: '10px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 8,
          borderLeft: '3px solid #ffd700'
        }}>
          "{lang === 'ko' ? event.verse_text_ko : event.verse_text_en}"
        </p>
      </div>

      {event.commentary_ko && (
        <div style={styles.card}>
          <h4 style={{ marginBottom: 10, fontSize: '0.85rem' }}>📝 간략 강해</h4>
          <p style={{ lineHeight: 1.7, opacity: 0.9, fontSize: '0.85rem' }}>
            {event.commentary_ko}
          </p>
        </div>
      )}

      <div style={styles.card}>
        <h4 style={{ marginBottom: 10, fontSize: '0.85rem' }}>👥 관련 인물</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {event.characters.map(charId => {
            const char = getCharacterById(charId);
            if (!char) return null;
            return (
              <button key={charId} style={{ ...styles.button, fontSize: '0.8rem', padding: '6px 12px' }} onClick={() => onCharacterSelect(charId)}>
                {lang === 'ko' ? char.name_ko : char.name_en}
              </button>
            );
          })}
        </div>
      </div>

      <p style={{ opacity: 0.4, fontSize: '0.75rem', marginTop: 12, textAlign: 'center' }}>
        📍 {event.location}
      </p>
    </>
  );
}
