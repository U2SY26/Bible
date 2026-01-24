import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/material.dart';

part 'relationship.freezed.dart';
part 'relationship.g.dart';

@freezed
class Relationship with _$Relationship {
  const factory Relationship({
    required String source,
    required String target,
    required String type,
    @JsonKey(name: 'label_ko') String? labelKo,
    @JsonKey(name: 'label_en') String? labelEn,
  }) = _Relationship;

  factory Relationship.fromJson(Map<String, dynamic> json) =>
      _$RelationshipFromJson(json);
}

@freezed
class RelationshipColor with _$RelationshipColor {
  const factory RelationshipColor({
    required String color,
    @JsonKey(name: 'label_ko') required String labelKo,
    @JsonKey(name: 'label_en') required String labelEn,
  }) = _RelationshipColor;

  factory RelationshipColor.fromJson(Map<String, dynamic> json) =>
      _$RelationshipColorFromJson(json);
}

@freezed
class RelationshipsData with _$RelationshipsData {
  const factory RelationshipsData({
    required List<Relationship> relationships,
    required Map<String, RelationshipColor> relationshipColors,
  }) = _RelationshipsData;

  factory RelationshipsData.fromJson(Map<String, dynamic> json) =>
      _$RelationshipsDataFromJson(json);
}

// Relationship type colors for visualization
class RelationshipColors {
  static const Map<String, Color> colors = {
    'trinity': Color(0xFFFFD700),      // Gold
    'creator': Color(0xFFFFD700),      // Gold
    'parent': Color(0xFF4A90D9),       // Blue
    'child': Color(0xFF4A90D9),        // Blue
    'spouse': Color(0xFFFF69B4),       // Pink
    'sibling': Color(0xFF98D8C8),      // Teal
    'family': Color(0xFF87CEEB),       // Light blue
    'ancestor': Color(0xFF6B8E23),     // Olive
    'descendant': Color(0xFF6B8E23),   // Olive
    'ally': Color(0xFF32CD32),         // Lime green
    'friend': Color(0xFF32CD32),       // Lime green
    'enemy': Color(0xFFDC143C),        // Crimson
    'rival': Color(0xFFFF6347),        // Tomato
    'mentor': Color(0xFF9370DB),       // Medium purple
    'disciple': Color(0xFF9370DB),     // Medium purple
    'successor': Color(0xFFDDA0DD),    // Plum
    'servant': Color(0xFFA0522D),      // Sienna
    'prophet_to': Color(0xFF8B4513),   // Saddle brown
    'covenant': Color(0xFFFFD700),     // Gold
    'anointed': Color(0xFFFFD700),     // Gold
    'called': Color(0xFFFFD700),       // Gold
    'in_law': Color(0xFFD8BFD8),       // Thistle
    'concubine': Color(0xFFDDA0DD),    // Plum
    'lover': Color(0xFFFF1493),        // Deep pink
    'killed': Color(0xFF8B0000),       // Dark red
    'betrayed': Color(0xFF800000),     // Maroon
    'coworker': Color(0xFF20B2AA),     // Light sea green
    'colleague': Color(0xFF20B2AA),    // Light sea green
    'convert': Color(0xFF98FB98),      // Pale green
    'healed_by': Color(0xFF00FA9A),    // Medium spring green
    'raised_by': Color(0xFF00FF7F),    // Spring green
  };

  static Color getColor(String type) {
    return colors[type] ?? const Color(0xFF808080); // Gray as default
  }
}
