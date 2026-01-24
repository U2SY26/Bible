import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/models/character.dart';
import 'data_providers.dart';

// Filter State
class FilterState {
  final String testament; // 'both', 'old', 'new'
  final String? selectedBook;
  final String? selectedEra;
  final String searchQuery;
  final String? activeQuickFilter;

  const FilterState({
    this.testament = 'both',
    this.selectedBook,
    this.selectedEra,
    this.searchQuery = '',
    this.activeQuickFilter,
  });

  FilterState copyWith({
    String? testament,
    String? selectedBook,
    String? selectedEra,
    String? searchQuery,
    String? activeQuickFilter,
    bool clearBook = false,
    bool clearEra = false,
    bool clearQuickFilter = false,
  }) {
    return FilterState(
      testament: testament ?? this.testament,
      selectedBook: clearBook ? null : (selectedBook ?? this.selectedBook),
      selectedEra: clearEra ? null : (selectedEra ?? this.selectedEra),
      searchQuery: searchQuery ?? this.searchQuery,
      activeQuickFilter: clearQuickFilter
          ? null
          : (activeQuickFilter ?? this.activeQuickFilter),
    );
  }
}

// Filter State Notifier
class FilterNotifier extends StateNotifier<FilterState> {
  FilterNotifier() : super(const FilterState());

  void setTestament(String testament) {
    state = state.copyWith(testament: testament);
  }

  void setBook(String? bookId) {
    state = state.copyWith(selectedBook: bookId, clearBook: bookId == null);
  }

  void setEra(String? era) {
    state = state.copyWith(selectedEra: era, clearEra: era == null);
  }

  void setSearchQuery(String query) {
    state = state.copyWith(searchQuery: query);
  }

  void setQuickFilter(String? filter) {
    state = state.copyWith(
        activeQuickFilter: filter, clearQuickFilter: filter == null);
  }

  void clearFilters() {
    state = const FilterState();
  }
}

// Filter Provider
final filterProvider =
    StateNotifierProvider<FilterNotifier, FilterState>((ref) {
  return FilterNotifier();
});

// Language Provider
final languageProvider = StateProvider<String>((ref) => 'ko');

// Filtered Characters Provider
final filteredCharactersProvider =
    FutureProvider<List<Character>>((ref) async {
  final allCharacters = await ref.watch(allCharactersProvider.future);
  final filter = ref.watch(filterProvider);
  final lang = ref.watch(languageProvider);

  var filtered = allCharacters;

  // Filter by testament
  if (filter.testament != 'both') {
    filtered = filtered
        .where(
            (c) => c.testament == filter.testament || c.testament == 'both')
        .toList();
  }

  // Filter by book
  if (filter.selectedBook != null) {
    filtered =
        filtered.where((c) => c.books.contains(filter.selectedBook)).toList();
  }

  // Filter by era
  if (filter.selectedEra != null) {
    filtered = filtered.where((c) => c.era == filter.selectedEra).toList();
  }

  // Filter by search query
  if (filter.searchQuery.isNotEmpty) {
    final q = filter.searchQuery.toLowerCase();
    filtered = filtered.where((c) {
      final name = lang == 'ko' ? c.nameKo : c.nameEn;
      final desc = lang == 'ko' ? c.descriptionKo : c.descriptionEn;
      final labels = c.labels.join(' ');

      return name.toLowerCase().contains(q) ||
          desc.toLowerCase().contains(q) ||
          labels.toLowerCase().contains(q);
    }).toList();
  }

  // Filter by quick filter
  if (filter.activeQuickFilter != null) {
    filtered = _applyQuickFilter(filtered, filter.activeQuickFilter!, lang);
  }

  return filtered;
});

List<Character> _applyQuickFilter(
    List<Character> characters, String filter, String lang) {
  switch (filter) {
    case 'patriarchs':
      return characters.where((c) => c.era == 'patriarchs').toList();
    case 'prophets':
      return characters
          .where((c) =>
              c.labels.any((l) => l.contains('선지자') || l.contains('Prophet')))
          .toList();
    case 'kings':
      return characters
          .where((c) =>
              c.labels.any((l) => l.contains('왕') || l.contains('King')))
          .toList();
    case 'disciples':
      return characters
          .where((c) =>
              c.labels.any((l) => l.contains('제자') || l.contains('Disciple')))
          .toList();
    case 'women':
      return characters
          .where((c) =>
              c.labels.any((l) => l.contains('여성') || l.contains('Woman')))
          .toList();
    default:
      return characters;
  }
}

// Quick filters list
const quickFilters = [
  {'id': 'patriarchs', 'label_ko': '족장', 'label_en': 'Patriarchs'},
  {'id': 'prophets', 'label_ko': '선지자', 'label_en': 'Prophets'},
  {'id': 'kings', 'label_ko': '왕', 'label_en': 'Kings'},
  {'id': 'disciples', 'label_ko': '제자', 'label_en': 'Disciples'},
  {'id': 'women', 'label_ko': '여성', 'label_en': 'Women'},
];
