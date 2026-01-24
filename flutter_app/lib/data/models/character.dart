import 'package:freezed_annotation/freezed_annotation.dart';

part 'character.freezed.dart';
part 'character.g.dart';

@freezed
class Character with _$Character {
  const factory Character({
    required String id,
    @JsonKey(name: 'name_ko') required String nameKo,
    @JsonKey(name: 'name_en') required String nameEn,
    required String testament,
    required int importance,
    @Default([]) List<String> books,
    @JsonKey(name: 'description_ko') @Default('') String descriptionKo,
    @JsonKey(name: 'description_en') @Default('') String descriptionEn,
    @Default([]) List<CharacterVerse> verses,
    @Default([]) List<String> labels,
    String? era,
    String? location,
    @Default([]) List<int> hymns,
    String? mbti,
  }) = _Character;

  factory Character.fromJson(Map<String, dynamic> json) =>
      _$CharacterFromJson(json);
}

@freezed
class CharacterVerse with _$CharacterVerse {
  const factory CharacterVerse({
    required String ref,
    @JsonKey(name: 'text_ko') @Default('') String textKo,
    @JsonKey(name: 'text_en') @Default('') String textEn,
  }) = _CharacterVerse;

  factory CharacterVerse.fromJson(Map<String, dynamic> json) =>
      _$CharacterVerseFromJson(json);
}
