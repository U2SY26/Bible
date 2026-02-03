import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:share_plus/share_plus.dart';
import '../../../../core/constants/app_colors.dart';
import '../../../../data/models/character.dart';
import '../../../../data/models/relationship.dart';
import '../../../../data/models/event.dart';
import '../../../../data/models/hymn.dart';
import '../../../../data/models/location.dart';
import '../../../../data/models/artwork.dart';
import '../../../../core/utils/bible_book_names.dart';
import '../../../providers/data_providers.dart';
import '../../../widgets/artwork_fullscreen_viewer.dart';
import '../../../providers/filter_provider.dart';
import '../../../providers/selection_provider.dart';
import '../../../providers/bookmark_provider.dart';

class CharacterDetailSheet extends ConsumerWidget {
  final String characterId;

  const CharacterDetailSheet({super.key, required this.characterId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final characterAsync = ref.watch(characterByIdProvider(characterId));

    return characterAsync.when(
      data: (character) {
        if (character == null) return const SizedBox.shrink();
        return _CharacterDetailContent(character: character);
      },
      loading: () => Container(
        height: 200,
        decoration: const BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
        ),
        child: const Center(
          child: CircularProgressIndicator(color: AppColors.primary),
        ),
      ),
      error: (_, __) => const SizedBox.shrink(),
    );
  }
}

class _CharacterDetailContent extends ConsumerStatefulWidget {
  final Character character;

  const _CharacterDetailContent({required this.character});

  @override
  ConsumerState<_CharacterDetailContent> createState() =>
      _CharacterDetailContentState();
}

class _CharacterDetailContentState
    extends ConsumerState<_CharacterDetailContent> {
  double _sheetHeight = 0.5;

  @override
  Widget build(BuildContext context) {
    final lang = ref.watch(languageProvider);
    final char = widget.character;
    final screenHeight = MediaQuery.of(context).size.height;

    // Load related data
    final relationshipsAsync =
        ref.watch(relationshipsByCharacterProvider(char.id));
    final eventsAsync = ref.watch(eventsByCharacterProvider(char.id));
    final hymnsAsync = ref.watch(hymnsByCharacterProvider(char.id));
    final locationsAsync = ref.watch(locationsByCharacterProvider(char.id));
    final artworkAsync = ref.watch(artworkByCharacterProvider(char.id));

    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Semantics(
      label: lang == 'ko' ? '인물 상세 정보' : 'Character details',
      child: GestureDetector(
        onVerticalDragUpdate: (details) {
          setState(() {
            _sheetHeight -= details.delta.dy / screenHeight;
            _sheetHeight = _sheetHeight.clamp(0.25, 0.9);
          });
        },
        child: Container(
          height: screenHeight * _sheetHeight,
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
            children: [
              // Handle bar
              Semantics(
                label: lang == 'ko' ? '드래그하여 크기 조절' : 'Drag to resize',
                child: Container(
                  margin: const EdgeInsets.only(top: 12),
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(
                    color: isDark ? AppColors.surfaceLight : Colors.grey.shade300,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
            // Header
            _buildHeader(char, lang),
            // Content
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Description
                    Semantics(
                      label: lang == 'ko' ? '설명' : 'Description',
                      child: Text(
                        lang == 'ko' ? char.descriptionKo : char.descriptionEn,
                        style: TextStyle(
                          color: isDark ? AppColors.textSecondary : Colors.grey[700],
                          fontSize: 14,
                          height: 1.5,
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),

                    // Labels
                    if (char.labels.isNotEmpty) ...[
                      _buildLabels(char.labels),
                      const SizedBox(height: 16),
                    ],

                    // Key verses
                    if (char.verses.isNotEmpty) ...[
                      _buildSectionTitle(
                          lang == 'ko' ? '주요 성경 구절' : 'Key Verses',
                          Icons.menu_book),
                      const SizedBox(height: 8),
                      ...char.verses.take(3).map(
                          (verse) => _buildVerseCard(verse, lang)),
                      const SizedBox(height: 16),
                    ],

                    // Related Characters
                    relationshipsAsync.when(
                      data: (relationships) => relationships.isNotEmpty
                          ? _buildRelatedCharacters(relationships, char.id, lang)
                          : const SizedBox.shrink(),
                      loading: () => const SizedBox.shrink(),
                      error: (_, __) => const SizedBox.shrink(),
                    ),

                    // Events
                    eventsAsync.when(
                      data: (events) => events.isNotEmpty
                          ? _buildEvents(events, lang)
                          : const SizedBox.shrink(),
                      loading: () => const SizedBox.shrink(),
                      error: (_, __) => const SizedBox.shrink(),
                    ),

                    // Hymns
                    hymnsAsync.when(
                      data: (hymns) => hymns.isNotEmpty
                          ? _buildHymns(hymns, lang)
                          : const SizedBox.shrink(),
                      loading: () => const SizedBox.shrink(),
                      error: (_, __) => const SizedBox.shrink(),
                    ),

                    // Locations
                    locationsAsync.when(
                      data: (locations) => locations.isNotEmpty
                          ? _buildLocations(locations, lang)
                          : const SizedBox.shrink(),
                      loading: () => const SizedBox.shrink(),
                      error: (_, __) => const SizedBox.shrink(),
                    ),

                    // Artwork
                    artworkAsync.when(
                      data: (artworks) => artworks.isNotEmpty
                          ? _buildArtwork(artworks, lang)
                          : const SizedBox.shrink(),
                      loading: () => const SizedBox.shrink(),
                      error: (_, __) => const SizedBox.shrink(),
                    ),

                    const SizedBox(height: 24),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    ),
    );
  }

  Widget _buildHeader(Character char, String lang) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Semantics(
      header: true,
      label: lang == 'ko' ? char.nameKo : char.nameEn,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            // Character avatar
            Container(
              width: 60,
              height: 60,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: LinearGradient(
                  colors: [
                    AppColors.getCharacterColor(
                        char.id, char.importance, char.testament),
                    AppColors.getCharacterColor(
                            char.id, char.importance, char.testament)
                        .withValues(alpha: 0.7),
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              child: Center(
                child: Text(
                  char.nameKo.substring(0, 1),
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 16),
            // Name and info
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    lang == 'ko' ? char.nameKo : char.nameEn,
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: isDark ? AppColors.textPrimary : Colors.black87,
                    ),
                  ),
                const SizedBox(height: 4),
                Wrap(
                  spacing: 6,
                  runSpacing: 4,
                  children: [
                    _Badge(
                      label: char.testament == 'old'
                          ? (lang == 'ko' ? '구약' : 'OT')
                          : char.testament == 'new'
                              ? (lang == 'ko' ? '신약' : 'NT')
                              : (lang == 'ko' ? '구약/신약' : 'OT/NT'),
                      color: char.testament == 'old'
                          ? AppColors.oldTestament
                          : char.testament == 'new'
                              ? AppColors.newTestament
                              : AppColors.bothTestaments,
                    ),
                    _Badge(
                      label:
                          '${lang == 'ko' ? '중요도' : 'Imp'} ${char.importance}',
                      color: AppColors.accent,
                    ),
                    if (char.mbti != null)
                      _Badge(
                        label: char.mbti!,
                        color: AppColors.primary,
                      ),
                  ],
                ),
              ],
            ),
          ),
          // Share button
          Semantics(
            button: true,
            label: lang == 'ko' ? '공유' : 'Share',
            child: IconButton(
              onPressed: () => _shareCharacter(char, lang),
              icon: const Icon(Icons.share_outlined),
              color: isDark ? AppColors.textSecondary : Colors.grey[600],
            ),
          ),
          // Bookmark button
          Semantics(
            button: true,
            label: lang == 'ko' ? '즐겨찾기' : 'Bookmark',
            child: Consumer(
              builder: (context, ref, child) {
                final isBookmarked = ref.watch(isBookmarkedProvider(char.id));
                return IconButton(
                  onPressed: () {
                    ref.read(bookmarkProvider.notifier).toggleBookmark(char.id);
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text(
                          isBookmarked
                              ? (lang == 'ko' ? '즐겨찾기에서 제거되었습니다' : 'Removed from favorites')
                              : (lang == 'ko' ? '즐겨찾기에 추가되었습니다' : 'Added to favorites'),
                        ),
                        duration: const Duration(seconds: 1),
                      ),
                    );
                  },
                  icon: Icon(
                    isBookmarked ? Icons.bookmark : Icons.bookmark_border,
                  ),
                  color: isBookmarked ? AppColors.primary : (isDark ? AppColors.textSecondary : Colors.grey[600]),
                );
              },
            ),
          ),
          // Close button
          Semantics(
            button: true,
            label: lang == 'ko' ? '닫기' : 'Close',
            child: IconButton(
              onPressed: () {
                ref.read(selectedCharacterIdProvider.notifier).state = null;
              },
              icon: const Icon(Icons.close),
              color: isDark ? AppColors.textSecondary : Colors.grey[600],
            ),
          ),
        ],
      ),
    ),
    );
  }

  void _shareCharacter(Character char, String lang) {
    final name = lang == 'ko' ? char.nameKo : char.nameEn;
    final description = lang == 'ko' ? char.descriptionKo : char.descriptionEn;
    final testament = char.testament == 'old'
        ? (lang == 'ko' ? '구약' : 'Old Testament')
        : char.testament == 'new'
            ? (lang == 'ko' ? '신약' : 'New Testament')
            : (lang == 'ko' ? '구약/신약' : 'Old & New Testament');

    final verse = char.verses.isNotEmpty
        ? '\n\n${char.verses.first.ref}\n"${lang == 'ko' ? char.verses.first.textKo : char.verses.first.textEn}"'
        : '';

    final shareText = lang == 'ko'
        ? '''$name ($testament)

$description$verse

- 그래프 성경 앱에서 더 많은 성경 인물을 만나보세요!'''
        : '''$name ($testament)

$description$verse

- Discover more Bible characters in Graph Bible app!''';

    Share.share(shareText, subject: name);
  }

  Widget _buildLabels(List<String> labels) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: labels
          .map((label) => Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: isDark ? AppColors.surfaceLight : Colors.grey.shade100,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  label,
                  style: TextStyle(
                    color: isDark ? AppColors.textSecondary : Colors.grey[700],
                    fontSize: 12,
                  ),
                ),
              ))
          .toList(),
    );
  }

  Widget _buildSectionTitle(String title, IconData icon) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Semantics(
      header: true,
      child: Row(
        children: [
          Icon(icon, size: 18, color: AppColors.primary),
          const SizedBox(width: 8),
          Text(
            title,
            style: TextStyle(
              color: isDark ? AppColors.textPrimary : Colors.black87,
              fontSize: 14,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildVerseCard(CharacterVerse verse, String lang) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final displayRef = BibleBookNames.translateRef(verse.ref, lang);

    return Semantics(
      label: '$displayRef: ${lang == 'ko' ? verse.textKo : verse.textEn}',
      child: GestureDetector(
        onTap: () => _openBibleViewer(verse.ref, lang),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          margin: const EdgeInsets.only(bottom: 8),
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: isDark ? AppColors.surfaceLight : Colors.grey.shade50,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(
              color: AppColors.primary.withValues(alpha: 0.3),
            ),
          ),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      displayRef,
                      style: const TextStyle(
                        color: AppColors.primary,
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      lang == 'ko' ? verse.textKo : verse.textEn,
                      style: TextStyle(
                        color: isDark ? AppColors.textSecondary : Colors.grey[700],
                        fontSize: 13,
                        fontStyle: FontStyle.italic,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              Icon(
                Icons.chevron_right,
                color: AppColors.primary.withValues(alpha: 0.6),
                size: 20,
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _openBibleViewer(String verseRef, String lang) {
    final parsed = BibleBookNames.parseRef(verseRef);
    if (parsed.bookId != null && parsed.bookName != null) {
      // BibleViewer 열기
      ref.read(bibleViewerProvider.notifier).openBook(
        parsed.bookId!,
        parsed.bookName!,
        parsed.totalChapters,
        chapter: parsed.chapter,
        highlightVerse: parsed.verse,
      );
      ref.read(showBibleViewerProvider.notifier).state = true;
    }
  }

  Widget _buildRelatedCharacters(
      List<Relationship> relationships, String charId, String lang) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionTitle(
            lang == 'ko' ? '관련 인물' : 'Related Characters', Icons.people),
        const SizedBox(height: 8),
        SizedBox(
          height: 100,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: relationships.length,
            itemBuilder: (context, index) {
              final rel = relationships[index];
              final relatedId = rel.source == charId ? rel.target : rel.source;
              return _RelatedCharacterCard(
                characterId: relatedId,
                relationshipType: rel.type,
                lang: lang,
                onTap: () {
                  // 부드러운 전환: focused 모드로 전환하며 노드 선택
                  ref.read(selectedCharacterIdProvider.notifier).state = relatedId;
                  ref.read(selectionModeProvider.notifier).state = SelectionMode.focused;
                },
              );
            },
          ),
        ),
        const SizedBox(height: 16),
      ],
    );
  }

  Widget _buildEvents(List<BibleEvent> events, String lang) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionTitle(lang == 'ko' ? '관련 사건' : 'Related Events',
            Icons.event_note),
        const SizedBox(height: 8),
        ...events.take(3).map((event) => GestureDetector(
              onTap: () => _onEventTap(event, lang),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                margin: const EdgeInsets.only(bottom: 8),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: isDark ? AppColors.surfaceLight : Colors.grey.shade50,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: AppColors.accent.withValues(alpha: 0.2),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Icon(Icons.event, color: AppColors.accent, size: 20),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            lang == 'ko' ? event.nameKo : event.nameEn,
                            style: TextStyle(
                              color: isDark ? AppColors.textPrimary : Colors.black87,
                              fontSize: 13,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          Text(
                            event.year < 0
                                ? 'BC ${-event.year}'
                                : 'AD ${event.year}',
                            style: const TextStyle(
                              color: AppColors.textMuted,
                              fontSize: 11,
                            ),
                          ),
                          if (event.verses.isNotEmpty)
                            Text(
                              event.verses.first,
                              style: TextStyle(
                                color: AppColors.primary.withValues(alpha: 0.8),
                                fontSize: 10,
                              ),
                            ),
                        ],
                      ),
                    ),
                    if (event.verses.isNotEmpty || event.characters.isNotEmpty)
                      Icon(
                        Icons.chevron_right,
                        color: AppColors.accent.withValues(alpha: 0.6),
                        size: 20,
                      ),
                  ],
                ),
              ),
            )),
        const SizedBox(height: 16),
      ],
    );
  }

  void _onEventTap(BibleEvent event, String lang) {
    // 성경 구절이 있으면 BibleViewer로 이동
    if (event.verses.isNotEmpty) {
      _openBibleViewer(event.verses.first, lang);
    }
    // 관련 인물이 있으면 첫 번째 인물로 이동 (현재 인물 제외)
    else if (event.characters.isNotEmpty) {
      final currentCharId = widget.character.id;
      final otherCharacter = event.characters.firstWhere(
        (id) => id != currentCharId,
        orElse: () => event.characters.first,
      );
      if (otherCharacter != currentCharId) {
        ref.read(selectedCharacterIdProvider.notifier).state = otherCharacter;
        ref.read(selectionModeProvider.notifier).state = SelectionMode.focused;
      }
    }
  }

  Widget _buildHymns(List<Hymn> hymns, String lang) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionTitle(
            lang == 'ko' ? '관련 찬송가' : 'Related Hymns', Icons.music_note),
        const SizedBox(height: 8),
        ...hymns.take(3).map((hymn) => Container(
              margin: const EdgeInsets.only(bottom: 8),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.surfaceLight,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                children: [
                  Container(
                    width: 36,
                    height: 36,
                    decoration: BoxDecoration(
                      color: AppColors.primary.withValues(alpha: 0.2),
                      shape: BoxShape.circle,
                    ),
                    child: Center(
                      child: Text(
                        '${hymn.number}',
                        style: const TextStyle(
                          color: AppColors.primary,
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      lang == 'ko' ? hymn.titleKo : hymn.titleEn,
                      style: const TextStyle(
                        color: AppColors.textPrimary,
                        fontSize: 13,
                      ),
                    ),
                  ),
                ],
              ),
            )),
        const SizedBox(height: 16),
      ],
    );
  }

  Widget _buildLocations(List<BibleLocation> locations, String lang) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionTitle(
            lang == 'ko' ? '관련 장소' : 'Related Locations', Icons.place),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: locations.take(5).map((loc) => Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: AppColors.surfaceLight,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: AppColors.accent.withValues(alpha: 0.3),
                  ),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.place,
                        size: 14, color: AppColors.accent),
                    const SizedBox(width: 4),
                    Text(
                      lang == 'ko' ? loc.nameKo : loc.nameEn,
                      style: const TextStyle(
                        color: AppColors.textSecondary,
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              )).toList(),
        ),
        const SizedBox(height: 16),
      ],
    );
  }

  Widget _buildArtwork(List<Artwork> artworks, String lang) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionTitle(
            lang == 'ko' ? '관련 미술 작품' : 'Related Artwork', Icons.palette),
        const SizedBox(height: 4),
        Text(
          lang == 'ko' ? '더블탭하여 확대' : 'Double-tap to enlarge',
          style: const TextStyle(
            color: AppColors.textMuted,
            fontSize: 10,
          ),
        ),
        const SizedBox(height: 8),
        SizedBox(
          height: 150,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: artworks.length > 5 ? 5 : artworks.length,
            itemBuilder: (context, index) {
              final artwork = artworks[index];
              return GestureDetector(
                onDoubleTap: () {
                  ArtworkFullscreenViewer.show(context, artwork, lang);
                },
                child: Container(
                  width: 200,
                  margin: const EdgeInsets.only(right: 12),
                  decoration: BoxDecoration(
                    color: AppColors.surfaceLight,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: AppColors.primary.withValues(alpha: 0.2),
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Artwork image
                      Expanded(
                        child: ClipRRect(
                          borderRadius: const BorderRadius.vertical(
                              top: Radius.circular(12)),
                          child: Hero(
                            tag: 'artwork_${artwork.url}',
                            child: Image.network(
                              artwork.url,
                              width: double.infinity,
                              fit: BoxFit.cover,
                              errorBuilder: (context, error, stackTrace) {
                                return Container(
                                  color: AppColors.surfaceLight,
                                  child: const Center(
                                    child: Icon(
                                      Icons.image_not_supported,
                                      color: AppColors.textMuted,
                                      size: 32,
                                    ),
                                  ),
                                );
                              },
                              loadingBuilder: (context, child, loadingProgress) {
                                if (loadingProgress == null) return child;
                                return Container(
                                  color: AppColors.surfaceLight,
                                  child: const Center(
                                    child: CircularProgressIndicator(
                                      strokeWidth: 2,
                                      color: AppColors.primary,
                                    ),
                                  ),
                                );
                              },
                            ),
                          ),
                        ),
                      ),
                      // Artwork info
                      Padding(
                        padding: const EdgeInsets.all(8),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              artwork.getTitle(lang),
                              style: const TextStyle(
                                color: AppColors.textPrimary,
                                fontSize: 11,
                                fontWeight: FontWeight.w500,
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                            if (artwork.getArtist(lang).isNotEmpty && artwork.getArtist(lang) != 'Unknown')
                              Text(
                                '${artwork.getArtist(lang)}${artwork.year.isNotEmpty ? ' (${artwork.year})' : ''}',
                                style: const TextStyle(
                                  color: AppColors.textMuted,
                                  fontSize: 10,
                                ),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 16),
      ],
    );
  }
}

class _Badge extends StatelessWidget {
  final String label;
  final Color color;

  const _Badge({required this.label, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: color.withValues(alpha: 0.5)),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: color,
          fontSize: 10,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}

class _RelatedCharacterCard extends ConsumerWidget {
  final String characterId;
  final String relationshipType;
  final String lang;
  final VoidCallback onTap;

  const _RelatedCharacterCard({
    required this.characterId,
    required this.relationshipType,
    required this.lang,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final characterAsync = ref.watch(characterByIdProvider(characterId));

    return characterAsync.when(
      data: (character) {
        if (character == null) return const SizedBox.shrink();

        final relColor = RelationshipColors.getColor(relationshipType);

        return GestureDetector(
          onTap: onTap,
          child: Container(
            width: 80,
            margin: const EdgeInsets.only(right: 12),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 50,
                  height: 50,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: LinearGradient(
                      colors: [
                        AppColors.getCharacterColor(
                            character.id, character.importance, character.testament),
                        AppColors.getCharacterColor(
                                character.id, character.importance, character.testament)
                            .withValues(alpha: 0.7),
                      ],
                    ),
                    border: Border.all(color: relColor, width: 2),
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
                const SizedBox(height: 4),
                Text(
                  lang == 'ko' ? character.nameKo : character.nameEn,
                  style: const TextStyle(
                    color: AppColors.textPrimary,
                    fontSize: 11,
                  ),
                  textAlign: TextAlign.center,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                Text(
                  relationshipType,
                  style: TextStyle(
                    color: relColor,
                    fontSize: 9,
                  ),
                  textAlign: TextAlign.center,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
        );
      },
      loading: () => const SizedBox(
        width: 80,
        child: Center(
          child: SizedBox(
            width: 20,
            height: 20,
            child: CircularProgressIndicator(strokeWidth: 2),
          ),
        ),
      ),
      error: (_, __) => const SizedBox.shrink(),
    );
  }
}
