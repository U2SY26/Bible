// 성경 66권 데이터 (개역개정)
export const bibleBooks = {
  // ==================== 구약 39권 ====================
  old: [
    // 모세오경 (율법서)
    { id: 'gen', name_ko: '창세기', name_en: 'Genesis', chapters: 50, category: 'pentateuch', category_ko: '모세오경' },
    { id: 'exo', name_ko: '출애굽기', name_en: 'Exodus', chapters: 40, category: 'pentateuch', category_ko: '모세오경' },
    { id: 'lev', name_ko: '레위기', name_en: 'Leviticus', chapters: 27, category: 'pentateuch', category_ko: '모세오경' },
    { id: 'num', name_ko: '민수기', name_en: 'Numbers', chapters: 36, category: 'pentateuch', category_ko: '모세오경' },
    { id: 'deu', name_ko: '신명기', name_en: 'Deuteronomy', chapters: 34, category: 'pentateuch', category_ko: '모세오경' },
    
    // 역사서
    { id: 'jos', name_ko: '여호수아', name_en: 'Joshua', chapters: 24, category: 'history', category_ko: '역사서' },
    { id: 'jdg', name_ko: '사사기', name_en: 'Judges', chapters: 21, category: 'history', category_ko: '역사서' },
    { id: 'rut', name_ko: '룻기', name_en: 'Ruth', chapters: 4, category: 'history', category_ko: '역사서' },
    { id: '1sa', name_ko: '사무엘상', name_en: '1 Samuel', chapters: 31, category: 'history', category_ko: '역사서' },
    { id: '2sa', name_ko: '사무엘하', name_en: '2 Samuel', chapters: 24, category: 'history', category_ko: '역사서' },
    { id: '1ki', name_ko: '열왕기상', name_en: '1 Kings', chapters: 22, category: 'history', category_ko: '역사서' },
    { id: '2ki', name_ko: '열왕기하', name_en: '2 Kings', chapters: 25, category: 'history', category_ko: '역사서' },
    { id: '1ch', name_ko: '역대상', name_en: '1 Chronicles', chapters: 29, category: 'history', category_ko: '역사서' },
    { id: '2ch', name_ko: '역대하', name_en: '2 Chronicles', chapters: 36, category: 'history', category_ko: '역사서' },
    { id: 'ezr', name_ko: '에스라', name_en: 'Ezra', chapters: 10, category: 'history', category_ko: '역사서' },
    { id: 'neh', name_ko: '느헤미야', name_en: 'Nehemiah', chapters: 13, category: 'history', category_ko: '역사서' },
    { id: 'est', name_ko: '에스더', name_en: 'Esther', chapters: 10, category: 'history', category_ko: '역사서' },
    
    // 시가서 (지혜문학)
    { id: 'job', name_ko: '욥기', name_en: 'Job', chapters: 42, category: 'wisdom', category_ko: '시가서' },
    { id: 'psa', name_ko: '시편', name_en: 'Psalms', chapters: 150, category: 'wisdom', category_ko: '시가서' },
    { id: 'pro', name_ko: '잠언', name_en: 'Proverbs', chapters: 31, category: 'wisdom', category_ko: '시가서' },
    { id: 'ecc', name_ko: '전도서', name_en: 'Ecclesiastes', chapters: 12, category: 'wisdom', category_ko: '시가서' },
    { id: 'sng', name_ko: '아가', name_en: 'Song of Solomon', chapters: 8, category: 'wisdom', category_ko: '시가서' },
    
    // 대선지서
    { id: 'isa', name_ko: '이사야', name_en: 'Isaiah', chapters: 66, category: 'major_prophets', category_ko: '대선지서' },
    { id: 'jer', name_ko: '예레미야', name_en: 'Jeremiah', chapters: 52, category: 'major_prophets', category_ko: '대선지서' },
    { id: 'lam', name_ko: '예레미야애가', name_en: 'Lamentations', chapters: 5, category: 'major_prophets', category_ko: '대선지서' },
    { id: 'ezk', name_ko: '에스겔', name_en: 'Ezekiel', chapters: 48, category: 'major_prophets', category_ko: '대선지서' },
    { id: 'dan', name_ko: '다니엘', name_en: 'Daniel', chapters: 12, category: 'major_prophets', category_ko: '대선지서' },
    
    // 소선지서
    { id: 'hos', name_ko: '호세아', name_en: 'Hosea', chapters: 14, category: 'minor_prophets', category_ko: '소선지서' },
    { id: 'jol', name_ko: '요엘', name_en: 'Joel', chapters: 3, category: 'minor_prophets', category_ko: '소선지서' },
    { id: 'amo', name_ko: '아모스', name_en: 'Amos', chapters: 9, category: 'minor_prophets', category_ko: '소선지서' },
    { id: 'oba', name_ko: '오바댜', name_en: 'Obadiah', chapters: 1, category: 'minor_prophets', category_ko: '소선지서' },
    { id: 'jon', name_ko: '요나', name_en: 'Jonah', chapters: 4, category: 'minor_prophets', category_ko: '소선지서' },
    { id: 'mic', name_ko: '미가', name_en: 'Micah', chapters: 7, category: 'minor_prophets', category_ko: '소선지서' },
    { id: 'nah', name_ko: '나훔', name_en: 'Nahum', chapters: 3, category: 'minor_prophets', category_ko: '소선지서' },
    { id: 'hab', name_ko: '하박국', name_en: 'Habakkuk', chapters: 3, category: 'minor_prophets', category_ko: '소선지서' },
    { id: 'zep', name_ko: '스바냐', name_en: 'Zephaniah', chapters: 3, category: 'minor_prophets', category_ko: '소선지서' },
    { id: 'hag', name_ko: '학개', name_en: 'Haggai', chapters: 2, category: 'minor_prophets', category_ko: '소선지서' },
    { id: 'zec', name_ko: '스가랴', name_en: 'Zechariah', chapters: 14, category: 'minor_prophets', category_ko: '소선지서' },
    { id: 'mal', name_ko: '말라기', name_en: 'Malachi', chapters: 4, category: 'minor_prophets', category_ko: '소선지서' },
  ],
  
  // ==================== 신약 27권 ====================
  new: [
    // 복음서
    { id: 'mat', name_ko: '마태복음', name_en: 'Matthew', chapters: 28, category: 'gospels', category_ko: '복음서' },
    { id: 'mrk', name_ko: '마가복음', name_en: 'Mark', chapters: 16, category: 'gospels', category_ko: '복음서' },
    { id: 'luk', name_ko: '누가복음', name_en: 'Luke', chapters: 24, category: 'gospels', category_ko: '복음서' },
    { id: 'jhn', name_ko: '요한복음', name_en: 'John', chapters: 21, category: 'gospels', category_ko: '복음서' },
    
    // 역사서
    { id: 'act', name_ko: '사도행전', name_en: 'Acts', chapters: 28, category: 'history_nt', category_ko: '역사서' },
    
    // 바울서신
    { id: 'rom', name_ko: '로마서', name_en: 'Romans', chapters: 16, category: 'pauline', category_ko: '바울서신' },
    { id: '1co', name_ko: '고린도전서', name_en: '1 Corinthians', chapters: 16, category: 'pauline', category_ko: '바울서신' },
    { id: '2co', name_ko: '고린도후서', name_en: '2 Corinthians', chapters: 13, category: 'pauline', category_ko: '바울서신' },
    { id: 'gal', name_ko: '갈라디아서', name_en: 'Galatians', chapters: 6, category: 'pauline', category_ko: '바울서신' },
    { id: 'eph', name_ko: '에베소서', name_en: 'Ephesians', chapters: 6, category: 'pauline', category_ko: '바울서신' },
    { id: 'php', name_ko: '빌립보서', name_en: 'Philippians', chapters: 4, category: 'pauline', category_ko: '바울서신' },
    { id: 'col', name_ko: '골로새서', name_en: 'Colossians', chapters: 4, category: 'pauline', category_ko: '바울서신' },
    { id: '1th', name_ko: '데살로니가전서', name_en: '1 Thessalonians', chapters: 5, category: 'pauline', category_ko: '바울서신' },
    { id: '2th', name_ko: '데살로니가후서', name_en: '2 Thessalonians', chapters: 3, category: 'pauline', category_ko: '바울서신' },
    { id: '1ti', name_ko: '디모데전서', name_en: '1 Timothy', chapters: 6, category: 'pauline', category_ko: '바울서신' },
    { id: '2ti', name_ko: '디모데후서', name_en: '2 Timothy', chapters: 4, category: 'pauline', category_ko: '바울서신' },
    { id: 'tit', name_ko: '디도서', name_en: 'Titus', chapters: 3, category: 'pauline', category_ko: '바울서신' },
    { id: 'phm', name_ko: '빌레몬서', name_en: 'Philemon', chapters: 1, category: 'pauline', category_ko: '바울서신' },
    
    // 공동서신
    { id: 'heb', name_ko: '히브리서', name_en: 'Hebrews', chapters: 13, category: 'general', category_ko: '공동서신' },
    { id: 'jas', name_ko: '야고보서', name_en: 'James', chapters: 5, category: 'general', category_ko: '공동서신' },
    { id: '1pe', name_ko: '베드로전서', name_en: '1 Peter', chapters: 5, category: 'general', category_ko: '공동서신' },
    { id: '2pe', name_ko: '베드로후서', name_en: '2 Peter', chapters: 3, category: 'general', category_ko: '공동서신' },
    { id: '1jn', name_ko: '요한일서', name_en: '1 John', chapters: 5, category: 'general', category_ko: '공동서신' },
    { id: '2jn', name_ko: '요한이서', name_en: '2 John', chapters: 1, category: 'general', category_ko: '공동서신' },
    { id: '3jn', name_ko: '요한삼서', name_en: '3 John', chapters: 1, category: 'general', category_ko: '공동서신' },
    { id: 'jud', name_ko: '유다서', name_en: 'Jude', chapters: 1, category: 'general', category_ko: '공동서신' },
    
    // 예언서
    { id: 'rev', name_ko: '요한계시록', name_en: 'Revelation', chapters: 22, category: 'prophecy_nt', category_ko: '예언서' },
  ]
};

// 성경 카테고리 색상
export const categoryColors = {
  pentateuch: { bg: '#8B4513', border: '#A0522D', name_ko: '모세오경', name_en: 'Pentateuch' },
  history: { bg: '#2E8B57', border: '#3CB371', name_ko: '역사서', name_en: 'Historical' },
  wisdom: { bg: '#DAA520', border: '#FFD700', name_ko: '시가서', name_en: 'Wisdom' },
  major_prophets: { bg: '#4169E1', border: '#6495ED', name_ko: '대선지서', name_en: 'Major Prophets' },
  minor_prophets: { bg: '#6A5ACD', border: '#9370DB', name_ko: '소선지서', name_en: 'Minor Prophets' },
  gospels: { bg: '#DC143C', border: '#FF6B6B', name_ko: '복음서', name_en: 'Gospels' },
  history_nt: { bg: '#FF8C00', border: '#FFA500', name_ko: '역사서(신약)', name_en: 'Acts' },
  pauline: { bg: '#9932CC', border: '#BA55D3', name_ko: '바울서신', name_en: 'Pauline Epistles' },
  general: { bg: '#20B2AA', border: '#48D1CC', name_ko: '공동서신', name_en: 'General Epistles' },
  prophecy_nt: { bg: '#8B0000', border: '#B22222', name_ko: '예언서(신약)', name_en: 'Prophecy' },
};

// 전체 성경 목록 (순서대로)
export const allBooks = [...bibleBooks.old, ...bibleBooks.new];

// ID로 성경 찾기
export const getBookById = (id) => allBooks.find(b => b.id === id);

// 카테고리별 성경 목록
export const getBooksByCategory = (category) => allBooks.filter(b => b.category === category);
