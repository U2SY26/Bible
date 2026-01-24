// Convert JS data files to JSON for Flutter app
import { writeFileSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'frontend', 'src', 'data');
const outputDir = join(__dirname, '..', 'flutter_app', 'assets', 'data');

// Helper to convert path to file URL for Windows
const toFileUrl = (path) => pathToFileURL(path).href;

// Import all data modules
const { characters } = await import(toFileUrl(join(dataDir, 'characters.js')));
const { charactersExtended } = await import(toFileUrl(join(dataDir, 'characters-extended.js')));
const { charactersNewTestament } = await import(toFileUrl(join(dataDir, 'characters-nt.js')));
const { patriarchCharacters } = await import(toFileUrl(join(dataDir, 'characters-patriarchs.js')));
const { exodusCharacters } = await import(toFileUrl(join(dataDir, 'characters-exodus.js')));
const { judgesKingsCharacters } = await import(toFileUrl(join(dataDir, 'characters-judges-kings.js')));
const { prophetCharacters } = await import(toFileUrl(join(dataDir, 'characters-prophets.js')));
const { charactersNTExpanded } = await import(toFileUrl(join(dataDir, 'characters-nt-expanded.js')));
const { charactersOTSupplemental } = await import(toFileUrl(join(dataDir, 'characters-ot-supplemental.js')));
const { relationships: baseRelationships, relationshipColors } = await import(toFileUrl(join(dataDir, 'relationships.js')));
const { relationshipsExpanded } = await import(toFileUrl(join(dataDir, 'relationships-expanded.js')));
const { events: baseEvents, eras } = await import(toFileUrl(join(dataDir, 'events.js')));
const { eventsExpanded } = await import(toFileUrl(join(dataDir, 'events-expanded.js')));
const { eventsPhase2 } = await import(toFileUrl(join(dataDir, 'events-phase2.js')));
const { bibleBooks, allBooks } = await import(toFileUrl(join(dataDir, 'books.js')));
const { hymns } = await import(toFileUrl(join(dataDir, 'hymns.js')));
const { locations, regions: locationRegions, locationTypeIcons } = await import(toFileUrl(join(dataDir, 'locations.js')));

// Merge and deduplicate characters
const allCharactersRaw = [
  ...characters,
  ...charactersExtended,
  ...charactersNewTestament,
  ...patriarchCharacters,
  ...exodusCharacters,
  ...judgesKingsCharacters,
  ...prophetCharacters,
  ...charactersNTExpanded,
  ...charactersOTSupplemental
];

const characterMap = new Map();
allCharactersRaw.forEach(char => {
  characterMap.set(char.id, char);
});
const allCharacters = Array.from(characterMap.values());

// Merge and deduplicate events
const allEventsRaw = [...baseEvents, ...eventsExpanded, ...eventsPhase2];
const eventMap = new Map();
allEventsRaw.forEach(event => {
  eventMap.set(event.id, event);
});
const events = Array.from(eventMap.values());

// Merge relationships with additional ones from index.js
const additionalRelationships = [
  // 족장 시대 관계
  { source: 'seth', target: 'adam', type: 'child' },
  { source: 'enosh', target: 'seth', type: 'child' },
  { source: 'enoch', target: 'jared', type: 'child' },
  { source: 'methuselah', target: 'enoch', type: 'child' },
  { source: 'lamech_noah', target: 'methuselah', type: 'child' },
  { source: 'noah', target: 'lamech_noah', type: 'child' },
  { source: 'shem', target: 'noah', type: 'child' },
  { source: 'ham', target: 'noah', type: 'child' },
  { source: 'japheth', target: 'noah', type: 'child' },
  { source: 'nimrod', target: 'ham', type: 'descendant' },
  { source: 'terah', target: 'shem', type: 'descendant' },
  { source: 'abraham', target: 'terah', type: 'child' },
  { source: 'nahor', target: 'terah', type: 'child' },
  { source: 'haran_person', target: 'terah', type: 'child' },
  { source: 'lot', target: 'haran_person', type: 'child' },
  { source: 'sarah', target: 'abraham', type: 'spouse' },
  { source: 'hagar', target: 'abraham', type: 'concubine' },
  { source: 'ishmael', target: 'abraham', type: 'child' },
  { source: 'ishmael', target: 'hagar', type: 'child' },
  { source: 'isaac', target: 'abraham', type: 'child' },
  { source: 'isaac', target: 'sarah', type: 'child' },
  { source: 'rebekah', target: 'isaac', type: 'spouse' },
  { source: 'rebekah', target: 'bethuel', type: 'child' },
  { source: 'laban', target: 'bethuel', type: 'child' },
  { source: 'jacob', target: 'isaac', type: 'child' },
  { source: 'jacob', target: 'rebekah', type: 'child' },
  { source: 'esau', target: 'isaac', type: 'child' },
  { source: 'leah', target: 'jacob', type: 'spouse' },
  { source: 'rachel', target: 'jacob', type: 'spouse' },
  { source: 'leah', target: 'laban', type: 'child' },
  { source: 'rachel', target: 'laban', type: 'child' },
  { source: 'reuben', target: 'jacob', type: 'child' },
  { source: 'reuben', target: 'leah', type: 'child' },
  { source: 'simeon', target: 'jacob', type: 'child' },
  { source: 'levi', target: 'jacob', type: 'child' },
  { source: 'judah', target: 'jacob', type: 'child' },
  { source: 'dan', target: 'jacob', type: 'child' },
  { source: 'naphtali', target: 'jacob', type: 'child' },
  { source: 'gad', target: 'jacob', type: 'child' },
  { source: 'asher', target: 'jacob', type: 'child' },
  { source: 'issachar', target: 'jacob', type: 'child' },
  { source: 'zebulun', target: 'jacob', type: 'child' },
  { source: 'joseph', target: 'jacob', type: 'child' },
  { source: 'joseph', target: 'rachel', type: 'child' },
  { source: 'benjamin', target: 'jacob', type: 'child' },
  { source: 'benjamin', target: 'rachel', type: 'child' },
  { source: 'dinah', target: 'jacob', type: 'child' },
  { source: 'tamar_judah', target: 'judah', type: 'in_law' },
  { source: 'perez', target: 'judah', type: 'child' },
  { source: 'perez', target: 'tamar_judah', type: 'child' },
  { source: 'manasseh', target: 'joseph', type: 'child' },
  { source: 'ephraim', target: 'joseph', type: 'child' },
  // 출애굽 시대 관계
  { source: 'amram', target: 'levi', type: 'descendant' },
  { source: 'jochebed', target: 'amram', type: 'spouse' },
  { source: 'moses', target: 'amram', type: 'child' },
  { source: 'moses', target: 'jochebed', type: 'child' },
  { source: 'aaron', target: 'amram', type: 'child' },
  { source: 'miriam', target: 'amram', type: 'child' },
  { source: 'moses', target: 'aaron', type: 'sibling' },
  { source: 'moses', target: 'miriam', type: 'sibling' },
  { source: 'zipporah', target: 'moses', type: 'spouse' },
  { source: 'zipporah', target: 'jethro', type: 'child' },
  { source: 'gershom', target: 'moses', type: 'child' },
  { source: 'eliezer_moses', target: 'moses', type: 'child' },
  { source: 'nadab', target: 'aaron', type: 'child' },
  { source: 'abihu', target: 'aaron', type: 'child' },
  { source: 'eleazar', target: 'aaron', type: 'child' },
  { source: 'ithamar', target: 'aaron', type: 'child' },
  { source: 'phinehas', target: 'eleazar', type: 'child' },
  { source: 'joshua', target: 'moses', type: 'successor' },
  { source: 'caleb', target: 'joshua', type: 'ally' },
];

const expandedRelationships = [
  ...baseRelationships,
  ...relationshipsExpanded,
  ...additionalRelationships
];

// Deduplicate relationships
const relationshipSet = new Set();
const relationships = expandedRelationships.filter(rel => {
  const key = `${rel.source}-${rel.target}-${rel.type}`;
  if (relationshipSet.has(key)) return false;
  relationshipSet.add(key);
  return true;
});

// Regions data
const regions = [
  { id: 'eden', name_ko: '에덴', name_en: 'Eden', color: '#2d5016' },
  { id: 'mesopotamia', name_ko: '메소포타미아', name_en: 'Mesopotamia', color: '#8B4513' },
  { id: 'canaan', name_ko: '가나안', name_en: 'Canaan', color: '#DAA520' },
  { id: 'egypt', name_ko: '이집트', name_en: 'Egypt', color: '#C19A6B' },
  { id: 'sinai', name_ko: '시내 광야', name_en: 'Sinai', color: '#D2691E' },
  { id: 'israel', name_ko: '이스라엘', name_en: 'Israel', color: '#4169E1' },
  { id: 'judah', name_ko: '유다', name_en: 'Judah', color: '#9932CC' },
  { id: 'babylon', name_ko: '바벨론', name_en: 'Babylon', color: '#8B0000' },
  { id: 'persia', name_ko: '페르시아', name_en: 'Persia', color: '#FF8C00' },
  { id: 'galilee', name_ko: '갈릴리', name_en: 'Galilee', color: '#20B2AA' },
  { id: 'jerusalem', name_ko: '예루살렘', name_en: 'Jerusalem', color: '#FFD700' },
  { id: 'rome', name_ko: '로마', name_en: 'Rome', color: '#DC143C' },
  { id: 'asia_minor', name_ko: '소아시아', name_en: 'Asia Minor', color: '#9370DB' }
];

// Write JSON files
console.log('Writing characters.json...');
writeFileSync(join(outputDir, 'characters.json'), JSON.stringify(allCharacters, null, 2), 'utf-8');
console.log(`  - ${allCharacters.length} characters`);

console.log('Writing relationships.json...');
writeFileSync(join(outputDir, 'relationships.json'), JSON.stringify({
  relationships,
  relationshipColors
}, null, 2), 'utf-8');
console.log(`  - ${relationships.length} relationships`);

console.log('Writing events.json...');
writeFileSync(join(outputDir, 'events.json'), JSON.stringify({
  events,
  eras
}, null, 2), 'utf-8');
console.log(`  - ${events.length} events, ${eras.length} eras`);

console.log('Writing books.json...');
writeFileSync(join(outputDir, 'books.json'), JSON.stringify({
  bibleBooks,
  allBooks
}, null, 2), 'utf-8');

console.log('Writing hymns.json...');
writeFileSync(join(outputDir, 'hymns.json'), JSON.stringify(hymns, null, 2), 'utf-8');
console.log(`  - ${hymns.length} hymns`);

console.log('Writing locations.json...');
writeFileSync(join(outputDir, 'locations.json'), JSON.stringify({
  locations,
  regions,
  locationTypeIcons
}, null, 2), 'utf-8');
console.log(`  - ${locations.length} locations`);

// Copy bible.json (it's already JSON)
console.log('Copying bible.json...');
copyFileSync(join(dataDir, 'bible.json'), join(outputDir, 'bible.json'));

console.log('\nDone! All data files have been converted to JSON.');
