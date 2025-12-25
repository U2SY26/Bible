// ==================== 성경 지리 데이터 ====================
// Bible geographic locations with coordinates and connections

export const locations = [
  // ==================== 주요 도시 ====================
  {
    id: 'jerusalem',
    name_ko: '예루살렘',
    name_en: 'Jerusalem',
    type: 'city',
    region: 'judea',
    coordinates: { lat: 31.7683, lng: 35.2137 },
    description_ko: '이스라엘의 수도, 성전이 있던 거룩한 도시',
    description_en: 'Capital of Israel, holy city where the Temple stood',
    importance: 10,
    testament: 'both',
    characters: ['david', 'solomon', 'jesus', 'peter', 'paul', 'isaiah', 'jeremiah'],
    events: ['temple_dedication', 'crucifixion', 'resurrection', 'pentecost']
  },
  {
    id: 'bethlehem',
    name_ko: '베들레헴',
    name_en: 'Bethlehem',
    type: 'city',
    region: 'judea',
    coordinates: { lat: 31.7054, lng: 35.2024 },
    description_ko: '예수님의 탄생지, 다윗의 고향',
    description_en: 'Birthplace of Jesus, hometown of David',
    importance: 9,
    testament: 'both',
    characters: ['jesus', 'david', 'ruth', 'boaz', 'jesse'],
    events: ['birth_of_jesus']
  },
  {
    id: 'nazareth',
    name_ko: '나사렛',
    name_en: 'Nazareth',
    type: 'city',
    region: 'galilee',
    coordinates: { lat: 32.6996, lng: 35.3035 },
    description_ko: '예수님이 자라신 곳',
    description_en: 'Where Jesus grew up',
    importance: 8,
    testament: 'new',
    characters: ['jesus', 'mary', 'joseph_carpenter'],
    events: ['annunciation']
  },
  {
    id: 'capernaum',
    name_ko: '가버나움',
    name_en: 'Capernaum',
    type: 'city',
    region: 'galilee',
    coordinates: { lat: 32.8803, lng: 35.5754 },
    description_ko: '예수님 사역의 중심지',
    description_en: 'Center of Jesus ministry',
    importance: 8,
    testament: 'new',
    characters: ['jesus', 'peter', 'andrew', 'matthew'],
    events: ['calling_disciples']
  },
  {
    id: 'jericho',
    name_ko: '여리고',
    name_en: 'Jericho',
    type: 'city',
    region: 'judea',
    coordinates: { lat: 31.8567, lng: 35.4500 },
    description_ko: '세계에서 가장 오래된 도시 중 하나',
    description_en: 'One of the oldest cities in the world',
    importance: 7,
    testament: 'both',
    characters: ['joshua', 'rahab', 'zacchaeus'],
    events: ['fall_of_jericho']
  },
  {
    id: 'samaria',
    name_ko: '사마리아',
    name_en: 'Samaria',
    type: 'region',
    region: 'samaria',
    coordinates: { lat: 32.2833, lng: 35.2000 },
    description_ko: '북이스라엘의 수도였던 지역',
    description_en: 'Former capital of Northern Israel',
    importance: 7,
    testament: 'both',
    characters: ['omri', 'ahab', 'elijah', 'elisha'],
    events: []
  },
  {
    id: 'damascus',
    name_ko: '다마스커스',
    name_en: 'Damascus',
    type: 'city',
    region: 'syria',
    coordinates: { lat: 33.5138, lng: 36.2765 },
    description_ko: '바울의 회심 장소',
    description_en: 'Place of Paul conversion',
    importance: 7,
    testament: 'both',
    characters: ['paul', 'ananias_damascus', 'eliezer'],
    events: ['paul_conversion']
  },
  {
    id: 'antioch',
    name_ko: '안디옥',
    name_en: 'Antioch',
    type: 'city',
    region: 'syria',
    coordinates: { lat: 36.2025, lng: 36.1604 },
    description_ko: '초대 교회의 중심지, 처음 그리스도인이라 불린 곳',
    description_en: 'Center of early church, where believers were first called Christians',
    importance: 8,
    testament: 'new',
    characters: ['paul', 'barnabas', 'peter', 'silas'],
    events: []
  },
  {
    id: 'rome',
    name_ko: '로마',
    name_en: 'Rome',
    type: 'city',
    region: 'italy',
    coordinates: { lat: 41.9028, lng: 12.4964 },
    description_ko: '로마 제국의 수도, 바울의 순교지',
    description_en: 'Capital of Roman Empire, place of Paul martyrdom',
    importance: 8,
    testament: 'new',
    characters: ['paul', 'peter', 'caesar_augustus', 'nero'],
    events: []
  },
  {
    id: 'corinth',
    name_ko: '고린도',
    name_en: 'Corinth',
    type: 'city',
    region: 'greece',
    coordinates: { lat: 37.9086, lng: 22.8828 },
    description_ko: '바울이 서신을 보낸 주요 교회',
    description_en: 'Major church to which Paul wrote letters',
    importance: 7,
    testament: 'new',
    characters: ['paul', 'apollos', 'priscilla', 'aquila'],
    events: []
  },
  {
    id: 'ephesus',
    name_ko: '에베소',
    name_en: 'Ephesus',
    type: 'city',
    region: 'asia_minor',
    coordinates: { lat: 37.9394, lng: 27.3417 },
    description_ko: '소아시아 최대의 도시, 초대 교회의 중심',
    description_en: 'Largest city in Asia Minor, center of early church',
    importance: 8,
    testament: 'new',
    characters: ['paul', 'timothy', 'john_apostle', 'priscilla', 'aquila'],
    events: []
  },

  // ==================== 구약 주요 지역 ====================
  {
    id: 'eden',
    name_ko: '에덴동산',
    name_en: 'Garden of Eden',
    type: 'garden',
    region: 'mesopotamia',
    coordinates: { lat: 31.0, lng: 47.0 }, // 추정 위치
    description_ko: '하나님이 창조한 최초의 낙원',
    description_en: 'The paradise created by God',
    importance: 9,
    testament: 'old',
    characters: ['adam', 'eve', 'god'],
    events: ['creation', 'fall_of_man']
  },
  {
    id: 'ur',
    name_ko: '우르',
    name_en: 'Ur',
    type: 'city',
    region: 'mesopotamia',
    coordinates: { lat: 30.9633, lng: 46.1028 },
    description_ko: '아브라함의 고향',
    description_en: 'Hometown of Abraham',
    importance: 7,
    testament: 'old',
    characters: ['abraham', 'terah', 'sarah'],
    events: ['call_of_abraham']
  },
  {
    id: 'haran',
    name_ko: '하란',
    name_en: 'Haran',
    type: 'city',
    region: 'mesopotamia',
    coordinates: { lat: 36.8636, lng: 39.0303 },
    description_ko: '아브라함 가족이 거쳐간 곳, 야곱이 도망간 곳',
    description_en: 'Place Abraham family passed through, where Jacob fled',
    importance: 6,
    testament: 'old',
    characters: ['abraham', 'jacob', 'laban', 'rachel', 'leah'],
    events: []
  },
  {
    id: 'hebron',
    name_ko: '헤브론',
    name_en: 'Hebron',
    type: 'city',
    region: 'judea',
    coordinates: { lat: 31.5326, lng: 35.0998 },
    description_ko: '아브라함이 정착한 곳, 족장들의 무덤',
    description_en: 'Where Abraham settled, tomb of the patriarchs',
    importance: 7,
    testament: 'old',
    characters: ['abraham', 'isaac', 'jacob', 'sarah', 'david'],
    events: []
  },
  {
    id: 'beersheba',
    name_ko: '브엘세바',
    name_en: 'Beersheba',
    type: 'city',
    region: 'negev',
    coordinates: { lat: 31.2518, lng: 34.7913 },
    description_ko: '아브라함과 이삭이 우물을 판 곳',
    description_en: 'Where Abraham and Isaac dug wells',
    importance: 6,
    testament: 'old',
    characters: ['abraham', 'isaac', 'hagar', 'ishmael'],
    events: []
  },
  {
    id: 'egypt',
    name_ko: '이집트',
    name_en: 'Egypt',
    type: 'country',
    region: 'egypt',
    coordinates: { lat: 26.8206, lng: 30.8025 },
    description_ko: '이스라엘 백성이 노예로 있었던 곳',
    description_en: 'Where Israelites were slaves',
    importance: 9,
    testament: 'both',
    characters: ['moses', 'aaron', 'joseph', 'pharaoh', 'miriam'],
    events: ['exodus', 'ten_plagues', 'passover']
  },
  {
    id: 'sinai',
    name_ko: '시내산',
    name_en: 'Mount Sinai',
    type: 'mountain',
    region: 'sinai',
    coordinates: { lat: 28.5394, lng: 33.9753 },
    description_ko: '모세가 십계명을 받은 곳',
    description_en: 'Where Moses received the Ten Commandments',
    importance: 9,
    testament: 'old',
    characters: ['moses', 'god', 'aaron'],
    events: ['ten_commandments', 'golden_calf']
  },
  {
    id: 'canaan',
    name_ko: '가나안',
    name_en: 'Canaan',
    type: 'region',
    region: 'canaan',
    coordinates: { lat: 31.5, lng: 35.0 },
    description_ko: '하나님이 약속하신 땅',
    description_en: 'The Promised Land',
    importance: 9,
    testament: 'old',
    characters: ['joshua', 'caleb', 'moses'],
    events: ['conquest_of_canaan']
  },
  {
    id: 'babylon',
    name_ko: '바벨론',
    name_en: 'Babylon',
    type: 'city',
    region: 'mesopotamia',
    coordinates: { lat: 32.5364, lng: 44.4208 },
    description_ko: '유다 백성이 포로로 잡혀간 곳',
    description_en: 'Where Judah was taken captive',
    importance: 8,
    testament: 'old',
    characters: ['daniel', 'nebuchadnezzar', 'ezekiel', 'shadrach', 'meshach', 'abednego'],
    events: ['babylonian_exile', 'fiery_furnace', 'lions_den']
  },
  {
    id: 'nineveh',
    name_ko: '니느웨',
    name_en: 'Nineveh',
    type: 'city',
    region: 'assyria',
    coordinates: { lat: 36.3579, lng: 43.1533 },
    description_ko: '앗수르의 수도, 요나가 파송된 곳',
    description_en: 'Capital of Assyria, where Jonah was sent',
    importance: 7,
    testament: 'old',
    characters: ['jonah', 'nahum'],
    events: ['jonah_nineveh']
  },
  {
    id: 'mount_carmel',
    name_ko: '갈멜산',
    name_en: 'Mount Carmel',
    type: 'mountain',
    region: 'galilee',
    coordinates: { lat: 32.7366, lng: 35.0413 },
    description_ko: '엘리야가 바알 선지자들과 대결한 곳',
    description_en: 'Where Elijah confronted prophets of Baal',
    importance: 7,
    testament: 'old',
    characters: ['elijah'],
    events: ['elijah_baal']
  },
  {
    id: 'mount_moriah',
    name_ko: '모리아산',
    name_en: 'Mount Moriah',
    type: 'mountain',
    region: 'judea',
    coordinates: { lat: 31.7767, lng: 35.2356 },
    description_ko: '아브라함이 이삭을 바치려 한 곳, 성전터',
    description_en: 'Where Abraham was to sacrifice Isaac, Temple Mount',
    importance: 8,
    testament: 'old',
    characters: ['abraham', 'isaac', 'solomon'],
    events: ['sacrifice_of_isaac', 'temple_dedication']
  },

  // ==================== 신약 추가 지역 ====================
  {
    id: 'sea_of_galilee',
    name_ko: '갈릴리 바다',
    name_en: 'Sea of Galilee',
    type: 'lake',
    region: 'galilee',
    coordinates: { lat: 32.8231, lng: 35.5831 },
    description_ko: '예수님이 많은 기적을 행하신 곳',
    description_en: 'Where Jesus performed many miracles',
    importance: 8,
    testament: 'new',
    characters: ['jesus', 'peter', 'james', 'john_apostle', 'andrew'],
    events: ['walking_on_water', 'calming_storm', 'miraculous_catch']
  },
  {
    id: 'jordan_river',
    name_ko: '요단강',
    name_en: 'Jordan River',
    type: 'river',
    region: 'jordan_valley',
    coordinates: { lat: 31.8389, lng: 35.5517 },
    description_ko: '예수님이 세례를 받으신 곳',
    description_en: 'Where Jesus was baptized',
    importance: 8,
    testament: 'both',
    characters: ['jesus', 'john_baptist', 'joshua', 'elijah', 'elisha', 'naaman'],
    events: ['baptism_of_jesus', 'crossing_jordan']
  },
  {
    id: 'mount_of_olives',
    name_ko: '감람산',
    name_en: 'Mount of Olives',
    type: 'mountain',
    region: 'judea',
    coordinates: { lat: 31.7781, lng: 35.2442 },
    description_ko: '예수님이 승천하신 곳',
    description_en: 'Where Jesus ascended to heaven',
    importance: 8,
    testament: 'new',
    characters: ['jesus'],
    events: ['ascension', 'triumphal_entry']
  },
  {
    id: 'gethsemane',
    name_ko: '겟세마네',
    name_en: 'Gethsemane',
    type: 'garden',
    region: 'judea',
    coordinates: { lat: 31.7793, lng: 35.2396 },
    description_ko: '예수님이 기도하시고 체포되신 곳',
    description_en: 'Where Jesus prayed and was arrested',
    importance: 8,
    testament: 'new',
    characters: ['jesus', 'peter', 'james', 'john_apostle', 'judas_iscariot'],
    events: ['gethsemane_prayer']
  },
  {
    id: 'golgotha',
    name_ko: '골고다',
    name_en: 'Golgotha',
    type: 'hill',
    region: 'judea',
    coordinates: { lat: 31.7842, lng: 35.2298 },
    description_ko: '예수님이 십자가에 못 박히신 곳',
    description_en: 'Where Jesus was crucified',
    importance: 10,
    testament: 'new',
    characters: ['jesus', 'mary', 'john_apostle'],
    events: ['crucifixion']
  },
  {
    id: 'emmaus',
    name_ko: '엠마오',
    name_en: 'Emmaus',
    type: 'city',
    region: 'judea',
    coordinates: { lat: 31.8389, lng: 34.9892 },
    description_ko: '부활하신 예수님이 두 제자에게 나타나신 곳',
    description_en: 'Where risen Jesus appeared to two disciples',
    importance: 6,
    testament: 'new',
    characters: ['jesus', 'cleopas'],
    events: ['road_to_emmaus']
  },
  {
    id: 'patmos',
    name_ko: '밧모섬',
    name_en: 'Patmos',
    type: 'island',
    region: 'aegean',
    coordinates: { lat: 37.3167, lng: 26.5500 },
    description_ko: '요한이 계시록을 기록한 곳',
    description_en: 'Where John wrote Revelation',
    importance: 7,
    testament: 'new',
    characters: ['john_apostle'],
    events: []
  },
  {
    id: 'tarsus',
    name_ko: '다소',
    name_en: 'Tarsus',
    type: 'city',
    region: 'asia_minor',
    coordinates: { lat: 36.9169, lng: 34.8939 },
    description_ko: '바울의 출생지',
    description_en: 'Birthplace of Paul',
    importance: 6,
    testament: 'new',
    characters: ['paul'],
    events: []
  },
  {
    id: 'philippi',
    name_ko: '빌립보',
    name_en: 'Philippi',
    type: 'city',
    region: 'macedonia',
    coordinates: { lat: 41.0133, lng: 24.2828 },
    description_ko: '바울이 유럽에서 첫 교회를 세운 곳',
    description_en: 'Where Paul established first European church',
    importance: 7,
    testament: 'new',
    characters: ['paul', 'silas', 'lydia'],
    events: []
  },
  {
    id: 'thessalonica',
    name_ko: '데살로니가',
    name_en: 'Thessalonica',
    type: 'city',
    region: 'macedonia',
    coordinates: { lat: 40.6401, lng: 22.9444 },
    description_ko: '바울이 서신을 보낸 주요 교회',
    description_en: 'Major church to which Paul wrote letters',
    importance: 7,
    testament: 'new',
    characters: ['paul', 'silas', 'timothy'],
    events: []
  },
  {
    id: 'athens',
    name_ko: '아테네',
    name_en: 'Athens',
    type: 'city',
    region: 'greece',
    coordinates: { lat: 37.9838, lng: 23.7275 },
    description_ko: '바울이 아레오바고에서 설교한 곳',
    description_en: 'Where Paul preached at the Areopagus',
    importance: 6,
    testament: 'new',
    characters: ['paul'],
    events: ['areopagus_speech']
  }
];

// 지역 그룹
export const regions = [
  { id: 'judea', name_ko: '유대', name_en: 'Judea', color: '#4a90d9' },
  { id: 'galilee', name_ko: '갈릴리', name_en: 'Galilee', color: '#48c774' },
  { id: 'samaria', name_ko: '사마리아', name_en: 'Samaria', color: '#ffdd57' },
  { id: 'mesopotamia', name_ko: '메소포타미아', name_en: 'Mesopotamia', color: '#f5a623' },
  { id: 'egypt', name_ko: '이집트', name_en: 'Egypt', color: '#e67e22' },
  { id: 'sinai', name_ko: '시내', name_en: 'Sinai', color: '#e74c3c' },
  { id: 'syria', name_ko: '시리아', name_en: 'Syria', color: '#9b59b6' },
  { id: 'asia_minor', name_ko: '소아시아', name_en: 'Asia Minor', color: '#3498db' },
  { id: 'greece', name_ko: '그리스', name_en: 'Greece', color: '#1abc9c' },
  { id: 'italy', name_ko: '이탈리아', name_en: 'Italy', color: '#27ae60' },
  { id: 'macedonia', name_ko: '마게도냐', name_en: 'Macedonia', color: '#2980b9' },
  { id: 'jordan_valley', name_ko: '요단 골짜기', name_en: 'Jordan Valley', color: '#16a085' },
  { id: 'negev', name_ko: '네겝', name_en: 'Negev', color: '#d35400' },
  { id: 'assyria', name_ko: '앗수르', name_en: 'Assyria', color: '#c0392b' },
  { id: 'canaan', name_ko: '가나안', name_en: 'Canaan', color: '#8e44ad' },
  { id: 'aegean', name_ko: '에게해', name_en: 'Aegean', color: '#2c3e50' }
];

// 장소 유형 아이콘
export const locationTypeIcons = {
  city: '🏛️',
  region: '🗺️',
  country: '🌍',
  mountain: '⛰️',
  river: '🌊',
  lake: '💧',
  garden: '🌳',
  hill: '🏔️',
  island: '🏝️'
};

// 장소 검색
export const searchLocations = (query, lang = 'ko') => {
  const q = query.toLowerCase();
  return locations.filter(loc => {
    const name = (lang === 'ko' ? loc.name_ko : loc.name_en).toLowerCase();
    const desc = (lang === 'ko' ? loc.description_ko : loc.description_en).toLowerCase();
    return name.includes(q) || desc.includes(q);
  });
};

// 인물 관련 장소 조회
export const getLocationsByCharacter = (characterId) => {
  return locations.filter(loc => loc.characters.includes(characterId));
};

// 이벤트 관련 장소 조회
export const getLocationsByEvent = (eventId) => {
  return locations.filter(loc => loc.events.includes(eventId));
};

// 지역별 장소 조회
export const getLocationsByRegion = (regionId) => {
  return locations.filter(loc => loc.region === regionId);
};

// 중요도순 정렬
export const locationsByImportance = [...locations].sort((a, b) => b.importance - a.importance);

export default locations;
