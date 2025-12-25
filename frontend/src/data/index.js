// 모든 데이터 통합
import { characters } from './characters.js';
import { charactersExtended } from './characters-extended.js';
import { charactersNewTestament } from './characters-nt.js';
import { patriarchCharacters } from './characters-patriarchs.js';
import { exodusCharacters } from './characters-exodus.js';
import { judgesKingsCharacters } from './characters-judges-kings.js';
import { prophetCharacters } from './characters-prophets.js';
import { relationships as baseRelationships, relationshipColors, getRelationshipsByCharacter } from './relationships.js';
import { events as baseEvents, eras, getEventsByCharacter, getEventsByEra, eventsByChronology as baseChronology } from './events.js';
import { eventsExpanded } from './events-expanded.js';
import { bibleBooks, allBooks, categoryColors, getBookById } from './books.js';
import { hymns, getHymnsByCharacter, getHymnsByEvent } from './hymns.js';

// 모든 인물 통합 (중복 제거)
const allCharactersRaw = [
  ...characters,
  ...charactersExtended,
  ...charactersNewTestament,
  ...patriarchCharacters,
  ...exodusCharacters,
  ...judgesKingsCharacters,
  ...prophetCharacters
];

// 중복 ID 제거 (나중에 추가된 것 우선)
const characterMap = new Map();
allCharactersRaw.forEach(char => {
  characterMap.set(char.id, char);
});
export const allCharacters = Array.from(characterMap.values());

// 모든 이벤트 통합
const allEventsRaw = [...baseEvents, ...eventsExpanded];
const eventMap = new Map();
allEventsRaw.forEach(event => {
  eventMap.set(event.id, event);
});
export const events = Array.from(eventMap.values());

// 시간순 정렬된 이벤트
export const eventsByChronology = [...events].sort((a, b) => a.year - b.year);

// 확장된 관계 데이터
const expandedRelationships = [
  ...baseRelationships,
  // 족장 시대 관계
  { source: 'seth', target: 'adam', type: 'child' },
  { source: 'enosh', target: 'seth', type: 'child' },
  { source: 'enoch', target: 'jared', type: 'child' },
  { source: 'methuselah', target: 'enoch', type: 'child' },
  { source: 'lamech_noah', target: 'methuselah', type: 'child' },
  { source: 'noah', target: 'lamech_noah', type: 'child' },
  { source: 'shem', target: 'noah', type: 'child' },
  { source: 'ham', target: 'noah', type: 'child' },
  { source: 'japheth', target: 'noah', type: 'child' },
  { source: 'nimrod', target: 'ham', type: 'descendant' },
  { source: 'terah', target: 'shem', type: 'descendant' },
  { source: 'abraham', target: 'terah', type: 'child' },
  { source: 'nahor', target: 'terah', type: 'child' },
  { source: 'haran_person', target: 'terah', type: 'child' },
  { source: 'lot', target: 'haran_person', type: 'child' },
  { source: 'sarah', target: 'abraham', type: 'spouse' },
  { source: 'hagar', target: 'abraham', type: 'concubine' },
  { source: 'ishmael', target: 'abraham', type: 'child' },
  { source: 'ishmael', target: 'hagar', type: 'child' },
  { source: 'isaac', target: 'abraham', type: 'child' },
  { source: 'isaac', target: 'sarah', type: 'child' },
  { source: 'rebekah', target: 'isaac', type: 'spouse' },
  { source: 'rebekah', target: 'bethuel', type: 'child' },
  { source: 'laban', target: 'bethuel', type: 'child' },
  { source: 'jacob', target: 'isaac', type: 'child' },
  { source: 'jacob', target: 'rebekah', type: 'child' },
  { source: 'esau', target: 'isaac', type: 'child' },
  { source: 'leah', target: 'jacob', type: 'spouse' },
  { source: 'rachel', target: 'jacob', type: 'spouse' },
  { source: 'leah', target: 'laban', type: 'child' },
  { source: 'rachel', target: 'laban', type: 'child' },
  { source: 'reuben', target: 'jacob', type: 'child' },
  { source: 'reuben', target: 'leah', type: 'child' },
  { source: 'simeon', target: 'jacob', type: 'child' },
  { source: 'levi', target: 'jacob', type: 'child' },
  { source: 'judah', target: 'jacob', type: 'child' },
  { source: 'dan', target: 'jacob', type: 'child' },
  { source: 'naphtali', target: 'jacob', type: 'child' },
  { source: 'gad', target: 'jacob', type: 'child' },
  { source: 'asher', target: 'jacob', type: 'child' },
  { source: 'issachar', target: 'jacob', type: 'child' },
  { source: 'zebulun', target: 'jacob', type: 'child' },
  { source: 'joseph', target: 'jacob', type: 'child' },
  { source: 'joseph', target: 'rachel', type: 'child' },
  { source: 'benjamin', target: 'jacob', type: 'child' },
  { source: 'benjamin', target: 'rachel', type: 'child' },
  { source: 'dinah', target: 'jacob', type: 'child' },
  { source: 'tamar_judah', target: 'judah', type: 'in_law' },
  { source: 'perez', target: 'judah', type: 'child' },
  { source: 'perez', target: 'tamar_judah', type: 'child' },
  { source: 'manasseh', target: 'joseph', type: 'child' },
  { source: 'ephraim', target: 'joseph', type: 'child' },

  // 출애굽 시대 관계
  { source: 'amram', target: 'levi', type: 'descendant' },
  { source: 'jochebed', target: 'amram', type: 'spouse' },
  { source: 'moses', target: 'amram', type: 'child' },
  { source: 'moses', target: 'jochebed', type: 'child' },
  { source: 'aaron', target: 'amram', type: 'child' },
  { source: 'miriam', target: 'amram', type: 'child' },
  { source: 'moses', target: 'aaron', type: 'sibling' },
  { source: 'moses', target: 'miriam', type: 'sibling' },
  { source: 'zipporah', target: 'moses', type: 'spouse' },
  { source: 'zipporah', target: 'jethro', type: 'child' },
  { source: 'gershom', target: 'moses', type: 'child' },
  { source: 'eliezer_moses', target: 'moses', type: 'child' },
  { source: 'nadab', target: 'aaron', type: 'child' },
  { source: 'abihu', target: 'aaron', type: 'child' },
  { source: 'eleazar', target: 'aaron', type: 'child' },
  { source: 'ithamar', target: 'aaron', type: 'child' },
  { source: 'phinehas', target: 'eleazar', type: 'child' },
  { source: 'joshua', target: 'moses', type: 'successor' },
  { source: 'caleb', target: 'joshua', type: 'ally' },

  // 사사/왕정 시대 관계
  { source: 'deborah', target: 'barak', type: 'ally' },
  { source: 'jael', target: 'sisera', type: 'enemy' },
  { source: 'gideon', target: 'abimelech', type: 'parent' },
  { source: 'samson', target: 'manoah', type: 'child' },
  { source: 'samson', target: 'delilah', type: 'lover' },
  { source: 'eli', target: 'hophni', type: 'parent' },
  { source: 'eli', target: 'phinehas_eli', type: 'parent' },
  { source: 'eli', target: 'samuel', type: 'mentor' },
  { source: 'hannah', target: 'samuel', type: 'parent' },
  { source: 'elkanah', target: 'samuel', type: 'parent' },
  { source: 'elkanah', target: 'hannah', type: 'spouse' },
  { source: 'saul', target: 'kish', type: 'child' },
  { source: 'saul', target: 'samuel', type: 'anointed_by' },
  { source: 'jonathan', target: 'saul', type: 'child' },
  { source: 'michal', target: 'saul', type: 'child' },
  { source: 'michal', target: 'david', type: 'spouse' },
  { source: 'david', target: 'jonathan', type: 'friend' },
  { source: 'david', target: 'samuel', type: 'anointed_by' },
  { source: 'david', target: 'jesse', type: 'child' },
  { source: 'david', target: 'goliath', type: 'enemy' },
  { source: 'abner', target: 'saul', type: 'servant' },
  { source: 'ish_bosheth', target: 'saul', type: 'child' },
  { source: 'joab', target: 'david', type: 'servant' },
  { source: 'abishai', target: 'joab', type: 'sibling' },
  { source: 'asahel', target: 'joab', type: 'sibling' },
  { source: 'bathsheba', target: 'david', type: 'spouse' },
  { source: 'bathsheba', target: 'uriah', type: 'former_spouse' },
  { source: 'solomon', target: 'david', type: 'child' },
  { source: 'solomon', target: 'bathsheba', type: 'child' },
  { source: 'absalom', target: 'david', type: 'child' },
  { source: 'amnon', target: 'david', type: 'child' },
  { source: 'tamar_david', target: 'david', type: 'child' },
  { source: 'adonijah', target: 'david', type: 'child' },
  { source: 'mephibosheth', target: 'jonathan', type: 'child' },
  { source: 'nathan_prophet', target: 'david', type: 'prophet_to' },
  { source: 'rehoboam', target: 'solomon', type: 'child' },
  { source: 'ahab', target: 'jezebel', type: 'spouse' },
  { source: 'elijah', target: 'ahab', type: 'prophet_to' },
  { source: 'elijah', target: 'jezebel', type: 'enemy' },
  { source: 'elijah', target: 'elisha', type: 'mentor' },
  { source: 'jehu', target: 'ahab', type: 'successor' },
  { source: 'jehu', target: 'jezebel', type: 'enemy' },
  { source: 'athaliah', target: 'ahab', type: 'child' },
  { source: 'joash_judah', target: 'athaliah', type: 'survived' },
  { source: 'hezekiah', target: 'isaiah', type: 'contemporary' },
  { source: 'josiah', target: 'jeremiah', type: 'contemporary' },

  // 포로기 관계
  { source: 'daniel', target: 'nebuchadnezzar', type: 'served' },
  { source: 'shadrach', target: 'daniel', type: 'friend' },
  { source: 'meshach', target: 'daniel', type: 'friend' },
  { source: 'abednego', target: 'daniel', type: 'friend' },
  { source: 'esther', target: 'mordecai', type: 'relative' },
  { source: 'esther', target: 'ahasuerus', type: 'spouse' },
  { source: 'mordecai', target: 'haman', type: 'enemy' },
  { source: 'ezra', target: 'nehemiah', type: 'contemporary' },
  { source: 'zerubbabel', target: 'jeshua_priest', type: 'ally' },

  // 욥기 관계
  { source: 'eliphaz', target: 'job', type: 'friend' },
  { source: 'bildad', target: 'job', type: 'friend' },
  { source: 'zophar', target: 'job', type: 'friend' },
  { source: 'elihu', target: 'job', type: 'counselor' }
];

// 중복 관계 제거
const relationshipSet = new Set();
export const relationships = expandedRelationships.filter(rel => {
  const key = `${rel.source}-${rel.target}-${rel.type}`;
  if (relationshipSet.has(key)) return false;
  relationshipSet.add(key);
  return true;
});

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
  relationshipColors,
  getRelationshipsByCharacter,
  eras,
  getEventsByCharacter,
  getEventsByEra,
  bibleBooks,
  allBooks,
  categoryColors,
  getBookById,
  hymns,
  getHymnsByCharacter,
  getHymnsByEvent
};
