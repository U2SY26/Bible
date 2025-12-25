// 개역개정 성경 66권 메타데이터
// 대한예수교장로회 인정

export const bibleBooks = {
  // ==================== 구약 39권 ====================
  old: [
    { id: 'gen', name: '창세기', name_en: 'Genesis', chapters: 50, abbr: '창' },
    { id: 'exo', name: '출애굽기', name_en: 'Exodus', chapters: 40, abbr: '출' },
    { id: 'lev', name: '레위기', name_en: 'Leviticus', chapters: 27, abbr: '레' },
    { id: 'num', name: '민수기', name_en: 'Numbers', chapters: 36, abbr: '민' },
    { id: 'deu', name: '신명기', name_en: 'Deuteronomy', chapters: 34, abbr: '신' },
    { id: 'jos', name: '여호수아', name_en: 'Joshua', chapters: 24, abbr: '수' },
    { id: 'jdg', name: '사사기', name_en: 'Judges', chapters: 21, abbr: '삿' },
    { id: 'rut', name: '룻기', name_en: 'Ruth', chapters: 4, abbr: '룻' },
    { id: '1sa', name: '사무엘상', name_en: '1 Samuel', chapters: 31, abbr: '삼상' },
    { id: '2sa', name: '사무엘하', name_en: '2 Samuel', chapters: 24, abbr: '삼하' },
    { id: '1ki', name: '열왕기상', name_en: '1 Kings', chapters: 22, abbr: '왕상' },
    { id: '2ki', name: '열왕기하', name_en: '2 Kings', chapters: 25, abbr: '왕하' },
    { id: '1ch', name: '역대상', name_en: '1 Chronicles', chapters: 29, abbr: '대상' },
    { id: '2ch', name: '역대하', name_en: '2 Chronicles', chapters: 36, abbr: '대하' },
    { id: 'ezr', name: '에스라', name_en: 'Ezra', chapters: 10, abbr: '스' },
    { id: 'neh', name: '느헤미야', name_en: 'Nehemiah', chapters: 13, abbr: '느' },
    { id: 'est', name: '에스더', name_en: 'Esther', chapters: 10, abbr: '에' },
    { id: 'job', name: '욥기', name_en: 'Job', chapters: 42, abbr: '욥' },
    { id: 'psa', name: '시편', name_en: 'Psalms', chapters: 150, abbr: '시' },
    { id: 'pro', name: '잠언', name_en: 'Proverbs', chapters: 31, abbr: '잠' },
    { id: 'ecc', name: '전도서', name_en: 'Ecclesiastes', chapters: 12, abbr: '전' },
    { id: 'sng', name: '아가', name_en: 'Song of Solomon', chapters: 8, abbr: '아' },
    { id: 'isa', name: '이사야', name_en: 'Isaiah', chapters: 66, abbr: '사' },
    { id: 'jer', name: '예레미야', name_en: 'Jeremiah', chapters: 52, abbr: '렘' },
    { id: 'lam', name: '예레미야애가', name_en: 'Lamentations', chapters: 5, abbr: '애' },
    { id: 'ezk', name: '에스겔', name_en: 'Ezekiel', chapters: 48, abbr: '겔' },
    { id: 'dan', name: '다니엘', name_en: 'Daniel', chapters: 12, abbr: '단' },
    { id: 'hos', name: '호세아', name_en: 'Hosea', chapters: 14, abbr: '호' },
    { id: 'jol', name: '요엘', name_en: 'Joel', chapters: 3, abbr: '욜' },
    { id: 'amo', name: '아모스', name_en: 'Amos', chapters: 9, abbr: '암' },
    { id: 'oba', name: '오바댜', name_en: 'Obadiah', chapters: 1, abbr: '옵' },
    { id: 'jon', name: '요나', name_en: 'Jonah', chapters: 4, abbr: '욘' },
    { id: 'mic', name: '미가', name_en: 'Micah', chapters: 7, abbr: '미' },
    { id: 'nam', name: '나훔', name_en: 'Nahum', chapters: 3, abbr: '나' },
    { id: 'hab', name: '하박국', name_en: 'Habakkuk', chapters: 3, abbr: '합' },
    { id: 'zep', name: '스바냐', name_en: 'Zephaniah', chapters: 3, abbr: '습' },
    { id: 'hag', name: '학개', name_en: 'Haggai', chapters: 2, abbr: '학' },
    { id: 'zec', name: '스가랴', name_en: 'Zechariah', chapters: 14, abbr: '슥' },
    { id: 'mal', name: '말라기', name_en: 'Malachi', chapters: 4, abbr: '말' }
  ],

  // ==================== 신약 27권 ====================
  new: [
    { id: 'mat', name: '마태복음', name_en: 'Matthew', chapters: 28, abbr: '마' },
    { id: 'mrk', name: '마가복음', name_en: 'Mark', chapters: 16, abbr: '막' },
    { id: 'luk', name: '누가복음', name_en: 'Luke', chapters: 24, abbr: '눅' },
    { id: 'jhn', name: '요한복음', name_en: 'John', chapters: 21, abbr: '요' },
    { id: 'act', name: '사도행전', name_en: 'Acts', chapters: 28, abbr: '행' },
    { id: 'rom', name: '로마서', name_en: 'Romans', chapters: 16, abbr: '롬' },
    { id: '1co', name: '고린도전서', name_en: '1 Corinthians', chapters: 16, abbr: '고전' },
    { id: '2co', name: '고린도후서', name_en: '2 Corinthians', chapters: 13, abbr: '고후' },
    { id: 'gal', name: '갈라디아서', name_en: 'Galatians', chapters: 6, abbr: '갈' },
    { id: 'eph', name: '에베소서', name_en: 'Ephesians', chapters: 6, abbr: '엡' },
    { id: 'php', name: '빌립보서', name_en: 'Philippians', chapters: 4, abbr: '빌' },
    { id: 'col', name: '골로새서', name_en: 'Colossians', chapters: 4, abbr: '골' },
    { id: '1th', name: '데살로니가전서', name_en: '1 Thessalonians', chapters: 5, abbr: '살전' },
    { id: '2th', name: '데살로니가후서', name_en: '2 Thessalonians', chapters: 3, abbr: '살후' },
    { id: '1ti', name: '디모데전서', name_en: '1 Timothy', chapters: 6, abbr: '딤전' },
    { id: '2ti', name: '디모데후서', name_en: '2 Timothy', chapters: 4, abbr: '딤후' },
    { id: 'tit', name: '디도서', name_en: 'Titus', chapters: 3, abbr: '딛' },
    { id: 'phm', name: '빌레몬서', name_en: 'Philemon', chapters: 1, abbr: '몬' },
    { id: 'heb', name: '히브리서', name_en: 'Hebrews', chapters: 13, abbr: '히' },
    { id: 'jas', name: '야고보서', name_en: 'James', chapters: 5, abbr: '약' },
    { id: '1pe', name: '베드로전서', name_en: '1 Peter', chapters: 5, abbr: '벧전' },
    { id: '2pe', name: '베드로후서', name_en: '2 Peter', chapters: 3, abbr: '벧후' },
    { id: '1jn', name: '요한일서', name_en: '1 John', chapters: 5, abbr: '요일' },
    { id: '2jn', name: '요한이서', name_en: '2 John', chapters: 1, abbr: '요이' },
    { id: '3jn', name: '요한삼서', name_en: '3 John', chapters: 1, abbr: '요삼' },
    { id: 'jud', name: '유다서', name_en: 'Jude', chapters: 1, abbr: '유' },
    { id: 'rev', name: '요한계시록', name_en: 'Revelation', chapters: 22, abbr: '계' }
  ]
};

// 책 이름으로 책 정보 찾기
export const findBookByName = (name) => {
  const allBooks = [...bibleBooks.old, ...bibleBooks.new];
  return allBooks.find(book =>
    book.name === name ||
    book.name_en.toLowerCase() === name.toLowerCase() ||
    book.abbr === name
  );
};

// 책 ID로 책 정보 찾기
export const findBookById = (id) => {
  const allBooks = [...bibleBooks.old, ...bibleBooks.new];
  return allBooks.find(book => book.id === id);
};

// 전체 책 목록
export const getAllBooks = () => [...bibleBooks.old, ...bibleBooks.new];

// 성경 통계
export const bibleStats = {
  oldTestament: { books: 39, chapters: 929, verses: 23145 },
  newTestament: { books: 27, chapters: 260, verses: 7957 },
  total: { books: 66, chapters: 1189, verses: 31102 }
};
