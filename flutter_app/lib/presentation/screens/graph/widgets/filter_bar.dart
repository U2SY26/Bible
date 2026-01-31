import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/constants/app_colors.dart';
import '../../../providers/filter_provider.dart';
import '../../../providers/data_providers.dart';

class FilterBar extends ConsumerStatefulWidget {
  const FilterBar({super.key});

  @override
  ConsumerState<FilterBar> createState() => _FilterBarState();
}

class _FilterBarState extends ConsumerState<FilterBar> {
  bool _showAdvanced = false;
  final TextEditingController _searchController = TextEditingController();

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final filter = ref.watch(filterProvider);
    final lang = ref.watch(languageProvider);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    // Listen for external filter changes to update search field
    if (_searchController.text != filter.searchQuery) {
      _searchController.text = filter.searchQuery;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surface : Colors.white,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Row 1: Testament filter + Search + Advanced toggle
          Row(
            children: [
              _FilterChip(
                label: lang == 'ko' ? '전체' : 'All',
                isSelected: filter.testament == 'both',
                onTap: () =>
                    ref.read(filterProvider.notifier).setTestament('both'),
              ),
              const SizedBox(width: 6),
              _FilterChip(
                label: lang == 'ko' ? '구약' : 'OT',
                isSelected: filter.testament == 'old',
                onTap: () =>
                    ref.read(filterProvider.notifier).setTestament('old'),
                color: AppColors.oldTestament,
              ),
              const SizedBox(width: 6),
              _FilterChip(
                label: lang == 'ko' ? '신약' : 'NT',
                isSelected: filter.testament == 'new',
                onTap: () =>
                    ref.read(filterProvider.notifier).setTestament('new'),
                color: AppColors.newTestament,
              ),
              const SizedBox(width: 8),
              // Search field
              Expanded(
                child: SizedBox(
                  height: 32,
                  child: TextField(
                    controller: _searchController,
                    onChanged: (value) {
                      ref.read(filterProvider.notifier).setSearchQuery(value);
                    },
                    style: TextStyle(
                      fontSize: 12,
                      color: isDark ? AppColors.textPrimary : Colors.black87,
                    ),
                    decoration: InputDecoration(
                      hintText: lang == 'ko' ? '검색...' : 'Search...',
                      hintStyle: TextStyle(
                        color: isDark ? AppColors.textMuted : Colors.grey,
                        fontSize: 12,
                      ),
                      prefixIcon: Icon(
                        Icons.search,
                        size: 16,
                        color: isDark ? AppColors.textMuted : Colors.grey,
                      ),
                      suffixIcon: _searchController.text.isNotEmpty
                          ? GestureDetector(
                              onTap: () {
                                _searchController.clear();
                                ref.read(filterProvider.notifier).setSearchQuery('');
                              },
                              child: Icon(
                                Icons.close,
                                size: 14,
                                color: isDark ? AppColors.textMuted : Colors.grey,
                              ),
                            )
                          : null,
                      contentPadding: const EdgeInsets.symmetric(horizontal: 8),
                      filled: true,
                      fillColor: isDark ? AppColors.surfaceLight : Colors.grey.shade100,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(16),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              // Advanced filter toggle
              GestureDetector(
                onTap: () => setState(() => _showAdvanced = !_showAdvanced),
                child: Container(
                  padding: const EdgeInsets.all(6),
                  decoration: BoxDecoration(
                    color: _showAdvanced
                        ? AppColors.primary.withValues(alpha: 0.2)
                        : (isDark ? AppColors.surfaceLight : Colors.grey.shade100),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Icon(
                    Icons.tune,
                    size: 18,
                    color: _showAdvanced
                        ? AppColors.primary
                        : (isDark ? AppColors.textSecondary : Colors.grey[600]),
                  ),
                ),
              ),
              // Clear filters button
              if (filter.selectedBook != null ||
                  filter.selectedEra != null ||
                  filter.searchQuery.isNotEmpty ||
                  filter.activeQuickFilter != null)
                GestureDetector(
                  onTap: () {
                    ref.read(filterProvider.notifier).clearFilters();
                    _searchController.clear();
                  },
                  child: Container(
                    margin: const EdgeInsets.only(left: 8),
                    padding:
                        const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
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
          // Row 2: Advanced filters (Book, Era dropdowns)
          if (_showAdvanced) ...[
            const SizedBox(height: 8),
            Row(
              children: [
                // Book dropdown
                Expanded(
                  child: _BookDropdown(lang: lang, isDark: isDark),
                ),
                const SizedBox(width: 8),
                // Era dropdown
                Expanded(
                  child: _EraDropdown(lang: lang, isDark: isDark),
                ),
              ],
            ),
          ],
          const SizedBox(height: 8),
          // Row 3: Quick filters
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

class _BookDropdown extends ConsumerWidget {
  final String lang;
  final bool isDark;

  const _BookDropdown({required this.lang, required this.isDark});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final booksAsync = ref.watch(allBooksProvider);
    final filter = ref.watch(filterProvider);

    return booksAsync.when(
      data: (books) {
        // Filter books by testament if selected
        var filteredBooks = books;
        if (filter.testament == 'old') {
          filteredBooks = books.where((b) =>
            ['pentateuch', 'history', 'poetry', 'major_prophets', 'minor_prophets']
                .contains(b.category)).toList();
        } else if (filter.testament == 'new') {
          filteredBooks = books.where((b) =>
            ['gospels', 'history_nt', 'pauline', 'general', 'prophecy']
                .contains(b.category)).toList();
        }

        return Container(
          height: 36,
          padding: const EdgeInsets.symmetric(horizontal: 10),
          decoration: BoxDecoration(
            color: isDark ? AppColors.surfaceLight : Colors.grey.shade100,
            borderRadius: BorderRadius.circular(12),
            border: filter.selectedBook != null
                ? Border.all(color: AppColors.primary, width: 1)
                : null,
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<String?>(
              value: filter.selectedBook,
              isExpanded: true,
              icon: Icon(
                Icons.arrow_drop_down,
                color: isDark ? AppColors.textSecondary : Colors.grey[600],
              ),
              hint: Text(
                lang == 'ko' ? '성경' : 'Book',
                style: TextStyle(
                  color: isDark ? AppColors.textMuted : Colors.grey,
                  fontSize: 12,
                ),
              ),
              dropdownColor: isDark ? AppColors.surface : Colors.white,
              style: TextStyle(
                color: isDark ? AppColors.textPrimary : Colors.black87,
                fontSize: 12,
              ),
              items: [
                DropdownMenuItem<String?>(
                  value: null,
                  child: Text(
                    lang == 'ko' ? '전체 성경' : 'All Books',
                    style: TextStyle(
                      color: isDark ? AppColors.textSecondary : Colors.grey[700],
                      fontSize: 12,
                    ),
                  ),
                ),
                ...filteredBooks.map((book) => DropdownMenuItem<String?>(
                      value: book.id,
                      child: Text(
                        lang == 'ko' ? book.nameKo : book.nameEn,
                        style: const TextStyle(fontSize: 12),
                      ),
                    )),
              ],
              onChanged: (value) {
                ref.read(filterProvider.notifier).setBook(value);
              },
            ),
          ),
        );
      },
      loading: () => Container(
        height: 36,
        padding: const EdgeInsets.symmetric(horizontal: 10),
        decoration: BoxDecoration(
          color: isDark ? AppColors.surfaceLight : Colors.grey.shade100,
          borderRadius: BorderRadius.circular(12),
        ),
        child: const Center(child: SizedBox(
          width: 16, height: 16,
          child: CircularProgressIndicator(strokeWidth: 2),
        )),
      ),
      error: (_, __) => const SizedBox.shrink(),
    );
  }
}

class _EraDropdown extends ConsumerWidget {
  final String lang;
  final bool isDark;

  const _EraDropdown({required this.lang, required this.isDark});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final erasAsync = ref.watch(allErasProvider);
    final filter = ref.watch(filterProvider);

    return erasAsync.when(
      data: (eras) {
        return Container(
          height: 36,
          padding: const EdgeInsets.symmetric(horizontal: 10),
          decoration: BoxDecoration(
            color: isDark ? AppColors.surfaceLight : Colors.grey.shade100,
            borderRadius: BorderRadius.circular(12),
            border: filter.selectedEra != null
                ? Border.all(color: AppColors.accent, width: 1)
                : null,
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<String?>(
              value: filter.selectedEra,
              isExpanded: true,
              icon: Icon(
                Icons.arrow_drop_down,
                color: isDark ? AppColors.textSecondary : Colors.grey[600],
              ),
              hint: Text(
                lang == 'ko' ? '시대' : 'Era',
                style: TextStyle(
                  color: isDark ? AppColors.textMuted : Colors.grey,
                  fontSize: 12,
                ),
              ),
              dropdownColor: isDark ? AppColors.surface : Colors.white,
              style: TextStyle(
                color: isDark ? AppColors.textPrimary : Colors.black87,
                fontSize: 12,
              ),
              items: [
                DropdownMenuItem<String?>(
                  value: null,
                  child: Text(
                    lang == 'ko' ? '전체 시대' : 'All Eras',
                    style: TextStyle(
                      color: isDark ? AppColors.textSecondary : Colors.grey[700],
                      fontSize: 12,
                    ),
                  ),
                ),
                ...eras.map((era) => DropdownMenuItem<String?>(
                      value: era.id,
                      child: Text(
                        lang == 'ko' ? era.nameKo : era.nameEn,
                        style: const TextStyle(fontSize: 12),
                      ),
                    )),
              ],
              onChanged: (value) {
                ref.read(filterProvider.notifier).setEra(value);
              },
            ),
          ),
        );
      },
      loading: () => Container(
        height: 36,
        padding: const EdgeInsets.symmetric(horizontal: 10),
        decoration: BoxDecoration(
          color: isDark ? AppColors.surfaceLight : Colors.grey.shade100,
          borderRadius: BorderRadius.circular(12),
        ),
        child: const Center(child: SizedBox(
          width: 16, height: 16,
          child: CircularProgressIndicator(strokeWidth: 2),
        )),
      ),
      error: (_, __) => const SizedBox.shrink(),
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
