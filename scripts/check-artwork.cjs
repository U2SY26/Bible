const {characterArtwork} = require('../frontend/src/data/artwork.js');
const {missingCharacterArtwork} = require('../frontend/src/data/artwork-missing.js');
const artworkGenerated = require('../frontend/src/data/artwork.generated.json');
const {allCharacters} = require('../frontend/src/data/index.js');

const normalizeArtworkEntry = (entry) => {
  if (!entry) return [];
  return Array.isArray(entry) ? entry.filter(Boolean) : [entry];
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

const pickPrimaryArtwork = (entry) => normalizeArtworkEntry(entry)[0] || null;

const mapArtworkUrls = (artworkMap) => {
  const urls = {};
  Object.entries(artworkMap || {}).forEach(([id, entry]) => {
    const primary = pickPrimaryArtwork(entry);
    if (primary?.url) urls[id] = primary.url;
  });
  return urls;
};

const generatedCharacterArtwork = artworkGenerated.characterArtwork || {};
const characterArtworkMerged = mergeArtworkMaps(characterArtwork, missingCharacterArtwork);
const characterArtworkAll = mergeArtworkMaps(characterArtworkMerged, generatedCharacterArtwork);
const characterArtworkUrls = mapArtworkUrls(characterArtworkAll);

console.log('Total characters:', allCharacters.length);
console.log('Artwork URLs:', Object.keys(characterArtworkUrls).length);

const noArtwork = allCharacters.filter(c => !characterArtworkUrls[c.id]);
console.log('\nCharacters WITHOUT artwork:', noArtwork.length);
noArtwork.forEach(c => console.log('-', c.id, ':', c.name_ko));

// Check by era
const byEra = {};
allCharacters.forEach(c => {
  const era = c.era || 'unknown';
  if (!byEra[era]) byEra[era] = { total: 0, hasArt: 0, sample: [] };
  byEra[era].total++;
  if (characterArtworkUrls[c.id]) {
    byEra[era].hasArt++;
  } else if (byEra[era].sample.length < 3) {
    byEra[era].sample.push(c.name_ko);
  }
});

console.log('\n=== By Era ===');
Object.entries(byEra).forEach(([era, data]) => {
  console.log(era + ':', data.hasArt + '/' + data.total, data.sample.length ? '(missing: ' + data.sample.join(', ') + ')' : '');
});

// Test a sample URL
console.log('\n=== Sample URL Test ===');
const testIds = ['moses', 'david', 'elijah', 'isaiah'];
testIds.forEach(id => {
  const url = characterArtworkUrls[id];
  console.log(id + ':', url ? url.substring(0, 60) + '...' : 'NO URL');
});
