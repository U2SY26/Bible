import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'core/constants/app_theme.dart';
import 'presentation/providers/theme_provider.dart';
import 'presentation/providers/text_scale_provider.dart';
import 'presentation/screens/home/home_screen.dart';
import 'presentation/screens/intro/intro_video_screen.dart';
import 'presentation/screens/onboarding/onboarding_screen.dart';
import 'services/ad_service.dart';

// Firebase imports - conditionally used
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'services/analytics_service.dart';
import 'services/force_update_service.dart';
import 'services/notification_service.dart';

bool _firebaseInitialized = false;

void main() async {
  await runZonedGuarded(() async {
    WidgetsFlutterBinding.ensureInitialized();

    try {
      // Try to initialize Firebase (may fail if google-services.json is missing)
      try {
        await Firebase.initializeApp();
        _firebaseInitialized = true;
        debugPrint('Firebase initialized successfully');

        // Setup Crashlytics
        if (!kDebugMode) {
          FlutterError.onError = FirebaseCrashlytics.instance.recordFlutterFatalError;
          PlatformDispatcher.instance.onError = (error, stack) {
            FirebaseCrashlytics.instance.recordError(error, stack, fatal: true);
            return true;
          };
        }

        // Initialize Analytics
        await AnalyticsService().initialize();

        // Initialize Force Update Service
        await ForceUpdateService().initialize();
      } catch (e) {
        debugPrint('Firebase initialization failed (will continue without): $e');
        _firebaseInitialized = false;
      }

      // Initialize Notification Service (works without Firebase)
      try {
        await NotificationService().initialize();
      } catch (e) {
        debugPrint('Notification service initialization failed: $e');
      }

      // Initialize AdMob with GDPR consent
      await AdService().initialize();

      // Check app state
      final prefs = await SharedPreferences.getInstance();
      final onboardingCompleted = prefs.getBool('onboarding_completed') ?? false;

      runApp(
        ProviderScope(
          child: GraphBibleApp(
            showIntroVideo: true, // Always show random intro video
            showOnboarding: !onboardingCompleted,
            isFirstLaunch: !onboardingCompleted,
            firebaseEnabled: _firebaseInitialized,
          ),
        ),
      );
    } catch (e, stack) {
      debugPrint('Error during initialization: $e');
      debugPrint('Stack trace: $stack');

      // Try to log to Crashlytics if available
      if (_firebaseInitialized) {
        try {
          await FirebaseCrashlytics.instance.recordError(e, stack, fatal: true);
        } catch (_) {}
      }

      runApp(
        MaterialApp(
          home: Scaffold(
            backgroundColor: const Color(0xFF0a0a0f),
            body: Center(
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.error_outline,
                      color: Colors.red,
                      size: 64,
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      '앱 초기화 오류',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      '$e',
                      style: const TextStyle(
                        color: Colors.white70,
                        fontSize: 14,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      );
    }
  }, (error, stack) {
    // Catch any errors that escape the main zone
    debugPrint('Uncaught error: $error');
    debugPrint('Stack trace: $stack');
    if (_firebaseInitialized) {
      try {
        FirebaseCrashlytics.instance.recordError(error, stack, fatal: true);
      } catch (_) {}
    }
  });
}

class GraphBibleApp extends ConsumerStatefulWidget {
  final bool showIntroVideo;
  final bool showOnboarding;
  final bool isFirstLaunch;
  final bool firebaseEnabled;

  const GraphBibleApp({
    super.key,
    required this.showIntroVideo,
    required this.showOnboarding,
    this.isFirstLaunch = false,
    this.firebaseEnabled = false,
  });

  @override
  ConsumerState<GraphBibleApp> createState() => _GraphBibleAppState();
}

class _GraphBibleAppState extends ConsumerState<GraphBibleApp> {
  @override
  void initState() {
    super.initState();
    // Check for updates after first frame (only if Firebase is enabled)
    if (widget.firebaseEnabled) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        _checkForUpdates();
      });
    }
  }

  Future<void> _checkForUpdates() async {
    if (!mounted) return;

    // Get language from provider (default to 'ko')
    const lang = 'ko'; // Will be updated when context is ready

    await ForceUpdateService().showUpdateDialog(context, lang);
  }

  @override
  Widget build(BuildContext context) {
    final themeMode = ref.watch(themeProvider);
    final textScaleFactor = ref.watch(textScaleFactorProvider);

    return MaterialApp(
      title: '그래프 성경',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: _getThemeMode(themeMode),
      navigatorObservers: widget.firebaseEnabled
          ? [AnalyticsService().observer]
          : [],
      builder: (context, child) {
        return MediaQuery(
          data: MediaQuery.of(context).copyWith(
            textScaler: TextScaler.linear(textScaleFactor),
          ),
          child: child!,
        );
      },
      home: _getHomeScreen(),
    );
  }

  Widget _getHomeScreen() {
    if (widget.showIntroVideo) {
      return IntroVideoScreen(
        showOnboardingAfter: widget.showOnboarding,
        isFirstLaunch: widget.isFirstLaunch,
      );
    } else if (widget.showOnboarding) {
      return const OnboardingScreen();
    } else {
      return const HomeScreen();
    }
  }

  ThemeMode _getThemeMode(AppThemeMode mode) {
    switch (mode) {
      case AppThemeMode.system:
        return ThemeMode.system;
      case AppThemeMode.light:
        return ThemeMode.light;
      case AppThemeMode.dark:
        return ThemeMode.dark;
    }
  }
}
