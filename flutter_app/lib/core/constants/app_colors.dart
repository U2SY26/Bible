import 'package:flutter/material.dart';

class AppColors {
  // Primary colors - Dark theme with neon accents
  static const Color background = Color(0xFF0D1117);
  static const Color surface = Color(0xFF161B22);
  static const Color surfaceLight = Color(0xFF21262D);
  static const Color surfaceLighter = Color(0xFF30363D);

  // Accent colors
  static const Color primary = Color(0xFF667EEA);
  static const Color primaryLight = Color(0xFF764BA2);
  static const Color accent = Color(0xFFFFD700); // Gold
  static const Color accentSecondary = Color(0xFFFF6B6B);

  // Text colors
  static const Color textPrimary = Color(0xFFE6EDF3);
  static const Color textSecondary = Color(0xFF8B949E);
  static const Color textMuted = Color(0xFF6E7681);

  // Testament colors
  static const Color oldTestament = Color(0xFF4A90D9);
  static const Color newTestament = Color(0xFFE056FD);
  static const Color bothTestaments = Color(0xFFA29BFE);

  // Special character colors
  static const Color godColor = Color(0xFFFFD700);
  static const Color jesusColor = Color(0xFFFF6B6B);
  static const Color holySpiritColor = Color(0xFF74B9FF);

  // Era colors
  static const Map<String, Color> eraColors = {
    'eternal': Color(0xFFFFD700),
    'creation': Color(0xFF228B22),
    'flood': Color(0xFF4169E1),
    'patriarchs': Color(0xFF8B4513),
    'exodus': Color(0xFFDC143C),
    'conquest': Color(0xFF006400),
    'judges': Color(0xFFB8860B),
    'united_kingdom': Color(0xFF9400D3),
    'divided_kingdom': Color(0xFF8B0000),
    'exile': Color(0xFF2F4F4F),
    'return': Color(0xFF32CD32),
    'intertestamental': Color(0xFF696969),
    'new_testament': Color(0xFFFF4500),
  };

  // Gradient colors
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [primary, primaryLight],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient goldGradient = LinearGradient(
    colors: [Color(0xFFFFD700), Color(0xFFFFA500)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient surfaceGradient = LinearGradient(
    colors: [surface, surfaceLight],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );

  // Get color for character by importance and type
  static Color getCharacterColor(String id, int importance, String testament) {
    switch (id) {
      case 'god':
        return godColor;
      case 'jesus':
        return jesusColor;
      case 'holy_spirit':
        return holySpiritColor;
      default:
        if (importance >= 9) return accent;
        switch (testament) {
          case 'old':
            return oldTestament;
          case 'new':
            return newTestament;
          case 'both':
            return bothTestaments;
          default:
            return textSecondary;
        }
    }
  }

  // Get era color
  static Color getEraColor(String era) {
    return eraColors[era] ?? textSecondary;
  }
}
