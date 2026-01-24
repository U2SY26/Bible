import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/constants/app_colors.dart';
import '../../../data/models/character.dart';
import '../../../data/models/event.dart';
import '../../providers/data_providers.dart';
import '../../providers/filter_provider.dart';
import '../../providers/selection_provider.dart';

class TimelineScreen extends ConsumerWidget {
  const TimelineScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final erasAsync = ref.watch(allErasProvider);
    final eventsAsync = ref.watch(allEventsProvider);
    final charactersAsync = ref.watch(allCharactersProvider);
    final lang = ref.watch(languageProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(context, ref, lang),
            Expanded(
              child: erasAsync.when(
                data: (eras) => eventsAsync.when(
                  data: (events) => charactersAsync.when(
                    data: (characters) => _TimelineContent(
                      eras: eras,
                      events: events,
                      characters: characters,
                      lang: lang,
                    ),
                    loading: () => const _LoadingView(),
                    error: (e, _) => _ErrorView(error: e.toString()),
                  ),
                  loading: () => const _LoadingView(),
                  error: (e, _) => _ErrorView(error: e.toString()),
                ),
                loading: () => const _LoadingView(),
                error: (e, _) => _ErrorView(error: e.toString()),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context, WidgetRef ref, String lang) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: const BoxDecoration(
        color: AppColors.surface,
        border: Border(bottom: BorderSide(color: AppColors.surfaceLight)),
      ),
      child: Row(
        children: [
          ShaderMask(
            shaderCallback: (bounds) => AppColors.primaryGradient.createShader(
              Rect.fromLTWH(0, 0, bounds.width, bounds.height),
            ),
            child: Text(
              lang == 'ko' ? '타임라인' : 'Timeline',
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ),
          const Spacer(),
          Text(
            lang == 'ko' ? '시대별 성경 역사' : 'Biblical History by Era',
            style: const TextStyle(
              color: AppColors.textMuted,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }
}

class _LoadingView extends StatelessWidget {
  const _LoadingView();

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: CircularProgressIndicator(color: AppColors.primary),
    );
  }
}

class _ErrorView extends StatelessWidget {
  final String error;
  const _ErrorView({required this.error});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.error_outline, size: 48, color: AppColors.accentSecondary),
          const SizedBox(height: 16),
          Text(error, style: const TextStyle(color: AppColors.textMuted)),
        ],
      ),
    );
  }
}

class _TimelineContent extends ConsumerWidget {
  final List<Era> eras;
  final List<BibleEvent> events;
  final List<Character> characters;
  final String lang;

  const _TimelineContent({
    required this.eras,
    required this.events,
    required this.characters,
    required this.lang,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Sort eras by order
    final sortedEras = [...eras]..sort((a, b) => a.order.compareTo(b.order));

    return Column(
      children: [
        // Era legend
        _EraLegend(eras: sortedEras, lang: lang),
        // Timeline content
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: sortedEras.length,
            itemBuilder: (context, index) {
              final era = sortedEras[index];
              final eraEvents = events.where((e) => e.era == era.id).toList()
                ..sort((a, b) => a.year.compareTo(b.year));
              final eraCharacters = characters.where((c) => c.era == era.id).toList();

              return _EraSection(
                era: era,
                events: eraEvents,
                characters: eraCharacters,
                lang: lang,
                isLast: index == sortedEras.length - 1,
              );
            },
          ),
        ),
      ],
    );
  }
}

class _EraLegend extends StatelessWidget {
  final List<Era> eras;
  final String lang;

  const _EraLegend({required this.eras, required this.lang});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 50,
      padding: const EdgeInsets.symmetric(vertical: 8),
      decoration: const BoxDecoration(
        color: AppColors.surface,
        border: Border(bottom: BorderSide(color: AppColors.surfaceLight)),
      ),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 12),
        itemCount: eras.length,
        itemBuilder: (context, index) {
          final era = eras[index];
          final color = _parseColor(era.color);
          return Container(
            margin: const EdgeInsets.only(right: 8),
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.2),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: color.withValues(alpha: 0.5)),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 8,
                  height: 8,
                  decoration: BoxDecoration(
                    color: color,
                    shape: BoxShape.circle,
                  ),
                ),
                const SizedBox(width: 6),
                Text(
                  lang == 'ko' ? era.nameKo : era.nameEn,
                  style: TextStyle(
                    color: color,
                    fontSize: 11,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Color _parseColor(String colorStr) {
    try {
      return Color(int.parse(colorStr.replaceFirst('#', '0xFF')));
    } catch (_) {
      return AppColors.textSecondary;
    }
  }
}

class _EraSection extends ConsumerWidget {
  final Era era;
  final List<BibleEvent> events;
  final List<Character> characters;
  final String lang;
  final bool isLast;

  const _EraSection({
    required this.era,
    required this.events,
    required this.characters,
    required this.lang,
    required this.isLast,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final color = _parseColor(era.color);

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Timeline line
        SizedBox(
          width: 60,
          child: Column(
            children: [
              // Era dot
              Container(
                width: 24,
                height: 24,
                decoration: BoxDecoration(
                  color: color,
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: color.withValues(alpha: 0.4),
                      blurRadius: 8,
                      spreadRadius: 2,
                    ),
                  ],
                ),
                child: const Icon(Icons.circle, size: 8, color: Colors.white),
              ),
              // Connecting line
              if (!isLast)
                Container(
                  width: 2,
                  height: 200,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [color, color.withValues(alpha: 0.2)],
                    ),
                  ),
                ),
            ],
          ),
        ),
        // Era content
        Expanded(
          child: Container(
            margin: const EdgeInsets.only(bottom: 24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Era header
                Row(
                  children: [
                    Text(
                      lang == 'ko' ? era.nameKo : era.nameEn,
                      style: TextStyle(
                        color: color,
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      _formatYearRange(era.yearStart, era.yearEnd),
                      style: const TextStyle(
                        color: AppColors.textMuted,
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),

                // Events
                if (events.isNotEmpty) ...[
                  Text(
                    lang == 'ko' ? '주요 사건' : 'Key Events',
                    style: const TextStyle(
                      color: AppColors.textSecondary,
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 8),
                  ...events.take(5).map((event) => _EventCard(
                        event: event,
                        lang: lang,
                        color: color,
                      )),
                ],

                // Characters
                if (characters.isNotEmpty) ...[
                  const SizedBox(height: 12),
                  Text(
                    lang == 'ko' ? '주요 인물' : 'Key Figures',
                    style: const TextStyle(
                      color: AppColors.textSecondary,
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: characters
                        .where((c) => c.importance >= 6)
                        .take(8)
                        .map((char) => _CharacterChip(
                              character: char,
                              lang: lang,
                              onTap: () {
                                ref.read(selectedCharacterIdProvider.notifier).state = char.id;
                              },
                            ))
                        .toList(),
                  ),
                ],
              ],
            ),
          ),
        ),
      ],
    );
  }

  String _formatYearRange(int start, int end) {
    final startStr = start < 0 ? 'BC ${-start}' : 'AD $start';
    final endStr = end < 0 ? 'BC ${-end}' : 'AD $end';
    return '$startStr - $endStr';
  }

  Color _parseColor(String colorStr) {
    try {
      return Color(int.parse(colorStr.replaceFirst('#', '0xFF')));
    } catch (_) {
      return AppColors.textSecondary;
    }
  }
}

class _EventCard extends StatelessWidget {
  final BibleEvent event;
  final String lang;
  final Color color;

  const _EventCard({
    required this.event,
    required this.lang,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.surfaceLight,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      child: Row(
        children: [
          // Event icon
          if (event.icon != null)
            Text(event.icon!, style: const TextStyle(fontSize: 20)),
          if (event.icon != null) const SizedBox(width: 12),
          // Event info
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  lang == 'ko' ? event.nameKo : event.nameEn,
                  style: const TextStyle(
                    color: AppColors.textPrimary,
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  _formatYear(event.year),
                  style: const TextStyle(
                    color: AppColors.textMuted,
                    fontSize: 11,
                  ),
                ),
              ],
            ),
          ),
          // Arrow
          const Icon(
            Icons.chevron_right,
            color: AppColors.textMuted,
            size: 20,
          ),
        ],
      ),
    );
  }

  String _formatYear(int year) {
    return year < 0 ? 'BC ${-year}' : 'AD $year';
  }
}

class _CharacterChip extends StatelessWidget {
  final Character character;
  final String lang;
  final VoidCallback onTap;

  const _CharacterChip({
    required this.character,
    required this.lang,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        decoration: BoxDecoration(
          color: AppColors.surfaceLight,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 20,
              height: 20,
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
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 6),
            Text(
              lang == 'ko' ? character.nameKo : character.nameEn,
              style: const TextStyle(
                color: AppColors.textSecondary,
                fontSize: 12,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
