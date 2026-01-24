import 'package:collection/collection.dart';
import '../datasources/json_data_source.dart';
import '../models/location.dart';

class LocationRepository {
  final JsonDataSource _dataSource;

  LocationRepository(this._dataSource);

  Future<List<BibleLocation>> getAllLocations() async {
    final data = await _dataSource.loadLocations();
    return data.locations;
  }

  Future<List<Region>> getAllRegions() async {
    final data = await _dataSource.loadLocations();
    return data.regions;
  }

  Future<Map<String, String>> getLocationTypeIcons() async {
    final data = await _dataSource.loadLocations();
    return data.locationTypeIcons;
  }

  Future<BibleLocation?> getLocationById(String id) async {
    final locations = await getAllLocations();
    return locations.firstWhereOrNull((l) => l.id == id);
  }

  Future<List<BibleLocation>> getLocationsByCharacter(
      String characterId) async {
    final locations = await getAllLocations();
    return locations.where((l) => l.characters.contains(characterId)).toList();
  }

  Future<List<BibleLocation>> getLocationsByEvent(String eventId) async {
    final locations = await getAllLocations();
    return locations.where((l) => l.events.contains(eventId)).toList();
  }

  Future<List<BibleLocation>> getLocationsByRegion(String regionId) async {
    final locations = await getAllLocations();
    return locations.where((l) => l.region == regionId).toList();
  }

  Future<List<BibleLocation>> getLocationsByType(String type) async {
    final locations = await getAllLocations();
    return locations.where((l) => l.type == type).toList();
  }

  Future<List<BibleLocation>> searchLocations(String query, String lang) async {
    final locations = await getAllLocations();
    final q = query.toLowerCase();

    return locations.where((l) {
      final name = lang == 'ko' ? l.nameKo : l.nameEn;
      return name.toLowerCase().contains(q);
    }).toList();
  }
}
