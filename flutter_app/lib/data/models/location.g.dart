// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'location.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$BibleLocationImpl _$$BibleLocationImplFromJson(Map<String, dynamic> json) =>
    _$BibleLocationImpl(
      id: json['id'] as String,
      nameKo: json['name_ko'] as String,
      nameEn: json['name_en'] as String,
      type: json['type'] as String,
      region: json['region'] as String?,
      coordinates: json['coordinates'] == null
          ? null
          : Coordinates.fromJson(json['coordinates'] as Map<String, dynamic>),
      descriptionKo: json['description_ko'] as String?,
      descriptionEn: json['description_en'] as String?,
      importance: (json['importance'] as num?)?.toInt() ?? 5,
      testament: json['testament'] as String? ?? 'both',
      characters:
          (json['characters'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          const [],
      events:
          (json['events'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          const [],
    );

Map<String, dynamic> _$$BibleLocationImplToJson(_$BibleLocationImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name_ko': instance.nameKo,
      'name_en': instance.nameEn,
      'type': instance.type,
      'region': instance.region,
      'coordinates': instance.coordinates,
      'description_ko': instance.descriptionKo,
      'description_en': instance.descriptionEn,
      'importance': instance.importance,
      'testament': instance.testament,
      'characters': instance.characters,
      'events': instance.events,
    };

_$CoordinatesImpl _$$CoordinatesImplFromJson(Map<String, dynamic> json) =>
    _$CoordinatesImpl(
      lat: (json['lat'] as num).toDouble(),
      lng: (json['lng'] as num).toDouble(),
    );

Map<String, dynamic> _$$CoordinatesImplToJson(_$CoordinatesImpl instance) =>
    <String, dynamic>{'lat': instance.lat, 'lng': instance.lng};

_$RegionImpl _$$RegionImplFromJson(Map<String, dynamic> json) => _$RegionImpl(
  id: json['id'] as String,
  nameKo: json['name_ko'] as String,
  nameEn: json['name_en'] as String,
  color: json['color'] as String,
);

Map<String, dynamic> _$$RegionImplToJson(_$RegionImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name_ko': instance.nameKo,
      'name_en': instance.nameEn,
      'color': instance.color,
    };

_$LocationsDataImpl _$$LocationsDataImplFromJson(Map<String, dynamic> json) =>
    _$LocationsDataImpl(
      locations: (json['locations'] as List<dynamic>)
          .map((e) => BibleLocation.fromJson(e as Map<String, dynamic>))
          .toList(),
      regions: (json['regions'] as List<dynamic>)
          .map((e) => Region.fromJson(e as Map<String, dynamic>))
          .toList(),
      locationTypeIcons: Map<String, String>.from(
        json['locationTypeIcons'] as Map,
      ),
    );

Map<String, dynamic> _$$LocationsDataImplToJson(_$LocationsDataImpl instance) =>
    <String, dynamic>{
      'locations': instance.locations,
      'regions': instance.regions,
      'locationTypeIcons': instance.locationTypeIcons,
    };
