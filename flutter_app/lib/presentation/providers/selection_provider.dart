import 'package:flutter_riverpod/flutter_riverpod.dart';

// 선택 모드: none -> focused -> detailOpen
enum SelectionMode { none, focused, detailOpen }

// 선택 모드 Provider
final selectionModeProvider = StateProvider<SelectionMode>((ref) => SelectionMode.none);

// Selected Character Provider
final selectedCharacterIdProvider = StateProvider<String?>((ref) => null);

// Selected Event Provider
final selectedEventIdProvider = StateProvider<String?>((ref) => null);

// 사건에서 연결된 인물 ID들 (타임라인 -> 그래프 연동)
final eventLinkedCharacterIdsProvider = StateProvider<Set<String>>((ref) => {});

// 현재 탭 인덱스 Provider (탭 전환용)
final currentTabIndexProvider = StateProvider<int>((ref) => 0);

// Show Bible Viewer Provider
final showBibleViewerProvider = StateProvider<bool>((ref) => false);

// Bible Viewer State
class BibleViewerState {
  final String? bookId;
  final String? bookName;
  final int chapter;
  final int? highlightVerse;
  final int totalChapters;

  const BibleViewerState({
    this.bookId,
    this.bookName,
    this.chapter = 1,
    this.highlightVerse,
    this.totalChapters = 1,
  });

  BibleViewerState copyWith({
    String? bookId,
    String? bookName,
    int? chapter,
    int? highlightVerse,
    int? totalChapters,
    bool clearHighlight = false,
  }) {
    return BibleViewerState(
      bookId: bookId ?? this.bookId,
      bookName: bookName ?? this.bookName,
      chapter: chapter ?? this.chapter,
      highlightVerse:
          clearHighlight ? null : (highlightVerse ?? this.highlightVerse),
      totalChapters: totalChapters ?? this.totalChapters,
    );
  }
}

class BibleViewerNotifier extends StateNotifier<BibleViewerState> {
  BibleViewerNotifier() : super(const BibleViewerState());

  void openBook(String bookId, String bookName, int totalChapters,
      {int chapter = 1, int? highlightVerse}) {
    state = BibleViewerState(
      bookId: bookId,
      bookName: bookName,
      chapter: chapter,
      highlightVerse: highlightVerse,
      totalChapters: totalChapters,
    );
  }

  void setChapter(int chapter) {
    state = state.copyWith(chapter: chapter, clearHighlight: true);
  }

  void previousChapter() {
    if (state.chapter > 1) {
      state = state.copyWith(chapter: state.chapter - 1, clearHighlight: true);
    }
  }

  void nextChapter() {
    if (state.chapter < state.totalChapters) {
      state = state.copyWith(chapter: state.chapter + 1, clearHighlight: true);
    }
  }

  void clearHighlight() {
    state = state.copyWith(clearHighlight: true);
  }

  void close() {
    state = const BibleViewerState();
  }
}

final bibleViewerProvider =
    StateNotifierProvider<BibleViewerNotifier, BibleViewerState>((ref) {
  return BibleViewerNotifier();
});

// MBTI Quiz State
class MbtiQuizState {
  final bool isActive;
  final int currentStep; // 0-3
  final List<String> answers; // E/I, S/N, T/F, J/P
  final String? result;

  const MbtiQuizState({
    this.isActive = false,
    this.currentStep = 0,
    this.answers = const [],
    this.result,
  });

  MbtiQuizState copyWith({
    bool? isActive,
    int? currentStep,
    List<String>? answers,
    String? result,
  }) {
    return MbtiQuizState(
      isActive: isActive ?? this.isActive,
      currentStep: currentStep ?? this.currentStep,
      answers: answers ?? this.answers,
      result: result ?? this.result,
    );
  }
}

class MbtiQuizNotifier extends StateNotifier<MbtiQuizState> {
  MbtiQuizNotifier() : super(const MbtiQuizState());

  void startQuiz() {
    state = const MbtiQuizState(isActive: true);
  }

  void answer(String answer) {
    final newAnswers = [...state.answers, answer];
    if (newAnswers.length >= 4) {
      // Quiz complete
      final result = newAnswers.join('');
      state = state.copyWith(
        answers: newAnswers,
        currentStep: 4,
        result: result,
      );
    } else {
      state = state.copyWith(
        answers: newAnswers,
        currentStep: state.currentStep + 1,
      );
    }
  }

  void setDirectResult(String mbti) {
    state = MbtiQuizState(
      isActive: true,
      currentStep: 4,
      answers: mbti.split(''),
      result: mbti,
    );
  }

  void reset() {
    state = const MbtiQuizState();
  }

  void close() {
    state = const MbtiQuizState();
  }
}

final mbtiQuizProvider =
    StateNotifierProvider<MbtiQuizNotifier, MbtiQuizState>((ref) {
  return MbtiQuizNotifier();
});
