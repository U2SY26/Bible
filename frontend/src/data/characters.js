// 성경 인물 데이터 (확장 버전)
export const characters = [
  // ==================== 삼위일체 ====================
  { 
    id: 'god', 
    name_ko: '하나님', 
    name_en: 'God', 
    testament: 'both', 
    importance: 10,
    books: ['gen', 'exo', 'lev', 'num', 'deu', 'isa', 'jer', 'ezk', 'psa', 'jhn', 'rev'],
    description_ko: '전지전능하신 창조주 하나님. 모든 것의 근원이시며 성경 전체의 중심이 되시는 분.',
    description_en: 'The Almighty Creator God. The source of all things and the center of the entire Bible.',
    verses: [
      { ref: '창세기 1:1', text_ko: '태초에 하나님이 천지를 창조하시니라', text_en: 'In the beginning God created the heavens and the earth' },
      { ref: '출애굽기 3:14', text_ko: '나는 스스로 있는 자이니라', text_en: 'I AM WHO I AM' },
      { ref: '이사야 40:28', text_ko: '영원하신 하나님 여호와, 땅 끝까지 창조하신 이', text_en: 'The LORD is the everlasting God, the Creator of the ends of the earth' }
    ],
    labels: ['창조주', '전능자', '여호와', 'Creator', 'Almighty', 'YHWH'],
    era: 'eternal',
    location: '천국',
    hymns: [1, 21, 27, 30, 78, 79]
  },
  
  { 
    id: 'jesus', 
    name_ko: '예수 그리스도', 
    name_en: 'Jesus Christ', 
    testament: 'new', 
    importance: 10,
    books: ['mat', 'mrk', 'luk', 'jhn', 'act', 'rom', 'heb', 'rev'],
    description_ko: '하나님의 아들, 인류의 구원자. 동정녀 마리아에게서 태어나 십자가에서 죽으시고 부활하심.',
    description_en: 'Son of God, Savior of humanity. Born of the Virgin Mary, crucified and resurrected.',
    verses: [
      { ref: '요한복음 3:16', text_ko: '하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니', text_en: 'For God so loved the world that he gave his one and only Son' },
      { ref: '요한복음 14:6', text_ko: '내가 곧 길이요 진리요 생명이니', text_en: 'I am the way and the truth and the life' },
      { ref: '빌립보서 2:10-11', text_ko: '하늘에 있는 자들과 땅에 있는 자들과 땅 아래에 있는 자들로 모든 무릎을 예수의 이름에 꿇게 하시고', text_en: 'At the name of Jesus every knee should bow' }
    ],
    labels: ['메시아', '구세주', '어린양', '인자', 'Messiah', 'Savior', 'Lamb', 'Son of Man'],
    era: 'new_testament',
    location: '베들레헴, 나사렛, 예루살렘',
    hymns: [94, 100, 102, 115, 122, 136, 143, 150, 153, 160]
  },

  { 
    id: 'holy_spirit', 
    name_ko: '성령', 
    name_en: 'Holy Spirit', 
    testament: 'both', 
    importance: 9,
    books: ['gen', 'jdg', 'isa', 'ezk', 'jol', 'act', '1co', 'gal', 'eph'],
    description_ko: '삼위일체의 제3위. 믿는 자들 안에 거하시며 인도하시는 하나님의 영.',
    description_en: 'The third person of the Trinity. The Spirit of God who dwells in and guides believers.',
    verses: [
      { ref: '사도행전 2:4', text_ko: '그들이 다 성령의 충만함을 받고', text_en: 'All of them were filled with the Holy Spirit' },
      { ref: '요한복음 14:26', text_ko: '보혜사 곧 아버지께서 내 이름으로 보내실 성령', text_en: 'The Advocate, the Holy Spirit, whom the Father will send in my name' },
      { ref: '갈라디아서 5:22-23', text_ko: '성령의 열매는 사랑과 희락과 화평이요', text_en: 'The fruit of the Spirit is love, joy, peace' }
    ],
    labels: ['보혜사', '하나님의 영', '진리의 영', 'Advocate', 'Spirit of Truth'],
    era: 'eternal',
    location: '어디나',
    hymns: [172, 175, 180]
  },

  // ==================== 창세기 인물 ====================
  { 
    id: 'adam', 
    name_ko: '아담', 
    name_en: 'Adam', 
    testament: 'old', 
    importance: 8,
    books: ['gen', 'rom', '1co'],
    description_ko: '하나님이 흙으로 지으신 최초의 인간. 에덴동산에서 하와와 함께 살았으나 선악과를 먹고 타락함.',
    description_en: 'The first human created by God from dust. Lived in Eden with Eve but fell by eating the forbidden fruit.',
    verses: [
      { ref: '창세기 2:7', text_ko: '여호와 하나님이 땅의 흙으로 사람을 지으시고', text_en: 'The LORD God formed a man from the dust of the ground' },
      { ref: '창세기 3:19', text_ko: '네가 흙이니 흙으로 돌아갈 것이니라', text_en: 'For dust you are and to dust you will return' },
      { ref: '로마서 5:12', text_ko: '한 사람으로 말미암아 죄가 세상에 들어오고', text_en: 'Sin entered the world through one man' }
    ],
    labels: ['최초의 인간', '에덴', 'First Man', 'Eden'],
    era: 'creation',
    location: '에덴동산',
    hymns: [27]
  },

  { 
    id: 'eve', 
    name_ko: '하와', 
    name_en: 'Eve', 
    testament: 'old', 
    importance: 7,
    books: ['gen', '2co', '1ti'],
    description_ko: '아담의 갈비뼈로 만들어진 최초의 여성. 뱀의 유혹에 넘어가 선악과를 먹음.',
    description_en: 'The first woman, created from Adam\'s rib. Deceived by the serpent to eat the forbidden fruit.',
    verses: [
      { ref: '창세기 2:22', text_ko: '여호와 하나님이 아담에게서 취하신 그 갈비뼈로 여자를 만드시고', text_en: 'The LORD God made a woman from the rib he had taken out of the man' },
      { ref: '창세기 3:20', text_ko: '아담이 그의 아내의 이름을 하와라 불렀으니', text_en: 'Adam named his wife Eve' }
    ],
    labels: ['최초의 여성', '생명', 'First Woman', 'Life'],
    era: 'creation',
    location: '에덴동산',
    hymns: []
  },

  { 
    id: 'cain', 
    name_ko: '가인', 
    name_en: 'Cain', 
    testament: 'old', 
    importance: 5,
    books: ['gen', 'heb', '1jn', 'jud'],
    description_ko: '아담과 하와의 첫째 아들. 동생 아벨을 질투하여 살해한 최초의 살인자.',
    description_en: 'First son of Adam and Eve. The first murderer who killed his brother Abel out of jealousy.',
    verses: [
      { ref: '창세기 4:8', text_ko: '가인이 그의 아우 아벨을 쳐죽이니라', text_en: 'Cain attacked his brother Abel and killed him' },
      { ref: '요한일서 3:12', text_ko: '가인 같이 하지 말라 그는 악한 자에게 속하여', text_en: 'Do not be like Cain, who belonged to the evil one' }
    ],
    labels: ['최초의 살인자', 'First Murderer'],
    era: 'creation',
    location: '에덴 동쪽, 놋 땅',
    hymns: []
  },

  { 
    id: 'abel', 
    name_ko: '아벨', 
    name_en: 'Abel', 
    testament: 'old', 
    importance: 5,
    books: ['gen', 'mat', 'heb'],
    description_ko: '아담과 하와의 둘째 아들. 하나님께 첫 양을 드린 의로운 자로 형 가인에게 살해됨.',
    description_en: 'Second son of Adam and Eve. A righteous man who offered the firstborn of his flock, killed by Cain.',
    verses: [
      { ref: '창세기 4:4', text_ko: '아벨은 자기도 양의 첫 새끼와 그 기름으로 드렸더니', text_en: 'Abel also brought an offering—fat portions from the firstborn of his flock' },
      { ref: '히브리서 11:4', text_ko: '믿음으로 아벨은 가인보다 더 나은 제사를 드림으로', text_en: 'By faith Abel brought God a better offering than Cain did' }
    ],
    labels: ['의로운 자', '양치기', 'Righteous', 'Shepherd'],
    era: 'creation',
    location: '에덴 동쪽',
    hymns: []
  },

  { 
    id: 'enoch', 
    name_ko: '에녹', 
    name_en: 'Enoch', 
    testament: 'old', 
    importance: 5,
    books: ['gen', 'heb', 'jud'],
    description_ko: '아담의 7대손. 하나님과 동행하다 죽지 않고 하늘로 옮겨감.',
    description_en: 'Seventh from Adam. Walked with God and was taken to heaven without dying.',
    verses: [
      { ref: '창세기 5:24', text_ko: '에녹이 하나님과 동행하더니 하나님이 그를 데려가시므로', text_en: 'Enoch walked faithfully with God; then he was no more, because God took him away' },
      { ref: '히브리서 11:5', text_ko: '믿음으로 에녹은 죽음을 보지 않고 옮겨졌으니', text_en: 'By faith Enoch was taken from this life, so that he did not experience death' }
    ],
    labels: ['하나님과 동행', '승천', 'Walked with God', 'Translated'],
    era: 'creation',
    location: '?',
    hymns: []
  },

  { 
    id: 'methuselah', 
    name_ko: '므두셀라', 
    name_en: 'Methuselah', 
    testament: 'old', 
    importance: 4,
    books: ['gen', 'luk'],
    description_ko: '에녹의 아들. 성경에서 가장 오래 산 사람(969세).',
    description_en: 'Son of Enoch. Lived longer than anyone else in the Bible (969 years).',
    verses: [
      { ref: '창세기 5:27', text_ko: '므두셀라는 구백육십구 세를 살고 죽었더라', text_en: 'Altogether, Methuselah lived a total of 969 years, and then he died' }
    ],
    labels: ['최장수', 'Longest Lived'],
    era: 'creation',
    location: '?',
    hymns: []
  },

  { 
    id: 'noah', 
    name_ko: '노아', 
    name_en: 'Noah', 
    testament: 'old', 
    importance: 8,
    books: ['gen', 'isa', 'ezk', 'mat', 'heb', '1pe', '2pe'],
    description_ko: '홍수 심판에서 방주를 지어 가족과 동물들을 구한 의인. 하나님과 무지개 언약을 맺음.',
    description_en: 'Righteous man who built the ark to save his family and animals from the flood. Made the rainbow covenant with God.',
    verses: [
      { ref: '창세기 6:9', text_ko: '노아는 의인이요 당대에 완전한 자라', text_en: 'Noah was a righteous man, blameless among the people of his time' },
      { ref: '창세기 9:13', text_ko: '내가 내 무지개를 구름 속에 두었나니', text_en: 'I have set my rainbow in the clouds' },
      { ref: '히브리서 11:7', text_ko: '믿음으로 노아는 아직 보이지 않는 일에 경고하심을 받아', text_en: 'By faith Noah, when warned about things not yet seen' }
    ],
    labels: ['방주', '홍수', '무지개 언약', 'Ark', 'Flood', 'Rainbow Covenant'],
    era: 'flood',
    location: '아라랏산',
    hymns: [527]
  },

  { 
    id: 'shem', 
    name_ko: '셈', 
    name_en: 'Shem', 
    testament: 'old', 
    importance: 4,
    books: ['gen', 'luk'],
    description_ko: '노아의 세 아들 중 하나. 셈족(유대인, 아랍인 등)의 조상.',
    description_en: 'One of Noah\'s three sons. Ancestor of the Semitic peoples (Jews, Arabs, etc.).',
    verses: [
      { ref: '창세기 9:26', text_ko: '셈의 하나님 여호와를 찬송하리로다', text_en: 'Praise be to the LORD, the God of Shem!' }
    ],
    labels: ['셈족의 조상', 'Semitic Ancestor'],
    era: 'flood',
    location: '아라랏산',
    hymns: []
  },

  // ==================== 족장들 ====================
  { 
    id: 'abraham', 
    name_ko: '아브라함', 
    name_en: 'Abraham', 
    testament: 'old', 
    importance: 9,
    books: ['gen', 'exo', 'isa', 'mat', 'luk', 'jhn', 'rom', 'gal', 'heb', 'jas'],
    description_ko: '믿음의 조상. 하나님의 부르심에 순종하여 가나안으로 이주. 이삭을 제물로 바치려 할 만큼 큰 믿음을 보임.',
    description_en: 'Father of faith. Obeyed God\'s call to move to Canaan. Showed great faith willing to sacrifice Isaac.',
    verses: [
      { ref: '창세기 12:1-2', text_ko: '네 본토 친척 아버지의 집을 떠나 내가 네게 보여줄 땅으로 가라', text_en: 'Go from your country, your people and your father\'s household to the land I will show you' },
      { ref: '창세기 15:6', text_ko: '아브람이 여호와를 믿으니 여호와께서 이를 그의 의로 여기시고', text_en: 'Abram believed the LORD, and he credited it to him as righteousness' },
      { ref: '히브리서 11:8', text_ko: '믿음으로 아브라함은 부르심을 받았을 때에 순종하여', text_en: 'By faith Abraham, when called to go to a place, obeyed and went' }
    ],
    labels: ['믿음의 조상', '이스라엘의 조상', '하나님의 친구', 'Father of Faith', 'Patriarch', 'Friend of God'],
    era: 'patriarchs',
    location: '우르, 하란, 가나안',
    hymns: [188, 295]
  },

  { 
    id: 'sarah', 
    name_ko: '사라', 
    name_en: 'Sarah', 
    testament: 'old', 
    importance: 7,
    books: ['gen', 'isa', 'rom', 'gal', 'heb', '1pe'],
    description_ko: '아브라함의 아내. 90세에 이삭을 낳음. 믿음의 여인으로 칭송받음.',
    description_en: 'Wife of Abraham. Gave birth to Isaac at age 90. Praised as a woman of faith.',
    verses: [
      { ref: '창세기 21:2', text_ko: '사라가 임신하고 하나님이 말씀하신 시기가 되어 아브라함의 노년에 아들을 낳으니', text_en: 'Sarah became pregnant and bore a son to Abraham in his old age' },
      { ref: '히브리서 11:11', text_ko: '믿음으로 사라 자신도 나이가 많아 단산하였으나 잉태할 수 있는 힘을 얻었으니', text_en: 'By faith Sarah herself received ability to conceive' }
    ],
    labels: ['믿음의 여인', '이삭의 어머니', 'Woman of Faith', "Isaac's Mother"],
    era: 'patriarchs',
    location: '우르, 하란, 가나안',
    hymns: []
  },

  { 
    id: 'lot', 
    name_ko: '롯', 
    name_en: 'Lot', 
    testament: 'old', 
    importance: 5,
    books: ['gen', '2pe'],
    description_ko: '아브라함의 조카. 소돔에서 살다가 도시 멸망 시 구출됨. 그의 아내는 뒤를 돌아보다 소금 기둥이 됨.',
    description_en: 'Abraham\'s nephew. Lived in Sodom and was rescued when the city was destroyed. His wife became a pillar of salt.',
    verses: [
      { ref: '창세기 19:26', text_ko: '롯의 아내는 뒤를 돌아보았으므로 소금 기둥이 되었더라', text_en: 'Lot\'s wife looked back, and she became a pillar of salt' },
      { ref: '베드로후서 2:7', text_ko: '무법한 자들의 음란한 행실로 말미암아 고통 당하는 의로운 롯을 건지셨으니', text_en: 'He rescued Lot, a righteous man, who was distressed by the depraved conduct of the lawless' }
    ],
    labels: ['소돔', '아브라함의 조카', 'Sodom', "Abraham's Nephew"],
    era: 'patriarchs',
    location: '하란, 소돔',
    hymns: []
  },

  { 
    id: 'hagar', 
    name_ko: '하갈', 
    name_en: 'Hagar', 
    testament: 'old', 
    importance: 5,
    books: ['gen', 'gal'],
    description_ko: '사라의 이집트인 여종. 아브라함과의 사이에서 이스마엘을 낳음.',
    description_en: 'Egyptian servant of Sarah. Bore Ishmael to Abraham.',
    verses: [
      { ref: '창세기 16:15', text_ko: '하갈이 아브람에게 아들을 낳으니 아브람이 그 이름을 이스마엘이라 하였더라', text_en: 'Hagar bore Abram a son, and Abram gave him the name Ishmael' },
      { ref: '창세기 21:17', text_ko: '하나님이 그 어린 아이의 소리를 들으시매', text_en: 'God heard the boy crying' }
    ],
    labels: ['여종', '이스마엘의 어머니', 'Servant', "Ishmael's Mother"],
    era: 'patriarchs',
    location: '가나안, 광야',
    hymns: []
  },

  { 
    id: 'ishmael', 
    name_ko: '이스마엘', 
    name_en: 'Ishmael', 
    testament: 'old', 
    importance: 5,
    books: ['gen', 'gal'],
    description_ko: '아브라함과 하갈 사이에서 태어난 아들. 아랍 민족의 조상으로 여겨짐.',
    description_en: 'Son of Abraham and Hagar. Considered the ancestor of Arab nations.',
    verses: [
      { ref: '창세기 17:20', text_ko: '이스마엘에게 이르러서는 내가 네 말을 들었나니 그를 복주어 번성하게 하고', text_en: 'As for Ishmael, I have heard you: I will surely bless him' }
    ],
    labels: ['아랍의 조상', '아브라함의 아들', 'Arab Ancestor', "Abraham's Son"],
    era: 'patriarchs',
    location: '가나안, 바란 광야',
    hymns: []
  },

  { 
    id: 'isaac', 
    name_ko: '이삭', 
    name_en: 'Isaac', 
    testament: 'old', 
    importance: 8,
    books: ['gen', 'exo', 'mat', 'rom', 'gal', 'heb', 'jas'],
    description_ko: '아브라함과 사라의 약속의 아들. 모리아 산에서 제물로 바쳐질 뻔함.',
    description_en: 'Promised son of Abraham and Sarah. Nearly sacrificed on Mount Moriah.',
    verses: [
      { ref: '창세기 22:2', text_ko: '네 아들 네 사랑하는 독자 이삭을 데리고 모리아 땅으로 가서', text_en: 'Take your son, your only son, Isaac, whom you love, and go to the region of Moriah' },
      { ref: '히브리서 11:17', text_ko: '믿음으로 아브라함은 시험을 받을 때에 이삭을 드렸으니', text_en: 'By faith Abraham, when God tested him, offered Isaac as a sacrifice' }
    ],
    labels: ['약속의 아들', '희생 제물', 'Promised Son', 'Sacrifice'],
    era: 'patriarchs',
    location: '가나안, 브엘세바',
    hymns: []
  },

  { 
    id: 'rebekah', 
    name_ko: '리브가', 
    name_en: 'Rebekah', 
    testament: 'old', 
    importance: 6,
    books: ['gen', 'rom'],
    description_ko: '이삭의 아내. 야곱과 에서 쌍둥이의 어머니. 야곱이 축복받도록 도움.',
    description_en: 'Wife of Isaac. Mother of twins Jacob and Esau. Helped Jacob receive the blessing.',
    verses: [
      { ref: '창세기 25:21', text_ko: '여호와께서 그의 기도를 들으셨으므로 그의 아내 리브가가 임신하였더니', text_en: 'The LORD answered his prayer, and his wife Rebekah became pregnant' },
      { ref: '창세기 24:67', text_ko: '이삭이 리브가를 사랑하였으니', text_en: 'Isaac loved her' }
    ],
    labels: ['이삭의 아내', '야곱의 어머니', "Isaac's Wife", "Jacob's Mother"],
    era: 'patriarchs',
    location: '하란, 가나안',
    hymns: []
  },

  { 
    id: 'esau', 
    name_ko: '에서', 
    name_en: 'Esau', 
    testament: 'old', 
    importance: 5,
    books: ['gen', 'mal', 'rom', 'heb'],
    description_ko: '이삭과 리브가의 장남. 장자권을 팥죽 한 그릇에 팔고 축복도 동생에게 빼앗김.',
    description_en: 'Firstborn of Isaac and Rebekah. Sold his birthright for stew and lost his blessing to Jacob.',
    verses: [
      { ref: '창세기 25:34', text_ko: '에서가 장자의 명분을 업신여겼더라', text_en: 'So Esau despised his birthright' },
      { ref: '히브리서 12:16', text_ko: '한 그릇 음식으로 자기 장자의 명분을 판 에서와 같이', text_en: 'Who for a single meal sold his inheritance rights as the oldest son' }
    ],
    labels: ['장자권 판매', '에돔의 조상', 'Sold Birthright', 'Edom'],
    era: 'patriarchs',
    location: '가나안, 세일 산',
    hymns: []
  },

  { 
    id: 'jacob', 
    name_ko: '야곱', 
    name_en: 'Jacob', 
    testament: 'old', 
    importance: 8,
    books: ['gen', 'exo', 'mal', 'mat', 'jhn', 'rom', 'heb'],
    description_ko: '이삭의 아들, 이스라엘 12지파의 조상. 하나님과 씨름하여 이스라엘이라는 이름을 받음.',
    description_en: 'Son of Isaac, ancestor of the 12 tribes of Israel. Wrestled with God and received the name Israel.',
    verses: [
      { ref: '창세기 32:28', text_ko: '네 이름이 다시는 야곱이라 불리지 않겠고 이스라엘이라 불리리니', text_en: 'Your name will no longer be Jacob, but Israel' },
      { ref: '창세기 28:15', text_ko: '내가 너와 함께 있어 네가 어디로 가든지 너를 지키며', text_en: 'I am with you and will watch over you wherever you go' }
    ],
    labels: ['이스라엘', '12지파의 조상', 'Israel', '12 Tribes'],
    era: 'patriarchs',
    location: '가나안, 하란, 이집트',
    hymns: [293]
  },

  { 
    id: 'rachel', 
    name_ko: '라헬', 
    name_en: 'Rachel', 
    testament: 'old', 
    importance: 6,
    books: ['gen', 'jer', 'mat'],
    description_ko: '야곱이 사랑한 아내. 요셉과 베냐민의 어머니. 베냐민을 낳다가 세상을 떠남.',
    description_en: 'Beloved wife of Jacob. Mother of Joseph and Benjamin. Died giving birth to Benjamin.',
    verses: [
      { ref: '창세기 29:18', text_ko: '야곱이 라헬을 사랑하므로', text_en: 'Jacob was in love with Rachel' },
      { ref: '창세기 35:19', text_ko: '라헬이 죽으매 베들레헴 길에 장사되었고', text_en: 'Rachel died and was buried on the way to Bethlehem' }
    ],
    labels: ['야곱의 사랑', '요셉의 어머니', "Jacob's Love", "Joseph's Mother"],
    era: 'patriarchs',
    location: '하란, 가나안',
    hymns: []
  },

  { 
    id: 'leah', 
    name_ko: '레아', 
    name_en: 'Leah', 
    testament: 'old', 
    importance: 5,
    books: ['gen', 'rut'],
    description_ko: '야곱의 첫째 아내. 라헬의 언니. 유다, 레위 등 6아들의 어머니.',
    description_en: 'First wife of Jacob. Sister of Rachel. Mother of six sons including Judah and Levi.',
    verses: [
      { ref: '창세기 29:31', text_ko: '여호와께서 레아가 사랑받지 못함을 보시고 그의 태를 여셨으나', text_en: 'When the LORD saw that Leah was not loved, he enabled her to conceive' }
    ],
    labels: ['야곱의 아내', '유다의 어머니', "Jacob's Wife", "Judah's Mother"],
    era: 'patriarchs',
    location: '하란, 가나안',
    hymns: []
  },

  { 
    id: 'joseph', 
    name_ko: '요셉', 
    name_en: 'Joseph', 
    testament: 'old', 
    importance: 8,
    books: ['gen', 'exo', 'psa', 'act', 'heb'],
    description_ko: '야곱이 가장 사랑한 아들. 형들에 의해 이집트에 팔렸으나 총리가 되어 가족을 구함.',
    description_en: 'Jacob\'s favorite son. Sold to Egypt by brothers but became governor and saved his family.',
    verses: [
      { ref: '창세기 50:20', text_ko: '당신들은 나를 해하려 하였으나 하나님은 그것을 선으로 바꾸사', text_en: 'You intended to harm me, but God intended it for good' },
      { ref: '창세기 41:41', text_ko: '바로가 요셉에게 이르되 내가 너를 온 애굽 땅을 주관하게 하노라', text_en: 'Pharaoh said to Joseph, "I hereby put you in charge of the whole land of Egypt"' }
    ],
    labels: ['꿈 해석', '이집트 총리', '용서', 'Dream Interpreter', 'Governor', 'Forgiveness'],
    era: 'patriarchs',
    location: '가나안, 이집트',
    hymns: []
  },

  { 
    id: 'judah', 
    name_ko: '유다', 
    name_en: 'Judah', 
    testament: 'old', 
    importance: 7,
    books: ['gen', 'mat', 'heb', 'rev'],
    description_ko: '야곱의 넷째 아들. 유다 지파의 조상. 다윗과 예수님의 조상.',
    description_en: 'Fourth son of Jacob. Ancestor of the tribe of Judah, David, and Jesus.',
    verses: [
      { ref: '창세기 49:10', text_ko: '규가 유다를 떠나지 아니하며 통치자의 지팡이가 그 발 사이에서 떠나지 아니하시기를', text_en: 'The scepter will not depart from Judah' },
      { ref: '요한계시록 5:5', text_ko: '유다 지파의 사자 다윗의 뿌리가 이겼으니', text_en: 'The Lion of the tribe of Judah, the Root of David, has triumphed' }
    ],
    labels: ['유다 지파', '메시아 계보', '사자', 'Tribe of Judah', 'Messianic Line', 'Lion'],
    era: 'patriarchs',
    location: '가나안, 이집트',
    hymns: []
  },

  { 
    id: 'benjamin', 
    name_ko: '베냐민', 
    name_en: 'Benjamin', 
    testament: 'old', 
    importance: 5,
    books: ['gen', 'jdg', '1sa', 'rom', 'php'],
    description_ko: '야곱의 막내 아들, 라헬의 둘째 아들. 베냐민 지파의 조상. 사울과 바울의 지파.',
    description_en: 'Youngest son of Jacob, second son of Rachel. Ancestor of the tribe of Benjamin. Tribe of Saul and Paul.',
    verses: [
      { ref: '창세기 35:18', text_ko: '그의 아버지는 그를 베냐민이라 불렀더라', text_en: 'His father named him Benjamin' }
    ],
    labels: ['막내 아들', '베냐민 지파', 'Youngest Son', 'Tribe of Benjamin'],
    era: 'patriarchs',
    location: '가나안, 이집트',
    hymns: []
  },

  { 
    id: 'levi', 
    name_ko: '레위', 
    name_en: 'Levi', 
    testament: 'old', 
    importance: 5,
    books: ['gen', 'exo', 'num', 'mal', 'heb'],
    description_ko: '야곱의 셋째 아들. 레위 지파의 조상. 제사장 가문의 기원.',
    description_en: 'Third son of Jacob. Ancestor of the tribe of Levi. Origin of the priestly line.',
    verses: [
      { ref: '신명기 10:8', text_ko: '여호와께서 레위 지파를 구별하사 여호와의 언약궤를 메게 하시고', text_en: 'The LORD set apart the tribe of Levi to carry the ark of the covenant' }
    ],
    labels: ['제사장 지파', '레위 지파', 'Priestly Tribe', 'Tribe of Levi'],
    era: 'patriarchs',
    location: '가나안, 이집트',
    hymns: []
  }
];

export default characters;
