import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { allCharacters, events } from '../frontend/src/data/index.js';
import { characterArtwork, eventArtwork } from '../frontend/src/data/artwork.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, '../frontend/src/data/artwork.generated.json');

const MAX_IMAGES = 3;
const MAX_CONCURRENT = 4;
const REQUEST_DELAY_MS = 150;

const COMMON_NAMES = new Set([
  'Mary',
  'John',
  'James',
  'Joseph',
  'Judas',
  'Simon',
  'Philip',
  'Andrew',
  'Peter',
  'Mark',
  'Luke',
  'Matthew',
  'Paul'
]);

const manualOverrides = {
  characterArtwork: {
    obadiah_ahab: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Ahab%2C_Elijah_and_Obadiah_-_Vanderbilt_ACT_-_00001272.jpg/663px-Ahab%2C_Elijah_and_Obadiah_-_Vanderbilt_ACT_-_00001272.jpg',
        title: 'Ahab, Elijah and Obadiah - Vanderbilt ACT - 00001272',
        artist: 'Anne C. Richardson, Jim Womack',
        year: '2003',
        source: 'https://commons.wikimedia.org/wiki/File:Ahab,_Elijah_and_Obadiah_-_Vanderbilt_ACT_-_00001272.jpg',
        license: 'Public domain'
      }
    ],
    obadiah_servant: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Ahab%2C_Elijah_and_Obadiah_-_Vanderbilt_ACT_-_00001272.jpg/663px-Ahab%2C_Elijah_and_Obadiah_-_Vanderbilt_ACT_-_00001272.jpg',
        title: 'Ahab, Elijah and Obadiah - Vanderbilt ACT - 00001272',
        artist: 'Anne C. Richardson, Jim Womack',
        year: '2003',
        source: 'https://commons.wikimedia.org/wiki/File:Ahab,_Elijah_and_Obadiah_-_Vanderbilt_ACT_-_00001272.jpg',
        license: 'Public domain'
      }
    ],
    tattenai: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Persepolis_stairs_of_the_Apadana_relief02.JPG/960px-Persepolis_stairs_of_the_Apadana_relief02.JPG',
        title: 'Persepolis stairs of the Apadana relief02',
        artist: 'Taranis-iuppiter',
        year: '2011',
        source: 'https://commons.wikimedia.org/wiki/File:Persepolis_stairs_of_the_Apadana_relief02.JPG',
        license: 'CC BY-SA 3.0'
      }
    ],
    ishmael_assassin: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Godolia_door_Isma%C3%ABl_vermoord%2C_RP-P-OB-45.154.jpg/960px-Godolia_door_Isma%C3%ABl_vermoord%2C_RP-P-OB-45.154.jpg',
        title: 'Godolia door Ismael vermoord, RP-P-OB-45.154',
        artist: 'Rijksmuseum',
        year: '1704',
        source: 'https://commons.wikimedia.org/wiki/File:Godolia_door_Isma%C3%ABl_vermoord,_RP-P-OB-45.154.jpg',
        license: 'CC0'
      }
    ],
    hananiah_prophet: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Breaking_of_Jeremiah%27s_Yoke_-_Vanderbilt_ACT_-_00001220.jpg/637px-Breaking_of_Jeremiah%27s_Yoke_-_Vanderbilt_ACT_-_00001220.jpg',
        title: 'Breaking of Jeremiah\'s Yoke - Vanderbilt ACT - 00001220',
        artist: 'Anne C. Richardson, Jim Womack',
        year: '2003',
        source: 'https://commons.wikimedia.org/wiki/File:Breaking_of_Jeremiah%27s_Yoke_-_Vanderbilt_ACT_-_00001220.jpg',
        license: 'Public domain'
      }
    ]
  },
  eventArtwork: {
    gideon_300: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/054.Gideon_Chooses_300_Soldiers.jpg/960px-054.Gideon_Chooses_300_Soldiers.jpg',
        title: '054.Gideon Chooses 300 Soldiers',
        artist: 'Gustave Dore',
        year: '1866',
        source: 'https://commons.wikimedia.org/wiki/File:054.Gideon_Chooses_300_Soldiers.jpg',
        license: 'Public domain'
      }
    ],
    haman_defeated: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Michelangelo_Sistine_Chapel_ceiling_-_Punishment_of_Haman_restored.jpg/780px-Michelangelo_Sistine_Chapel_ceiling_-_Punishment_of_Haman_restored.jpg',
        title: 'Punishment of Haman (restored)',
        artist: 'Michelangelo',
        year: '1508',
        source: 'https://commons.wikimedia.org/wiki/File:Michelangelo_Sistine_Chapel_ceiling_-_Punishment_of_Haman_restored.jpg',
        license: 'Public domain'
      }
    ]
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const stripHtml = (value) => (value || '').replace(/<[^>]*>/g, ' ');

const decodeHtml = (value) => {
  const map = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' '
  };
  return (value || '').replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, code) => {
    if (code[0] === '#') {
      const isHex = code[1] === 'x' || code[1] === 'X';
      const num = parseInt(code.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      if (Number.isNaN(num)) return '';
      return String.fromCodePoint(num);
    }
    return map[code] || '';
  });
};

const asciiSanitize = (value) => {
  if (!value) return '';
  return value
    .normalize('NFKD')
    .replace(/[^\x00-\x7F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const normalizeText = (value) => asciiSanitize(decodeHtml(stripHtml(value)));

const extractYear = (value) => {
  const text = normalizeText(value);
  const match = text.match(/\b(\d{4})\b/);
  if (match) return match[1];
  return text;
};

const needsDisambiguation = (name) => {
  const cleaned = name.replace(/[()]/g, '').trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (cleaned.length <= 5 || words.length <= 1) return true;
  return COMMON_NAMES.has(words[0]);
};

const buildQueries = (item) => {
  const base = (item.name_en || '').trim();
  if (!base) return [];
  const queries = new Set();
  queries.add(base);
  if (item.type === 'event') {
    queries.add(`${base} Bible`);
    queries.add(`${base} painting`);
  } else if (needsDisambiguation(base)) {
    queries.add(`${base} Bible`);
  }
  if (item.description_en) {
    const hint = item.description_en.split('.')[0]?.trim();
    if (hint) {
      const words = hint.split(/\s+/).slice(0, 4).join(' ');
      if (words) queries.add(`${base} ${words}`);
    }
  }
  return Array.from(queries).slice(0, 4);
};

const searchCommons = async (query) => {
  const url = new URL('https://commons.wikimedia.org/w/api.php');
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    formatversion: '2',
    generator: 'search',
    gsrsearch: `${query} filetype:bitmap`,
    gsrnamespace: '6',
    gsrlimit: '6',
    prop: 'imageinfo',
    iiprop: 'url|extmetadata',
    iiurlwidth: '600',
    origin: '*'
  });
  url.search = params.toString();

  const response = await fetch(url.toString(), {
    headers: {
      'User-Agent': 'BibleGraphArtworkFetcher/1.0'
    }
  });
  if (!response.ok) {
    throw new Error(`Commons request failed: ${response.status}`);
  }
  const data = await response.json();
  const pages = data?.query?.pages || [];
  const results = [];

  for (const page of pages) {
    const info = page?.imageinfo?.[0];
    if (!info) continue;
    const meta = info.extmetadata || {};
    const titleRaw = meta.ObjectName?.value || meta.ImageDescription?.value || page.title || '';
    const artistRaw = meta.Artist?.value || meta.Credit?.value || 'Unknown';
    const dateRaw = meta.DateTimeOriginal?.value || meta.DateTime?.value || meta.Date?.value || '';
    const licenseRaw = meta.LicenseShortName?.value || meta.License?.value || '';

    const title = normalizeText(titleRaw) || normalizeText(page.title?.replace(/^File:/, '')) || 'Untitled';
    const artist = normalizeText(artistRaw) || 'Unknown';
    const year = extractYear(dateRaw) || '';
    const license = normalizeText(licenseRaw) || '';
    const url = info.thumburl || info.url || '';
    const source = info.descriptionurl || '';

    if (!url) continue;
    results.push({
      url,
      title: title.slice(0, 160),
      artist: artist.slice(0, 120),
      year: year.slice(0, 20),
      source,
      license: license.slice(0, 60)
    });
  }

  return results;
};

const loadExisting = async () => {
  try {
    const raw = await fs.readFile(outputPath, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      characterArtwork: parsed.characterArtwork || {},
      eventArtwork: parsed.eventArtwork || {}
    };
  } catch (err) {
    return { characterArtwork: {}, eventArtwork: {} };
  }
};

const applyOverrides = (target, overrides) => {
  for (const [id, items] of Object.entries(overrides || {})) {
    if (!target[id] || target[id].length === 0) {
      target[id] = items;
    }
  }
};

const fetchArtworkForItem = async (item) => {
  const queries = buildQueries(item);
  for (const query of queries) {
    await sleep(REQUEST_DELAY_MS);
    try {
      const results = await searchCommons(query);
      if (results.length) {
        const unique = [];
        const seen = new Set();
        for (const result of results) {
          if (seen.has(result.url)) continue;
          seen.add(result.url);
          unique.push(result);
          if (unique.length >= MAX_IMAGES) break;
        }
        if (unique.length) return unique;
      }
    } catch (err) {
      console.warn(`Search failed for "${query}": ${err.message}`);
    }
  }
  return [];
};

const main = async () => {
  const existing = await loadExisting();
  applyOverrides(existing.characterArtwork, manualOverrides.characterArtwork);
  applyOverrides(existing.eventArtwork, manualOverrides.eventArtwork);
  const existingCharacterIds = new Set([
    ...Object.keys(characterArtwork),
    ...Object.keys(existing.characterArtwork)
  ]);
  const existingEventIds = new Set([
    ...Object.keys(eventArtwork),
    ...Object.keys(existing.eventArtwork)
  ]);

  const missingCharacters = allCharacters.filter((c) => !existingCharacterIds.has(c.id));
  const missingEvents = events.filter((e) => !existingEventIds.has(e.id));

  console.log(`Missing characters: ${missingCharacters.length}`);
  console.log(`Missing events: ${missingEvents.length}`);

  const tasks = [
    ...missingCharacters.map((c) => ({ type: 'character', id: c.id, name_en: c.name_en, description_en: c.description_en })),
    ...missingEvents.map((e) => ({ type: 'event', id: e.id, name_en: e.name_en, description_en: e.description_en }))
  ];

  let completed = 0;
  const total = tasks.length;
  const missingLog = [];

  const runQueue = async () => {
    while (tasks.length) {
      const item = tasks.shift();
      if (!item) return;
      const results = await fetchArtworkForItem(item);
      if (results.length) {
        if (item.type === 'character') {
          existing.characterArtwork[item.id] = results;
        } else {
          existing.eventArtwork[item.id] = results;
        }
      } else {
        missingLog.push(`${item.type}:${item.id}`);
      }
      completed += 1;
      if (completed % 10 === 0 || completed === total) {
        console.log(`Progress: ${completed}/${total}`);
      }
    }
  };

  await Promise.all(Array.from({ length: MAX_CONCURRENT }, runQueue));

  const sorted = (obj) =>
    Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)));

  const output = {
    characterArtwork: sorted(existing.characterArtwork),
    eventArtwork: sorted(existing.eventArtwork)
  };

  await fs.writeFile(outputPath, JSON.stringify(output, null, 2), 'utf8');
  if (missingLog.length) {
    const missingPath = path.resolve(__dirname, '../scripts/artwork-missing.log');
    await fs.writeFile(missingPath, missingLog.join('\n'), 'utf8');
    console.log(`Missing items logged: ${missingPath}`);
  }
  console.log(`Generated artwork data: ${outputPath}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
