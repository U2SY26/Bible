from __future__ import annotations

from typing import List, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Bible Graph Explorer", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ScriptureRef(BaseModel):
    book: str
    chapter: int
    verses: str
    testament: str
    language: str
    text: str


class Relationship(BaseModel):
    source: str
    target: str
    label: str
    importance: str


class PersonNode(BaseModel):
    id: str
    name: str
    language_name: str
    testament: str
    summary: str
    highlight: bool = False
    labels: List[str] = []
    scriptures: List[ScriptureRef] = []


class EventNode(BaseModel):
    id: str
    name: str
    testament: str
    description: str
    highlight: bool = False
    scriptures: List[ScriptureRef] = []


class GraphResponse(BaseModel):
    people: List[PersonNode]
    events: List[EventNode]
    relationships: List[Relationship]


SAMPLE_SCRIPTURES = [
    ScriptureRef(
        book="Exodus",
        chapter=3,
        verses="1-6",
        testament="OT",
        language="en",
        text="Moses encounters God in the burning bush, receiving his calling.",
    ),
    ScriptureRef(
        book="출애굽기",
        chapter=3,
        verses="1-6",
        testament="OT",
        language="ko",
        text="모세가 불타는 떨기나무에서 하나님을 만나 부르심을 받는다.",
    ),
    ScriptureRef(
        book="Luke",
        chapter=2,
        verses="8-14",
        testament="NT",
        language="en",
        text="Angels announce the birth of Jesus to shepherds.",
    ),
    ScriptureRef(
        book="누가복음",
        chapter=2,
        verses="8-14",
        testament="NT",
        language="ko",
        text="천사들이 예수의 탄생을 목자들에게 알린다.",
    ),
]

PEOPLE = [
    PersonNode(
        id="moses",
        name="Moses",
        language_name="모세",
        testament="OT",
        summary="Leader who delivered Israel from Egypt and received the Law.",
        highlight=True,
        labels=["출애굽", "율법"],
        scriptures=[s for s in SAMPLE_SCRIPTURES if s.book in {"Exodus", "출애굽기"}],
    ),
    PersonNode(
        id="david",
        name="David",
        language_name="다윗",
        testament="OT",
        summary="Second king of Israel, covenant bearer, and psalmist.",
        highlight=True,
        labels=["왕", "시편"],
    ),
    PersonNode(
        id="mary",
        name="Mary",
        language_name="마리아",
        testament="NT",
        summary="Mother of Jesus, present at key gospel events.",
        highlight=False,
        labels=["믿음", "순종"],
    ),
    PersonNode(
        id="jesus",
        name="Jesus",
        language_name="예수님",
        testament="NT",
        summary="Central figure of the New Testament, Messiah, and Savior.",
        highlight=True,
        labels=["메시아", "복음"],
        scriptures=[s for s in SAMPLE_SCRIPTURES if s.book in {"Luke", "누가복음"}],
    ),
]

EVENTS = [
    EventNode(
        id="exodus",
        name="Exodus",
        testament="OT",
        description="Deliverance of Israel from Egypt led by Moses.",
        highlight=True,
    ),
    EventNode(
        id="birth-of-jesus",
        name="Birth of Jesus",
        testament="NT",
        description="Incarnation event announced by angels to shepherds.",
        highlight=True,
        scriptures=[s for s in SAMPLE_SCRIPTURES if s.book in {"Luke", "누가복음"}],
    ),
]

RELATIONSHIPS = [
    Relationship(source="moses", target="exodus", label="leads", importance="primary"),
    Relationship(source="jesus", target="birth-of-jesus", label="central to", importance="primary"),
    Relationship(source="mary", target="jesus", label="mother of", importance="primary"),
    Relationship(source="david", target="jesus", label="ancestor of", importance="secondary"),
]


@app.get("/api/graph", response_model=GraphResponse)
def get_graph(testament: Optional[str] = None) -> GraphResponse:
    def match_testament(item_testament: str) -> bool:
        if testament is None:
            return True
        return item_testament.lower() == testament.lower()

    filtered_people = [p for p in PEOPLE if match_testament(p.testament)]
    filtered_events = [e for e in EVENTS if match_testament(e.testament)]
    person_ids = {p.id for p in filtered_people}
    event_ids = {e.id for e in filtered_events}
    filtered_relationships = [
        r for r in RELATIONSHIPS if r.source in person_ids and r.target in event_ids
    ]
    return GraphResponse(
        people=filtered_people,
        events=filtered_events,
        relationships=filtered_relationships,
    )


@app.get("/api/person/{person_id}", response_model=PersonNode)
def get_person(person_id: str) -> PersonNode:
    for person in PEOPLE:
        if person.id == person_id:
            return person
    raise HTTPException(status_code=404, detail=f"Person {person_id} not found")


@app.get("/api/search", response_model=List[PersonNode])
def search(term: str, testament: Optional[str] = None) -> List[PersonNode]:
    lowered = term.lower()
    results = [p for p in PEOPLE if lowered in p.name.lower() or lowered in p.language_name.lower()]
    if testament:
        results = [p for p in results if p.testament.lower() == testament.lower()]
    return results


@app.get("/api/scriptures", response_model=List[ScriptureRef])
def scriptures(testament: Optional[str] = None, language: Optional[str] = None) -> List[ScriptureRef]:
    refs = SAMPLE_SCRIPTURES
    if testament:
        refs = [s for s in refs if s.testament.lower() == testament.lower()]
    if language:
        refs = [s for s in refs if s.language.lower() == language.lower()]
    return refs


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}
