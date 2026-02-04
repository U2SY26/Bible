import 'package:firebase_analytics/firebase_analytics.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:flutter/foundation.dart';

class AnalyticsService {
  static final AnalyticsService _instance = AnalyticsService._internal();
  factory AnalyticsService() => _instance;
  AnalyticsService._internal();

  late final FirebaseAnalytics _analytics;
  late final FirebaseAnalyticsObserver _observer;

  FirebaseAnalyticsObserver get observer => _observer;

  Future<void> initialize() async {
    _analytics = FirebaseAnalytics.instance;
    _observer = FirebaseAnalyticsObserver(analytics: _analytics);

    // Set default user properties
    await _analytics.setAnalyticsCollectionEnabled(true);
  }

  // Log screen view
  Future<void> logScreenView(String screenName) async {
    try {
      await _analytics.logScreenView(screenName: screenName);
    } catch (e) {
      debugPrint('Analytics error: $e');
    }
  }

  // Log character selection
  Future<void> logCharacterSelected(String characterId, String characterName) async {
    try {
      await _analytics.logEvent(
        name: 'character_selected',
        parameters: {
          'character_id': characterId,
          'character_name': characterName,
        },
      );
    } catch (e) {
      debugPrint('Analytics error: $e');
    }
  }

  // Log filter applied
  Future<void> logFilterApplied(String filterType, String filterValue) async {
    try {
      await _analytics.logEvent(
        name: 'filter_applied',
        parameters: {
          'filter_type': filterType,
          'filter_value': filterValue,
        },
      );
    } catch (e) {
      debugPrint('Analytics error: $e');
    }
  }

  // Log search
  Future<void> logSearch(String searchTerm) async {
    try {
      await _analytics.logSearch(searchTerm: searchTerm);
    } catch (e) {
      debugPrint('Analytics error: $e');
    }
  }

  // Log daily verse viewed
  Future<void> logDailyVerseViewed(String verseRef) async {
    try {
      await _analytics.logEvent(
        name: 'daily_verse_viewed',
        parameters: {
          'verse_ref': verseRef,
        },
      );
    } catch (e) {
      debugPrint('Analytics error: $e');
    }
  }

  // Log artwork viewed
  Future<void> logArtworkViewed(String artworkTitle, String characterId) async {
    try {
      await _analytics.logEvent(
        name: 'artwork_viewed',
        parameters: {
          'artwork_title': artworkTitle,
          'character_id': characterId,
        },
      );
    } catch (e) {
      debugPrint('Analytics error: $e');
    }
  }

  // Log share
  Future<void> logShare(String contentType, String itemId) async {
    try {
      await _analytics.logShare(
        contentType: contentType,
        itemId: itemId,
        method: 'app',
      );
    } catch (e) {
      debugPrint('Analytics error: $e');
    }
  }

  // Log language change
  Future<void> logLanguageChanged(String language) async {
    try {
      await _analytics.logEvent(
        name: 'language_changed',
        parameters: {
          'language': language,
        },
      );
      await _analytics.setUserProperty(name: 'language', value: language);
    } catch (e) {
      debugPrint('Analytics error: $e');
    }
  }

  // Log error to Crashlytics
  Future<void> logError(dynamic exception, StackTrace? stackTrace) async {
    try {
      await FirebaseCrashlytics.instance.recordError(
        exception,
        stackTrace,
        fatal: false,
      );
    } catch (e) {
      debugPrint('Crashlytics error: $e');
    }
  }

  // Log fatal error to Crashlytics
  Future<void> logFatalError(dynamic exception, StackTrace? stackTrace) async {
    try {
      await FirebaseCrashlytics.instance.recordError(
        exception,
        stackTrace,
        fatal: true,
      );
    } catch (e) {
      debugPrint('Crashlytics error: $e');
    }
  }

  // Set user ID for analytics
  Future<void> setUserId(String userId) async {
    try {
      await _analytics.setUserId(id: userId);
      await FirebaseCrashlytics.instance.setUserIdentifier(userId);
    } catch (e) {
      debugPrint('Analytics error: $e');
    }
  }
}
