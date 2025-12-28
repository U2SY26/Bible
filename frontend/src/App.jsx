import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
  getHymnsByCharacter,
  getLocationsByCharacter,
  locationTypeIcons
} from './data/index.js';
import { characterArtwork, eventArtwork } from './data/artwork.js';
import artworkGenerated from './data/artwork.generated.json';
import bibleData from './data/bible.json';
import { bibleBooks as bibleBooksMeta, findBookByName } from './data/bible-books.js';
import TimelineMap from './TimelineMap.jsx';

const normalizeArtworkEntry = (entry) => {
  if (!entry) return [];
  return Array.isArray(entry) ? entry.filter(Boolean) : [entry];
};

const mergeArtworkMaps = (manual, generated) => {
  const merged = { ...(generated || {}) };
  Object.entries(manual || {}).forEach(([id, entry]) => {
    const manualList = normalizeArtworkEntry(entry);
    const existingList = normalizeArtworkEntry(merged[id]);
    const combined = [...manualList, ...existingList];
    const seen = new Set();
    const unique = [];
    combined.forEach((item) => {
      if (!item?.url || seen.has(item.url)) return;
      seen.add(item.url);
      unique.push(item);
    });
    if (unique.length) {
      merged[id] = unique;
    }
  });
  return merged;
};

const pickPrimaryArtwork = (entry) => normalizeArtworkEntry(entry)[0] || null;

const mapArtworkUrls = (artworkMap) => {
  const urls = {};
  Object.entries(artworkMap || {}).forEach(([id, entry]) => {
    const primary = pickPrimaryArtwork(entry);
    if (primary?.url) urls[id] = primary.url;
  });
  return urls;
};

const generatedCharacterArtwork = artworkGenerated.characterArtwork || {};
const generatedEventArtwork = artworkGenerated.eventArtwork || {};
const characterArtworkAll = mergeArtworkMaps(characterArtwork, generatedCharacterArtwork);
const eventArtworkAll = mergeArtworkMaps(eventArtwork, generatedEventArtwork);
const characterArtworkUrls = mapArtworkUrls(characterArtworkAll);
const eventArtworkUrls = mapArtworkUrls(eventArtworkAll);

// ==================== MBTI 데이터 (확장) ====================
const mbtiData = {
  // 삼위일체 & 영적 존재
  god: { mbti: 'INFJ', traits: ['직관적', '이상주의적', '심오한 통찰'] },
  jesus: { mbti: 'INFJ', traits: ['공감능력', '희생정신', '지혜로움'] },
  holy_spirit: { mbti: 'INFP', traits: ['인도자', '위로자', '영적 감화'] },

  // 족장 시대
  adam: { mbti: 'ISFP', traits: ['순수함', '자연친화', '호기심'] },
  eve: { mbti: 'ENFP', traits: ['호기심', '감성적', '탐구적'] },
  noah: { mbti: 'ISTJ', traits: ['순종', '인내', '신실함'] },
  abraham: { mbti: 'ISFJ', traits: ['충실함', '인내', '순종'] },
  sarah: { mbti: 'ESFJ', traits: ['현실적', '보호본능', '웃음'] },
  isaac: { mbti: 'ISFJ', traits: ['온순함', '평화추구', '중재자'] },
  rebekah: { mbti: 'ENTJ', traits: ['결단력', '전략적', '주도적'] },
  jacob: { mbti: 'ENTP', traits: ['영리함', '야망', '적응력'] },
  esau: { mbti: 'ESTP', traits: ['충동적', '야외활동', '솔직함'] },
  joseph: { mbti: 'INFJ', traits: ['꿈꾸는자', '인내', '용서'] },
  judah: { mbti: 'ESTJ', traits: ['리더십', '책임감', '변화'] },

  // 출애굽/사사 시대
  moses: { mbti: 'ISTJ', traits: ['책임감', '원칙주의', '인내심'] },
  aaron: { mbti: 'ESFJ', traits: ['대변인', '협조적', '유화적'] },
  miriam: { mbti: 'ENFJ', traits: ['리더십', '예언', '찬양'] },
  joshua: { mbti: 'ESTJ', traits: ['군사전략', '용맹', '충성'] },
  caleb: { mbti: 'ESTP', traits: ['용감함', '낙관적', '도전정신'] },
  deborah: { mbti: 'ENTJ', traits: ['지도력', '예언', '지혜'] },
  gideon: { mbti: 'ISFJ', traits: ['겸손', '신중함', '순종'] },
  samson: { mbti: 'ESTP', traits: ['힘', '충동적', '열정적'] },
  ruth: { mbti: 'ISFJ', traits: ['헌신적', '충성스러움', '겸손'] },
  naomi: { mbti: 'ISFJ', traits: ['인내', '지혜', '사랑'] },
  hannah: { mbti: 'INFP', traits: ['기도', '헌신', '믿음'] },
  samuel: { mbti: 'INFJ', traits: ['예언자', '분별력', '헌신'] },

  // 왕정 시대
  saul: { mbti: 'ESFP', traits: ['카리스마', '불안정', '질투'] },
  david: { mbti: 'ENFP', traits: ['열정적', '창의적', '감성적'] },
  jonathan: { mbti: 'ENFJ', traits: ['충성', '우정', '고결함'] },
  solomon: { mbti: 'INTP', traits: ['지혜로움', '분석적', '호기심'] },
  elijah: { mbti: 'INTJ', traits: ['비전가', '결단력', '독립적'] },
  elisha: { mbti: 'INFJ', traits: ['섬김', '기적', '인내'] },
  ahab: { mbti: 'ESFP', traits: ['우유부단', '탐욕', '유혹에 약함'] },
  jezebel: { mbti: 'ENTJ', traits: ['지배욕', '잔인함', '계략'] },
  hezekiah: { mbti: 'ISFJ', traits: ['경건', '개혁', '겸손'] },
  josiah: { mbti: 'ISTJ', traits: ['율법준수', '개혁', '신실함'] },

  // 선지자
  isaiah: { mbti: 'INFJ', traits: ['비전', '시적표현', '메시아예언'] },
  jeremiah: { mbti: 'INFP', traits: ['민감함', '눈물', '신실함'] },
  ezekiel: { mbti: 'INTJ', traits: ['환상', '상징', '경고'] },
  daniel: { mbti: 'INTJ', traits: ['지혜', '원칙주의', '신실함'] },
  hosea: { mbti: 'INFP', traits: ['사랑', '용서', '은유적'] },
  amos: { mbti: 'ISTJ', traits: ['정의', '직설적', '평민'] },
  jonah: { mbti: 'ISFP', traits: ['감정적', '내향적', '성장'] },
  micah: { mbti: 'INFJ', traits: ['정의', '겸손', '예언'] },

  // 포로기/귀환기
  esther: { mbti: 'ENFJ', traits: ['용감함', '리더십', '카리스마'] },
  mordecai: { mbti: 'ISTJ', traits: ['충성', '지혜', '인내'] },
  nehemiah: { mbti: 'ESTJ', traits: ['조직력', '리더십', '기도'] },
  ezra: { mbti: 'ISTJ', traits: ['율법학자', '교육자', '헌신'] },
  job: { mbti: 'ISTJ', traits: ['인내', '정직', '경건'] },

  // 신약 - 예수님 주변
  mary: { mbti: 'ISFP', traits: ['겸손', '순종', '묵상적'] },
  joseph_carpenter: { mbti: 'ISTJ', traits: ['의로움', '순종', '보호자'] },
  john_baptist: { mbti: 'INTJ', traits: ['선구자', '회개촉구', '고독'] },
  mary_magdalene: { mbti: 'ENFP', traits: ['열정', '헌신', '증인'] },
  lazarus: { mbti: 'ISFP', traits: ['조용함', '친구', '믿음'] },
  martha: { mbti: 'ESTJ', traits: ['실용적', '조직력', '봉사'] },
  mary_bethany: { mbti: 'INFP', traits: ['묵상', '헌신', '경배'] },

  // 12제자
  peter: { mbti: 'ESFP', traits: ['충동적', '열정적', '행동파'] },
  andrew: { mbti: 'ISFJ', traits: ['소개자', '겸손', '실용적'] },
  james: { mbti: 'ESTP', traits: ['열심', '행동파', '야망'] },
  john_apostle: { mbti: 'INFP', traits: ['사랑', '이상주의', '영적'] },
  philip: { mbti: 'INTP', traits: ['분석적', '질문', '실용적'] },
  bartholomew: { mbti: 'INFJ', traits: ['정직', '묵상', '진실'] },
  matthew: { mbti: 'ISTJ', traits: ['세심함', '기록', '헌신'] },
  thomas: { mbti: 'INTP', traits: ['의심', '탐구', '신실'] },
  james_alphaeus: { mbti: 'ISFJ', traits: ['겸손', '충성', '조용함'] },
  thaddaeus: { mbti: 'ISFP', traits: ['열심', '충성', '겸손'] },
  simon_zealot: { mbti: 'ESTP', traits: ['열심당', '열정', '행동'] },
  judas_iscariot: { mbti: 'ESTJ', traits: ['실용적', '야망', '배신'] },

  // 바울과 동역자들
  paul: { mbti: 'ENTJ', traits: ['리더십', '논리적', '목표지향적'] },
  barnabas: { mbti: 'ENFJ', traits: ['격려', '중재', '관대'] },
  silas: { mbti: 'ISFJ', traits: ['충성', '동역', '찬양'] },
  timothy: { mbti: 'INFJ', traits: ['겸손', '신실', '두려움극복'] },
  luke: { mbti: 'INTP', traits: ['기록자', '의사', '역사가'] },
  priscilla: { mbti: 'ENFJ', traits: ['가르침', '환대', '동역'] },
  aquila: { mbti: 'ISFJ', traits: ['장인정신', '환대', '신실'] },
  apollos: { mbti: 'ENTP', traits: ['웅변', '열정', '학구적'] },
  titus: { mbti: 'ESTJ', traits: ['조직력', '리더십', '신실'] },
  philemon: { mbti: 'ESFJ', traits: ['환대', '용서', '관대'] },
  onesimus: { mbti: 'ISFP', traits: ['변화', '충성', '유용'] },
  lydia: { mbti: 'ESTJ', traits: ['사업가', '환대', '리더십'] },
  stephen: { mbti: 'ENFJ', traits: ['믿음', '용기', '순교'] }
};

// MBTI 유형별 설명
const mbtiDescriptions = {
  ISTJ: '신뢰할 수 있는 청지기',
  ISFJ: '헌신적인 수호자',
  INFJ: '예언적 조언자',
  INTJ: '비전의 설계자',
  ISTP: '실용적 장인',
  ISFP: '온유한 예술가',
  INFP: '이상주의적 치유자',
  INTP: '지혜로운 분석가',
  ESTP: '행동하는 모험가',
  ESFP: '열정의 연예인',
  ENFP: '영감을 주는 옹호자',
  ENTP: '혁신적 발명가',
  ESTJ: '효율적 관리자',
  ESFJ: '돌보는 제공자',
  ENFJ: '카리스마 멘토',
  ENTJ: '대담한 지휘관'
};

// MBTI 퀴즈 질문
const mbtiQuestions = [
  { q: '사람들과 함께할 때 에너지가 충전되나요?', e: 'E', i: 'I' },
  { q: '미래의 가능성보다 현재의 사실을 중시하나요?', e: 'S', i: 'N' },
  { q: '결정할 때 감정보다 논리를 우선하나요?', e: 'T', i: 'F' },
  { q: '계획을 세우고 따르는 것을 선호하나요?', e: 'J', i: 'P' }
];

// ==================== 모바일/태블릿 감지 ====================
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => {
    // 태블릿 포함 (1024px 미만) 또는 터치 디바이스
    const isSmallScreen = window.innerWidth < 1024;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return isSmallScreen || isTouchDevice;
  });

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 1024;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isSmallScreen || isTouchDevice);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

// 실제 뷰포트 높이 (iOS Safari 주소바 대응)
const useViewportHeight = () => {
  const [vh, setVh] = useState(window.innerHeight);

  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight);
    window.addEventListener('resize', updateVh);
    window.addEventListener('orientationchange', updateVh);
    // iOS Safari에서 스크롤시에도 업데이트
    window.visualViewport?.addEventListener('resize', updateVh);
    return () => {
      window.removeEventListener('resize', updateVh);
      window.removeEventListener('orientationchange', updateVh);
      window.visualViewport?.removeEventListener('resize', updateVh);
    };
  }, []);

  return vh;
};

// ==================== 스타일 정의 ====================
const styles = {
  container: {
    width: '100%',
    maxWidth: '100vw',
    height: '100vh',
    background: '#000',
    fontFamily: "'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif",
    color: '#fff',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    boxSizing: 'border-box'
  },
  containerMobile: {
    width: '100%',
    maxWidth: '100vw',
    height: '100%',
    minHeight: '-webkit-fill-available', // iOS Safari 대응
    background: '#000',
    fontFamily: "'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif",
    color: '#fff',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed', // fixed로 변경하여 bottom sheet가 제대로 작동하도록
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    boxSizing: 'border-box'
  },
  header: {
    padding: '6px 8px',
    background: 'linear-gradient(180deg, rgba(20,20,35,0.98) 0%, rgba(15,15,30,0.95) 100%)',
    borderBottom: '1px solid rgba(100,126,234,0.3)',
    zIndex: 100,
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
  },
  headerTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '4px'
  },
  title: {
    fontSize: '0.7rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ffd700 0%, #ff6b6b 50%, #a855f7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    whiteSpace: 'nowrap',
    lineHeight: 1
  },
  filterToggle: {
    padding: '4px 6px',
    borderRadius: '12px',
    border: '1px solid rgba(102,126,234,0.5)',
    background: 'linear-gradient(135deg, rgba(102,126,234,0.3), rgba(118,75,162,0.3))',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.6rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2px',
    whiteSpace: 'nowrap',
    lineHeight: 1
  },
  filterSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
    marginTop: '8px',
    paddingTop: '8px',
    borderTop: '1px solid rgba(255,255,255,0.08)'
  },
  filterSectionDesktop: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gap: '12px',
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    alignItems: 'center'
  },
  searchInput: {
    padding: '10px 18px',
    borderRadius: '25px',
    border: '2px solid rgba(102,126,234,0.4)',
    background: 'linear-gradient(135deg, rgba(20,20,50,0.95), rgba(30,30,60,0.95))',
    color: '#fff',
    width: '160px',
    outline: 'none',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3), 0 0 15px rgba(102,126,234,0.1)'
  },
  select: {
    padding: '8px 10px',
    borderRadius: '10px',
    border: '1px solid rgba(102,126,234,0.4)',
    background: '#1a1a2e',
    color: '#fff',
    cursor: 'pointer',
    outline: 'none',
    fontSize: '0.75rem',
    width: '100%',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    // 드롭다운 옵션 스타일링
    colorScheme: 'dark'
  },
  button: {
    padding: '8px 12px',
    borderRadius: '10px',
    border: '1px solid rgba(102,126,234,0.4)',
    background: 'linear-gradient(135deg, rgba(102,126,234,0.2), rgba(118,75,162,0.2))',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.75rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box'
  },
  mainContentMobile: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box'
  },
  graphContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    background: '#000'
  },
  graphContainerMobile: {
    width: '100%',
    height: '100%',  // 전체 화면으로 확장
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    background: '#000',
    touchAction: 'none',  // 캔버스 내 터치는 직접 처리
    WebkitUserSelect: 'none',
    userSelect: 'none'
  },
  sidebar: {
    width: '38%',
    minWidth: '400px',
    maxWidth: '580px',
    background: 'linear-gradient(180deg, rgba(15,15,30,0.98) 0%, rgba(10,10,25,0.98) 100%)',
    borderLeft: '1px solid rgba(102,126,234,0.2)',
    overflowY: 'auto',
    padding: '20px',
    flexShrink: 0
  },
  characterList: {
    marginTop: '12px',
    maxHeight: '140px',
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    padding: '12px',
    background: 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1))',
    borderRadius: '12px',
    border: '1px solid rgba(102,126,234,0.2)'
  },
  characterChip: {
    padding: '6px 14px',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, rgba(74,144,217,0.25), rgba(118,75,162,0.25))',
    fontSize: '0.8rem',
    cursor: 'pointer',
    border: '1px solid rgba(102,126,234,0.35)',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  popup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(135deg, rgba(20,20,40,0.98), rgba(15,15,35,0.98))',
    borderRadius: '20px',
    padding: '24px',
    width: 'calc(100vw - 24px)',
    maxWidth: '520px',
    maxHeight: '90vh',
    overflowY: 'auto',
    zIndex: 1000,
    border: '1px solid rgba(102,126,234,0.3)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(102,126,234,0.1)',
    // 캔버스 줌과 분리
    isolation: 'isolate',
    zoom: 1,
    fontSize: '16px',
    WebkitTextSizeAdjust: '100%'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(4px)',
    zIndex: 999,
    // 캔버스 줌과 분리
    isolation: 'isolate',
    zoom: 1
  },
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '15px',
    fontSize: '0.72rem',
    marginRight: '6px',
    marginBottom: '6px',
    fontWeight: '500',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  card: {
    background: 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.08))',
    borderRadius: '14px',
    padding: '16px',
    marginBottom: '14px',
    border: '1px solid rgba(102,126,234,0.2)',
    backdropFilter: 'blur(10px)'
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.8rem',
    padding: '8px 14px',
    background: 'linear-gradient(135deg, rgba(102,126,234,0.15), rgba(118,75,162,0.15))',
    borderRadius: '20px',
    border: '1px solid rgba(102,126,234,0.25)'
  },
  slider: {
    width: '90px',
    height: '6px',
    cursor: 'pointer',
    accentColor: '#667eea',
    borderRadius: '3px'
  }
};

// ==================== 시대별 노드 색상 ====================
const eraColors = {
  eternal: { fill: '#ffd700', stroke: '#ffed4a', glow: 'rgba(255, 215, 0, 0.6)' },
  creation: { fill: '#4a5568', stroke: '#718096', glow: 'rgba(74, 85, 104, 0.5)' },
  flood: { fill: '#2b6cb0', stroke: '#4299e1', glow: 'rgba(43, 108, 176, 0.5)' },
  patriarchs: { fill: '#9f7aea', stroke: '#b794f4', glow: 'rgba(159, 122, 234, 0.5)' },
  exodus: { fill: '#dd6b20', stroke: '#ed8936', glow: 'rgba(221, 107, 32, 0.5)' },
  conquest: { fill: '#38a169', stroke: '#48bb78', glow: 'rgba(56, 161, 105, 0.5)' },
  judges: { fill: '#e53e3e', stroke: '#fc8181', glow: 'rgba(229, 62, 62, 0.5)' },
  united_kingdom: { fill: '#d69e2e', stroke: '#ecc94b', glow: 'rgba(214, 158, 46, 0.5)' },
  divided_kingdom: { fill: '#805ad5', stroke: '#9f7aea', glow: 'rgba(128, 90, 213, 0.5)' },
  exile: { fill: '#4a5568', stroke: '#718096', glow: 'rgba(74, 85, 104, 0.5)' },
  return: { fill: '#319795', stroke: '#4fd1c5', glow: 'rgba(49, 151, 149, 0.5)' },
  intertestamental: { fill: '#718096', stroke: '#a0aec0', glow: 'rgba(113, 128, 150, 0.5)' },
  new_testament: { fill: '#e056fd', stroke: '#e878fc', glow: 'rgba(224, 86, 253, 0.5)' }
};

const getNodeColor = (character, isHighlighted, isSelected) => {
  if (!isHighlighted && !isSelected) {
    return { fill: '#1a1a2e', stroke: '#2a2a4e', opacity: 0.2, glow: 'transparent', isRainbow: false };
  }

  // 주요 인물 (importance >= 8)은 레인보우 그라데이션
  const isImportant = character.importance >= 8;

  // 삼위일체 특별 색상
  const specialColors = {
    god: { fill: '#ffd700', stroke: '#ffed4a', glow: 'rgba(255, 215, 0, 0.6)', isRainbow: true },
    jesus: { fill: '#ff6b6b', stroke: '#ff8787', glow: 'rgba(255, 107, 107, 0.6)', isRainbow: true },
    holy_spirit: { fill: '#74b9ff', stroke: '#a3d5ff', glow: 'rgba(116, 185, 255, 0.6)', isRainbow: true }
  };

  if (specialColors[character.id]) {
    return { ...specialColors[character.id], opacity: 1 };
  }

  // 시대별 색상
  const era = character.era || (character.testament === 'new' ? 'new_testament' : 'patriarchs');
  const base = eraColors[era] || eraColors.patriarchs;

  return { ...base, opacity: 1, isRainbow: isImportant };
};

// ==================== 유틸리티 함수 ====================
const getConnectedCharacters = (characterId) => {
  const connected = new Set();
  relationships.forEach(rel => {
    if (rel.source === characterId) connected.add(rel.target);
    if (rel.target === characterId) connected.add(rel.source);
  });
  // 사건을 통해 연결된 인물도 추가
  events.forEach(event => {
    if (event.participants && event.participants.includes(characterId)) {
      event.participants.forEach(p => {
        if (p !== characterId) connected.add(p);
      });
    }
  });
  return Array.from(connected);
};

// 삼위일체 중앙 삼각형 + 넓게 펼쳐진 초기 배치
const TRINITY_IDS_INIT = ['god', 'jesus', 'holy_spirit'];

const initializePositions = (characters, width, height, isMobile = false) => {
  const positions = {};
  const centerX = width / 2;
  const centerY = height / 2;

  // 더 넓게 배치 (충돌 최소화)
  const baseFactor = isMobile ? 0.7 : 1;
  const nodesPerLayer = isMobile ? 8 : 12; // 레이어당 노드 수 줄임

  // 삼위일체 중앙 삼각형 배치
  const trinityRadius = 80 * baseFactor;
  const trinityAngles = [-Math.PI / 2, Math.PI / 6, Math.PI * 5 / 6];

  positions['god'] = {
    x: centerX + Math.cos(trinityAngles[0]) * trinityRadius,
    y: centerY + Math.sin(trinityAngles[0]) * trinityRadius,
    vx: 0, vy: 0
  };
  positions['jesus'] = {
    x: centerX + Math.cos(trinityAngles[1]) * trinityRadius,
    y: centerY + Math.sin(trinityAngles[1]) * trinityRadius,
    vx: 0, vy: 0
  };
  positions['holy_spirit'] = {
    x: centerX + Math.cos(trinityAngles[2]) * trinityRadius,
    y: centerY + Math.sin(trinityAngles[2]) * trinityRadius,
    vx: 0, vy: 0
  };

  // 삼위일체 제외한 나머지 인물 배치 - 더 넓게 펼침
  const otherCharacters = characters.filter(c => !TRINITY_IDS_INIT.includes(c.id));

  otherCharacters.forEach((char, index) => {
    const layer = Math.floor(index / nodesPerLayer);
    const indexInLayer = index % nodesPerLayer;
    const nodesInThisLayer = Math.min(nodesPerLayer, otherCharacters.length - layer * nodesPerLayer);
    const angle = (indexInLayer / nodesInThisLayer) * Math.PI * 2 + (layer * 0.25);
    // 시작 반지름과 레이어 간격 대폭 증가
    const baseRadius = (250 + layer * 150) * baseFactor;
    const radius = baseRadius + (Math.random() - 0.5) * 30 * baseFactor;

    positions[char.id] = {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      vx: 0,
      vy: 0
    };
  });

  return positions;
};

// MBTI 유사도 계산
const calculateMBTISimilarity = (mbti1, mbti2) => {
  if (!mbti1 || !mbti2) return 0;
  let score = 0;
  for (let i = 0; i < 4; i++) {
    if (mbti1[i] === mbti2[i]) score += 25;
  }
  return score;
};

// ==================== 성능 최적화 설정 ====================
const PERFORMANCE_CONFIG = {
  MAX_VISIBLE_NODES: 500,           // 최대 표시 노드 수 (모든 인물 표시)
  PHYSICS_SAMPLE_SIZE: 80,          // 물리 계산 샘플 크기
  ANIMATION_THROTTLE_MS: 50,        // 애니메이션 간격 (모바일)
  MOBILE_MAX_NODES: 400,            // 모바일 최대 노드 (모든 인물 표시)
  MIN_IMPORTANCE_FOR_LABEL: 3,      // 라벨 표시 최소 중요도
  PHYSICS_STABILIZE_AFTER: 3000,    // 물리 안정화 시간 (ms)
};

// ==================== 빠른 필터 카테고리 ====================
const QUICK_FILTERS = [
  { id: 'patriarch', label: '족장', keywords: ['족장', 'patriarch', '아브라함', '이삭', '야곱'] },
  { id: 'prophet', label: '선지자', keywords: ['선지자', 'prophet', '예언자'] },
  { id: 'king', label: '왕', keywords: ['왕', 'king', '다윗', '솔로몬'] },
  { id: 'apostle', label: '사도', keywords: ['사도', 'apostle', '제자'] },
  { id: 'woman', label: '여성', keywords: ['여성', '여인', 'woman', '어머니'] },
  { id: 'angel', label: '천사', keywords: ['천사', 'angel', '미가엘', '가브리엘'] },
];

// ==================== 검색 유틸리티 ====================
const RECENT_SEARCH_KEY = 'bible-graph-recent-searches';
const MAX_RECENT_SEARCHES = 5;

const getRecentSearches = () => {
  try {
    const saved = localStorage.getItem(RECENT_SEARCH_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveRecentSearch = (query) => {
  if (!query || query.length < 2) return;
  try {
    const recent = getRecentSearches().filter(s => s !== query);
    recent.unshift(query);
    localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(recent.slice(0, MAX_RECENT_SEARCHES)));
  } catch {
    // ignore
  }
};

// 다중 필드 검색 (이름, 설명, 라벨)
const multiFieldSearch = (character, query, lang) => {
  const q = query.toLowerCase();
  const name = (lang === 'ko' ? character.name_ko : character.name_en).toLowerCase();
  const desc = (lang === 'ko' ? character.description_ko : character.description_en || '').toLowerCase();
  const labels = (character.labels || []).join(' ').toLowerCase();

  // 이름 매칭 (가장 높은 우선순위)
  if (name.includes(q)) return { match: true, priority: 3 };
  // 라벨 매칭
  if (labels.includes(q)) return { match: true, priority: 2 };
  // 설명 매칭
  if (desc.includes(q)) return { match: true, priority: 1 };

  return { match: false, priority: 0 };
};


export default function App() {
  const isMobile = useIsMobile();
  const viewportHeight = useViewportHeight();
  const [lang, setLang] = useState('ko');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestament, setSelectedTestament] = useState('both');
  const [selectedBook, setSelectedBook] = useState('all');
  const [selectedEra, setSelectedEra] = useState('all');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(null);
  const [positions, setPositions] = useState({});
  const [zoom, setZoom] = useState(isMobile ? 0.8 : 0.6);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragTarget, setDragTarget] = useState(null);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [animationTime, setAnimationTime] = useState(0);
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [showTimeline, setShowTimeline] = useState(false);
  const [nodeScale, setNodeScale] = useState(1.0);
  const [showMBTI, setShowMBTI] = useState(false);
  const [userMBTI, setUserMBTI] = useState('');
  const [mbtiQuizStep, setMbtiQuizStep] = useState(0);
  const [mbtiAnswers, setMbtiAnswers] = useState(['', '', '', '']);
  const [physicsEnabled, setPhysicsEnabled] = useState(true);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [searchFocused, setSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => getRecentSearches());
  const [activeQuickFilter, setActiveQuickFilter] = useState(null);

  // Bottom Sheet 상태 (모바일 상세 패널)
  const [bottomSheetHeight, setBottomSheetHeight] = useState(0); // 0=닫힘, 40=작게, 70=중간, 90=크게
  const bottomSheetRef = useRef(null);
  const bottomSheetDragStart = useRef(null);
  const bottomSheetStartHeight = useRef(0);

  const [bibleViewer, setBibleViewer] = useState({
    show: false,
    bookId: null,
    bookName: '',
    chapter: 1,
    highlightVerse: null,
    totalChapters: 0
  });

  const svgRef = useRef(null);
  const searchInputRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pulseRef = useRef(null);
  const dragStartPos = useRef(null);
  const dragStartTime = useRef(null);

  // 펄스 애니메이션 (throttled for mobile)
  useEffect(() => {    let lastTime = 0;
    const throttleMs = isMobile ? PERFORMANCE_CONFIG.ANIMATION_THROTTLE_MS : 16;

    const animate = (currentTime) => {
      if (currentTime - lastTime >= throttleMs) {
        setAnimationTime(t => (t + 0.02) % (Math.PI * 200));
        lastTime = currentTime;
      }
      pulseRef.current = requestAnimationFrame(animate);
    };
    pulseRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(pulseRef.current);
  }, [isMobile]);

  // 뷰포트 크기 추적
  useEffect(() => {
    if (containerRef.current) {
      const updateSize = () => {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setViewportSize({ width, height });
      };
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }
  }, []);

  // 물리 시뮬레이션 자동 중지 (3초 후 안정화)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhysicsEnabled(false);
    }, PERFORMANCE_CONFIG.PHYSICS_STABILIZE_AFTER);
    return () => clearTimeout(timer);
  }, [positions]);

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

    // 빠른 필터 적용
    if (activeQuickFilter) {
      const filter = QUICK_FILTERS.find(f => f.id === activeQuickFilter);
      if (filter) {
        chars = chars.filter(c => {
          const name = (lang === 'ko' ? c.name_ko : c.name_en).toLowerCase();
          const labels = (c.labels || []).join(' ').toLowerCase();
          const desc = (lang === 'ko' ? c.description_ko : c.description_en || '').toLowerCase();
          const combined = `${name} ${labels} ${desc}`;
          return filter.keywords.some(kw => combined.includes(kw.toLowerCase()));
        });
      }
    }

    // 다중 필드 검색 적용
    if (searchQuery && searchQuery.length >= 1) {
      const results = chars
        .map(c => ({ char: c, ...multiFieldSearch(c, searchQuery, lang) }))
        .filter(r => r.match)
        .sort((a, b) => b.priority - a.priority || b.char.importance - a.char.importance);
      chars = results.map(r => r.char);
    }

    return chars;
  }, [selectedTestament, selectedBook, selectedEra, searchQuery, lang, activeQuickFilter]);

  // 자동완성 결과 (검색어가 있고 포커스 상태일 때만)
  const autocompleteResults = useMemo(() => {
    if (!searchQuery || searchQuery.length < 1 || !searchFocused) return [];
    return filteredCharacters.slice(0, 8);
  }, [searchQuery, searchFocused, filteredCharacters]);

  // 인물별 관련 사건 매핑 (highlightedIds 전에 정의)
  const characterEventsMap = useMemo(() => {
    const map = new Map();
    events.forEach(event => {
      if (event.characters) {
        event.characters.forEach(charId => {
          if (!map.has(charId)) map.set(charId, []);
          map.get(charId).push(event);
        });
      }
    });
    return map;
  }, []);

  const highlightedIds = useMemo(() => {
    // 선택된 캐릭터가 있으면: 관계+사건으로 연결된 캐릭터만 표시
    if (selectedCharacter) {
      const ids = new Set([selectedCharacter]);

      // 와이어(관계)로 연결된 캐릭터
      getConnectedCharacters(selectedCharacter).forEach(id => ids.add(id));

      // 사건으로 연결된 캐릭터
      const charEvents = characterEventsMap.get(selectedCharacter) || [];
      charEvents.forEach(event => {
        if (event.characters) {
          event.characters.forEach(id => ids.add(id));
        }
      });

      return ids;
    }

    // 사건 선택시: 해당 사건의 인물들만 표시
    if (selectedEvent) {
      const eventData = events.find(e => e.id === selectedEvent);
      if (eventData && eventData.characters) {
        return new Set(eventData.characters);
      }
    }

    // 기본: 필터된 캐릭터 전체
    return new Set(filteredCharacters.map(c => c.id));
  }, [filteredCharacters, selectedCharacter, selectedEvent, characterEventsMap]);

  // 두 인물간 공통 사건 찾기
  const getCommonEvents = useCallback((charId1, charId2) => {
    const events1 = characterEventsMap.get(charId1) || [];
    const events2Set = new Set((characterEventsMap.get(charId2) || []).map(e => e.id));
    return events1.filter(e => events2Set.has(e.id));
  }, [characterEventsMap]);

  const visibleRelationships = useMemo(() => {
    return relationships.filter(rel =>
      highlightedIds.has(rel.source) && highlightedIds.has(rel.target)
    );
  }, [highlightedIds]);

  // 뷰포트 기반 노드 필터링 (성능 최적화)
  const visibleNodes = useMemo(() => {
    const maxNodes = isMobile ? PERFORMANCE_CONFIG.MOBILE_MAX_NODES : PERFORMANCE_CONFIG.MAX_VISIBLE_NODES;

    // 선택된 인물과 연결된 노드 우선
    const priorityNodes = new Set();
    if (selectedCharacter) {
      priorityNodes.add(selectedCharacter);
      getConnectedCharacters(selectedCharacter).forEach(id => priorityNodes.add(id));
    }

    // 중요도 순으로 정렬
    const sortedChars = [...filteredCharacters].sort((a, b) => {
      const aPriority = priorityNodes.has(a.id) ? 1000 : 0;
      const bPriority = priorityNodes.has(b.id) ? 1000 : 0;
      return (bPriority + b.importance) - (aPriority + a.importance);
    });

    // 뷰포트 내 노드 필터링
    const inViewport = sortedChars.filter(char => {
      if (!positions[char.id] || !viewportSize.width) return true;
      const pos = positions[char.id];
      const screenX = pos.x * zoom + pan.x;
      const screenY = pos.y * zoom + pan.y;
      const margin = 200;
      return screenX > -margin && screenX < viewportSize.width + margin &&
             screenY > -margin && screenY < viewportSize.height + margin;
    });

    // 우선순위 노드는 항상 포함
    const priorityList = inViewport.filter(c => priorityNodes.has(c.id));
    const otherList = inViewport.filter(c => !priorityNodes.has(c.id));

    return [...priorityList, ...otherList].slice(0, maxNodes);
  }, [filteredCharacters, selectedCharacter, positions, zoom, pan, viewportSize, isMobile]);

  // 보이는 노드 ID Set
  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map(c => c.id)), [visibleNodes]);

  // 보이는 관계만 필터링
  const visibleRelationshipsFiltered = useMemo(() => {
    return visibleRelationships.filter(rel =>
      visibleNodeIds.has(rel.source) && visibleNodeIds.has(rel.target)
    );
  }, [visibleRelationships, visibleNodeIds]);

  // MBTI 매칭 결과 (삼위일체 제외: 하나님, 예수님, 성령님)
  const TRINITY_IDS = ['god', 'jesus', 'holy_spirit'];
  const mbtiMatches = useMemo(() => {
    if (!userMBTI || userMBTI.length !== 4) return [];

    return Object.entries(mbtiData)
      .filter(([id]) => !TRINITY_IDS.includes(id)) // 삼위일체 제외
      .map(([id, data]) => ({
        id,
        character: getCharacterById(id),
        mbti: data.mbti,
        traits: data.traits,
        similarity: calculateMBTISimilarity(userMBTI.toUpperCase(), data.mbti)
      }))
      .filter(m => m.character)
      .sort((a, b) => b.similarity - a.similarity);
  }, [userMBTI]);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setPositions(initializePositions(allCharacters, width, height, isMobile));
    }
  }, [isMobile]);

  // 물리 시뮬레이션 (드래그 시에만 활성화)
  const physicsFrameRef = useRef(0);
  const lastPhysicsTime = useRef(Date.now());

  useEffect(() => {
    if (Object.keys(positions).length === 0 || !physicsEnabled) return;
    // 드래그 중일 때만 물리 시뮬레이션 실행
    if (!dragTarget) return;

    let animationId;
    const simulate = () => {
      const now = Date.now();
      const deltaTime = Math.min((now - lastPhysicsTime.current) / 16, 2);
      lastPhysicsTime.current = now;
      physicsFrameRef.current++;

      setPositions(prev => {
        const newPos = { ...prev };
        const charIds = Object.keys(newPos);
        let hasMovement = false;

        // 1. 부드러운 충돌 방지 (모든 노드에 적용, 아주 약하게)
        const gridSize = 100;
        const grid = {};

        charIds.forEach(id => {
          if (!newPos[id]) return;
          const gx = Math.floor(newPos[id].x / gridSize);
          const gy = Math.floor(newPos[id].y / gridSize);
          const key = `${gx},${gy}`;
          if (!grid[key]) grid[key] = [];
          grid[key].push(id);
        });

        charIds.forEach(id1 => {
          if (!newPos[id1] || id1 === dragTarget) return;
          const gx = Math.floor(newPos[id1].x / gridSize);
          const gy = Math.floor(newPos[id1].y / gridSize);

          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              const key = `${gx + dx},${gy + dy}`;
              const cell = grid[key];
              if (!cell) continue;

              cell.forEach(id2 => {
                if (id1 >= id2 || !newPos[id2] || id2 === dragTarget) return;
                const diffX = newPos[id1].x - newPos[id2].x;
                const diffY = newPos[id1].y - newPos[id2].y;
                const dist = Math.sqrt(diffX * diffX + diffY * diffY) || 0.1;
                const minDist = 50;

                if (dist < minDist) {
                  // 아주 부드럽게 밀어내기 (느리게)
                  const overlap = minDist - dist;
                  const force = overlap * 0.015 * deltaTime; // 매우 약한 힘
                  const nx = diffX / dist;
                  const ny = diffY / dist;
                  newPos[id1].vx = (newPos[id1].vx || 0) + nx * force;
                  newPos[id1].vy = (newPos[id1].vy || 0) + ny * force;
                  newPos[id2].vx = (newPos[id2].vx || 0) - nx * force;
                  newPos[id2].vy = (newPos[id2].vy || 0) - ny * force;
                }
              });
            }
          }
        });

        // 2. 위치 업데이트 & 감쇠 (움직이는 노드만)
        charIds.forEach(id => {
          if (id === dragTarget || !newPos[id]) return;

          const vx = newPos[id].vx || 0;
          const vy = newPos[id].vy || 0;

          if (Math.abs(vx) > 0.01 || Math.abs(vy) > 0.01) {
            hasMovement = true;
            newPos[id].x += vx * deltaTime;
            newPos[id].y += vy * deltaTime;

            // 강한 감쇠 (빨리 멈춤)
            newPos[id].vx = vx * 0.92;
            newPos[id].vy = vy * 0.92;
          } else {
            // 완전히 멈춤
            newPos[id].vx = 0;
            newPos[id].vy = 0;
          }
        });

        return hasMovement ? newPos : prev;
      });

      animationId = requestAnimationFrame(simulate);
    };

    animationId = requestAnimationFrame(simulate);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [physicsEnabled, dragTarget]);

  // Neo4j 스타일 스프링 물리 시뮬레이션
  const springAnimationRef = useRef(null);

  useEffect(() => {
    // 드래그 중이거나 움직이는 노드가 있을 때 물리 시뮬레이션 실행
    if (!dragTarget) {
      // 드래그 끝난 후 관성 처리
      const hasMovingNodes = Object.values(positions).some(
        p => p && (Math.abs(p.vx || 0) > 0.5 || Math.abs(p.vy || 0) > 0.5)
      );
      if (!hasMovingNodes) {
        if (springAnimationRef.current) {
          cancelAnimationFrame(springAnimationRef.current);
          springAnimationRef.current = null;
        }
        return;
      }
    }

    const connectedIds = dragTarget ? getConnectedCharacters(dragTarget) : [];
    const connectedSet = new Set(connectedIds);

    const simulate = () => {
      setPositions(prev => {
        const newPos = {};
        Object.keys(prev).forEach(id => {
          newPos[id] = { ...prev[id] };
        });

        let hasMovement = false;

        // 1. 드래그 중이면 연결된 노드에 스프링 힘 적용
        if (dragTarget && newPos[dragTarget]) {
          const draggedNode = newPos[dragTarget];

          connectedIds.forEach(connId => {
            if (!newPos[connId]) return;
            const connNode = newPos[connId];

            const dx = draggedNode.x - connNode.x;
            const dy = draggedNode.y - connNode.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;

            // 스프링 힘: 이상적 거리(150px)에서 벗어나면 당기거나 밀기
            const idealDist = 150;
            const springK = 0.08; // 스프링 강도
            const force = (dist - idealDist) * springK;

            // 힘을 속도에 적용
            const ax = (dx / dist) * force;
            const ay = (dy / dist) * force;

            newPos[connId].vx = (newPos[connId].vx || 0) + ax;
            newPos[connId].vy = (newPos[connId].vy || 0) + ay;
          });
        }

        // 2. 부드러운 충돌 방지
        const gridSize = 80;
        const grid = {};

        Object.keys(newPos).forEach(id => {
          if (!newPos[id]) return;
          const gx = Math.floor(newPos[id].x / gridSize);
          const gy = Math.floor(newPos[id].y / gridSize);
          const key = `${gx},${gy}`;
          if (!grid[key]) grid[key] = [];
          grid[key].push(id);
        });

        Object.keys(newPos).forEach(id1 => {
          if (!newPos[id1] || id1 === dragTarget) return;
          const gx = Math.floor(newPos[id1].x / gridSize);
          const gy = Math.floor(newPos[id1].y / gridSize);

          for (let ddx = -1; ddx <= 1; ddx++) {
            for (let ddy = -1; ddy <= 1; ddy++) {
              const key = `${gx + ddx},${gy + ddy}`;
              const cell = grid[key];
              if (!cell) continue;

              cell.forEach(id2 => {
                if (id1 >= id2 || !newPos[id2] || id2 === dragTarget) return;
                const diffX = newPos[id1].x - newPos[id2].x;
                const diffY = newPos[id1].y - newPos[id2].y;
                const dist = Math.sqrt(diffX * diffX + diffY * diffY) || 0.1;
                const minDist = 45;

                if (dist < minDist) {
                  const overlap = minDist - dist;
                  const force = overlap * 0.03;
                  const nx = diffX / dist;
                  const ny = diffY / dist;
                  newPos[id1].vx = (newPos[id1].vx || 0) + nx * force;
                  newPos[id1].vy = (newPos[id1].vy || 0) + ny * force;
                  newPos[id2].vx = (newPos[id2].vx || 0) - nx * force;
                  newPos[id2].vy = (newPos[id2].vy || 0) - ny * force;
                }
              });
            }
          }
        });

        // 3. 속도 적용 및 감쇠
        Object.keys(newPos).forEach(id => {
          if (id === dragTarget) return; // 드래그 중인 노드는 건드리지 않음
          const node = newPos[id];
          if (!node) return;

          let vx = node.vx || 0;
          let vy = node.vy || 0;

          // 속도 제한
          const maxSpeed = 15;
          const speed = Math.sqrt(vx * vx + vy * vy);
          if (speed > maxSpeed) {
            vx = (vx / speed) * maxSpeed;
            vy = (vy / speed) * maxSpeed;
          }

          if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1) {
            hasMovement = true;
            newPos[id] = {
              ...node,
              x: node.x + vx,
              y: node.y + vy,
              vx: vx * 0.85, // 감쇠 (마찰)
              vy: vy * 0.85
            };
          } else {
            newPos[id] = { ...node, vx: 0, vy: 0 };
          }
        });

        // 드래그 중이면 계속 실행, 아니면 움직임 있을 때만
        if (dragTarget || hasMovement) {
          springAnimationRef.current = requestAnimationFrame(simulate);
        } else {
          springAnimationRef.current = null;
        }

        return newPos;
      });
    };

    springAnimationRef.current = requestAnimationFrame(simulate);

    return () => {
      if (springAnimationRef.current) {
        cancelAnimationFrame(springAnimationRef.current);
        springAnimationRef.current = null;
      }
    };
  }, [dragTarget]);

  // 핀치 줌 상태
  const lastTouchDistance = useRef(null);

  // 드래그 대상을 ref로도 추적 (이벤트 타이밍 문제 해결)
  const dragTargetRef = useRef(null);

  const handlePointerDown = useCallback((e, characterId = null) => {
    // 두 손가락 터치는 핀치 줌으로 처리
    if (e.touches && e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDistance.current = Math.sqrt(dx * dx + dy * dy);
      return;
    }

    if (e.touches && e.touches.length > 1) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (characterId) {
      e.preventDefault();
      e.stopPropagation();
      setDragTarget(characterId);
      dragTargetRef.current = characterId; // ref에도 저장
      dragStartPos.current = { x: clientX, y: clientY };
      dragStartTime.current = Date.now();
    } else {
      setIsDragging(true);
    }
    setLastMouse({ x: clientX, y: clientY });
  }, []);

  const handlePointerMove = useCallback((e) => {
    // 핀치 줌 처리
    if (e.touches && e.touches.length === 2 && lastTouchDistance.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDist = Math.sqrt(dx * dx + dy * dy);
      const scale = newDist / lastTouchDistance.current;

      setZoom(prev => Math.max(0.2, Math.min(3, prev * scale)));
      lastTouchDistance.current = newDist;
      return;
    }

    if (e.touches && e.touches.length > 1) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - lastMouse.x;
    const dy = clientY - lastMouse.y;

    if (dragTarget) {
      const currentZoom = zoom;

      // Neo4j 스타일: 드래그된 노드만 직접 이동
      setPositions(prev => {
        if (!prev[dragTarget]) return prev;

        const newPos = { ...prev };
        const moveDx = dx / currentZoom;
        const moveDy = dy / currentZoom;

        // 드래그 대상 노드만 이동 (연결 노드는 물리 루프에서 처리)
        newPos[dragTarget] = {
          ...prev[dragTarget],
          x: prev[dragTarget].x + moveDx,
          y: prev[dragTarget].y + moveDy,
          vx: 0,
          vy: 0
        };

        return newPos;
      });
    } else if (isDragging) {
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    }

    setLastMouse({ x: clientX, y: clientY });
  }, [dragTarget, isDragging, lastMouse, zoom]);

  const handlePointerUp = useCallback((e) => {
    // 핀치 줌 종료
    lastTouchDistance.current = null;

    // ref를 사용해서 드래그 대상 확인 (상태 업데이트 타이밍 문제 해결)
    const currentDragTarget = dragTargetRef.current;

    if (currentDragTarget && dragStartPos.current && dragStartTime.current) {
      const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
      const totalMove = Math.abs(clientX - dragStartPos.current.x) + Math.abs(clientY - dragStartPos.current.y);
      const duration = Date.now() - dragStartTime.current;

      // 클릭으로 판정 (이동량 적고 시간 짧음)
      if (totalMove < 15 && duration < 400) {
        // 토글: 같은 인물 클릭시 선택 해제
        if (selectedCharacter === currentDragTarget) {
          setSelectedCharacter(null);
        } else {
          setSelectedCharacter(currentDragTarget);
        }
      }
    } else if (isDragging) {
      // 빈 공간 클릭시 선택 해제
      const clientX = e.changedTouches ? e.changedTouches[0]?.clientX : e.clientX;
      const clientY = e.changedTouches ? e.changedTouches[0]?.clientY : e.clientY;
      if (clientX !== undefined && clientY !== undefined && lastMouse) {
        const totalMove = Math.abs(clientX - lastMouse.x) + Math.abs(clientY - lastMouse.y);
        if (totalMove < 10) {
          // 팝업이 없고 드래그가 아닌 클릭이면 선택 해제
          if (!showPopup) {
            setSelectedCharacter(null);
            setSelectedEvent(null);
          }
        }
      }
    }

    setDragTarget(null);
    dragTargetRef.current = null; // ref도 초기화
    setIsDragging(false);
    dragStartPos.current = null;
    dragStartTime.current = null;
  }, [isDragging, selectedCharacter, lastMouse, showPopup]);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.1, Math.min(5, prev * delta)));
  }, []);

  const handleCharacterClick = useCallback((characterId) => {
    // 토글: 같은 인물 클릭시 선택 해제
    if (selectedCharacter === characterId) {
      setSelectedCharacter(null);
    } else {
      setSelectedCharacter(characterId);
    }
    // 모바일에서는 하단 패널이 자동으로 표시됨
  }, [selectedCharacter]);

  const handleEventClick = useCallback((eventId) => {
    setSelectedEvent(eventId);
    setShowPopup('event');

    // 사건의 인물들 화면에 맞추기 (fitToNodes 직접 구현)
    setTimeout(() => {
      const eventData = events.find(e => e.id === eventId);
      if (eventData && eventData.characters && eventData.characters.length > 0 && containerRef.current) {
        const nodeIds = eventData.characters;
        const validPositions = nodeIds
          .map(id => positions[id])
          .filter(pos => pos);

        if (validPositions.length === 0) return;

        const xs = validPositions.map(p => p.x);
        const ys = validPositions.map(p => p.y);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);

        const bbox = {
          width: maxX - minX + 100,
          height: maxY - minY + 100,
          centerX: (minX + maxX) / 2,
          centerY: (minY + maxY) / 2
        };

        const { width: viewWidth, height: viewHeight } = containerRef.current.getBoundingClientRect();
        const scaleX = viewWidth / bbox.width;
        const scaleY = viewHeight / bbox.height;
        const newZoom = Math.min(Math.max(Math.min(scaleX, scaleY) * 0.8, 0.3), 2);

        const newPanX = viewWidth / 2 - bbox.centerX * newZoom;
        const newPanY = viewHeight / 2 - bbox.centerY * newZoom;

        setZoom(newZoom);
        setPan({ x: newPanX, y: newPanY });
      }
    }, 100);
  }, [positions]);

  // ESC 키로 선택 해제 (PC)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showPopup) {
          setShowPopup(null);
        } else if (bottomSheetHeight > 0) {
          setBottomSheetHeight(0);
        } else if (selectedCharacter) {
          setSelectedCharacter(null);
        } else if (selectedEvent) {
          setSelectedEvent(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPopup, selectedCharacter, selectedEvent, bottomSheetHeight]);

  // 모바일에서 인물 선택시 Bottom Sheet 자동 열기
  useEffect(() => {
    if (isMobile && selectedCharacter) {
      setBottomSheetHeight(40); // 기본 40% 높이로 열기
    } else if (isMobile && !selectedCharacter) {
      setBottomSheetHeight(0); // 선택 해제시 닫기
    }
  }, [isMobile, selectedCharacter]);

  // Bottom Sheet 터치/마우스 핸들러
  const bottomSheetDragging = useRef(false);

  const handleBottomSheetDragStart = useCallback((clientY) => {
    bottomSheetDragStart.current = clientY;
    bottomSheetStartHeight.current = bottomSheetHeight;
    bottomSheetDragging.current = true;
  }, [bottomSheetHeight]);

  const handleBottomSheetDragMove = useCallback((clientY) => {
    if (!bottomSheetDragStart.current || !bottomSheetDragging.current) return;

    const deltaY = bottomSheetDragStart.current - clientY;
    const windowHeight = viewportHeight;
    const deltaPercent = (deltaY / windowHeight) * 100;

    const newHeight = Math.max(0, Math.min(90, bottomSheetStartHeight.current + deltaPercent));
    setBottomSheetHeight(newHeight);
  }, [viewportHeight]);

  const handleBottomSheetDragEnd = useCallback(() => {
    if (!bottomSheetDragStart.current || !bottomSheetDragging.current) return;

    // 스냅 포인트로 이동 (0, 40, 70, 90)
    const snapPoints = [0, 40, 70, 90];
    let closestSnap = snapPoints[0];
    let minDist = Math.abs(bottomSheetHeight - closestSnap);

    snapPoints.forEach(snap => {
      const dist = Math.abs(bottomSheetHeight - snap);
      if (dist < minDist) {
        minDist = dist;
        closestSnap = snap;
      }
    });

    // 빠르게 아래로 스와이프하면 닫기
    if (bottomSheetHeight < 20) {
      closestSnap = 0;
      setSelectedCharacter(null);
    }

    setBottomSheetHeight(closestSnap);
    bottomSheetDragStart.current = null;
    bottomSheetDragging.current = false;
  }, [bottomSheetHeight]);

  // 터치 이벤트 핸들러
  const handleBottomSheetTouchStart = useCallback((e) => {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    handleBottomSheetDragStart(e.touches[0].clientY);
  }, [handleBottomSheetDragStart]);

  const handleBottomSheetTouchMove = useCallback((e) => {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    handleBottomSheetDragMove(e.touches[0].clientY);
  }, [handleBottomSheetDragMove]);

  const handleBottomSheetTouchEnd = useCallback((e) => {
    e.preventDefault();
    handleBottomSheetDragEnd();
  }, [handleBottomSheetDragEnd]);

  // 마우스 이벤트 핸들러 (태블릿 + 마우스 사용시)
  const handleBottomSheetMouseDown = useCallback((e) => {
    e.preventDefault();
    handleBottomSheetDragStart(e.clientY);

    const handleMouseMove = (moveE) => {
      handleBottomSheetDragMove(moveE.clientY);
    };
    const handleMouseUp = () => {
      handleBottomSheetDragEnd();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [handleBottomSheetDragStart, handleBottomSheetDragMove, handleBottomSheetDragEnd]);


  // Bottom Sheet 닫기
  const handleBottomSheetClose = useCallback(() => {
    setBottomSheetHeight(0);
    setSelectedCharacter(null);
  }, []);

  // MBTI 퀴즈 처리
  const handleMBTIQuizAnswer = (answer) => {
    const newAnswers = [...mbtiAnswers];
    newAnswers[mbtiQuizStep] = answer;
    setMbtiAnswers(newAnswers);

    if (mbtiQuizStep < 3) {
      setMbtiQuizStep(mbtiQuizStep + 1);
    } else {
      const mbti = newAnswers.join('');
      setUserMBTI(mbti);
      setMbtiQuizStep(0);
    }
  };

  const selectedCharacterData = selectedCharacter ? getCharacterById(selectedCharacter) : null;
  const selectedEventData = selectedEvent ? events.find(e => e.id === selectedEvent) : null;

  const relatedHymns = selectedCharacter ? getHymnsByCharacter(selectedCharacter) : [];
  const relatedEvents = selectedCharacter ? getEventsByCharacter(selectedCharacter) : [];
  const relatedRelationships = selectedCharacter ? getRelationshipsByCharacter(selectedCharacter) : [];
  const relatedLocations = selectedCharacter ? getLocationsByCharacter(selectedCharacter) : [];

  const handleReset = () => {
    setSelectedCharacter(null);
    setSelectedBook('all');
    setSelectedEra('all');
    setSelectedTestament('both');
    setSearchQuery('');
    setActiveQuickFilter(null);
    setZoom(isMobile ? 0.8 : 0.6);
    setPan({ x: 0, y: 0 });
  };

  // 화면에 노드들 맞추기 함수
  const fitToNodes = useCallback((nodeIds) => {
    if (!nodeIds || nodeIds.length === 0 || !containerRef.current) return;

    const validPositions = nodeIds
      .map(id => positions[id])
      .filter(pos => pos);

    if (validPositions.length === 0) return;

    // 바운딩 박스 계산
    const xs = validPositions.map(p => p.x);
    const ys = validPositions.map(p => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const bbox = {
      width: maxX - minX + 100,  // 여유 공간
      height: maxY - minY + 100,
      centerX: (minX + maxX) / 2,
      centerY: (minY + maxY) / 2
    };

    const { width: viewWidth, height: viewHeight } = containerRef.current.getBoundingClientRect();

    // 줌 계산 (여유있게)
    const scaleX = viewWidth / bbox.width;
    const scaleY = viewHeight / bbox.height;
    const newZoom = Math.min(Math.max(Math.min(scaleX, scaleY) * 0.8, 0.3), 2);

    // 중심점 이동
    const newPanX = viewWidth / 2 - bbox.centerX * newZoom;
    const newPanY = viewHeight / 2 - bbox.centerY * newZoom;

    setZoom(newZoom);
    setPan({ x: newPanX, y: newPanY });
  }, [positions]);

  // 검색 제출 핸들러 (필터 접고 화면 맞춤)
  const handleSearchSubmit = (query) => {
    if (query && query.length >= 2) {
      saveRecentSearch(query);
      setRecentSearches(getRecentSearches());
    }
    setSearchFocused(false);
    setShowFilters(false);  // 필터 접기

    // 검색 결과에 맞게 화면 조정 (약간 지연)
    setTimeout(() => {
      const nodeIds = filteredCharacters.map(c => c.id);
      if (nodeIds.length > 0 && nodeIds.length <= 50) {
        fitToNodes(nodeIds);
      }
    }, 100);
  };

  // 자동완성 항목 선택 (필터 접고 해당 노드로 이동)
  const handleAutocompleteSelect = (charId) => {
    setSelectedCharacter(charId);
    setSearchFocused(false);
    setShowFilters(false);  // 필터 접기

    // 선택된 노드와 연결된 노드들 화면에 맞추기
    setTimeout(() => {
      const connectedIds = [charId, ...getConnectedCharacters(charId)];
      fitToNodes(connectedIds);
    }, 100);
    // 모바일에서는 하단 패널이 자동으로 표시됨 (팝업 사용 안 함)
  };

  // 성경 구절 클릭 핸들러 - 해당 장 전체를 뷰어로 표시
  const handleVerseClick = useCallback((verseRef) => {
    // 구절 참조 파싱 (예: "창세기 1:1", "요한복음 3:16-17")
    const match = verseRef.match(/^(.+?)\s+(\d+):(\d+)(?:-\d+)?$/);
    if (!match) {
      console.warn('Invalid verse reference:', verseRef);
      return;
    }

    const [, bookName, chapter, verse] = match;

    // 책 찾기 (한국어 이름으로)
    const book = bibleData.books.find(b => b.name === bookName);
    if (!book) {
      console.warn('Book not found:', bookName);
      return;
    }

    setBibleViewer({
      show: true,
      bookId: book.id,
      bookName: book.name,
      chapter: parseInt(chapter),
      highlightVerse: parseInt(verse),
      totalChapters: book.chapters.length
    });
  }, []);

  const getNodeSize = (character) => {
    // 중요도에 따른 크기 차이를 더 크게 (importance 1: 8, importance 10: 30)
    const baseSize = character.importance >= 8
      ? character.importance * 2.5 + 5  // 중요 인물은 더 크게
      : character.importance * 1.5 + 6;
    return baseSize * nodeScale;
  };

  const isFiltering = selectedTestament !== 'both' || selectedBook !== 'all' || selectedEra !== 'all' || searchQuery || activeQuickFilter;

  // 모바일 레이아웃: 필터 접히면 분할 뷰
  const mobileContentStyle = isMobile && !showFilters ? {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  } : {};

  return (
    <div style={isMobile ? styles.containerMobile : styles.container}>
      {/* 헤더 */}
      <header style={styles.header}>
        <div style={styles.headerTop}>
          <h1 style={styles.title}>성경 인물 관계도</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <button
              style={{
                ...styles.filterToggle,
                background: showTimeline
                  ? 'linear-gradient(135deg, rgba(56,178,172,0.5), rgba(49,151,149,0.5))'
                  : 'linear-gradient(135deg, rgba(56,178,172,0.3), rgba(49,151,149,0.3))',
                borderColor: 'rgba(56,178,172,0.5)'
              }}
              onClick={() => setShowTimeline(!showTimeline)}
            >📅 타임라인</button>
            <button
              style={{
                ...styles.filterToggle,
                background: 'linear-gradient(135deg, rgba(255,215,0,0.3), rgba(255,140,0,0.3))',
                borderColor: 'rgba(255,215,0,0.5)'
              }}
              onClick={() => setBibleViewer({
                show: true,
                bookId: 'gen',
                bookName: '창세기',
                chapter: 1,
                highlightVerse: null,
                totalChapters: 50
              })}
            >📖 성경</button>
            <button
              style={{
                ...styles.filterToggle,
                background: showFilters
                  ? 'linear-gradient(135deg, rgba(102,126,234,0.5), rgba(118,75,162,0.5))'
                  : styles.filterToggle.background
              }}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? '접기' : '필터'}
            </button>
          </div>
        </div>

        {showFilters && (
          <div style={isMobile ? styles.filterSection : styles.filterSectionDesktop}>
            {/* 검색 입력 + 자동완성 드롭다운 */}
            <div style={{ position: 'relative' }}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder={isMobile ? "검색..." : "인물 검색... (이름/라벨/설명)"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit(searchQuery);
                  } else if (e.key === 'Escape') {
                    setSearchFocused(false);
                  }
                }}
                style={{
                  ...styles.searchInput,
                  width: '100%'
                }}
              />

              {/* 자동완성 드롭다운 */}
              {searchFocused && (autocompleteResults.length > 0 || recentSearches.length > 0) && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: '4px',
                  background: 'linear-gradient(135deg, rgba(20,20,50,0.98), rgba(30,30,60,0.98))',
                  borderRadius: '12px',
                  border: '1px solid rgba(102,126,234,0.4)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  zIndex: 200,
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}>
                  {/* 최근 검색 */}
                  {!searchQuery && recentSearches.length > 0 && (
                    <div style={{ padding: '8px' }}>
                      <div style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '6px', paddingLeft: '8px' }}>
                        최근 검색
                      </div>
                      {recentSearches.map((recent, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.target.style.background = 'rgba(102,126,234,0.2)'}
                          onMouseLeave={(e) => e.target.style.background = 'transparent'}
                          onClick={() => {
                            setSearchQuery(recent);
                            handleSearchSubmit(recent);
                          }}
                        >
                          <span style={{ opacity: 0.5 }}>🕐</span>
                          {recent}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 자동완성 결과 */}
                  {autocompleteResults.length > 0 && (
                    <div style={{ padding: '8px' }}>
                      {searchQuery && (
                        <div style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '6px', paddingLeft: '8px' }}>
                          검색 결과
                        </div>
                      )}
                      {autocompleteResults.map((char) => (
                        <div
                          key={char.id}
                          style={{
                            padding: '10px 12px',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.target.style.background = 'rgba(102,126,234,0.2)'}
                          onMouseLeave={(e) => e.target.style.background = 'transparent'}
                          onClick={() => handleAutocompleteSelect(char.id)}
                        >
                          <span style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: char.testament === 'old' ? 'rgba(74,144,217,0.4)' : 'rgba(224,86,253,0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            flexShrink: 0
                          }}>
                            {char.testament === 'old' ? '구' : '신'}
                          </span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: '500' }}>
                              {lang === 'ko' ? char.name_ko : char.name_en}
                            </div>
                            {char.labels && char.labels[0] && (
                              <div style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '2px' }}>
                                {char.labels[0]}
                              </div>
                            )}
                          </div>
                          <span style={{ opacity: 0.4, fontSize: '0.75rem' }}>
                            ★{char.importance}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <select value={selectedTestament} onChange={(e) => setSelectedTestament(e.target.value)} style={styles.select}>
              <option value="both">전체</option>
              <option value="old">구약</option>
              <option value="new">신약</option>
            </select>

            <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)} style={styles.select}>
              <option value="all">전체 성경</option>
              <optgroup label="구약">
                {bibleBooks.old.map(book => (
                  <option key={book.id} value={book.id}>{book.name_ko}</option>
                ))}
              </optgroup>
              <optgroup label="신약">
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

            {/* 두 번째 행: 크기, MBTI, 언어, 초기화 */}
            {!isMobile && (
              <div style={{
                gridColumn: 'span 4',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                gap: '12px',
                alignItems: 'center'
              }}>
                <div style={styles.sliderContainer}>
                  <span>크기</span>
                  <input
                    type="range"
                    min="0.4"
                    max="2.5"
                    step="0.1"
                    value={nodeScale}
                    onChange={(e) => setNodeScale(parseFloat(e.target.value))}
                    style={styles.slider}
                  />
                  <span style={{ minWidth: '35px' }}>{Math.round(nodeScale * 100)}%</span>
                </div>

                <button
                  style={{
                    ...styles.button,
                    width: '100%',
                    background: showMBTI
                      ? 'linear-gradient(135deg, rgba(255,215,0,0.4), rgba(255,107,107,0.4))'
                      : styles.button.background,
                    border: showMBTI ? '2px solid rgba(255,215,0,0.5)' : styles.button.border
                  }}
                  onClick={() => setShowMBTI(!showMBTI)}
                >
                  🧠 MBTI
                </button>

                <button
                  style={{
                    ...styles.button,
                    width: '100%',
                    background: lang === 'en' ? 'linear-gradient(135deg, rgba(102,126,234,0.4), rgba(118,75,162,0.4))' : styles.button.background
                  }}
                  onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
                >
                  {lang === 'ko' ? 'EN' : 'KO'}
                </button>

                <button style={{ ...styles.button, width: '100%' }} onClick={handleReset}>초기화</button>
              </div>
            )}

            {/* 모바일용 버튼들 */}
            {isMobile && (
              <>
                <button
                  style={{
                    ...styles.button,
                    background: lang === 'en' ? 'linear-gradient(135deg, rgba(102,126,234,0.4), rgba(118,75,162,0.4))' : styles.button.background
                  }}
                  onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
                >
                  {lang === 'ko' ? 'EN' : 'KO'}
                </button>
                <button style={styles.button} onClick={handleReset}>초기화</button>
              </>
            )}
          </div>
        )}

        {/* 빠른 필터 - 한 줄에 모두 보이도록 작게 */}
        {showFilters && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: '1px solid rgba(255,255,255,0.05)'
          }}>
            <span style={{ fontSize: '0.65rem', opacity: 0.5, marginRight: '2px' }}>필터</span>
            {QUICK_FILTERS.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveQuickFilter(activeQuickFilter === filter.id ? null : filter.id)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: activeQuickFilter === filter.id
                    ? '2px solid rgba(255,215,0,0.8)'
                    : '1px solid rgba(102,126,234,0.4)',
                  background: activeQuickFilter === filter.id
                    ? 'linear-gradient(135deg, rgba(255,215,0,0.3), rgba(255,107,107,0.3))'
                    : 'linear-gradient(135deg, rgba(102,126,234,0.2), rgba(118,75,162,0.2))',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: activeQuickFilter === filter.id ? '600' : '500',
                  transition: 'all 0.2s ease',
                  boxShadow: activeQuickFilter === filter.id
                    ? '0 0 10px rgba(255,215,0,0.6), 0 0 20px rgba(255,215,0,0.3)'
                    : '0 2px 8px rgba(0,0,0,0.2)'
                }}
              >
                {filter.label}
              </button>
            ))}
            {activeQuickFilter && (
              <span style={{ fontSize: '0.6rem', opacity: 0.5, marginLeft: '4px' }}>
                ({filteredCharacters.length})
              </span>
            )}
          </div>
        )}

        {/* 사건 타임라인 - 빠른필터 아래, 여러 줄 + 스크롤 */}
        {showFilters && (
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '6px',
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            flexWrap: 'wrap',
            maxHeight: isMobile ? '160px' : '140px',
            overflowY: 'auto',
            scrollbarWidth: 'thin'
          }}>
            <span style={{ fontSize: '0.65rem', opacity: 0.5, marginRight: '2px', flexShrink: 0 }}>사건</span>
            {eventsByChronology.map(event => (
              <div
                key={event.id}
                style={{
                  padding: '8px 12px',
                  background: selectedEvent === event.id
                    ? 'linear-gradient(135deg, rgba(255,215,0,0.4), rgba(255,107,107,0.4))'
                    : 'linear-gradient(135deg, rgba(102,126,234,0.2), rgba(118,75,162,0.2))',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  whiteSpace: 'nowrap',
                  border: selectedEvent === event.id
                    ? '2px solid rgba(255,215,0,0.8)'
                    : '1px solid rgba(102,126,234,0.4)',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedEvent === event.id
                    ? '0 0 10px rgba(255,215,0,0.6), 0 0 20px rgba(255,215,0,0.3)'
                    : '0 2px 8px rgba(0,0,0,0.2)'
                }}
                onClick={() => {
                  // 토글: 같은 사건 클릭시 선택 해제
                  if (selectedEvent === event.id) {
                    setSelectedEvent(null);
                    setShowPopup(null);
                  } else {
                    handleEventClick(event.id);
                  }
                }}
              >
                {event.icon} {lang === 'ko' ? event.name_ko : event.name_en}
              </div>
            ))}
          </div>
        )}

        {/* MBTI 섹션 */}
        {showMBTI && showFilters && !isMobile && (
          <div style={{
            marginTop: '12px',
            padding: '16px',
            background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,107,107,0.1))',
            borderRadius: '14px',
            border: '1px solid rgba(255,215,0,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.9rem' }}>나의 MBTI:</span>
              <input
                type="text"
                value={userMBTI}
                onChange={(e) => setUserMBTI(e.target.value.toUpperCase().slice(0, 4))}
                placeholder="예: INFJ"
                maxLength={4}
                style={{
                  ...styles.searchInput,
                  width: '80px',
                  textAlign: 'center',
                  textTransform: 'uppercase'
                }}
              />
              <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>또는</span>
              <button
                style={{ ...styles.button, fontSize: '0.8rem', padding: '8px 12px' }}
                onClick={() => { setMbtiQuizStep(0); setMbtiAnswers(['','','','']); setShowPopup('mbtiQuiz'); }}
              >
                간단 테스트
              </button>
            </div>

            {mbtiMatches.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {mbtiMatches.slice(0, 5).map(match => (
                  <div
                    key={match.id}
                    onClick={() => handleCharacterClick(match.id)}
                    style={{
                      padding: '8px 14px',
                      background: `linear-gradient(135deg, rgba(255,215,0,${match.similarity/200}), rgba(255,107,107,${match.similarity/200}))`,
                      borderRadius: '20px',
                      cursor: 'pointer',
                      border: '1px solid rgba(255,215,0,0.4)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <span style={{ fontWeight: '600' }}>{lang === 'ko' ? match.character.name_ko : match.character.name_en}</span>
                    <span style={{ opacity: 0.8, marginLeft: '6px' }}>({match.mbti} · {match.similarity}%)</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {isFiltering && showFilters && (
          <div style={styles.characterList}>
            {filteredCharacters.slice(0, 40).map(char => (
              <span
                key={char.id}
                style={{
                  ...styles.characterChip,
                  background: selectedCharacter === char.id
                    ? 'linear-gradient(135deg, rgba(102,126,234,0.6), rgba(118,75,162,0.6))'
                    : styles.characterChip.background,
                  borderColor: selectedCharacter === char.id ? '#667eea' : 'rgba(102,126,234,0.35)',
                  transform: selectedCharacter === char.id ? 'scale(1.05)' : 'scale(1)'
                }}
                onClick={() => handleCharacterClick(char.id)}
              >
                {lang === 'ko' ? char.name_ko : char.name_en}
              </span>
            ))}
            {filteredCharacters.length > 40 && (
              <span style={{ ...styles.characterChip, opacity: 0.6, cursor: 'default' }}>
                +{filteredCharacters.length - 40}명
              </span>
            )}
          </div>
        )}
      </header>

      {/* 메인 콘텐츠 */}
      <div style={isMobile ? styles.mainContentMobile : styles.mainContent}>
        {/* 그래프 영역 */}
        <div
          ref={containerRef}
          style={isMobile ? styles.graphContainerMobile : styles.graphContainer}
          onMouseDown={(e) => handlePointerDown(e)}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={(e) => {
            e.preventDefault(); // 캔버스 내에서는 기본 동작 방지
            handlePointerDown(e);
          }}
          onTouchMove={(e) => {
            e.preventDefault(); // 캔버스 내에서는 스크롤 방지
            handlePointerMove(e);
          }}
          onTouchEnd={handlePointerUp}
          onWheel={handleWheel}
        >
          <svg ref={svgRef} width="100%" height="100%" style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}>
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* 레인보우 그라데이션 */}
              <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="25%" stopColor="#ffd700" />
                <stop offset="50%" stopColor="#4ecdc4" />
                <stop offset="75%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>

              {/* 애니메이션된 레인보우 */}
              <linearGradient id="rainbowAnimated" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={`hsl(${(animationTime * 30) % 360}, 80%, 60%)`} />
                <stop offset="50%" stopColor={`hsl(${(animationTime * 30 + 120) % 360}, 80%, 60%)`} />
                <stop offset="100%" stopColor={`hsl(${(animationTime * 30 + 240) % 360}, 80%, 60%)`} />
              </linearGradient>

              {/* 데이터 흐름 애니메이션 마커 */}
              <marker id="arrowFlow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,215,0,0.8)" />
              </marker>
            </defs>

            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {/* 관계선 (최적화: 보이는 것만 렌더링) */}
              {visibleRelationshipsFiltered.map((rel, index) => {
                const sourcePos = positions[rel.source];
                const targetPos = positions[rel.target];
                if (!sourcePos || !targetPos) return null;

                const isActive = selectedCharacter === rel.source || selectedCharacter === rel.target;
                const relColor = relationshipColors[rel.type]?.color || '#666';
                const bothHighlighted = highlightedIds.has(rel.source) && highlightedIds.has(rel.target);
                // 선택된 인물이나 사건이 있으면 관련 와이어만 보이게 (포커스 모드)
                const isFocusMode = selectedCharacter || selectedEvent;
                const opacity = isFocusMode
                  ? (isActive ? 1 : (bothHighlighted ? 0.6 : 0))
                  : (bothHighlighted ? (isMobile ? 0.5 : 0.4) : (isMobile ? 0.15 : 0.1));

                // 두 인물 사이 공통 사건
                const commonEvents = getCommonEvents(rel.source, rel.target);
                const midX = (sourcePos.x + targetPos.x) / 2;
                const midY = (sourcePos.y + targetPos.y) / 2;
                const showEventLabel = (isActive || (isFocusMode && bothHighlighted)) && commonEvents.length > 0 && !isMobile;

                // 데이터 흐름 애니메이션 (활성화된 관계만 - 모바일에서는 간소화)
                const showFlowAnimation = isActive && !isMobile;

                return (
                  <g key={`rel-${index}`}>
                    <line
                      x1={sourcePos.x}
                      y1={sourcePos.y}
                      x2={targetPos.x}
                      y2={targetPos.y}
                      stroke={isActive || bothHighlighted ? relColor : '#444'}
                      strokeWidth={isActive ? (isMobile ? 2 : 2.5) : (isMobile ? 1.2 : 1)}
                      opacity={opacity}
                      strokeLinecap="round"
                    />
                    {showFlowAnimation && (
                      <line
                        x1={sourcePos.x}
                        y1={sourcePos.y}
                        x2={targetPos.x}
                        y2={targetPos.y}
                        stroke="rgba(255,215,0,0.6)"
                        strokeWidth={3}
                        strokeDasharray="8 16"
                        strokeDashoffset={-(animationTime * 50) % 200}
                        opacity={0.8}
                        strokeLinecap="round"
                        markerEnd="url(#arrowFlow)"
                      />
                    )}
                    {/* 관계선 위 사건 라벨 */}
                    {showEventLabel && (
                      <g transform={`translate(${midX}, ${midY})`}>
                        <rect
                          x={-commonEvents.length * 6 - 4}
                          y={-10}
                          width={commonEvents.length * 12 + 8}
                          height={20}
                          rx={10}
                          fill="rgba(0,0,0,0.8)"
                          stroke="rgba(255,215,0,0.5)"
                          strokeWidth={1}
                        />
                        <text
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#ffd700"
                          fontSize={10}
                          style={{ textShadow: '0 0 4px rgba(255,215,0,0.5)' }}
                        >
                          {commonEvents.slice(0, 3).map(e => e.icon).join('')}
                          {commonEvents.length > 3 ? `+${commonEvents.length - 3}` : ''}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* 노드 (최적화: 보이는 것만 렌더링) */}
              {visibleNodes.map(char => {
                const pos = positions[char.id];
                if (!pos) return null;

                const isHighlighted = highlightedIds.has(char.id);
                const isSelected = selectedCharacter === char.id;
                const isHovered = hoveredNode === char.id;
                const nodeColor = getNodeColor(char, isHighlighted, isSelected);
                const size = getNodeSize(char);
                // 펄스 애니메이션은 선택된 노드에만 (모바일에서는 간소화)
                const pulseScale = isSelected && !isMobile ? 1 + Math.sin(animationTime * 3) * 0.12 : 1;
                const isDraggingThis = dragTarget === char.id;
                // 선택된 인물이나 사건이 있으면 관련 노드만 보이게 (포커스 모드)
                const isFocusMode = selectedCharacter || selectedEvent;
                const nodeOpacity = isFocusMode
                  ? (isHighlighted || isSelected ? 1 : 0)
                  : (isHighlighted ? 1 : 0.4);
                // 포커스 모드에서 레인보우 효과 강화
                const useRainbow = (nodeColor.isRainbow || (isFocusMode && isHighlighted)) && (isHighlighted || isSelected) && !isMobile;
                // 포커스 모드에서 네온 글로우 효과
                const focusGlow = isFocusMode && isHighlighted && !isMobile;

                // 인물 관련 사건 가져오기
                const charEvents = characterEventsMap.get(char.id) || [];

                // 라벨 표시 조건: 중요도가 높거나 선택/하이라이트된 경우 (모바일에서는 더 많이 표시)
                const minImportance = isMobile ? 4 : PERFORMANCE_CONFIG.MIN_IMPORTANCE_FOR_LABEL;
                const showLabel = isSelected || isHovered || isHighlighted || char.importance >= minImportance || zoom > 0.8;

                return (
                  <g
                    key={char.id}
                    transform={`translate(${pos.x}, ${pos.y}) scale(${pulseScale})`}
                    style={{
                      cursor: isDraggingThis ? 'grabbing' : 'pointer',
                      touchAction: 'none'
                    }}
                    onMouseDown={(e) => { e.stopPropagation(); handlePointerDown(e, char.id); }}
                    onTouchStart={(e) => { e.stopPropagation(); handlePointerDown(e, char.id); }}
                    onTouchEnd={(e) => { e.stopPropagation(); handlePointerUp(e); }}
                    onMouseUp={(e) => { e.stopPropagation(); handlePointerUp(e); }}
                    onClick={(e) => { e.stopPropagation(); handleCharacterClick(char.id); }}
                    onMouseEnter={() => setHoveredNode(char.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    opacity={nodeOpacity}
                  >
                    {/* 포커스 모드 네온 배경 글로우 */}
                    {focusGlow && (
                      <circle
                        r={size + 12}
                        fill="url(#rainbowAnimated)"
                        opacity={0.3 + Math.sin(animationTime * 2) * 0.15}
                        filter="url(#glow)"
                      />
                    )}

                    {/* 선택/호버 글로우 (데스크탑만) */}
                    {(isSelected || isHovered || focusGlow) && isHighlighted && !isMobile && (
                      <circle r={size + 6} fill={useRainbow ? 'url(#rainbowAnimated)' : nodeColor.glow} opacity={0.6} filter="url(#glow)" />
                    )}

                    {/* 레인보우 링 (포커스 모드에서 강화) */}
                    {useRainbow && (
                      <circle
                        r={size + 3}
                        fill="none"
                        stroke="url(#rainbowAnimated)"
                        strokeWidth={focusGlow ? 3 : 2}
                        opacity={focusGlow ? 0.8 : 0.5}
                      />
                    )}

                    {/* 메인 노드 */}
                    <circle
                      r={size}
                      fill={isHighlighted || isSelected ? nodeColor.fill : '#1a1a2e'}
                      stroke={isSelected ? '#fff' : (useRainbow ? 'url(#rainbowGrad)' : (isHighlighted ? nodeColor.stroke : '#2a2a4e'))}
                      strokeWidth={isSelected ? 3 : (useRainbow ? 2 : (isHovered ? 2 : 1))}
                    />

                    {/* 이름 라벨 (조건부 렌더링) */}
                    {showLabel && (
                      <text
                        y={size + (isMobile ? 10 : 12)}
                        textAnchor="middle"
                        fill={isHighlighted || isSelected ? '#fff' : '#888'}
                        fontSize={isMobile ? (isSelected ? 10 : 8) : (isSelected ? 12 : 10)}
                        fontWeight={isSelected ? '700' : '500'}
                        style={{
                          pointerEvents: 'none',
                          textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                        }}
                      >
                        {lang === 'ko' ? char.name_ko : char.name_en}
                      </text>
                    )}

                    {/* 관련 사건 라벨 (선택/하이라이트시) */}
                    {showLabel && charEvents.length > 0 && (isSelected || isHovered || (isFocusMode && isHighlighted)) && (
                      <text
                        y={size + (isMobile ? 20 : 24)}
                        textAnchor="middle"
                        fill="#ffd700"
                        fontSize={isMobile ? 6 : 8}
                        fontWeight="400"
                        style={{
                          pointerEvents: 'none',
                          textShadow: '0 0 4px rgba(255,215,0,0.5)'
                        }}
                      >
                        {charEvents.slice(0, 3).map(e => e.icon).join(' ')}
                        {charEvents.length > 3 ? ` +${charEvents.length - 3}` : ''}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>

          {/* 줌 컨트롤 */}
          <div style={{
            position: 'absolute',
            bottom: isMobile ? 15 : 25,
            left: isMobile ? 15 : 25,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            background: 'linear-gradient(135deg, rgba(20,20,40,0.95), rgba(15,15,35,0.95))',
            padding: '12px',
            borderRadius: '14px',
            border: '1px solid rgba(102,126,234,0.3)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
          }}>
            <button
              style={{...styles.button, padding: '8px 14px', fontSize: '1rem'}}
              onClick={() => setZoom(z => Math.min(5, z * 1.3))}
            >+</button>
            <span style={{ fontSize: '0.75rem', color: '#8a8aaa', textAlign: 'center', padding: '2px 0' }}>
              {Math.round(zoom * 100)}%
            </span>
            <button
              style={{...styles.button, padding: '8px 14px', fontSize: '1rem'}}
              onClick={() => setZoom(z => Math.max(0.1, z / 1.3))}
            >-</button>
          </div>

          {/* 범례 */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              bottom: 25,
              right: selectedCharacter ? 360 : 25,
              background: 'linear-gradient(135deg, rgba(20,20,40,0.95), rgba(15,15,35,0.95))',
              padding: '12px 18px',
              borderRadius: '14px',
              border: '1px solid rgba(102,126,234,0.3)',
              fontSize: '0.75rem',
              display: 'flex',
              gap: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#4a90d9', boxShadow: '0 0 8px rgba(74,144,217,0.5)' }}/>
                <span style={{ opacity: 0.8 }}>구약</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#e056fd', boxShadow: '0 0 8px rgba(224,86,253,0.5)' }}/>
                <span style={{ opacity: 0.8 }}>신약</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'linear-gradient(135deg, #ff6b6b, #ffd700, #667eea)', boxShadow: '0 0 8px rgba(255,215,0,0.5)' }}/>
                <span style={{ opacity: 0.8 }}>주요인물</span>
              </div>
            </div>
          )}
        </div>

        {/* 모바일 Bottom Sheet (드래그 가능한 상세 패널) */}
        {isMobile && bottomSheetHeight > 0 && selectedCharacterData && (
          <div
            ref={bottomSheetRef}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height: `${Math.round(viewportHeight * bottomSheetHeight / 100)}px`,
              background: 'linear-gradient(180deg, rgba(20,20,40,0.98) 0%, rgba(12,12,28,0.99) 100%)',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              boxShadow: '0 -8px 32px rgba(0,0,0,0.6), 0 -2px 12px rgba(102,126,234,0.2)',
              zIndex: 500,
              display: 'flex',
              flexDirection: 'column',
              transition: bottomSheetDragStart.current ? 'none' : 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden',
              // iOS Safari safe area 대응
              paddingBottom: 'env(safe-area-inset-bottom, 0px)'
            }}
          >
            {/* 드래그 핸들 */}
            <div
              onTouchStart={handleBottomSheetTouchStart}
              onTouchMove={handleBottomSheetTouchMove}
              onTouchEnd={handleBottomSheetTouchEnd}
              onMouseDown={handleBottomSheetMouseDown}
              style={{
                padding: '12px 16px 8px',
                cursor: 'grab',
                touchAction: 'none',
                flexShrink: 0,
                userSelect: 'none'
              }}
            >
              {/* 핸들 바 */}
              <div style={{
                width: '48px',
                height: '5px',
                background: 'rgba(255,255,255,0.4)',
                borderRadius: '3px',
                margin: '0 auto 12px'
              }} />

              {/* 헤더: 인물 이름 + 닫기 버튼 */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h2 style={{
                  margin: 0,
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #ffd700 0%, #ff6b6b 50%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {lang === 'ko' ? selectedCharacterData.name : selectedCharacterData.nameEn}
                </h2>
                <button
                  onClick={handleBottomSheetClose}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    color: '#fff',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* 높이 조절 힌트 */}
              <p style={{
                margin: '8px 0 0',
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.5)',
                textAlign: 'center'
              }}>
                위아래로 드래그하여 크기 조절
              </p>
            </div>

            {/* 컨텐츠 영역 */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '0 16px 24px',
              WebkitOverflowScrolling: 'touch'
            }}>
              <CharacterDetail
                character={selectedCharacterData}
                lang={lang}
                relatedEvents={relatedEvents}
                relatedHymns={relatedHymns}
                relatedRelationships={relatedRelationships}
                relatedLocations={relatedLocations}
                selectedCharacter={selectedCharacter}
                onCharacterSelect={(charId) => {
                  setSelectedCharacter(charId);
                  setBottomSheetHeight(40);
                }}
                onEventClick={handleEventClick}
                onVerseClick={handleVerseClick}
                artwork={characterArtworkAll[selectedCharacter]}
                mbtiData={mbtiData[selectedCharacter]}
              />
            </div>
          </div>
        )}

        {/* 사이드바 - 데스크탑 */}
        {!isMobile && selectedCharacterData && (
          <aside style={styles.sidebar}>
            <CharacterDetail
              character={selectedCharacterData}
              lang={lang}
              relatedEvents={relatedEvents}
              relatedHymns={relatedHymns}
              relatedRelationships={relatedRelationships}
              relatedLocations={relatedLocations}
              selectedCharacter={selectedCharacter}
              onCharacterSelect={setSelectedCharacter}
              onEventClick={handleEventClick}
              onVerseClick={handleVerseClick}
              artwork={characterArtworkAll[selectedCharacter]}
              mbtiData={mbtiData[selectedCharacter]}
            />
          </aside>
        )}
      </div>

      {/* 모바일 인물 팝업 - 더 이상 사용하지 않음 (하단 패널로 대체) */}
      {false && showPopup === 'character' && selectedCharacterData && createPortal(
        <>
          <div style={styles.overlay} onClick={() => setShowPopup(null)} />
          <div style={styles.popup}>
            <button
              style={{ position: 'absolute', top: 14, right: 14, ...styles.button, padding: '8px 12px' }}
              onClick={() => setShowPopup(null)}
            >✕</button>
            <CharacterDetail
              character={selectedCharacterData}
              lang={lang}
              relatedEvents={relatedEvents}
              relatedHymns={relatedHymns}
              relatedRelationships={relatedRelationships}
              relatedLocations={relatedLocations}
              selectedCharacter={selectedCharacter}
              onCharacterSelect={(id) => { setSelectedCharacter(id); }}
              onEventClick={handleEventClick}
              onVerseClick={handleVerseClick}
              artwork={characterArtworkAll[selectedCharacter]}
              mbtiData={mbtiData[selectedCharacter]}
            />
          </div>
        </>,
        document.body
      )}

      {/* 이벤트 팝업 - Portal로 분리 */}
      {showPopup === 'event' && selectedEventData && createPortal(
        <>
          <div style={styles.overlay} onClick={() => setShowPopup(null)} />
          <div style={styles.popup}>
            <button
              style={{ position: 'absolute', top: 14, right: 14, ...styles.button, padding: '8px 12px' }}
              onClick={() => setShowPopup(null)}
            >✕</button>
            <EventDetail
              event={selectedEventData}
              lang={lang}
              eras={eras}
              onCharacterSelect={(id) => { setSelectedCharacter(id); setShowPopup(isMobile ? 'character' : null); }}
              onVerseClick={handleVerseClick}
              artwork={eventArtworkAll[selectedEvent]}
            />
          </div>
        </>,
        document.body
      )}

      {/* 성경 뷰어 - Portal로 분리 */}
      {bibleViewer.show && createPortal(
        <BibleViewer
          bibleViewer={bibleViewer}
          setBibleViewer={setBibleViewer}
          bibleData={bibleData}
          isMobile={isMobile}
        />,
        document.body
      )}

      {/* 타임라인 뷰어 - Portal로 분리 */}
      {showTimeline && createPortal(
        <TimelineMap
          characters={allCharacters}
          events={events}
          eras={eras}
          relationships={relationships}
          lang={lang}
          isMobile={isMobile}
          onClose={() => setShowTimeline(false)}
          onCharacterSelect={(id) => {
            setSelectedCharacter(id);
            setShowTimeline(false);
            if (isMobile) setBottomSheetHeight(40);
          }}
          onEventSelect={(id) => {
            setSelectedEvent(id);
            setShowTimeline(false);
            setShowPopup('event');
          }}
          characterArtwork={characterArtworkUrls}
          eventArtwork={eventArtworkUrls}
        />,
        document.body
      )}

      {/* MBTI 퀴즈 팝업 - Portal로 분리 */}
      {showPopup === 'mbtiQuiz' && createPortal(
        <>
          <div style={styles.overlay} onClick={() => setShowPopup(null)} />
          <div style={{...styles.popup, maxWidth: '400px'}}>
            <button
              style={{ position: 'absolute', top: 14, right: 14, ...styles.button, padding: '8px 12px' }}
              onClick={() => setShowPopup(null)}
            >✕</button>

            <h3 style={{
              fontSize: '1.1rem',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #ffd700, #ff6b6b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🧠 간단 MBTI 테스트
            </h3>

            <p style={{ marginBottom: '8px', opacity: 0.6, fontSize: '0.85rem' }}>
              질문 {mbtiQuizStep + 1} / 4
            </p>

            <p style={{ fontSize: '1rem', marginBottom: '20px', lineHeight: 1.6 }}>
              {mbtiQuestions[mbtiQuizStep].q}
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                style={{
                  ...styles.button,
                  flex: 1,
                  padding: '14px',
                  background: 'linear-gradient(135deg, rgba(76,175,80,0.3), rgba(56,142,60,0.3))',
                  border: '2px solid rgba(76,175,80,0.5)'
                }}
                onClick={() => handleMBTIQuizAnswer(mbtiQuestions[mbtiQuizStep].e)}
              >
                네 ✓
              </button>
              <button
                style={{
                  ...styles.button,
                  flex: 1,
                  padding: '14px',
                  background: 'linear-gradient(135deg, rgba(244,67,54,0.3), rgba(211,47,47,0.3))',
                  border: '2px solid rgba(244,67,54,0.5)'
                }}
                onClick={() => handleMBTIQuizAnswer(mbtiQuestions[mbtiQuizStep].i)}
              >
                아니오 ✗
              </button>
            </div>

            <div style={{ display: 'flex', gap: '6px', marginTop: '20px', justifyContent: 'center' }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{
                  width: '40px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i < mbtiQuizStep ? 'linear-gradient(135deg, #ffd700, #ff6b6b)' :
                              i === mbtiQuizStep ? 'rgba(255,215,0,0.5)' : 'rgba(255,255,255,0.1)'
                }} />
              ))}
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}

// ==================== 인물 상세 컴포넌트 ====================
function CharacterDetail({ character, lang, relatedEvents, relatedHymns, relatedRelationships, relatedLocations, selectedCharacter, onCharacterSelect, onEventClick, onVerseClick, artwork, mbtiData }) {
  const nodeColor = getNodeColor(character, true, true);
  const artworkItems = normalizeArtworkEntry(artwork);
  const hasArtwork = artworkItems.length > 0;
  const fallbackGradient = character.testament === 'old'
    ? 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 50%, #c9d6ff 100%)'
    : 'linear-gradient(135deg, #43cea2 0%, #185a9d 50%, #a855f7 100%)';

  // 기본 아트워크 (예술 작품이 없는 경우)
  const defaultArtwork = !hasArtwork ? {
    isDefault: true,
    gradient: fallbackGradient,
    icon: character.testament === 'old' ? '📜' : '✝️'
  } : null;

  return (
    <>
      {/* 미술 작품 또는 기본 이미지 */}
      <div style={{
        marginBottom: '16px',
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid rgba(102,126,234,0.3)',
        position: 'relative',
    boxSizing: 'border-box'
      }}>
                {hasArtwork ? (
          <div style={{
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth'
          }}>
            {artworkItems.map((item, index) => {
              const title = item.title || (lang === 'ko' ? character.name_ko : character.name_en);
              const subtitle = [item.artist, item.year].filter(Boolean).join(', ');
              return (
                <div
                  key={`${item.url}-${index}`}
                  style={{
                    minWidth: '100%',
                    flexShrink: 0,
                    position: 'relative',
                    scrollSnapAlign: 'start'
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '160px',
                    background: fallbackGradient
                  }}>
                    <img
                      src={item.url}
                      alt={title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '8px 12px',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                    fontSize: '0.75rem'
                  }}>
                    <div style={{ fontWeight: '600' }}>{title}</div>
                    {subtitle && <div style={{ opacity: 0.7 }}>{subtitle}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{
            width: '100%',
            height: '160px',
            background: defaultArtwork.gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem'
          }}>
            {defaultArtwork.icon}
          </div>
        )}
        {hasArtwork && artworkItems.length > 1 && (
          <div style={{
            position: 'absolute',
            top: 8,
            right: 8,
            padding: '2px 8px',
            borderRadius: '10px',
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.2)',
            fontSize: '0.65rem'
          }}>
            {artworkItems.length} images
          </div>
        )}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 18,
        paddingBottom: 18,
        borderBottom: '1px solid rgba(102,126,234,0.2)'
      }}>
        <div style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: character.importance >= 8
            ? 'linear-gradient(135deg, #ff6b6b, #ffd700, #4ecdc4, #667eea)'
            : `linear-gradient(135deg, ${nodeColor.fill}, ${nodeColor.stroke})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 15px ${nodeColor.glow}`
        }}>
          <span style={{ fontSize: '1.3rem' }}>{character.testament === 'old' ? '📜' : '✝️'}</span>
        </div>
        <div>
          <h2 style={{
            fontSize: '1.15rem',
            fontWeight: '700',
            color: nodeColor.fill,
            textShadow: `0 0 20px ${nodeColor.glow}`
          }}>
            {lang === 'ko' ? character.name_ko : character.name_en}
          </h2>
          <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
            <span style={{
              ...styles.badge,
              background: character.testament === 'old' ? 'rgba(74, 144, 217, 0.3)' : 'rgba(224, 86, 253, 0.3)',
              border: `1px solid ${character.testament === 'old' ? 'rgba(74,144,217,0.5)' : 'rgba(224,86,253,0.5)'}`
            }}>
              {character.testament === 'old' ? '구약' : character.testament === 'new' ? '신약' : '구약+신약'}
            </span>
            <span style={{
              ...styles.badge,
              background: 'rgba(243, 156, 18, 0.2)',
              border: '1px solid rgba(243,156,18,0.4)'
            }}>
              중요도 {character.importance}/10
            </span>
            {mbtiData && (
              <span style={{
                ...styles.badge,
                background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,107,107,0.2))',
                border: '1px solid rgba(255,215,0,0.4)'
              }}>
                🧠 {mbtiData.mbti}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* MBTI 정보 */}
      {mbtiData && (
        <div style={{
          ...styles.card,
          background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,107,107,0.1))',
          border: '1px solid rgba(255,215,0,0.3)'
        }}>
          <h4 style={{ marginBottom: 10, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>🧠</span> MBTI 성향
          </h4>
          <p style={{ fontWeight: '600', color: '#ffd700', marginBottom: '6px' }}>
            {mbtiData.mbti} - {mbtiDescriptions[mbtiData.mbti]}
          </p>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {mbtiData.traits.map((trait, i) => (
              <span key={i} style={{
                padding: '4px 10px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontSize: '0.75rem'
              }}>{trait}</span>
            ))}
          </div>
        </div>
      )}

      <div style={styles.card}>
        <p style={{ fontSize: '0.9rem', lineHeight: 1.7, opacity: 0.9 }}>
          {lang === 'ko' ? character.description_ko : character.description_en}
        </p>
      </div>

      {character.labels && (
        <div style={{ marginBottom: 14 }}>
          {character.labels.map((label, i) => (
            <span key={i} style={{
              ...styles.badge,
              background: 'linear-gradient(135deg, rgba(102,126,234,0.2), rgba(118,75,162,0.2))',
              border: '1px solid rgba(102,126,234,0.3)'
            }}>{label}</span>
          ))}
        </div>
      )}

      {character.verses && character.verses.length > 0 && (
        <div style={styles.card}>
          <h4 style={{ marginBottom: 12, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>📜</span> 주요 구절
          </h4>
          {character.verses.slice(0, 2).map((verse, i) => (
            <div key={i} style={{
              marginBottom: 10,
              padding: '12px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 10,
              borderLeft: '3px solid #ffd700',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => onVerseClick && onVerseClick(verse.ref)}
            >
              <strong style={{
                color: '#ffd700',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                {verse.ref}
                <span style={{
                  fontSize: '0.7rem',
                  opacity: 0.6,
                  background: 'rgba(255,215,0,0.2)',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>클릭하여 성경 읽기</span>
              </strong>
              <p style={{ marginTop: 6, fontStyle: 'italic', opacity: 0.85, fontSize: '0.85rem', lineHeight: 1.5 }}>
                "{lang === 'ko' ? verse.text_ko : verse.text_en}"
              </p>
            </div>
          ))}
        </div>
      )}

      {relatedEvents.length > 0 && (
        <div style={styles.card}>
          <h4 style={{ marginBottom: 12, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>📌</span> 관련 사건 ({relatedEvents.length}개)
          </h4>
          {relatedEvents.slice(0, 5).map(event => (
            <div
              key={event.id}
              style={{
                padding: '10px 12px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: 10,
                marginBottom: 8,
                cursor: 'pointer',
                fontSize: '0.85rem',
                border: '1px solid transparent',
                transition: 'all 0.2s'
              }}
              onClick={() => onEventClick(event.id)}
            >
              <span style={{ marginRight: 8 }}>{event.icon}</span>
              {lang === 'ko' ? event.name_ko : event.name_en}
            </div>
          ))}
        </div>
      )}

      {relatedHymns.length > 0 && (
        <div style={styles.card}>
          <h4 style={{ marginBottom: 12, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>🎵</span> 관련 찬송가
          </h4>
          {relatedHymns.slice(0, 4).map(hymn => (
            <div key={hymn.id} style={{
              padding: '10px 12px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 10,
              marginBottom: 8,
              fontSize: '0.85rem',
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
              {lang === 'ko' ? hymn.title_ko : hymn.title_en}
            </div>
          ))}
        </div>
      )}

      {relatedLocations && relatedLocations.length > 0 && (
        <div style={styles.card}>
          <h4 style={{ marginBottom: 12, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>📍</span> 관련 장소 ({relatedLocations.length}곳)
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {relatedLocations.slice(0, 8).map(loc => (
              <div
                key={loc.id}
                style={{
                  padding: '8px 12px',
                  background: 'linear-gradient(135deg, rgba(32,178,170,0.2), rgba(72,201,176,0.2))',
                  borderRadius: 10,
                  fontSize: '0.82rem',
                  border: '1px solid rgba(32,178,170,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <span>{locationTypeIcons[loc.type] || '📍'}</span>
                <span>{lang === 'ko' ? loc.name_ko : loc.name_en}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {relatedRelationships.length > 0 && (
        <div style={styles.card}>
          <h4 style={{ marginBottom: 12, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>👥</span> 관련 인물 ({relatedRelationships.length}명)
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {relatedRelationships.slice(0, 12).map((rel, i) => {
              const otherId = rel.source === selectedCharacter ? rel.target : rel.source;
              const other = getCharacterById(otherId);
              if (!other) return null;
              return (
                <button
                  key={i}
                  style={{
                    ...styles.button,
                    fontSize: '0.8rem',
                    padding: '6px 12px'
                  }}
                  onClick={() => onCharacterSelect(otherId)}
                >
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
function EventDetail({ event, lang, eras, onCharacterSelect, artwork, onVerseClick }) {
  const era = eras.find(e => e.id === event.era);
  const artworkItems = normalizeArtworkEntry(artwork);
  const hasArtwork = artworkItems.length > 0;
  const fallbackGradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)';

  return (
    <>
      {/* 미술 작품 또는 기본 이미지 */}
      <div style={{
        marginBottom: '16px',
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid rgba(102,126,234,0.3)',
        position: 'relative',
    boxSizing: 'border-box'
      }}>
                {hasArtwork ? (
          <div style={{
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth'
          }}>
            {artworkItems.map((item, index) => {
              const title = item.title || (lang === 'ko' ? event.name_ko : event.name_en);
              const subtitle = [item.artist, item.year].filter(Boolean).join(', ');
              return (
                <div
                  key={`${item.url}-${index}`}
                  style={{
                    minWidth: '100%',
                    flexShrink: 0,
                    position: 'relative',
                    scrollSnapAlign: 'start'
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '160px',
                    background: fallbackGradient
                  }}>
                    <img
                      src={item.url}
                      alt={title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '8px 12px',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                    fontSize: '0.75rem'
                  }}>
                    <div style={{ fontWeight: '600' }}>{title}</div>
                    {subtitle && <div style={{ opacity: 0.7 }}>{subtitle}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{
            width: '100%',
            height: '160px',
            background: fallbackGradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem'
          }}>
            {event.icon || '?'}
          </div>
        )}
        {hasArtwork && artworkItems.length > 1 && (
          <div style={{
            position: 'absolute',
            top: 8,
            right: 8,
            padding: '2px 8px',
            borderRadius: '10px',
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.2)',
            fontSize: '0.65rem'
          }}>
            {artworkItems.length} images
          </div>
        )}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 18,
        paddingBottom: 18,
        borderBottom: '1px solid rgba(102,126,234,0.2)'
      }}>
        <div style={{
          width: 55,
          height: 55,
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          borderRadius: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(102,126,234,0.4)'
        }}>
          <span style={{ fontSize: '1.6rem' }}>{event.icon}</span>
        </div>
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: 6 }}>
            {lang === 'ko' ? event.name_ko : event.name_en}
          </h2>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{
              ...styles.badge,
              background: era?.color || '#666',
              margin: 0
            }}>
              {era?.name_ko}
            </span>
            <span style={{ opacity: 0.6, fontSize: '0.85rem' }}>
              {event.year > 0 ? `AD ${event.year}` : `BC ${Math.abs(event.year)}`}
            </span>
          </div>
        </div>
      </div>

      <p style={{ marginBottom: 18, lineHeight: 1.8, fontSize: '0.95rem', opacity: 0.9 }}>
        {lang === 'ko' ? event.description_ko : event.description_en}
      </p>

      {event.verses && event.verses.length > 0 && (
        <div style={styles.card}>
          <h4 style={{ marginBottom: 12, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>📜</span> 성경 구절
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {event.verses.map((verse, index) => (
              <span
                key={index}
                onClick={() => onVerseClick(verse)}
                style={{
                  color: '#ffd700',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  background: 'rgba(255, 215, 0, 0.1)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  transition: 'all 0.2s'
                }}
              >
                {verse}
              </span>
            ))}
          </div>
        </div>
      )}

      {event.commentary_ko && (
        <div style={styles.card}>
          <h4 style={{ marginBottom: 12, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>📝</span> 간략 강해
          </h4>
          <p style={{ lineHeight: 1.8, opacity: 0.9, fontSize: '0.9rem' }}>
            {event.commentary_ko}
          </p>
        </div>
      )}

      {event.characters && event.characters.length > 0 && (
        <div style={styles.card}>
          <h4 style={{ marginBottom: 12, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>👥</span> 관련 인물
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {event.characters.map(charId => {
              const char = getCharacterById(charId);
              if (!char) return null;
              return (
                <button
                  key={charId}
                  style={{ ...styles.button, fontSize: '0.85rem', padding: '8px 14px' }}
                  onClick={() => onCharacterSelect(charId)}
                >
                  {lang === 'ko' ? char.name_ko : char.name_en}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {event.location && (
        <p style={{ opacity: 0.4, fontSize: '0.8rem', marginTop: 14, textAlign: 'center' }}>
          📍 {event.location}
        </p>
      )}
    </>
  );
}

// ==================== 타임라인 뷰어 컴포넌트 ====================
function TimelineViewer({ characters, events, eras, relationships, lang, isMobile, onClose, onCharacterSelect, onEventSelect, characterArtwork, eventArtwork }) {
  const containerRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  // 시대 순서대로 정렬
  const sortedEras = useMemo(() => {
    return [...eras].sort((a, b) => a.year_start - b.year_start);
  }, [eras]);

  // 캐릭터를 시대별로 그룹화
  const charactersByEra = useMemo(() => {
    const grouped = {};
    sortedEras.forEach(era => {
      grouped[era.id] = characters.filter(char => char.era === era.id);
    });
    // 시대 정보가 없는 캐릭터 (eternal, both 등)
    grouped['eternal'] = characters.filter(char => char.era === 'eternal' || !char.era);
    return grouped;
  }, [characters, sortedEras]);

  // 이벤트를 시대별로 그룹화
  const eventsByEra = useMemo(() => {
    const grouped = {};
    sortedEras.forEach(era => {
      grouped[era.id] = events.filter(evt => evt.era === era.id);
    });
    return grouped;
  }, [events, sortedEras]);

  // 연결선 계산 (관련 캐릭터)
  const connections = useMemo(() => {
    const lines = [];
    relationships.forEach(rel => {
      const fromChar = characters.find(c => c.id === rel.source);
      const toChar = characters.find(c => c.id === rel.target);
      if (fromChar && toChar) {
        lines.push({
          from: rel.source,
          to: rel.target,
          type: rel.type,
          fromEra: fromChar.era || 'eternal',
          toEra: toChar.era || 'eternal'
        });
      }
    });
    return lines;
  }, [characters, relationships]);

  // 노드 클릭 핸들러
  const handleNodeClick = (type, id) => {
    if (type === 'character') {
      onCharacterSelect(id);
    } else {
      onEventSelect(id);
    }
  };

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const eraWidth = isMobile ? 280 : 350;
  const nodeSize = isMobile ? 50 : 60;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 100%)',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* 헤더 */}
      <div style={{
        padding: isMobile ? '12px 16px' : '16px 24px',
        background: 'rgba(20,20,40,0.95)',
        borderBottom: '1px solid rgba(102,126,234,0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0
      }}>
        <h2 style={{
          margin: 0,
          fontSize: isMobile ? '1.1rem' : '1.3rem',
          background: 'linear-gradient(135deg, #38b2ac, #319795)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          📅 성경 타임라인
        </h2>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            color: '#fff',
            fontSize: '1.2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >✕</button>
      </div>

      {/* 시대 범례 */}
      <div style={{
        padding: '8px 16px',
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        flexShrink: 0,
        background: 'rgba(10,10,30,0.5)'
      }}>
        {sortedEras.map(era => (
          <div
            key={era.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              borderRadius: '12px',
              background: `${era.color}30`,
              border: `1px solid ${era.color}50`,
              fontSize: '0.7rem',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: era.color }} />
            <span>{lang === 'ko' ? era.name_ko : era.name_en}</span>
          </div>
        ))}
      </div>

      {/* 메인 타임라인 영역 - 가로 스크롤만 */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflowX: 'auto',
          overflowY: 'hidden',
          padding: '20px',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div style={{
          display: 'flex',
          minWidth: 'fit-content',
          height: '100%',
          gap: '4px',
          alignItems: 'stretch'
        }}>
          {/* 영원 (삼위일체) 섹션 */}
          <div style={{
            width: eraWidth * 0.6,
            background: 'linear-gradient(180deg, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0.05) 100%)',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            flexShrink: 0,
            overflowY: 'auto'
          }}>
            <h3 style={{
              margin: 0,
              fontSize: '0.85rem',
              color: '#ffd700',
              textAlign: 'center',
              borderBottom: '1px solid rgba(255,215,0,0.3)',
              paddingBottom: '8px'
            }}>
              ✨ 영원
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
              {charactersByEra['eternal']?.slice(0, 5).map(char => (
                <div
                  key={char.id}
                  onClick={() => handleNodeClick('character', char.id)}
                  onMouseEnter={() => setHoveredNode(char.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    width: nodeSize,
                    height: nodeSize,
                    borderRadius: '50%',
                    background: characterArtwork[char.id]
                      ? `url(${characterArtwork[char.id]}) center/cover`
                      : 'linear-gradient(135deg, #ffd700, #ff6b6b)',
                    border: hoveredNode === char.id ? '3px solid #ffd700' : '2px solid rgba(255,215,0,0.5)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: hoveredNode === char.id
                      ? '0 0 20px rgba(255,215,0,0.6)'
                      : '0 4px 12px rgba(0,0,0,0.4)',
                    transition: 'all 0.2s ease',
                    transform: hoveredNode === char.id ? 'scale(1.1)' : 'scale(1)',
                    position: 'relative',
    boxSizing: 'border-box'
                  }}
                >
                  {!characterArtwork[char.id] && (
                    <span style={{ fontSize: '1.5rem' }}>
                      {char.id === 'god' ? '👑' : char.id === 'jesus' ? '✝️' : '🕊️'}
                    </span>
                  )}
                </div>
              ))}
              {charactersByEra['eternal']?.slice(0, 5).map(char => (
                <span key={`label-${char.id}`} style={{
                  fontSize: '0.7rem',
                  color: '#ffd700',
                  textAlign: 'center',
                  marginTop: '-8px'
                }}>
                  {lang === 'ko' ? char.name_ko : char.name_en}
                </span>
              ))}
            </div>
          </div>

          {/* 시대별 섹션 */}
          {sortedEras.map((era, eraIndex) => {
            const chars = charactersByEra[era.id] || [];
            const evts = eventsByEra[era.id] || [];
            const allItems = [
              ...evts.map(e => ({ ...e, type: 'event' })),
              ...chars.map(c => ({ ...c, type: 'character' }))
            ].sort((a, b) => (a.year || 0) - (b.year || 0));

            return (
              <div
                key={era.id}
                style={{
                  width: eraWidth,
                  background: `linear-gradient(180deg, ${era.color}20 0%, ${era.color}08 100%)`,
                  borderRadius: '16px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  flexShrink: 0,
                  position: 'relative',
                  boxSizing: 'border-box',
                  overflowY: 'auto'
                }}
              >
                {/* 시대 헤더 */}
                <h3 style={{
                  margin: 0,
                  fontSize: '0.85rem',
                  color: era.color,
                  textAlign: 'center',
                  borderBottom: `1px solid ${era.color}50`,
                  paddingBottom: '8px'
                }}>
                  {lang === 'ko' ? era.name_ko : era.name_en}
                  <div style={{ fontSize: '0.65rem', opacity: 0.7, marginTop: '2px' }}>
                    {era.year_start < 0 ? `BC ${Math.abs(era.year_start)}` : `AD ${era.year_start}`}
                    {' ~ '}
                    {era.year_end < 0 ? `BC ${Math.abs(era.year_end)}` : `AD ${era.year_end}`}
                  </div>
                </h3>

                {/* 이벤트 노드들 */}
                {evts.length > 0 && (
                  <div style={{ marginBottom: '8px' }}>
                    <div style={{ fontSize: '0.65rem', color: era.color, marginBottom: '6px', opacity: 0.8 }}>
                      📌 주요 사건
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                      {evts.slice(0, 6).map(evt => (
                        <div
                          key={evt.id}
                          onClick={() => handleNodeClick('event', evt.id)}
                          onMouseEnter={() => setHoveredNode(evt.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '16px',
                            background: hoveredNode === evt.id
                              ? `${era.color}60`
                              : `${era.color}30`,
                            border: `1px solid ${era.color}80`,
                            cursor: 'pointer',
                            fontSize: '0.7rem',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.2s ease',
                            transform: hoveredNode === evt.id ? 'scale(1.05)' : 'scale(1)'
                          }}
                        >
                          <span>{evt.icon || '📖'}</span>
                          <span>{lang === 'ko' ? evt.name_ko : evt.name_en}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 캐릭터 노드들 */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.65rem', color: era.color, marginBottom: '6px', opacity: 0.8 }}>
                    👥 인물 ({chars.length})
                  </div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    justifyContent: 'center',
                    alignContent: 'flex-start'
                  }}>
                    {chars.slice(0, isMobile ? 8 : 12).map(char => (
                      <div
                        key={char.id}
                        onClick={() => handleNodeClick('character', char.id)}
                        onMouseEnter={() => setHoveredNode(char.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{
                          width: nodeSize * 0.75,
                          height: nodeSize * 0.75,
                          borderRadius: '50%',
                          background: characterArtwork[char.id]
                            ? `url(${characterArtwork[char.id]}) center/cover`
                            : `linear-gradient(135deg, ${era.color}, ${era.color}80)`,
                          border: hoveredNode === char.id ? `3px solid ${era.color}` : `2px solid ${era.color}60`,
                          boxShadow: hoveredNode === char.id
                            ? `0 0 15px ${era.color}80`
                            : '0 2px 8px rgba(0,0,0,0.3)',
                          transition: 'all 0.2s ease',
                          transform: hoveredNode === char.id ? 'scale(1.15)' : 'scale(1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {!characterArtwork[char.id] && (
                            <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                              {char.name_ko?.charAt(0) || '?'}
                            </span>
                          )}
                        </div>
                        <span style={{
                          fontSize: '0.6rem',
                          color: hoveredNode === char.id ? '#fff' : 'rgba(255,255,255,0.7)',
                          textAlign: 'center',
                          maxWidth: nodeSize,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {lang === 'ko' ? char.name_ko : char.name_en}
                        </span>
                      </div>
                    ))}
                    {chars.length > (isMobile ? 8 : 12) && (
                      <div style={{
                        width: nodeSize * 0.75,
                        height: nodeSize * 0.75,
                        borderRadius: '50%',
                        background: `${era.color}30`,
                        border: `2px dashed ${era.color}60`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        color: era.color
                      }}>
                        +{chars.length - (isMobile ? 8 : 12)}
                      </div>
                    )}
                  </div>
                </div>

                {/* 연결선 (다음 시대로) */}
                {eraIndex < sortedEras.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    right: '-10px',
                    top: '50%',
                    width: '20px',
                    height: '2px',
                    background: `linear-gradient(90deg, ${era.color}, ${sortedEras[eraIndex + 1].color})`,
                    zIndex: 10
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 하단 안내 */}
      <div style={{
        padding: '8px 16px',
        background: 'rgba(20,20,40,0.95)',
        borderTop: '1px solid rgba(102,126,234,0.2)',
        textAlign: 'center',
        fontSize: '0.7rem',
        color: 'rgba(255,255,255,0.5)',
        flexShrink: 0
      }}>
        좌우로 스크롤하여 시대를 탐색하세요 • 노드를 클릭하면 상세정보를 볼 수 있습니다
      </div>
    </div>
  );
}

// ==================== 성경 뷰어 컴포넌트 ====================
function BibleViewer({ bibleViewer, setBibleViewer, bibleData, isMobile }) {
  const { bookId, bookName, chapter, highlightVerse, totalChapters } = bibleViewer;
  const verseRefs = useRef({});
  const containerRef = useRef(null);

  // 현재 책과 장의 데이터 가져오기
  const book = useMemo(() => {
    return bibleData.books.find(b => b.id === bookId);
  }, [bibleData, bookId]);

  const chapterData = useMemo(() => {
    if (!book) return null;
    return book.chapters.find(c => c.chapter === chapter);
  }, [book, chapter]);

  // 하이라이트된 구절로 스크롤
  useEffect(() => {
    if (highlightVerse && verseRefs.current[highlightVerse]) {
      setTimeout(() => {
        verseRefs.current[highlightVerse].scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [chapter, highlightVerse]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // TTS 상태
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(null);
  const speechRef = useRef(null);

  // TTS 읽기
  const handleSpeak = useCallback(() => {
    if (!chapterData) return;

    if (isSpeaking) {
      // 중지
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentVerse(null);
      return;
    }

    // 읽기 시작
    setIsSpeaking(true);
    const verses = chapterData.verses;
    let verseIndex = highlightVerse ? highlightVerse - 1 : 0;

    const speakVerse = () => {
      if (verseIndex >= verses.length) {
        setIsSpeaking(false);
        setCurrentVerse(null);
        return;
      }

      const verse = verses[verseIndex];
      setCurrentVerse(verse.verse);

      // 해당 구절로 스크롤
      if (verseRefs.current[verse.verse]) {
        verseRefs.current[verse.verse].scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }

      const utterance = new SpeechSynthesisUtterance(`${verse.verse}절. ${verse.text}`);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        verseIndex++;
        if (isSpeaking) {
          setTimeout(speakVerse, 300);
        }
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setCurrentVerse(null);
      };

      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    };

    speakVerse();
  }, [chapterData, isSpeaking, highlightVerse]);

  // 컴포넌트 언마운트 시 TTS 중지
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // 장 변경 시 TTS 중지
  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentVerse(null);
  }, [chapter]);

  const handleChapterChange = (newChapter) => {
    setBibleViewer(prev => ({
      ...prev,
      chapter: newChapter,
      highlightVerse: null
    }));
  };

  const handleClose = () => {
    setBibleViewer({
      show: false,
      bookId: null,
      bookName: '',
      chapter: 1,
      highlightVerse: null,
      totalChapters: 0
    });
  };

  // 책 목록
  const allBooks = useMemo(() => bibleData.books, [bibleData]);

  const handleBookChange = (newBookId) => {
    const newBook = allBooks.find(b => b.id === newBookId);
    if (newBook) {
      setBibleViewer(prev => ({
        ...prev,
        bookId: newBookId,
        bookName: newBook.name,
        chapter: 1,
        highlightVerse: null,
        totalChapters: newBook.chapters.length
      }));
    }
  };

  if (!book || !chapterData) return null;

  const viewerStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      padding: isMobile ? '12px 16px' : '16px 24px',
      background: 'linear-gradient(135deg, rgba(26,26,46,0.98), rgba(22,22,40,0.98))',
      borderBottom: '1px solid rgba(102,126,234,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      flexWrap: 'wrap'
    },
    titleSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flex: 1,
      minWidth: '200px'
    },
    select: {
      padding: '8px 12px',
      borderRadius: '8px',
      border: '1px solid rgba(102,126,234,0.4)',
      background: 'rgba(30,30,50,0.9)',
      color: '#fff',
      fontSize: '0.9rem',
      cursor: 'pointer',
      outline: 'none'
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    navButton: {
      padding: '8px 16px',
      borderRadius: '8px',
      border: '1px solid rgba(102,126,234,0.4)',
      background: 'linear-gradient(135deg, rgba(102,126,234,0.2), rgba(118,75,162,0.2))',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '0.9rem',
      transition: 'all 0.2s'
    },
    closeButton: {
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      background: 'linear-gradient(135deg, #ff6b6b, #ee5a5a)',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600'
    },
    content: {
      flex: 1,
      overflow: 'auto',
      padding: isMobile ? '16px' : '24px 48px',
      background: 'linear-gradient(180deg, rgba(26,26,46,0.95), rgba(18,18,35,0.98))'
    },
    chapterTitle: {
      textAlign: 'center',
      fontSize: isMobile ? '1.3rem' : '1.5rem',
      fontWeight: '700',
      marginBottom: '24px',
      color: '#ffd700',
      textShadow: '0 0 20px rgba(255,215,0,0.3)'
    },
    verse: {
      marginBottom: '12px',
      lineHeight: '1.9',
      fontSize: isMobile ? '1rem' : '1.1rem',
      padding: '8px 12px',
      borderRadius: '8px',
      transition: 'all 0.3s'
    },
    verseNumber: {
      display: 'inline-block',
      width: '32px',
      fontWeight: '700',
      color: '#667eea',
      fontSize: '0.85rem'
    },
    highlightedVerse: {
      background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,183,0,0.15))',
      border: '1px solid rgba(255,215,0,0.4)',
      boxShadow: '0 0 20px rgba(255,215,0,0.2)'
    },
    chapterNav: {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      padding: '16px',
      flexWrap: 'wrap',
      borderTop: '1px solid rgba(102,126,234,0.2)',
      background: 'rgba(26,26,46,0.9)'
    },
    chapterButton: {
      width: '36px',
      height: '36px',
      borderRadius: '8px',
      border: '1px solid rgba(102,126,234,0.3)',
      background: 'rgba(30,30,50,0.8)',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '0.85rem',
      transition: 'all 0.2s'
    },
    activeChapter: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      border: '1px solid #667eea',
      fontWeight: '700'
    }
  };

  return (
    <div style={viewerStyles.overlay}>
      {/* 헤더 */}
      <div style={viewerStyles.header}>
        <div style={viewerStyles.titleSection}>
          <span style={{ fontSize: '1.5rem' }}>📖 성경</span>
          <select
            value={bookId}
            onChange={(e) => handleBookChange(e.target.value)}
            style={viewerStyles.select}
          >
            <optgroup label="구약 성경">
              {allBooks.filter(b => b.testament === 'old').map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </optgroup>
            <optgroup label="신약 성경">
              {allBooks.filter(b => b.testament === 'new').map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </optgroup>
          </select>
          <span style={{ color: '#ffd700', fontWeight: '600' }}>{chapter}장</span>
        </div>

        <div style={viewerStyles.nav}>
          <button
            style={{
              ...viewerStyles.navButton,
              opacity: chapter <= 1 ? 0.4 : 1
            }}
            onClick={() => chapter > 1 && handleChapterChange(chapter - 1)}
            disabled={chapter <= 1}
          >
            ◀ 이전
          </button>
          <button
            style={{
              ...viewerStyles.navButton,
              opacity: chapter >= totalChapters ? 0.4 : 1
            }}
            onClick={() => chapter < totalChapters && handleChapterChange(chapter + 1)}
            disabled={chapter >= totalChapters}
          >
            다음 ▶
          </button>
          <button
            style={{
              ...viewerStyles.navButton,
              background: isSpeaking
                ? 'linear-gradient(135deg, rgba(255,107,107,0.4), rgba(238,90,90,0.4))'
                : 'linear-gradient(135deg, rgba(72,187,120,0.3), rgba(56,161,105,0.3))',
              border: isSpeaking ? '1px solid rgba(255,107,107,0.6)' : '1px solid rgba(72,187,120,0.6)'
            }}
            onClick={handleSpeak}
          >
            {isSpeaking ? '⏹ 중지' : '🔊 듣기'}
          </button>
          <button style={viewerStyles.closeButton} onClick={handleClose}>
            ✕ 닫기
          </button>
        </div>
      </div>

      {/* 본문 */}
      <div style={viewerStyles.content} ref={containerRef}>
        <h2 style={viewerStyles.chapterTitle}>
          {bookName} {chapter}장
        </h2>

        <div>
          {chapterData.verses.map((v) => (
            <p
              key={v.verse}
              ref={el => verseRefs.current[v.verse] = el}
              style={{
                ...viewerStyles.verse,
                ...(v.verse === highlightVerse ? viewerStyles.highlightedVerse : {}),
                ...(v.verse === currentVerse ? {
                  background: 'linear-gradient(135deg, rgba(72,187,120,0.25), rgba(56,161,105,0.2))',
                  border: '1px solid rgba(72,187,120,0.5)',
                  boxShadow: '0 0 15px rgba(72,187,120,0.3)'
                } : {})
              }}
            >
              <span style={{
                ...viewerStyles.verseNumber,
                ...(v.verse === currentVerse ? { color: '#48bb78' } : {})
              }}>{v.verse}</span>
              {v.text}
            </p>
          ))}
        </div>
      </div>

      {/* 장 네비게이션 */}
      <div style={viewerStyles.chapterNav}>
        {Array.from({ length: totalChapters }, (_, i) => i + 1).map(num => (
          <button
            key={num}
            style={{
              ...viewerStyles.chapterButton,
              ...(num === chapter ? viewerStyles.activeChapter : {})
            }}
            onClick={() => handleChapterChange(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
