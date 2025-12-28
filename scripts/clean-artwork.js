// Clean artwork.generated.json - remove modern photos, keep only classical/Renaissance artwork
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../frontend/src/data/artwork.generated.json');
const outputPath = inputPath;

// Load the data
const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

// Keywords that indicate modern/non-biblical images
const modernKeywords = [
  'swartz', 'kwok', 'navy', 'us navy', 'concert', 'profile', 'midshipman',
  'submarine', 'facebook', 'twitter', 'instagram', 'youtube', 'linkedin',
  'wikipedia user', 'screenshot', 'logo', 'icon', 'avatar', 'headshot',
  'selfie', 'photo by', 'photograph by', 'press', 'media', 'news',
  'actor', 'actress', 'singer', 'rapper', 'musician', 'band', 'pop',
  'rock', 'hip hop', 'jazz', 'movie', 'film', 'television', 'tv show',
  'red carpet', 'premiere', 'award', 'grammy', 'oscar', 'emmy',
  'basketball', 'football', 'soccer', 'baseball', 'nba', 'nfl', 'mlb',
  'politician', 'president', 'senator', 'congress', 'parliament',
  'ceo', 'businessman', 'entrepreneur', 'startup', 'silicon valley',
  'model', 'fashion', 'vogue', 'magazine', 'interview', 'podcast',
  'police', 'military', 'soldier', 'army', 'marine', 'air force',
  'advertisement', 'commercial', 'product', 'brand', 'company',
  'stadium', 'arena', 'venue', 'airport', 'highway', 'street',
  'in 2019', 'in 2020', 'in 2021', 'in 2022', 'in 2023', 'in 2024',
  'at the', 'during the', 'speaking at', 'attending',
];

// Keywords that indicate biblical/classical art
const biblicalKeywords = [
  'bible', 'biblical', 'painting', 'fresco', 'altar', 'altarpiece',
  'renaissance', 'baroque', 'medieval', 'illuminated', 'manuscript',
  'church', 'cathedral', 'chapel', 'basilica', 'temple',
  'testament', 'gospel', 'apostle', 'prophet', 'patriarch',
  'angel', 'cherub', 'seraph', 'madonna', 'virgin mary',
  'crucifixion', 'resurrection', 'nativity', 'annunciation',
  'last supper', 'baptism', 'transfiguration', 'ascension',
  'creation', 'genesis', 'exodus', 'revelation', 'apocalypse',
  'moses', 'abraham', 'david', 'solomon', 'noah', 'adam', 'eve',
  'jesus', 'christ', 'mary', 'joseph', 'peter', 'paul', 'john',
  'sistine', 'michelangelo', 'raphael', 'leonardo', 'caravaggio',
  'rembrandt', 'rubens', 'titian', 'durer', 'botticelli', 'giotto',
  'dore', 'gustave dore', 'tissot', 'james tissot',
  'engraving', 'woodcut', 'etching', 'lithograph',
  'icon', 'iconography', 'hagiography', 'saint', 'martyr',
  'museum', 'gallery', 'collection', 'art project',
  'louvre', 'uffizi', 'prado', 'hermitage', 'met', 'national gallery',
];

// Artists known for biblical art
const biblicalArtists = [
  'michelangelo', 'raphael', 'leonardo', 'caravaggio', 'rembrandt',
  'rubens', 'titian', 'durer', 'albrecht durer', 'botticelli', 'giotto',
  'gustave dore', 'james tissot', 'william blake', 'el greco',
  'murillo', 'veronese', 'tintoretto', 'poussin', 'bellini',
  'fra angelico', 'masaccio', 'perugino', 'ghirlandaio', 'pontormo',
  'cranach', 'lucas cranach', 'holbein', 'memling', 'van eyck',
  'bruegel', 'mantegna', 'correggio', 'veronese', 'tiepolo',
  'zurburan', 'ribera', 'velazquez', 'goya', 'david scott',
  'nuremberg chronicle', 'edward hicks', 'george watts',
  'william dyce', 'govert flinck', 'matthias stom', 'jan mostaert',
  'bernardino luini', 'peter paul rubens', 'giovanni bellini',
];

function isModernImage(item) {
  if (!item) return true;

  const title = (item.title || '').toLowerCase();
  const artist = (item.artist || '').toLowerCase();
  const year = parseInt(item.year) || 0;

  // Year check - images after 1920 are likely modern photos (allow some early 20th century art)
  if (year > 1920 && year < 2100) {
    // Exception: if it's clearly biblical art by title or artist
    const titleLower = title.toLowerCase();
    const artistLower = artist.toLowerCase();

    const isBiblicalByTitle = biblicalKeywords.some(kw => titleLower.includes(kw));
    const isBiblicalByArtist = biblicalArtists.some(a => artistLower.includes(a));

    if (!isBiblicalByTitle && !isBiblicalByArtist) {
      return true;
    }
  }

  // Check for modern keywords in title
  for (const kw of modernKeywords) {
    if (title.includes(kw)) {
      return true;
    }
  }

  // Check for obvious modern photo patterns
  if (title.match(/\d{4}-\d{2}-\d{2}/) || // Date pattern like 2020-01-15
      title.match(/IMG_\d+/) ||
      title.match(/DSC_\d+/) ||
      title.match(/DCIM/) ||
      title.includes('screenshot') ||
      title.includes('cropped')) {
    return true;
  }

  return false;
}

function isBiblicalArt(item) {
  if (!item) return false;

  const title = (item.title || '').toLowerCase();
  const artist = (item.artist || '').toLowerCase();
  const year = parseInt(item.year) || 0;

  // Strong indicators of biblical art
  const isBiblicalByTitle = biblicalKeywords.some(kw => title.includes(kw));
  const isBiblicalByArtist = biblicalArtists.some(a => artist.includes(a));
  const isOldEnough = year > 0 && year <= 1920;

  return isBiblicalByTitle || isBiblicalByArtist || isOldEnough;
}

function cleanArtwork(artworkMap) {
  const cleaned = {};
  let removedCount = 0;
  let keptCount = 0;

  for (const [characterId, artworks] of Object.entries(artworkMap)) {
    if (!Array.isArray(artworks)) continue;

    const filteredArtworks = artworks.filter(item => {
      // Keep if it's biblical art and not modern
      if (isModernImage(item)) {
        removedCount++;
        console.log(`Removed [${characterId}]: "${item.title}" (${item.year})`);
        return false;
      }

      if (isBiblicalArt(item)) {
        keptCount++;
        return true;
      }

      // If uncertain, check year
      const year = parseInt(item.year) || 0;
      if (year > 0 && year <= 1900) {
        keptCount++;
        return true;
      }

      // Default: remove if not clearly biblical
      removedCount++;
      console.log(`Removed (uncertain) [${characterId}]: "${item.title}" (${item.year})`);
      return false;
    });

    if (filteredArtworks.length > 0) {
      cleaned[characterId] = filteredArtworks;
    }
  }

  console.log(`\nSummary: Kept ${keptCount} images, removed ${removedCount} images`);
  return cleaned;
}

// Clean both character and event artwork
console.log('=== Cleaning Character Artwork ===\n');
const cleanedCharacters = cleanArtwork(data.characterArtwork || {});

console.log('\n=== Cleaning Event Artwork ===\n');
const cleanedEvents = cleanArtwork(data.eventArtwork || {});

// Save cleaned data
const cleanedData = {
  characterArtwork: cleanedCharacters,
  eventArtwork: cleanedEvents
};

fs.writeFileSync(outputPath, JSON.stringify(cleanedData, null, 2));
console.log(`\nCleaned artwork saved to ${outputPath}`);
