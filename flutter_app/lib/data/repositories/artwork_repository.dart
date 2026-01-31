import 'dart:convert';
import 'package:flutter/services.dart';
import '../models/artwork.dart';

class ArtworkRepository {
  Map<String, List<Artwork>>? _characterArtwork;

  Future<void> _loadData() async {
    if (_characterArtwork != null) return;

    try {
      final jsonString = await rootBundle.loadString('assets/data/artwork.json');
      final data = json.decode(jsonString) as Map<String, dynamic>;

      final characterArtworkMap = data['characterArtwork'] as Map<String, dynamic>?;
      _characterArtwork = {};

      if (characterArtworkMap != null) {
        for (final entry in characterArtworkMap.entries) {
          final artworkList = (entry.value as List<dynamic>)
              .map((e) => Artwork.fromJson(e as Map<String, dynamic>))
              .toList();
          _characterArtwork![entry.key] = artworkList;
        }
      }
    } catch (e) {
      _characterArtwork = {};
    }
  }

  Future<List<Artwork>> getArtworkByCharacter(String characterId) async {
    await _loadData();
    return _characterArtwork?[characterId] ?? [];
  }
}
