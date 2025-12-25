// 새찬송가 데이터 (인물/사건 관련)
export const hymns = [
  // 하나님 관련
  { id: 1, number: 1, title_ko: '만복의 근원 하나님', title_en: 'Praise God from Whom All Blessings Flow', relatedTo: ['god'], theme: '찬양' },
  { id: 2, number: 21, title_ko: '다 찬양하여라', title_en: 'Praise to the Lord, the Almighty', relatedTo: ['god'], theme: '찬양' },
  { id: 3, number: 27, title_ko: '주 하나님 지으신 모든 세계', title_en: 'How Great Thou Art', relatedTo: ['god', 'creation'], theme: '창조' },
  { id: 4, number: 30, title_ko: '만왕의 왕 내 주께서', title_en: 'Crown Him with Many Crowns', relatedTo: ['god', 'jesus'], theme: '왕권' },
  
  // 예수님 관련
  { id: 5, number: 78, title_ko: '내 주는 강한 성이요', title_en: 'A Mighty Fortress Is Our God', relatedTo: ['god', 'jesus'], theme: '보호' },
  { id: 6, number: 79, title_ko: '주 여호와는 나의 목자시니', title_en: 'The Lord Is My Shepherd', relatedTo: ['god', 'david'], theme: '목자', verses: ['시편 23편'] },
  { id: 7, number: 83, title_ko: '내 영혼아 찬양하라', title_en: 'Praise My Soul the King of Heaven', relatedTo: ['god', 'david'], theme: '찬양' },
  { id: 8, number: 94, title_ko: '만유의 주재', title_en: 'All Hail the Power of Jesus Name', relatedTo: ['jesus'], theme: '왕권' },
  { id: 9, number: 100, title_ko: '구주와 함께 나 죽었으니', title_en: 'My Old Self Has Been Crucified', relatedTo: ['jesus', 'paul'], theme: '구속' },
  { id: 10, number: 102, title_ko: '십자가 그 사랑', title_en: 'The Old Rugged Cross', relatedTo: ['jesus', 'crucifixion'], theme: '십자가' },
  { id: 11, number: 115, title_ko: '주 예수 넓은 품에', title_en: 'Safe in the Arms of Jesus', relatedTo: ['jesus'], theme: '안식' },
  { id: 12, number: 122, title_ko: '고요한 밤 거룩한 밤', title_en: 'Silent Night, Holy Night', relatedTo: ['jesus', 'mary', 'nativity'], theme: '성탄' },
  { id: 13, number: 136, title_ko: '기쁘다 구주 오셨네', title_en: 'Joy to the World', relatedTo: ['jesus', 'nativity'], theme: '성탄' },
  { id: 14, number: 143, title_ko: '할렐루야 우리 예수', title_en: 'Hallelujah What a Savior', relatedTo: ['jesus', 'crucifixion', 'resurrection'], theme: '부활' },
  { id: 15, number: 149, title_ko: '비바람이 칠 때와', title_en: 'Be Still My Soul', relatedTo: ['jesus', 'peace_storm'], theme: '평안' },
  { id: 16, number: 150, title_ko: '예수 부활했으니', title_en: 'Christ the Lord Is Risen Today', relatedTo: ['jesus', 'resurrection'], theme: '부활' },
  { id: 17, number: 153, title_ko: '죽음의 권세가 멸해지고', title_en: 'Up from the Grave He Arose', relatedTo: ['jesus', 'resurrection'], theme: '부활' },
  { id: 18, number: 160, title_ko: '오늘 주님 승천하여', title_en: 'Hail the Day That Sees Him Rise', relatedTo: ['jesus', 'ascension'], theme: '승천' },
  
  // 성령 관련
  { id: 19, number: 172, title_ko: '오소서 오소서', title_en: 'Come Holy Spirit', relatedTo: ['holy_spirit', 'pentecost'], theme: '성령' },
  { id: 20, number: 175, title_ko: '성령이여 강림하사', title_en: 'Come Holy Spirit Heavenly Dove', relatedTo: ['holy_spirit'], theme: '성령' },
  { id: 21, number: 180, title_ko: '오 신령한 사랑', title_en: 'Love Divine All Loves Excelling', relatedTo: ['holy_spirit', 'god'], theme: '사랑' },
  
  // 구약 인물 관련
  { id: 22, number: 188, title_ko: '아브라함의 하나님', title_en: 'The God of Abraham Praise', relatedTo: ['abraham', 'god'], theme: '언약' },
  { id: 23, number: 205, title_ko: '양 아흔 아홉 마리', title_en: 'The Ninety and Nine', relatedTo: ['jesus', 'lost_sheep'], theme: '목자' },
  { id: 24, number: 282, title_ko: '모세와 이스라엘', title_en: 'When Israel Was in Egypt Land', relatedTo: ['moses', 'exodus_event'], theme: '출애굽' },
  { id: 25, number: 288, title_ko: '예수는 나의 힘이요', title_en: 'Jesus Is My Strength', relatedTo: ['jesus', 'david', 'samson'], theme: '능력' },
  { id: 26, number: 293, title_ko: '주의 친절한 팔에 안기세', title_en: 'Leaning on the Everlasting Arms', relatedTo: ['god', 'jacob'], theme: '의지' },
  
  // 다니엘 관련
  { id: 27, number: 295, title_ko: '믿음으로 사는 자', title_en: 'Living by Faith', relatedTo: ['daniel', 'abraham', 'faith_heroes'], theme: '믿음' },
  { id: 28, number: 354, title_ko: '다니엘처럼 나도', title_en: 'Dare to Be a Daniel', relatedTo: ['daniel', 'lions_den'], theme: '용기' },
  
  // 사도 관련
  { id: 29, number: 365, title_ko: '굳세어라 베드로', title_en: 'Be Strong Like Peter', relatedTo: ['peter'], theme: '믿음' },
  { id: 30, number: 430, title_ko: '나의 사랑하는 책', title_en: 'Holy Bible Book Divine', relatedTo: ['bible'], theme: '말씀' },
  
  // 신앙생활
  { id: 31, number: 440, title_ko: '태산을 넘어 험곡에 가도', title_en: 'God Will Take Care of You', relatedTo: ['god', 'elijah'], theme: '섭리' },
  { id: 32, number: 453, title_ko: '새벽부터 우리', title_en: 'Morning Has Broken', relatedTo: ['god', 'creation'], theme: '창조' },
  { id: 33, number: 460, title_ko: '지금까지 지내온 것', title_en: 'Come Thou Fount', relatedTo: ['god', 'samuel'], theme: '은혜' },
  { id: 34, number: 461, title_ko: '에벤에셀 찬양하세', title_en: 'O God Our Help in Ages Past', relatedTo: ['samuel', 'ebenezer'], theme: '돌무더기' },
  
  // 노아 관련
  { id: 35, number: 527, title_ko: '하나님의 약속을 믿었던 노아', title_en: 'Noah Believed Gods Promise', relatedTo: ['noah', 'flood', 'rainbow_covenant'], theme: '언약' },
  
  // 여호수아 관련  
  { id: 36, number: 384, title_ko: '여호수아처럼', title_en: 'Like Joshua', relatedTo: ['joshua', 'jericho'], theme: '정복' },
  
  // 룻 관련
  { id: 37, number: 405, title_ko: '나의 갈 길 다 가도록', title_en: 'All the Way My Savior Leads Me', relatedTo: ['ruth', 'god'], theme: '인도' },
  
  // 엘리야 관련
  { id: 38, number: 542, title_ko: '삼년 반 동안을', title_en: 'For Three and a Half Years', relatedTo: ['elijah', 'carmel'], theme: '기도' },
  
  // 요나 관련
  { id: 39, number: 496, title_ko: '구원으로 인도하시는', title_en: 'Rescue the Perishing', relatedTo: ['jonah', 'nineveh'], theme: '구원' },
  
  // 세례 요한 관련
  { id: 40, number: 129, title_ko: '주 예수가 물세례 받으시고', title_en: 'When Jesus Came to Jordan', relatedTo: ['jesus', 'john_baptist', 'baptism_jesus'], theme: '세례' },
  
  // 바울 관련
  { id: 41, number: 310, title_ko: '예수를 나의 구주 삼고', title_en: 'Blessed Assurance', relatedTo: ['paul', 'jesus'], theme: '확신' },
  { id: 42, number: 320, title_ko: '내 평생 소원 이것뿐', title_en: 'My Desire', relatedTo: ['paul'], theme: '헌신' },
  
  // 스데반 관련
  { id: 43, number: 400, title_ko: '순교자의 피', title_en: 'Blood of the Martyrs', relatedTo: ['stephen', 'martyrdom'], theme: '순교' },
];

// 관련 찬송가 찾기
export const getHymnsByCharacter = (characterId) => {
  return hymns.filter(h => h.relatedTo.includes(characterId));
};

// 관련 찬송가 찾기 (사건)
export const getHymnsByEvent = (eventId) => {
  return hymns.filter(h => h.relatedTo.includes(eventId));
};

// 테마별 찬송가
export const getHymnsByTheme = (theme) => {
  return hymns.filter(h => h.theme === theme);
};
