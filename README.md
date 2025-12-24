# Bible Graph Explorer

Interactive web & app-ready experience for visualizing every person and event in the Korean Revised Version (개역개정) Old and New Testaments. Built to expand toward Neo4j/Obsidian-style relationship maps with FastAPI + Vite/React on the web and Flutter for app packaging.

## Features
- **Neo4j/Obsidian-inspired graph** with prominent neon-highlight nodes for key people and events.
- **Dual language (한국어/English)** presentation, including scripture snippets with text-to-speech reading.
- **Search, dropdown filters, and quick labels** for instantly jumping to famous figures.
- **Reset/refresh controls** plus a reserved **AdSense banner slot** for deployment.
- **Backend-ready** FastAPI endpoints for graph, search, and scripture retrieval, designed to scale to free/large DB backends and Neo4j.

## Project structure
```
backend/
  app/main.py        # FastAPI service with sample graph/person/scripture endpoints
  requirements.txt   # Backend dependencies
frontend/
  index.html         # Vite entry
  vite.config.js     # React + proxy to FastAPI
  package.json       # Frontend dependencies & scripts
  src/
    App.jsx          # UI with filters, neon highlights, scripture reader
    main.jsx         # React entry
    styles.css       # Dark neon styling
```

## Running locally
### Backend (FastAPI)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend (Vite + React)
```bash
cd frontend
npm install
npm run dev -- --host --port 5173
```
The Vite dev server proxies `/api` to the FastAPI service on port 8000.

## Extending toward production
- Connect FastAPI to Neo4j or an open Bible dataset, returning rich nodes/edges for all OT/NT people and events.
- Persist bilingual scripture text, relationships, and event timelines; add pagination and caching.
- Replace the stub graph with an interactive canvas (e.g., `react-force-graph`) and embed obsidian-style panes.
- Wire Flutter (mobile/web) to the same endpoints or wrap the Vite bundle inside a WebView for app store delivery.

## Notes
- Sample data is bundled for offline exploration; the UI automatically falls back when the API is unavailable.
- Text-to-speech uses the browser SpeechSynthesis API and respects the selected language when voices are available.
