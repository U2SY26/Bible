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
          if (_selectedBookId != null)
            IconButton(
              onPressed: () => setState(() => _selectedBookId = null),
              icon: const Icon(Icons.arrow_back),
              color: isDark ? AppColors.textSecondary : Colors.grey[600],
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
              style: TextStyle(
                color: isDark ? AppColors.textMuted : Colors.grey,
                fontSize: 12,
              ),
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

    final isDark = Theme.of(context).brightness == Brightness.dark;

    return DefaultTabController(
      length: 2,
      child: Column(
        children: [
          // Testament tabs
          Container(
            color: isDark ? AppColors.surface : Colors.white,
            child: TabBar(
              labelColor: AppColors.primary,
              unselectedLabelColor: isDark ? AppColors.textSecondary : Colors.grey,
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
    final isDark = Theme.of(context).brightness == Brightness.dark;

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
                style: TextStyle(
                  color: isDark ? AppColors.textSecondary : Colors.grey[700],
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
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: isDark ? AppColors.surfaceLight : Colors.grey.shade100,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Column(
          children: [
            Text(
              lang == 'ko' ? book.nameKo : book.nameEn,
              style: TextStyle(
                color: isDark ? AppColors.textPrimary : Colors.black87,
                fontSize: 13,
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              '${book.chapters}${lang == 'ko' ? '장' : ' ch'}',
              style: TextStyle(
                color: isDark ? AppColors.textMuted : Colors.grey,
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
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      children: [
        // Chapter navigation
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          color: isDark ? AppColors.surface : Colors.white,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              IconButton(
                onPressed: chapter > 1
                    ? () => onChapterChanged(chapter - 1)
                    : null,
                icon: const Icon(Icons.chevron_left),
                color: chapter > 1
                    ? (isDark ? AppColors.textPrimary : Colors.black87)
                    : (isDark ? AppColors.textMuted : Colors.grey),
              ),
              GestureDetector(
                onTap: () => _showChapterPicker(context),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  decoration: BoxDecoration(
                    color: isDark ? AppColors.surfaceLight : Colors.grey.shade100,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    '${lang == 'ko' ? '장' : 'Chapter'} $chapter',
                    style: TextStyle(
                      color: isDark ? AppColors.textPrimary : Colors.black87,
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
                color: chapter < totalChapters
                    ? (isDark ? AppColors.textPrimary : Colors.black87)
                    : (isDark ? AppColors.textMuted : Colors.grey),
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
                    style: TextStyle(color: isDark ? AppColors.textMuted : Colors.grey),
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
                            style: TextStyle(
                              color: isDark ? AppColors.textPrimary : Colors.black87,
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
              child: Text('Error: $e', style: TextStyle(color: isDark ? AppColors.textMuted : Colors.grey)),
            ),
          ),
        ),
      ],
    );
  }

  void _showChapterPicker(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    showModalBottomSheet(
      context: context,
      backgroundColor: isDark ? AppColors.surface : Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        final sheetIsDark = Theme.of(context).brightness == Brightness.dark;
        return Container(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: sheetIsDark ? AppColors.surfaceLight : Colors.grey.shade300,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(height: 16),
              Text(
                lang == 'ko' ? '장 선택' : 'Select Chapter',
                style: TextStyle(
                  color: sheetIsDark ? AppColors.textPrimary : Colors.black87,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 16),
              SizedBox(
                height: 300,
                child: GridView.builder(
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
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
                          color: isSelected
                              ? AppColors.primary
                              : (sheetIsDark ? AppColors.surfaceLight : Colors.grey.shade100),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Center(
                          child: Text(
                            '$ch',
                            style: TextStyle(
                              color: isSelected
                                  ? Colors.white
                                  : (sheetIsDark ? AppColors.textSecondary : Colors.grey[700]),
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
        );
      },
    );
  }
}
