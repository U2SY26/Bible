import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  allCharacters,
  getCharacterById,
  getCharactersByBook,
  getCharactersByEra,
  getCharactersByTestament,
  searchCharacters,
  relationships,
  relationshipColors,
  getRelationshipsByCharacter,
  events,
  eras,
  getEventsByCharacter,
  eventsByChronology,
  bibleBooks,
  allBooks,
  categoryColors,
  hymns,
  getHymnsByCharacter,
  regions
} from './data/index.js';

// ==================== 스타일 정의 ====================
const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)',
    fontFamily: "'Noto Sans KR', sans-serif",
    color: '#fff',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    padding: '12px 20px',
    background: 'rgba(0,0,0,0.4)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap',
    zIndex: 100
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #ffd700, #ff6b6b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginRight: '20px'
  },
  searchInput: {
    padding: '8px 15px',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(255,255,255,0.1)',
    color: '#fff',
    width: '200px',
    outline: 'none'
  },
  select: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(255,255,255,0.1)',
    color: '#fff',
    cursor: 'pointer',
    outline: 'none'
  },
  button: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    background: 'rgba(255,255,255,0.15)',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  activeButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
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
  sidebar: {
    width: '380px',
    background: 'rgba(0,0,0,0.5)',
    borderLeft: '1px solid rgba(255,255,255,0.1)',
    overflowY: 'auto',
    padding: '20px'
  },
  timeline: {
    height: '80px',
    background: 'rgba(0,0,0,0.4)',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    overflowX: 'auto'
  },
  popup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)',
    borderRadius: '16px',
    padding: '25px',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflowY: 'auto',
    zIndex: 1000,
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    zIndex: 999
  },
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    marginRight: '6px',
    marginBottom: '6px'
  },
  card: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
    padding: '15px',
    marginBottom: '15px',
    border: '1px solid rgba(255,255,255,0.1)'
  }
};

// ==================== 노드 색상 ====================
const getNodeColor = (character, isHighlighted, isSelected) => {
  if (!isHighlighted && !isSelected) {
    return { fill: '#444', stroke: '#555', opacity: 0.3 };
  }
  
  const colors = {
    god: { fill: '#ffd700', stroke: '#ffed4a', glow: '#ffd700' },
    jesus: { fill: '#ff6b6b', stroke: '#ff8787', glow: '#ff6b6b' },
    holy_spirit: { fill: '#74b9ff', stroke: '#a3d5ff', glow: '#74b9ff' }
  };
  
  if (colors[character.id]) {
    return { ...colors[character.id], opacity: 1 };
  }
  
  const testamentColors = {
    old: { fill: '#4a90d9', stroke: '#6ba3e0', glow: '#4a90d9' },
    new: { fill: '#e056fd', stroke: '#e878fc', glow: '#e056fd' },
    both: { fill: '#a29bfe', stroke: '#b8b3ff', glow: '#a29bfe' }
  };
  
  return { ...testamentColors[character.testament] || testamentColors.old, opacity: 1 };
};

// ==================== 유틸리티 함수 ====================
const getNodeSize = (character) => {
  return character.importance * 3 + 15;
};

const getConnectedCharacters = (characterId) => {
  const connected = new Set();
  relationships.forEach(rel => {
    if (rel.source === characterId) connected.add(rel.target);
    if (rel.target === characterId) connected.add(rel.source);
  });
  return connected;
};

// 물리 시뮬레이션 초기화
const initializePositions = (characters, width, height) => {
  const positions = {};
  const eraPositions = {};
  
  // 시대별 X 위치 계산
  eras.forEach((era, index) => {
    eraPositions[era.id] = (index + 1) * (width / (eras.length + 1));
  });
  
  characters.forEach((char, index) => {
    const eraX = eraPositions[char.era] || width / 2;
    const jitter = (Math.random() - 0.5) * 200;
    positions[char.id] = {
      x: eraX + jitter,
      y: 100 + Math.random() * (height - 200),
      vx: 0,
      vy: 0
    };
  });
  
  return positions;
};

// ==================== 메인 App 컴포넌트 ====================
export default function App() {
  // State
  const [lang, setLang] = useState('ko');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestament, setSelectedTestament] = useState('both');
  const [selectedBook, setSelectedBook] = useState('all');
  const [selectedEra, setSelectedEra] = useState('all');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(null); // 'character', 'event', 'hymn'
  const [positions, setPositions] = useState({});
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragTarget, setDragTarget] = useState(null);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  
  // 필터링된 캐릭터
  const filteredCharacters = useMemo(() => {
    let chars = allCharacters;
    
    // 구약/신약 필터
    if (selectedTestament !== 'both') {
      chars = chars.filter(c => c.testament === selectedTestament || c.testament === 'both');
    }
    
    // 성경 필터
    if (selectedBook !== 'all') {
      chars = chars.filter(c => c.books && c.books.includes(selectedBook));
    }
    
    // 시대 필터
    if (selectedEra !== 'all') {
      chars = chars.filter(c => c.era === selectedEra);
    }
    
    // 검색 필터
    if (searchQuery) {
      chars = searchCharacters(searchQuery, lang);
    }
    
    return chars;
  }, [selectedTestament, selectedBook, selectedEra, searchQuery, lang]);
  
  // 하이라이트된 캐릭터 (필터링된 + 직접 연결된)
  const highlightedIds = useMemo(() => {
    const ids = new Set(filteredCharacters.map(c => c.id));
    
    // 선택된 캐릭터가 있으면 그와 연결된 캐릭터도 하이라이트
    if (selectedCharacter) {
      ids.add(selectedCharacter);
      getConnectedCharacters(selectedCharacter).forEach(id => ids.add(id));
    }
    
    // 필터링된 캐릭터들과 직접 연결된 캐릭터도 포함
    filteredCharacters.forEach(char => {
      getConnectedCharacters(char.id).forEach(id => ids.add(id));
    });
    
    return ids;
  }, [filteredCharacters, selectedCharacter]);
  
  // 표시할 관계선
  const visibleRelationships = useMemo(() => {
    return relationships.filter(rel => 
      highlightedIds.has(rel.source) || highlightedIds.has(rel.target)
    );
  }, [highlightedIds]);
  
  // 초기 위치 설정
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
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect) return prev;
        
        const { width, height } = containerRect;
        
        // 노드 간 반발력
        allCharacters.forEach(char1 => {
          if (!newPos[char1.id]) return;
          
          allCharacters.forEach(char2 => {
            if (char1.id === char2.id || !newPos[char2.id]) return;
            
            const dx = newPos[char1.id].x - newPos[char2.id].x;
            const dy = newPos[char1.id].y - newPos[char2.id].y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const minDist = 80;
            
            if (dist < minDist) {
              const force = (minDist - dist) / dist * 0.5;
              newPos[char1.id].vx += dx * force;
              newPos[char1.id].vy += dy * force;
            }
          });
        });
        
        // 연결된 노드 간 인력
        relationships.forEach(rel => {
          if (!newPos[rel.source] || !newPos[rel.target]) return;
          
          const dx = newPos[rel.target].x - newPos[rel.source].x;
          const dy = newPos[rel.target].y - newPos[rel.source].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const idealDist = 120;
          
          if (dist > idealDist) {
            const force = (dist - idealDist) / dist * 0.02;
            newPos[rel.source].vx += dx * force;
            newPos[rel.source].vy += dy * force;
            newPos[rel.target].vx -= dx * force;
            newPos[rel.target].vy -= dy * force;
          }
        });
        
        // 위치 업데이트
        Object.keys(newPos).forEach(id => {
          if (dragTarget === id) return;
          
          newPos[id].x += newPos[id].vx;
          newPos[id].y += newPos[id].vy;
          newPos[id].vx *= 0.9;
          newPos[id].vy *= 0.9;
          
          // 경계 제한
          const margin = 50;
          newPos[id].x = Math.max(margin, Math.min(width - margin, newPos[id].x));
          newPos[id].y = Math.max(margin, Math.min(height - margin, newPos[id].y));
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
  
  // 마우스 이벤트 핸들러
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
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.3, Math.min(3, prev * delta)));
  }, []);
  
  // 캐릭터 클릭
  const handleCharacterClick = useCallback((characterId) => {
    setSelectedCharacter(characterId);
    setShowPopup('character');
  }, []);
  
  // 이벤트 클릭
  const handleEventClick = useCallback((eventId) => {
    setSelectedEvent(eventId);
    setShowPopup('event');
  }, []);
  
  // 선택된 캐릭터 정보
  const selectedCharacterData = selectedCharacter ? getCharacterById(selectedCharacter) : null;
  const selectedEventData = selectedEvent ? events.find(e => e.id === selectedEvent) : null;
  
  // 선택된 캐릭터의 관련 정보
  const relatedHymns = selectedCharacter ? getHymnsByCharacter(selectedCharacter) : [];
  const relatedEvents = selectedCharacter ? getEventsByCharacter(selectedCharacter) : [];
  const relatedRelationships = selectedCharacter ? getRelationshipsByCharacter(selectedCharacter) : [];

  return (
    <div style={styles.container}>
      {/* 헤더 */}
      <header style={styles.header}>
        <h1 style={styles.title}>📖 {lang === 'ko' ? '성경 인물 관계도' : 'Bible Character Graph'}</h1>
        
        <input
          type="text"
          placeholder={lang === 'ko' ? '🔍 인물 검색...' : '🔍 Search...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        
        <select
          value={selectedTestament}
          onChange={(e) => setSelectedTestament(e.target.value)}
          style={styles.select}
        >
          <option value="both">{lang === 'ko' ? '📚 전체' : '📚 All'}</option>
          <option value="old">{lang === 'ko' ? '📜 구약' : '📜 Old Testament'}</option>
          <option value="new">{lang === 'ko' ? '✝️ 신약' : '✝️ New Testament'}</option>
        </select>
        
        <select
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
          style={styles.select}
        >
          <option value="all">{lang === 'ko' ? '📖 전체 성경' : '📖 All Books'}</option>
          <optgroup label={lang === 'ko' ? '구약 39권' : 'Old Testament (39)'}>
            {bibleBooks.old.map(book => (
              <option key={book.id} value={book.id}>
                {lang === 'ko' ? book.name_ko : book.name_en}
              </option>
            ))}
          </optgroup>
          <optgroup label={lang === 'ko' ? '신약 27권' : 'New Testament (27)'}>
            {bibleBooks.new.map(book => (
              <option key={book.id} value={book.id}>
                {lang === 'ko' ? book.name_ko : book.name_en}
              </option>
            ))}
          </optgroup>
        </select>
        
        <select
          value={selectedEra}
          onChange={(e) => setSelectedEra(e.target.value)}
          style={styles.select}
        >
          <option value="all">{lang === 'ko' ? '🕐 전체 시대' : '🕐 All Eras'}</option>
          {eras.map(era => (
            <option key={era.id} value={era.id}>
              {lang === 'ko' ? era.name_ko : era.name_en}
            </option>
          ))}
        </select>
        
        <button
          style={{...styles.button, ...(lang === 'en' ? styles.activeButton : {})}}
          onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
        >
          {lang === 'ko' ? '🇺🇸 EN' : '🇰🇷 KO'}
        </button>
        
        <button
          style={styles.button}
          onClick={() => {
            setSelectedCharacter(null);
            setSelectedBook('all');
            setSelectedEra('all');
            setSelectedTestament('both');
            setSearchQuery('');
            setZoom(1);
            setPan({ x: 0, y: 0 });
          }}
        >
          🔄 {lang === 'ko' ? '초기화' : 'Reset'}
        </button>
        
        <span style={{ marginLeft: 'auto', opacity: 0.7, fontSize: '0.85rem' }}>
          👥 {filteredCharacters.length} {lang === 'ko' ? '명' : 'characters'} | 
          🔗 {visibleRelationships.length} {lang === 'ko' ? '관계' : 'relations'}
        </span>
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
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <defs>
              {/* 글로우 필터 */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              {/* 시대별 배경 그라데이션 */}
              {eras.map(era => (
                <linearGradient key={era.id} id={`era-${era.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={era.color} stopOpacity="0.15"/>
                  <stop offset="100%" stopColor={era.color} stopOpacity="0.05"/>
                </linearGradient>
              ))}
            </defs>
            
            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {/* 시대별 배경 영역 */}
              {containerRef.current && eras.map((era, index) => {
                const { width, height } = containerRef.current.getBoundingClientRect();
                const eraWidth = width / eras.length;
                return (
                  <g key={era.id}>
                    <rect
                      x={index * eraWidth}
                      y={0}
                      width={eraWidth}
                      height={height}
                      fill={`url(#era-${era.id})`}
                    />
                    <text
                      x={index * eraWidth + eraWidth / 2}
                      y={30}
                      textAnchor="middle"
                      fill={era.color}
                      fontSize="12"
                      opacity={0.6}
                    >
                      {lang === 'ko' ? era.name_ko : era.name_en}
                    </text>
                  </g>
                );
              })}
              
              {/* 관계선 */}
              {visibleRelationships.map((rel, index) => {
                const sourcePos = positions[rel.source];
                const targetPos = positions[rel.target];
                if (!sourcePos || !targetPos) return null;
                
                const isActive = selectedCharacter === rel.source || selectedCharacter === rel.target;
                const relColor = relationshipColors[rel.type]?.color || '#666';
                const opacity = isActive ? 1 : (highlightedIds.has(rel.source) && highlightedIds.has(rel.target) ? 0.6 : 0.15);
                
                return (
                  <g key={`rel-${index}`}>
                    <line
                      x1={sourcePos.x}
                      y1={sourcePos.y}
                      x2={targetPos.x}
                      y2={targetPos.y}
                      stroke={relColor}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      opacity={opacity}
                    />
                    {isActive && (
                      <text
                        x={(sourcePos.x + targetPos.x) / 2}
                        y={(sourcePos.y + targetPos.y) / 2 - 5}
                        textAnchor="middle"
                        fill={relColor}
                        fontSize="10"
                        style={{ pointerEvents: 'none' }}
                      >
                        {lang === 'ko' ? rel.label_ko : rel.label_en}
                      </text>
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
                const nodeColor = getNodeColor(char, isHighlighted, isSelected);
                const size = getNodeSize(char);
                
                return (
                  <g
                    key={char.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    style={{ cursor: 'pointer' }}
                    onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, char.id); }}
                    onClick={() => handleCharacterClick(char.id)}
                    opacity={nodeColor.opacity}
                  >
                    {/* 글로우 효과 */}
                    {isHighlighted && char.importance >= 8 && (
                      <circle
                        r={size + 8}
                        fill="none"
                        stroke={nodeColor.glow}
                        strokeWidth="3"
                        opacity={0.4}
                        filter="url(#glow)"
                      />
                    )}
                    
                    {/* 메인 원 */}
                    <circle
                      r={size}
                      fill={nodeColor.fill}
                      stroke={isSelected ? '#fff' : nodeColor.stroke}
                      strokeWidth={isSelected ? 3 : 2}
                    />
                    
                    {/* 이름 */}
                    <text
                      y={size + 14}
                      textAnchor="middle"
                      fill={isHighlighted ? '#fff' : '#666'}
                      fontSize={isSelected ? 13 : 11}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      style={{ pointerEvents: 'none' }}
                    >
                      {lang === 'ko' ? char.name_ko : char.name_en}
                    </text>
                    
                    {/* 관련 사건 아이콘 */}
                    {isHighlighted && getEventsByCharacter(char.id).length > 0 && (
                      <text
                        x={size - 5}
                        y={-size + 10}
                        fontSize="14"
                        style={{ pointerEvents: 'none' }}
                      >
                        📌
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
          
          {/* 줌 컨트롤 */}
          <div style={{ position: 'absolute', bottom: 20, left: 20, display: 'flex', gap: 10 }}>
            <button style={styles.button} onClick={() => setZoom(z => Math.min(3, z * 1.2))}>➕</button>
            <span style={{ padding: '8px', color: '#aaa' }}>{Math.round(zoom * 100)}%</span>
            <button style={styles.button} onClick={() => setZoom(z => Math.max(0.3, z / 1.2))}>➖</button>
          </div>
        </div>
        
        {/* 사이드바 */}
        <aside style={styles.sidebar}>
          {selectedCharacterData ? (
            <>
              <h2 style={{ marginBottom: 15, color: getNodeColor(selectedCharacterData, true, true).fill }}>
                {lang === 'ko' ? selectedCharacterData.name_ko : selectedCharacterData.name_en}
              </h2>
              
              <div style={styles.card}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                  <span style={{...styles.badge, background: selectedCharacterData.testament === 'old' ? '#4a90d9' : '#e056fd'}}>
                    {selectedCharacterData.testament === 'old' ? (lang === 'ko' ? '구약' : 'OT') : 
                     selectedCharacterData.testament === 'new' ? (lang === 'ko' ? '신약' : 'NT') :
                     (lang === 'ko' ? '구약+신약' : 'Both')}
                  </span>
                  <span style={{...styles.badge, background: '#f39c12'}}>
                    ⭐ {selectedCharacterData.importance}/10
                  </span>
                </div>
                
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.9 }}>
                  {lang === 'ko' ? selectedCharacterData.description_ko : selectedCharacterData.description_en}
                </p>
              </div>
              
              {/* 라벨 */}
              {selectedCharacterData.labels && (
                <div style={{ marginBottom: 15 }}>
                  {selectedCharacterData.labels.map((label, i) => (
                    <span key={i} style={{...styles.badge, background: 'rgba(255,255,255,0.1)'}}>
                      {label}
                    </span>
                  ))}
                </div>
              )}
              
              {/* 성경 구절 */}
              {selectedCharacterData.verses && selectedCharacterData.verses.length > 0 && (
                <div style={styles.card}>
                  <h4 style={{ marginBottom: 10 }}>📜 {lang === 'ko' ? '주요 구절' : 'Key Verses'}</h4>
                  {selectedCharacterData.verses.slice(0, 3).map((verse, i) => (
                    <div key={i} style={{ marginBottom: 10, padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: 8 }}>
                      <strong style={{ color: '#ffd700' }}>{verse.ref}</strong>
                      <p style={{ fontSize: '0.85rem', marginTop: 5, fontStyle: 'italic' }}>
                        "{lang === 'ko' ? verse.text_ko : verse.text_en}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
              
              {/* 관련 사건 */}
              {relatedEvents.length > 0 && (
                <div style={styles.card}>
                  <h4 style={{ marginBottom: 10 }}>📌 {lang === 'ko' ? '관련 사건' : 'Related Events'}</h4>
                  {relatedEvents.slice(0, 5).map(event => (
                    <div
                      key={event.id}
                      style={{ padding: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: 8, marginBottom: 8, cursor: 'pointer' }}
                      onClick={() => handleEventClick(event.id)}
                    >
                      <span style={{ marginRight: 8 }}>{event.icon}</span>
                      {lang === 'ko' ? event.name_ko : event.name_en}
                    </div>
                  ))}
                </div>
              )}
              
              {/* 관련 찬송가 */}
              {relatedHymns.length > 0 && (
                <div style={styles.card}>
                  <h4 style={{ marginBottom: 10 }}>🎵 {lang === 'ko' ? '관련 찬송가' : 'Related Hymns'}</h4>
                  {relatedHymns.map(hymn => (
                    <div key={hymn.id} style={{ padding: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: 8, marginBottom: 8 }}>
                      <strong style={{ color: '#74b9ff' }}>{hymn.number}장</strong>
                      <span style={{ marginLeft: 10 }}>{lang === 'ko' ? hymn.title_ko : hymn.title_en}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {/* 관련 인물 */}
              {relatedRelationships.length > 0 && (
                <div style={styles.card}>
                  <h4 style={{ marginBottom: 10 }}>👥 {lang === 'ko' ? '관련 인물' : 'Related Characters'}</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {relatedRelationships.slice(0, 10).map((rel, i) => {
                      const otherId = rel.source === selectedCharacter ? rel.target : rel.source;
                      const other = getCharacterById(otherId);
                      if (!other) return null;
                      
                      return (
                        <button
                          key={i}
                          style={{...styles.button, fontSize: '0.8rem', padding: '6px 12px'}}
                          onClick={() => setSelectedCharacter(otherId)}
                        >
                          {lang === 'ko' ? other.name_ko : other.name_en}
                          <span style={{ opacity: 0.6, marginLeft: 5 }}>
                            ({lang === 'ko' ? rel.label_ko : rel.label_en})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: 40, opacity: 0.6 }}>
              <p style={{ fontSize: '3rem', marginBottom: 15 }}>📖</p>
              <p>{lang === 'ko' ? '인물을 선택하면 상세 정보가 표시됩니다.' : 'Select a character to view details.'}</p>
            </div>
          )}
        </aside>
      </div>
      
      {/* 타임라인 */}
      <div style={styles.timeline}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, minWidth: '100%' }}>
          {eventsByChronology.slice(0, 30).map((event, index) => (
            <div
              key={event.id}
              style={{
                padding: '5px 10px',
                background: selectedEvent === event.id ? 'rgba(255,215,0,0.3)' : 'rgba(255,255,255,0.1)',
                borderRadius: 8,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '0.75rem',
                transition: 'all 0.2s'
              }}
              onClick={() => handleEventClick(event.id)}
            >
              <span style={{ marginRight: 5 }}>{event.icon}</span>
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
              style={{ position: 'absolute', top: 15, right: 15, ...styles.button }}
              onClick={() => setShowPopup(null)}
            >
              ✕
            </button>
            
            <h2 style={{ marginBottom: 15, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '2rem' }}>{selectedEventData.icon}</span>
              {lang === 'ko' ? selectedEventData.name_ko : selectedEventData.name_en}
            </h2>
            
            <div style={{...styles.badge, background: eras.find(e => e.id === selectedEventData.era)?.color || '#666'}}>
              {lang === 'ko' ? eras.find(e => e.id === selectedEventData.era)?.name_ko : eras.find(e => e.id === selectedEventData.era)?.name_en}
            </div>
            <span style={{ marginLeft: 10, opacity: 0.6 }}>
              {selectedEventData.year > 0 ? `AD ${selectedEventData.year}` : `BC ${Math.abs(selectedEventData.year)}`}
            </span>
            
            <p style={{ margin: '20px 0', lineHeight: 1.8 }}>
              {lang === 'ko' ? selectedEventData.description_ko : selectedEventData.description_en}
            </p>
            
            <div style={styles.card}>
              <h4 style={{ marginBottom: 10 }}>📜 {lang === 'ko' ? '성경 구절' : 'Bible Verse'}</h4>
              <p style={{ color: '#ffd700', marginBottom: 5 }}>{selectedEventData.verses.join(', ')}</p>
              <p style={{ fontStyle: 'italic', opacity: 0.9 }}>
                "{lang === 'ko' ? selectedEventData.verse_text_ko : selectedEventData.verse_text_en}"
              </p>
            </div>
            
            {selectedEventData.commentary_ko && (
              <div style={styles.card}>
                <h4 style={{ marginBottom: 10 }}>📝 {lang === 'ko' ? '간략 강해' : 'Commentary'}</h4>
                <p style={{ lineHeight: 1.8, opacity: 0.9 }}>
                  {lang === 'ko' ? selectedEventData.commentary_ko : selectedEventData.commentary_ko}
                </p>
              </div>
            )}
            
            <div style={styles.card}>
              <h4 style={{ marginBottom: 10 }}>👥 {lang === 'ko' ? '관련 인물' : 'Related Characters'}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {selectedEventData.characters.map(charId => {
                  const char = getCharacterById(charId);
                  if (!char) return null;
                  return (
                    <button
                      key={charId}
                      style={styles.button}
                      onClick={() => {
                        setSelectedCharacter(charId);
                        setShowPopup(null);
                      }}
                    >
                      {lang === 'ko' ? char.name_ko : char.name_en}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <p style={{ opacity: 0.5, fontSize: '0.8rem', marginTop: 15 }}>
              📍 {selectedEventData.location}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
