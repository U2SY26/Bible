import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import '../data/models/bible_book.dart';

/// Service to fetch English Bible text from bible-api.com
/// Uses KJV (King James Version) which is public domain
class EnglishBibleService {
  static final EnglishBibleService _instance = EnglishBibleService._internal();
  factory EnglishBibleService() => _instance;
  EnglishBibleService._internal();

  // Cache for fetched chapters
  final Map<String, BibleChapter> _cache = {};

  // Book ID to English name mapping for API calls
  static const Map<String, String> _bookIdToApiName = {
    'gen': 'genesis', 'exo': 'exodus', 'lev': 'leviticus', 'num': 'numbers',
    'deu': 'deuteronomy', 'jos': 'joshua', 'jdg': 'judges', 'rut': 'ruth',
    '1sa': '1samuel', '2sa': '2samuel', '1ki': '1kings', '2ki': '2kings',
    '1ch': '1chronicles', '2ch': '2chronicles', 'ezr': 'ezra', 'neh': 'nehemiah',
    'est': 'esther', 'job': 'job', 'psa': 'psalms', 'pro': 'proverbs',
    'ecc': 'ecclesiastes', 'sng': 'songofsolomon', 'isa': 'isaiah', 'jer': 'jeremiah',
    'lam': 'lamentations', 'ezk': 'ezekiel', 'dan': 'daniel', 'hos': 'hosea',
    'jol': 'joel', 'amo': 'amos', 'oba': 'obadiah', 'jon': 'jonah',
    'mic': 'micah', 'nam': 'nahum', 'hab': 'habakkuk', 'zep': 'zephaniah',
    'hag': 'haggai', 'zec': 'zechariah', 'mal': 'malachi',
    // New Testament
    'mat': 'matthew', 'mrk': 'mark', 'luk': 'luke', 'jhn': 'john',
    'act': 'acts', 'rom': 'romans', '1co': '1corinthians', '2co': '2corinthians',
    'gal': 'galatians', 'eph': 'ephesians', 'php': 'philippians', 'col': 'colossians',
    '1th': '1thessalonians', '2th': '2thessalonians', '1ti': '1timothy', '2ti': '2timothy',
    'tit': 'titus', 'phm': 'philemon', 'heb': 'hebrews', 'jas': 'james',
    '1pe': '1peter', '2pe': '2peter', '1jn': '1john', '2jn': '2john',
    '3jn': '3john', 'jud': 'jude', 'rev': 'revelation',
  };

  /// Get the API book name from our internal book ID
  String? _getApiBookName(String bookId) {
    return _bookIdToApiName[bookId.toLowerCase()];
  }

  /// Fetch a chapter from the API
  Future<BibleChapter?> getChapter(String bookId, int chapterNum) async {
    final cacheKey = '${bookId}_$chapterNum';

    // Check cache first
    if (_cache.containsKey(cacheKey)) {
      return _cache[cacheKey];
    }

    final apiBookName = _getApiBookName(bookId);
    if (apiBookName == null) {
      debugPrint('Unknown book ID: $bookId');
      return null;
    }

    try {
      // bible-api.com format: book+chapter
      final url = 'https://bible-api.com/$apiBookName+$chapterNum?translation=kjv';
      debugPrint('Fetching English Bible: $url');

      final response = await http.get(Uri.parse(url)).timeout(
        const Duration(seconds: 10),
        onTimeout: () => http.Response('Timeout', 408),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);

        // Parse verses from API response
        final versesData = data['verses'] as List<dynamic>?;
        if (versesData == null || versesData.isEmpty) {
          debugPrint('No verses found in response');
          return null;
        }

        final verses = versesData.map((v) {
          return BibleVerse(
            verse: v['verse'] as int,
            text: (v['text'] as String).trim(),
          );
        }).toList();

        final chapter = BibleChapter(
          chapter: chapterNum,
          verses: verses,
        );

        // Cache the result
        _cache[cacheKey] = chapter;
        return chapter;
      } else {
        debugPrint('API error: ${response.statusCode}');
        return null;
      }
    } catch (e) {
      debugPrint('Error fetching English Bible: $e');
      return null;
    }
  }

  /// Fetch a single verse
  Future<String?> getVerse(String bookId, int chapterNum, int verseNum) async {
    final chapter = await getChapter(bookId, chapterNum);
    if (chapter == null) return null;

    final verse = chapter.verses.where((v) => v.verse == verseNum).firstOrNull;
    return verse?.text;
  }

  /// Clear the cache
  void clearCache() {
    _cache.clear();
  }
}
