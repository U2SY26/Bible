import React, { useState, useEffect, useRef, useMemo } from 'react';

// 관계 타입별 색상
const relationColors = {
  'spouse': '#ff6b9d',
  'parent': '#ffd700',
  'child': '#ffd700',
  'sibling': '#00d4ff',
  'disciple': '#45b7d1',
  'teacher': '#45b7d1',
  'ally': '#2ed573',
  'enemy': '#ff4757',
  'successor': '#f9ca24',
  'ancestor': '#e17055',
  'descendant': '#e17055',
  'default': '#667eea'
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
  const [hoveredNode, setHoveredNode] = useState(null);
  const [scale, setScale] = useState(1);

  // 시대 정렬
  const sortedEras = useMemo(() => {
    return [...eras].sort((a, b) => a.year_start - b.year_start);
  }, [eras]);

  // 노드 크기 및 간격
  const nodeW = isMobile ? 50 : 60;
  const nodeH = isMobile ? 50 : 60;
  const eraWidth = isMobile ? 200 : 280;
  const rowHeight = isMobile ? 70 : 85;
  const startX = 120;
  const startY = 100;

  // 노드 위치 계산
  const { nodePositions, totalWidth, totalHeight } = useMemo(() => {
    const positions = {};
    let maxY = startY;

    // 영원 (삼위일체) - 맨 왼쪽
    const eternalChars = characters.filter(c => c.era === 'eternal' || !c.era);
    eternalChars.forEach((char, i) => {
      positions[char.id] = {
        x: 60,
        y: startY + 80 + i * rowHeight,
        era: 'eternal',
        color: '#ffd700',
        char
      };
      maxY = Math.max(maxY, positions[char.id].y);
    });

    // 시대별 캐릭터 배치
    sortedEras.forEach((era, eraIdx) => {
      const eraX = startX + eraIdx * eraWidth;
      const eraChars = characters.filter(c => c.era === era.id);

      // 중요도/관계 수로 정렬
      const sortedChars = [...eraChars].sort((a, b) => {
        const aRels = relationships.filter(r => r.source === a.id || r.target === a.id).length;
        const bRels = relationships.filter(r => r.source === b.id || r.target === b.id).length;
        return bRels - aRels;
      });

      // 지그재그 배치로 공간 활용
      sortedChars.forEach((char, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const xOffset = col * (nodeW + 20) - (nodeW + 10);
        const yOffset = row * rowHeight;

        positions[char.id] = {
          x: eraX + eraWidth / 2 + xOffset,
          y: startY + 60 + yOffset,
          era: era.id,
          color: era.color,
          char
        };
        maxY = Math.max(maxY, positions[char.id].y);
      });

      // 이벤트 배치 (시대 상단)
      const eraEvents = events.filter(e => e.era === era.id);
      eraEvents.forEach((evt, i) => {
        positions[`evt_${evt.id}`] = {
          x: eraX + 40 + i * 80,
          y: startY + 10,
          era: era.id,
          color: era.color,
          event: evt
        };
      });
    });

    const width = startX + sortedEras.length * eraWidth + 100;
    const height = maxY + 150;

    return { nodePositions: positions, totalWidth: width, totalHeight: height };
  }, [characters, events, sortedEras, relationships, nodeW, rowHeight, eraWidth]);

  // 연결선 계산
  const connections = useMemo(() => {
    return relationships.map(rel => {
      const from = nodePositions[rel.source];
      const to = nodePositions[rel.target];
      if (!from || !to) return null;

      return {
        id: `${rel.source}-${rel.target}`,
        x1: from.x,
        y1: from.y,
        x2: to.x,
        y2: to.y,
        type: rel.type,
        color: relationColors[rel.type] || relationColors.default,
        source: rel.source,
        target: rel.target
      };
    }).filter(Boolean);
  }, [relationships, nodePositions]);

  // 베지어 커브 경로
  const createPath = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const cx1 = x1 + dx * 0.4;
    const cy1 = y1;
    const cx2 = x2 - dx * 0.4;
    const cy2 = y2;
    return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
  };

  // ESC 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // 휠 줌
  const handleWheel = (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale(s => Math.min(2, Math.max(0.5, s + delta)));
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#0a0a14',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* 헤더 */}
      <div style={{
        padding: '8px 16px',
        background: 'linear-gradient(180deg, #14141f 0%, #0a0a14 100%)',
        borderBottom: '1px solid #222',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10
      }}>
        <div>
          <h2 style={{
            margin: 0,
            fontSize: '1rem',
            color: '#ffd700'
          }}>
            THE MAP OF BIBLE
          </h2>
          <span style={{ fontSize: '0.55rem', color: '#666' }}>
            성경 인물 연대기 다이어그램
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.55rem', color: '#666' }}>
            Ctrl+휠: 확대/축소
          </span>
          <button
            onClick={onClose}
            style={{
              background: '#222',
              border: '1px solid #333',
              borderRadius: '50%',
              width: 28,
              height: 28,
              color: '#fff',
              cursor: 'pointer'
            }}
          >✕</button>
        </div>
      </div>

      {/* 시대 범례 바 */}
      <div style={{
        padding: '6px 16px',
        background: '#111',
        borderBottom: '1px solid #222',
        display: 'flex',
        gap: '8px',
        overflowX: 'auto'
      }}>
        <div style={{
          padding: '3px 8px',
          background: 'rgba(255,215,0,0.15)',
          borderRadius: '4px',
          fontSize: '0.55rem',
          color: '#ffd700',
          whiteSpace: 'nowrap'
        }}>✨ 영원</div>
        {sortedEras.map(era => (
          <div key={era.id} style={{
            padding: '3px 8px',
            background: `${era.color}20`,
            borderLeft: `3px solid ${era.color}`,
            fontSize: '0.55rem',
            color: era.color,
            whiteSpace: 'nowrap'
          }}>
            {lang === 'ko' ? era.name_ko : era.name_en}
          </div>
        ))}
      </div>

      {/* 메인 다이어그램 */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        style={{
          flex: 1,
          overflow: 'auto',
          position: 'relative'
        }}
      >
        <div style={{
          transform: `scale(${scale})`,
          transformOrigin: '0 0',
          minWidth: totalWidth,
          minHeight: totalHeight,
          position: 'relative'
        }}>
          {/* SVG 연결선 레이어 */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: totalWidth,
              height: totalHeight,
              pointerEvents: 'none'
            }}
          >
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* 시대 구분선 */}
            {sortedEras.map((era, i) => (
              <g key={era.id}>
                <line
                  x1={startX + i * eraWidth}
                  y1={30}
                  x2={startX + i * eraWidth}
                  y2={totalHeight - 30}
                  stroke={era.color}
                  strokeWidth="1"
                  strokeOpacity="0.15"
                  strokeDasharray="8 4"
                />
                <text
                  x={startX + i * eraWidth + eraWidth / 2}
                  y={45}
                  fill={era.color}
                  fontSize="11"
                  textAnchor="middle"
                  opacity="0.6"
                >
                  {lang === 'ko' ? era.name_ko : era.name_en}
                </text>
              </g>
            ))}

            {/* 연결선 */}
            {connections.map(conn => {
              const isHighlighted = hoveredNode === conn.source || hoveredNode === conn.target;
              return (
                <g key={conn.id}>
                  {/* 배경 글로우 */}
                  {isHighlighted && (
                    <path
                      d={createPath(conn.x1, conn.y1, conn.x2, conn.y2)}
                      stroke={conn.color}
                      strokeWidth="6"
                      fill="none"
                      opacity="0.3"
                      filter="url(#glow)"
                    />
                  )}
                  {/* 메인 라인 */}
                  <path
                    d={createPath(conn.x1, conn.y1, conn.x2, conn.y2)}
                    stroke={conn.color}
                    strokeWidth={isHighlighted ? 2.5 : 1}
                    fill="none"
                    opacity={isHighlighted ? 1 : 0.35}
                  />
                </g>
              );
            })}
          </svg>

          {/* 노드 레이어 */}
          {Object.entries(nodePositions).map(([id, pos]) => {
            // 이벤트 노드
            if (pos.event) {
              return (
                <div
                  key={id}
                  onClick={() => onEventSelect(pos.event.id)}
                  style={{
                    position: 'absolute',
                    left: pos.x - 30,
                    top: pos.y - 10,
                    padding: '4px 8px',
                    background: `${pos.color}25`,
                    border: `1px solid ${pos.color}50`,
                    borderRadius: '12px',
                    fontSize: '0.5rem',
                    color: '#fff',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    zIndex: 5
                  }}
                >
                  📌 {(lang === 'ko' ? pos.event.name_ko : pos.event.name_en).slice(0, 8)}
                </div>
              );
            }

            // 캐릭터 노드
            const char = pos.char;
            if (!char) return null;

            const isHovered = hoveredNode === char.id;
            const connectedIds = connections
              .filter(c => c.source === char.id || c.target === char.id)
              .flatMap(c => [c.source, c.target]);
            const isConnectedToHovered = hoveredNode && connectedIds.includes(hoveredNode);

            return (
              <div
                key={id}
                onClick={() => onCharacterSelect(char.id)}
                onMouseEnter={() => setHoveredNode(char.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{
                  position: 'absolute',
                  left: pos.x - nodeW / 2,
                  top: pos.y - nodeH / 2,
                  width: nodeW,
                  height: nodeH,
                  cursor: 'pointer',
                  zIndex: isHovered ? 100 : isConnectedToHovered ? 50 : 10,
                  transition: 'transform 0.15s, box-shadow 0.15s'
                }}
              >
                {/* 노드 본체 */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: pos.era === 'eternal' ? '50%' : '8px',
                  background: characterArtwork[char.id]
                    ? `url(${characterArtwork[char.id]}) center/cover`
                    : pos.era === 'eternal'
                      ? 'linear-gradient(135deg, #ffd700, #ff8c00)'
                      : `linear-gradient(135deg, ${pos.color}, ${pos.color}88)`,
                  border: isHovered
                    ? `3px solid ${pos.color}`
                    : isConnectedToHovered
                      ? `2px solid ${pos.color}`
                      : `1px solid ${pos.color}66`,
                  boxShadow: isHovered
                    ? `0 0 25px ${pos.color}80, inset 0 0 15px rgba(255,255,255,0.1)`
                    : isConnectedToHovered
                      ? `0 0 15px ${pos.color}50`
                      : '0 2px 8px rgba(0,0,0,0.5)',
                  transform: isHovered ? 'scale(1.15)' : isConnectedToHovered ? 'scale(1.05)' : 'scale(1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease'
                }}>
                  {!characterArtwork[char.id] && (
                    <span style={{
                      fontSize: pos.era === 'eternal' ? nodeW * 0.45 : '0.5rem',
                      color: '#fff',
                      textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                    }}>
                      {pos.era === 'eternal'
                        ? (char.id === 'god' ? '👑' : char.id === 'jesus' ? '✝️' : '🕊️')
                        : (lang === 'ko' ? char.name_ko : char.name_en).slice(0, 2)}
                    </span>
                  )}
                </div>

                {/* 이름 라벨 */}
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: '3px',
                  fontSize: '0.5rem',
                  color: isHovered ? '#fff' : 'rgba(255,255,255,0.7)',
                  whiteSpace: 'nowrap',
                  textShadow: '0 1px 3px rgba(0,0,0,0.9)'
                }}>
                  {lang === 'ko' ? char.name_ko : char.name_en}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 관계 범례 */}
      <div style={{
        padding: '6px 16px',
        background: '#111',
        borderTop: '1px solid #222',
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        {[
          ['parent', '부모/자녀'],
          ['spouse', '배우자'],
          ['sibling', '형제'],
          ['disciple', '제자'],
          ['ally', '동맹'],
          ['enemy', '적']
        ].map(([type, label]) => (
          <div key={type} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.5rem'
          }}>
            <div style={{
              width: 16,
              height: 2,
              background: relationColors[type],
              borderRadius: 1
            }} />
            <span style={{ color: '#888' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimelineMap;
