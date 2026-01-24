// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'hymn.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$HymnImpl _$$HymnImplFromJson(Map<String, dynamic> json) => _$HymnImpl(
  id: (json['id'] as num).toInt(),
  number: (json['number'] as num).toInt(),
  titleKo: json['title_ko'] as String,
  titleEn: json['title_en'] as String,
  relatedTo:
      (json['relatedTo'] as List<dynamic>?)?.map((e) => e as String).toList() ??
      const [],
  theme: json['theme'] as String?,
  verses:
      (json['verses'] as List<dynamic>?)?.map((e) => e as String).toList() ??
      const [],
);

Map<String, dynamic> _$$HymnImplToJson(_$HymnImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'number': instance.number,
      'title_ko': instance.titleKo,
      'title_en': instance.titleEn,
      'relatedTo': instance.relatedTo,
      'theme': instance.theme,
      'verses': instance.verses,
    };
