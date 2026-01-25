import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/constants/app_colors.dart';
import '../../../providers/filter_provider.dart';

class FilterBar extends ConsumerWidget {
  const FilterBar({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final filter = ref.watch(filterProvider);
    final lang = ref.watch(languageProvider);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surface : Colors.white,
      ),
      child: Column(
        children: [
          // Testament filter
          Row(
            children: [
              _FilterChip(
                label: lang == 'ko' ? '전체' : 'All',
                isSelected: filter.testament == 'both',
                onTap: () =>
                    ref.read(filterProvider.notifier).setTestament('both'),
              ),
              const SizedBox(width: 8),
              _FilterChip(
                label: lang == 'ko' ? '구약' : 'OT',
                isSelected: filter.testament == 'old',
                onTap: () =>
                    ref.read(filterProvider.notifier).setTestament('old'),
                color: AppColors.oldTestament,
              ),
              const SizedBox(width: 8),
              _FilterChip(
                label: lang == 'ko' ? '신약' : 'NT',
                isSelected: filter.testament == 'new',
                onTap: () =>
                    ref.read(filterProvider.notifier).setTestament('new'),
                color: AppColors.newTestament,
              ),
              const Spacer(),
              // Clear filters button
              if (filter.selectedBook != null ||
                  filter.selectedEra != null ||
                  filter.searchQuery.isNotEmpty)
                GestureDetector(
                  onTap: () => ref.read(filterProvider.notifier).clearFilters(),
                  child: Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.clear,
                            size: 14, color: isDark ? AppColors.textMuted : Colors.grey),
                        const SizedBox(width: 4),
                        Text(
                          lang == 'ko' ? '초기화' : 'Clear',
                          style: TextStyle(
                            color: isDark ? AppColors.textMuted : Colors.grey,
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
            ],
          ),
          const SizedBox(height: 8),
          // Quick filters
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: quickFilters.map((f) {
                final id = f['id'] as String;
                final label =
                    (lang == 'ko' ? f['label_ko'] : f['label_en']) as String;
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: _FilterChip(
                    label: label,
                    isSelected: filter.activeQuickFilter == id,
                    onTap: () {
                      if (filter.activeQuickFilter == id) {
                        ref.read(filterProvider.notifier).setQuickFilter(null);
                      } else {
                        ref.read(filterProvider.notifier).setQuickFilter(id);
                      }
                    },
                  ),
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }
}

class _FilterChip extends StatelessWidget {
  final String label;
  final bool isSelected;
  final VoidCallback onTap;
  final Color? color;

  const _FilterChip({
    required this.label,
    required this.isSelected,
    required this.onTap,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final effectiveColor = color ?? AppColors.primary;

    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected
              ? effectiveColor.withValues(alpha: 0.2)
              : isDark
                  ? AppColors.surfaceLight
                  : Colors.grey.shade100,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isSelected ? effectiveColor : Colors.transparent,
            width: 1,
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: isSelected
                ? effectiveColor
                : isDark
                    ? AppColors.textSecondary
                    : Colors.grey[700],
            fontSize: 12,
            fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
          ),
        ),
      ),
    );
  }
}
