import 'dart:convert';
import 'package:flutter/services.dart';
import '../models/character.dart';
import '../models/relationship.dart';
import '../models/event.dart';
import '../models/bible_book.dart';
import '../models/hymn.dart';
import '../models/location.dart';

class JsonDataSource {
  // Cached data
  List<Character>? _characters;
  RelationshipsData? _relationshipsData;
  EventsData? _eventsData;
  BooksData? _booksData;
  List<Hymn>? _hymns;
  LocationsData? _locationsData;
  BibleData? _bibleData;

  Future<String> _loadAsset(String path) async {
    return await rootBundle.loadString(path);
  }

  Future<List<Character>> loadCharacters() async {
    if (_characters != null) return _characters!;

    final jsonString = await _loadAsset('assets/data/characters.json');
    final List<dynamic> jsonList = json.decode(jsonString);
    _characters = jsonList.map((e) => Character.fromJson(e)).toList();
    return _characters!;
  }

  Future<RelationshipsData> loadRelationships() async {
    if (_relationshipsData != null) return _relationshipsData!;

    final jsonString = await _loadAsset('assets/data/relationships.json');
    final Map<String, dynamic> jsonMap = json.decode(jsonString);

    final List<dynamic> relationshipsList = jsonMap['relationships'];
    final relationships = relationshipsList
        .map((e) => Relationship.fromJson(e))
        .toList();

    final Map<String, dynamic> colorsMap = jsonMap['relationshipColors'];
    final relationshipColors = colorsMap.map(
      (key, value) => MapEntry(key, RelationshipColor.fromJson(value)),
    );

    _relationshipsData = RelationshipsData(
      relationships: relationships,
      relationshipColors: relationshipColors,
    );
    return _relationshipsData!;
  }

  Future<EventsData> loadEvents() async {
    if (_eventsData != null) return _eventsData!;

    final jsonString = await _loadAsset('assets/data/events.json');
    final Map<String, dynamic> jsonMap = json.decode(jsonString);

    final List<dynamic> eventsList = jsonMap['events'];
    final events = eventsList.map((e) => BibleEvent.fromJson(e)).toList();

    final List<dynamic> erasList = jsonMap['eras'];
    final eras = erasList.map((e) => Era.fromJson(e)).toList();

    _eventsData = EventsData(events: events, eras: eras);
    return _eventsData!;
  }

  Future<BooksData> loadBooks() async {
    if (_booksData != null) return _booksData!;

    final jsonString = await _loadAsset('assets/data/books.json');
    final Map<String, dynamic> jsonMap = json.decode(jsonString);

    final List<dynamic> allBooksList = jsonMap['allBooks'];
    final allBooks = allBooksList.map((e) => BibleBook.fromJson(e)).toList();

    _booksData = BooksData(
      bibleBooks: jsonMap['bibleBooks'],
      allBooks: allBooks,
    );
    return _booksData!;
  }

  Future<List<Hymn>> loadHymns() async {
    if (_hymns != null) return _hymns!;

    final jsonString = await _loadAsset('assets/data/hymns.json');
    final List<dynamic> jsonList = json.decode(jsonString);
    _hymns = jsonList.map((e) => Hymn.fromJson(e)).toList();
    return _hymns!;
  }

  Future<LocationsData> loadLocations() async {
    if (_locationsData != null) return _locationsData!;

    final jsonString = await _loadAsset('assets/data/locations.json');
    final Map<String, dynamic> jsonMap = json.decode(jsonString);

    final List<dynamic> locationsList = jsonMap['locations'];
    final locations = locationsList
        .map((e) => BibleLocation.fromJson(e))
        .toList();

    final List<dynamic> regionsList = jsonMap['regions'];
    final regions = regionsList.map((e) => Region.fromJson(e)).toList();

    final Map<String, dynamic> iconsMap = jsonMap['locationTypeIcons'];
    final locationTypeIcons = iconsMap.map(
      (key, value) => MapEntry(key, value.toString()),
    );

    _locationsData = LocationsData(
      locations: locations,
      regions: regions,
      locationTypeIcons: locationTypeIcons,
    );
    return _locationsData!;
  }

  Future<BibleData> loadBible() async {
    if (_bibleData != null) return _bibleData!;

    final jsonString = await _loadAsset('assets/data/bible.json');
    final Map<String, dynamic> jsonMap = json.decode(jsonString);
    _bibleData = BibleData.fromJson(jsonMap);
    return _bibleData!;
  }

  // Clear cache (useful for hot reload during development)
  void clearCache() {
    _characters = null;
    _relationshipsData = null;
    _eventsData = null;
    _booksData = null;
    _hymns = null;
    _locationsData = null;
    _bibleData = null;
  }
}
