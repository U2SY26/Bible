// 모든 데이터 통합
import { characters } from './characters.js';
import { charactersExtended } from './characters-extended.js';
import { charactersNewTestament } from './characters-nt.js';
import { relationships, relationshipColors, getRelationshipsByCharacter } from './relationships.js';
import { events, eras, getEventsByCharacter, getEventsByEra, eventsByChronology } from './events.js';
import { bibleBooks, allBooks, categoryColors, getBookById } from './books.js';
import { hymns, getHymnsByCharacter, getHymnsByEvent } from './hymns.js';

// 모든 인물 통합
export const allCharacters = [
  ...characters,
  ...charactersExtended,
  ...charactersNewTestament
];

// ID로 인물 찾기
export const getCharacterById = (id) => allCharacters.find(c => c.id === id);

// 성경별 인물 찾기
export const getCharactersByBook = (bookId) => {
  return allCharacters.filter(c => c.books && c.books.includes(bookId));
};

// 시대별 인물 찾기
export const getCharactersByEra = (era) => {
  return allCharacters.filter(c => c.era === era);
};

// 구약/신약별 인물 찾기
export const getCharactersByTestament = (testament) => {
  if (testament === 'both') return allCharacters;
  return allCharacters.filter(c => c.testament === testament || c.testament === 'both');
};

// 검색
export const searchCharacters = (query, lang = 'ko') => {
  const q = query.toLowerCase();
  return allCharacters.filter(c => {
    const name = lang === 'ko' ? c.name_ko : c.name_en;
    const desc = lang === 'ko' ? c.description_ko : c.description_en;
    const labels = c.labels ? c.labels.join(' ') : '';
    return name.toLowerCase().includes(q) || 
           desc.toLowerCase().includes(q) ||
           labels.toLowerCase().includes(q);
  });
};

// 지역 데이터
export const regions = [
  { id: 'eden', name_ko: '에덴', name_en: 'Eden', color: '#2d5016' },
  { id: 'mesopotamia', name_ko: '메소포타미아', name_en: 'Mesopotamia', color: '#8B4513' },
  { id: 'canaan', name_ko: '가나안', name_en: 'Canaan', color: '#DAA520' },
  { id: 'egypt', name_ko: '이집트', name_en: 'Egypt', color: '#C19A6B' },
  { id: 'sinai', name_ko: '시내 광야', name_en: 'Sinai', color: '#D2691E' },
  { id: 'israel', name_ko: '이스라엘', name_en: 'Israel', color: '#4169E1' },
  { id: 'judah', name_ko: '유다', name_en: 'Judah', color: '#9932CC' },
  { id: 'babylon', name_ko: '바벨론', name_en: 'Babylon', color: '#8B0000' },
  { id: 'persia', name_ko: '페르시아', name_en: 'Persia', color: '#FF8C00' },
  { id: 'galilee', name_ko: '갈릴리', name_en: 'Galilee', color: '#20B2AA' },
  { id: 'jerusalem', name_ko: '예루살렘', name_en: 'Jerusalem', color: '#FFD700' },
  { id: 'rome', name_ko: '로마', name_en: 'Rome', color: '#DC143C' },
  { id: 'asia_minor', name_ko: '소아시아', name_en: 'Asia Minor', color: '#9370DB' }
];

// 내보내기
export {
  relationships,
  relationshipColors,
  getRelationshipsByCharacter,
  events,
  eras,
  getEventsByCharacter,
  getEventsByEra,
  eventsByChronology,
  bibleBooks,
  allBooks,
  categoryColors,
  getBookById,
  hymns,
  getHymnsByCharacter,
  getHymnsByEvent
};
