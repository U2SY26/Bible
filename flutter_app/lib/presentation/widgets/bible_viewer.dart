import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/constants/app_colors.dart';
import '../providers/selection_provider.dart';
import '../providers/filter_provider.dart';

class BibleViewer extends ConsumerWidget {
  const BibleViewer({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(bibleViewerProvider);
    final lang = ref.watch(languageProvider);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    if (state.bookId == null) return const SizedBox.shrink();

    return Container(
      decoration: BoxDecoration(
        color: isDark ? AppColors.surface : Colors.white,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
        boxShadow: const [
          BoxShadow(
            color: Colors.black26,
            blurRadius: 10,
            offset: Offset(0, -2),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Handle bar
          Container(
            margin: const EdgeInsets.only(top: 12),
            width: 40,
            height: 4,
            decoration: BoxDecoration(
              color: isDark ? AppColors.surfaceLight : Colors.grey.shade300,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          // Header
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                // Book name and chapter
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        state.bookName ?? '',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: isDark ? AppColors.textPrimary : Colors.black87,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        '${lang == 'ko' ? '제' : 'Chapter '} ${state.chapter} ${lang == 'ko' ? '장' : ''}',
                        style: TextStyle(
                          fontSize: 14,
                          color: isDark ? AppColors.textSecondary : Colors.grey[600],
                        ),
                      ),
                    ],
                  ),
                ),
                // Chapter navigation
                Row(
                  children: [
                    IconButton(
                      onPressed: state.chapter > 1
                          ? () => ref.read(bibleViewerProvider.notifier).previousChapter()
                          : null,
                      icon: const Icon(Icons.chevron_left),
                      color: isDark ? AppColors.textSecondary : Colors.grey[700],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppColors.primary.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        '${state.chapter} / ${state.totalChapters}',
                        style: const TextStyle(
                          color: AppColors.primary,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    IconButton(
                      onPressed: state.chapter < state.totalChapters
                          ? () => ref.read(bibleViewerProvider.notifier).nextChapter()
                          : null,
                      icon: const Icon(Icons.chevron_right),
                      color: isDark ? AppColors.textSecondary : Colors.grey[700],
                    ),
                  ],
                ),
                // Close button
                IconButton(
                  onPressed: () {
                    ref.read(showBibleViewerProvider.notifier).state = false;
                    ref.read(bibleViewerProvider.notifier).close();
                  },
                  icon: const Icon(Icons.close),
                  color: isDark ? AppColors.textSecondary : Colors.grey[600],
                ),
              ],
            ),
          ),
          // Highlight verse info
          if (state.highlightVerse != null)
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16),
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: BoxDecoration(
                color: AppColors.accent.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(
                  color: AppColors.accent.withValues(alpha: 0.3),
                ),
              ),
              child: Row(
                children: [
                  const Icon(Icons.bookmark, color: AppColors.accent, size: 18),
                  const SizedBox(width: 8),
                  Text(
                    lang == 'ko'
                        ? '${state.highlightVerse}절로 이동했습니다'
                        : 'Jumped to verse ${state.highlightVerse}',
                    style: const TextStyle(
                      color: AppColors.accent,
                      fontSize: 13,
                    ),
                  ),
                ],
              ),
            ),
          const SizedBox(height: 16),
          // Placeholder for actual verse content
          Expanded(
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 16),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: isDark ? AppColors.surfaceLight : Colors.grey.shade50,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.menu_book,
                      size: 48,
                      color: AppColors.primary.withValues(alpha: 0.5),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      lang == 'ko'
                          ? '${state.bookName} ${state.chapter}장'
                          : '${state.bookName} Chapter ${state.chapter}',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                        color: isDark ? AppColors.textPrimary : Colors.black87,
                      ),
                    ),
                    if (state.highlightVerse != null) ...[
                      const SizedBox(height: 8),
                      Text(
                        lang == 'ko'
                            ? '${state.highlightVerse}절'
                            : 'Verse ${state.highlightVerse}',
                        style: const TextStyle(
                          fontSize: 14,
                          color: AppColors.accent,
                        ),
                      ),
                    ],
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }
}
