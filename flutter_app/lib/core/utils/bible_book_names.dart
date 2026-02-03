/// Bible book name translations (Korean to English)
class BibleBookNames {
  static const Map<String, String> koToEn = {
    '창세기': 'Genesis',
    '출애굽기': 'Exodus',
    '레위기': 'Leviticus',
    '민수기': 'Numbers',
    '신명기': 'Deuteronomy',
    '여호수아': 'Joshua',
    '사사기': 'Judges',
    '룻기': 'Ruth',
    '사무엘상': '1 Samuel',
    '사무엘하': '2 Samuel',
    '열왕기상': '1 Kings',
    '열왕기하': '2 Kings',
    '역대상': '1 Chronicles',
    '역대하': '2 Chronicles',
    '에스라': 'Ezra',
    '느헤미야': 'Nehemiah',
    '에스더': 'Esther',
    '욥기': 'Job',
    '시편': 'Psalms',
    '잠언': 'Proverbs',
    '전도서': 'Ecclesiastes',
    '아가': 'Song of Solomon',
    '이사야': 'Isaiah',
    '예레미야': 'Jeremiah',
    '예레미야애가': 'Lamentations',
    '에스겔': 'Ezekiel',
    '다니엘': 'Daniel',
    '호세아': 'Hosea',
    '요엘': 'Joel',
    '아모스': 'Amos',
    '오바댜': 'Obadiah',
    '요나': 'Jonah',
    '미가': 'Micah',
    '나훔': 'Nahum',
    '하박국': 'Habakkuk',
    '스바냐': 'Zephaniah',
    '학개': 'Haggai',
    '스가랴': 'Zechariah',
    '말라기': 'Malachi',
    '마태복음': 'Matthew',
    '마가복음': 'Mark',
    '누가복음': 'Luke',
    '요한복음': 'John',
    '사도행전': 'Acts',
    '로마서': 'Romans',
    '고린도전서': '1 Corinthians',
    '고린도후서': '2 Corinthians',
    '갈라디아서': 'Galatians',
    '에베소서': 'Ephesians',
    '빌립보서': 'Philippians',
    '골로새서': 'Colossians',
    '데살로니가전서': '1 Thessalonians',
    '데살로니가후서': '2 Thessalonians',
    '디모데전서': '1 Timothy',
    '디모데후서': '2 Timothy',
    '디도서': 'Titus',
    '빌레몬서': 'Philemon',
    '히브리서': 'Hebrews',
    '야고보서': 'James',
    '베드로전서': '1 Peter',
    '베드로후서': '2 Peter',
    '요한일서': '1 John',
    '요한이서': '2 John',
    '요한삼서': '3 John',
    '유다서': 'Jude',
    '요한계시록': 'Revelation',
  };

  /// Translate verse reference from Korean to English
  /// e.g., "창세기 1:1" -> "Genesis 1:1"
  static String translateRef(String ref, String lang) {
    if (lang == 'ko') return ref;

    // Find and replace Korean book name with English
    for (final entry in koToEn.entries) {
      if (ref.startsWith(entry.key)) {
        return ref.replaceFirst(entry.key, entry.value);
      }
    }
    return ref;
  }

  /// Book ID mapping (Korean name -> API book ID)
  static const Map<String, String> koToBookId = {
    '창세기': 'GEN', '출애굽기': 'EXO', '레위기': 'LEV', '민수기': 'NUM',
    '신명기': 'DEU', '여호수아': 'JOS', '사사기': 'JDG', '룻기': 'RUT',
    '사무엘상': '1SA', '사무엘하': '2SA', '열왕기상': '1KI', '열왕기하': '2KI',
    '역대상': '1CH', '역대하': '2CH', '에스라': 'EZR', '느헤미야': 'NEH',
    '에스더': 'EST', '욥기': 'JOB', '시편': 'PSA', '잠언': 'PRO',
    '전도서': 'ECC', '아가': 'SNG', '이사야': 'ISA', '예레미야': 'JER',
    '예레미야애가': 'LAM', '에스겔': 'EZK', '다니엘': 'DAN', '호세아': 'HOS',
    '요엘': 'JOL', '아모스': 'AMO', '오바댜': 'OBA', '요나': 'JON',
    '미가': 'MIC', '나훔': 'NAM', '하박국': 'HAB', '스바냐': 'ZEP',
    '학개': 'HAG', '스가랴': 'ZEC', '말라기': 'MAL',
    '마태복음': 'MAT', '마가복음': 'MRK', '누가복음': 'LUK', '요한복음': 'JHN',
    '사도행전': 'ACT', '로마서': 'ROM', '고린도전서': '1CO', '고린도후서': '2CO',
    '갈라디아서': 'GAL', '에베소서': 'EPH', '빌립보서': 'PHP', '골로새서': 'COL',
    '데살로니가전서': '1TH', '데살로니가후서': '2TH', '디모데전서': '1TI',
    '디모데후서': '2TI', '디도서': 'TIT', '빌레몬서': 'PHM', '히브리서': 'HEB',
    '야고보서': 'JAS', '베드로전서': '1PE', '베드로후서': '2PE',
    '요한일서': '1JN', '요한이서': '2JN', '요한삼서': '3JN',
    '유다서': 'JUD', '요한계시록': 'REV',
  };

  /// Total chapters per book
  static const Map<String, int> bookChapters = {
    'GEN': 50, 'EXO': 40, 'LEV': 27, 'NUM': 36, 'DEU': 34,
    'JOS': 24, 'JDG': 21, 'RUT': 4, '1SA': 31, '2SA': 24,
    '1KI': 22, '2KI': 25, '1CH': 29, '2CH': 36, 'EZR': 10,
    'NEH': 13, 'EST': 10, 'JOB': 42, 'PSA': 150, 'PRO': 31,
    'ECC': 12, 'SNG': 8, 'ISA': 66, 'JER': 52, 'LAM': 5,
    'EZK': 48, 'DAN': 12, 'HOS': 14, 'JOL': 3, 'AMO': 9,
    'OBA': 1, 'JON': 4, 'MIC': 7, 'NAM': 3, 'HAB': 3,
    'ZEP': 3, 'HAG': 2, 'ZEC': 14, 'MAL': 4,
    'MAT': 28, 'MRK': 16, 'LUK': 24, 'JHN': 21, 'ACT': 28,
    'ROM': 16, '1CO': 16, '2CO': 13, 'GAL': 6, 'EPH': 6,
    'PHP': 4, 'COL': 4, '1TH': 5, '2TH': 3, '1TI': 6,
    '2TI': 4, 'TIT': 3, 'PHM': 1, 'HEB': 13, 'JAS': 5,
    '1PE': 5, '2PE': 3, '1JN': 5, '2JN': 1, '3JN': 1,
    'JUD': 1, 'REV': 22,
  };

  /// Parse verse reference and return (bookId, bookName, chapter, verse)
  /// e.g., "창세기 1:1" -> ('GEN', '창세기', 1, 1)
  static ({String? bookId, String? bookName, int chapter, int? verse, int totalChapters}) parseRef(String ref) {
    for (final entry in koToBookId.entries) {
      if (ref.startsWith(entry.key)) {
        final remaining = ref.substring(entry.key.length).trim();
        final bookId = entry.value;
        final totalChapters = bookChapters[bookId] ?? 1;

        // Parse chapter:verse
        final match = RegExp(r'(\d+)(?::(\d+))?').firstMatch(remaining);
        if (match != null) {
          final chapter = int.tryParse(match.group(1) ?? '1') ?? 1;
          final verse = match.group(2) != null ? int.tryParse(match.group(2)!) : null;
          return (
            bookId: bookId,
            bookName: entry.key,
            chapter: chapter,
            verse: verse,
            totalChapters: totalChapters,
          );
        }

        return (bookId: bookId, bookName: entry.key, chapter: 1, verse: null, totalChapters: totalChapters);
      }
    }
    return (bookId: null, bookName: null, chapter: 1, verse: null, totalChapters: 1);
  }
}
