import React, { useState, useEffect, useRef, useMemo } from 'react';

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

  // ESC 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const nodeSize = isMobile ? 45 : 55;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#0d0d15',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* 헤더 */}
      <div style={{
        padding: '10px 16px',
        background: '#111118',
        borderBottom: '1px solid #222',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1rem', color: '#ffd700' }}>
            성경 인물 타임라인
          </h2>
          <span style={{ fontSize: '0.6rem', color: '#666' }}>
            시대별 인물 목록
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: '#222',
            border: '1px solid #333',
            borderRadius: '50%',
            width: 32,
            height: 32,
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >✕</button>
      </div>

      {/* 메인 영역 */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflowX: 'auto',
          overflowY: 'auto',
          display: 'flex',
          padding: '16px'
        }}
      >
        {/* 영원 (삼위일체) */}
        <div style={{
          minWidth: isMobile ? 100 : 130,
          marginRight: '16px',
          flexShrink: 0
        }}>
          {/* 시대 헤더 */}
          <div style={{
            padding: '8px',
            background: 'rgba(255,215,0,0.15)',
            borderRadius: '8px',
            marginBottom: '12px',
            textAlign: 'center',
            borderLeft: '3px solid #ffd700'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#ffd700', fontWeight: 600 }}>
              ✨ 영원
            </div>
          </div>

          {/* 인물 목록 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center'
          }}>
            {charactersByEra['eternal']?.map(char => (
              <div
                key={char.id}
                onClick={() => onCharacterSelect(char.id)}
                onMouseEnter={() => setHoveredNode(char.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: nodeSize,
                  height: nodeSize,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
                  border: hoveredNode === char.id ? '3px solid #ffd700' : '2px solid #ffd70066',
                  boxShadow: hoveredNode === char.id ? '0 0 15px rgba(255,215,0,0.5)' : 'none',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  {characterArtwork[char.id] ? (
                    <img
                      src={characterArtwork[char.id]}
                      alt={char.name_ko}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50%'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <span style={{
                    display: characterArtwork[char.id] ? 'none' : 'flex',
                    position: 'absolute',
                    fontSize: nodeSize * 0.4,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {char.id === 'god' ? '👑' : char.id === 'jesus' ? '✝️' : '🕊️'}
                  </span>
                </div>
                <div style={{
                  fontSize: '0.55rem',
                  color: hoveredNode === char.id ? '#ffd700' : '#aaa',
                  marginTop: '4px'
                }}>
                  {lang === 'ko' ? char.name_ko : char.name_en}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 시대별 컬럼 */}
        {sortedEras.map(era => {
          const eraChars = charactersByEra[era.id] || [];
          if (eraChars.length === 0) return null;

          return (
            <div
              key={era.id}
              style={{
                minWidth: isMobile ? 100 : 130,
                marginRight: '16px',
                flexShrink: 0
              }}
            >
              {/* 시대 헤더 */}
              <div style={{
                padding: '8px',
                background: `${era.color}20`,
                borderRadius: '8px',
                marginBottom: '12px',
                textAlign: 'center',
                borderLeft: `3px solid ${era.color}`
              }}>
                <div style={{ fontSize: '0.7rem', color: era.color, fontWeight: 600 }}>
                  {lang === 'ko' ? era.name_ko : era.name_en}
                </div>
                <div style={{ fontSize: '0.5rem', color: '#666', marginTop: '2px' }}>
                  {era.year_start < 0 ? `BC ${Math.abs(era.year_start)}` : `AD ${era.year_start}`}
                  {era.year_end && ` ~ ${era.year_end < 0 ? `BC ${Math.abs(era.year_end)}` : `AD ${era.year_end}`}`}
                </div>
              </div>

              {/* 인물 목록 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                alignItems: 'center'
              }}>
                {eraChars.map(char => (
                  <div
                    key={char.id}
                    onClick={() => onCharacterSelect(char.id)}
                    onMouseEnter={() => setHoveredNode(char.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{
                      textAlign: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      width: nodeSize,
                      height: nodeSize,
                      borderRadius: '8px',
                      background: `linear-gradient(135deg, ${era.color}, ${era.color}88)`,
                      border: hoveredNode === char.id ? `3px solid ${era.color}` : `1px solid ${era.color}66`,
                      boxShadow: hoveredNode === char.id ? `0 0 12px ${era.color}50` : 'none',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      {characterArtwork[char.id] ? (
                        <img
                          src={characterArtwork[char.id]}
                          alt={char.name_ko}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '6px'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <span style={{
                        display: characterArtwork[char.id] ? 'none' : 'flex',
                        position: 'absolute',
                        fontSize: '0.5rem',
                        color: '#fff',
                        textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%'
                      }}>
                        {(lang === 'ko' ? char.name_ko : char.name_en).slice(0, 2)}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '0.5rem',
                      color: hoveredNode === char.id ? '#fff' : '#888',
                      marginTop: '4px',
                      maxWidth: nodeSize + 20,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {lang === 'ko' ? char.name_ko : char.name_en}
                    </div>
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
        background: '#111',
        borderTop: '1px solid #222',
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        {sortedEras.slice(0, isMobile ? 5 : 10).map(era => (
          <div key={era.id} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.5rem' }}>
            <div style={{ width: 10, height: 10, borderRadius: '2px', background: era.color }} />
            <span style={{ color: '#777' }}>{lang === 'ko' ? era.name_ko : era.name_en}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimelineMap;
