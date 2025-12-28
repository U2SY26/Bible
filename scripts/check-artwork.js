// Check merged artwork URLs
const {characterArtwork} = require('../frontend/src/data/artwork.js');
const artworkGenerated = require('../frontend/src/data/artwork.generated.json');

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
const characterArtworkAll = mergeArtworkMaps(characterArtwork, generatedCharacterArtwork);

// Get all character IDs from characters.js
const {characters} = require('../frontend/src/data/characters.js');
const allCharIds = characters.map(c => c.id);

console.log('Total characters:', allCharIds.length);
console.log('Characters with artwork:', Object.keys(characterArtworkAll).length);

// Find characters missing artwork
const missingArtwork = allCharIds.filter(id => {
  const art = characterArtworkAll[id];
  return !art || art.length === 0;
});

console.log('\nCharacters MISSING artwork (' + missingArtwork.length + '):');
missingArtwork.forEach(id => {
  const char = characters.find(c => c.id === id);
  console.log('  - ' + id + ' (' + (char ? char.name_ko : 'unknown') + ')');
});

// Check specific important characters
console.log('\n=== Key characters artwork status ===');
const keyChars = ['god', 'jesus', 'holy_spirit', 'adam', 'eve', 'noah', 'abraham', 'sarah', 'moses', 'david', 'solomon', 'elijah', 'daniel', 'mary', 'peter', 'paul'];
keyChars.forEach(id => {
  const art = characterArtworkAll[id];
  if (art && art.length > 0) {
    console.log('OK ' + id + ': ' + art[0].title.substring(0, 50));
  } else {
    console.log('MISSING ' + id);
  }
});
