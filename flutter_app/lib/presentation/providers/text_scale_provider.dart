import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

enum TextScaleOption { small, medium, large, extraLarge }

class TextScaleNotifier extends StateNotifier<TextScaleOption> {
  TextScaleNotifier() : super(TextScaleOption.medium) {
    _loadTextScale();
  }

  Future<void> _loadTextScale() async {
    final prefs = await SharedPreferences.getInstance();
    final scaleIndex = prefs.getInt('text_scale') ?? 1; // Default to medium
    state = TextScaleOption.values[scaleIndex];
  }

  Future<void> setTextScale(TextScaleOption scale) async {
    state = scale;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('text_scale', scale.index);
  }

  double get scaleFactor {
    switch (state) {
      case TextScaleOption.small:
        return 0.85;
      case TextScaleOption.medium:
        return 1.0;
      case TextScaleOption.large:
        return 1.15;
      case TextScaleOption.extraLarge:
        return 1.3;
    }
  }
}

final textScaleProvider = StateNotifierProvider<TextScaleNotifier, TextScaleOption>((ref) {
  return TextScaleNotifier();
});

// Helper to get the actual scale factor
final textScaleFactorProvider = Provider<double>((ref) {
  final textScale = ref.watch(textScaleProvider);
  switch (textScale) {
    case TextScaleOption.small:
      return 0.85;
    case TextScaleOption.medium:
      return 1.0;
    case TextScaleOption.large:
      return 1.15;
    case TextScaleOption.extraLarge:
      return 1.3;
  }
});
