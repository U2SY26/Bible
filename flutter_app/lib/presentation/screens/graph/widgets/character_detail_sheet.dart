import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/constants/app_colors.dart';
import '../../../../data/models/character.dart';
import '../../../providers/data_providers.dart';
import '../../../providers/filter_provider.dart';
import '../../../providers/selection_provider.dart';

class CharacterDetailSheet extends ConsumerWidget {
  final String characterId;

  const CharacterDetailSheet({super.key, required this.characterId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final characterAsync = ref.watch(characterByIdProvider(characterId));
    final lang = ref.watch(languageProvider);

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
  double _sheetHeight = 0.4; // 40% of screen

  @override
  Widget build(BuildContext context) {
    final lang = ref.watch(languageProvider);
    final char = widget.character;
    final screenHeight = MediaQuery.of(context).size.height;

    return GestureDetector(
      onVerticalDragUpdate: (details) {
        setState(() {
          _sheetHeight -= details.delta.dy / screenHeight;
          _sheetHeight = _sheetHeight.clamp(0.2, 0.9);
        });
      },
      child: Container(
        height: screenHeight * _sheetHeight,
        decoration: const BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
          boxShadow: [
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
            Container(
              margin: const EdgeInsets.only(top: 12),
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: AppColors.surfaceLight,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            // Header
            Padding(
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
                          style: const TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: AppColors.textPrimary,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Row(
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
                            const SizedBox(width: 8),
                            _Badge(
                              label:
                                  '${lang == 'ko' ? '중요도' : 'Imp'} ${char.importance}',
                              color: AppColors.accent,
                            ),
                            if (char.mbti != null) ...[
                              const SizedBox(width: 8),
                              _Badge(
                                label: char.mbti!,
                                color: AppColors.primary,
                              ),
                            ],
                          ],
                        ),
                      ],
                    ),
                  ),
                  // Close button
                  IconButton(
                    onPressed: () {
                      ref.read(selectedCharacterIdProvider.notifier).state =
                          null;
                    },
                    icon: const Icon(Icons.close),
                    color: AppColors.textSecondary,
                  ),
                ],
              ),
            ),
            // Content
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Description
                    Text(
                      lang == 'ko' ? char.descriptionKo : char.descriptionEn,
                      style: const TextStyle(
                        color: AppColors.textSecondary,
                        fontSize: 14,
                        height: 1.5,
                      ),
                    ),
                    const SizedBox(height: 16),

                    // Labels
                    if (char.labels.isNotEmpty) ...[
                      Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        children: char.labels
                            .map((label) => Container(
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 10, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: AppColors.surfaceLight,
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  child: Text(
                                    label,
                                    style: const TextStyle(
                                      color: AppColors.textSecondary,
                                      fontSize: 12,
                                    ),
                                  ),
                                ))
                            .toList(),
                      ),
                      const SizedBox(height: 16),
                    ],

                    // Key verses
                    if (char.verses.isNotEmpty) ...[
                      Text(
                        lang == 'ko' ? '주요 성경 구절' : 'Key Verses',
                        style: const TextStyle(
                          color: AppColors.textPrimary,
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 8),
                      ...char.verses.take(2).map((verse) => Container(
                            margin: const EdgeInsets.only(bottom: 8),
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: AppColors.surfaceLight,
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(
                                color: AppColors.primary.withValues(alpha: 0.3),
                              ),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  verse.ref,
                                  style: const TextStyle(
                                    color: AppColors.primary,
                                    fontSize: 12,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  lang == 'ko' ? verse.textKo : verse.textEn,
                                  style: const TextStyle(
                                    color: AppColors.textSecondary,
                                    fontSize: 13,
                                    fontStyle: FontStyle.italic,
                                  ),
                                ),
                              ],
                            ),
                          )),
                    ],

                    // Related content sections would go here
                    // (Events, Hymns, Locations, Related Characters)

                    const SizedBox(height: 24),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
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
