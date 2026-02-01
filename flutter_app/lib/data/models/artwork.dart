class Artwork {
  final String url;
  final String title;
  final String titleKo;
  final String artist;
  final String artistKo;
  final String year;
  final String source;
  final String license;

  const Artwork({
    required this.url,
    this.title = '',
    this.titleKo = '',
    this.artist = '',
    this.artistKo = '',
    this.year = '',
    this.source = '',
    this.license = '',
  });

  /// Get display title based on language
  String getTitle(String lang) {
    if (lang == 'ko' && titleKo.isNotEmpty) {
      return titleKo;
    }
    return title;
  }

  /// Get display artist based on language
  String getArtist(String lang) {
    if (lang == 'ko' && artistKo.isNotEmpty) {
      return artistKo;
    }
    return artist;
  }

  factory Artwork.fromJson(Map<String, dynamic> json) {
    return Artwork(
      url: json['url'] as String? ?? '',
      title: _cleanTitle(json['title'] as String? ?? ''),
      titleKo: json['titleKo'] as String? ?? '',
      artist: _cleanArtist(json['artist'] as String? ?? ''),
      artistKo: json['artistKo'] as String? ?? '',
      year: json['year'] as String? ?? '',
      source: json['source'] as String? ?? '',
      license: json['license'] as String? ?? '',
    );
  }

  /// Clean up title by removing metadata strings
  static String _cleanTitle(String title) {
    // Remove QS: metadata patterns
    var cleaned = title.replaceAll(RegExp(r'\s*title\s+QS:.*$'), '');
    cleaned = cleaned.replaceAll(RegExp(r'\s*label\s+QS:.*$'), '');
    // Remove extra whitespace
    cleaned = cleaned.trim();
    // Remove leading numbers like "129."
    cleaned = cleaned.replaceAll(RegExp(r'^\d+\.'), '').trim();
    return cleaned;
  }

  /// Clean up artist name
  static String _cleanArtist(String artist) {
    // Remove URL patterns
    if (artist.startsWith('http')) {
      return 'Unknown';
    }
    // Remove leading = sign
    var cleaned = artist.replaceAll(RegExp(r'^=+'), '').trim();
    // Remove duplicate names like "Unknown author Unknown author"
    if (cleaned.contains(' ') && cleaned.split(' ').length >= 2) {
      final words = cleaned.split(' ');
      final mid = words.length ~/ 2;
      if (words.take(mid).join(' ') == words.skip(mid).join(' ')) {
        cleaned = words.take(mid).join(' ');
      }
    }
    return cleaned.isEmpty ? 'Unknown' : cleaned;
  }
}
