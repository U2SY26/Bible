import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/constants/app_colors.dart';
import '../../../data/models/bible_book.dart';
import '../../providers/data_providers.dart';
import '../../providers/filter_provider.dart';

class BibleReaderScreen extends ConsumerStatefulWidget {
  const BibleReaderScreen({super.key});

  @override
  ConsumerState<BibleReaderScreen> createState() => _BibleReaderScreenState();
}

class _BibleReaderScreenState extends ConsumerState<BibleReaderScreen> {
  String? _selectedBookId;
  int _selectedChapter = 1;
  int _totalChapters = 1;
  String _selectedBookName = '';

  @override
  Widget build(BuildContext context) {
    final lang = ref.watch(languageProvider);
    final booksAsync = ref.watch(allBooksProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(lang),
            Expanded(
              child: booksAsync.when(
                data: (books) => _selectedBookId == null
                    ? _BookSelector(
                        books: books,
                        lang: lang,
                        onBookSelected: (book) {
                          setState(() {
                            _selectedBookId = book.id;
                            _selectedBookName = lang == 'ko' ? book.nameKo : book.nameEn;
                            _totalChapters = book.chapters;
                            _selectedChapter = 1;
                          });
                        },
                      )
                    : _ChapterViewer(
                        bookId: _selectedBookId!,
                        bookName: _selectedBookName,
                        chapter: _selectedChapter,
                        totalChapters: _totalChapters,
                        lang: lang,
                        onChapterChanged: (chapter) {
                          setState(() => _selectedChapter = chapter);
                        },
                        onBack: () {
                          setState(() {
                            _selectedBookId = null;
                          });
                        },
                      ),
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
          if (_selectedBookId != null)
            IconButton(
              onPressed: () => setState(() => _selectedBookId = null),
              icon: const Icon(Icons.arrow_back),
              color: AppColors.textSecondary,
              padding: EdgeInsets.zero,
              constraints: const BoxConstraints(),
            ),
          if (_selectedBookId != null) const SizedBox(width: 12),
          ShaderMask(
            shaderCallback: (bounds) => AppColors.primaryGradient.createShader(
              Rect.fromLTWH(0, 0, bounds.width, bounds.height),
            ),
            child: Text(
              _selectedBookId != null
                  ? _selectedBookName
                  : (lang == 'ko' ? '성경' : 'Bible'),
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ),
          const Spacer(),
          if (_selectedBookId != null)
            Text(
              '${lang == 'ko' ? '장' : 'Ch.'} $_selectedChapter / $_totalChapters',
              style: const TextStyle(color: AppColors.textMuted, fontSize: 12),
            ),
        ],
      ),
    );
  }
}

class _BookSelector extends StatelessWidget {
  final List<BibleBook> books;
  final String lang;
  final Function(BibleBook) onBookSelected;

  const _BookSelector({
    required this.books,
    required this.lang,
    required this.onBookSelected,
  });

  @override
  Widget build(BuildContext context) {
    // Group books by category
    final otCategories = ['pentateuch', 'history', 'wisdom', 'major_prophets', 'minor_prophets'];
    final ntCategories = ['gospels', 'history_nt', 'pauline', 'general', 'prophecy_nt'];

    final categoryNames = {
      'pentateuch': lang == 'ko' ? '모세오경' : 'Pentateuch',
      'history': lang == 'ko' ? '역사서' : 'History',
      'wisdom': lang == 'ko' ? '시가서' : 'Wisdom',
      'major_prophets': lang == 'ko' ? '대선지서' : 'Major Prophets',
      'minor_prophets': lang == 'ko' ? '소선지서' : 'Minor Prophets',
      'gospels': lang == 'ko' ? '복음서' : 'Gospels',
      'history_nt': lang == 'ko' ? '역사서' : 'History',
      'pauline': lang == 'ko' ? '바울 서신' : 'Pauline Epistles',
      'general': lang == 'ko' ? '일반 서신' : 'General Epistles',
      'prophecy_nt': lang == 'ko' ? '예언서' : 'Prophecy',
    };

    return DefaultTabController(
      length: 2,
      child: Column(
        children: [
          // Testament tabs
          Container(
            color: AppColors.surface,
            child: TabBar(
              labelColor: AppColors.primary,
              unselectedLabelColor: AppColors.textSecondary,
              indicatorColor: AppColors.primary,
              tabs: [
                Tab(text: lang == 'ko' ? '구약' : 'Old Testament'),
                Tab(text: lang == 'ko' ? '신약' : 'New Testament'),
              ],
            ),
          ),
          Expanded(
            child: TabBarView(
              children: [
                // Old Testament
                _TestamentBooks(
                  books: books,
                  categories: otCategories,
                  categoryNames: categoryNames,
                  lang: lang,
                  onBookSelected: onBookSelected,
                ),
                // New Testament
                _TestamentBooks(
                  books: books,
                  categories: ntCategories,
                  categoryNames: categoryNames,
                  lang: lang,
                  onBookSelected: onBookSelected,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _TestamentBooks extends StatelessWidget {
  final List<BibleBook> books;
  final List<String> categories;
  final Map<String, String> categoryNames;
  final String lang;
  final Function(BibleBook) onBookSelected;

  const _TestamentBooks({
    required this.books,
    required this.categories,
    required this.categoryNames,
    required this.lang,
    required this.onBookSelected,
  });

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: categories.length,
      itemBuilder: (context, index) {
        final category = categories[index];
        final categoryBooks = books.where((b) => b.category == category).toList();

        if (categoryBooks.isEmpty) return const SizedBox.shrink();

        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: EdgeInsets.only(bottom: 8, top: index > 0 ? 16 : 0),
              child: Text(
                categoryNames[category] ?? category,
                style: const TextStyle(
                  color: AppColors.textSecondary,
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: categoryBooks.map((book) => _BookChip(
                book: book,
                lang: lang,
                onTap: () => onBookSelected(book),
              )).toList(),
            ),
          ],
        );
      },
    );
  }
}

class _BookChip extends StatelessWidget {
  final BibleBook book;
  final String lang;
  final VoidCallback onTap;

  const _BookChip({
    required this.book,
    required this.lang,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: AppColors.surfaceLight,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Column(
          children: [
            Text(
              lang == 'ko' ? book.nameKo : book.nameEn,
              style: const TextStyle(
                color: AppColors.textPrimary,
                fontSize: 13,
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              '${book.chapters}${lang == 'ko' ? '장' : ' ch'}',
              style: const TextStyle(
                color: AppColors.textMuted,
                fontSize: 10,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ChapterViewer extends ConsumerWidget {
  final String bookId;
  final String bookName;
  final int chapter;
  final int totalChapters;
  final String lang;
  final Function(int) onChapterChanged;
  final VoidCallback onBack;

  const _ChapterViewer({
    required this.bookId,
    required this.bookName,
    required this.chapter,
    required this.totalChapters,
    required this.lang,
    required this.onChapterChanged,
    required this.onBack,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final chapterAsync = ref.watch(
      bibleChapterProvider((bookId: bookId, chapter: chapter)),
    );

    return Column(
      children: [
        // Chapter navigation
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          color: AppColors.surface,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              IconButton(
                onPressed: chapter > 1
                    ? () => onChapterChanged(chapter - 1)
                    : null,
                icon: const Icon(Icons.chevron_left),
                color: chapter > 1 ? AppColors.textPrimary : AppColors.textMuted,
              ),
              GestureDetector(
                onTap: () => _showChapterPicker(context),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  decoration: BoxDecoration(
                    color: AppColors.surfaceLight,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    '${lang == 'ko' ? '장' : 'Chapter'} $chapter',
                    style: const TextStyle(
                      color: AppColors.textPrimary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
              IconButton(
                onPressed: chapter < totalChapters
                    ? () => onChapterChanged(chapter + 1)
                    : null,
                icon: const Icon(Icons.chevron_right),
                color: chapter < totalChapters ? AppColors.textPrimary : AppColors.textMuted,
              ),
            ],
          ),
        ),
        // Chapter content
        Expanded(
          child: chapterAsync.when(
            data: (chapterData) {
              if (chapterData == null) {
                return Center(
                  child: Text(
                    lang == 'ko' ? '장을 찾을 수 없습니다' : 'Chapter not found',
                    style: const TextStyle(color: AppColors.textMuted),
                  ),
                );
              }
              return ListView.builder(
                padding: const EdgeInsets.all(16),
                itemCount: chapterData.verses.length,
                itemBuilder: (context, index) {
                  final verse = chapterData.verses[index];
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(
                          width: 32,
                          child: Text(
                            '${verse.verse}',
                            style: const TextStyle(
                              color: AppColors.primary,
                              fontSize: 12,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                        Expanded(
                          child: Text(
                            verse.text,
                            style: const TextStyle(
                              color: AppColors.textPrimary,
                              fontSize: 16,
                              height: 1.6,
                            ),
                          ),
                        ),
                      ],
                    ),
                  );
                },
              );
            },
            loading: () => const Center(
              child: CircularProgressIndicator(color: AppColors.primary),
            ),
            error: (e, _) => Center(
              child: Text('Error: $e', style: const TextStyle(color: AppColors.textMuted)),
            ),
          ),
        ),
      ],
    );
  }

  void _showChapterPicker(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Container(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: AppColors.surfaceLight,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            const SizedBox(height: 16),
            Text(
              lang == 'ko' ? '장 선택' : 'Select Chapter',
              style: const TextStyle(
                color: AppColors.textPrimary,
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            SizedBox(
              height: 300,
              child: GridView.builder(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 6,
                  mainAxisSpacing: 8,
                  crossAxisSpacing: 8,
                ),
                itemCount: totalChapters,
                itemBuilder: (context, index) {
                  final ch = index + 1;
                  final isSelected = ch == chapter;
                  return GestureDetector(
                    onTap: () {
                      onChapterChanged(ch);
                      Navigator.pop(context);
                    },
                    child: Container(
                      decoration: BoxDecoration(
                        color: isSelected ? AppColors.primary : AppColors.surfaceLight,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Center(
                        child: Text(
                          '$ch',
                          style: TextStyle(
                            color: isSelected ? Colors.white : AppColors.textSecondary,
                            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
