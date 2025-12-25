// 한국어 성경 데이터 변환 스크립트
const fs = require('fs');
const path = require('path');

// 원본 데이터 로드
const rawData = require('../frontend/src/data/korean-bible-full.json');

// 책 ID 매핑 (다운로드된 ID -> 우리 앱 ID)
const bookIdMap = {
  'gn': 'gen', 'ex': 'exo', 'lv': 'lev', 'nm': 'num', 'dt': 'deu',
  'js': 'jos', 'jud': 'jdg', 'rt': 'rut', '1sm': '1sa', '2sm': '2sa',
  '1kgs': '1ki', '2kgs': '2ki', '1ch': '1ch', '2ch': '2ch', 'ezr': 'ezr',
  'ne': 'neh', 'et': 'est', 'job': 'job', 'ps': 'psa', 'prv': 'pro',
  'ec': 'ecc', 'so': 'sng', 'is': 'isa', 'jr': 'jer', 'lm': 'lam',
  'ez': 'ezk', 'dn': 'dan', 'ho': 'hos', 'jl': 'jol', 'am': 'amo',
  'ob': 'oba', 'jn': 'jon', 'mi': 'mic', 'na': 'nam', 'hk': 'hab',
  'zp': 'zep', 'hg': 'hag', 'zc': 'zec', 'ml': 'mal',
  'mt': 'mat', 'mk': 'mrk', 'lk': 'luk', 'jo': 'jhn', 'act': 'act',
  'rm': 'rom', '1co': '1co', '2co': '2co', 'gl': 'gal', 'eph': 'eph',
  'ph': 'php', 'cl': 'col', '1ts': '1th', '2ts': '2th', '1tm': '1ti',
  '2tm': '2ti', 'tt': 'tit', 'phm': 'phm', 'hb': 'heb', 'jm': 'jas',
  '1pe': '1pe', '2pe': '2pe', '1jo': '1jn', '2jo': '2jn', '3jo': '3jn',
  'jd': 'jud', 're': 'rev'
};

// 책 메타데이터
const bookMeta = {
  'gen': { name: '창세기', name_en: 'Genesis', testament: 'old' },
  'exo': { name: '출애굽기', name_en: 'Exodus', testament: 'old' },
  'lev': { name: '레위기', name_en: 'Leviticus', testament: 'old' },
  'num': { name: '민수기', name_en: 'Numbers', testament: 'old' },
  'deu': { name: '신명기', name_en: 'Deuteronomy', testament: 'old' },
  'jos': { name: '여호수아', name_en: 'Joshua', testament: 'old' },
  'jdg': { name: '사사기', name_en: 'Judges', testament: 'old' },
  'rut': { name: '룻기', name_en: 'Ruth', testament: 'old' },
  '1sa': { name: '사무엘상', name_en: '1 Samuel', testament: 'old' },
  '2sa': { name: '사무엘하', name_en: '2 Samuel', testament: 'old' },
  '1ki': { name: '열왕기상', name_en: '1 Kings', testament: 'old' },
  '2ki': { name: '열왕기하', name_en: '2 Kings', testament: 'old' },
  '1ch': { name: '역대상', name_en: '1 Chronicles', testament: 'old' },
  '2ch': { name: '역대하', name_en: '2 Chronicles', testament: 'old' },
  'ezr': { name: '에스라', name_en: 'Ezra', testament: 'old' },
  'neh': { name: '느헤미야', name_en: 'Nehemiah', testament: 'old' },
  'est': { name: '에스더', name_en: 'Esther', testament: 'old' },
  'job': { name: '욥기', name_en: 'Job', testament: 'old' },
  'psa': { name: '시편', name_en: 'Psalms', testament: 'old' },
  'pro': { name: '잠언', name_en: 'Proverbs', testament: 'old' },
  'ecc': { name: '전도서', name_en: 'Ecclesiastes', testament: 'old' },
  'sng': { name: '아가', name_en: 'Song of Solomon', testament: 'old' },
  'isa': { name: '이사야', name_en: 'Isaiah', testament: 'old' },
  'jer': { name: '예레미야', name_en: 'Jeremiah', testament: 'old' },
  'lam': { name: '예레미야애가', name_en: 'Lamentations', testament: 'old' },
  'ezk': { name: '에스겔', name_en: 'Ezekiel', testament: 'old' },
  'dan': { name: '다니엘', name_en: 'Daniel', testament: 'old' },
  'hos': { name: '호세아', name_en: 'Hosea', testament: 'old' },
  'jol': { name: '요엘', name_en: 'Joel', testament: 'old' },
  'amo': { name: '아모스', name_en: 'Amos', testament: 'old' },
  'oba': { name: '오바댜', name_en: 'Obadiah', testament: 'old' },
  'jon': { name: '요나', name_en: 'Jonah', testament: 'old' },
  'mic': { name: '미가', name_en: 'Micah', testament: 'old' },
  'nam': { name: '나훔', name_en: 'Nahum', testament: 'old' },
  'hab': { name: '하박국', name_en: 'Habakkuk', testament: 'old' },
  'zep': { name: '스바냐', name_en: 'Zephaniah', testament: 'old' },
  'hag': { name: '학개', name_en: 'Haggai', testament: 'old' },
  'zec': { name: '스가랴', name_en: 'Zechariah', testament: 'old' },
  'mal': { name: '말라기', name_en: 'Malachi', testament: 'old' },
  'mat': { name: '마태복음', name_en: 'Matthew', testament: 'new' },
  'mrk': { name: '마가복음', name_en: 'Mark', testament: 'new' },
  'luk': { name: '누가복음', name_en: 'Luke', testament: 'new' },
  'jhn': { name: '요한복음', name_en: 'John', testament: 'new' },
  'act': { name: '사도행전', name_en: 'Acts', testament: 'new' },
  'rom': { name: '로마서', name_en: 'Romans', testament: 'new' },
  '1co': { name: '고린도전서', name_en: '1 Corinthians', testament: 'new' },
  '2co': { name: '고린도후서', name_en: '2 Corinthians', testament: 'new' },
  'gal': { name: '갈라디아서', name_en: 'Galatians', testament: 'new' },
  'eph': { name: '에베소서', name_en: 'Ephesians', testament: 'new' },
  'php': { name: '빌립보서', name_en: 'Philippians', testament: 'new' },
  'col': { name: '골로새서', name_en: 'Colossians', testament: 'new' },
  '1th': { name: '데살로니가전서', name_en: '1 Thessalonians', testament: 'new' },
  '2th': { name: '데살로니가후서', name_en: '2 Thessalonians', testament: 'new' },
  '1ti': { name: '디모데전서', name_en: '1 Timothy', testament: 'new' },
  '2ti': { name: '디모데후서', name_en: '2 Timothy', testament: 'new' },
  'tit': { name: '디도서', name_en: 'Titus', testament: 'new' },
  'phm': { name: '빌레몬서', name_en: 'Philemon', testament: 'new' },
  'heb': { name: '히브리서', name_en: 'Hebrews', testament: 'new' },
  'jas': { name: '야고보서', name_en: 'James', testament: 'new' },
  '1pe': { name: '베드로전서', name_en: '1 Peter', testament: 'new' },
  '2pe': { name: '베드로후서', name_en: '2 Peter', testament: 'new' },
  '1jn': { name: '요한일서', name_en: '1 John', testament: 'new' },
  '2jn': { name: '요한이서', name_en: '2 John', testament: 'new' },
  '3jn': { name: '요한삼서', name_en: '3 John', testament: 'new' },
  'jud': { name: '유다서', name_en: 'Jude', testament: 'new' },
  'rev': { name: '요한계시록', name_en: 'Revelation', testament: 'new' }
};

// 데이터 변환
const convertedData = {
  version: '개역한글',
  version_en: 'Korean Revised Version (KRV)',
  copyright: 'Public Domain (저작권 만료)',
  books: []
};

let totalVerses = 0;
let totalChapters = 0;

rawData.forEach(book => {
  const ourId = bookIdMap[book.id];
  const meta = bookMeta[ourId];

  if (!meta) {
    console.error('Unknown book ID:', book.id);
    return;
  }

  const chapters = book.chapters.map((verses, chapterIndex) => {
    totalChapters++;
    const chapterVerses = verses.map((text, verseIndex) => {
      totalVerses++;
      // 느낌표 등 특수문자 정리
      const cleanText = text.replace(/\s*!\s*/g, ' ').trim();
      return {
        verse: verseIndex + 1,
        text: cleanText
      };
    });

    return {
      chapter: chapterIndex + 1,
      verses: chapterVerses
    };
  });

  convertedData.books.push({
    id: ourId,
    name: meta.name,
    name_en: meta.name_en,
    testament: meta.testament,
    chapters: chapters
  });
});

console.log('변환 완료!');
console.log('총 책:', convertedData.books.length);
console.log('총 장:', totalChapters);
console.log('총 절:', totalVerses);

// 저장
const outputPath = path.join(__dirname, '../frontend/src/data/bible.json');
fs.writeFileSync(outputPath, JSON.stringify(convertedData, null, 2), 'utf-8');
console.log('저장 완료:', outputPath);

// 파일 크기 확인
const stats = fs.statSync(outputPath);
console.log('파일 크기:', (stats.size / 1024 / 1024).toFixed(2), 'MB');
