import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/datasources/json_data_source.dart';
import '../../data/repositories/character_repository.dart';
import '../../data/repositories/relationship_repository.dart';
import '../../data/repositories/event_repository.dart';
import '../../data/repositories/bible_repository.dart';
import '../../data/repositories/hymn_repository.dart';
import '../../data/repositories/location_repository.dart';
import '../../data/models/character.dart';
import '../../data/models/relationship.dart';
import '../../data/models/event.dart';
import '../../data/models/bible_book.dart';
import '../../data/models/hymn.dart';
import '../../data/models/location.dart';

// Data Source Provider
final jsonDataSourceProvider = Provider<JsonDataSource>((ref) {
  return JsonDataSource();
});

// Repository Providers
final characterRepositoryProvider = Provider<CharacterRepository>((ref) {
  return CharacterRepository(ref.read(jsonDataSourceProvider));
});

final relationshipRepositoryProvider = Provider<RelationshipRepository>((ref) {
  return RelationshipRepository(ref.read(jsonDataSourceProvider));
});

final eventRepositoryProvider = Provider<EventRepository>((ref) {
  return EventRepository(ref.read(jsonDataSourceProvider));
});

final bibleRepositoryProvider = Provider<BibleRepository>((ref) {
  return BibleRepository(ref.read(jsonDataSourceProvider));
});

final hymnRepositoryProvider = Provider<HymnRepository>((ref) {
  return HymnRepository(ref.read(jsonDataSourceProvider));
});

final locationRepositoryProvider = Provider<LocationRepository>((ref) {
  return LocationRepository(ref.read(jsonDataSourceProvider));
});

// Data Providers
final allCharactersProvider = FutureProvider<List<Character>>((ref) async {
  final repo = ref.read(characterRepositoryProvider);
  return await repo.getAllCharacters();
});

final allRelationshipsProvider =
    FutureProvider<List<Relationship>>((ref) async {
  final repo = ref.read(relationshipRepositoryProvider);
  return await repo.getAllRelationships();
});

final relationshipColorsProvider =
    FutureProvider<Map<String, RelationshipColor>>((ref) async {
  final repo = ref.read(relationshipRepositoryProvider);
  return await repo.getRelationshipColors();
});

final allEventsProvider = FutureProvider<List<BibleEvent>>((ref) async {
  final repo = ref.read(eventRepositoryProvider);
  return await repo.getAllEvents();
});

final allErasProvider = FutureProvider<List<Era>>((ref) async {
  final repo = ref.read(eventRepositoryProvider);
  return await repo.getAllEras();
});

final allBooksProvider = FutureProvider<List<BibleBook>>((ref) async {
  final repo = ref.read(bibleRepositoryProvider);
  return await repo.getAllBooks();
});

final allHymnsProvider = FutureProvider<List<Hymn>>((ref) async {
  final repo = ref.read(hymnRepositoryProvider);
  return await repo.getAllHymns();
});

final allLocationsProvider = FutureProvider<List<BibleLocation>>((ref) async {
  final repo = ref.read(locationRepositoryProvider);
  return await repo.getAllLocations();
});

final allRegionsProvider = FutureProvider<List<Region>>((ref) async {
  final repo = ref.read(locationRepositoryProvider);
  return await repo.getAllRegions();
});

// Character by ID Provider
final characterByIdProvider =
    FutureProvider.family<Character?, String>((ref, id) async {
  final repo = ref.read(characterRepositoryProvider);
  return await repo.getCharacterById(id);
});

// Event by ID Provider
final eventByIdProvider =
    FutureProvider.family<BibleEvent?, String>((ref, id) async {
  final repo = ref.read(eventRepositoryProvider);
  return await repo.getEventById(id);
});

// Relationships by Character Provider
final relationshipsByCharacterProvider =
    FutureProvider.family<List<Relationship>, String>((ref, characterId) async {
  final repo = ref.read(relationshipRepositoryProvider);
  return await repo.getRelationshipsByCharacter(characterId);
});

// Events by Character Provider
final eventsByCharacterProvider =
    FutureProvider.family<List<BibleEvent>, String>((ref, characterId) async {
  final repo = ref.read(eventRepositoryProvider);
  return await repo.getEventsByCharacter(characterId);
});

// Hymns by Character Provider
final hymnsByCharacterProvider =
    FutureProvider.family<List<Hymn>, String>((ref, characterId) async {
  final repo = ref.read(hymnRepositoryProvider);
  return await repo.getHymnsByCharacter(characterId);
});

// Locations by Character Provider
final locationsByCharacterProvider =
    FutureProvider.family<List<BibleLocation>, String>(
        (ref, characterId) async {
  final repo = ref.read(locationRepositoryProvider);
  return await repo.getLocationsByCharacter(characterId);
});

// Bible chapter provider
final bibleChapterProvider = FutureProvider.family<BibleChapter?,
    ({String bookId, int chapter})>((ref, params) async {
  final repo = ref.read(bibleRepositoryProvider);
  return await repo.getChapter(params.bookId, params.chapter);
});
