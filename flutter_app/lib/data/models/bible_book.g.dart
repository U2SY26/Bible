// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'bible_book.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$BibleBookImpl _$$BibleBookImplFromJson(Map<String, dynamic> json) =>
    _$BibleBookImpl(
      id: json['id'] as String,
      nameKo: json['name_ko'] as String,
      nameEn: json['name_en'] as String,
      chapters: (json['chapters'] as num).toInt(),
      category: json['category'] as String,
      categoryKo: json['category_ko'] as String,
    );

Map<String, dynamic> _$$BibleBookImplToJson(_$BibleBookImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name_ko': instance.nameKo,
      'name_en': instance.nameEn,
      'chapters': instance.chapters,
      'category': instance.category,
      'category_ko': instance.categoryKo,
    };

_$BibleBookCategoryImpl _$$BibleBookCategoryImplFromJson(
  Map<String, dynamic> json,
) => _$BibleBookCategoryImpl(
  id: json['id'] as String,
  nameKo: json['name_ko'] as String,
  nameEn: json['name_en'] as String,
  testament: json['testament'] as String,
  books: (json['books'] as List<dynamic>)
      .map((e) => BibleBook.fromJson(e as Map<String, dynamic>))
      .toList(),
);

Map<String, dynamic> _$$BibleBookCategoryImplToJson(
  _$BibleBookCategoryImpl instance,
) => <String, dynamic>{
  'id': instance.id,
  'name_ko': instance.nameKo,
  'name_en': instance.nameEn,
  'testament': instance.testament,
  'books': instance.books,
};

_$BooksDataImpl _$$BooksDataImplFromJson(Map<String, dynamic> json) =>
    _$BooksDataImpl(
      bibleBooks: json['bibleBooks'] as Map<String, dynamic>,
      allBooks: (json['allBooks'] as List<dynamic>)
          .map((e) => BibleBook.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$$BooksDataImplToJson(_$BooksDataImpl instance) =>
    <String, dynamic>{
      'bibleBooks': instance.bibleBooks,
      'allBooks': instance.allBooks,
    };

_$BibleDataImpl _$$BibleDataImplFromJson(Map<String, dynamic> json) =>
    _$BibleDataImpl(
      version: json['version'] as String,
      versionEn: json['version_en'] as String,
      copyright: json['copyright'] as String?,
      books: (json['books'] as List<dynamic>)
          .map((e) => BibleBookFull.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$$BibleDataImplToJson(_$BibleDataImpl instance) =>
    <String, dynamic>{
      'version': instance.version,
      'version_en': instance.versionEn,
      'copyright': instance.copyright,
      'books': instance.books,
    };

_$BibleBookFullImpl _$$BibleBookFullImplFromJson(Map<String, dynamic> json) =>
    _$BibleBookFullImpl(
      id: json['id'] as String,
      name: json['name'] as String,
      nameEn: json['name_en'] as String?,
      testament: json['testament'] as String,
      chaptersList: (json['chapters'] as List<dynamic>)
          .map((e) => BibleChapter.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$$BibleBookFullImplToJson(_$BibleBookFullImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'name_en': instance.nameEn,
      'testament': instance.testament,
      'chapters': instance.chaptersList,
    };

_$BibleChapterImpl _$$BibleChapterImplFromJson(Map<String, dynamic> json) =>
    _$BibleChapterImpl(
      chapter: (json['chapter'] as num).toInt(),
      verses: (json['verses'] as List<dynamic>)
          .map((e) => BibleVerse.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$$BibleChapterImplToJson(_$BibleChapterImpl instance) =>
    <String, dynamic>{'chapter': instance.chapter, 'verses': instance.verses};

_$BibleVerseImpl _$$BibleVerseImplFromJson(Map<String, dynamic> json) =>
    _$BibleVerseImpl(
      verse: (json['verse'] as num).toInt(),
      text: json['text'] as String,
    );

Map<String, dynamic> _$$BibleVerseImplToJson(_$BibleVerseImpl instance) =>
    <String, dynamic>{'verse': instance.verse, 'text': instance.text};
