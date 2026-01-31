class Artwork {
  final String url;
  final String title;
  final String artist;
  final String year;
  final String source;
  final String license;

  const Artwork({
    required this.url,
    this.title = '',
    this.artist = '',
    this.year = '',
    this.source = '',
    this.license = '',
  });

  factory Artwork.fromJson(Map<String, dynamic> json) {
    return Artwork(
      url: json['url'] as String? ?? '',
      title: json['title'] as String? ?? '',
      artist: json['artist'] as String? ?? '',
      year: json['year'] as String? ?? '',
      source: json['source'] as String? ?? '',
      license: json['license'] as String? ?? '',
    );
  }
}
