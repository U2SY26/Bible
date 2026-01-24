import 'package:collection/collection.dart';
import '../datasources/json_data_source.dart';
import '../models/character.dart';

class CharacterRepository {
  final JsonDataSource _dataSource;

  CharacterRepository(this._dataSource);

  Future<List<Character>> getAllCharacters() async {
    return await _dataSource.loadCharacters();
  }

  Future<Character?> getCharacterById(String id) async {
    final characters = await getAllCharacters();
    return characters.firstWhereOrNull((c) => c.id == id);
  }

  Future<List<Character>> searchCharacters(String query, String lang) async {
    final characters = await getAllCharacters();
    final q = query.toLowerCase();

    return characters.where((c) {
      final name = lang == 'ko' ? c.nameKo : c.nameEn;
      final desc = lang == 'ko' ? c.descriptionKo : c.descriptionEn;
      final labels = c.labels.join(' ');

      return name.toLowerCase().contains(q) ||
          desc.toLowerCase().contains(q) ||
          labels.toLowerCase().contains(q);
    }).toList();
  }

  Future<List<Character>> getCharactersByTestament(String testament) async {
    final characters = await getAllCharacters();
    if (testament == 'both') return characters;
    return characters
        .where((c) => c.testament == testament || c.testament == 'both')
        .toList();
  }

  Future<List<Character>> getCharactersByEra(String era) async {
    final characters = await getAllCharacters();
    return characters.where((c) => c.era == era).toList();
  }

  Future<List<Character>> getCharactersByBook(String bookId) async {
    final characters = await getAllCharacters();
    return characters.where((c) => c.books.contains(bookId)).toList();
  }

  Future<List<Character>> getCharactersByImportance(int minImportance) async {
    final characters = await getAllCharacters();
    return characters.where((c) => c.importance >= minImportance).toList();
  }

  Future<List<Character>> getCharactersByIds(List<String> ids) async {
    final characters = await getAllCharacters();
    return characters.where((c) => ids.contains(c.id)).toList();
  }
}
