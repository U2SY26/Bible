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
    'Sundback', // Gideon Sundback (inventor, not biblical)
    'Nefertari', // Egyptian goddess
    'God Speed', // Medieval painting unrelated to God
    'Cathedrale', // Cathedral photos
    'Cathedral',
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

  /// Filter out irrelevant artworks based on title keywords
  bool _isRelevantArtwork(Artwork artwork) {
    final titleLower = artwork.title.toLowerCase();
    for (final keyword in _irrelevantTitleKeywords) {
      if (titleLower.contains(keyword.toLowerCase())) {
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
