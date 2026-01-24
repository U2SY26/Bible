import 'package:freezed_annotation/freezed_annotation.dart';

part 'event.freezed.dart';
part 'event.g.dart';

@freezed
class BibleEvent with _$BibleEvent {
  const factory BibleEvent({
    required String id,
    @JsonKey(name: 'name_ko') required String nameKo,
    @JsonKey(name: 'name_en') required String nameEn,
    required int year,
    required String era,
    @Default([]) List<String> books,
    @Default([]) List<String> verses,
    @JsonKey(name: 'verse_text_ko') String? verseTextKo,
    @JsonKey(name: 'verse_text_en') String? verseTextEn,
    @JsonKey(name: 'description_ko') @Default('') String descriptionKo,
    @JsonKey(name: 'description_en') @Default('') String descriptionEn,
    @Default([]) List<String> characters,
    String? location,
    String? icon,
    @JsonKey(name: 'commentary_ko') String? commentaryKo,
  }) = _BibleEvent;

  factory BibleEvent.fromJson(Map<String, dynamic> json) =>
      _$BibleEventFromJson(json);
}

@freezed
class Era with _$Era {
  const factory Era({
    required String id,
    @JsonKey(name: 'name_ko') required String nameKo,
    @JsonKey(name: 'name_en') required String nameEn,
    @JsonKey(name: 'year_start') required int yearStart,
    @JsonKey(name: 'year_end') required int yearEnd,
    required String color,
    required int order,
  }) = _Era;

  factory Era.fromJson(Map<String, dynamic> json) => _$EraFromJson(json);
}

@freezed
class EventsData with _$EventsData {
  const factory EventsData({
    required List<BibleEvent> events,
    required List<Era> eras,
  }) = _EventsData;

  factory EventsData.fromJson(Map<String, dynamic> json) =>
      _$EventsDataFromJson(json);
}
