// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'character.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$CharacterImpl _$$CharacterImplFromJson(Map<String, dynamic> json) =>
    _$CharacterImpl(
      id: json['id'] as String,
      nameKo: json['name_ko'] as String,
      nameEn: json['name_en'] as String,
      testament: json['testament'] as String,
      importance: (json['importance'] as num).toInt(),
      books:
          (json['books'] as List<dynamic>?)?.map((e) => e as String).toList() ??
          const [],
      descriptionKo: json['description_ko'] as String? ?? '',
      descriptionEn: json['description_en'] as String? ?? '',
      verses:
          (json['verses'] as List<dynamic>?)
              ?.map((e) => CharacterVerse.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const [],
      labels:
          (json['labels'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          const [],
      era: json['era'] as String?,
      location: json['location'] as String?,
      hymns:
          (json['hymns'] as List<dynamic>?)
              ?.map((e) => (e as num).toInt())
              .toList() ??
          const [],
      mbti: json['mbti'] as String?,
    );

Map<String, dynamic> _$$CharacterImplToJson(_$CharacterImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name_ko': instance.nameKo,
      'name_en': instance.nameEn,
      'testament': instance.testament,
      'importance': instance.importance,
      'books': instance.books,
      'description_ko': instance.descriptionKo,
      'description_en': instance.descriptionEn,
      'verses': instance.verses,
      'labels': instance.labels,
      'era': instance.era,
      'location': instance.location,
      'hymns': instance.hymns,
      'mbti': instance.mbti,
    };

_$CharacterVerseImpl _$$CharacterVerseImplFromJson(Map<String, dynamic> json) =>
    _$CharacterVerseImpl(
      ref: json['ref'] as String,
      textKo: json['text_ko'] as String? ?? '',
      textEn: json['text_en'] as String? ?? '',
    );

Map<String, dynamic> _$$CharacterVerseImplToJson(
  _$CharacterVerseImpl instance,
) => <String, dynamic>{
  'ref': instance.ref,
  'text_ko': instance.textKo,
  'text_en': instance.textEn,
};
