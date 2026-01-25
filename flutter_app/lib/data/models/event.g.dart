// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'event.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$BibleEventImpl _$$BibleEventImplFromJson(Map<String, dynamic> json) =>
    _$BibleEventImpl(
      id: json['id'] as String,
      nameKo: json['name_ko'] as String,
      nameEn: json['name_en'] as String,
      year: (json['year'] as num).toInt(),
      era: json['era'] as String,
      books:
          (json['books'] as List<dynamic>?)?.map((e) => e as String).toList() ??
          const [],
      verses:
          (json['verses'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          const [],
      verseTextKo: json['verse_text_ko'] as String?,
      verseTextEn: json['verse_text_en'] as String?,
      descriptionKo: json['description_ko'] as String? ?? '',
      descriptionEn: json['description_en'] as String? ?? '',
      characters:
          (json['characters'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          const [],
      location: json['location'] as String?,
      icon: json['icon'] as String?,
      commentaryKo: json['commentary_ko'] as String?,
    );

Map<String, dynamic> _$$BibleEventImplToJson(_$BibleEventImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name_ko': instance.nameKo,
      'name_en': instance.nameEn,
      'year': instance.year,
      'era': instance.era,
      'books': instance.books,
      'verses': instance.verses,
      'verse_text_ko': instance.verseTextKo,
      'verse_text_en': instance.verseTextEn,
      'description_ko': instance.descriptionKo,
      'description_en': instance.descriptionEn,
      'characters': instance.characters,
      'location': instance.location,
      'icon': instance.icon,
      'commentary_ko': instance.commentaryKo,
    };

_$EraImpl _$$EraImplFromJson(Map<String, dynamic> json) => _$EraImpl(
  id: json['id'] as String,
  nameKo: json['name_ko'] as String,
  nameEn: json['name_en'] as String,
  yearStart: (json['year_start'] as num).toInt(),
  yearEnd: (json['year_end'] as num).toInt(),
  color: json['color'] as String,
  order: (json['order'] as num?)?.toInt() ?? 0,
);

Map<String, dynamic> _$$EraImplToJson(_$EraImpl instance) => <String, dynamic>{
  'id': instance.id,
  'name_ko': instance.nameKo,
  'name_en': instance.nameEn,
  'year_start': instance.yearStart,
  'year_end': instance.yearEnd,
  'color': instance.color,
  'order': instance.order,
};

_$EventsDataImpl _$$EventsDataImplFromJson(Map<String, dynamic> json) =>
    _$EventsDataImpl(
      events: (json['events'] as List<dynamic>)
          .map((e) => BibleEvent.fromJson(e as Map<String, dynamic>))
          .toList(),
      eras: (json['eras'] as List<dynamic>)
          .map((e) => Era.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$$EventsDataImplToJson(_$EventsDataImpl instance) =>
    <String, dynamic>{'events': instance.events, 'eras': instance.eras};
