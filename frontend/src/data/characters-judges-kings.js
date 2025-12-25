// 사사 시대 및 왕정 시대 인물들
export const judgesKingsCharacters = [
  // === 사사들 ===
  {
    id: 'othniel',
    name_ko: '옷니엘',
    name_en: 'Othniel',
    testament: 'old',
    era: 'judges',
    importance: 5,
    description_ko: '첫 번째 사사, 갈렙의 조카. 구산리사다임으로부터 이스라엘을 구함.',
    description_en: 'First judge, Caleb\'s nephew. Delivered Israel from Cushan-Rishathaim.',
    labels: ['사사', '구원자'],
    books: ['judges']
  },
  {
    id: 'ehud',
    name_ko: '에훗',
    name_en: 'Ehud',
    testament: 'old',
    era: 'judges',
    importance: 5,
    description_ko: '왼손잡이 사사. 모압 왕 에글론을 죽이고 이스라엘을 구함.',
    description_en: 'Left-handed judge. Killed Eglon king of Moab, delivered Israel.',
    labels: ['사사', '구원자'],
    books: ['judges']
  },
  {
    id: 'shamgar',
    name_ko: '삼갈',
    name_en: 'Shamgar',
    testament: 'old',
    era: 'judges',
    importance: 3,
    description_ko: '소 모는 막대기로 블레셋 600명을 죽인 사사.',
    description_en: 'Judge who killed 600 Philistines with an oxgoad.',
    labels: ['사사'],
    books: ['judges']
  },
  {
    id: 'deborah',
    name_ko: '드보라',
    name_en: 'Deborah',
    testament: 'old',
    era: 'judges',
    importance: 7,
    description_ko: '여선지자이자 사사. 야빈과 시스라에게서 이스라엘을 구함.',
    description_en: 'Prophetess and judge. Delivered Israel from Jabin and Sisera.',
    labels: ['사사', '선지자', '여성 지도자'],
    books: ['judges'],
    verses: [
      { ref: '사사기 4:4', text_ko: '그때에 랍비돗의 아내 여선지자 드보라가 이스라엘 사사가 되었는데', text_en: 'Now Deborah, a prophet, the wife of Lappidoth, was leading Israel at that time.' }
    ]
  },
  {
    id: 'barak',
    name_ko: '바락',
    name_en: 'Barak',
    testament: 'old',
    era: 'judges',
    importance: 5,
    description_ko: '드보라와 함께 시스라의 군대를 물리친 장수.',
    description_en: 'Military leader who defeated Sisera\'s army with Deborah.',
    labels: ['장수', '영웅'],
    books: ['judges', 'hebrews']
  },
  {
    id: 'jael',
    name_ko: '야엘',
    name_en: 'Jael',
    testament: 'old',
    era: 'judges',
    importance: 5,
    description_ko: '헤벨의 아내. 장막 말뚝으로 시스라를 죽임.',
    description_en: 'Wife of Heber. Killed Sisera with a tent peg.',
    labels: ['영웅', '여성'],
    books: ['judges']
  },
  {
    id: 'sisera',
    name_ko: '시스라',
    name_en: 'Sisera',
    testament: 'old',
    era: 'judges',
    importance: 4,
    description_ko: '가나안 왕 야빈의 군대 장관. 야엘에게 죽임을 당함.',
    description_en: 'Commander of Jabin\'s army. Killed by Jael.',
    labels: ['장군', '대적'],
    books: ['judges']
  },
  {
    id: 'gideon',
    name_ko: '기드온',
    name_en: 'Gideon',
    testament: 'old',
    era: 'judges',
    importance: 8,
    description_ko: '300명으로 미디안 대군을 물리친 사사. 양털 시험으로 유명.',
    description_en: 'Judge who defeated Midianite army with 300 men. Known for fleece test.',
    labels: ['사사', '구원자', '용사'],
    books: ['judges', 'hebrews'],
    verses: [
      { ref: '사사기 7:7', text_ko: '여호와께서 기드온에게 이르시되 물을 핥아 먹은 삼백 명으로 내가 너희를 구원하리라', text_en: 'The LORD said to Gideon, "With the three hundred men that lapped I will save you."' }
    ]
  },
  {
    id: 'abimelech',
    name_ko: '아비멜렉',
    name_en: 'Abimelech',
    testament: 'old',
    era: 'judges',
    importance: 4,
    description_ko: '기드온의 아들. 형제 70명을 죽이고 왕이 되었다가 비참하게 죽음.',
    description_en: 'Gideon\'s son. Killed 70 brothers to become king, died shamefully.',
    labels: ['왕', '폭군'],
    books: ['judges']
  },
  {
    id: 'jephthah',
    name_ko: '입다',
    name_en: 'Jephthah',
    testament: 'old',
    era: 'judges',
    importance: 6,
    description_ko: '기생의 아들 사사. 암몬을 물리쳤으나 서원으로 딸을 잃음.',
    description_en: 'Judge, son of a prostitute. Defeated Ammon but lost daughter to vow.',
    labels: ['사사', '구원자'],
    books: ['judges', 'hebrews']
  },
  {
    id: 'samson',
    name_ko: '삼손',
    name_en: 'Samson',
    testament: 'old',
    era: 'judges',
    importance: 8,
    description_ko: '나실인 사사, 초인적 힘의 소유자. 블레셋과 싸우다 죽음.',
    description_en: 'Nazirite judge with supernatural strength. Fought Philistines to death.',
    labels: ['사사', '나실인', '용사'],
    books: ['judges', 'hebrews'],
    verses: [
      { ref: '사사기 16:30', text_ko: '삼손이 이르되 블레셋 사람과 함께 죽게 하소서 하고 힘을 다하여 그 기둥을 미니', text_en: 'Samson said, "Let me die with the Philistines!" Then he pushed with all his might.' }
    ]
  },
  {
    id: 'delilah',
    name_ko: '들릴라',
    name_en: 'Delilah',
    testament: 'old',
    era: 'judges',
    importance: 6,
    description_ko: '삼손의 연인. 블레셋에 매수되어 삼손의 힘의 비밀을 알아냄.',
    description_en: 'Samson\'s lover. Bribed by Philistines to discover source of his strength.',
    labels: ['배신자'],
    books: ['judges']
  },
  {
    id: 'manoah',
    name_ko: '마노아',
    name_en: 'Manoah',
    testament: 'old',
    era: 'judges',
    importance: 3,
    description_ko: '단 지파, 삼손의 아버지.',
    description_en: 'Danite, father of Samson.',
    labels: ['아버지'],
    books: ['judges']
  },
  {
    id: 'eli',
    name_ko: '엘리',
    name_en: 'Eli',
    testament: 'old',
    era: 'judges',
    importance: 6,
    description_ko: '대제사장이자 사사. 아들들의 악행을 막지 못함. 사무엘을 키움.',
    description_en: 'High priest and judge. Failed to restrain wicked sons. Raised Samuel.',
    labels: ['대제사장', '사사'],
    books: ['1samuel']
  },
  {
    id: 'hophni',
    name_ko: '홉니',
    name_en: 'Hophni',
    testament: 'old',
    era: 'judges',
    importance: 3,
    description_ko: '엘리의 아들. 악행으로 블레셋과의 전투에서 죽음.',
    description_en: 'Eli\'s son. Died in battle against Philistines due to wickedness.',
    labels: ['제사장', '악인'],
    books: ['1samuel']
  },
  {
    id: 'phinehas_eli',
    name_ko: '비느하스 (엘리의 아들)',
    name_en: 'Phinehas (Eli\'s son)',
    testament: 'old',
    era: 'judges',
    importance: 3,
    description_ko: '엘리의 아들. 형 홉니와 함께 악행하다 전사함.',
    description_en: 'Eli\'s son. Died with brother Hophni due to wickedness.',
    labels: ['제사장', '악인'],
    books: ['1samuel']
  },
  // === 사무엘과 초기 왕정 ===
  {
    id: 'hannah',
    name_ko: '한나',
    name_en: 'Hannah',
    testament: 'old',
    era: 'judges',
    importance: 7,
    description_ko: '엘가나의 아내, 사무엘의 어머니. 기도로 아들을 얻고 성전에 바침.',
    description_en: 'Wife of Elkanah, mother of Samuel. Received son through prayer, dedicated him.',
    labels: ['어머니', '기도의 여인'],
    books: ['1samuel'],
    verses: [
      { ref: '사무엘상 1:27-28', text_ko: '이 아이를 위하여 내가 기도하였더니 여호와께서 청한 바를 허락하셨으므로', text_en: 'I prayed for this child, and the LORD has granted me what I asked of him.' }
    ]
  },
  {
    id: 'elkanah',
    name_ko: '엘가나',
    name_en: 'Elkanah',
    testament: 'old',
    era: 'judges',
    importance: 3,
    description_ko: '에브라임 산지 사람, 사무엘의 아버지.',
    description_en: 'Man from Ephraim, father of Samuel.',
    labels: ['아버지'],
    books: ['1samuel']
  },
  {
    id: 'peninnah',
    name_ko: '브닌나',
    name_en: 'Peninnah',
    testament: 'old',
    era: 'judges',
    importance: 2,
    description_ko: '엘가나의 다른 아내. 한나를 괴롭힘.',
    description_en: 'Elkanah\'s other wife. Provoked Hannah.',
    labels: ['아내'],
    books: ['1samuel']
  },
  // === 사울 왕 시대 ===
  {
    id: 'kish',
    name_ko: '기스',
    name_en: 'Kish',
    testament: 'old',
    era: 'united_kingdom',
    importance: 3,
    description_ko: '베냐민 지파의 부유한 사람, 사울 왕의 아버지.',
    description_en: 'Wealthy Benjamite, father of King Saul.',
    labels: ['아버지'],
    books: ['1samuel']
  },
  {
    id: 'saul',
    name_ko: '사울',
    name_en: 'Saul',
    testament: 'old',
    era: 'united_kingdom',
    importance: 9,
    description_ko: '이스라엘의 초대 왕. 처음에는 겸손했으나 불순종으로 버림받음.',
    description_en: 'Israel\'s first king. Initially humble but rejected for disobedience.',
    labels: ['왕', '베냐민 지파'],
    books: ['1samuel', 'acts'],
    verses: [
      { ref: '사무엘상 15:22', text_ko: '순종이 제사보다 낫고 듣는 것이 숫양의 기름보다 나으니', text_en: 'To obey is better than sacrifice, and to heed is better than the fat of rams.' }
    ]
  },
  {
    id: 'jonathan',
    name_ko: '요나단',
    name_en: 'Jonathan',
    testament: 'old',
    era: 'united_kingdom',
    importance: 7,
    description_ko: '사울의 장남, 다윗의 절친한 친구. 길보아 전투에서 전사.',
    description_en: 'Saul\'s son, David\'s closest friend. Died at Battle of Gilboa.',
    labels: ['왕자', '용사', '친구'],
    books: ['1samuel', '2samuel'],
    verses: [
      { ref: '사무엘상 18:1', text_ko: '요나단의 마음이 다윗의 마음과 하나가 되어 요나단이 그를 자기 생명같이 사랑하니라', text_en: 'Jonathan became one in spirit with David, and he loved him as himself.' }
    ]
  },
  {
    id: 'michal',
    name_ko: '미갈',
    name_en: 'Michal',
    testament: 'old',
    era: 'united_kingdom',
    importance: 5,
    description_ko: '사울의 딸, 다윗의 첫째 아내. 다윗이 춤출 때 업신여김.',
    description_en: 'Saul\'s daughter, David\'s first wife. Despised David for dancing.',
    labels: ['공주', '아내'],
    books: ['1samuel', '2samuel']
  },
  {
    id: 'abner',
    name_ko: '아브넬',
    name_en: 'Abner',
    testament: 'old',
    era: 'united_kingdom',
    importance: 6,
    description_ko: '사울의 군대 장관. 후에 다윗에게 투항했다가 요압에게 살해됨.',
    description_en: 'Commander of Saul\'s army. Defected to David, killed by Joab.',
    labels: ['장군'],
    books: ['1samuel', '2samuel']
  },
  {
    id: 'ish_bosheth',
    name_ko: '이스보셋',
    name_en: 'Ish-Bosheth',
    testament: 'old',
    era: 'united_kingdom',
    importance: 4,
    description_ko: '사울의 아들, 잠시 이스라엘의 왕. 암살당함.',
    description_en: 'Saul\'s son, briefly king of Israel. Assassinated.',
    labels: ['왕'],
    books: ['2samuel']
  },
  // === 다윗 왕 시대 ===
  {
    id: 'jesse',
    name_ko: '이새',
    name_en: 'Jesse',
    testament: 'old',
    era: 'united_kingdom',
    importance: 5,
    description_ko: '베들레헴의 에브랏 사람, 다윗의 아버지.',
    description_en: 'Ephrathite from Bethlehem, father of David.',
    labels: ['아버지', '예수님의 조상'],
    books: ['1samuel', 'isaiah', 'matthew']
  },
  {
    id: 'goliath',
    name_ko: '골리앗',
    name_en: 'Goliath',
    testament: 'old',
    era: 'united_kingdom',
    importance: 7,
    description_ko: '블레셋의 거인 전사. 소년 다윗에게 죽임을 당함.',
    description_en: 'Philistine giant warrior. Killed by young David with a sling.',
    labels: ['거인', '대적'],
    books: ['1samuel'],
    verses: [
      { ref: '사무엘상 17:45', text_ko: '너는 칼과 창과 단창으로 내게 나아오거니와 나는 만군의 여호와의 이름으로 네게 나아가노라', text_en: 'You come against me with sword and spear, but I come against you in the name of the LORD.' }
    ]
  },
  {
    id: 'joab',
    name_ko: '요압',
    name_en: 'Joab',
    testament: 'old',
    era: 'united_kingdom',
    importance: 7,
    description_ko: '다윗의 조카, 군대 장관. 충성스러웠으나 잔인함.',
    description_en: 'David\'s nephew, army commander. Loyal but ruthless.',
    labels: ['장군'],
    books: ['2samuel', '1kings']
  },
  {
    id: 'abishai',
    name_ko: '아비새',
    name_en: 'Abishai',
    testament: 'old',
    era: 'united_kingdom',
    importance: 5,
    description_ko: '요압의 형제, 다윗의 용사 중 한 명.',
    description_en: 'Joab\'s brother, one of David\'s mighty warriors.',
    labels: ['용사'],
    books: ['2samuel']
  },
  {
    id: 'asahel',
    name_ko: '아사헬',
    name_en: 'Asahel',
    testament: 'old',
    era: 'united_kingdom',
    importance: 4,
    description_ko: '요압과 아비새의 형제, 빠른 발. 아브넬에게 살해됨.',
    description_en: 'Brother of Joab and Abishai, swift runner. Killed by Abner.',
    labels: ['용사'],
    books: ['2samuel']
  },
  {
    id: 'bathsheba',
    name_ko: '밧세바',
    name_en: 'Bathsheba',
    testament: 'old',
    era: 'united_kingdom',
    importance: 7,
    description_ko: '우리아의 아내, 후에 다윗의 아내. 솔로몬의 어머니.',
    description_en: 'Wife of Uriah, then David. Mother of Solomon.',
    labels: ['왕비', '어머니', '예수님의 조상'],
    books: ['2samuel', '1kings', 'matthew']
  },
  {
    id: 'uriah',
    name_ko: '우리아',
    name_en: 'Uriah',
    testament: 'old',
    era: 'united_kingdom',
    importance: 5,
    description_ko: '헷 사람, 다윗의 용사. 밧세바의 남편. 다윗에 의해 죽임을 당함.',
    description_en: 'Hittite, David\'s warrior. Bathsheba\'s husband. Killed by David\'s order.',
    labels: ['용사', '순교자'],
    books: ['2samuel', 'matthew']
  },
  {
    id: 'nathan_prophet',
    name_ko: '나단',
    name_en: 'Nathan',
    testament: 'old',
    era: 'united_kingdom',
    importance: 7,
    description_ko: '다윗과 솔로몬 시대의 선지자. 다윗의 죄를 책망함.',
    description_en: 'Prophet in David and Solomon\'s time. Confronted David about his sin.',
    labels: ['선지자'],
    books: ['2samuel', '1kings'],
    verses: [
      { ref: '사무엘하 12:7', text_ko: '나단이 다윗에게 이르되 당신이 그 사람이라', text_en: 'Then Nathan said to David, "You are the man!"' }
    ]
  },
  {
    id: 'absalom',
    name_ko: '압살롬',
    name_en: 'Absalom',
    testament: 'old',
    era: 'united_kingdom',
    importance: 7,
    description_ko: '다윗의 아들. 반역을 일으켰다가 요압에게 살해됨.',
    description_en: 'David\'s son. Led rebellion against David, killed by Joab.',
    labels: ['왕자', '반역자'],
    books: ['2samuel']
  },
  {
    id: 'amnon',
    name_ko: '암논',
    name_en: 'Amnon',
    testament: 'old',
    era: 'united_kingdom',
    importance: 4,
    description_ko: '다윗의 장남. 이복 누이 다말을 욕보여 압살롬에게 살해됨.',
    description_en: 'David\'s firstborn. Violated half-sister Tamar, killed by Absalom.',
    labels: ['왕자'],
    books: ['2samuel']
  },
  {
    id: 'tamar_david',
    name_ko: '다말 (다윗의 딸)',
    name_en: 'Tamar (David\'s daughter)',
    testament: 'old',
    era: 'united_kingdom',
    importance: 4,
    description_ko: '다윗의 딸, 압살롬의 누이. 암논에게 욕을 당함.',
    description_en: 'David\'s daughter, Absalom\'s sister. Violated by Amnon.',
    labels: ['공주'],
    books: ['2samuel']
  },
  {
    id: 'adonijah',
    name_ko: '아도니야',
    name_en: 'Adonijah',
    testament: 'old',
    era: 'united_kingdom',
    importance: 5,
    description_ko: '다윗의 아들. 왕위를 찬탈하려다 솔로몬에 의해 처형됨.',
    description_en: 'David\'s son. Attempted to seize throne, executed by Solomon.',
    labels: ['왕자'],
    books: ['1kings']
  },
  {
    id: 'mephibosheth',
    name_ko: '므비보셋',
    name_en: 'Mephibosheth',
    testament: 'old',
    era: 'united_kingdom',
    importance: 5,
    description_ko: '요나단의 아들, 절름발이. 다윗에게 은혜를 입음.',
    description_en: 'Jonathan\'s son, lame. Received kindness from David.',
    labels: ['왕손'],
    books: ['2samuel']
  },
  // === 솔로몬과 분열 왕국 ===
  {
    id: 'hiram',
    name_ko: '히람',
    name_en: 'Hiram',
    testament: 'old',
    era: 'united_kingdom',
    importance: 5,
    description_ko: '두로 왕. 솔로몬에게 성전 건축 재료를 공급함.',
    description_en: 'King of Tyre. Supplied materials for Solomon\'s temple.',
    labels: ['왕', '동맹'],
    books: ['1kings', '2chronicles']
  },
  {
    id: 'queen_sheba',
    name_ko: '스바 여왕',
    name_en: 'Queen of Sheba',
    testament: 'old',
    era: 'united_kingdom',
    importance: 6,
    description_ko: '솔로몬의 지혜를 시험하러 온 여왕.',
    description_en: 'Queen who came to test Solomon\'s wisdom.',
    labels: ['여왕', '이방인'],
    books: ['1kings', 'matthew'],
    verses: [
      { ref: '열왕기상 10:7', text_ko: '당신의 지혜와 부요함이 내가 들은 소문에 지나도다', text_en: 'Your wisdom and prosperity exceeds the report I heard.' }
    ]
  },
  {
    id: 'rehoboam',
    name_ko: '르호보암',
    name_en: 'Rehoboam',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 6,
    description_ko: '솔로몬의 아들, 유다의 초대 왕. 어리석은 결정으로 왕국이 분열됨.',
    description_en: 'Solomon\'s son, first king of Judah. Foolish decision split kingdom.',
    labels: ['왕', '유다'],
    books: ['1kings', '2chronicles']
  },
  {
    id: 'jeroboam',
    name_ko: '여로보암',
    name_en: 'Jeroboam',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 7,
    description_ko: '북이스라엘의 초대 왕. 금송아지 우상을 세움.',
    description_en: 'First king of Northern Israel. Set up golden calf idols.',
    labels: ['왕', '이스라엘'],
    books: ['1kings']
  },
  {
    id: 'ahab',
    name_ko: '아합',
    name_en: 'Ahab',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 7,
    description_ko: '이스라엘의 가장 악한 왕 중 하나. 이세벨의 남편.',
    description_en: 'One of Israel\'s most wicked kings. Husband of Jezebel.',
    labels: ['왕', '이스라엘', '악왕'],
    books: ['1kings', '2kings']
  },
  {
    id: 'jezebel',
    name_ko: '이세벨',
    name_en: 'Jezebel',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 7,
    description_ko: '아합의 아내, 시돈 공주. 바알 숭배를 도입하고 선지자들을 죽임.',
    description_en: 'Ahab\'s wife, Sidonian princess. Introduced Baal worship, killed prophets.',
    labels: ['왕비', '악인', '이방인'],
    books: ['1kings', '2kings', 'revelation']
  },
  {
    id: 'obadiah_ahab',
    name_ko: '오바댜 (아합의 신하)',
    name_en: 'Obadiah (Ahab\'s servant)',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 4,
    description_ko: '아합의 궁내 대신. 이세벨에게서 선지자 100명을 숨겨 구함.',
    description_en: 'Ahab\'s palace administrator. Hid 100 prophets from Jezebel.',
    labels: ['신하', '신실한 자'],
    books: ['1kings']
  },
  {
    id: 'naboth',
    name_ko: '나봇',
    name_en: 'Naboth',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 4,
    description_ko: '이스르엘 사람. 포도원을 지키다 이세벨에 의해 억울하게 죽음.',
    description_en: 'Man from Jezreel. Unjustly killed by Jezebel for his vineyard.',
    labels: ['순교자'],
    books: ['1kings']
  },
  {
    id: 'jehu',
    name_ko: '예후',
    name_en: 'Jehu',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 6,
    description_ko: '이스라엘 왕. 아합 가문과 이세벨, 바알 선지자들을 멸함.',
    description_en: 'King of Israel. Destroyed house of Ahab, Jezebel, and Baal prophets.',
    labels: ['왕', '심판자'],
    books: ['2kings']
  },
  {
    id: 'athaliah',
    name_ko: '아달랴',
    name_en: 'Athaliah',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 5,
    description_ko: '아합의 딸, 유다의 유일한 여왕. 왕족을 살해하고 6년간 통치.',
    description_en: 'Ahab\'s daughter, Judah\'s only queen. Killed royal family, ruled 6 years.',
    labels: ['여왕', '악인'],
    books: ['2kings', '2chronicles']
  },
  {
    id: 'joash_judah',
    name_ko: '요아스 (유다)',
    name_en: 'Joash (Judah)',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 6,
    description_ko: '아달랴에게서 살아남은 왕자. 7세에 왕이 되어 성전을 수리함.',
    description_en: 'Prince who survived Athaliah. Became king at 7, repaired temple.',
    labels: ['왕', '유다'],
    books: ['2kings', '2chronicles']
  },
  {
    id: 'hezekiah',
    name_ko: '히스기야',
    name_en: 'Hezekiah',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 8,
    description_ko: '유다의 선한 왕. 앗수르의 침략에서 기도로 구원받음.',
    description_en: 'Good king of Judah. Delivered from Assyrian invasion through prayer.',
    labels: ['왕', '유다', '개혁자'],
    books: ['2kings', 'isaiah', 'matthew'],
    verses: [
      { ref: '열왕기하 19:19', text_ko: '우리 하나님 여호와여 이제 우리를 그의 손에서 구원하소서', text_en: 'Now, LORD our God, deliver us from his hand, so that all the kingdoms of the earth may know.' }
    ]
  },
  {
    id: 'josiah',
    name_ko: '요시아',
    name_en: 'Josiah',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 8,
    description_ko: '유다의 가장 경건한 왕 중 한 명. 율법책을 발견하고 대개혁을 단행함.',
    description_en: 'One of Judah\'s most godly kings. Found Book of Law, led great reform.',
    labels: ['왕', '유다', '개혁자'],
    books: ['2kings', '2chronicles'],
    verses: [
      { ref: '열왕기하 23:25', text_ko: '요시야와 같이 마음과 뜻과 힘을 다하여 여호와께로 돌이켜 모세의 모든 율법을 따른 왕은 그 전에도 없었고 그 후에도 없었더라', text_en: 'Neither before nor after Josiah was there a king like him who turned to the LORD.' }
    ]
  },
  {
    id: 'zedekiah',
    name_ko: '시드기야',
    name_en: 'Zedekiah',
    testament: 'old',
    era: 'exile',
    importance: 5,
    description_ko: '유다의 마지막 왕. 바벨론에 반역하여 예루살렘 멸망을 초래함.',
    description_en: 'Last king of Judah. Rebelled against Babylon, caused Jerusalem\'s fall.',
    labels: ['왕', '유다'],
    books: ['2kings', 'jeremiah']
  },
  {
    id: 'nebuchadnezzar',
    name_ko: '느부갓네살',
    name_en: 'Nebuchadnezzar',
    testament: 'old',
    era: 'exile',
    importance: 8,
    description_ko: '바벨론의 위대한 왕. 예루살렘을 멸망시킴. 다니엘의 꿈을 통해 하나님을 알게 됨.',
    description_en: 'Great king of Babylon. Destroyed Jerusalem. Learned of God through Daniel.',
    labels: ['왕', '바벨론'],
    books: ['2kings', 'daniel', 'jeremiah'],
    verses: [
      { ref: '다니엘 4:37', text_ko: '그러므로 이제 나 느부갓네살은 하늘의 왕을 찬양하며 칭송하며 경배하노니', text_en: 'Now I, Nebuchadnezzar, praise and exalt and glorify the King of heaven.' }
    ]
  }
];
