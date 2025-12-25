# 📖 성경 인물 관계도 v3.0

인터랙티브 그래프로 성경 인물, 사건, 찬송가를 탐색하세요.

## ✨ 주요 기능

### 📚 성경 66권 필터링
- **구약 39권**: 모세오경, 역사서, 시가서, 대선지서, 소선지서
- **신약 27권**: 복음서, 사도행전, 바울서신, 공동서신, 요한계시록
- 개역개정 버전 기준

### 👥 100+ 성경 인물
- 삼위일체: 하나님, 예수 그리스도, 성령
- 구약: 아담, 노아, 아브라함, 모세, 다윗, 엘리야, 다니엘 등
- 신약: 마리아, 베드로, 바울, 요한 등 12제자와 초대교회 인물

### 🔗 관계 시각화
- 가족 관계 (부모, 배우자, 형제)
- 영적 관계 (스승, 제자, 언약)
- 역사적 관계 (조상, 예언, 적대)
- 관계 유형별 색상 구분

### 📌 주요 사건
- 창조, 홍수, 출애굽, 다윗과 골리앗, 십자가, 부활 등 50+ 사건
- 시간 연대순 타임라인
- 사건별 성경 구절 및 간략 강해

### 🎵 새찬송가 연동
- 인물/사건과 관련된 찬송가 표시
- 40+ 찬송가 연결

### 🎨 인터랙티브 기능
- 드래그 & 드롭으로 노드 이동
- 줌 인/아웃 (마우스 휠)
- 패닝 (빈 공간 드래그)
- 필터링된 인물과 연결된 인물 하이라이트
- 비활성 노드 투명도 처리

### 🌍 다국어 지원
- 한국어 / English 실시간 전환

## 🚀 시작하기

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
```

## 📁 프로젝트 구조

```
bible-project-v3/
├── src/
│   ├── data/
│   │   ├── books.js          # 성경 66권 데이터
│   │   ├── characters.js     # 인물 데이터 (창조-족장)
│   │   ├── characters-extended.js  # 인물 데이터 (출애굽-구약)
│   │   ├── characters-nt.js  # 인물 데이터 (신약)
│   │   ├── relationships.js  # 관계 데이터
│   │   ├── events.js         # 사건 데이터
│   │   ├── hymns.js          # 찬송가 데이터
│   │   └── index.js          # 데이터 통합
│   ├── App.jsx               # 메인 컴포넌트
│   └── main.jsx              # 진입점
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

## 🌐 배포

### Vercel 배포
1. [Vercel](https://vercel.com)에 로그인
2. "New Project" 클릭
3. GitHub 연결 또는 폴더 업로드
4. 자동 배포 완료

### GitHub Pages 배포
```bash
npm run build
# dist 폴더를 gh-pages 브랜치에 푸시
```

## 📝 데이터 구조

### 인물 (Character)
```javascript
{
  id: 'abraham',
  name_ko: '아브라함',
  name_en: 'Abraham',
  testament: 'old',
  importance: 9,
  books: ['gen', 'rom', 'gal', 'heb'],
  description_ko: '믿음의 조상...',
  description_en: 'Father of faith...',
  verses: [{ ref: '창세기 12:1', text_ko: '...', text_en: '...' }],
  labels: ['믿음의 조상', 'Father of Faith'],
  era: 'patriarchs',
  location: '우르, 하란, 가나안',
  hymns: [188, 295]
}
```

### 사건 (Event)
```javascript
{
  id: 'exodus_event',
  name_ko: '출애굽',
  name_en: 'The Exodus',
  year: -1446,
  era: 'exodus',
  books: ['exo'],
  verses: ['출애굽기 12:31-42'],
  description_ko: '이스라엘 백성이 430년 만에 이집트를 떠남',
  characters: ['moses', 'aaron', 'miriam'],
  icon: '🚶‍♂️',
  commentary_ko: '구약에서 가장 중요한 구원 사건...'
}
```

## 🙏 감사의 말

- 개역개정 성경
- 새찬송가
- [KoreanRevisedVersion-obsidian](https://github.com/JeongWhanLee/KoreanRevisedVersion-obsidian) 프로젝트 참고

## 📄 라이선스

MIT License

---

**하나님의 말씀을 더 깊이 탐구하는 데 도움이 되길 바랍니다.** 📖✨
