import '../datasources/json_data_source.dart';
import '../models/relationship.dart';

class RelationshipRepository {
  final JsonDataSource _dataSource;

  RelationshipRepository(this._dataSource);

  Future<List<Relationship>> getAllRelationships() async {
    final data = await _dataSource.loadRelationships();
    return data.relationships;
  }

  Future<Map<String, RelationshipColor>> getRelationshipColors() async {
    final data = await _dataSource.loadRelationships();
    return data.relationshipColors;
  }

  Future<List<Relationship>> getRelationshipsByCharacter(
      String characterId) async {
    final relationships = await getAllRelationships();
    return relationships
        .where((r) => r.source == characterId || r.target == characterId)
        .toList();
  }

  Future<List<Relationship>> getRelationshipsBetween(
      Set<String> characterIds) async {
    final relationships = await getAllRelationships();
    return relationships
        .where((r) =>
            characterIds.contains(r.source) && characterIds.contains(r.target))
        .toList();
  }

  Future<Set<String>> getConnectedCharacterIds(String characterId) async {
    final relationships = await getRelationshipsByCharacter(characterId);
    final connectedIds = <String>{};
    for (final rel in relationships) {
      if (rel.source == characterId) {
        connectedIds.add(rel.target);
      } else {
        connectedIds.add(rel.source);
      }
    }
    return connectedIds;
  }

  Future<List<Relationship>> getRelationshipsByType(String type) async {
    final relationships = await getAllRelationships();
    return relationships.where((r) => r.type == type).toList();
  }
}
