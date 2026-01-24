import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/constants/app_colors.dart';
import '../../providers/data_providers.dart';
import '../../providers/filter_provider.dart';
import '../../providers/selection_provider.dart';
import '../graph/graph_screen.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _selectedIndex,
        children: const [
          GraphScreen(),
          _TimelinePlaceholder(),
          _BiblePlaceholder(),
          _SearchPlaceholder(),
        ],
      ),
      bottomNavigationBar: _buildBottomNav(),
    );
  }

  Widget _buildBottomNav() {
    final lang = ref.watch(languageProvider);

    return Container(
      decoration: const BoxDecoration(
        color: AppColors.surface,
        border: Border(
          top: BorderSide(color: AppColors.surfaceLight),
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
                isSelected: _selectedIndex == 0,
                onTap: () => setState(() => _selectedIndex = 0),
              ),
              _NavItem(
                icon: Icons.timeline_outlined,
                selectedIcon: Icons.timeline,
                label: lang == 'ko' ? '타임라인' : 'Timeline',
                isSelected: _selectedIndex == 1,
                onTap: () => setState(() => _selectedIndex = 1),
              ),
              _NavItem(
                icon: Icons.menu_book_outlined,
                selectedIcon: Icons.menu_book,
                label: lang == 'ko' ? '성경' : 'Bible',
                isSelected: _selectedIndex == 2,
                onTap: () => setState(() => _selectedIndex = 2),
              ),
              _NavItem(
                icon: Icons.search_outlined,
                selectedIcon: Icons.search,
                label: lang == 'ko' ? '검색' : 'Search',
                isSelected: _selectedIndex == 3,
                onTap: () => setState(() => _selectedIndex = 3),
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
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected
              ? AppColors.primary.withOpacity(0.2)
              : Colors.transparent,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              isSelected ? selectedIcon : icon,
              color: isSelected ? AppColors.primary : AppColors.textSecondary,
              size: 24,
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                color: isSelected ? AppColors.primary : AppColors.textSecondary,
                fontSize: 12,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Placeholder screens
class _TimelinePlaceholder extends StatelessWidget {
  const _TimelinePlaceholder();

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.timeline, size: 64, color: AppColors.textMuted),
          SizedBox(height: 16),
          Text('타임라인', style: TextStyle(color: AppColors.textSecondary)),
          Text('(개발 중)', style: TextStyle(color: AppColors.textMuted)),
        ],
      ),
    );
  }
}

class _BiblePlaceholder extends StatelessWidget {
  const _BiblePlaceholder();

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.menu_book, size: 64, color: AppColors.textMuted),
          SizedBox(height: 16),
          Text('성경', style: TextStyle(color: AppColors.textSecondary)),
          Text('(개발 중)', style: TextStyle(color: AppColors.textMuted)),
        ],
      ),
    );
  }
}

class _SearchPlaceholder extends StatelessWidget {
  const _SearchPlaceholder();

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.search, size: 64, color: AppColors.textMuted),
          SizedBox(height: 16),
          Text('검색', style: TextStyle(color: AppColors.textSecondary)),
          Text('(개발 중)', style: TextStyle(color: AppColors.textMuted)),
        ],
      ),
    );
  }
}
