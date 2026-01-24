import 'package:collection/collection.dart';
import '../datasources/json_data_source.dart';
import '../models/event.dart';

class EventRepository {
  final JsonDataSource _dataSource;

  EventRepository(this._dataSource);

  Future<List<BibleEvent>> getAllEvents() async {
    final data = await _dataSource.loadEvents();
    return data.events;
  }

  Future<List<Era>> getAllEras() async {
    final data = await _dataSource.loadEvents();
    return data.eras..sort((a, b) => a.order.compareTo(b.order));
  }

  Future<BibleEvent?> getEventById(String id) async {
    final events = await getAllEvents();
    return events.firstWhereOrNull((e) => e.id == id);
  }

  Future<List<BibleEvent>> getEventsByCharacter(String characterId) async {
    final events = await getAllEvents();
    return events.where((e) => e.characters.contains(characterId)).toList();
  }

  Future<List<BibleEvent>> getEventsByEra(String era) async {
    final events = await getAllEvents();
    return events.where((e) => e.era == era).toList();
  }

  Future<List<BibleEvent>> getEventsByBook(String bookId) async {
    final events = await getAllEvents();
    return events.where((e) => e.books.contains(bookId)).toList();
  }

  Future<List<BibleEvent>> getEventsByChronology() async {
    final events = await getAllEvents();
    return events..sort((a, b) => a.year.compareTo(b.year));
  }

  Future<Era?> getEraById(String id) async {
    final eras = await getAllEras();
    return eras.firstWhereOrNull((e) => e.id == id);
  }
}
