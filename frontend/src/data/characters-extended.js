// 성경 인물 데이터 (확장 버전 Part 2)
// 출애굽, 사사, 왕국, 선지자, 신약 인물

export const charactersExtended = [
  // ==================== 출애굽 시대 ====================
  { 
    id: 'moses', 
    name_ko: '모세', 
    name_en: 'Moses', 
    testament: 'old', 
    importance: 9,
    books: ['exo', 'lev', 'num', 'deu', 'jos', 'mat', 'mrk', 'luk', 'jhn', 'act', 'heb'],
    description_ko: '이스라엘을 이집트에서 인도해낸 지도자. 시내산에서 십계명을 받음. 율법을 기록함.',
    description_en: 'Leader who brought Israel out of Egypt. Received the Ten Commandments on Mount Sinai.',
    verses: [
      { ref: '출애굽기 3:10', text_ko: '내가 이제 너를 바로에게 보내어 내 백성 이스라엘 자손을 애굽에서 인도하여 내게 하리라', text_en: 'I am sending you to Pharaoh to bring my people the Israelites out of Egypt' },
      { ref: '신명기 34:10', text_ko: '모세와 같은 선지자가 이스라엘에 다시 일어나지 못하였으니', text_en: 'Since then, no prophet has risen in Israel like Moses' }
    ],
    labels: ['해방자', '율법 수여자', '십계명', 'Liberator', 'Lawgiver', 'Ten Commandments'],
    era: 'exodus',
    location: '이집트, 시내산, 광야',
    hymns: [282]
  },

  { 
    id: 'aaron', 
    name_ko: '아론', 
    name_en: 'Aaron', 
    testament: 'old', 
    importance: 6,
    books: ['exo', 'lev', 'num', 'psa', 'heb'],
    description_ko: '모세의 형. 이스라엘 최초의 대제사장. 모세를 도와 바로 앞에서 말함.',
    description_en: 'Brother of Moses. First High Priest of Israel. Spoke for Moses before Pharaoh.',
    verses: [
      { ref: '출애굽기 4:14-16', text_ko: '레위 사람 네 형 아론이 있지 아니하냐 그가 말 잘하는 것을 내가 아노라', text_en: 'What about your brother, Aaron the Levite? I know he can speak well' },
      { ref: '히브리서 5:4', text_ko: '아론과 같이 하나님의 부르심을 받은 자라야 할 것이니라', text_en: 'As Aaron was' }
    ],
    labels: ['대제사장', '모세의 형', 'High Priest', "Moses' Brother"],
    era: 'exodus',
    location: '이집트, 시내산, 광야',
    hymns: []
  },

  { 
    id: 'miriam', 
    name_ko: '미리암', 
    name_en: 'Miriam', 
    testament: 'old', 
    importance: 5,
    books: ['exo', 'num', 'mic'],
    description_ko: '모세와 아론의 누나. 여선지자. 홍해를 건넌 후 찬양을 이끔.',
    description_en: 'Sister of Moses and Aaron. Prophetess who led worship after crossing the Red Sea.',
    verses: [
      { ref: '출애굽기 15:20-21', text_ko: '아론의 누이 선지자 미리암이 손에 소고를 잡으매 모든 여인도 소고를 잡고 춤추며', text_en: 'Miriam the prophet took a timbrel in her hand, and all the women followed her' }
    ],
    labels: ['여선지자', '찬양 인도자', 'Prophetess', 'Worship Leader'],
    era: 'exodus',
    location: '이집트, 광야',
    hymns: []
  },

  { 
    id: 'joshua', 
    name_ko: '여호수아', 
    name_en: 'Joshua', 
    testament: 'old', 
    importance: 7,
    books: ['exo', 'num', 'deu', 'jos', 'jdg', 'heb'],
    description_ko: '모세의 후계자. 이스라엘을 가나안 땅으로 인도함. 여리고 성을 정복.',
    description_en: 'Successor of Moses. Led Israel into Canaan. Conquered Jericho.',
    verses: [
      { ref: '여호수아 1:9', text_ko: '내가 네게 명령한 것이 아니냐 강하고 담대하라', text_en: 'Have I not commanded you? Be strong and courageous' },
      { ref: '여호수아 24:15', text_ko: '오직 나와 내 집은 여호와를 섬기겠노라', text_en: 'But as for me and my household, we will serve the LORD' }
    ],
    labels: ['가나안 정복', '여리고', '모세의 후계자', 'Canaan Conquest', 'Jericho'],
    era: 'conquest',
    location: '광야, 가나안',
    hymns: [384]
  },

  { 
    id: 'caleb', 
    name_ko: '갈렙', 
    name_en: 'Caleb', 
    testament: 'old', 
    importance: 5,
    books: ['num', 'deu', 'jos', 'jdg'],
    description_ko: '여호수아와 함께 가나안을 정탐한 12명 중 하나. 믿음으로 좋은 보고를 함. 85세에도 산지를 요청.',
    description_en: 'One of 12 spies with Joshua. Gave faithful report. Asked for hill country at age 85.',
    verses: [
      { ref: '민수기 14:24', text_ko: '오직 내 종 갈렙은 그에게 다른 마음이 있어 나를 온전히 따랐으니', text_en: 'My servant Caleb has a different spirit and follows me wholeheartedly' },
      { ref: '여호수아 14:12', text_ko: '이 산지를 내게 주소서', text_en: 'Give me this hill country' }
    ],
    labels: ['정탐꾼', '믿음', '온전한 순종', 'Spy', 'Faithful', 'Wholehearted'],
    era: 'conquest',
    location: '광야, 헤브론',
    hymns: []
  },

  { 
    id: 'rahab', 
    name_ko: '라합', 
    name_en: 'Rahab', 
    testament: 'old', 
    importance: 5,
    books: ['jos', 'mat', 'heb', 'jas'],
    description_ko: '여리고의 기생. 이스라엘 정탐꾼을 숨겨주어 가족과 함께 구원받음. 예수님의 족보에 포함됨.',
    description_en: 'Prostitute of Jericho. Hid Israeli spies and was saved with her family. In Jesus\' genealogy.',
    verses: [
      { ref: '여호수아 2:11', text_ko: '여호와는 위로는 하늘에서 아래로는 땅에서 하나님이시니라', text_en: 'The LORD your God is God in heaven above and on the earth below' },
      { ref: '히브리서 11:31', text_ko: '믿음으로 기생 라합은 정탐꾼을 평안히 영접하였으므로', text_en: 'By faith the prostitute Rahab was not killed with those who were disobedient' }
    ],
    labels: ['여리고', '믿음', '구원', 'Jericho', 'Faith', 'Salvation'],
    era: 'conquest',
    location: '여리고',
    hymns: []
  },

  // ==================== 사사 시대 ====================
  { 
    id: 'deborah', 
    name_ko: '드보라', 
    name_en: 'Deborah', 
    testament: 'old', 
    importance: 6,
    books: ['jdg'],
    description_ko: '이스라엘의 유일한 여성 사사. 선지자이자 재판관. 바락과 함께 가나안을 물리침.',
    description_en: 'Only female judge of Israel. Prophet and judge who defeated Canaan with Barak.',
    verses: [
      { ref: '사사기 4:4', text_ko: '랍비돗의 아내 여선지자 드보라가 그 때에 이스라엘의 사사가 되어', text_en: 'Deborah, a prophet, the wife of Lappidoth, was leading Israel at that time' },
      { ref: '사사기 5:7', text_ko: '이스라엘에 어머니 같은 내가 일어났도다', text_en: 'I, Deborah, arose, arose a mother in Israel' }
    ],
    labels: ['여사사', '선지자', '어머니', 'Female Judge', 'Prophet', 'Mother of Israel'],
    era: 'judges',
    location: '에브라임 산지',
    hymns: []
  },

  { 
    id: 'gideon', 
    name_ko: '기드온', 
    name_en: 'Gideon', 
    testament: 'old', 
    importance: 6,
    books: ['jdg', 'heb'],
    description_ko: '300명의 용사로 미디안 대군을 물리친 사사. 양털로 하나님의 뜻을 확인함.',
    description_en: 'Judge who defeated the Midianite army with 300 men. Used fleece to confirm God\'s will.',
    verses: [
      { ref: '사사기 7:7', text_ko: '삼백 명의 핥은 자들로 내가 너희를 구원하며', text_en: 'With the three hundred men that lapped I will save you' },
      { ref: '사사기 6:14', text_ko: '가라 이 너의 힘으로 이스라엘을 미디안의 손에서 구원하라', text_en: 'Go in the strength you have and save Israel out of Midian\'s hand' }
    ],
    labels: ['300용사', '양털', '여룹바알', '300 Warriors', 'Fleece', 'Jerubbaal'],
    era: 'judges',
    location: '오브라, 하롯',
    hymns: []
  },

  { 
    id: 'samson', 
    name_ko: '삼손', 
    name_en: 'Samson', 
    testament: 'old', 
    importance: 7,
    books: ['jdg', 'heb'],
    description_ko: '초인적인 힘을 가진 사사. 나실인으로 머리카락에 힘의 비밀이 있었음. 들릴라에게 배신당함.',
    description_en: 'Judge with superhuman strength. Nazirite whose power was in his hair. Betrayed by Delilah.',
    verses: [
      { ref: '사사기 16:17', text_ko: '내가 모태에서부터 하나님의 나실인이 되었나니 내 머리를 밀면 내 힘이 내게서 떠나고', text_en: 'I have been a Nazirite dedicated to God from my mother\'s womb. If my head were shaved, my strength would leave me' },
      { ref: '히브리서 11:32', text_ko: '또 기드온, 바락, 삼손, 입다, 다윗과 사무엘과 선지자들에 대하여', text_en: 'Gideon, Barak, Samson, Jephthah, David, Samuel and the prophets' }
    ],
    labels: ['나실인', '힘', '들릴라', 'Nazirite', 'Strength', 'Delilah'],
    era: 'judges',
    location: '단 지파',
    hymns: [288]
  },

  { 
    id: 'delilah', 
    name_ko: '들릴라', 
    name_en: 'Delilah', 
    testament: 'old', 
    importance: 4,
    books: ['jdg'],
    description_ko: '삼손이 사랑한 여인. 블레셋에게 매수되어 삼손의 힘의 비밀을 알아냄.',
    description_en: 'Woman loved by Samson. Bribed by Philistines to discover the secret of his strength.',
    verses: [
      { ref: '사사기 16:15', text_ko: '네가 나를 사랑한다 하면서 어찌 내게 진심을 기울이지 않느냐', text_en: 'How can you say you love me, when you won\'t confide in me?' }
    ],
    labels: ['배신', '유혹', 'Betrayal', 'Temptation'],
    era: 'judges',
    location: '소렉 골짜기',
    hymns: []
  },

  { 
    id: 'ruth', 
    name_ko: '룻', 
    name_en: 'Ruth', 
    testament: 'old', 
    importance: 6,
    books: ['rut', 'mat'],
    description_ko: '모압 여인으로 시어머니 나오미를 따라 이스라엘로 옴. 보아스와 결혼하여 다윗의 증조할머니가 됨.',
    description_en: 'Moabite woman who followed her mother-in-law Naomi. Married Boaz, became great-grandmother of David.',
    verses: [
      { ref: '룻기 1:16', text_ko: '어머니의 백성이 나의 백성이 되고 어머니의 하나님이 나의 하나님이 되시리니', text_en: 'Your people will be my people and your God my God' },
      { ref: '룻기 2:12', text_ko: '여호와께서 네 행위에 보답하시기를 바라며', text_en: 'May the LORD repay you for what you have done' }
    ],
    labels: ['충성', '외국인', '다윗의 조상', 'Loyalty', 'Foreigner', "David's Ancestor"],
    era: 'judges',
    location: '모압, 베들레헴',
    hymns: [405]
  },

  { 
    id: 'naomi', 
    name_ko: '나오미', 
    name_en: 'Naomi', 
    testament: 'old', 
    importance: 5,
    books: ['rut'],
    description_ko: '룻의 시어머니. 남편과 두 아들을 잃고 모압에서 베들레헴으로 돌아옴.',
    description_en: 'Ruth\'s mother-in-law. Lost her husband and two sons, returned from Moab to Bethlehem.',
    verses: [
      { ref: '룻기 1:20', text_ko: '나를 나오미라 부르지 말고 마라라 부르라', text_en: 'Don\'t call me Naomi. Call me Mara' }
    ],
    labels: ['시어머니', '쓴맛', 'Mother-in-law', 'Bitter'],
    era: 'judges',
    location: '베들레헴, 모압',
    hymns: []
  },

  { 
    id: 'boaz', 
    name_ko: '보아스', 
    name_en: 'Boaz', 
    testament: 'old', 
    importance: 5,
    books: ['rut', 'mat'],
    description_ko: '베들레헴의 부유한 지주. 룻과 결혼하여 다윗의 증조부가 됨. 기업 무를 자의 역할을 함.',
    description_en: 'Wealthy landowner in Bethlehem. Married Ruth and became great-grandfather of David. Acted as kinsman-redeemer.',
    verses: [
      { ref: '룻기 2:12', text_ko: '이스라엘의 하나님 여호와께서 네 행위에 보답하시기를', text_en: 'May you be richly rewarded by the LORD, the God of Israel' },
      { ref: '룻기 4:13', text_ko: '이에 보아스가 룻을 맞이하여 아내로 삼고', text_en: 'Boaz took Ruth and she became his wife' }
    ],
    labels: ['기업 무를 자', '다윗의 조상', 'Kinsman-Redeemer', "David's Ancestor"],
    era: 'judges',
    location: '베들레헴',
    hymns: []
  },

  // ==================== 왕국 시대 ====================
  { 
    id: 'hannah', 
    name_ko: '한나', 
    name_en: 'Hannah', 
    testament: 'old', 
    importance: 5,
    books: ['1sa'],
    description_ko: '사무엘의 어머니. 불임이었으나 간절한 기도 끝에 사무엘을 얻어 하나님께 바침.',
    description_en: 'Mother of Samuel. Was barren but through fervent prayer received Samuel and dedicated him to God.',
    verses: [
      { ref: '사무엘상 1:27-28', text_ko: '이 아이를 위하여 내가 기도하였더니 여호와께서 내가 구한 것을 허락하셨으므로 나도 그를 여호와께 드리되', text_en: 'I prayed for this child, and the LORD has granted me what I asked of him. So now I give him to the LORD' }
    ],
    labels: ['기도의 여인', '사무엘의 어머니', 'Woman of Prayer', "Samuel's Mother"],
    era: 'united_kingdom',
    location: '라마',
    hymns: []
  },

  { 
    id: 'samuel', 
    name_ko: '사무엘', 
    name_en: 'Samuel', 
    testament: 'old', 
    importance: 7,
    books: ['1sa', '1ch', 'act', 'heb'],
    description_ko: '마지막 사사이자 선지자. 사울과 다윗에게 기름 부음. 어머니 한나의 기도로 태어남.',
    description_en: 'Last judge and prophet. Anointed Saul and David. Born through Hannah\'s prayer.',
    verses: [
      { ref: '사무엘상 3:10', text_ko: '여호와께서 임하여 서서 전과 같이 사무엘아 사무엘아 부르시는지라', text_en: 'The LORD came and stood there, calling as at the other times, "Samuel! Samuel!"' },
      { ref: '사무엘상 7:12', text_ko: '이르되 여호와께서 여기까지 우리를 도우셨다 하고 그 이름을 에벤에셀이라 하니라', text_en: 'He named it Ebenezer, saying, "Thus far the LORD has helped us"' }
    ],
    labels: ['선지자', '사사', '에벤에셀', 'Prophet', 'Judge', 'Ebenezer'],
    era: 'united_kingdom',
    location: '실로, 라마',
    hymns: [460, 461]
  },

  { 
    id: 'saul', 
    name_ko: '사울', 
    name_en: 'Saul', 
    testament: 'old', 
    importance: 6,
    books: ['1sa', '1ch', 'act'],
    description_ko: '이스라엘의 첫 번째 왕. 불순종으로 인해 왕위를 빼앗기고 다윗을 쫓아다님.',
    description_en: 'First king of Israel. Lost his throne due to disobedience and pursued David.',
    verses: [
      { ref: '사무엘상 15:22', text_ko: '순종이 제사보다 낫고 듣는 것이 숫양의 기름보다 나으니', text_en: 'To obey is better than sacrifice' },
      { ref: '사무엘상 10:24', text_ko: '여호와께서 택하신 자를 보라 온 백성 중에 짝할 이가 없도다', text_en: 'Do you see the man the LORD has chosen? There is no one like him among all the people' }
    ],
    labels: ['첫 번째 왕', '불순종', 'First King', 'Disobedience'],
    era: 'united_kingdom',
    location: '기브아',
    hymns: []
  },

  { 
    id: 'jonathan', 
    name_ko: '요나단', 
    name_en: 'Jonathan', 
    testament: 'old', 
    importance: 5,
    books: ['1sa', '2sa'],
    description_ko: '사울 왕의 아들. 다윗과 깊은 우정을 나눔. 아버지의 다윗 살해 계획에서 다윗을 보호함.',
    description_en: 'Son of King Saul. Had deep friendship with David. Protected David from his father.',
    verses: [
      { ref: '사무엘상 18:1', text_ko: '요나단의 마음이 다윗의 마음과 연합되어 요나단이 그를 자기 생명 같이 사랑하니라', text_en: 'Jonathan became one in spirit with David, and he loved him as himself' },
      { ref: '사무엘상 20:17', text_ko: '요나단이 자기의 생명처럼 다윗을 사랑하므로', text_en: 'Jonathan had David reaffirm his oath out of love for him' }
    ],
    labels: ['다윗의 친구', '충성', "David's Friend", 'Loyalty'],
    era: 'united_kingdom',
    location: '기브아',
    hymns: []
  },

  { 
    id: 'david', 
    name_ko: '다윗', 
    name_en: 'David', 
    testament: 'old', 
    importance: 9,
    books: ['1sa', '2sa', '1ki', '1ch', '2ch', 'psa', 'mat', 'luk', 'act', 'rom', 'heb', 'rev'],
    description_ko: '목동에서 이스라엘 왕이 된 하나님의 마음에 합한 자. 골리앗을 물리침. 시편의 많은 부분을 저술.',
    description_en: 'Shepherd who became king, a man after God\'s own heart. Defeated Goliath. Wrote many Psalms.',
    verses: [
      { ref: '사무엘상 13:14', text_ko: '여호와께서 그의 마음에 맞는 사람을 구하여', text_en: 'The LORD has sought out a man after his own heart' },
      { ref: '시편 23:1', text_ko: '여호와는 나의 목자시니 내게 부족함이 없으리로다', text_en: 'The LORD is my shepherd, I lack nothing' },
      { ref: '사도행전 13:22', text_ko: '내가 이새의 아들 다윗을 만나니 내 마음에 맞는 사람이라', text_en: 'I have found David son of Jesse, a man after my own heart' }
    ],
    labels: ['목자', '왕', '시편 저자', '골리앗', 'Shepherd', 'King', 'Psalmist', 'Goliath'],
    era: 'united_kingdom',
    location: '베들레헴, 예루살렘',
    hymns: [79, 83, 288]
  },

  { 
    id: 'goliath', 
    name_ko: '골리앗', 
    name_en: 'Goliath', 
    testament: 'old', 
    importance: 5,
    books: ['1sa'],
    description_ko: '블레셋의 거인 전사. 40일간 이스라엘을 조롱했으나 소년 다윗에게 돌팔매에 맞아 쓰러짐.',
    description_en: 'Philistine giant warrior. Mocked Israel for 40 days but was felled by young David\'s sling.',
    verses: [
      { ref: '사무엘상 17:4', text_ko: '블레셋 사람들의 진영에서 싸움을 돋우는 자가 나왔는데 그 이름은 골리앗이요 그의 키는 여섯 규빗 한 뼘이며', text_en: 'A champion named Goliath, who was from Gath, came out. He was over nine feet tall' }
    ],
    labels: ['거인', '블레셋', 'Giant', 'Philistine'],
    era: 'united_kingdom',
    location: '엘라 골짜기',
    hymns: []
  },

  { 
    id: 'bathsheba', 
    name_ko: '밧세바', 
    name_en: 'Bathsheba', 
    testament: 'old', 
    importance: 5,
    books: ['2sa', '1ki', 'mat'],
    description_ko: '다윗과 간음한 후 그의 아내가 됨. 솔로몬의 어머니.',
    description_en: 'Committed adultery with David, later became his wife. Mother of Solomon.',
    verses: [
      { ref: '사무엘하 11:3', text_ko: '그 여인은 엘리암의 딸이요 헷 사람 우리아의 아내 밧세바라', text_en: 'She is Bathsheba, the daughter of Eliam and the wife of Uriah the Hittite' },
      { ref: '열왕기상 1:31', text_ko: '밧세바가 얼굴을 땅에 대고 왕에게 절하며', text_en: 'Bathsheba bowed down, prostrating herself before the king' }
    ],
    labels: ['솔로몬의 어머니', "Solomon's Mother"],
    era: 'united_kingdom',
    location: '예루살렘',
    hymns: []
  },

  { 
    id: 'solomon', 
    name_ko: '솔로몬', 
    name_en: 'Solomon', 
    testament: 'old', 
    importance: 8,
    books: ['2sa', '1ki', '2ch', 'pro', 'ecc', 'sng', 'mat'],
    description_ko: '다윗의 아들, 지혜의 왕. 예루살렘 성전을 건축. 잠언, 전도서, 아가서를 저술.',
    description_en: 'Son of David, wise king. Built the Jerusalem Temple. Wrote Proverbs, Ecclesiastes, Song of Songs.',
    verses: [
      { ref: '열왕기상 4:29', text_ko: '하나님이 솔로몬에게 지혜와 총명을 심히 많이 주시니', text_en: 'God gave Solomon wisdom and very great insight' },
      { ref: '잠언 1:7', text_ko: '여호와를 경외하는 것이 지식의 근본이거늘', text_en: 'The fear of the LORD is the beginning of knowledge' },
      { ref: '열왕기상 8:27', text_ko: '하늘과 하늘들의 하늘이라도 주를 용납하지 못하겠거든', text_en: 'The heavens, even the highest heaven, cannot contain you' }
    ],
    labels: ['지혜', '성전 건축', '잠언', 'Wisdom', 'Temple Builder', 'Proverbs'],
    era: 'united_kingdom',
    location: '예루살렘',
    hymns: []
  },

  // ==================== 선지자들 ====================
  { 
    id: 'elijah', 
    name_ko: '엘리야', 
    name_en: 'Elijah', 
    testament: 'old', 
    importance: 8,
    books: ['1ki', '2ki', 'mal', 'mat', 'mrk', 'luk', 'rom', 'jas'],
    description_ko: '불의 선지자. 갈멜산에서 바알 선지자 450명과 대결하여 승리. 불 수레를 타고 승천.',
    description_en: 'Prophet of fire. Defeated 450 prophets of Baal on Mount Carmel. Taken to heaven in a chariot of fire.',
    verses: [
      { ref: '열왕기상 18:21', text_ko: '너희가 어느 때까지 두 사이에서 머뭇거리려느냐', text_en: 'How long will you waver between two opinions?' },
      { ref: '열왕기하 2:11', text_ko: '불 수레와 불 말들이 두 사람을 갈라놓고 엘리야가 회오리 바람으로 하늘로 올라가더라', text_en: 'A chariot of fire and horses of fire separated them, and Elijah went up to heaven in a whirlwind' },
      { ref: '야고보서 5:17', text_ko: '엘리야는 우리와 성정이 같은 사람이로되', text_en: 'Elijah was a human being, even as we are' }
    ],
    labels: ['불의 선지자', '갈멜산', '승천', 'Prophet of Fire', 'Carmel', 'Ascension'],
    era: 'divided_kingdom',
    location: '이스라엘, 갈멜산',
    hymns: [440, 538]
  },

  { 
    id: 'elisha', 
    name_ko: '엘리사', 
    name_en: 'Elisha', 
    testament: 'old', 
    importance: 6,
    books: ['1ki', '2ki', 'luk'],
    description_ko: '엘리야의 제자이자 후계자. 두 배의 영감을 받음. 많은 기적을 행함.',
    description_en: 'Disciple and successor of Elijah. Received double portion of his spirit. Performed many miracles.',
    verses: [
      { ref: '열왕기하 2:9', text_ko: '당신의 영감이 갑절이나 내게 있게 하소서', text_en: 'Let me inherit a double portion of your spirit' },
      { ref: '열왕기하 4:44', text_ko: '그가 그들 앞에 놓았더니 그들이 먹고 여호와의 말씀과 같이 남았더라', text_en: 'He set it before them, they ate and had some left over, according to the word of the LORD' }
    ],
    labels: ['엘리야의 제자', '기적', '갑절의 영', "Elijah's Disciple", 'Miracles', 'Double Portion'],
    era: 'divided_kingdom',
    location: '이스라엘',
    hymns: []
  },

  { 
    id: 'isaiah', 
    name_ko: '이사야', 
    name_en: 'Isaiah', 
    testament: 'old', 
    importance: 7,
    books: ['2ki', '2ch', 'isa', 'mat', 'mrk', 'luk', 'jhn', 'act', 'rom'],
    description_ko: '대선지자. 메시아의 고난과 영광을 예언. 이사야서 저술.',
    description_en: 'Major prophet. Prophesied the suffering and glory of the Messiah. Wrote the book of Isaiah.',
    verses: [
      { ref: '이사야 53:5', text_ko: '그가 찔림은 우리의 허물 때문이요 그가 상함은 우리의 죄악 때문이라', text_en: 'He was pierced for our transgressions, he was crushed for our iniquities' },
      { ref: '이사야 9:6', text_ko: '이는 한 아기가 우리에게 났고 한 아들을 우리에게 주신 바 되었는데', text_en: 'For to us a child is born, to us a son is given' },
      { ref: '이사야 40:31', text_ko: '오직 여호와를 앙망하는 자는 새 힘을 얻으리니', text_en: 'Those who hope in the LORD will renew their strength' }
    ],
    labels: ['대선지자', '메시아 예언', 'Major Prophet', 'Messianic Prophecy'],
    era: 'divided_kingdom',
    location: '예루살렘',
    hymns: []
  },

  { 
    id: 'jeremiah', 
    name_ko: '예레미야', 
    name_en: 'Jeremiah', 
    testament: 'old', 
    importance: 7,
    books: ['2ch', 'jer', 'lam', 'mat', 'heb'],
    description_ko: '눈물의 선지자. 유다의 멸망을 경고. 새 언약을 예언. 예레미야서와 애가를 저술.',
    description_en: 'Weeping prophet. Warned of Judah\'s destruction. Prophesied the new covenant.',
    verses: [
      { ref: '예레미야 31:31', text_ko: '보라 날이 이르리니 내가 이스라엘 집과 유다 집에 새 언약을 맺으리라', text_en: 'The days are coming when I will make a new covenant with the house of Israel' },
      { ref: '예레미야 29:11', text_ko: '나는 너희를 향한 나의 생각을 아노라 재앙이 아니라 평안이요', text_en: 'For I know the plans I have for you, plans to prosper you and not to harm you' }
    ],
    labels: ['눈물의 선지자', '새 언약', 'Weeping Prophet', 'New Covenant'],
    era: 'divided_kingdom',
    location: '예루살렘',
    hymns: []
  },

  { 
    id: 'ezekiel', 
    name_ko: '에스겔', 
    name_en: 'Ezekiel', 
    testament: 'old', 
    importance: 6,
    books: ['ezk'],
    description_ko: '바벨론 포로기의 선지자. 환상을 통해 하나님의 심판과 회복을 전함. 마른 뼈 환상.',
    description_en: 'Prophet during Babylonian exile. Conveyed God\'s judgment and restoration through visions.',
    verses: [
      { ref: '에스겔 37:3-4', text_ko: '이 뼈들이 능히 살겠느냐 내가 대답하되 주 여호와여 주께서 아시나이다', text_en: 'Can these bones live? I said, "Sovereign LORD, you alone know"' },
      { ref: '에스겔 36:26', text_ko: '또 새 영을 너희 속에 두고 새 마음을 너희에게 주되 너희 육신에서 굳은 마음을 제거하고 부드러운 마음을 줄 것이며', text_en: 'I will give you a new heart and put a new spirit in you' }
    ],
    labels: ['환상', '마른 뼈', '새 마음', 'Visions', 'Dry Bones', 'New Heart'],
    era: 'exile',
    location: '바벨론',
    hymns: []
  },

  { 
    id: 'daniel', 
    name_ko: '다니엘', 
    name_en: 'Daniel', 
    testament: 'old', 
    importance: 7,
    books: ['dan', 'mat', 'heb'],
    description_ko: '바벨론 궁정에서 활동한 선지자. 꿈을 해석하고 사자 굴에서 구원받음.',
    description_en: 'Prophet in Babylonian court. Interpreted dreams and was saved from the lions\' den.',
    verses: [
      { ref: '다니엘 6:22', text_ko: '나의 하나님이 천사를 보내어 사자들의 입을 봉하셨으므로', text_en: 'My God sent his angel, and he shut the mouths of the lions' },
      { ref: '다니엘 3:17-18', text_ko: '만일 그렇게 하실지라도 왕이여 우리가 왕의 신들을 섬기지도 아니하고', text_en: 'But even if he does not, we want you to know, Your Majesty, that we will not serve your gods' }
    ],
    labels: ['꿈 해석', '사자 굴', '충성', 'Dream Interpreter', "Lions' Den", 'Faithful'],
    era: 'exile',
    location: '바벨론',
    hymns: [295, 354]
  },

  { 
    id: 'jonah', 
    name_ko: '요나', 
    name_en: 'Jonah', 
    testament: 'old', 
    importance: 6,
    books: ['2ki', 'jon', 'mat', 'luk'],
    description_ko: '니느웨로 보내진 선지자. 하나님을 피해 도망치다 큰 물고기에게 삼켜짐.',
    description_en: 'Prophet sent to Nineveh. Fled from God and was swallowed by a great fish.',
    verses: [
      { ref: '요나 2:1', text_ko: '요나가 물고기 배 속에서 그의 하나님 여호와께 기도하여', text_en: 'From inside the fish Jonah prayed to the LORD his God' },
      { ref: '요나 4:2', text_ko: '주께서는 은혜로우시며 자비로우시며 노하기를 더디하시며 인애가 크사 뜻을 돌이켜 재앙을 내리지 아니하시는 하나님이신 줄을', text_en: 'You are a gracious and compassionate God, slow to anger and abounding in love' }
    ],
    labels: ['큰 물고기', '니느웨', '불순종', 'Great Fish', 'Nineveh', 'Disobedience'],
    era: 'divided_kingdom',
    location: '니느웨',
    hymns: [496]
  },

  { 
    id: 'job', 
    name_ko: '욥', 
    name_en: 'Job', 
    testament: 'old', 
    importance: 6,
    books: ['job', 'ezk', 'jas'],
    description_ko: '의로운 부자. 모든 것을 잃고 고난을 겪었으나 끝까지 믿음을 지킴. 고난의 의미를 탐구.',
    description_en: 'Righteous wealthy man. Lost everything but maintained faith. Explored the meaning of suffering.',
    verses: [
      { ref: '욥기 1:21', text_ko: '주신 이도 여호와시요 거두신 이도 여호와시오니 여호와의 이름이 찬송을 받으실지니이다', text_en: 'The LORD gave and the LORD has taken away; may the name of the LORD be praised' },
      { ref: '욥기 13:15', text_ko: '그가 나를 죽이시리니 내가 희망이 없노라 그러나 그의 앞에서 내 행위를 변백하리라', text_en: 'Though he slay me, yet will I hope in him' },
      { ref: '욥기 42:5', text_ko: '내가 주께 대하여 귀로 듣기만 하였사오나 이제는 눈으로 주를 뵈옵나이다', text_en: 'My ears had heard of you but now my eyes have seen you' }
    ],
    labels: ['고난', '인내', '의인', 'Suffering', 'Patience', 'Righteous'],
    era: 'patriarchs',
    location: '우스 땅',
    hymns: []
  },

  { 
    id: 'esther', 
    name_ko: '에스더', 
    name_en: 'Esther', 
    testament: 'old', 
    importance: 6,
    books: ['est'],
    description_ko: '페르시아 왕비가 된 유대인 여성. 민족을 멸망에서 구함. 부림절의 기원.',
    description_en: 'Jewish woman who became Persian queen. Saved her people from destruction. Origin of Purim.',
    verses: [
      { ref: '에스더 4:14', text_ko: '네가 이 때에 잠잠하면 유대인은 다른 데로 말미암아 놓임과 구원을 얻으려니와 너와 네 아버지 집은 멸망하리라 네가 왕후의 자리를 얻은 것이 이 때를 위함이 아닌지 누가 알겠느냐', text_en: 'Who knows but that you have come to your royal position for such a time as this?' },
      { ref: '에스더 4:16', text_ko: '죽으면 죽으리이다', text_en: 'If I perish, I perish' }
    ],
    labels: ['왕비', '부림절', '구원', 'Queen', 'Purim', 'Salvation'],
    era: 'exile',
    location: '수산 궁전',
    hymns: []
  },

  { 
    id: 'nehemiah', 
    name_ko: '느헤미야', 
    name_en: 'Nehemiah', 
    testament: 'old', 
    importance: 5,
    books: ['neh'],
    description_ko: '페르시아 왕의 술관원. 예루살렘 성벽을 52일 만에 재건.',
    description_en: 'Cupbearer to the Persian king. Rebuilt Jerusalem\'s walls in 52 days.',
    verses: [
      { ref: '느헤미야 6:15-16', text_ko: '성벽 공사가 오십이 일 만에 끝나니 엘룰월 이십오일이라', text_en: 'The wall was completed in fifty-two days' },
      { ref: '느헤미야 4:6', text_ko: '백성이 마음 들여 일하였으므로', text_en: 'The people worked with all their heart' }
    ],
    labels: ['성벽 재건', '지도자', '기도', 'Wall Builder', 'Leader', 'Prayer'],
    era: 'return',
    location: '예루살렘',
    hymns: []
  }
];

export default charactersExtended;
