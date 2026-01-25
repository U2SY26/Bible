# Flutter wrapper
-keep class io.flutter.app.** { *; }
-keep class io.flutter.plugin.**  { *; }
-keep class io.flutter.util.**  { *; }
-keep class io.flutter.view.**  { *; }
-keep class io.flutter.**  { *; }
-keep class io.flutter.plugins.**  { *; }

# Google Mobile Ads
-keep class com.google.android.gms.ads.** { *; }
-dontwarn com.google.android.gms.ads.**

# Google Play Core (prevent R8 errors)
-dontwarn com.google.android.play.core.**
-keep class com.google.android.play.core.** { *; }

# Prevent R8 from stripping interface information
-keep interface com.google.android.gms.** { *; }
-keep interface io.flutter.** { *; }

# Keep model classes for JSON serialization
-keep class com.graphbible.** { *; }

# Riverpod
-keep class ** implements com.google.gson.TypeAdapterFactory
-keep class ** implements com.google.gson.JsonSerializer
-keep class ** implements com.google.gson.JsonDeserializer
