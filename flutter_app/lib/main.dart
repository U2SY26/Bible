import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'core/constants/app_theme.dart';
import 'presentation/providers/theme_provider.dart';
import 'presentation/providers/text_scale_provider.dart';
import 'presentation/screens/home/home_screen.dart';
import 'presentation/screens/intro/intro_video_screen.dart';
import 'presentation/screens/onboarding/onboarding_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  try {
    // Initialize AdMob with GDPR consent
    // 임시 비활성화 - 크래시 테스트
    // await AdService().initialize();

    // Check app state
    final prefs = await SharedPreferences.getInstance();
    final introVideoWatched = prefs.getBool('intro_video_watched') ?? false;
    final onboardingCompleted = prefs.getBool('onboarding_completed') ?? false;

    runApp(
      ProviderScope(
        child: GraphBibleApp(
          showIntroVideo: !introVideoWatched,
          showOnboarding: !onboardingCompleted,
        ),
      ),
    );
  } catch (e, stack) {
    // 에러 발생 시 기본 앱 실행
    debugPrint('Error during initialization: $e');
    debugPrint('Stack trace: $stack');
    runApp(
      MaterialApp(
        home: Scaffold(
          body: Center(
            child: Text('Error: $e'),
          ),
        ),
      ),
    );
  }
}

class GraphBibleApp extends ConsumerWidget {
  final bool showIntroVideo;
  final bool showOnboarding;

  const GraphBibleApp({
    super.key,
    required this.showIntroVideo,
    required this.showOnboarding,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeProvider);
    final textScaleFactor = ref.watch(textScaleFactorProvider);

    return MaterialApp(
      title: '그래프 성경',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: _getThemeMode(themeMode),
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
    if (showIntroVideo) {
      return IntroVideoScreen(showOnboardingAfter: showOnboarding);
    } else if (showOnboarding) {
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
