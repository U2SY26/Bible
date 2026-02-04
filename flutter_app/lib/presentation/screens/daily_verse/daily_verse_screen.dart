import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:share_plus/share_plus.dart';
import '../../../core/constants/app_colors.dart';
import '../../../core/utils/bible_book_names.dart';
import '../../../data/models/daily_verse.dart';
import '../../../data/repositories/daily_verse_repository.dart';
import '../../providers/filter_provider.dart';
import '../../providers/selection_provider.dart';
import '../../widgets/particle_background.dart';

final dailyVerseProvider = Provider<DailyVerse>((ref) {
  return DailyVerseRepository().getTodayVerse();
});

class DailyVerseScreen extends ConsumerStatefulWidget {
  const DailyVerseScreen({super.key});

  @override
  ConsumerState<DailyVerseScreen> createState() => _DailyVerseScreenState();
}

class _DailyVerseScreenState extends ConsumerState<DailyVerseScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<double> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.0, 0.6, curve: Curves.easeOut),
      ),
    );

    _slideAnimation = Tween<double>(begin: 50.0, end: 0.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.2, 0.8, curve: Curves.easeOutCubic),
      ),
    );

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final verse = ref.watch(dailyVerseProvider);
    final lang = ref.watch(languageProvider);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.background : Colors.white,
      body: Stack(
        children: [
          // Particle background
          const ParticleBackground(),

          // Content
          SafeArea(
            child: Column(
              children: [
                // App bar
                _buildAppBar(lang, isDark),

                // Main content
                Expanded(
                  child: AnimatedBuilder(
                    animation: _controller,
                    builder: (context, child) {
                      return Opacity(
                        opacity: _fadeAnimation.value,
                        child: Transform.translate(
                          offset: Offset(0, _slideAnimation.value),
                          child: child,
                        ),
                      );
                    },
                    child: _buildContent(verse, lang, isDark),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAppBar(String lang, bool isDark) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
      child: Row(
        children: [
          IconButton(
            onPressed: () => Navigator.of(context).pop(),
            icon: Icon(
              Icons.arrow_back,
              color: isDark ? AppColors.textPrimary : Colors.black87,
            ),
          ),
          const SizedBox(width: 8),
          Text(
            lang == 'ko' ? '오늘의 말씀' : 'Daily Verse',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: isDark ? AppColors.textPrimary : Colors.black87,
            ),
          ),
          const Spacer(),
          // Date
          Text(
            _getFormattedDate(lang),
            style: TextStyle(
              fontSize: 14,
              color: isDark ? AppColors.textSecondary : Colors.grey[600],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildContent(DailyVerse verse, String lang, bool isDark) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          const SizedBox(height: 40),

          // Decorative element
          Container(
            width: 60,
            height: 60,
            decoration: BoxDecoration(
              color: AppColors.primary.withValues(alpha: 0.1),
              shape: BoxShape.circle,
            ),
            child: const Icon(
              Icons.menu_book,
              color: AppColors.primary,
              size: 32,
            ),
          ),

          const SizedBox(height: 32),

          // Reference
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            decoration: BoxDecoration(
              color: AppColors.primary.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(
              BibleBookNames.translateRef(verse.ref, lang),
              style: const TextStyle(
                color: AppColors.primary,
                fontSize: 16,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),

          const SizedBox(height: 32),

          // Verse text
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: isDark
                  ? AppColors.surface.withValues(alpha: 0.5)
                  : Colors.grey.shade50,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: AppColors.primary.withValues(alpha: 0.2),
              ),
            ),
            child: Column(
              children: [
                // Quote mark
                Icon(
                  Icons.format_quote,
                  color: AppColors.primary.withValues(alpha: 0.3),
                  size: 40,
                ),
                const SizedBox(height: 16),
                Text(
                  verse.getText(lang),
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 20,
                    height: 1.8,
                    fontWeight: FontWeight.w500,
                    color: isDark ? AppColors.textPrimary : Colors.black87,
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 32),

          // Action buttons
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _buildActionButton(
                icon: Icons.share,
                label: lang == 'ko' ? '공유' : 'Share',
                onPressed: () => _shareVerse(verse, lang),
              ),
              const SizedBox(width: 16),
              _buildActionButton(
                icon: Icons.copy,
                label: lang == 'ko' ? '복사' : 'Copy',
                onPressed: () => _copyVerse(verse, lang),
              ),
              if (verse.relatedCharacterId != null) ...[
                const SizedBox(width: 16),
                _buildActionButton(
                  icon: Icons.person,
                  label: lang == 'ko' ? '인물 보기' : 'Character',
                  onPressed: () => _viewCharacter(verse.relatedCharacterId!),
                ),
              ],
            ],
          ),

          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _buildActionButton({
    required IconData icon,
    required String label,
    required VoidCallback onPressed,
  }) {
    return Material(
      color: AppColors.surfaceLight,
      borderRadius: BorderRadius.circular(12),
      child: InkWell(
        onTap: onPressed,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          child: Column(
            children: [
              Icon(icon, color: AppColors.primary),
              const SizedBox(height: 4),
              Text(
                label,
                style: const TextStyle(
                  color: AppColors.textSecondary,
                  fontSize: 12,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  String _getFormattedDate(String lang) {
    final now = DateTime.now();
    if (lang == 'ko') {
      return '${now.year}년 ${now.month}월 ${now.day}일';
    } else {
      final months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      return '${months[now.month - 1]} ${now.day}, ${now.year}';
    }
  }

  void _shareVerse(DailyVerse verse, String lang) {
    final ref = BibleBookNames.translateRef(verse.ref, lang);
    final text = verse.getText(lang);
    final shareText = lang == 'ko'
        ? '$ref\n\n"$text"\n\n- 그래프 성경 앱에서'
        : '$ref\n\n"$text"\n\n- From Graph Bible App';
    Share.share(shareText);
  }

  void _copyVerse(DailyVerse verse, String lang) {
    final ref = BibleBookNames.translateRef(verse.ref, lang);
    final text = verse.getText(lang);
    Clipboard.setData(ClipboardData(text: '$ref\n$text'));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(lang == 'ko' ? '복사되었습니다' : 'Copied to clipboard'),
        duration: const Duration(seconds: 1),
      ),
    );
  }

  void _viewCharacter(String characterId) {
    // Set the character ID and selection mode
    ref.read(selectedCharacterIdProvider.notifier).state = characterId;
    ref.read(selectionModeProvider.notifier).state = SelectionMode.focused;

    // Navigate to graph tab (index 0)
    ref.read(currentTabIndexProvider.notifier).state = 0;

    // Pop back to home screen
    Navigator.of(context).pop();
  }
}
