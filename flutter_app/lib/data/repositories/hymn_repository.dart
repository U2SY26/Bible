import 'package:collection/collection.dart';
import '../datasources/json_data_source.dart';
import '../models/hymn.dart';

class HymnRepository {
  final JsonDataSource _dataSource;

  HymnRepository(this._dataSource);

  Future<List<Hymn>> getAllHymns() async {
    return await _dataSource.loadHymns();
  }

  Future<Hymn?> getHymnById(int id) async {
    final hymns = await getAllHymns();
    return hymns.firstWhereOrNull((h) => h.id == id);
  }

  Future<Hymn?> getHymnByNumber(int number) async {
    final hymns = await getAllHymns();
    return hymns.firstWhereOrNull((h) => h.number == number);
  }

  Future<List<Hymn>> getHymnsByCharacter(String characterId) async {
    final hymns = await getAllHymns();
    return hymns.where((h) => h.relatedTo.contains(characterId)).toList();
  }

  Future<List<Hymn>> getHymnsByNumbers(List<int> numbers) async {
    final hymns = await getAllHymns();
    return hymns.where((h) => numbers.contains(h.number)).toList();
  }

  Future<List<Hymn>> getHymnsByTheme(String theme) async {
    final hymns = await getAllHymns();
    return hymns.where((h) => h.theme == theme).toList();
  }
}
