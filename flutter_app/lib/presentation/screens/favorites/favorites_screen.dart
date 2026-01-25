import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/constants/app_colors.dart';
import '../../../data/models/character.dart';
import '../../providers/data_providers.dart';
import '../../providers/filter_provider.dart';
import '../../providers/selection_provider.dart';
import '../../providers/bookmark_provider.dart';

class FavoritesScreen extends ConsumerWidget {
  const FavoritesScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final lang = ref.watch(languageProvider);
    final bookmarkedIds = ref.watch(bookmarkProvider);

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(context, lang),
            Expanded(
              child: bookmarkedIds.isEmpty
                  ? _buildEmptyState(context, lang)
                  : _buildFavoritesList(context, ref, bookmarkedIds, lang),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context, String lang) {
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
          ShaderMask(
            shaderCallback: (bounds) => AppColors.primaryGradient.createShader(
              Rect.fromLTWH(0, 0, bounds.width, bounds.height),
            ),
            child: Text(
              lang == 'ko' ? '즐겨찾기' : 'Favorites',
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ),
          const Spacer(),
          Text(
            lang == 'ko' ? '저장한 인물' : 'Saved Characters',
            style: TextStyle(
              color: isDark ? AppColors.textMuted : Colors.grey,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState(BuildContext context, String lang) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.bookmark_border,
            size: 64,
            color: isDark ? AppColors.surfaceLight : Colors.grey.shade300,
          ),
          const SizedBox(height: 16),
          Text(
            lang == 'ko' ? '즐겨찾기가 비어있습니다' : 'No favorites yet',
            style: TextStyle(
              color: isDark ? AppColors.textSecondary : Colors.grey[700],
              fontSize: 16,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            lang == 'ko'
                ? '인물 상세 화면에서 북마크 아이콘을 눌러\n즐겨찾기에 추가하세요'
                : 'Tap the bookmark icon on character\ndetails to add favorites',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: isDark ? AppColors.textMuted : Colors.grey,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFavoritesList(
    BuildContext context,
    WidgetRef ref,
    Set<String> bookmarkedIds,
    String lang,
  ) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: bookmarkedIds.length,
      itemBuilder: (context, index) {
        final characterId = bookmarkedIds.elementAt(index);
        return _FavoriteCharacterCard(
          characterId: characterId,
          lang: lang,
        );
      },
    );
  }
}

class _FavoriteCharacterCard extends ConsumerWidget {
  final String characterId;
  final String lang;

  const _FavoriteCharacterCard({
    required this.characterId,
    required this.lang,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final characterAsync = ref.watch(characterByIdProvider(characterId));
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return characterAsync.when(
      data: (character) {
        if (character == null) return const SizedBox.shrink();
        return _buildCard(context, ref, character, isDark);
      },
      loading: () => Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isDark ? AppColors.surface : Colors.white,
          borderRadius: BorderRadius.circular(12),
        ),
        child: const Center(
          child: SizedBox(
            width: 24,
            height: 24,
            child: CircularProgressIndicator(strokeWidth: 2),
          ),
        ),
      ),
      error: (_, __) => const SizedBox.shrink(),
    );
  }

  Widget _buildCard(
    BuildContext context,
    WidgetRef ref,
    Character character,
    bool isDark,
  ) {
    return Dismissible(
      key: Key(characterId),
      direction: DismissDirection.endToStart,
      background: Container(
        margin: const EdgeInsets.only(bottom: 12),
        decoration: BoxDecoration(
          color: Colors.red,
          borderRadius: BorderRadius.circular(12),
        ),
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.only(right: 20),
        child: const Icon(Icons.delete, color: Colors.white),
      ),
      onDismissed: (_) {
        ref.read(bookmarkProvider.notifier).removeBookmark(characterId);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              lang == 'ko' ? '즐겨찾기에서 제거되었습니다' : 'Removed from favorites',
            ),
            action: SnackBarAction(
              label: lang == 'ko' ? '실행 취소' : 'Undo',
              onPressed: () {
                ref.read(bookmarkProvider.notifier).addBookmark(characterId);
              },
            ),
          ),
        );
      },
      child: GestureDetector(
        onTap: () {
          ref.read(selectedCharacterIdProvider.notifier).state = characterId;
        },
        child: Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: isDark ? AppColors.surface : Colors.white,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: isDark ? AppColors.surfaceLight : Colors.grey.shade200,
            ),
          ),
          child: Row(
            children: [
              // Avatar
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.getCharacterColor(
                    character.id,
                    character.importance,
                    character.testament,
                  ),
                ),
                child: Center(
                  child: Text(
                    character.nameKo.substring(0, 1),
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 16),
              // Info
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          lang == 'ko' ? character.nameKo : character.nameEn,
                          style: TextStyle(
                            color: isDark ? AppColors.textPrimary : Colors.black87,
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: character.testament == 'old'
                                ? AppColors.oldTestament.withValues(alpha: 0.2)
                                : character.testament == 'new'
                                    ? AppColors.newTestament.withValues(alpha: 0.2)
                                    : AppColors.bothTestaments.withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            character.testament == 'old'
                                ? (lang == 'ko' ? '구약' : 'OT')
                                : character.testament == 'new'
                                    ? (lang == 'ko' ? '신약' : 'NT')
                                    : (lang == 'ko' ? '구약/신약' : 'OT/NT'),
                            style: TextStyle(
                              color: character.testament == 'old'
                                  ? AppColors.oldTestament
                                  : character.testament == 'new'
                                      ? AppColors.newTestament
                                      : AppColors.bothTestaments,
                              fontSize: 10,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      lang == 'ko'
                          ? character.descriptionKo
                          : character.descriptionEn,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        color: isDark ? AppColors.textMuted : Colors.grey,
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ),
              // Bookmark icon
              Icon(
                Icons.bookmark,
                color: AppColors.primary,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
