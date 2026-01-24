import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/constants/app_colors.dart';
import '../../../data/models/character.dart';
import '../../providers/data_providers.dart';
import '../../providers/filter_provider.dart';
import '../../providers/selection_provider.dart';

// Search query provider
final searchQueryProvider = StateProvider<String>((ref) => '');

// Search results provider
final searchResultsProvider = FutureProvider<List<Character>>((ref) async {
  final query = ref.watch(searchQueryProvider);
  final lang = ref.watch(languageProvider);

  if (query.isEmpty) return [];

  final repo = ref.read(characterRepositoryProvider);
  return await repo.searchCharacters(query, lang);
});

class SearchScreen extends ConsumerStatefulWidget {
  const SearchScreen({super.key});

  @override
  ConsumerState<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends ConsumerState<SearchScreen> {
  final _searchController = TextEditingController();
  final _focusNode = FocusNode();

  @override
  void dispose() {
    _searchController.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final lang = ref.watch(languageProvider);
    final searchResults = ref.watch(searchResultsProvider);
    final query = ref.watch(searchQueryProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(lang),
            _buildSearchBar(lang),
            Expanded(
              child: query.isEmpty
                  ? _buildEmptyState(lang)
                  : searchResults.when(
                      data: (results) => results.isEmpty
                          ? _buildNoResults(lang)
                          : _buildResults(results, lang),
                      loading: () => const Center(
                        child: CircularProgressIndicator(color: AppColors.primary),
                      ),
                      error: (e, _) => Center(
                        child: Text('Error: $e', style: const TextStyle(color: AppColors.textMuted)),
                      ),
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(String lang) {
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
              lang == 'ko' ? '검색' : 'Search',
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ),
          const Spacer(),
          Text(
            lang == 'ko' ? '성경 인물 검색' : 'Search Bible Characters',
            style: const TextStyle(color: AppColors.textMuted, fontSize: 12),
          ),
        ],
      ),
    );
  }

  Widget _buildSearchBar(String lang) {
    return Container(
      padding: const EdgeInsets.all(16),
      color: AppColors.surface,
      child: TextField(
        controller: _searchController,
        focusNode: _focusNode,
        style: const TextStyle(color: AppColors.textPrimary),
        decoration: InputDecoration(
          hintText: lang == 'ko' ? '인물 이름, 설명, 역할 검색...' : 'Search name, description, role...',
          prefixIcon: const Icon(Icons.search, color: AppColors.textMuted),
          suffixIcon: _searchController.text.isNotEmpty
              ? IconButton(
                  icon: const Icon(Icons.clear, color: AppColors.textMuted),
                  onPressed: () {
                    _searchController.clear();
                    ref.read(searchQueryProvider.notifier).state = '';
                  },
                )
              : null,
        ),
        onChanged: (value) {
          ref.read(searchQueryProvider.notifier).state = value;
        },
      ),
    );
  }

  Widget _buildEmptyState(String lang) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.search, size: 64, color: AppColors.surfaceLight),
          const SizedBox(height: 16),
          Text(
            lang == 'ko' ? '검색어를 입력하세요' : 'Enter a search term',
            style: const TextStyle(color: AppColors.textSecondary, fontSize: 16),
          ),
          const SizedBox(height: 8),
          Text(
            lang == 'ko' ? '인물의 이름, 역할, 설명으로 검색할 수 있습니다' : 'Search by name, role, or description',
            style: const TextStyle(color: AppColors.textMuted, fontSize: 12),
          ),
          const SizedBox(height: 32),
          // Quick search suggestions
          Wrap(
            spacing: 8,
            runSpacing: 8,
            alignment: WrapAlignment.center,
            children: [
              _QuickSearchChip(label: lang == 'ko' ? '선지자' : 'Prophet', onTap: () => _quickSearch(lang == 'ko' ? '선지자' : 'Prophet')),
              _QuickSearchChip(label: lang == 'ko' ? '왕' : 'King', onTap: () => _quickSearch(lang == 'ko' ? '왕' : 'King')),
              _QuickSearchChip(label: lang == 'ko' ? '제자' : 'Disciple', onTap: () => _quickSearch(lang == 'ko' ? '제자' : 'Disciple')),
              _QuickSearchChip(label: lang == 'ko' ? '여성' : 'Woman', onTap: () => _quickSearch(lang == 'ko' ? '여성' : 'Woman')),
            ],
          ),
        ],
      ),
    );
  }

  void _quickSearch(String term) {
    _searchController.text = term;
    ref.read(searchQueryProvider.notifier).state = term;
  }

  Widget _buildNoResults(String lang) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.search_off, size: 64, color: AppColors.surfaceLight),
          const SizedBox(height: 16),
          Text(
            lang == 'ko' ? '검색 결과가 없습니다' : 'No results found',
            style: const TextStyle(color: AppColors.textSecondary, fontSize: 16),
          ),
          const SizedBox(height: 8),
          Text(
            lang == 'ko' ? '다른 검색어를 시도해보세요' : 'Try a different search term',
            style: const TextStyle(color: AppColors.textMuted, fontSize: 12),
          ),
        ],
      ),
    );
  }

  Widget _buildResults(List<Character> results, String lang) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: results.length,
      itemBuilder: (context, index) {
        final char = results[index];
        return _SearchResultCard(
          character: char,
          lang: lang,
          onTap: () {
            ref.read(selectedCharacterIdProvider.notifier).state = char.id;
            // Navigate to graph or show detail
          },
        );
      },
    );
  }
}

class _QuickSearchChip extends StatelessWidget {
  final String label;
  final VoidCallback onTap;

  const _QuickSearchChip({required this.label, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: AppColors.surfaceLight,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppColors.primary.withValues(alpha: 0.3)),
        ),
        child: Text(
          label,
          style: const TextStyle(color: AppColors.primary, fontSize: 14),
        ),
      ),
    );
  }
}

class _SearchResultCard extends StatelessWidget {
  final Character character;
  final String lang;
  final VoidCallback onTap;

  const _SearchResultCard({
    required this.character,
    required this.lang,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: AppColors.surfaceLight),
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
                        style: const TextStyle(
                          color: AppColors.textPrimary,
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
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
                    lang == 'ko' ? character.descriptionKo : character.descriptionEn,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      color: AppColors.textMuted,
                      fontSize: 12,
                    ),
                  ),
                  if (character.labels.isNotEmpty) ...[
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 4,
                      children: character.labels.take(3).map((label) => Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: AppColors.surfaceLight,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          label,
                          style: const TextStyle(
                            color: AppColors.textSecondary,
                            fontSize: 10,
                          ),
                        ),
                      )).toList(),
                    ),
                  ],
                ],
              ),
            ),
            const Icon(Icons.chevron_right, color: AppColors.textMuted),
          ],
        ),
      ),
    );
  }
}
