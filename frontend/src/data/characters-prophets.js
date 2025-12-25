// 선지자들과 포로기/귀환기 인물들
export const prophetCharacters = [
  // === 대선지자들 ===
  {
    id: 'isaiah',
    name_ko: '이사야',
    name_en: 'Isaiah',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 9,
    description_ko: '유다의 대선지자. 메시아 예언으로 유명. 아모스와 웃시야 시대에 활동.',
    description_en: 'Major prophet of Judah. Famous for Messianic prophecies.',
    labels: ['대선지자', '메시아 예언'],
    books: ['isaiah', 'matthew', 'john'],
    verses: [
      { ref: '이사야 53:5', text_ko: '그가 찔림은 우리의 허물 때문이요 그가 상함은 우리의 죄악 때문이라', text_en: 'He was pierced for our transgressions, crushed for our iniquities.' },
      { ref: '이사야 7:14', text_ko: '보라 처녀가 잉태하여 아들을 낳을 것이요 그의 이름을 임마누엘이라 하리라', text_en: 'The virgin will conceive and give birth to a son, and will call him Immanuel.' }
    ]
  },
  {
    id: 'jeremiah',
    name_ko: '예레미야',
    name_en: 'Jeremiah',
    testament: 'old',
    era: 'exile',
    importance: 9,
    description_ko: '눈물의 선지자. 예루살렘 멸망을 경고하고 목격함. 새 언약을 예언.',
    description_en: 'Weeping prophet. Warned of and witnessed Jerusalem\'s fall. Prophesied new covenant.',
    labels: ['대선지자', '새 언약'],
    books: ['jeremiah', 'lamentations'],
    verses: [
      { ref: '예레미야 31:31', text_ko: '보라 날이 이르리니 내가 이스라엘 집과 유다 집에 새 언약을 맺으리라', text_en: 'The days are coming when I will make a new covenant with Israel and Judah.' }
    ]
  },
  {
    id: 'ezekiel',
    name_ko: '에스겔',
    name_en: 'Ezekiel',
    testament: 'old',
    era: 'exile',
    importance: 8,
    description_ko: '바벨론 포로 중의 제사장 선지자. 환상과 상징적 행동으로 예언함.',
    description_en: 'Priest-prophet among Babylonian exiles. Prophesied through visions and symbolic acts.',
    labels: ['대선지자', '제사장', '환상'],
    books: ['ezekiel'],
    verses: [
      { ref: '에스겔 37:4-5', text_ko: '마른 뼈들아 여호와의 말씀을 들을지어다... 내가 생기를 너희에게 들어가게 하리니 너희가 살아나리라', text_en: 'Dry bones, hear the word of the LORD! I will make breath enter you, and you will come to life.' }
    ]
  },
  {
    id: 'daniel',
    name_ko: '다니엘',
    name_en: 'Daniel',
    testament: 'old',
    era: 'exile',
    importance: 9,
    description_ko: '바벨론과 페르시아에서 활동한 선지자. 꿈 해석과 종말론 예언으로 유명.',
    description_en: 'Prophet in Babylon and Persia. Famous for dream interpretation and apocalyptic prophecy.',
    labels: ['대선지자', '지혜', '종말론'],
    books: ['daniel', 'matthew'],
    verses: [
      { ref: '다니엘 2:44', text_ko: '이 열왕의 때에 하늘의 하나님이 한 나라를 세우시리니 이것은 영원히 망하지 아니할 것이요', text_en: 'The God of heaven will set up a kingdom that will never be destroyed.' }
    ]
  },
  // === 소선지자들 ===
  {
    id: 'hosea',
    name_ko: '호세아',
    name_en: 'Hosea',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 7,
    description_ko: '불신실한 아내 고멜과의 결혼으로 이스라엘의 배신을 상징함.',
    description_en: 'Marriage to unfaithful Gomer symbolized Israel\'s unfaithfulness.',
    labels: ['소선지자'],
    books: ['hosea']
  },
  {
    id: 'joel',
    name_ko: '요엘',
    name_en: 'Joel',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 6,
    description_ko: '여호와의 날과 성령 강림을 예언한 선지자.',
    description_en: 'Prophet of the Day of the LORD and outpouring of the Spirit.',
    labels: ['소선지자', '성령 예언'],
    books: ['joel', 'acts'],
    verses: [
      { ref: '요엘 2:28', text_ko: '그 후에 내가 내 영을 만민에게 부어 주리니', text_en: 'I will pour out my Spirit on all people.' }
    ]
  },
  {
    id: 'amos',
    name_ko: '아모스',
    name_en: 'Amos',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 6,
    description_ko: '목자였다가 북이스라엘에 파송된 선지자. 사회 정의를 외침.',
    description_en: 'Shepherd called to prophesy to Northern Israel. Proclaimed social justice.',
    labels: ['소선지자', '정의'],
    books: ['amos']
  },
  {
    id: 'obadiah',
    name_ko: '오바댜',
    name_en: 'Obadiah',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 4,
    description_ko: '에돔에 대한 심판을 예언한 선지자. 가장 짧은 구약 책.',
    description_en: 'Prophet of judgment against Edom. Shortest Old Testament book.',
    labels: ['소선지자'],
    books: ['obadiah']
  },
  {
    id: 'jonah',
    name_ko: '요나',
    name_en: 'Jonah',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 7,
    description_ko: '니느웨로 가라는 명령을 피하다 큰 물고기에게 삼켜진 선지자.',
    description_en: 'Prophet who fled to Tarshish, swallowed by great fish.',
    labels: ['소선지자'],
    books: ['jonah', 'matthew'],
    verses: [
      { ref: '요나 2:9', text_ko: '구원은 여호와께 속하였나이다', text_en: 'Salvation comes from the LORD.' }
    ]
  },
  {
    id: 'micah',
    name_ko: '미가',
    name_en: 'Micah',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 6,
    description_ko: '메시아의 베들레헴 탄생을 예언한 선지자.',
    description_en: 'Prophet who foretold Messiah\'s birth in Bethlehem.',
    labels: ['소선지자', '메시아 예언'],
    books: ['micah', 'matthew'],
    verses: [
      { ref: '미가 5:2', text_ko: '베들레헴 에브라다야... 이스라엘을 다스릴 자가 네게서 내게로 나올 것이라', text_en: 'But you, Bethlehem... out of you will come for me one who will be ruler over Israel.' }
    ]
  },
  {
    id: 'nahum',
    name_ko: '나훔',
    name_en: 'Nahum',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 4,
    description_ko: '니느웨의 멸망을 예언한 선지자.',
    description_en: 'Prophet of Nineveh\'s destruction.',
    labels: ['소선지자'],
    books: ['nahum']
  },
  {
    id: 'habakkuk',
    name_ko: '하박국',
    name_en: 'Habakkuk',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 5,
    description_ko: '하나님께 의문을 제기하고 믿음으로 살 것을 배운 선지자.',
    description_en: 'Prophet who questioned God and learned to live by faith.',
    labels: ['소선지자', '믿음'],
    books: ['habakkuk', 'romans'],
    verses: [
      { ref: '하박국 2:4', text_ko: '의인은 그의 믿음으로 말미암아 살리라', text_en: 'The righteous will live by their faith.' }
    ]
  },
  {
    id: 'zephaniah',
    name_ko: '스바냐',
    name_en: 'Zephaniah',
    testament: 'old',
    era: 'divided_kingdom',
    importance: 4,
    description_ko: '여호와의 날을 경고하고 겸손한 남은 자를 예언한 선지자.',
    description_en: 'Prophet warning of Day of LORD, foretold humble remnant.',
    labels: ['소선지자'],
    books: ['zephaniah']
  },
  {
    id: 'haggai',
    name_ko: '학개',
    name_en: 'Haggai',
    testament: 'old',
    era: 'return',
    importance: 5,
    description_ko: '포로 귀환 후 성전 재건을 독려한 선지자.',
    description_en: 'Prophet who encouraged temple rebuilding after exile.',
    labels: ['소선지자', '성전 재건'],
    books: ['haggai']
  },
  {
    id: 'zechariah',
    name_ko: '스가랴',
    name_en: 'Zechariah',
    testament: 'old',
    era: 'return',
    importance: 7,
    description_ko: '메시아 예언이 풍부한 귀환기 선지자.',
    description_en: 'Post-exilic prophet rich in Messianic prophecy.',
    labels: ['소선지자', '메시아 예언'],
    books: ['zechariah', 'matthew'],
    verses: [
      { ref: '스가랴 9:9', text_ko: '보라 네 왕이 네게 임하시나니... 나귀를 타시나니 나귀의 작은 것 곧 나귀 새끼니라', text_en: 'See, your king comes to you... gentle and riding on a donkey.' }
    ]
  },
  {
    id: 'malachi',
    name_ko: '말라기',
    name_en: 'Malachi',
    testament: 'old',
    era: 'return',
    importance: 6,
    description_ko: '구약의 마지막 선지자. 메시아의 선구자를 예언함.',
    description_en: 'Last Old Testament prophet. Foretold Messiah\'s forerunner.',
    labels: ['소선지자'],
    books: ['malachi', 'matthew'],
    verses: [
      { ref: '말라기 4:5', text_ko: '보라 여호와의 크고 두려운 날이 이르기 전에 내가 선지자 엘리야를 너희에게 보내리니', text_en: 'I will send the prophet Elijah before that great and dreadful day of the LORD.' }
    ]
  },
  // === 포로기/귀환기 인물들 ===
  {
    id: 'shadrach',
    name_ko: '사드락',
    name_en: 'Shadrach',
    testament: 'old',
    era: 'exile',
    importance: 6,
    description_ko: '다니엘의 세 친구 중 한 명. 풀무불에서 살아남음.',
    description_en: 'One of Daniel\'s three friends. Survived fiery furnace.',
    labels: ['신실한 자', '순교 거부'],
    books: ['daniel']
  },
  {
    id: 'meshach',
    name_ko: '메삭',
    name_en: 'Meshach',
    testament: 'old',
    era: 'exile',
    importance: 6,
    description_ko: '다니엘의 세 친구 중 한 명. 우상 숭배를 거부하고 풀무불에서 살아남음.',
    description_en: 'One of Daniel\'s three friends. Refused idolatry, survived furnace.',
    labels: ['신실한 자', '순교 거부'],
    books: ['daniel']
  },
  {
    id: 'abednego',
    name_ko: '아벳느고',
    name_en: 'Abednego',
    testament: 'old',
    era: 'exile',
    importance: 6,
    description_ko: '다니엘의 세 친구 중 한 명. 풀무불에서 하나님의 보호를 받음.',
    description_en: 'One of Daniel\'s three friends. Protected by God in furnace.',
    labels: ['신실한 자', '순교 거부'],
    books: ['daniel'],
    verses: [
      { ref: '다니엘 3:17-18', text_ko: '우리가 섬기는 하나님이 우리를 건져내실 것이요... 그렇게 하지 아니하실지라도 왕에게 고하노니', text_en: 'The God we serve is able to deliver us... But even if he does not...' }
    ]
  },
  {
    id: 'belshazzar',
    name_ko: '벨사살',
    name_en: 'Belshazzar',
    testament: 'old',
    era: 'exile',
    importance: 5,
    description_ko: '바벨론의 마지막 왕. 벽에 글씨가 나타난 날 밤에 죽임을 당함.',
    description_en: 'Last king of Babylon. Killed the night writing appeared on wall.',
    labels: ['왕', '바벨론'],
    books: ['daniel']
  },
  {
    id: 'darius_mede',
    name_ko: '다리오 (메대)',
    name_en: 'Darius the Mede',
    testament: 'old',
    era: 'exile',
    importance: 5,
    description_ko: '바벨론을 정복한 메대 왕. 다니엘을 사자굴에서 구함.',
    description_en: 'Median king who conquered Babylon. Saved Daniel from lions\' den.',
    labels: ['왕', '메대'],
    books: ['daniel']
  },
  {
    id: 'cyrus',
    name_ko: '고레스',
    name_en: 'Cyrus',
    testament: 'old',
    era: 'return',
    importance: 7,
    description_ko: '페르시아 대왕. 유대인 귀환을 명령함. 이사야에 의해 예언됨.',
    description_en: 'Great king of Persia. Decreed Jews\' return. Prophesied by Isaiah.',
    labels: ['왕', '페르시아', '해방자'],
    books: ['ezra', 'isaiah', 'daniel'],
    verses: [
      { ref: '이사야 44:28', text_ko: '고레스에게 이르기를 그는 나의 목자라 나의 모든 뜻을 성취하리라', text_en: 'He is my shepherd and will accomplish all that I please.' }
    ]
  },
  {
    id: 'zerubbabel',
    name_ko: '스룹바벨',
    name_en: 'Zerubbabel',
    testament: 'old',
    era: 'return',
    importance: 6,
    description_ko: '귀환 유대인들의 지도자. 성전 재건을 주도함.',
    description_en: 'Leader of returning exiles. Led temple rebuilding.',
    labels: ['지도자', '다윗의 후손'],
    books: ['ezra', 'haggai', 'zechariah', 'matthew']
  },
  {
    id: 'jeshua_priest',
    name_ko: '예수아 (대제사장)',
    name_en: 'Jeshua (High Priest)',
    testament: 'old',
    era: 'return',
    importance: 5,
    description_ko: '귀환 후 첫 대제사장. 스룹바벨과 함께 성전을 재건함.',
    description_en: 'First high priest after return. Rebuilt temple with Zerubbabel.',
    labels: ['대제사장'],
    books: ['ezra', 'zechariah']
  },
  {
    id: 'ezra',
    name_ko: '에스라',
    name_en: 'Ezra',
    testament: 'old',
    era: 'return',
    importance: 8,
    description_ko: '제사장이자 율법학자. 두 번째 귀환을 이끌고 율법을 가르침.',
    description_en: 'Priest and scribe. Led second return, taught the Law.',
    labels: ['제사장', '율법학자'],
    books: ['ezra', 'nehemiah'],
    verses: [
      { ref: '에스라 7:10', text_ko: '에스라가 여호와의 율법을 연구하여 준행하며 이스라엘 중에서 율례와 규례를 가르치기로 결심하였었더라', text_en: 'Ezra had devoted himself to the study and observance of the Law of the LORD.' }
    ]
  },
  {
    id: 'nehemiah',
    name_ko: '느헤미야',
    name_en: 'Nehemiah',
    testament: 'old',
    era: 'return',
    importance: 8,
    description_ko: '페르시아 왕의 술 시관. 예루살렘 성벽을 52일만에 재건함.',
    description_en: 'Cupbearer to Persian king. Rebuilt Jerusalem walls in 52 days.',
    labels: ['총독', '지도자'],
    books: ['nehemiah'],
    verses: [
      { ref: '느헤미야 6:15-16', text_ko: '성이 오십이 일 만에 완성되니... 우리 하나님이 이 일을 이루셨음을 알았느니라', text_en: 'The wall was completed in fifty-two days... our enemies saw that this work had been done with the help of our God.' }
    ]
  },
  {
    id: 'artaxerxes',
    name_ko: '아닥사스다',
    name_en: 'Artaxerxes',
    testament: 'old',
    era: 'return',
    importance: 5,
    description_ko: '페르시아 왕. 느헤미야와 에스라에게 예루살렘 귀환을 허락함.',
    description_en: 'Persian king. Allowed Nehemiah and Ezra to return to Jerusalem.',
    labels: ['왕', '페르시아'],
    books: ['ezra', 'nehemiah']
  },
  {
    id: 'sanballat',
    name_ko: '산발랏',
    name_en: 'Sanballat',
    testament: 'old',
    era: 'return',
    importance: 4,
    description_ko: '호론 사람. 느헤미야의 성벽 재건을 방해함.',
    description_en: 'Horonite. Opposed Nehemiah\'s wall rebuilding.',
    labels: ['대적'],
    books: ['nehemiah']
  },
  {
    id: 'tobiah',
    name_ko: '도비야',
    name_en: 'Tobiah',
    testament: 'old',
    era: 'return',
    importance: 4,
    description_ko: '암몬 사람. 산발랏과 함께 느헤미야를 방해함.',
    description_en: 'Ammonite. Opposed Nehemiah with Sanballat.',
    labels: ['대적'],
    books: ['nehemiah']
  },
  {
    id: 'mordecai',
    name_ko: '모르드개',
    name_en: 'Mordecai',
    testament: 'old',
    era: 'exile',
    importance: 7,
    description_ko: '에스더의 삼촌. 하만의 음모를 발각하고 유대인을 구함.',
    description_en: 'Esther\'s cousin. Exposed Haman\'s plot, saved the Jews.',
    labels: ['영웅', '유대인'],
    books: ['esther']
  },
  {
    id: 'haman',
    name_ko: '하만',
    name_en: 'Haman',
    testament: 'old',
    era: 'exile',
    importance: 6,
    description_ko: '아하수에로 왕의 총리. 유대인 학살을 계획했다가 처형됨.',
    description_en: 'Prime minister under Ahasuerus. Plotted Jewish genocide, executed.',
    labels: ['대적', '악인'],
    books: ['esther']
  },
  {
    id: 'ahasuerus',
    name_ko: '아하수에로',
    name_en: 'Ahasuerus',
    testament: 'old',
    era: 'exile',
    importance: 5,
    description_ko: '페르시아 왕, 에스더의 남편. 크세르크세스 1세로 추정.',
    description_en: 'Persian king, Esther\'s husband. Identified as Xerxes I.',
    labels: ['왕', '페르시아'],
    books: ['esther']
  },
  {
    id: 'vashti',
    name_ko: '와스디',
    name_en: 'Vashti',
    testament: 'old',
    era: 'exile',
    importance: 4,
    description_ko: '아하수에로의 왕비. 왕의 명령을 거부하여 폐위됨.',
    description_en: 'Queen of Ahasuerus. Deposed for refusing king\'s command.',
    labels: ['왕비'],
    books: ['esther']
  },
  // === 욥기 인물들 ===
  {
    id: 'job',
    name_ko: '욥',
    name_en: 'Job',
    testament: 'old',
    era: 'patriarchs',
    importance: 8,
    description_ko: '우스 땅의 경건한 사람. 극심한 고난 속에서도 믿음을 지킴.',
    description_en: 'Righteous man from Uz. Maintained faith through extreme suffering.',
    labels: ['경건한 자', '인내'],
    books: ['job', 'james'],
    verses: [
      { ref: '욥기 1:21', text_ko: '주신 이도 여호와시요 거두신 이도 여호와시오니 여호와의 이름이 찬송을 받으실지니이다', text_en: 'The LORD gave and the LORD has taken away; may the name of the LORD be praised.' }
    ]
  },
  {
    id: 'eliphaz',
    name_ko: '엘리바스',
    name_en: 'Eliphaz',
    testament: 'old',
    era: 'patriarchs',
    importance: 4,
    description_ko: '데만 사람, 욥의 세 친구 중 한 명.',
    description_en: 'Temanite, one of Job\'s three friends.',
    labels: ['욥의 친구'],
    books: ['job']
  },
  {
    id: 'bildad',
    name_ko: '빌닷',
    name_en: 'Bildad',
    testament: 'old',
    era: 'patriarchs',
    importance: 3,
    description_ko: '수아 사람, 욥의 친구.',
    description_en: 'Shuhite, Job\'s friend.',
    labels: ['욥의 친구'],
    books: ['job']
  },
  {
    id: 'zophar',
    name_ko: '소발',
    name_en: 'Zophar',
    testament: 'old',
    era: 'patriarchs',
    importance: 3,
    description_ko: '나아마 사람, 욥의 친구.',
    description_en: 'Naamathite, Job\'s friend.',
    labels: ['욥의 친구'],
    books: ['job']
  },
  {
    id: 'elihu',
    name_ko: '엘리후',
    name_en: 'Elihu',
    testament: 'old',
    era: 'patriarchs',
    importance: 4,
    description_ko: '부스 사람 바라겔의 아들. 욥과 세 친구 모두를 책망함.',
    description_en: 'Son of Barakel the Buzite. Rebuked Job and his three friends.',
    labels: ['욥의 친구'],
    books: ['job']
  }
];
