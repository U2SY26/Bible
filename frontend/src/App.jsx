import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";

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
  const [graphDimensions, setGraphDimensions] = useState({ width: 600, height: 400 });
  const graphContainerRef = useRef(null);
  const fgRef = useRef();

  useEffect(() => {
    fetch(`/api/graph${testament === "all" ? "" : `?testament=${testament}`}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => setGraph(data))
      .catch(() => setGraph(fallbackData));
  }, [testament]);

  useEffect(() => {
    const updateDimensions = () => {
      if (graphContainerRef.current) {
        const { width, height } = graphContainerRef.current.getBoundingClientRect();
        setGraphDimensions({ width, height: Math.max(400, height) });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

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

  const events = useMemo(
    () => graph.events.filter((event) => testament === "all" || event.testament.toLowerCase() === testament),
    [graph.events, testament]
  );

  const graphData = useMemo(() => {
    const nodes = [
      ...filteredPeople.map((p) => ({
        id: p.id,
        name: language === "ko" ? p.language_name : p.name,
        type: "person",
        highlight: p.highlight,
        testament: p.testament,
        data: p,
      })),
      ...events.map((e) => ({
        id: e.id,
        name: e.name,
        type: "event",
        highlight: e.highlight,
        testament: e.testament,
        data: e,
      })),
    ];

    const nodeIds = new Set(nodes.map((n) => n.id));
    const links = graph.relationships
      .filter((rel) => nodeIds.has(rel.source) && nodeIds.has(rel.target))
      .map((rel) => ({
        source: rel.source,
        target: rel.target,
        label: rel.label,
        importance: rel.importance,
      }));

    return { nodes, links };
  }, [filteredPeople, events, graph.relationships, language]);

  const handleNodeClick = useCallback((node) => {
    if (node.type === "person") {
      setSelectedPerson(node.data);
    }
    if (fgRef.current) {
      fgRef.current.centerAt(node.x, node.y, 500);
      fgRef.current.zoom(2, 500);
    }
  }, []);

  const nodeCanvasObject = useCallback((node, ctx, globalScale) => {
    if (node.x === undefined || node.y === undefined || !Number.isFinite(node.x) || !Number.isFinite(node.y)) {
      return;
    }

    const label = node.name;
    const fontSize = 14 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;

    const nodeRadius = node.type === "person" ? 8 : 6;

    // Node glow for highlighted nodes
    if (node.highlight) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, nodeRadius + 4, 0, 2 * Math.PI);
      const gradient = ctx.createRadialGradient(node.x, node.y, nodeRadius, node.x, node.y, nodeRadius + 8);
      if (node.type === "person") {
        gradient.addColorStop(0, "rgba(0, 245, 255, 0.6)");
        gradient.addColorStop(1, "rgba(0, 245, 255, 0)");
      } else {
        gradient.addColorStop(0, "rgba(255, 105, 180, 0.6)");
        gradient.addColorStop(1, "rgba(255, 105, 180, 0)");
      }
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // Node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
    if (node.type === "person") {
      ctx.fillStyle = node.testament === "OT" ? "#47bfff" : "#6a62ff";
    } else {
      ctx.fillStyle = node.testament === "OT" ? "#ff9f47" : "#ff6b9d";
    }
    ctx.fill();

    // Border
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5 / globalScale;
    ctx.stroke();

    // Label
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#f4f6fb";
    ctx.fillText(label, node.x, node.y + nodeRadius + fontSize);
  }, []);

  const linkCanvasObject = useCallback((link, ctx, globalScale) => {
    const start = link.source;
    const end = link.target;

    if (typeof start !== "object" || typeof end !== "object") return;

    // Draw line
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = link.importance === "primary" ? "rgba(0, 245, 255, 0.5)" : "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = link.importance === "primary" ? 2 / globalScale : 1 / globalScale;
    ctx.stroke();

    // Draw label
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    const fontSize = 10 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(200, 220, 255, 0.8)";
    ctx.fillText(link.label, midX, midY);
  }, []);

  const handleReset = () => {
    setTestament("all");
    setLanguage("ko");
    setSearchTerm("");
    setSelectedPerson(null);
    setGraph(fallbackData);
  };

  const activePerson = selectedPerson || filteredPeople[0];

  const relationships = useMemo(() => {
    const visiblePeopleIds = new Set(filteredPeople.map((p) => p.id));
    const visibleEvents = new Set(events.map((e) => e.id));
    return graph.relationships.filter((rel) => visiblePeopleIds.has(rel.source) && visibleEvents.has(rel.target));
  }, [filteredPeople, events, graph.relationships]);

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-content">
          <h1 className="title">개역개정 인물·사건 그래프</h1>
          <p className="subtitle">
            구약/신약 주요 인물과 사건을 노드로 연결합니다. 노드를 클릭하여 상세 정보를 확인하세요.
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
              <label htmlFor="search">검색</label>
              <input
                id="search"
                placeholder="예: 예수, Moses"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="control-card">
              <label>바로가기</label>
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
        <section className="panel graph-panel" ref={graphContainerRef}>
          <h2>관계 그래프</h2>
          <div className="graph-legend">
            <span className="legend-item"><span className="dot person-ot"></span> 인물 (구약)</span>
            <span className="legend-item"><span className="dot person-nt"></span> 인물 (신약)</span>
            <span className="legend-item"><span className="dot event-ot"></span> 사건 (구약)</span>
            <span className="legend-item"><span className="dot event-nt"></span> 사건 (신약)</span>
          </div>
          <div className="graph-container">
            <ForceGraph2D
              ref={fgRef}
              graphData={graphData}
              width={graphDimensions.width - 40}
              height={350}
              backgroundColor="rgba(13, 15, 26, 0)"
              nodeCanvasObject={nodeCanvasObject}
              linkCanvasObject={linkCanvasObject}
              onNodeClick={handleNodeClick}
              nodePointerAreaPaint={(node, color, ctx) => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, 12, 0, 2 * Math.PI);
                ctx.fillStyle = color;
                ctx.fill();
              }}
              cooldownTicks={50}
              d3AlphaDecay={0.02}
              d3VelocityDecay={0.3}
              linkDirectionalParticles={2}
              linkDirectionalParticleWidth={2}
              linkDirectionalParticleSpeed={0.005}
              linkDirectionalParticleColor={() => "rgba(0, 245, 255, 0.8)"}
            />
          </div>
        </section>

        <section className="panel">
          <h2>상세 정보</h2>
          {activePerson ? (
            <div className="scripture-card">
              <div className="node-title">
                <div>
                  <strong>{language === "ko" ? activePerson.language_name : activePerson.name}</strong>
                  <div className="small-text">{activePerson.summary}</div>
                </div>
                <button className="primary" onClick={() => speak(activePerson.summary, language)}>
                  🔊 읽기
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
                <h4>관련 본문</h4>
                {activePerson.scriptures && activePerson.scriptures.length > 0 ? (
                  activePerson.scriptures
                    .filter((s) => (language === "ko" ? s.language === "ko" : s.language === "en"))
                    .map((scripture) => (
                      <div key={`${scripture.book}-${scripture.language}`} className="scripture-card" style={{ marginTop: "0.5rem" }}>
                        <div className="node-title">
                          <span>
                            {scripture.book} {scripture.chapter}:{scripture.verses}
                          </span>
                          <button onClick={() => speak(scripture.text, language)}>🔊</button>
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
            <p className="small-text">노드를 클릭하여 상세 정보를 확인하세요.</p>
          )}

          <div style={{ marginTop: "1rem" }}>
            <h3>사건 목록</h3>
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
        </section>
      </main>

      <footer className="footer">
        성경 인물 관계 그래프 | 데이터는 지속적으로 확장됩니다
      </footer>
    </div>
  );
}

export default App;
