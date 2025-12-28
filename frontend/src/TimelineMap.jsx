import React, { useState, useEffect, useRef, useMemo } from 'react';

// 관계 타입별 색상
const relationshipColors = {
  'spouse': '#ff6b9d',      // 핑크 - 배우자
  'parent': '#ffd700',      // 금색 - 부모
  'child': '#ffd700',       // 금색 - 자녀
  'sibling': '#00d4ff',     // 하늘색 - 형제
  'servant': '#9d4edd',     // 보라 - 종
  'master': '#9d4edd',      // 보라 - 주인
  'enemy': '#ff4757',       // 빨강 - 적
  'ally': '#2ed573',        // 초록 - 동맹
  'disciple': '#45b7d1',    // 청록 - 제자
  'teacher': '#45b7d1',     // 청록 - 스승
  'successor': '#f9ca24',   // 노랑 - 후계자
  'ancestor': '#e17055',    // 주황 - 조상
  'descendant': '#e17055',  // 주황 - 후손
  'king': '#a29bfe',        // 연보라 - 왕
  'prophet': '#fd79a8',     // 분홍 - 선지자
  'default': '#667eea'      // 기본 파랑
};

// 시대별 트랙 Y 위치
const getTrackY = (eraIndex, totalEras) => {
  const baseY = 120;
  const trackHeight = 140;
  return baseY + (eraIndex * trackHeight);
};

function TimelineMap({
  characters,
  events,
  eras,
  relationships,
  lang,
  isMobile,
  onClose,
  onCharacterSelect,
  onEventSelect,
  characterArtwork,
  eventArtwork
}) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [scrollX, setScrollX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 시대 정렬
  const sortedEras = useMemo(() => {
    return [...eras].sort((a, b) => a.year_start - b.year_start);
  }, [eras]);

  // 노드 크기
  const nodeSize = isMobile ? 40 : 50;
  const nodeGap = isMobile ? 60 : 80;

  // 노드 위치 계산
  const nodePositions = useMemo(() => {
    const positions = {};
    let currentX = 150;

    // 영원 (삼위일체) - 맨 왼쪽 상단
    const eternalChars = characters.filter(c => c.era === 'eternal' || !c.era);
    eternalChars.forEach((char, i) => {
      positions[char.id] = {
        x: 80,
        y: 80 + i * 70,
        era: 'eternal',
        type: 'character'
      };
    });

    // 시대별 캐릭터 배치
    sortedEras.forEach((era, eraIndex) => {
      const eraChars = characters.filter(c => c.era === era.id);
      const trackY = getTrackY(eraIndex, sortedEras.length);

      // 이벤트 먼저 배치
      const eraEvents = events.filter(e => e.era === era.id);
      eraEvents.forEach((evt, i) => {
        positions[`event_${evt.id}`] = {
          x: currentX + i * nodeGap,
          y: trackY - 50,
          era: era.id,
          type: 'event',
          color: era.color
        };
      });

      // 캐릭터 배치 (지그재그 패턴)
      eraChars.forEach((char, i) => {
        const row = i % 2;
        const col = Math.floor(i / 2);
        positions[char.id] = {
          x: currentX + col * nodeGap,
          y: trackY + (row * 60),
          era: era.id,
          type: 'character',
          color: era.color
        };
      });

      currentX += Math.max(eraChars.length / 2, eraEvents.length, 3) * nodeGap + 100;
    });

    return positions;
  }, [characters, events, sortedEras, nodeGap]);

  // 전체 너비 계산
  const totalWidth = useMemo(() => {
    const maxX = Math.max(...Object.values(nodePositions).map(p => p.x));
    return maxX + 200;
  }, [nodePositions]);

  // 연결선 데이터
  const connections = useMemo(() => {
    return relationships.map(rel => {
      const from = nodePositions[rel.source];
      const to = nodePositions[rel.target];
      if (!from || !to) return null;

      return {
        ...rel,
        x1: from.x,
        y1: from.y,
        x2: to.x,
        y2: to.y,
        color: relationshipColors[rel.type] || relationshipColors.default
      };
    }).filter(Boolean);
  }, [relationships, nodePositions]);

  // 드래그 스크롤
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // ESC 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // 베지어 커브 경로 생성
  const createCurvePath = (x1, y1, x2, y2) => {
    const midX = (x1 + x2) / 2;
    const cp1x = midX;
    const cp1y = y1;
    const cp2x = midX;
    const cp2y = y2;
    return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0d0d1a 100%)',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* 배경 별/입자 효과 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.3), transparent),
          radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.2), transparent),
          radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.3), transparent),
          radial-gradient(2px 2px at 130px 80px, rgba(255,215,0,0.2), transparent),
          radial-gradient(1px 1px at 160px 120px, rgba(255,255,255,0.2), transparent)
        `,
        backgroundSize: '200px 150px',
        opacity: 0.6,
        pointerEvents: 'none'
      }} />

      {/* 헤더 */}
      <div style={{
        padding: isMobile ? '10px 12px' : '12px 20px',
        background: 'linear-gradient(180deg, rgba(26,26,46,0.98) 0%, rgba(13,13,26,0.95) 100%)',
        borderBottom: '1px solid rgba(102,126,234,0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10
      }}>
        <div>
          <h2 style={{
            margin: 0,
            fontSize: isMobile ? '1rem' : '1.2rem',
            background: 'linear-gradient(135deg, #ffd700, #ff6b6b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700
          }}>
            THE MAP OF BIBLE
          </h2>
          <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)' }}>
            성경 인물 역사 지도
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            width: 32,
            height: 32,
            color: '#fff',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >✕</button>
      </div>

      {/* 시대 범례 */}
      <div style={{
        padding: '6px 12px',
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        background: 'rgba(0,0,0,0.3)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        zIndex: 10
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '3px 8px',
          borderRadius: '10px',
          background: 'rgba(255,215,0,0.2)',
          border: '1px solid rgba(255,215,0,0.4)',
          fontSize: '0.6rem',
          whiteSpace: 'nowrap',
          color: '#ffd700'
        }}>
          ✨ 영원
        </div>
        {sortedEras.map(era => (
          <div
            key={era.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 8px',
              borderRadius: '10px',
              background: `${era.color}20`,
              border: `1px solid ${era.color}50`,
              fontSize: '0.6rem',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            <div style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: era.color,
              boxShadow: `0 0 6px ${era.color}`
            }} />
            <span style={{ color: era.color }}>
              {lang === 'ko' ? era.name_ko : era.name_en}
            </span>
          </div>
        ))}
      </div>

      {/* 메인 맵 영역 */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          flex: 1,
          overflow: 'auto',
          cursor: isDragging ? 'grabbing' : 'grab',
          position: 'relative'
        }}
      >
        <svg
          ref={svgRef}
          width={totalWidth}
          height={sortedEras.length * 140 + 250}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none'
          }}
        >
          {/* 그라디언트 정의 */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            {/* 각 관계 타입별 그라디언트 */}
            {Object.entries(relationshipColors).map(([type, color]) => (
              <linearGradient key={type} id={`grad-${type}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color} stopOpacity="0.8"/>
                <stop offset="50%" stopColor={color} stopOpacity="1"/>
                <stop offset="100%" stopColor={color} stopOpacity="0.8"/>
              </linearGradient>
            ))}
          </defs>

          {/* 시대 트랙 배경 */}
          {sortedEras.map((era, i) => (
            <g key={era.id}>
              <rect
                x={100}
                y={getTrackY(i, sortedEras.length) - 30}
                width={totalWidth - 150}
                height={100}
                fill={`${era.color}08`}
                rx={10}
              />
              <line
                x1={100}
                y1={getTrackY(i, sortedEras.length) + 20}
                x2={totalWidth - 50}
                y2={getTrackY(i, sortedEras.length) + 20}
                stroke={era.color}
                strokeWidth={2}
                strokeOpacity={0.3}
                strokeDasharray="10 5"
              />
            </g>
          ))}

          {/* 연결선 */}
          {connections.map((conn, i) => (
            <g key={i}>
              <path
                d={createCurvePath(conn.x1, conn.y1, conn.x2, conn.y2)}
                stroke={conn.color}
                strokeWidth={hoveredNode === conn.source || hoveredNode === conn.target ? 3 : 1.5}
                fill="none"
                opacity={hoveredNode === conn.source || hoveredNode === conn.target ? 1 : 0.4}
                filter={hoveredNode === conn.source || hoveredNode === conn.target ? 'url(#glow)' : 'none'}
              />
            </g>
          ))}
        </svg>

        {/* 노드들 */}
        <div style={{ position: 'relative', width: totalWidth, height: sortedEras.length * 140 + 250 }}>
          {/* 영원 노드 (삼위일체) */}
          {characters.filter(c => c.era === 'eternal' || !c.era).map(char => {
            const pos = nodePositions[char.id];
            if (!pos) return null;

            return (
              <div
                key={char.id}
                onClick={() => onCharacterSelect(char.id)}
                onMouseEnter={() => setHoveredNode(char.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{
                  position: 'absolute',
                  left: pos.x - nodeSize/2,
                  top: pos.y - nodeSize/2,
                  width: nodeSize,
                  height: nodeSize,
                  borderRadius: '50%',
                  background: characterArtwork[char.id]
                    ? `url(${characterArtwork[char.id]}) center/cover`
                    : 'linear-gradient(135deg, #ffd700, #ff8c00)',
                  border: hoveredNode === char.id
                    ? '3px solid #ffd700'
                    : '2px solid rgba(255,215,0,0.6)',
                  boxShadow: hoveredNode === char.id
                    ? '0 0 25px rgba(255,215,0,0.8), inset 0 0 20px rgba(255,215,0,0.3)'
                    : '0 0 15px rgba(255,215,0,0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  transform: hoveredNode === char.id ? 'scale(1.15)' : 'scale(1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: hoveredNode === char.id ? 100 : 10
                }}
              >
                {!characterArtwork[char.id] && (
                  <span style={{ fontSize: nodeSize * 0.5 }}>
                    {char.id === 'god' ? '👑' : char.id === 'jesus' ? '✝️' : '🕊️'}
                  </span>
                )}
              </div>
            );
          })}

          {/* 시대별 캐릭터 노드 */}
          {sortedEras.map(era => (
            characters.filter(c => c.era === era.id).map(char => {
              const pos = nodePositions[char.id];
              if (!pos) return null;

              return (
                <div
                  key={char.id}
                  onClick={() => onCharacterSelect(char.id)}
                  onMouseEnter={() => setHoveredNode(char.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    position: 'absolute',
                    left: pos.x - nodeSize/2,
                    top: pos.y - nodeSize/2,
                    width: nodeSize,
                    height: nodeSize,
                    borderRadius: '8px',
                    background: characterArtwork[char.id]
                      ? `url(${characterArtwork[char.id]}) center/cover`
                      : `linear-gradient(135deg, ${era.color}, ${era.color}88)`,
                    border: hoveredNode === char.id
                      ? `3px solid ${era.color}`
                      : `2px solid ${era.color}88`,
                    boxShadow: hoveredNode === char.id
                      ? `0 0 20px ${era.color}80`
                      : `0 4px 12px rgba(0,0,0,0.5)`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    transform: hoveredNode === char.id ? 'scale(1.1)' : 'scale(1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: hoveredNode === char.id ? 100 : 10
                  }}
                >
                  {!characterArtwork[char.id] && (
                    <span style={{
                      fontSize: '0.55rem',
                      color: '#fff',
                      textAlign: 'center',
                      padding: '2px',
                      textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                    }}>
                      {(lang === 'ko' ? char.name_ko : char.name_en).slice(0, 3)}
                    </span>
                  )}
                </div>
              );
            })
          ))}

          {/* 노드 라벨 */}
          {Object.entries(nodePositions).map(([id, pos]) => {
            if (pos.type === 'event') return null;
            const char = characters.find(c => c.id === id);
            if (!char) return null;

            return (
              <div
                key={`label-${id}`}
                style={{
                  position: 'absolute',
                  left: pos.x,
                  top: pos.y + nodeSize/2 + 4,
                  transform: 'translateX(-50%)',
                  fontSize: '0.55rem',
                  color: hoveredNode === id ? '#fff' : 'rgba(255,255,255,0.7)',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                  pointerEvents: 'none',
                  zIndex: 5
                }}
              >
                {lang === 'ko' ? char.name_ko : char.name_en}
              </div>
            );
          })}

          {/* 이벤트 노드 */}
          {events.map(evt => {
            const pos = nodePositions[`event_${evt.id}`];
            if (!pos) return null;

            return (
              <div
                key={evt.id}
                onClick={() => onEventSelect(evt.id)}
                onMouseEnter={() => setHoveredNode(evt.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{
                  position: 'absolute',
                  left: pos.x - 25,
                  top: pos.y - 15,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  background: hoveredNode === evt.id
                    ? `${pos.color}60`
                    : `${pos.color}30`,
                  border: `1px solid ${pos.color}80`,
                  cursor: 'pointer',
                  fontSize: '0.55rem',
                  color: '#fff',
                  whiteSpace: 'nowrap',
                  boxShadow: hoveredNode === evt.id
                    ? `0 0 15px ${pos.color}60`
                    : '0 2px 8px rgba(0,0,0,0.4)',
                  transition: 'all 0.2s ease',
                  zIndex: hoveredNode === evt.id ? 100 : 8
                }}
              >
                📌 {lang === 'ko' ? evt.name_ko : evt.name_en}
              </div>
            );
          })}
        </div>
      </div>

      {/* 푸터 안내 */}
      <div style={{
        padding: '8px',
        background: 'rgba(0,0,0,0.5)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        textAlign: 'center',
        fontSize: '0.6rem',
        color: 'rgba(255,255,255,0.5)'
      }}>
        드래그하여 탐색 • 노드 클릭으로 상세정보 • 연결선은 인물 관계를 나타냅니다
      </div>

      {/* 관계 타입 범례 */}
      <div style={{
        position: 'absolute',
        bottom: 50,
        right: 10,
        background: 'rgba(0,0,0,0.7)',
        borderRadius: '8px',
        padding: '8px',
        fontSize: '0.5rem',
        display: isMobile ? 'none' : 'flex',
        flexDirection: 'column',
        gap: '3px',
        zIndex: 100
      }}>
        <div style={{ color: '#fff', marginBottom: '4px', fontWeight: 'bold' }}>관계 유형</div>
        {[
          ['spouse', '배우자'],
          ['parent', '부모/자녀'],
          ['sibling', '형제'],
          ['disciple', '제자/스승'],
          ['ally', '동맹']
        ].map(([type, label]) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{
              width: 16,
              height: 2,
              background: relationshipColors[type],
              boxShadow: `0 0 4px ${relationshipColors[type]}`
            }} />
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimelineMap;
