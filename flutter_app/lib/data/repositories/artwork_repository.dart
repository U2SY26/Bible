import 'dart:convert';
import 'package:flutter/services.dart';
import '../models/artwork.dart';

class ArtworkRepository {
  Map<String, List<Artwork>>? _characterArtwork;

  // Characters that should not display artwork
  static const Set<String> _excludedCharacters = {
    'god',
    'holy_spirit',
  };

  // Keywords in titles that indicate irrelevant images
  static const List<String> _irrelevantTitleKeywords = [
    // Modern people/professions
    'inventor', 'politician', 'footballer', 'singer', 'actor', 'actress',
    'musician', 'athlete', 'businessman', 'president', 'governor', 'mayor',
    'senator', 'congressman', 'lawyer', 'doctor', 'professor', 'engineer',
    'writer', 'author', 'poet', 'journalist', 'photographer',
    'metropolitan', 'bishop', 'cardinal',
    // Photo descriptions
    'photograph of', 'photo of', 'portrait of a', 'picture of',
    'daguerreotype', 'tintype', 'albumen', 'carte de visite',
    // Self-portraits (not of biblical characters)
    'self-portrait', 'self portrait', 'selfportrait',
    // Modern surnames that appear with biblical names
    'Beach', 'Bigelow', 'Smith', 'Jones', 'Williams', 'Brown', 'Davis',
    'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson',
    'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson',
    'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young',
    'Hernandez', 'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams',
    'Baker', 'Gonzalez', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts',
    'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins',
    'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan',
    // Historical figures that share names with biblical characters
    'Doubleday', 'Franklin', 'Welch', 'Peck', 'Halperin', 'McKinnon',
    'Heilemann', 'Paffhausen', 'Jay', 'Sargent', 'Washington',
    // Non-biblical subjects
    'Pocahontas', 'passenger pigeon', 'pigeon',
    // Egyptian/pagan imagery
    'Nefertari', 'Egyptian', 'pharaoh', 'pyramid', 'hieroglyph', 'sphinx',
    'mummy', 'tomb of', 'sarcophagus',
    // Architecture (not biblical art)
    'Cathedrale', 'Cathedral', 'church building', 'facade', 'interior of',
    'exterior of', 'Notre-Dame', 'basilica', 'chapel', 'monastery', 'abbey',
    'Church in', 'Church of',
    // Maps and diagrams
    'map of', 'diagram', 'chart', 'plan of', 'layout', 'anatomy',
    // Modern items
    'stamp', 'coin', 'medal', 'flag', 'logo', 'emblem', 'badge', 'seal',
    'banknote', 'currency', 'postage',
    // Stock/modern media
    'stock', 'shutterstock', 'getty', 'istock', 'alamy',
    // File/technical descriptions
    '.jpg', '.png', '.gif', 'scan of', 'copy of', 'reproduction',
    // Location photos (not art)
    'view of', 'aerial view', 'panorama', 'landscape of',
    // Unrelated subjects
    'God Speed', 'speed', 'race', 'competition', 'game', 'match',
    'farce', 'Gassed', 'war scene', 'battle of',
    // US locations/people
    'American', 'United States', 'U.S.', 'USA', 'New York',
    // Museum collection metadata
    'COLLECTIE TROPENMUSEUM', 'TROPENMUSEUM',
    // Window/stained glass photos (modern photos of church windows)
    'Window s.', 'stained glass window',
    // Fleuron (printer's decorations)
    'Fleuron',
  ];

  // Patterns that indicate modern person photos
  static final List<RegExp> _modernNamePatterns = [
    // "FirstName I. LastName" pattern (middle initial)
    RegExp(r'^[A-Z][a-z]+ [A-Z]\. [A-Z][a-z]+'),
    // "FirstNameLastName" CamelCase pattern (e.g., "AbijahBigelow")
    RegExp(r'^[A-Z][a-z]+[A-Z][a-z]+\d*$'),
    // Just a modern last name as title
    RegExp(r'^[A-Z][a-z]{2,}$'),
    // "Name Name number" pattern (e.g., "Adonijah Welch 2")
    RegExp(r'^[A-Z][a-z]+ [A-Z][a-z]+ \d'),
    // "Portrait of [Name]" with capitalized name (not "portrait of a")
    RegExp(r'Portrait of [A-Z][a-z]+ [A-Z][a-z]+'),
    // "Name-Name" hyphenated modern names
    RegExp(r'Weaver-|Chambers '),
    // Empty or corrupted titles
    RegExp(r'^\(\)$'),
  ];

  // Artist names/descriptions that indicate irrelevant images
  static const List<String> _irrelevantArtistKeywords = [
    'Unknown', 'anonymous', 'stock', 'photographer', 'No photographer',
    'unidentified', 'uncredited',
    'Bureau of Engraving', 'Banknote Company',
    'Anatomy of the Human', 'Wellcome',
    'Jules & Jenny',
  ];

  // Preferred classical artists (biblical art specialists)
  static const List<String> _preferredArtists = [
    'Gustave Dore', 'Doré', 'Rembrandt', 'Michelangelo', 'Raphael',
    'Caravaggio', 'Rubens', 'Tissot', 'Julius Schnorr', 'William Blake',
    'Peter Paul Rubens', 'Nicolas Poussin', 'Albrecht Dürer', 'El Greco',
    'Giotto', 'Fra Angelico', 'Botticelli', 'Tintoretto', 'Veronese',
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
          if (_excludedCharacters.contains(entry.key)) continue;

          final allArtworks = (entry.value as List<dynamic>)
              .map((e) => Artwork.fromJson(e as Map<String, dynamic>))
              .where(_isRelevantArtwork)
              .toList();

          // Sort by preference (preferred artists first, then by year)
          allArtworks.sort((a, b) {
            final aPreferred = _isPreferredArtist(a.artist);
            final bPreferred = _isPreferredArtist(b.artist);
            if (aPreferred && !bPreferred) return -1;
            if (!aPreferred && bPreferred) return 1;

            // Older classical art is usually better
            final aYear = int.tryParse(a.year) ?? 1800;
            final bYear = int.tryParse(b.year) ?? 1800;
            // Prefer 1400-1900 range (classical period)
            final aScore = _getYearScore(aYear);
            final bScore = _getYearScore(bYear);
            return bScore.compareTo(aScore);
          });

          final artworkList = allArtworks.take(3).toList();

          if (artworkList.isNotEmpty) {
            _characterArtwork![entry.key] = artworkList;
          }
        }
      }
    } catch (e) {
      _characterArtwork = {};
    }
  }

  bool _isPreferredArtist(String artist) {
    final artistLower = artist.toLowerCase();
    return _preferredArtists.any((p) => artistLower.contains(p.toLowerCase()));
  }

  int _getYearScore(int year) {
    // Best: 1400-1700 (Renaissance/Baroque biblical art)
    if (year >= 1400 && year <= 1700) return 100;
    // Good: 1700-1900 (Classical period)
    if (year >= 1700 && year <= 1900) return 80;
    // OK: 1200-1400 (Medieval)
    if (year >= 1200 && year < 1400) return 60;
    // Less preferred: early 1900s
    if (year > 1900 && year <= 1950) return 40;
    // Not preferred: after 1950
    return 20;
  }

  bool _isRelevantArtwork(Artwork artwork) {
    // Check URL validity
    if (artwork.url.isEmpty || !artwork.url.startsWith('http')) {
      return false;
    }

    final title = artwork.title.trim();
    final titleLower = title.toLowerCase();

    // Skip empty or very short titles (likely corrupted data)
    if (title.length < 3 || title == '()') {
      return false;
    }

    // Skip if artist field is suspiciously long (likely garbage metadata)
    if (artwork.artist.length > 200) {
      return false;
    }

    // Check for modern name patterns (indicates modern person photo)
    for (final pattern in _modernNamePatterns) {
      if (pattern.hasMatch(title)) {
        return false;
      }
    }

    // Check title keywords
    for (final keyword in _irrelevantTitleKeywords) {
      if (titleLower.contains(keyword.toLowerCase())) {
        return false;
      }
    }

    // Check artist keywords
    final artistLower = artwork.artist.toLowerCase();
    for (final keyword in _irrelevantArtistKeywords) {
      if (artistLower.contains(keyword.toLowerCase())) {
        return false;
      }
    }

    // Filter by year - skip photos (usually after 1900 with certain patterns)
    if (artwork.year.isNotEmpty) {
      final year = int.tryParse(artwork.year);
      if (year != null) {
        // Skip anything after 1950
        if (year > 1950) return false;

        // For 1900-1950, check if it looks like a photo scan
        if (year > 1900) {
          // Allow if it's clearly classical art (Tissot, Dore reproductions, etc.)
          if (!_isPreferredArtist(artwork.artist)) {
            // Check if title suggests it's a painting/art
            final artKeywords = ['painting', 'fresco', 'engraving', 'illustration',
              'drawing', 'sketch', 'woodcut', 'lithograph', 'etching'];
            final hasArtKeyword = artKeywords.any((k) => titleLower.contains(k));
            if (!hasArtKeyword) {
              return false;
            }
          }
        }
      }
    }

    // Check if URL looks valid (Wikipedia Commons preferred)
    if (!artwork.url.contains('wikimedia') &&
        !artwork.url.contains('wikipedia') &&
        !artwork.url.contains('museum')) {
      // Non-wiki sources are less reliable, but allow if other checks pass
    }

    return true;
  }

  Future<List<Artwork>> getArtworkByCharacter(String characterId) async {
    await _loadData();

    if (_excludedCharacters.contains(characterId)) {
      return [];
    }

    return _characterArtwork?[characterId] ?? [];
  }
}
