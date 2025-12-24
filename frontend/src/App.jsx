import { useEffect, useMemo, useState } from "react";

const fallbackData = {
  people: [
    {
      id: "moses",
      name: "Moses",
      language_name: "모세",
      testament: "OT",
      summary: "Leader who delivered Israel from Egypt and received the Law.",
      highlight: true,
      labels: ["출애굽", "율법"],
      scriptures: [
        {
          book: "Exodus",
          chapter: 3,
          verses: "1-6",
          testament: "OT",
          language: "en",
          text: "Moses encounters God in the burning bush, receiving his calling.",
        },
        {
          book: "출애굽기",
          chapter: 3,
          verses: "1-6",
          testament: "OT",
          language: "ko",
          text: "모세가 불타는 떨기나무에서 하나님을 만나 부르심을 받는다.",
        },
      ],
    },
    {
      id: "david",
      name: "David",
      language_name: "다윗",
      testament: "OT",
      summary: "Second king of Israel, covenant bearer, and psalmist.",
      highlight: true,
      labels: ["왕", "시편"],
      scriptures: [],
    },
    {
      id: "mary",
      name: "Mary",
      language_name: "마리아",
      testament: "NT",
      summary: "Mother of Jesus, present at key gospel events.",
      highlight: false,
      labels: ["믿음", "순종"],
      scriptures: [],
    },
    {
      id: "jesus",
      name: "Jesus",
      language_name: "예수님",
      testament: "NT",
      summary: "Central figure of the New Testament, Messiah, and Savior.",
      highlight: true,
      labels: ["메시아", "복음"],
      scriptures: [
        {
          book: "Luke",
          chapter: 2,
          verses: "8-14",
          testament: "NT",
          language: "en",
          text: "Angels announce the birth of Jesus to shepherds.",
        },
        {
          book: "누가복음",
          chapter: 2,
          verses: "8-14",
          testament: "NT",
          language: "ko",
          text: "천사들이 예수의 탄생을 목자들에게 알린다.",
        },
      ],
    },
  ],
  events: [
    {
      id: "exodus",
      name: "Exodus",
      testament: "OT",
      description: "Deliverance of Israel from Egypt led by Moses.",
      highlight: true,
      scriptures: [],
    },
    {
      id: "birth-of-jesus",
      name: "Birth of Jesus",
      testament: "NT",
      description: "Incarnation event announced by angels to shepherds.",
      highlight: true,
      scriptures: [
        {
          book: "Luke",
          chapter: 2,
          verses: "8-14",
          testament: "NT",
          language: "en",
          text: "Angels announce the birth of Jesus to shepherds.",
        },
      ],
    },
  ],
  relationships: [
    { source: "moses", target: "exodus", label: "leads", importance: "primary" },
    { source: "jesus", target: "birth-of-jesus", label: "central to", importance: "primary" },
    { source: "mary", target: "jesus", label: "mother of", importance: "primary" },
    { source: "david", target: "jesus", label: "ancestor of", importance: "secondary" },
  ],
};

const famousLabels = [
  { id: "jesus", name: "예수님 / Jesus" },
  { id: "moses", name: "모세 / Moses" },
  { id: "david", name: "다윗 / David" },
  { id: "mary", name: "마리아 / Mary" },
];

const languages = [
  { key: "ko", label: "한국어" },
  { key: "en", label: "English" },
];

function speak(text, lang) {
  if (!("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  if (lang) {
    utterance.lang = lang === "ko" ? "ko-KR" : "en-US";
  }
  window.speechSynthesis.speak(utterance);
}

function App() {
  const [graph, setGraph] = useState(fallbackData);
  const [testament, setTestament] = useState("all");
  const [language, setLanguage] = useState("ko");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    fetch(`/api/graph${testament === "all" ? "" : `?testament=${testament}`}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => setGraph(data))
      .catch(() => setGraph(fallbackData));
  }, [testament]);

  const filteredPeople = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return graph.people.filter((person) => {
      const matchesTestament = testament === "all" || person.testament.toLowerCase() === testament;
      const matchesTerm = !term ||
        person.name.toLowerCase().includes(term) ||
        person.language_name.toLowerCase().includes(term) ||
        person.labels.some((label) => label.toLowerCase().includes(term));
      return matchesTestament && matchesTerm;
    });
  }, [graph.people, searchTerm, testament]);

  const relationships = useMemo(() => {
    const visiblePeopleIds = new Set(filteredPeople.map((p) => p.id));
    const visibleEvents = new Set(graph.events.filter((e) => testament === "all" || e.testament.toLowerCase() === testament).map((e) => e.id));
    return graph.relationships.filter((rel) => visiblePeopleIds.has(rel.source) && visibleEvents.has(rel.target));
  }, [filteredPeople, graph.events, graph.relationships, testament]);

  const events = useMemo(
    () => graph.events.filter((event) => testament === "all" || event.testament.toLowerCase() === testament),
    [graph.events, testament]
  );

  const handleReset = () => {
    setTestament("all");
    setLanguage("ko");
    setSearchTerm("");
    setSelectedPerson(null);
    setGraph(fallbackData);
  };

  const activePerson = selectedPerson || filteredPeople[0];

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-content">
          <div className="badge">네온 그래프 · Neo4j / Obsidian 스타일</div>
          <h1 className="title">개역개정 인물·사건 네온 그래프</h1>
          <p className="subtitle">
            구약/신약 주요 인물과 사건을 노드로 연결하고, 한/영 본문과 음성 낭독을 제공합니다.
            검색·드롭다운·라벨·리셋과 네온 하이라이트로 빠르게 통찰을 얻으세요.
          </p>
          <div className="controls">
            <div className="control-card">
              <label htmlFor="testament">구약/신약 보기</label>
              <select id="testament" value={testament} onChange={(e) => setTestament(e.target.value)}>
                <option value="all">전체</option>
                <option value="ot">구약 (OT)</option>
                <option value="nt">신약 (NT)</option>
              </select>
            </div>
            <div className="control-card">
              <label htmlFor="language">언어</label>
              <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
                {languages.map((lang) => (
                  <option key={lang.key} value={lang.key}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="control-card">
              <label htmlFor="search">검색 / 라벨 필터</label>
              <input
                id="search"
                placeholder="예: 예수, Moses, 메시아"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="control-card">
              <label>바로가기 라벨</label>
              <div className="label-row">
                {famousLabels.map((label) => (
                  <button key={label.id} className="label" onClick={() => setSelectedPerson(graph.people.find((p) => p.id === label.id))}>
                    {label.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="control-card reset-row">
              <button className="primary" onClick={() => window.location.reload()}>새로 고침</button>
              <button onClick={handleReset}>리셋</button>
            </div>
          </div>
        </div>
      </header>

      <main className="layout">
        <section className="panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>그래프 노드</h2>
            <div className="event-badge">중요 인물 / 사건 네온 강조</div>
          </div>
          <div className="graph-grid">
            {filteredPeople.map((person) => (
              <article
                key={person.id}
                className={`node-card ${person.highlight ? "highlight" : ""}`}
                onClick={() => setSelectedPerson(person)}
                style={{ cursor: "pointer" }}
              >
                <div className="node-title">
                  <strong>{language === "ko" ? person.language_name : person.name}</strong>
                  <span className="small-text">{person.testament === "OT" ? "구약" : "신약"}</span>
                </div>
                <p className="small-text">{person.summary}</p>
                <div className="label-row">
                  {person.labels.map((label) => (
                    <span key={label} className="label">
                      {label}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="relationships">
            <h3>관계도</h3>
            {relationships.map((rel) => (
              <div key={`${rel.source}-${rel.target}`} className="relationship-item">
                <span>{rel.source}</span>
                <span style={{ textAlign: "center" }}>{rel.label}</span>
                <span style={{ textAlign: "right" }}>{rel.target}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>사건 · 본문 · 낭독</h2>
          {activePerson ? (
            <div className="scripture-card">
              <div className="node-title">
                <div>
                  <strong>{language === "ko" ? activePerson.language_name : activePerson.name}</strong>
                  <div className="small-text">{activePerson.summary}</div>
                </div>
                <button className="primary" onClick={() => speak(activePerson.summary, language)}>
                  🔊 요약 읽기
                </button>
              </div>

              <div className="label-row" style={{ marginTop: "0.5rem" }}>
                {activePerson.labels.map((label) => (
                  <span key={label} className="label">
                    {label}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: "0.75rem" }}>
                <h4>연결 사건</h4>
                <div className="label-row">
                  {relationships
                    .filter((rel) => rel.source === activePerson.id)
                    .map((rel) => {
                      const event = events.find((ev) => ev.id === rel.target);
                      if (!event) return null;
                      return (
                        <span key={event.id} className="label">
                          {event.name}
                        </span>
                      );
                    })}
                </div>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <h4>관련 본문 (한/영)</h4>
                {activePerson.scriptures && activePerson.scriptures.length > 0 ? (
                  activePerson.scriptures
                    .filter((s) => (language === "ko" ? s.language === "ko" : s.language === "en"))
                    .map((scripture) => (
                      <div key={`${scripture.book}-${scripture.language}`} className="scripture-card" style={{ marginTop: "0.5rem" }}>
                        <div className="node-title">
                          <span>
                            {scripture.book} {scripture.chapter}:{scripture.verses}
                          </span>
                          <button onClick={() => speak(scripture.text, language)}>🔊 본문 읽기</button>
                        </div>
                        <p style={{ margin: 0 }}>{scripture.text}</p>
                      </div>
                    ))
                ) : (
                  <p className="small-text">연결된 본문을 준비 중입니다.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="small-text">인물을 선택하여 본문과 사건을 확인하세요.</p>
          )}

          <div style={{ marginTop: "1rem" }}>
            <h3>사건 리스트</h3>
            {events.map((event) => (
              <div key={event.id} className={`node-card ${event.highlight ? "highlight" : ""}`} style={{ marginBottom: "0.5rem" }}>
                <div className="node-title">
                  <strong>{event.name}</strong>
                  <span className="small-text">{event.testament === "OT" ? "구약" : "신약"}</span>
                </div>
                <p className="small-text">{event.description}</p>
              </div>
            ))}
          </div>

          <div className="adsense">adsense 배너 자리 (하단 슬림 영역)</div>
        </section>
      </main>

      <footer className="footer">
        데이터는 FastAPI/Neo4j/Obsidian 스타일로 확장 가능하며, 앱 배포는 Flutter WebView·앱으로 연결할 수 있습니다.
      </footer>
    </div>
  );
}

export default App;
