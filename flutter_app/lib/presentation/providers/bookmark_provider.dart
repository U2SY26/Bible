import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

class BookmarkNotifier extends StateNotifier<Set<String>> {
  BookmarkNotifier() : super({}) {
    _loadBookmarks();
  }

  Future<void> _loadBookmarks() async {
    final prefs = await SharedPreferences.getInstance();
    final bookmarksJson = prefs.getString('bookmarked_characters');
    if (bookmarksJson != null) {
      final List<dynamic> bookmarksList = jsonDecode(bookmarksJson);
      state = bookmarksList.cast<String>().toSet();
    }
  }

  Future<void> _saveBookmarks() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('bookmarked_characters', jsonEncode(state.toList()));
  }

  Future<void> toggleBookmark(String characterId) async {
    if (state.contains(characterId)) {
      state = {...state}..remove(characterId);
    } else {
      state = {...state, characterId};
    }
    await _saveBookmarks();
  }

  Future<void> addBookmark(String characterId) async {
    if (!state.contains(characterId)) {
      state = {...state, characterId};
      await _saveBookmarks();
    }
  }

  Future<void> removeBookmark(String characterId) async {
    if (state.contains(characterId)) {
      state = {...state}..remove(characterId);
      await _saveBookmarks();
    }
  }

  bool isBookmarked(String characterId) {
    return state.contains(characterId);
  }
}

final bookmarkProvider = StateNotifierProvider<BookmarkNotifier, Set<String>>((ref) {
  return BookmarkNotifier();
});

// Helper provider to check if a specific character is bookmarked
final isBookmarkedProvider = Provider.family<bool, String>((ref, characterId) {
  final bookmarks = ref.watch(bookmarkProvider);
  return bookmarks.contains(characterId);
});
