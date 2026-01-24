// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'relationship.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$RelationshipImpl _$$RelationshipImplFromJson(Map<String, dynamic> json) =>
    _$RelationshipImpl(
      source: json['source'] as String,
      target: json['target'] as String,
      type: json['type'] as String,
      labelKo: json['label_ko'] as String?,
      labelEn: json['label_en'] as String?,
    );

Map<String, dynamic> _$$RelationshipImplToJson(_$RelationshipImpl instance) =>
    <String, dynamic>{
      'source': instance.source,
      'target': instance.target,
      'type': instance.type,
      'label_ko': instance.labelKo,
      'label_en': instance.labelEn,
    };

_$RelationshipColorImpl _$$RelationshipColorImplFromJson(
  Map<String, dynamic> json,
) => _$RelationshipColorImpl(
  color: json['color'] as String,
  labelKo: json['label_ko'] as String,
  labelEn: json['label_en'] as String,
);

Map<String, dynamic> _$$RelationshipColorImplToJson(
  _$RelationshipColorImpl instance,
) => <String, dynamic>{
  'color': instance.color,
  'label_ko': instance.labelKo,
  'label_en': instance.labelEn,
};

_$RelationshipsDataImpl _$$RelationshipsDataImplFromJson(
  Map<String, dynamic> json,
) => _$RelationshipsDataImpl(
  relationships: (json['relationships'] as List<dynamic>)
      .map((e) => Relationship.fromJson(e as Map<String, dynamic>))
      .toList(),
  relationshipColors: (json['relationshipColors'] as Map<String, dynamic>).map(
    (k, e) =>
        MapEntry(k, RelationshipColor.fromJson(e as Map<String, dynamic>)),
  ),
);

Map<String, dynamic> _$$RelationshipsDataImplToJson(
  _$RelationshipsDataImpl instance,
) => <String, dynamic>{
  'relationships': instance.relationships,
  'relationshipColors': instance.relationshipColors,
};
