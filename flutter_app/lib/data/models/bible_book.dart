import 'package:freezed_annotation/freezed_annotation.dart';

part 'bible_book.freezed.dart';
part 'bible_book.g.dart';

@freezed
class BibleBook with _$BibleBook {
  const factory BibleBook({
    required String id,
    @JsonKey(name: 'name_ko') required String nameKo,
    @JsonKey(name: 'name_en') required String nameEn,
    required int chapters,
    required String category,
    @JsonKey(name: 'category_ko') required String categoryKo,
  }) = _BibleBook;

  factory BibleBook.fromJson(Map<String, dynamic> json) =>
      _$BibleBookFromJson(json);
}

@freezed
class BibleBookCategory with _$BibleBookCategory {
  const factory BibleBookCategory({
    required String id,
    @JsonKey(name: 'name_ko') required String nameKo,
    @JsonKey(name: 'name_en') required String nameEn,
    required String testament,
    required List<BibleBook> books,
  }) = _BibleBookCategory;

  factory BibleBookCategory.fromJson(Map<String, dynamic> json) =>
      _$BibleBookCategoryFromJson(json);
}

@freezed
class BooksData with _$BooksData {
  const factory BooksData({
    required Map<String, dynamic> bibleBooks,
    required List<BibleBook> allBooks,
  }) = _BooksData;

  factory BooksData.fromJson(Map<String, dynamic> json) =>
      _$BooksDataFromJson(json);
}

// Full Bible data structure
@freezed
class BibleData with _$BibleData {
  const factory BibleData({
    required String version,
    @JsonKey(name: 'version_en') required String versionEn,
    String? copyright,
    required List<BibleBookFull> books,
  }) = _BibleData;

  factory BibleData.fromJson(Map<String, dynamic> json) =>
      _$BibleDataFromJson(json);
}

@freezed
class BibleBookFull with _$BibleBookFull {
  const factory BibleBookFull({
    required String id,
    required String name,
    @JsonKey(name: 'name_en') String? nameEn,
    required String testament,
    @JsonKey(name: 'chapters') required List<BibleChapter> chaptersList,
  }) = _BibleBookFull;

  factory BibleBookFull.fromJson(Map<String, dynamic> json) =>
      _$BibleBookFullFromJson(json);
}

@freezed
class BibleChapter with _$BibleChapter {
  const factory BibleChapter({
    required int chapter,
    required List<BibleVerse> verses,
  }) = _BibleChapter;

  factory BibleChapter.fromJson(Map<String, dynamic> json) =>
      _$BibleChapterFromJson(json);
}

@freezed
class BibleVerse with _$BibleVerse {
  const factory BibleVerse({
    required int verse,
    required String text,
  }) = _BibleVerse;

  factory BibleVerse.fromJson(Map<String, dynamic> json) =>
      _$BibleVerseFromJson(json);
}
