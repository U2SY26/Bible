// 출애굽 시대 인물들
export const exodusCharacters = [
  // === 모세의 가계 ===
  {
    id: 'amram',
    name_ko: '아므람',
    name_en: 'Amram',
    testament: 'old',
    era: 'exodus',
    importance: 4,
    description_ko: '레위의 후손, 모세와 아론, 미리암의 아버지.',
    description_en: 'Descendant of Levi, father of Moses, Aaron, and Miriam.',
    labels: ['족장', '레위인'],
    books: ['exodus', 'numbers']
  },
  {
    id: 'jochebed',
    name_ko: '요게벳',
    name_en: 'Jochebed',
    testament: 'old',
    era: 'exodus',
    importance: 5,
    description_ko: '아므람의 아내, 모세와 아론, 미리암의 어머니. 모세를 갈대 상자에 띄움.',
    description_en: 'Wife of Amram, mother of Moses, Aaron, and Miriam. Put Moses in basket.',
    labels: ['어머니', '레위인'],
    books: ['exodus']
  },
  {
    id: 'miriam',
    name_ko: '미리암',
    name_en: 'Miriam',
    testament: 'old',
    era: 'exodus',
    importance: 7,
    description_ko: '모세와 아론의 누이. 여선지자, 홍해 찬양을 이끔.',
    description_en: 'Sister of Moses and Aaron. Prophetess who led praise after Red Sea crossing.',
    labels: ['선지자', '지도자'],
    books: ['exodus', 'numbers', 'micah'],
    verses: [
      { ref: '출애굽기 15:20', text_ko: '아론의 누이 선지자 미리암이 손에 소고를 잡으매', text_en: 'Then Miriam the prophet, Aaron\'s sister, took a timbrel in her hand.' }
    ]
  },
  {
    id: 'aaron',
    name_ko: '아론',
    name_en: 'Aaron',
    testament: 'old',
    era: 'exodus',
    importance: 9,
    description_ko: '모세의 형, 이스라엘의 첫 대제사장. 금송아지 사건의 주역.',
    description_en: 'Moses\' brother, Israel\'s first high priest. Made golden calf.',
    labels: ['대제사장', '레위인', '지도자'],
    books: ['exodus', 'leviticus', 'numbers', 'hebrews'],
    verses: [
      { ref: '출애굽기 28:1', text_ko: '이스라엘 자손 중에서 네 형 아론과 그 아들들을 네게로 나아오게 하여 제사장 직분을 행하게 하라', text_en: 'Have Aaron your brother brought to you from among the Israelites, to serve as priest.' }
    ]
  },
  {
    id: 'zipporah',
    name_ko: '십보라',
    name_en: 'Zipporah',
    testament: 'old',
    era: 'exodus',
    importance: 5,
    description_ko: '미디안 제사장 이드로의 딸, 모세의 아내.',
    description_en: 'Daughter of Jethro, priest of Midian. Wife of Moses.',
    labels: ['아내', '미디안인'],
    books: ['exodus']
  },
  {
    id: 'jethro',
    name_ko: '이드로',
    name_en: 'Jethro',
    testament: 'old',
    era: 'exodus',
    importance: 6,
    description_ko: '미디안의 제사장, 모세의 장인. 모세에게 지도력 조언을 함.',
    description_en: 'Priest of Midian, Moses\' father-in-law. Advised Moses on leadership.',
    labels: ['제사장', '장인', '미디안인'],
    books: ['exodus'],
    verses: [
      { ref: '출애굽기 18:17-18', text_ko: '이드로가 이르되 네가 하는 것이 옳지 못하도다 너와 함께 한 이 백성이 지치리라', text_en: 'Moses\' father-in-law replied, "What you are doing is not good. You will wear yourself out."' }
    ]
  },
  {
    id: 'gershom',
    name_ko: '게르솜',
    name_en: 'Gershom',
    testament: 'old',
    era: 'exodus',
    importance: 3,
    description_ko: '모세와 십보라의 장남. 이름은 "거류민"이라는 뜻.',
    description_en: 'Firstborn son of Moses and Zipporah. Name means "foreigner".',
    labels: ['모세의 아들'],
    books: ['exodus']
  },
  {
    id: 'eliezer_moses',
    name_ko: '엘리에셀 (모세의 아들)',
    name_en: 'Eliezer (Moses\' son)',
    testament: 'old',
    era: 'exodus',
    importance: 2,
    description_ko: '모세와 십보라의 둘째 아들.',
    description_en: 'Second son of Moses and Zipporah.',
    labels: ['모세의 아들'],
    books: ['exodus']
  },
  // === 이집트 인물들 ===
  {
    id: 'pharaoh_exodus',
    name_ko: '바로 (출애굽 시대)',
    name_en: 'Pharaoh (Exodus)',
    testament: 'old',
    era: 'exodus',
    importance: 8,
    description_ko: '이스라엘을 노예로 삼은 왕. 열 가지 재앙을 받고 백성을 보냄.',
    description_en: 'King who enslaved Israel. Released them after ten plagues.',
    labels: ['왕', '이집트', '대적'],
    books: ['exodus']
  },
  {
    id: 'pharaoh_daughter',
    name_ko: '바로의 딸',
    name_en: 'Pharaoh\'s Daughter',
    testament: 'old',
    era: 'exodus',
    importance: 5,
    description_ko: '나일강에서 모세를 발견하고 왕자로 키움.',
    description_en: 'Found Moses in the Nile and raised him as her son.',
    labels: ['공주', '이집트'],
    books: ['exodus', 'hebrews']
  },
  // === 아론의 가계 ===
  {
    id: 'nadab',
    name_ko: '나답',
    name_en: 'Nadab',
    testament: 'old',
    era: 'exodus',
    importance: 4,
    description_ko: '아론의 장남. 이상한 불을 드려 여호와께 죽임을 당함.',
    description_en: 'Aaron\'s firstborn. Killed by God for offering unauthorized fire.',
    labels: ['제사장', '아론의 아들'],
    books: ['leviticus', 'numbers']
  },
  {
    id: 'abihu',
    name_ko: '아비후',
    name_en: 'Abihu',
    testament: 'old',
    era: 'exodus',
    importance: 4,
    description_ko: '아론의 둘째 아들. 나답과 함께 이상한 불을 드려 죽임을 당함.',
    description_en: 'Aaron\'s second son. Killed with Nadab for offering unauthorized fire.',
    labels: ['제사장', '아론의 아들'],
    books: ['leviticus', 'numbers']
  },
  {
    id: 'eleazar',
    name_ko: '엘르아살',
    name_en: 'Eleazar',
    testament: 'old',
    era: 'exodus',
    importance: 6,
    description_ko: '아론의 셋째 아들. 아론 후의 대제사장.',
    description_en: 'Aaron\'s third son. Became high priest after Aaron.',
    labels: ['대제사장', '아론의 아들'],
    books: ['numbers', 'joshua']
  },
  {
    id: 'ithamar',
    name_ko: '이다말',
    name_en: 'Ithamar',
    testament: 'old',
    era: 'exodus',
    importance: 4,
    description_ko: '아론의 막내 아들. 성막 건축 감독.',
    description_en: 'Aaron\'s youngest son. Oversaw tabernacle construction.',
    labels: ['제사장', '아론의 아들'],
    books: ['exodus', 'numbers']
  },
  {
    id: 'phinehas',
    name_ko: '비느하스',
    name_en: 'Phinehas',
    testament: 'old',
    era: 'exodus',
    importance: 6,
    description_ko: '엘르아살의 아들. 열심으로 이스라엘의 우상숭배를 막음.',
    description_en: 'Son of Eleazar. Zealously stopped Israel\'s idolatry.',
    labels: ['제사장', '열심'],
    books: ['numbers', 'joshua', 'judges'],
    verses: [
      { ref: '민수기 25:11', text_ko: '비느하스가 나의 질투심으로 질투하여 이스라엘 자손을 위하여 속죄하였도다', text_en: 'Phinehas has turned my anger away by being as zealous as I am.' }
    ]
  },
  // === 광야 세대 지도자들 ===
  {
    id: 'joshua',
    name_ko: '여호수아',
    name_en: 'Joshua',
    testament: 'old',
    era: 'conquest',
    importance: 9,
    description_ko: '눈의 아들, 모세의 후계자. 이스라엘을 가나안 정복으로 이끔.',
    description_en: 'Son of Nun, Moses\' successor. Led Israel in conquering Canaan.',
    labels: ['지도자', '정복자', '신실한 자'],
    books: ['exodus', 'numbers', 'deuteronomy', 'joshua'],
    verses: [
      { ref: '여호수아 1:9', text_ko: '강하고 담대하라 두려워하지 말며 놀라지 말라 네가 어디로 가든지 네 하나님 여호와가 너와 함께 하느니라', text_en: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.' }
    ]
  },
  {
    id: 'caleb',
    name_ko: '갈렙',
    name_en: 'Caleb',
    testament: 'old',
    era: 'exodus',
    importance: 7,
    description_ko: '유다 지파, 여분네의 아들. 여호수아와 함께 가나안을 신뢰한 정탐꾼.',
    description_en: 'Of tribe of Judah, son of Jephunneh. Faithful spy with Joshua.',
    labels: ['신실한 자', '정탐꾼', '용사'],
    books: ['numbers', 'joshua'],
    verses: [
      { ref: '민수기 14:24', text_ko: '오직 내 종 갈렙은 그의 마음이 다르고 나를 온전히 따랐으니', text_en: 'But my servant Caleb has a different spirit and follows me wholeheartedly.' }
    ]
  },
  {
    id: 'hur',
    name_ko: '훌',
    name_en: 'Hur',
    testament: 'old',
    era: 'exodus',
    importance: 4,
    description_ko: '아론과 함께 모세의 팔을 들어 아말렉과의 전투에서 승리하게 함.',
    description_en: 'Held up Moses\' arms with Aaron during battle against Amalek.',
    labels: ['지도자'],
    books: ['exodus']
  },
  {
    id: 'bezalel',
    name_ko: '브살렐',
    name_en: 'Bezalel',
    testament: 'old',
    era: 'exodus',
    importance: 5,
    description_ko: '유다 지파의 장인. 성령 충만하여 성막 건축을 주도함.',
    description_en: 'Craftsman of Judah. Filled with Spirit to lead tabernacle construction.',
    labels: ['장인', '성막 건축'],
    books: ['exodus']
  },
  {
    id: 'oholiab',
    name_ko: '오홀리압',
    name_en: 'Oholiab',
    testament: 'old',
    era: 'exodus',
    importance: 4,
    description_ko: '단 지파의 장인. 브살렐과 함께 성막 건축.',
    description_en: 'Craftsman of Dan. Assisted Bezalel in tabernacle construction.',
    labels: ['장인', '성막 건축'],
    books: ['exodus']
  },
  {
    id: 'korah',
    name_ko: '고라',
    name_en: 'Korah',
    testament: 'old',
    era: 'exodus',
    importance: 5,
    description_ko: '레위인, 모세와 아론의 권위에 반역하다 땅이 갈라져 죽음.',
    description_en: 'Levite who rebelled against Moses and Aaron. Swallowed by earth.',
    labels: ['반역자', '레위인'],
    books: ['numbers', 'jude']
  },
  {
    id: 'dathan',
    name_ko: '다단',
    name_en: 'Dathan',
    testament: 'old',
    era: 'exodus',
    importance: 3,
    description_ko: '르우벤 자손, 고라와 함께 모세에게 반역함.',
    description_en: 'Reubenite who rebelled with Korah against Moses.',
    labels: ['반역자'],
    books: ['numbers']
  },
  {
    id: 'abiram',
    name_ko: '아비람',
    name_en: 'Abiram',
    testament: 'old',
    era: 'exodus',
    importance: 3,
    description_ko: '르우벤 자손, 고라와 다단과 함께 모세에게 반역함.',
    description_en: 'Reubenite who rebelled with Korah and Dathan.',
    labels: ['반역자'],
    books: ['numbers']
  },
  // === 발람 이야기 ===
  {
    id: 'balaam',
    name_ko: '발람',
    name_en: 'Balaam',
    testament: 'old',
    era: 'exodus',
    importance: 6,
    description_ko: '메소포타미아의 선지자. 이스라엘을 저주하려다 축복함.',
    description_en: 'Prophet from Mesopotamia. Tried to curse Israel but blessed them.',
    labels: ['선지자', '이방인'],
    books: ['numbers', '2peter', 'jude', 'revelation'],
    verses: [
      { ref: '민수기 24:17', text_ko: '한 별이 야곱에게서 나오며 한 규가 이스라엘에게서 일어나리라', text_en: 'A star will come out of Jacob; a scepter will rise out of Israel.' }
    ]
  },
  {
    id: 'balak',
    name_ko: '발락',
    name_en: 'Balak',
    testament: 'old',
    era: 'exodus',
    importance: 4,
    description_ko: '모압 왕. 발람을 고용하여 이스라엘을 저주하려 함.',
    description_en: 'King of Moab. Hired Balaam to curse Israel.',
    labels: ['왕', '모압'],
    books: ['numbers', 'joshua', 'micah']
  },
  // === 모압과 에돔 ===
  {
    id: 'og',
    name_ko: '옥',
    name_en: 'Og',
    testament: 'old',
    era: 'exodus',
    importance: 4,
    description_ko: '바산 왕, 거인. 이스라엘에게 패배함.',
    description_en: 'King of Bashan, a giant. Defeated by Israel.',
    labels: ['왕', '거인'],
    books: ['numbers', 'deuteronomy']
  },
  {
    id: 'sihon',
    name_ko: '시혼',
    name_en: 'Sihon',
    testament: 'old',
    era: 'exodus',
    importance: 4,
    description_ko: '아모리 왕. 이스라엘의 통과를 막다가 패배함.',
    description_en: 'King of the Amorites. Defeated when he opposed Israel\'s passage.',
    labels: ['왕', '아모리인'],
    books: ['numbers', 'deuteronomy']
  }
];
