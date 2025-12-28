import React, { useState, useEffect, useRef, useMemo } from 'react';

// 관계 타입별 색상
const relationshipColors = {
  'spouse': '#ff6b9d',
  'parent': '#ffd700',
  'child': '#ffd700',
  'sibling': '#00d4ff',
  'servant': '#9d4edd',
  'master': '#9d4edd',
  'enemy': '#ff4757',
  'ally': '#2ed573',
  'disciple': '#45b7d1',
  'teacher': '#45b7d1',
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
  const [hoveredEra, setHoveredEra] = useState(null);

  // 시대 정렬
  const sortedEras = useMemo(() => {
    return [...eras].sort((a, b) => a.year_start - b.year_start);
  }, [eras]);

  // 시대별 캐릭터 그룹화
  const charactersByEra = useMemo(() => {
    const grouped = { eternal: [] };
    sortedEras.forEach(era => { grouped[era.id] = []; });

    characters.forEach(char => {
      const eraId = char.era || 'eternal';
      if (grouped[eraId]) {
        grouped[eraId].push(char);
      } else {
        grouped['eternal'].push(char);
      }
    });

    return grouped;
  }, [characters, sortedEras]);

  // 시대별 이벤트 그룹화
  const eventsByEra = useMemo(() => {
    const grouped = {};
    sortedEras.forEach(era => { grouped[era.id] = []; });

    events.forEach(evt => {
      if (grouped[evt.era]) {
        grouped[evt.era].push(evt);
      }
    });

    return grouped;
  }, [events, sortedEras]);

  // ESC 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const nodeSize = isMobile ? 36 : 44;
  const columnWidth = isMobile ? 90 : 120;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(180deg, #0a0a18 0%, #12121f 50%, #0a0a18 100%)',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* 배경 그리드 패턴 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(102,126,234,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(102,126,234,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none'
      }} />

      {/* 헤더 */}
      <div style={{
        padding: '10px 16px',
        background: 'linear-gradient(180deg, rgba(18,18,31,0.98) 0%, rgba(10,10,24,0.95) 100%)',
        borderBottom: '1px solid rgba(102,126,234,0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10
      }}>
        <div>
          <h2 style={{
            margin: 0,
            fontSize: isMobile ? '0.95rem' : '1.1rem',
            background: 'linear-gradient(135deg, #ffd700, #ff6b6b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700
          }}>
            THE MAP OF BIBLE
          </h2>
          <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)' }}>
            성경 인물 연대기
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            width: 30,
            height: 30,
            color: '#fff',
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >✕</button>
      </div>

      {/* 메인 타임라인 영역 */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflowX: 'auto',
          overflowY: 'hidden',
          display: 'flex',
          padding: '16px 0'
        }}
      >
        {/* 영원 (삼위일체) 컬럼 */}
        <div style={{
          minWidth: columnWidth,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 8px',
          borderRight: '1px solid rgba(255,215,0,0.2)'
        }}>
          <div style={{
            padding: '6px 12px',
            background: 'rgba(255,215,0,0.15)',
            borderRadius: '8px',
            marginBottom: '16px',
            border: '1px solid rgba(255,215,0,0.3)'
          }}>
            <span style={{ fontSize: '0.65rem', color: '#ffd700', fontWeight: 600 }}>
              ✨ 영원
            </span>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center'
          }}>
            {charactersByEra['eternal']?.slice(0, 5).map(char => (
              <div key={char.id} style={{ textAlign: 'center' }}>
                <div
                  onClick={() => onCharacterSelect(char.id)}
                  onMouseEnter={() => setHoveredNode(char.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    width: nodeSize,
                    height: nodeSize,
                    borderRadius: '50%',
                    background: characterArtwork[char.id]
                      ? `url(${characterArtwork[char.id]}) center/cover`
                      : 'linear-gradient(135deg, #ffd700, #ff8c00)',
                    border: hoveredNode === char.id
                      ? '3px solid #ffd700'
                      : '2px solid rgba(255,215,0,0.5)',
                    boxShadow: hoveredNode === char.id
                      ? '0 0 20px rgba(255,215,0,0.6)'
                      : '0 0 10px rgba(255,215,0,0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    transform: hoveredNode === char.id ? 'scale(1.1)' : 'scale(1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto'
                  }}
                >
                  {!characterArtwork[char.id] && (
                    <span style={{ fontSize: nodeSize * 0.45 }}>
                      {char.id === 'god' ? '👑' : char.id === 'jesus' ? '✝️' : '🕊️'}
                    </span>
                  )}
                </div>
                <div style={{
                  fontSize: '0.55rem',
                  color: '#ffd700',
                  marginTop: '4px',
                  whiteSpace: 'nowrap'
                }}>
                  {lang === 'ko' ? char.name_ko : char.name_en}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 시대별 컬럼 */}
        {sortedEras.map((era, eraIndex) => {
          const eraChars = charactersByEra[era.id] || [];
          const eraEvents = eventsByEra[era.id] || [];
          const isHovered = hoveredEra === era.id;

          // 세로로 나열할 캐릭터들 (최대 12개씩 컬럼)
          const columns = [];
          const charsPerColumn = 10;
          for (let i = 0; i < eraChars.length; i += charsPerColumn) {
            columns.push(eraChars.slice(i, i + charsPerColumn));
          }
          if (columns.length === 0) columns.push([]);

          return (
            <div
              key={era.id}
              onMouseEnter={() => setHoveredEra(era.id)}
              onMouseLeave={() => setHoveredEra(null)}
              style={{
                minWidth: columnWidth * Math.max(columns.length, 1),
                display: 'flex',
                flexDirection: 'column',
                padding: '0 8px',
                borderRight: `1px solid ${era.color}30`,
                background: isHovered ? `${era.color}08` : 'transparent',
                transition: 'background 0.2s'
              }}
            >
              {/* 시대 헤더 */}
              <div style={{
                padding: '6px 10px',
                background: `${era.color}20`,
                borderRadius: '8px',
                marginBottom: '8px',
                border: `1px solid ${era.color}40`,
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '0.65rem',
                  color: era.color,
                  fontWeight: 600,
                  whiteSpace: 'nowrap'
                }}>
                  {lang === 'ko' ? era.name_ko : era.name_en}
                </div>
                <div style={{
                  fontSize: '0.5rem',
                  color: `${era.color}99`,
                  marginTop: '2px'
                }}>
                  {era.year_start < 0 ? `BC${Math.abs(era.year_start)}` : `AD${era.year_start}`}
                </div>
              </div>

              {/* 이벤트 */}
              {eraEvents.length > 0 && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '4px',
                  marginBottom: '10px',
                  justifyContent: 'center'
                }}>
                  {eraEvents.slice(0, 4).map(evt => (
                    <div
                      key={evt.id}
                      onClick={() => onEventSelect(evt.id)}
                      style={{
                        padding: '3px 6px',
                        background: `${era.color}30`,
                        border: `1px solid ${era.color}50`,
                        borderRadius: '10px',
                        fontSize: '0.5rem',
                        color: '#fff',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      📌 {(lang === 'ko' ? evt.name_ko : evt.name_en).slice(0, 6)}
                    </div>
                  ))}
                </div>
              )}

              {/* 캐릭터 컬럼들 */}
              <div style={{
                display: 'flex',
                gap: '8px',
                flex: 1,
                overflow: 'hidden'
              }}>
                {columns.map((col, colIdx) => (
                  <div
                    key={colIdx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      alignItems: 'center',
                      flex: 1
                    }}
                  >
                    {col.map(char => {
                      // 관계 연결 체크
                      const hasRelation = relationships.some(
                        r => r.source === char.id || r.target === char.id
                      );

                      return (
                        <div key={char.id} style={{ textAlign: 'center' }}>
                          <div
                            onClick={() => onCharacterSelect(char.id)}
                            onMouseEnter={() => setHoveredNode(char.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                            style={{
                              width: nodeSize - 4,
                              height: nodeSize - 4,
                              borderRadius: '6px',
                              background: characterArtwork[char.id]
                                ? `url(${characterArtwork[char.id]}) center/cover`
                                : `linear-gradient(135deg, ${era.color}, ${era.color}88)`,
                              border: hoveredNode === char.id
                                ? `2px solid ${era.color}`
                                : `1px solid ${era.color}66`,
                              boxShadow: hoveredNode === char.id
                                ? `0 0 15px ${era.color}60`
                                : hasRelation
                                  ? `0 0 8px ${era.color}40`
                                  : '0 2px 6px rgba(0,0,0,0.4)',
                              cursor: 'pointer',
                              transition: 'all 0.15s',
                              transform: hoveredNode === char.id ? 'scale(1.08)' : 'scale(1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: '0 auto'
                            }}
                          >
                            {!characterArtwork[char.id] && (
                              <span style={{
                                fontSize: '0.45rem',
                                color: '#fff',
                                textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                                textAlign: 'center',
                                lineHeight: 1.1
                              }}>
                                {(lang === 'ko' ? char.name_ko : char.name_en).slice(0, 2)}
                              </span>
                            )}
                          </div>
                          <div style={{
                            fontSize: '0.45rem',
                            color: hoveredNode === char.id ? '#fff' : 'rgba(255,255,255,0.6)',
                            marginTop: '2px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: nodeSize + 10
                          }}>
                            {lang === 'ko' ? char.name_ko : char.name_en}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 하단 범례 */}
      <div style={{
        padding: '8px 16px',
        background: 'rgba(0,0,0,0.4)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        {sortedEras.slice(0, isMobile ? 5 : 8).map(era => (
          <div
            key={era.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.5rem'
            }}
          >
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '2px',
              background: era.color
            }} />
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>
              {lang === 'ko' ? era.name_ko : era.name_en}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimelineMap;
