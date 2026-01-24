import 'package:freezed_annotation/freezed_annotation.dart';

part 'location.freezed.dart';
part 'location.g.dart';

@freezed
class BibleLocation with _$BibleLocation {
  const factory BibleLocation({
    required String id,
    @JsonKey(name: 'name_ko') required String nameKo,
    @JsonKey(name: 'name_en') required String nameEn,
    required String type,
    String? region,
    Coordinates? coordinates,
    @JsonKey(name: 'description_ko') String? descriptionKo,
    @JsonKey(name: 'description_en') String? descriptionEn,
    @Default(5) int importance,
    @Default('both') String testament,
    @Default([]) List<String> characters,
    @Default([]) List<String> events,
  }) = _BibleLocation;

  factory BibleLocation.fromJson(Map<String, dynamic> json) =>
      _$BibleLocationFromJson(json);
}

@freezed
class Coordinates with _$Coordinates {
  const factory Coordinates({
    required double lat,
    required double lng,
  }) = _Coordinates;

  factory Coordinates.fromJson(Map<String, dynamic> json) =>
      _$CoordinatesFromJson(json);
}

@freezed
class Region with _$Region {
  const factory Region({
    required String id,
    @JsonKey(name: 'name_ko') required String nameKo,
    @JsonKey(name: 'name_en') required String nameEn,
    required String color,
  }) = _Region;

  factory Region.fromJson(Map<String, dynamic> json) => _$RegionFromJson(json);
}

@freezed
class LocationsData with _$LocationsData {
  const factory LocationsData({
    required List<BibleLocation> locations,
    required List<Region> regions,
    required Map<String, String> locationTypeIcons,
  }) = _LocationsData;

  factory LocationsData.fromJson(Map<String, dynamic> json) =>
      _$LocationsDataFromJson(json);
}
