// 신약 인물 데이터
export const charactersNewTestament = [
  // ==================== 예수님 가족/관련 ====================
  { 
    id: 'mary', 
    name_ko: '마리아', 
    name_en: 'Mary (Mother of Jesus)', 
    testament: 'new', 
    importance: 8,
    books: ['mat', 'mrk', 'luk', 'jhn', 'act'],
    description_ko: '예수님의 어머니. 동정녀로 성령으로 잉태하여 예수님을 낳음.',
    description_en: 'Mother of Jesus. Virgin who conceived by the Holy Spirit.',
    verses: [
      { ref: '누가복음 1:38', text_ko: '마리아가 이르되 주의 여종이오니 말씀대로 내게 이루어지이다', text_en: 'I am the Lord\'s servant. May your word to me be fulfilled' },
      { ref: '누가복음 1:46-47', text_ko: '내 영혼이 주를 찬양하며 내 마음이 하나님 내 구주를 기뻐하였음은', text_en: 'My soul glorifies the Lord and my spirit rejoices in God my Savior' }
    ],
    labels: ['동정녀', '예수의 어머니', 'Virgin', 'Mother of Jesus'],
    era: 'new_testament',
    location: '나사렛, 베들레헴',
    hymns: [122]
  },

  { 
    id: 'joseph_nt', 
    name_ko: '요셉', 
    name_en: 'Joseph (Husband of Mary)', 
    testament: 'new', 
    importance: 5,
    books: ['mat', 'luk'],
    description_ko: '마리아의 남편, 예수님의 양아버지. 다윗의 후손. 목수.',
    description_en: 'Husband of Mary, earthly father of Jesus. Descendant of David. Carpenter.',
    verses: [
      { ref: '마태복음 1:20', text_ko: '다윗의 자손 요셉아 네 아내 마리아 데려오기를 무서워하지 말라', text_en: 'Joseph son of David, do not be afraid to take Mary home as your wife' }
    ],
    labels: ['목수', '다윗의 자손', 'Carpenter', 'Son of David'],
    era: 'new_testament',
    location: '나사렛, 베들레헴, 이집트',
    hymns: []
  },

  { 
    id: 'john_baptist', 
    name_ko: '세례 요한', 
    name_en: 'John the Baptist', 
    testament: 'new', 
    importance: 7,
    books: ['mat', 'mrk', 'luk', 'jhn'],
    description_ko: '예수님의 길을 예비한 선지자. 요단강에서 세례를 베풂. 헤롯에게 처형당함.',
    description_en: 'Prophet who prepared the way for Jesus. Baptized in the Jordan River. Beheaded by Herod.',
    verses: [
      { ref: '마태복음 3:3', text_ko: '주의 길을 준비하라 그가 오실 길을 곧게 하라', text_en: 'Prepare the way for the Lord, make straight paths for him' },
      { ref: '요한복음 1:29', text_ko: '보라 세상 죄를 지고 가는 하나님의 어린양이로다', text_en: 'Look, the Lamb of God, who takes away the sin of the world!' }
    ],
    labels: ['세례자', '선구자', '광야의 외치는 자', 'Baptizer', 'Forerunner'],
    era: 'new_testament',
    location: '유대 광야, 요단강',
    hymns: [129]
  },

  { 
    id: 'elizabeth', 
    name_ko: '엘리사벳', 
    name_en: 'Elizabeth', 
    testament: 'new', 
    importance: 4,
    books: ['luk'],
    description_ko: '세례 요한의 어머니. 마리아의 친척. 노년에 아들을 얻음.',
    description_en: 'Mother of John the Baptist. Relative of Mary. Bore a son in old age.',
    verses: [
      { ref: '누가복음 1:41-42', text_ko: '엘리사벳이 마리아의 문안을 들으매 아이가 복중에서 뛰노는지라', text_en: 'When Elizabeth heard Mary\'s greeting, the baby leaped in her womb' }
    ],
    labels: ['요한의 어머니', "John's Mother"],
    era: 'new_testament',
    location: '유대 산골',
    hymns: []
  },

  { 
    id: 'zechariah_priest', 
    name_ko: '스가랴', 
    name_en: 'Zechariah (Priest)', 
    testament: 'new', 
    importance: 4,
    books: ['luk'],
    description_ko: '세례 요한의 아버지. 성전에서 천사 가브리엘을 만남. 말을 못하게 됨.',
    description_en: 'Father of John the Baptist. Met angel Gabriel in the temple. Was struck mute.',
    verses: [
      { ref: '누가복음 1:20', text_ko: '보라 이 일이 되는 날까지 네가 말을 못하여 벙어리가 되리니', text_en: 'And now you will be silent until the day this happens' }
    ],
    labels: ['제사장', '요한의 아버지', 'Priest', "John's Father"],
    era: 'new_testament',
    location: '예루살렘 성전',
    hymns: []
  },

  // ==================== 12제자 ====================
  { 
    id: 'peter', 
    name_ko: '베드로', 
    name_en: 'Peter', 
    testament: 'new', 
    importance: 8,
    books: ['mat', 'mrk', 'luk', 'jhn', 'act', '1pe', '2pe', 'gal'],
    description_ko: '예수님의 수제자. 본명은 시몬. 초대교회의 기둥. 로마에서 순교.',
    description_en: 'Chief disciple of Jesus. Originally named Simon. Pillar of the early church. Martyred in Rome.',
    verses: [
      { ref: '마태복음 16:18', text_ko: '너는 베드로라 내가 이 반석 위에 내 교회를 세우리니', text_en: 'You are Peter, and on this rock I will build my church' },
      { ref: '요한복음 21:17', text_ko: '내 양을 먹이라', text_en: 'Feed my sheep' },
      { ref: '마태복음 16:16', text_ko: '주는 그리스도시요 살아 계신 하나님의 아들이시니이다', text_en: 'You are the Messiah, the Son of the living God' }
    ],
    labels: ['수제자', '반석', '어부', 'Chief Disciple', 'Rock', 'Fisherman'],
    era: 'new_testament',
    location: '갈릴리, 예루살렘, 로마',
    hymns: [365]
  },

  { 
    id: 'andrew', 
    name_ko: '안드레', 
    name_en: 'Andrew', 
    testament: 'new', 
    importance: 5,
    books: ['mat', 'mrk', 'luk', 'jhn', 'act'],
    description_ko: '베드로의 형제. 세례 요한의 제자였다가 예수님을 따름. 처음으로 부름받은 제자.',
    description_en: 'Brother of Peter. Former disciple of John the Baptist. First called disciple.',
    verses: [
      { ref: '요한복음 1:41', text_ko: '그가 먼저 자기의 형제 시몬을 찾아 말하되 우리가 메시아를 만났다 하고', text_en: 'The first thing Andrew did was to find his brother Simon and tell him, "We have found the Messiah"' }
    ],
    labels: ['베드로의 형제', '전도자', "Peter's Brother", 'Evangelist'],
    era: 'new_testament',
    location: '갈릴리',
    hymns: []
  },

  { 
    id: 'james_zebedee', 
    name_ko: '야고보', 
    name_en: 'James (Son of Zebedee)', 
    testament: 'new', 
    importance: 5,
    books: ['mat', 'mrk', 'luk', 'act'],
    description_ko: '요한의 형제. 12제자 중 첫 순교자. 헤롯 아그립바에게 처형당함.',
    description_en: 'Brother of John. First apostle martyred. Killed by Herod Agrippa.',
    verses: [
      { ref: '사도행전 12:2', text_ko: '요한의 형제 야고보를 칼로 죽이니', text_en: 'He had James, the brother of John, put to death with the sword' }
    ],
    labels: ['순교자', '뇌자', 'Martyr', 'Son of Thunder'],
    era: 'new_testament',
    location: '갈릴리, 예루살렘',
    hymns: []
  },

  { 
    id: 'john_apostle', 
    name_ko: '사도 요한', 
    name_en: 'John the Apostle', 
    testament: 'new', 
    importance: 8,
    books: ['mat', 'mrk', 'luk', 'jhn', 'act', '1jn', '2jn', '3jn', 'rev'],
    description_ko: '예수님이 사랑하신 제자. 요한복음, 요한서신, 요한계시록 저술.',
    description_en: 'The disciple whom Jesus loved. Wrote Gospel of John, Epistles of John, and Revelation.',
    verses: [
      { ref: '요한복음 13:23', text_ko: '예수께서 사랑하시는 제자가 예수의 품에 의지하여 누웠는지라', text_en: 'One of them, the disciple whom Jesus loved, was reclining next to him' },
      { ref: '요한일서 4:8', text_ko: '하나님은 사랑이시라', text_en: 'God is love' }
    ],
    labels: ['사랑받는 제자', '요한복음', '계시록', 'Beloved Disciple', 'Gospel Writer'],
    era: 'new_testament',
    location: '갈릴리, 에베소, 밧모섬',
    hymns: []
  },

  { 
    id: 'philip', 
    name_ko: '빌립', 
    name_en: 'Philip', 
    testament: 'new', 
    importance: 4,
    books: ['mat', 'mrk', 'luk', 'jhn', 'act'],
    description_ko: '벳새다 출신의 제자. 나다나엘을 예수님께 인도함.',
    description_en: 'Disciple from Bethsaida. Brought Nathanael to Jesus.',
    verses: [
      { ref: '요한복음 1:45', text_ko: '빌립이 나다나엘을 찾아 이르되 모세가 율법에 기록하였고 여러 선지자가 기록한 그이를 우리가 만났으니', text_en: 'Philip found Nathanael and told him, "We have found the one Moses wrote about in the Law"' }
    ],
    labels: ['전도자', 'Evangelist'],
    era: 'new_testament',
    location: '벳새다',
    hymns: []
  },

  { 
    id: 'nathanael', 
    name_ko: '나다나엘', 
    name_en: 'Nathanael (Bartholomew)', 
    testament: 'new', 
    importance: 4,
    books: ['jhn'],
    description_ko: '바돌로매라고도 불림. 예수님께 간사한 것이 없다는 칭찬을 받음.',
    description_en: 'Also called Bartholomew. Praised by Jesus as one without guile.',
    verses: [
      { ref: '요한복음 1:47', text_ko: '보라 이는 참으로 이스라엘 사람이라 그 속에 간사한 것이 없도다', text_en: 'Here truly is an Israelite in whom there is no deceit' }
    ],
    labels: ['진실한 자', 'Without Guile'],
    era: 'new_testament',
    location: '가나',
    hymns: []
  },

  { 
    id: 'matthew', 
    name_ko: '마태', 
    name_en: 'Matthew', 
    testament: 'new', 
    importance: 6,
    books: ['mat', 'mrk', 'luk'],
    description_ko: '세리 출신의 제자. 마태복음 저술. 본명은 레위.',
    description_en: 'Former tax collector turned disciple. Wrote Gospel of Matthew. Originally named Levi.',
    verses: [
      { ref: '마태복음 9:9', text_ko: '세관에 앉아 있는 사람을 보시니 그 이름은 마태라 이르시되 나를 따르라 하시니', text_en: 'He saw a man named Matthew sitting at the tax collector\'s booth. "Follow me," he told him' }
    ],
    labels: ['세리', '복음서 저자', 'Tax Collector', 'Gospel Writer'],
    era: 'new_testament',
    location: '가버나움',
    hymns: []
  },

  { 
    id: 'thomas', 
    name_ko: '도마', 
    name_en: 'Thomas', 
    testament: 'new', 
    importance: 5,
    books: ['mat', 'mrk', 'luk', 'jhn', 'act'],
    description_ko: '의심하는 도마로 알려짐. 부활하신 예수님의 상처를 만져보고 믿음을 고백.',
    description_en: 'Known as Doubting Thomas. Confessed faith after touching the risen Lord\'s wounds.',
    verses: [
      { ref: '요한복음 20:28', text_ko: '도마가 대답하여 이르되 나의 주님이시요 나의 하나님이시니이다', text_en: 'Thomas said to him, "My Lord and my God!"' },
      { ref: '요한복음 11:16', text_ko: '우리도 주와 함께 죽으러 가자', text_en: 'Let us also go, that we may die with him' }
    ],
    labels: ['의심', '고백', '디두모', 'Doubting', 'Confession', 'Didymus'],
    era: 'new_testament',
    location: '갈릴리',
    hymns: []
  },

  { 
    id: 'judas', 
    name_ko: '가룟 유다', 
    name_en: 'Judas Iscariot', 
    testament: 'new', 
    importance: 5,
    books: ['mat', 'mrk', 'luk', 'jhn', 'act'],
    description_ko: '예수님을 은 30에 팔아넘긴 배신자. 후에 자살.',
    description_en: 'The betrayer who sold Jesus for 30 silver coins. Later committed suicide.',
    verses: [
      { ref: '마태복음 26:15', text_ko: '이르되 내가 예수를 너희에게 넘겨주리니 얼마나 주려느냐', text_en: 'What are you willing to give me if I deliver him over to you?' },
      { ref: '마태복음 27:5', text_ko: '유다가 은을 성소에 던져 넣고 물러가서 스스로 목매어 죽으니라', text_en: 'He went away and hanged himself' }
    ],
    labels: ['배신자', '은 30', 'Betrayer', '30 Silver'],
    era: 'new_testament',
    location: '가룟',
    hymns: []
  },

  { 
    id: 'james_alphaeus', 
    name_ko: '알패오의 아들 야고보', 
    name_en: 'James son of Alphaeus', 
    testament: 'new', 
    importance: 3,
    books: ['mat', 'mrk', 'luk', 'act'],
    description_ko: '12제자 중 하나. 작은 야고보라고도 불림.',
    description_en: 'One of the twelve disciples. Also called James the Less.',
    verses: [],
    labels: ['제자', '작은 야고보', 'Disciple', 'James the Less'],
    era: 'new_testament',
    location: '갈릴리',
    hymns: []
  },

  { 
    id: 'simon_zealot', 
    name_ko: '셀롯인 시몬', 
    name_en: 'Simon the Zealot', 
    testament: 'new', 
    importance: 3,
    books: ['mat', 'mrk', 'luk', 'act'],
    description_ko: '12제자 중 하나. 열심당원 출신.',
    description_en: 'One of the twelve disciples. Former member of the Zealot party.',
    verses: [],
    labels: ['제자', '열심당', 'Disciple', 'Zealot'],
    era: 'new_testament',
    location: '갈릴리',
    hymns: []
  },

  { 
    id: 'thaddaeus', 
    name_ko: '다대오', 
    name_en: 'Thaddaeus (Judas son of James)', 
    testament: 'new', 
    importance: 3,
    books: ['mat', 'mrk', 'luk', 'jhn', 'act'],
    description_ko: '12제자 중 하나. 야고보의 아들 유다라고도 불림.',
    description_en: 'One of the twelve disciples. Also called Judas son of James.',
    verses: [
      { ref: '요한복음 14:22', text_ko: '가룟 유다가 아닌 유다가 이르되 주여 어찌하여 자기를 우리에게는 나타내시고 세상에게는 아니하려 하시나이까', text_en: 'Judas (not Iscariot) said, "But, Lord, why do you intend to show yourself to us and not to the world?"' }
    ],
    labels: ['제자', 'Disciple'],
    era: 'new_testament',
    location: '갈릴리',
    hymns: []
  },

  // ==================== 바울과 동역자들 ====================
  { 
    id: 'paul', 
    name_ko: '사도 바울', 
    name_en: 'Apostle Paul', 
    testament: 'new', 
    importance: 9,
    books: ['act', 'rom', '1co', '2co', 'gal', 'eph', 'php', 'col', '1th', '2th', '1ti', '2ti', 'tit', 'phm'],
    description_ko: '이방인의 사도. 원래 기독교를 박해하던 바리새인 사울. 다메섹 도상에서 회심. 신약 13권 저술.',
    description_en: 'Apostle to the Gentiles. Former Pharisee Saul who persecuted Christians. Converted on Damascus road.',
    verses: [
      { ref: '사도행전 9:4', text_ko: '사울아 사울아 네가 왜 나를 박해하느냐', text_en: 'Saul, Saul, why do you persecute me?' },
      { ref: '갈라디아서 2:20', text_ko: '내가 그리스도와 함께 십자가에 못 박혔나니', text_en: 'I have been crucified with Christ' },
      { ref: '빌립보서 4:13', text_ko: '내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라', text_en: 'I can do all things through him who strengthens me' }
    ],
    labels: ['이방인의 사도', '바리새인', '서신서', 'Apostle to Gentiles', 'Pharisee', 'Epistles'],
    era: 'new_testament',
    location: '다소, 다메섹, 안디옥, 로마',
    hymns: [100, 310, 320]
  },

  { 
    id: 'barnabas', 
    name_ko: '바나바', 
    name_en: 'Barnabas', 
    testament: 'new', 
    importance: 5,
    books: ['act', '1co', 'gal', 'col'],
    description_ko: '위로의 아들이라는 뜻. 바울의 첫 선교 동역자. 마가를 후원.',
    description_en: 'Name means Son of Encouragement. Paul\'s first missionary partner. Supported Mark.',
    verses: [
      { ref: '사도행전 4:36', text_ko: '사도들이 바나바라 불렀으니 번역하면 위로의 아들이라', text_en: 'Joseph, a Levite from Cyprus, whom the apostles called Barnabas (which means "son of encouragement")' },
      { ref: '사도행전 11:24', text_ko: '바나바는 착한 사람이요 성령과 믿음이 충만한 사람이라', text_en: 'He was a good man, full of the Holy Spirit and faith' }
    ],
    labels: ['위로의 아들', '선교사', 'Son of Encouragement', 'Missionary'],
    era: 'new_testament',
    location: '구브로, 안디옥',
    hymns: []
  },

  { 
    id: 'timothy', 
    name_ko: '디모데', 
    name_en: 'Timothy', 
    testament: 'new', 
    importance: 5,
    books: ['act', '1co', '2co', 'php', 'col', '1th', '2th', '1ti', '2ti', 'phm', 'heb'],
    description_ko: '바울의 영적 아들이자 동역자. 에베소 교회의 지도자. 디모데전후서의 수신자.',
    description_en: 'Paul\'s spiritual son and co-worker. Leader of Ephesian church. Recipient of 1 & 2 Timothy.',
    verses: [
      { ref: '디모데후서 1:5', text_ko: '이는 네 속에 거짓이 없는 믿음을 생각함이라 이 믿음은 먼저 네 외조모 로이스와 네 어머니 유니게 속에 있더니', text_en: 'I am reminded of your sincere faith, which first lived in your grandmother Lois and in your mother Eunice' },
      { ref: '빌립보서 2:22', text_ko: '자녀가 아버지에게 하듯 나와 함께 복음을 위하여 수고한 그의 연단을 너희가 아느니라', text_en: 'Timothy has proved himself, because as a son with his father he has served with me in the work of the gospel' }
    ],
    labels: ['바울의 제자', '목회자', "Paul's Disciple", 'Pastor'],
    era: 'new_testament',
    location: '루스드라, 에베소',
    hymns: []
  },

  { 
    id: 'titus', 
    name_ko: '디도', 
    name_en: 'Titus', 
    testament: 'new', 
    importance: 4,
    books: ['2co', 'gal', '2ti', 'tit'],
    description_ko: '바울의 동역자. 이방인 출신. 그레데 교회를 담당. 디도서의 수신자.',
    description_en: 'Paul\'s co-worker. Gentile convert. Oversaw churches in Crete. Recipient of Titus.',
    verses: [
      { ref: '디도서 1:4', text_ko: '같은 믿음을 따라 된 나의 참 아들 디도에게', text_en: 'To Titus, my true son in our common faith' }
    ],
    labels: ['바울의 동역자', '그레데', "Paul's Co-worker", 'Crete'],
    era: 'new_testament',
    location: '그레데',
    hymns: []
  },

  { 
    id: 'luke', 
    name_ko: '누가', 
    name_en: 'Luke', 
    testament: 'new', 
    importance: 6,
    books: ['col', '2ti', 'phm'],
    description_ko: '이방인 의사. 누가복음과 사도행전 저술. 바울의 동역자.',
    description_en: 'Gentile physician. Wrote Gospel of Luke and Acts. Paul\'s co-worker.',
    verses: [
      { ref: '골로새서 4:14', text_ko: '사랑을 받는 의사 누가와 데마가 너희에게 문안하느니라', text_en: 'Our dear friend Luke, the doctor, and Demas send greetings' }
    ],
    labels: ['의사', '역사가', '복음서 저자', 'Physician', 'Historian', 'Gospel Writer'],
    era: 'new_testament',
    location: '안디옥',
    hymns: []
  },

  { 
    id: 'silas', 
    name_ko: '실라', 
    name_en: 'Silas', 
    testament: 'new', 
    importance: 4,
    books: ['act', '2co', '1th', '2th', '1pe'],
    description_ko: '바울의 2차 선교 동역자. 빌립보 감옥에서 바울과 함께 찬양하며 기적을 경험.',
    description_en: 'Paul\'s partner in second missionary journey. Sang hymns with Paul in Philippi prison.',
    verses: [
      { ref: '사도행전 16:25', text_ko: '한밤중에 바울과 실라가 기도하고 하나님을 찬미하매', text_en: 'About midnight Paul and Silas were praying and singing hymns to God' }
    ],
    labels: ['선교사', '빌립보', 'Missionary', 'Philippi'],
    era: 'new_testament',
    location: '예루살렘, 빌립보',
    hymns: []
  },

  { 
    id: 'mark', 
    name_ko: '마가', 
    name_en: 'Mark (John Mark)', 
    testament: 'new', 
    importance: 5,
    books: ['act', 'col', '2ti', 'phm', '1pe'],
    description_ko: '마가복음의 저자. 바나바의 조카. 바울과 바나바의 1차 선교 때 중간에 돌아갔으나 후에 쓸모 있는 자가 됨.',
    description_en: 'Author of Gospel of Mark. Cousin of Barnabas. Left first mission but later became useful.',
    verses: [
      { ref: '디모데후서 4:11', text_ko: '마가를 데리고 오라 그가 나의 일에 유익하니라', text_en: 'Get Mark and bring him with you, because he is helpful to me in my ministry' },
      { ref: '골로새서 4:10', text_ko: '바나바의 생질 마가', text_en: 'Mark, the cousin of Barnabas' }
    ],
    labels: ['복음서 저자', '바나바의 조카', 'Gospel Writer', "Barnabas's Cousin"],
    era: 'new_testament',
    location: '예루살렘, 로마',
    hymns: []
  },

  { 
    id: 'apollos', 
    name_ko: '아볼로', 
    name_en: 'Apollos', 
    testament: 'new', 
    importance: 4,
    books: ['act', '1co', 'tit'],
    description_ko: '알렉산드리아 출신의 유대인 그리스도인. 웅변에 능하고 성경에 박식함.',
    description_en: 'Jewish Christian from Alexandria. Eloquent speaker and learned in the Scriptures.',
    verses: [
      { ref: '사도행전 18:24', text_ko: '알렉산드리아에서 난 아볼로라 하는 유대인이 에베소에 이르니 이 사람은 웅변에 능하고 성경에 박식하더라', text_en: 'A Jew named Apollos, a native of Alexandria, came to Ephesus. He was a learned man, with a thorough knowledge of the Scriptures' }
    ],
    labels: ['웅변가', '성경 박식', 'Eloquent', 'Learned'],
    era: 'new_testament',
    location: '알렉산드리아, 에베소, 고린도',
    hymns: []
  },

  { 
    id: 'priscilla', 
    name_ko: '브리스길라', 
    name_en: 'Priscilla', 
    testament: 'new', 
    importance: 4,
    books: ['act', 'rom', '1co', '2ti'],
    description_ko: '아굴라의 아내. 바울과 함께 천막 만드는 일을 함. 아볼로를 가르침.',
    description_en: 'Wife of Aquila. Worked with Paul making tents. Taught Apollos.',
    verses: [
      { ref: '사도행전 18:26', text_ko: '브리스길라와 아굴라가 그를 데려다가 하나님의 도를 더 자세히 풀어 이르더라', text_en: 'Priscilla and Aquila invited him to their home and explained to him the way of God more adequately' }
    ],
    labels: ['교사', '천막 제작자', 'Teacher', 'Tentmaker'],
    era: 'new_testament',
    location: '고린도, 에베소, 로마',
    hymns: []
  },

  { 
    id: 'aquila', 
    name_ko: '아굴라', 
    name_en: 'Aquila', 
    testament: 'new', 
    importance: 4,
    books: ['act', 'rom', '1co', '2ti'],
    description_ko: '브리스길라의 남편. 바울과 함께 천막 만드는 일을 함.',
    description_en: 'Husband of Priscilla. Worked with Paul making tents.',
    verses: [
      { ref: '사도행전 18:2-3', text_ko: '본도에서 난 아굴라라 하는 유대인과 그 아내 브리스길라가... 바울이 같은 업이 있으므로 함께 살며 일하였으니', text_en: 'A Jew named Aquila... with his wife Priscilla... Paul stayed and worked with them, for they were tentmakers' }
    ],
    labels: ['천막 제작자', 'Tentmaker'],
    era: 'new_testament',
    location: '로마, 고린도, 에베소',
    hymns: []
  },

  // ==================== 기타 신약 인물 ====================
  { 
    id: 'mary_magdalene', 
    name_ko: '막달라 마리아', 
    name_en: 'Mary Magdalene', 
    testament: 'new', 
    importance: 6,
    books: ['mat', 'mrk', 'luk', 'jhn'],
    description_ko: '예수님께 일곱 귀신을 쫓아냄 받음. 십자가와 부활의 현장에 있었던 충성된 여제자.',
    description_en: 'Had seven demons cast out by Jesus. Faithful disciple present at crucifixion and resurrection.',
    verses: [
      { ref: '요한복음 20:18', text_ko: '막달라 마리아가 가서 제자들에게 내가 주를 보았다 하고', text_en: 'Mary Magdalene went to the disciples with the news: "I have seen the Lord!"' },
      { ref: '누가복음 8:2', text_ko: '막달라인이라 하는 마리아 곧 일곱 귀신이 나간 자', text_en: 'Mary (called Magdalene) from whom seven demons had come out' }
    ],
    labels: ['여제자', '부활의 증인', 'Female Disciple', 'Resurrection Witness'],
    era: 'new_testament',
    location: '막달라, 예루살렘',
    hymns: []
  },

  { 
    id: 'lazarus', 
    name_ko: '나사로', 
    name_en: 'Lazarus', 
    testament: 'new', 
    importance: 5,
    books: ['jhn'],
    description_ko: '마르다와 마리아의 오빠. 죽은 지 4일 만에 예수님에 의해 살아남.',
    description_en: 'Brother of Martha and Mary. Raised from the dead by Jesus after four days.',
    verses: [
      { ref: '요한복음 11:43-44', text_ko: '큰 소리로 나사로야 나오라 부르시니 죽은 자가 수족을 베로 동인 채로 나오는데', text_en: 'Jesus called in a loud voice, "Lazarus, come out!" The dead man came out' }
    ],
    labels: ['부활', '베다니', 'Raised from Dead', 'Bethany'],
    era: 'new_testament',
    location: '베다니',
    hymns: []
  },

  { 
    id: 'martha', 
    name_ko: '마르다', 
    name_en: 'Martha', 
    testament: 'new', 
    importance: 4,
    books: ['luk', 'jhn'],
    description_ko: '나사로와 마리아의 자매. 접대에 분주했던 여인. 예수님을 그리스도로 고백.',
    description_en: 'Sister of Lazarus and Mary. Busy with hospitality. Confessed Jesus as the Christ.',
    verses: [
      { ref: '요한복음 11:27', text_ko: '주는 그리스도시요 세상에 오시는 하나님의 아들이신 줄 내가 믿나이다', text_en: 'I believe that you are the Messiah, the Son of God, who is to come into the world' },
      { ref: '누가복음 10:40', text_ko: '마르다는 준비하는 일이 많아 마음이 분주한지라', text_en: 'Martha was distracted by all the preparations' }
    ],
    labels: ['섬김', '고백', 'Service', 'Confession'],
    era: 'new_testament',
    location: '베다니',
    hymns: []
  },

  { 
    id: 'mary_bethany', 
    name_ko: '마리아 (베다니)', 
    name_en: 'Mary of Bethany', 
    testament: 'new', 
    importance: 4,
    books: ['luk', 'jhn'],
    description_ko: '마르다와 나사로의 자매. 예수님의 발 앞에 앉아 말씀을 들음. 향유를 예수님 발에 부음.',
    description_en: 'Sister of Martha and Lazarus. Sat at Jesus\' feet. Poured perfume on Jesus\' feet.',
    verses: [
      { ref: '누가복음 10:42', text_ko: '그러나 몇 가지만 하든지 혹은 한 가지만이라도 족하니라 마리아는 이 좋은 편을 택하였으니', text_en: 'Only one thing is needed. Mary has chosen what is better' },
      { ref: '요한복음 12:3', text_ko: '마리아는 지극히 비싼 향유 곧 순전한 나드 한 근을 가져다가 예수의 발에 붓고', text_en: 'Mary took about a pint of pure nard, an expensive perfume; she poured it on Jesus\' feet' }
    ],
    labels: ['경청', '헌신', 'Listener', 'Devoted'],
    era: 'new_testament',
    location: '베다니',
    hymns: []
  },

  { 
    id: 'nicodemus', 
    name_ko: '니고데모', 
    name_en: 'Nicodemus', 
    testament: 'new', 
    importance: 4,
    books: ['jhn'],
    description_ko: '바리새인이자 산헤드린 의원. 밤에 예수님을 찾아옴. 예수님의 장례를 도움.',
    description_en: 'Pharisee and member of Sanhedrin. Visited Jesus at night. Helped with Jesus\' burial.',
    verses: [
      { ref: '요한복음 3:3', text_ko: '예수께서 대답하여 이르시되 진실로 진실로 네게 이르노니 사람이 거듭나지 아니하면 하나님의 나라를 볼 수 없느니라', text_en: 'Jesus replied, "Very truly I tell you, no one can see the kingdom of God unless they are born again"' }
    ],
    labels: ['바리새인', '거듭남', 'Pharisee', 'Born Again'],
    era: 'new_testament',
    location: '예루살렘',
    hymns: []
  },

  { 
    id: 'zacchaeus', 
    name_ko: '삭개오', 
    name_en: 'Zacchaeus', 
    testament: 'new', 
    importance: 4,
    books: ['luk'],
    description_ko: '여리고의 세리장. 키가 작아 돌무화과나무에 올라가 예수님을 봄. 회개하고 재산의 절반을 가난한 자에게 나눔.',
    description_en: 'Chief tax collector of Jericho. Climbed a sycamore tree to see Jesus. Repented and gave half his possessions to the poor.',
    verses: [
      { ref: '누가복음 19:8-9', text_ko: '주여 보시옵소서 내 소유의 절반을 가난한 자들에게 주겠사오며... 예수께서 이르시되 오늘 구원이 이 집에 이르렀으니', text_en: 'Look, Lord! Here and now I give half of my possessions to the poor... Jesus said to him, "Today salvation has come to this house"' }
    ],
    labels: ['세리장', '회개', 'Chief Tax Collector', 'Repentance'],
    era: 'new_testament',
    location: '여리고',
    hymns: []
  },

  { 
    id: 'pilate', 
    name_ko: '빌라도', 
    name_en: 'Pontius Pilate', 
    testament: 'new', 
    importance: 5,
    books: ['mat', 'mrk', 'luk', 'jhn', 'act', '1ti'],
    description_ko: '예수님을 십자가에 못 박도록 명령한 로마 총독. 손을 씻으며 책임을 회피.',
    description_en: 'Roman governor who ordered Jesus\' crucifixion. Washed his hands to avoid responsibility.',
    verses: [
      { ref: '마태복음 27:24', text_ko: '빌라도가 아무 성과도 없이 도리어 민란이 나려는 것을 보고 물을 가져다가 무리 앞에서 손을 씻으며 이르되 이 사람의 피에 대하여 나는 무죄하니', text_en: 'He took water and washed his hands in front of the crowd. "I am innocent of this man\'s blood," he said' },
      { ref: '요한복음 18:38', text_ko: '빌라도가 이르되 진리가 무엇이냐', text_en: 'Pilate asked him, "What is truth?"' }
    ],
    labels: ['로마 총독', '손 씻음', 'Roman Governor', 'Hand Washing'],
    era: 'new_testament',
    location: '예루살렘',
    hymns: []
  },

  { 
    id: 'herod_great', 
    name_ko: '헤롯 대왕', 
    name_en: 'Herod the Great', 
    testament: 'new', 
    importance: 5,
    books: ['mat', 'luk'],
    description_ko: '예수님 탄생 시 유대의 왕. 동방 박사의 소식을 듣고 베들레헴의 영아들을 학살.',
    description_en: 'King of Judea at Jesus\' birth. Massacred infants in Bethlehem after hearing from the Magi.',
    verses: [
      { ref: '마태복음 2:16', text_ko: '헤롯이 박사들에게 속은 줄 알고 심히 노하여 사람을 보내어 베들레헴과 그 모든 지경 안에 있는 사내아이를 박사들에게 자세히 알아본 그 때를 기준하여 두 살부터 그 아래로 다 죽이니', text_en: 'Herod gave orders to kill all the boys in Bethlehem and its vicinity who were two years old and under' }
    ],
    labels: ['학살', '영아 살해', 'Massacre', 'Infanticide'],
    era: 'new_testament',
    location: '예루살렘',
    hymns: []
  },

  { 
    id: 'stephen', 
    name_ko: '스데반', 
    name_en: 'Stephen', 
    testament: 'new', 
    importance: 5,
    books: ['act'],
    description_ko: '초대교회 최초의 순교자. 일곱 집사 중 한 명. 돌에 맞아 죽으면서 원수를 위해 기도.',
    description_en: 'First martyr of the early church. One of seven deacons. Prayed for his killers while being stoned.',
    verses: [
      { ref: '사도행전 7:60', text_ko: '무릎을 꿇고 크게 불러 이르되 주여 이 죄를 그들에게 돌리지 마옵소서 이 말을 하고 자니라', text_en: 'Then he fell on his knees and cried out, "Lord, do not hold this sin against them." When he had said this, he fell asleep' },
      { ref: '사도행전 7:56', text_ko: '보라 하늘이 열리고 인자가 하나님 우편에 서신 것을 보노라', text_en: 'Look, I see heaven open and the Son of Man standing at the right hand of God' }
    ],
    labels: ['순교자', '집사', '용서', 'Martyr', 'Deacon', 'Forgiveness'],
    era: 'new_testament',
    location: '예루살렘',
    hymns: [400]
  },

  { 
    id: 'philip_evangelist', 
    name_ko: '전도자 빌립', 
    name_en: 'Philip the Evangelist', 
    testament: 'new', 
    importance: 4,
    books: ['act'],
    description_ko: '일곱 집사 중 한 명 (사도 빌립과 다름). 에티오피아 내시에게 복음을 전함.',
    description_en: 'One of the seven deacons (different from the apostle Philip). Evangelized the Ethiopian eunuch.',
    verses: [
      { ref: '사도행전 8:35', text_ko: '빌립이 입을 열어 이 글에서 시작하여 예수를 그에게 전도하니', text_en: 'Then Philip began with that very passage of Scripture and told him the good news about Jesus' }
    ],
    labels: ['전도자', '집사', 'Evangelist', 'Deacon'],
    era: 'new_testament',
    location: '가이사랴',
    hymns: []
  },

  { 
    id: 'cornelius', 
    name_ko: '고넬료', 
    name_en: 'Cornelius', 
    testament: 'new', 
    importance: 4,
    books: ['act'],
    description_ko: '로마 백부장. 경건한 이방인. 베드로를 통해 복음을 듣고 이방인 최초로 성령을 받음.',
    description_en: 'Roman centurion. Devout Gentile. First Gentile to receive the Holy Spirit through Peter\'s preaching.',
    verses: [
      { ref: '사도행전 10:34-35', text_ko: '하나님은 사람의 외모를 보지 아니하시고 각 나라 중 하나님을 경외하며 의를 행하는 사람은 다 받으시는 줄 깨달았도다', text_en: 'God does not show favoritism but accepts from every nation the one who fears him and does what is right' }
    ],
    labels: ['백부장', '이방인 회심', 'Centurion', 'Gentile Convert'],
    era: 'new_testament',
    location: '가이사랴',
    hymns: []
  },

  { 
    id: 'james_brother', 
    name_ko: '주의 형제 야고보', 
    name_en: 'James (Brother of Jesus)', 
    testament: 'new', 
    importance: 5,
    books: ['mat', 'mrk', 'act', 'gal', 'jas'],
    description_ko: '예수님의 형제. 예루살렘 교회의 지도자. 야고보서의 저자.',
    description_en: 'Brother of Jesus. Leader of Jerusalem church. Author of the Epistle of James.',
    verses: [
      { ref: '야고보서 2:17', text_ko: '이와 같이 행함이 없는 믿음은 그 자체가 죽은 것이라', text_en: 'Faith by itself, if it is not accompanied by action, is dead' },
      { ref: '사도행전 15:13', text_ko: '그들이 말을 마치매 야고보가 대답하여 이르되', text_en: 'When they finished, James spoke up' }
    ],
    labels: ['예루살렘 교회', '야고보서', 'Jerusalem Church', 'Epistle of James'],
    era: 'new_testament',
    location: '예루살렘',
    hymns: []
  },

  { 
    id: 'ananias_damascus', 
    name_ko: '아나니아 (다메섹)', 
    name_en: 'Ananias of Damascus', 
    testament: 'new', 
    importance: 4,
    books: ['act'],
    description_ko: '다메섹의 제자. 하나님의 명령으로 사울을 찾아가 안수하여 눈을 뜨게 함.',
    description_en: 'Disciple in Damascus. Sent by God to lay hands on Saul and restore his sight.',
    verses: [
      { ref: '사도행전 9:17', text_ko: '아나니아가 떠나 그 집에 들어가서 그에게 안수하여 이르되 형제 사울아 주 곧 네가 오는 길에서 나타나신 예수께서 나를 보내어 너로 다시 보게 하시고 성령으로 충만하게 하신다 하니', text_en: 'Ananias went to the house and placed his hands on Saul. "Brother Saul," he said, "the Lord—Jesus, who appeared to you on the road—has sent me so that you may see again and be filled with the Holy Spirit"' }
    ],
    labels: ['순종', '안수', 'Obedience', 'Laying on of Hands'],
    era: 'new_testament',
    location: '다메섹',
    hymns: []
  },

  { 
    id: 'onesimus', 
    name_ko: '오네시모', 
    name_en: 'Onesimus', 
    testament: 'new', 
    importance: 3,
    books: ['col', 'phm'],
    description_ko: '빌레몬의 도망친 노예. 바울을 통해 그리스도인이 됨. 빌레몬서의 주인공.',
    description_en: 'Runaway slave of Philemon. Became a Christian through Paul. Subject of the Epistle to Philemon.',
    verses: [
      { ref: '빌레몬서 1:16', text_ko: '다시는 종으로가 아니요 종 이상으로 곧 사랑 받는 형제로 두라', text_en: 'No longer as a slave, but better than a slave, as a dear brother' }
    ],
    labels: ['노예', '회심', 'Slave', 'Convert'],
    era: 'new_testament',
    location: '골로새, 로마',
    hymns: []
  },

  { 
    id: 'philemon', 
    name_ko: '빌레몬', 
    name_en: 'Philemon', 
    testament: 'new', 
    importance: 3,
    books: ['phm'],
    description_ko: '골로새의 부유한 그리스도인. 오네시모의 주인. 바울의 친구.',
    description_en: 'Wealthy Christian of Colossae. Master of Onesimus. Friend of Paul.',
    verses: [
      { ref: '빌레몬서 1:7', text_ko: '형제여 성도들의 마음이 너로 말미암아 평안함을 얻었으니 내가 너의 사랑으로 많은 기쁨과 위로를 받았노라', text_en: 'Your love has given me great joy and encouragement, because you, brother, have refreshed the hearts of the Lord\'s people' }
    ],
    labels: ['주인', '용서', 'Master', 'Forgiveness'],
    era: 'new_testament',
    location: '골로새',
    hymns: []
  }
];

export default charactersNewTestament;
