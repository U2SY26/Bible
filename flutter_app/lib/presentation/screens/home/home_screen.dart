import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/constants/app_colors.dart';
import '../../providers/filter_provider.dart';
import '../../providers/selection_provider.dart';
import '../graph/graph_screen.dart';
import '../timeline/timeline_screen.dart';
import '../bible_reader/bible_reader_screen.dart';
import '../search/search_screen.dart';
import '../settings/settings_screen.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final selectedIndex = ref.watch(currentTabIndexProvider);

    return Scaffold(
      body: IndexedStack(
        index: selectedIndex,
        children: const [
          GraphScreen(),
          TimelineScreen(),
          BibleReaderScreen(),
          SearchScreen(),
          SettingsScreen(),
        ],
      ),
      bottomNavigationBar: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // 임시 비활성화 - 크래시 테스트
          // const BannerAdWidget(),
          const _BottomNav(),
        ],
      ),
    );
  }
}

class _BottomNav extends ConsumerWidget {
  const _BottomNav();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final lang = ref.watch(languageProvider);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final selectedIndex = ref.watch(currentTabIndexProvider);

    return Container(
      decoration: BoxDecoration(
        color: isDark ? AppColors.surface : Colors.white,
        border: Border(
          top: BorderSide(
            color: isDark ? AppColors.surfaceLight : Colors.grey.shade200,
          ),
        ),
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _NavItem(
                icon: Icons.hub_outlined,
                selectedIcon: Icons.hub,
                label: lang == 'ko' ? '그래프' : 'Graph',
                isSelected: selectedIndex == 0,
                onTap: () => ref.read(currentTabIndexProvider.notifier).state = 0,
              ),
              _NavItem(
                icon: Icons.timeline_outlined,
                selectedIcon: Icons.timeline,
                label: lang == 'ko' ? '타임라인' : 'Timeline',
                isSelected: selectedIndex == 1,
                onTap: () => ref.read(currentTabIndexProvider.notifier).state = 1,
              ),
              _NavItem(
                icon: Icons.menu_book_outlined,
                selectedIcon: Icons.menu_book,
                label: lang == 'ko' ? '성경' : 'Bible',
                isSelected: selectedIndex == 2,
                onTap: () => ref.read(currentTabIndexProvider.notifier).state = 2,
              ),
              _NavItem(
                icon: Icons.search_outlined,
                selectedIcon: Icons.search,
                label: lang == 'ko' ? '검색' : 'Search',
                isSelected: selectedIndex == 3,
                onTap: () => ref.read(currentTabIndexProvider.notifier).state = 3,
              ),
              _NavItem(
                icon: Icons.settings_outlined,
                selectedIcon: Icons.settings,
                label: lang == 'ko' ? '설정' : 'Settings',
                isSelected: selectedIndex == 4,
                onTap: () => ref.read(currentTabIndexProvider.notifier).state = 4,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  final IconData icon;
  final IconData selectedIcon;
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  const _NavItem({
    required this.icon,
    required this.selectedIcon,
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final unselectedColor = isDark ? AppColors.textSecondary : Colors.grey;

    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected
              ? AppColors.primary.withValues(alpha: 0.15)
              : Colors.transparent,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              isSelected ? selectedIcon : icon,
              color: isSelected ? AppColors.primary : unselectedColor,
              size: 22,
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                color: isSelected ? AppColors.primary : unselectedColor,
                fontSize: 11,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
