import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import '../../../core/constants/app_colors.dart';
import '../../../services/ad_service.dart';
import '../../providers/filter_provider.dart';
import '../../providers/selection_provider.dart';
import '../../providers/bookmark_provider.dart';
import 'widgets/graph_canvas.dart';
import 'widgets/filter_bar.dart';
import 'widgets/character_detail_sheet.dart';
import '../favorites/favorites_screen.dart';
import '../daily_verse/daily_verse_screen.dart';

class GraphScreen extends ConsumerStatefulWidget {
  const GraphScreen({super.key});

  @override
  ConsumerState<GraphScreen> createState() => _GraphScreenState();
}

class _GraphScreenState extends ConsumerState<GraphScreen> {
  BannerAd? _bannerAd;
  bool _isBannerAdReady = false;

  @override
  void initState() {
    super.initState();
    _loadBannerAd();
  }

  void _loadBannerAd() {
    if (!AdService().canShowAds) return;

    _bannerAd = AdService().createBannerAd(
      onAdLoaded: (ad) {
        setState(() {
          _isBannerAdReady = true;
        });
      },
      onAdFailedToLoad: (ad, error) {
        debugPrint('Banner ad failed to load: ${error.message}');
        ad.dispose();
      },
    );
    _bannerAd?.load();
  }

  @override
  void dispose() {
    _bannerAd?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final lang = ref.watch(languageProvider);
    final charactersAsync = ref.watch(filteredCharactersProvider);
    final selectedCharacterId = ref.watch(selectedCharacterIdProvider);
    final selectionMode = ref.watch(selectionModeProvider);

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            // Header
            _buildHeader(context, ref, lang),
            // Filter Bar
            const FilterBar(),
            // Graph Canvas
            Expanded(
              child: charactersAsync.when(
                data: (characters) => Stack(
                  children: [
                    GraphCanvas(characters: characters),
                    // detailOpen 모드에서만 팝업 표시
                    if (selectedCharacterId != null && selectionMode == SelectionMode.detailOpen)
                      Positioned(
                        left: 0,
                        right: 0,
                        bottom: 0,
                        child: CharacterDetailSheet(
                          characterId: selectedCharacterId,
                        ),
                      ),
                  ],
                ),
                loading: () => const Center(
                  child: CircularProgressIndicator(color: AppColors.primary),
                ),
                error: (error, stack) => Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.error_outline,
                          size: 48, color: AppColors.accentSecondary),
                      const SizedBox(height: 16),
                      Text(
                        lang == 'ko' ? '데이터 로딩 실패' : 'Failed to load data',
                        style: const TextStyle(color: AppColors.textSecondary),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        error.toString(),
                        style: const TextStyle(
                            color: AppColors.textMuted, fontSize: 12),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              ),
            ),
            // Banner Ad
            if (_isBannerAdReady && _bannerAd != null)
              Container(
                alignment: Alignment.center,
                width: _bannerAd!.size.width.toDouble(),
                height: _bannerAd!.size.height.toDouble(),
                child: AdWidget(ad: _bannerAd!),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context, WidgetRef ref, String lang) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surface : Colors.white,
        border: Border(
          bottom: BorderSide(
            color: isDark ? AppColors.surfaceLight : Colors.grey.shade200,
          ),
        ),
      ),
      child: Row(
        children: [
          // App title with gradient
          ShaderMask(
            shaderCallback: (bounds) => AppColors.primaryGradient.createShader(
              Rect.fromLTWH(0, 0, bounds.width, bounds.height),
            ),
            child: Text(
              lang == 'ko' ? '그래프 성경' : 'Graph Bible',
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ),
          const Spacer(),
          // Language toggle
          GestureDetector(
            onTap: () {
              ref.read(languageProvider.notifier).state =
                  lang == 'ko' ? 'en' : 'ko';
            },
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: isDark ? AppColors.surfaceLight : Colors.grey.shade100,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                lang == 'ko' ? 'EN' : '한국어',
                style: TextStyle(
                  color: isDark ? AppColors.textSecondary : Colors.grey[700],
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ),
          const SizedBox(width: 8),
          // Daily Verse button
          IconButton(
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => const DailyVerseScreen(),
                ),
              );
            },
            icon: const Icon(Icons.auto_stories_outlined),
            color: isDark ? AppColors.textSecondary : Colors.grey[600],
            tooltip: lang == 'ko' ? '오늘의 말씀' : 'Daily Verse',
          ),
          // Favorites button
          Consumer(
            builder: (context, ref, child) {
              final bookmarkCount = ref.watch(bookmarkProvider).length;
              return Stack(
                children: [
                  IconButton(
                    onPressed: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (context) => const FavoritesScreen(),
                        ),
                      );
                    },
                    icon: const Icon(Icons.bookmark_border),
                    color: isDark ? AppColors.textSecondary : Colors.grey[600],
                    tooltip: lang == 'ko' ? '즐겨찾기' : 'Favorites',
                  ),
                  if (bookmarkCount > 0)
                    Positioned(
                      right: 4,
                      top: 4,
                      child: Container(
                        padding: const EdgeInsets.all(4),
                        decoration: const BoxDecoration(
                          color: AppColors.primary,
                          shape: BoxShape.circle,
                        ),
                        child: Text(
                          bookmarkCount > 9 ? '9+' : '$bookmarkCount',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                ],
              );
            },
          ),
          // MBTI Quiz button
          IconButton(
            onPressed: () {
              ref.read(mbtiQuizProvider.notifier).startQuiz();
              _showMbtiQuizDialog(context, ref);
            },
            icon: const Icon(Icons.psychology_outlined),
            color: isDark ? AppColors.textSecondary : Colors.grey[600],
            tooltip: lang == 'ko' ? 'MBTI 퀴즈' : 'MBTI Quiz',
          ),
        ],
      ),
    );
  }

  void _showMbtiQuizDialog(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: isDark ? AppColors.surface : Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => const _MbtiQuizSheet(),
    );
  }
}

class _MbtiQuizSheet extends ConsumerWidget {
  const _MbtiQuizSheet();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final quizState = ref.watch(mbtiQuizProvider);
    final lang = ref.watch(languageProvider);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final questions = [
      {
        'ko': '사람들과 함께 있을 때 에너지가 충전되나요?',
        'en': 'Do you feel energized when with people?',
        'yes': 'E',
        'no': 'I',
      },
      {
        'ko': '가능성보다 사실에 집중하시나요?',
        'en': 'Do you focus on facts rather than possibilities?',
        'yes': 'S',
        'no': 'N',
      },
      {
        'ko': '감정보다 논리를 우선하시나요?',
        'en': 'Do you prioritize logic over feelings?',
        'yes': 'T',
        'no': 'F',
      },
      {
        'ko': '계획된 일정을 선호하시나요?',
        'en': 'Do you prefer a planned schedule?',
        'yes': 'J',
        'no': 'P',
      },
    ];

    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Handle bar
          Container(
            width: 40,
            height: 4,
            decoration: BoxDecoration(
              color: isDark ? AppColors.surfaceLight : Colors.grey.shade300,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(height: 24),

          // Title
          Text(
            lang == 'ko' ? 'MBTI 성격 매칭' : 'MBTI Personality Match',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: isDark ? AppColors.textPrimary : Colors.black87,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            lang == 'ko'
                ? '나와 비슷한 성경 인물을 찾아보세요'
                : 'Find Bible characters similar to you',
            style: TextStyle(
              color: isDark ? AppColors.textSecondary : Colors.grey[600],
              fontSize: 14,
            ),
          ),
          const SizedBox(height: 24),

          // Progress dots
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(4, (i) {
              final isCompleted = i < quizState.currentStep;
              final isCurrent = i == quizState.currentStep;
              return Container(
                width: 12,
                height: 12,
                margin: const EdgeInsets.symmetric(horizontal: 4),
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: isCompleted
                      ? AppColors.primary
                      : isCurrent
                          ? AppColors.accent
                          : isDark
                              ? AppColors.surfaceLight
                              : Colors.grey.shade300,
                ),
              );
            }),
          ),
          const SizedBox(height: 32),

          // Question or Result
          if (quizState.currentStep < 4) ...[
            Text(
              questions[quizState.currentStep][lang] as String,
              style: TextStyle(
                fontSize: 18,
                color: isDark ? AppColors.textPrimary : Colors.black87,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _QuizButton(
                  label: lang == 'ko' ? '예' : 'Yes',
                  color: Colors.green,
                  onTap: () {
                    ref.read(mbtiQuizProvider.notifier).answer(
                          questions[quizState.currentStep]['yes'] as String,
                        );
                  },
                ),
                _QuizButton(
                  label: lang == 'ko' ? '아니오' : 'No',
                  color: Colors.red,
                  onTap: () {
                    ref.read(mbtiQuizProvider.notifier).answer(
                          questions[quizState.currentStep]['no'] as String,
                        );
                  },
                ),
              ],
            ),
          ] else if (quizState.result != null) ...[
            Text(
              lang == 'ko' ? '당신의 MBTI 유형' : 'Your MBTI Type',
              style: TextStyle(
                color: isDark ? AppColors.textSecondary : Colors.grey[600],
                fontSize: 14,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              quizState.result!,
              style: const TextStyle(
                fontSize: 36,
                fontWeight: FontWeight.bold,
                color: AppColors.accent,
              ),
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: Text(
                lang == 'ko' ? '비슷한 인물 보기' : 'View Similar Characters',
              ),
            ),
          ],

          const SizedBox(height: 16),
          TextButton(
            onPressed: () {
              ref.read(mbtiQuizProvider.notifier).reset();
              Navigator.pop(context);
            },
            child: Text(
              lang == 'ko' ? '닫기' : 'Close',
              style: TextStyle(
                color: isDark ? AppColors.textSecondary : Colors.grey[600],
              ),
            ),
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }
}

class _QuizButton extends StatelessWidget {
  final String label;
  final Color color;
  final VoidCallback onTap;

  const _QuizButton({
    required this.label,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 120,
        padding: const EdgeInsets.symmetric(vertical: 16),
        decoration: BoxDecoration(
          color: color.withValues(alpha: 0.2),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: color),
        ),
        child: Text(
          label,
          textAlign: TextAlign.center,
          style: TextStyle(
            color: color,
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}
