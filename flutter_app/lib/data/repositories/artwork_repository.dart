import 'dart:convert';
import 'package:flutter/services.dart';
import '../models/artwork.dart';

class ArtworkRepository {
  Map<String, List<Artwork>>? _characterArtwork;

  // Characters that should not display artwork
  // (either inappropriate or too generic to have relevant images)
  static const Set<String> _excludedCharacters = {
    'god', // Depicting God is theologically inappropriate
    'holy_spirit', // Same reason
  };

  // Keywords in titles that indicate irrelevant images
  static const List<String> _irrelevantTitleKeywords = [
    // Modern people with biblical names
    'Sundback', // Gideon Sundback (inventor)
    'inventor',
    'politician',
    'footballer',
    'singer',
    'actor',
    'actress',
    'musician',
    'athlete',
    'businessman',
    'photograph of',
    'photo of',
    'portrait of a',
    // Egyptian/pagan imagery
    'Nefertari',
    'Egyptian',
    'pharaoh',
    'pyramid',
    'hieroglyph',
    // Unrelated paintings
    'God Speed',
    'speed',
    // Architecture photos (not biblical art)
    'Cathedrale',
    'Cathedral',
    'church building',
    'facade',
    'interior of',
    'exterior of',
    // Maps and diagrams
    'map of',
    'diagram',
    'chart',
    // Modern items
    'stamp',
    'coin',
    'medal',
    'flag',
    'logo',
    'emblem',
    // Stock photos
    'stock',
    'shutterstock',
    'getty',
  ];

  // Artist names that indicate irrelevant images
  static const List<String> _irrelevantArtistKeywords = [
    'Unknown',
    'anonymous',
    'stock',
  ];

  Future<void> _loadData() async {
    if (_characterArtwork != null) return;

    try {
      final jsonString = await rootBundle.loadString('assets/data/artwork.json');
      final data = json.decode(jsonString) as Map<String, dynamic>;

      final characterArtworkMap = data['characterArtwork'] as Map<String, dynamic>?;
      _characterArtwork = {};

      if (characterArtworkMap != null) {
        for (final entry in characterArtworkMap.entries) {
          // Skip excluded characters
          if (_excludedCharacters.contains(entry.key)) continue;

          final artworkList = (entry.value as List<dynamic>)
              .map((e) => Artwork.fromJson(e as Map<String, dynamic>))
              .where(_isRelevantArtwork)
              .take(3) // Limit to 3 best artworks per character
              .toList();

          if (artworkList.isNotEmpty) {
            _characterArtwork![entry.key] = artworkList;
          }
        }
      }
    } catch (e) {
      _characterArtwork = {};
    }
  }

  /// Filter out irrelevant artworks based on title and artist keywords
  bool _isRelevantArtwork(Artwork artwork) {
    // Check URL validity
    if (artwork.url.isEmpty || !artwork.url.startsWith('http')) {
      return false;
    }

    // Check title keywords
    final titleLower = artwork.title.toLowerCase();
    for (final keyword in _irrelevantTitleKeywords) {
      if (titleLower.contains(keyword.toLowerCase())) {
        return false;
      }
    }

    // Prefer artworks with known artists (better quality)
    final artistLower = artwork.artist.toLowerCase();
    for (final keyword in _irrelevantArtistKeywords) {
      if (artistLower == keyword.toLowerCase()) {
        return false;
      }
    }

    // Prefer older artworks (classical biblical art)
    // Skip very recent photos (year > 1950)
    if (artwork.year.isNotEmpty) {
      final year = int.tryParse(artwork.year);
      if (year != null && year > 1950) {
        return false;
      }
    }

    return true;
  }

  Future<List<Artwork>> getArtworkByCharacter(String characterId) async {
    await _loadData();

    // Check if character is excluded
    if (_excludedCharacters.contains(characterId)) {
      return [];
    }

    return _characterArtwork?[characterId] ?? [];
  }
}
