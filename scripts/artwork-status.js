// Check artwork status for all characters and events
const {characterArtwork, eventArtwork} = require('../frontend/src/data/artwork.js');
const artworkGenerated = require('../frontend/src/data/artwork.generated.json');
const {allCharacters: characters, events} = require('../frontend/src/data/index.js');

const normalizeArtworkEntry = (entry) => {
  if (!entry) return [];
  if (Array.isArray(entry)) return entry;
  return [entry];
};

const mergeArtworkMaps = (manual, generated) => {
  const merged = { ...(generated || {}) };
  Object.entries(manual || {}).forEach(([id, entry]) => {
    const manualList = normalizeArtworkEntry(entry);
    const existingList = normalizeArtworkEntry(merged[id]);
    const combined = [...manualList, ...existingList];
    const seen = new Set();
    const unique = [];
    combined.forEach((item) => {
      if (!item || !item.url || seen.has(item.url)) return;
      seen.add(item.url);
      unique.push(item);
    });
    if (unique.length) {
      merged[id] = unique;
    }
  });
  return merged;
};

const generatedCharacterArtwork = artworkGenerated.characterArtwork || {};
const generatedEventArtwork = artworkGenerated.eventArtwork || {};
const characterArtworkAll = mergeArtworkMaps(characterArtwork, generatedCharacterArtwork);
const eventArtworkAll = mergeArtworkMaps(eventArtwork, generatedEventArtwork);

// Check characters
console.log('========================================');
console.log('인물 아트워크 현황 (Characters)');
console.log('========================================\n');

const charsWithArt = [];
const charsWithoutArt = [];

characters.forEach(char => {
  const art = characterArtworkAll[char.id];
  if (art && art.length > 0) {
    charsWithArt.push({
      id: char.id,
      name: char.name_ko,
      title: art[0].title?.substring(0, 40) || 'untitled',
      year: art[0].year || '?'
    });
  } else {
    charsWithoutArt.push({
      id: char.id,
      name: char.name_ko
    });
  }
});

console.log(`✓ 아트워크 있음: ${charsWithArt.length}명`);
console.log('─'.repeat(50));
charsWithArt.forEach(c => {
  console.log(`  ${c.name} (${c.id}): ${c.title} (${c.year})`);
});

console.log(`\n✗ 아트워크 없음: ${charsWithoutArt.length}명`);
console.log('─'.repeat(50));
charsWithoutArt.forEach(c => {
  console.log(`  ${c.name} (${c.id})`);
});

// Check events
console.log('\n\n========================================');
console.log('사건 아트워크 현황 (Events)');
console.log('========================================\n');

const eventsWithArt = [];
const eventsWithoutArt = [];

events.forEach(evt => {
  const art = eventArtworkAll[evt.id];
  if (art && art.length > 0) {
    eventsWithArt.push({
      id: evt.id,
      name: evt.name_ko,
      title: art[0].title?.substring(0, 40) || 'untitled',
      year: art[0].year || '?'
    });
  } else {
    eventsWithoutArt.push({
      id: evt.id,
      name: evt.name_ko
    });
  }
});

console.log(`✓ 아트워크 있음: ${eventsWithArt.length}개`);
console.log('─'.repeat(50));
eventsWithArt.forEach(e => {
  console.log(`  ${e.name} (${e.id}): ${e.title} (${e.year})`);
});

console.log(`\n✗ 아트워크 없음: ${eventsWithoutArt.length}개`);
console.log('─'.repeat(50));
eventsWithoutArt.forEach(e => {
  console.log(`  ${e.name} (${e.id})`);
});

// Summary
console.log('\n\n========================================');
console.log('요약 (Summary)');
console.log('========================================');
console.log(`인물: ${charsWithArt.length}/${characters.length} (${Math.round(charsWithArt.length/characters.length*100)}%)`);
console.log(`사건: ${eventsWithArt.length}/${events.length} (${Math.round(eventsWithArt.length/events.length*100)}%)`);
