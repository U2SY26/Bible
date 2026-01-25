import 'package:flutter/material.dart';
import 'app_colors.dart';

class AppTheme {
  // Light theme colors
  static const Color _lightBackground = Color(0xFFF5F5F7);
  static const Color _lightSurface = Color(0xFFFFFFFF);
  static const Color _lightSurfaceLight = Color(0xFFE5E5EA);
  static const Color _lightTextPrimary = Color(0xFF1C1C1E);
  static const Color _lightTextSecondary = Color(0xFF8E8E93);
  static const Color _lightTextMuted = Color(0xFFAEAEB2);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      scaffoldBackgroundColor: _lightBackground,
      primaryColor: AppColors.primary,
      colorScheme: const ColorScheme.light(
        primary: AppColors.primary,
        secondary: AppColors.accent,
        surface: _lightSurface,
        error: Color(0xFFD32F2F),
        onPrimary: Colors.white,
        onSecondary: Colors.black,
        onSurface: _lightTextPrimary,
        onError: Colors.white,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: _lightSurface,
        foregroundColor: _lightTextPrimary,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: TextStyle(
          color: _lightTextPrimary,
          fontSize: 18,
          fontWeight: FontWeight.w600,
        ),
      ),
      cardTheme: CardThemeData(
        color: _lightSurface,
        elevation: 1,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: _lightSurfaceLight,
        labelStyle: const TextStyle(color: _lightTextPrimary),
        side: BorderSide.none,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: AppColors.primary,
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: _lightSurfaceLight,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.primary),
        ),
        hintStyle: const TextStyle(color: _lightTextMuted),
      ),
      bottomSheetTheme: const BottomSheetThemeData(
        backgroundColor: _lightSurface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
        ),
      ),
      dialogTheme: DialogThemeData(
        backgroundColor: _lightSurface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
      ),
      dividerTheme: const DividerThemeData(
        color: _lightSurfaceLight,
        thickness: 1,
      ),
      textTheme: const TextTheme(
        displayLarge: TextStyle(color: _lightTextPrimary, fontSize: 32, fontWeight: FontWeight.bold),
        displayMedium: TextStyle(color: _lightTextPrimary, fontSize: 28, fontWeight: FontWeight.bold),
        displaySmall: TextStyle(color: _lightTextPrimary, fontSize: 24, fontWeight: FontWeight.bold),
        headlineLarge: TextStyle(color: _lightTextPrimary, fontSize: 22, fontWeight: FontWeight.w600),
        headlineMedium: TextStyle(color: _lightTextPrimary, fontSize: 20, fontWeight: FontWeight.w600),
        headlineSmall: TextStyle(color: _lightTextPrimary, fontSize: 18, fontWeight: FontWeight.w600),
        titleLarge: TextStyle(color: _lightTextPrimary, fontSize: 16, fontWeight: FontWeight.w600),
        titleMedium: TextStyle(color: _lightTextPrimary, fontSize: 14, fontWeight: FontWeight.w500),
        titleSmall: TextStyle(color: _lightTextSecondary, fontSize: 12, fontWeight: FontWeight.w500),
        bodyLarge: TextStyle(color: _lightTextPrimary, fontSize: 16),
        bodyMedium: TextStyle(color: _lightTextPrimary, fontSize: 14),
        bodySmall: TextStyle(color: _lightTextSecondary, fontSize: 12),
        labelLarge: TextStyle(color: _lightTextPrimary, fontSize: 14, fontWeight: FontWeight.w500),
        labelMedium: TextStyle(color: _lightTextSecondary, fontSize: 12),
        labelSmall: TextStyle(color: _lightTextMuted, fontSize: 10),
      ),
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: AppColors.background,
      primaryColor: AppColors.primary,
      colorScheme: const ColorScheme.dark(
        primary: AppColors.primary,
        secondary: AppColors.accent,
        surface: AppColors.surface,
        error: Color(0xFFCF6679),
        onPrimary: Colors.white,
        onSecondary: Colors.black,
        onSurface: AppColors.textPrimary,
        onError: Colors.black,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.surface,
        foregroundColor: AppColors.textPrimary,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: TextStyle(
          color: AppColors.textPrimary,
          fontSize: 18,
          fontWeight: FontWeight.w600,
        ),
      ),
      cardTheme: CardThemeData(
        color: AppColors.surface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
          side: const BorderSide(color: AppColors.surfaceLight),
        ),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: AppColors.surfaceLight,
        labelStyle: const TextStyle(color: AppColors.textPrimary),
        side: BorderSide.none,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: AppColors.primary,
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.surfaceLight,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.primary),
        ),
        hintStyle: const TextStyle(color: AppColors.textMuted),
      ),
      bottomSheetTheme: const BottomSheetThemeData(
        backgroundColor: AppColors.surface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
        ),
      ),
      dialogTheme: DialogThemeData(
        backgroundColor: AppColors.surface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
      ),
      dividerTheme: const DividerThemeData(
        color: AppColors.surfaceLight,
        thickness: 1,
      ),
      textTheme: const TextTheme(
        displayLarge: TextStyle(
          color: AppColors.textPrimary,
          fontSize: 32,
          fontWeight: FontWeight.bold,
        ),
        displayMedium: TextStyle(
          color: AppColors.textPrimary,
          fontSize: 28,
          fontWeight: FontWeight.bold,
        ),
        displaySmall: TextStyle(
          color: AppColors.textPrimary,
          fontSize: 24,
          fontWeight: FontWeight.bold,
        ),
        headlineLarge: TextStyle(
          color: AppColors.textPrimary,
          fontSize: 22,
          fontWeight: FontWeight.w600,
        ),
        headlineMedium: TextStyle(
          color: AppColors.textPrimary,
          fontSize: 20,
          fontWeight: FontWeight.w600,
        ),
        headlineSmall: TextStyle(
          color: AppColors.textPrimary,
          fontSize: 18,
          fontWeight: FontWeight.w600,
        ),
        titleLarge: TextStyle(
          color: AppColors.textPrimary,
          fontSize: 16,
          fontWeight: FontWeight.w600,
        ),
        titleMedium: TextStyle(
          color: AppColors.textPrimary,
          fontSize: 14,
          fontWeight: FontWeight.w500,
        ),
        titleSmall: TextStyle(
          color: AppColors.textSecondary,
          fontSize: 12,
          fontWeight: FontWeight.w500,
        ),
        bodyLarge: TextStyle(
          color: AppColors.textPrimary,
          fontSize: 16,
        ),
        bodyMedium: TextStyle(
          color: AppColors.textPrimary,
          fontSize: 14,
        ),
        bodySmall: TextStyle(
          color: AppColors.textSecondary,
          fontSize: 12,
        ),
        labelLarge: TextStyle(
          color: AppColors.textPrimary,
          fontSize: 14,
          fontWeight: FontWeight.w500,
        ),
        labelMedium: TextStyle(
          color: AppColors.textSecondary,
          fontSize: 12,
        ),
        labelSmall: TextStyle(
          color: AppColors.textMuted,
          fontSize: 10,
        ),
      ),
    );
  }
}
