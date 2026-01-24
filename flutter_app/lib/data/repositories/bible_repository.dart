import 'package:collection/collection.dart';
import '../datasources/json_data_source.dart';
import '../models/bible_book.dart';

class BibleRepository {
  final JsonDataSource _dataSource;

  BibleRepository(this._dataSource);

  Future<List<BibleBook>> getAllBooks() async {
    final data = await _dataSource.loadBooks();
    return data.allBooks;
  }

  Future<BibleBook?> getBookById(String id) async {
    final books = await getAllBooks();
    return books.firstWhereOrNull((b) => b.id == id);
  }

  Future<List<BibleBook>> getBooksByTestament(String testament) async {
    final books = await getAllBooks();
    // OT categories: pentateuch, history, wisdom, major_prophets, minor_prophets
    // NT categories: gospels, history_nt, pauline, general, prophecy_nt
    final otCategories = [
      'pentateuch',
      'history',
      'wisdom',
      'major_prophets',
      'minor_prophets'
    ];
    final ntCategories = [
      'gospels',
      'history_nt',
      'pauline',
      'general',
      'prophecy_nt'
    ];

    if (testament == 'old') {
      return books.where((b) => otCategories.contains(b.category)).toList();
    } else if (testament == 'new') {
      return books.where((b) => ntCategories.contains(b.category)).toList();
    }
    return books;
  }

  Future<List<BibleBook>> getBooksByCategory(String category) async {
    final books = await getAllBooks();
    return books.where((b) => b.category == category).toList();
  }

  // Full Bible text operations
  Future<BibleData> getBibleData() async {
    return await _dataSource.loadBible();
  }

  Future<BibleBookFull?> getFullBook(String bookId) async {
    final bibleData = await getBibleData();
    return bibleData.books.firstWhereOrNull((b) => b.id == bookId);
  }

  Future<BibleChapter?> getChapter(String bookId, int chapterNum) async {
    final book = await getFullBook(bookId);
    if (book == null) return null;
    return book.chaptersList.firstWhereOrNull((c) => c.chapter == chapterNum);
  }

  Future<BibleVerse?> getVerse(
      String bookId, int chapterNum, int verseNum) async {
    final chapter = await getChapter(bookId, chapterNum);
    if (chapter == null) return null;
    return chapter.verses.firstWhereOrNull((v) => v.verse == verseNum);
  }
}
