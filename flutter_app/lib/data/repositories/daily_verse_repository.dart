import '../models/daily_verse.dart';

class DailyVerseRepository {
  // Get verse for today
  DailyVerse getTodayVerse() {
    final now = DateTime.now();
    final dayOfYear = _getDayOfYear(now);
    return _getVerseByDay(dayOfYear);
  }

  // Get verse by specific date
  DailyVerse getVerseByDate(DateTime date) {
    final dayOfYear = _getDayOfYear(date);
    return _getVerseByDay(dayOfYear);
  }

  int _getDayOfYear(DateTime date) {
    final firstDayOfYear = DateTime(date.year, 1, 1);
    return date.difference(firstDayOfYear).inDays + 1;
  }

  DailyVerse _getVerseByDay(int dayOfYear) {
    // Wrap around if day exceeds verses count
    final index = (dayOfYear - 1) % _dailyVerses.length;
    return _dailyVerses[index];
  }

  // 366 daily verses - one for each day of the year
  static final List<DailyVerse> _dailyVerses = [
    // January (1-31)
    const DailyVerse(
      dayOfYear: 1,
      ref: '창세기 1:1',
      textKo: '태초에 하나님이 천지를 창조하시니라',
      textEn: 'In the beginning God created the heavens and the earth.',
      relatedCharacterId: 'god',
    ),
    const DailyVerse(
      dayOfYear: 2,
      ref: '시편 23:1',
      textKo: '여호와는 나의 목자시니 내게 부족함이 없으리로다',
      textEn: 'The LORD is my shepherd, I lack nothing.',
      relatedCharacterId: 'david',
    ),
    const DailyVerse(
      dayOfYear: 3,
      ref: '요한복음 3:16',
      textKo: '하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라',
      textEn: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
      relatedCharacterId: 'jesus',
    ),
    const DailyVerse(
      dayOfYear: 4,
      ref: '빌립보서 4:13',
      textKo: '내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라',
      textEn: 'I can do all this through him who gives me strength.',
      relatedCharacterId: 'paul',
    ),
    const DailyVerse(
      dayOfYear: 5,
      ref: '잠언 3:5-6',
      textKo: '너는 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라 너는 범사에 그를 인정하라 그리하면 네 길을 지도하시리라',
      textEn: 'Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
      relatedCharacterId: 'solomon',
    ),
    const DailyVerse(
      dayOfYear: 6,
      ref: '이사야 40:31',
      textKo: '오직 여호와를 앙망하는 자는 새 힘을 얻으리니 독수리가 날개치며 올라감 같을 것이요 달음박질하여도 곤비하지 아니하겠고 걸어가도 피곤하지 아니하리로다',
      textEn: 'But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
      relatedCharacterId: 'isaiah',
    ),
    const DailyVerse(
      dayOfYear: 7,
      ref: '로마서 8:28',
      textKo: '우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라',
      textEn: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
      relatedCharacterId: 'paul',
    ),
    const DailyVerse(
      dayOfYear: 8,
      ref: '여호수아 1:9',
      textKo: '내가 네게 명령한 것이 아니냐 강하고 담대하라 두려워하지 말며 놀라지 말라 네가 어디로 가든지 네 하나님 여호와가 너와 함께 하느니라',
      textEn: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.',
      relatedCharacterId: 'joshua',
    ),
    const DailyVerse(
      dayOfYear: 9,
      ref: '시편 46:1',
      textKo: '하나님은 우리의 피난처시요 힘이시니 환난 중에 만날 큰 도움이시라',
      textEn: 'God is our refuge and strength, an ever-present help in trouble.',
      relatedCharacterId: 'david',
    ),
    const DailyVerse(
      dayOfYear: 10,
      ref: '마태복음 11:28',
      textKo: '수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라',
      textEn: 'Come to me, all you who are weary and burdened, and I will give you rest.',
      relatedCharacterId: 'jesus',
    ),
    const DailyVerse(
      dayOfYear: 11,
      ref: '시편 119:105',
      textKo: '주의 말씀은 내 발에 등이요 내 길에 빛이니이다',
      textEn: 'Your word is a lamp for my feet, a light on my path.',
      relatedCharacterId: 'david',
    ),
    const DailyVerse(
      dayOfYear: 12,
      ref: '에베소서 2:8-9',
      textKo: '너희는 그 은혜에 의하여 믿음으로 말미암아 구원을 받았으니 이것은 너희에게서 난 것이 아니요 하나님의 선물이라',
      textEn: 'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.',
      relatedCharacterId: 'paul',
    ),
    const DailyVerse(
      dayOfYear: 13,
      ref: '예레미야 29:11',
      textKo: '여호와의 말씀이니라 너희를 향한 나의 생각을 내가 아나니 평안이요 재앙이 아니니라 너희에게 미래와 희망을 주는 것이니라',
      textEn: '"For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."',
      relatedCharacterId: 'jeremiah',
    ),
    const DailyVerse(
      dayOfYear: 14,
      ref: '고린도전서 13:4-5',
      textKo: '사랑은 오래 참고 사랑은 온유하며 시기하지 아니하며 사랑은 자랑하지 아니하며 교만하지 아니하며',
      textEn: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.',
      relatedCharacterId: 'paul',
    ),
    const DailyVerse(
      dayOfYear: 15,
      ref: '시편 91:1-2',
      textKo: '지존자의 은밀한 곳에 거주하는 자는 전능자의 그늘 아래에 살리로다',
      textEn: 'Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.',
      relatedCharacterId: 'moses',
    ),
    const DailyVerse(
      dayOfYear: 16,
      ref: '갈라디아서 5:22-23',
      textKo: '오직 성령의 열매는 사랑과 희락과 화평과 오래 참음과 자비와 양선과 충성과 온유와 절제니 이같은 것을 금지할 법이 없느니라',
      textEn: 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.',
      relatedCharacterId: 'paul',
    ),
    const DailyVerse(
      dayOfYear: 17,
      ref: '히브리서 11:1',
      textKo: '믿음은 바라는 것들의 실상이요 보이지 않는 것들의 증거니',
      textEn: 'Now faith is confidence in what we hope for and assurance about what we do not see.',
      relatedCharacterId: 'abraham',
    ),
    const DailyVerse(
      dayOfYear: 18,
      ref: '시편 27:1',
      textKo: '여호와는 나의 빛이요 나의 구원이시니 내가 누구를 두려워하리요',
      textEn: 'The LORD is my light and my salvation—whom shall I fear?',
      relatedCharacterId: 'david',
    ),
    const DailyVerse(
      dayOfYear: 19,
      ref: '요한일서 4:19',
      textKo: '우리가 사랑함은 그가 먼저 우리를 사랑하셨음이라',
      textEn: 'We love because he first loved us.',
      relatedCharacterId: 'john_apostle',
    ),
    const DailyVerse(
      dayOfYear: 20,
      ref: '마태복음 6:33',
      textKo: '너희는 먼저 그의 나라와 그의 의를 구하라 그리하면 이 모든 것을 너희에게 더하시리라',
      textEn: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.',
      relatedCharacterId: 'jesus',
    ),
    const DailyVerse(
      dayOfYear: 21,
      ref: '시편 139:14',
      textKo: '내가 주께 감사하옴은 나를 지으심이 심히 기묘하심이라 주께서 하시는 일이 기이함을 내 영혼이 잘 아나이다',
      textEn: 'I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.',
      relatedCharacterId: 'david',
    ),
    const DailyVerse(
      dayOfYear: 22,
      ref: '이사야 41:10',
      textKo: '두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라 내가 너를 굳세게 하리라',
      textEn: 'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you.',
      relatedCharacterId: 'isaiah',
    ),
    const DailyVerse(
      dayOfYear: 23,
      ref: '요한복음 14:6',
      textKo: '예수께서 이르시되 내가 곧 길이요 진리요 생명이니 나로 말미암지 않고는 아버지께로 올 자가 없느니라',
      textEn: 'Jesus answered, "I am the way and the truth and the life. No one comes to the Father except through me."',
      relatedCharacterId: 'jesus',
    ),
    const DailyVerse(
      dayOfYear: 24,
      ref: '빌립보서 4:6-7',
      textKo: '아무 것도 염려하지 말고 다만 모든 일에 기도와 간구로, 너희 구할 것을 감사함으로 하나님께 아뢰라',
      textEn: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.',
      relatedCharacterId: 'paul',
    ),
    const DailyVerse(
      dayOfYear: 25,
      ref: '잠언 16:3',
      textKo: '너의 행사를 여호와께 맡기라 그리하면 네가 경영하는 것이 이루어지리라',
      textEn: 'Commit to the LORD whatever you do, and he will establish your plans.',
      relatedCharacterId: 'solomon',
    ),
    const DailyVerse(
      dayOfYear: 26,
      ref: '골로새서 3:23',
      textKo: '무슨 일을 하든지 마음을 다하여 주께 하듯 하고 사람에게 하듯 하지 말라',
      textEn: 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.',
      relatedCharacterId: 'paul',
    ),
    const DailyVerse(
      dayOfYear: 27,
      ref: '시편 37:4',
      textKo: '또 여호와를 기뻐하라 그가 네 마음의 소원을 네게 이루어 주시리로다',
      textEn: 'Take delight in the LORD, and he will give you the desires of your heart.',
      relatedCharacterId: 'david',
    ),
    const DailyVerse(
      dayOfYear: 28,
      ref: '로마서 12:2',
      textKo: '너희는 이 세대를 본받지 말고 오직 마음을 새롭게 함으로 변화를 받아 하나님의 선하시고 기뻐하시고 온전하신 뜻이 무엇인지 분별하도록 하라',
      textEn: 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind.',
      relatedCharacterId: 'paul',
    ),
    const DailyVerse(
      dayOfYear: 29,
      ref: '시편 34:8',
      textKo: '너희는 여호와의 선하심을 맛보아 알지어다 그에게 피하는 자는 복이 있도다',
      textEn: 'Taste and see that the LORD is good; blessed is the one who takes refuge in him.',
      relatedCharacterId: 'david',
    ),
    const DailyVerse(
      dayOfYear: 30,
      ref: '마태복음 28:20',
      textKo: '볼지어다 내가 세상 끝날까지 너희와 항상 함께 있으리라 하시니라',
      textEn: 'And surely I am with you always, to the very end of the age.',
      relatedCharacterId: 'jesus',
    ),
    const DailyVerse(
      dayOfYear: 31,
      ref: '이사야 43:2',
      textKo: '네가 물 가운데로 지날 때에 내가 너와 함께 할 것이라 강을 건널 때에 물이 너를 침몰하지 못할 것이며',
      textEn: 'When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you.',
      relatedCharacterId: 'isaiah',
    ),
    // February (32-60)
    const DailyVerse(
      dayOfYear: 32,
      ref: '창세기 12:2',
      textKo: '내가 너로 큰 민족을 이루고 네게 복을 주어 네 이름을 창대하게 하리니 너는 복이 될지라',
      textEn: 'I will make you into a great nation, and I will bless you; I will make your name great, and you will be a blessing.',
      relatedCharacterId: 'abraham',
    ),
    const DailyVerse(
      dayOfYear: 33,
      ref: '시편 103:1-2',
      textKo: '내 영혼아 여호와를 송축하라 내 속에 있는 것들아 다 그의 거룩한 이름을 송축하라',
      textEn: 'Praise the LORD, my soul; all my inmost being, praise his holy name.',
      relatedCharacterId: 'david',
    ),
    const DailyVerse(
      dayOfYear: 34,
      ref: '요한복음 8:32',
      textKo: '진리를 알지니 진리가 너희를 자유롭게 하리라',
      textEn: 'Then you will know the truth, and the truth will set you free.',
      relatedCharacterId: 'jesus',
    ),
    const DailyVerse(
      dayOfYear: 35,
      ref: '사무엘상 16:7',
      textKo: '여호와께서 사무엘에게 이르시되 그의 용모와 키를 보지 말라 사람은 외모를 보거니와 나 여호와는 중심을 보느니라',
      textEn: 'The LORD does not look at the things people look at. People look at the outward appearance, but the LORD looks at the heart.',
      relatedCharacterId: 'samuel',
    ),
    const DailyVerse(
      dayOfYear: 36,
      ref: '시편 121:1-2',
      textKo: '내가 산을 향하여 눈을 들리라 나의 도움이 어디서 올까 나의 도움은 천지를 지으신 여호와에게서로다',
      textEn: 'I lift up my eyes to the mountains—where does my help come from? My help comes from the LORD, the Maker of heaven and earth.',
      relatedCharacterId: 'david',
    ),
    const DailyVerse(
      dayOfYear: 37,
      ref: '마가복음 11:24',
      textKo: '그러므로 내가 너희에게 말하노니 무엇이든지 기도하고 구하는 것은 받은 줄로 믿으라 그리하면 너희에게 그대로 되리라',
      textEn: 'Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours.',
      relatedCharacterId: 'jesus',
    ),
    const DailyVerse(
      dayOfYear: 38,
      ref: '잠언 4:23',
      textKo: '모든 지킬 만한 것 중에 더욱 네 마음을 지키라 생명의 근원이 이에서 남이니라',
      textEn: 'Above all else, guard your heart, for everything you do flows from it.',
      relatedCharacterId: 'solomon',
    ),
    const DailyVerse(
      dayOfYear: 39,
      ref: '베드로전서 5:7',
      textKo: '너희 염려를 다 주께 맡기라 이는 그가 너희를 돌보심이라',
      textEn: 'Cast all your anxiety on him because he cares for you.',
      relatedCharacterId: 'peter',
    ),
    const DailyVerse(
      dayOfYear: 40,
      ref: '출애굽기 14:14',
      textKo: '여호와께서 너희를 위하여 싸우시리니 너희는 잠잠할지니라',
      textEn: 'The LORD will fight for you; you need only to be still.',
      relatedCharacterId: 'moses',
    ),
    // Continue with more verses...
    const DailyVerse(
      dayOfYear: 41,
      ref: '시편 100:4-5',
      textKo: '감사함으로 그의 문에 들어가며 찬송함으로 그의 궁정에 들어가서 그에게 감사하며 그의 이름을 송축할지어다',
      textEn: 'Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.',
      relatedCharacterId: 'david',
    ),
    const DailyVerse(
      dayOfYear: 42,
      ref: '요한복음 15:5',
      textKo: '나는 포도나무요 너희는 가지라 그가 내 안에, 내가 그 안에 거하면 사람이 열매를 많이 맺나니 나를 떠나서는 너희가 아무 것도 할 수 없음이라',
      textEn: 'I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing.',
      relatedCharacterId: 'jesus',
    ),
    const DailyVerse(
      dayOfYear: 43,
      ref: '디모데후서 1:7',
      textKo: '하나님이 우리에게 주신 것은 두려워하는 마음이 아니요 오직 능력과 사랑과 절제하는 마음이니',
      textEn: 'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.',
      relatedCharacterId: 'timothy',
    ),
    const DailyVerse(
      dayOfYear: 44,
      ref: '시편 46:10',
      textKo: '이르시기를 너희는 가만히 있어 내가 하나님 됨을 알지어다',
      textEn: 'He says, "Be still, and know that I am God."',
      relatedCharacterId: 'david',
    ),
    const DailyVerse(
      dayOfYear: 45,
      ref: '마태복음 5:14-16',
      textKo: '너희는 세상의 빛이라 산 위에 있는 동네가 숨겨지지 못할 것이요',
      textEn: 'You are the light of the world. A town built on a hill cannot be hidden.',
      relatedCharacterId: 'jesus',
    ),
    const DailyVerse(
      dayOfYear: 46,
      ref: '잠언 18:10',
      textKo: '여호와의 이름은 견고한 망대라 의인은 그리로 달려가서 안전함을 얻느니라',
      textEn: 'The name of the LORD is a fortified tower; the righteous run to it and are safe.',
      relatedCharacterId: 'solomon',
    ),
    const DailyVerse(
      dayOfYear: 47,
      ref: '고린도후서 5:17',
      textKo: '그런즉 누구든지 그리스도 안에 있으면 새로운 피조물이라 이전 것은 지나갔으니 보라 새 것이 되었도다',
      textEn: 'Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!',
      relatedCharacterId: 'paul',
    ),
    const DailyVerse(
      dayOfYear: 48,
      ref: '시편 55:22',
      textKo: '네 짐을 여호와께 맡기라 그가 너를 붙드시고 의인의 요동함을 영원히 허락하지 아니하시리로다',
      textEn: 'Cast your cares on the LORD and he will sustain you; he will never let the righteous be shaken.',
      relatedCharacterId: 'david',
    ),
    const DailyVerse(
      dayOfYear: 49,
      ref: '요한복음 10:10',
      textKo: '도둑이 오는 것은 도둑질하고 죽이고 멸망시키려는 것뿐이요 내가 온 것은 양으로 생명을 얻게 하고 더 풍성히 얻게 하려는 것이라',
      textEn: 'The thief comes only to steal and kill and destroy; I have come that they may have life, and have it to the full.',
      relatedCharacterId: 'jesus',
    ),
    const DailyVerse(
      dayOfYear: 50,
      ref: '이사야 26:3',
      textKo: '주께서 심지가 견고한 자를 평강에 평강으로 지키시리니 이는 그가 주를 신뢰함이니이다',
      textEn: 'You will keep in perfect peace those whose minds are steadfast, because they trust in you.',
      relatedCharacterId: 'isaiah',
    ),
    // Add more verses to cover all 366 days...
    // For now, these 50 verses will cycle through the year
  ];
}
