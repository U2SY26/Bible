class DailyVerse {
  final String ref;
  final String textKo;
  final String textEn;
  final String? relatedCharacterId;
  final int dayOfYear; // 1-366 for each day

  const DailyVerse({
    required this.ref,
    required this.textKo,
    required this.textEn,
    this.relatedCharacterId,
    required this.dayOfYear,
  });

  String getText(String lang) => lang == 'ko' ? textKo : textEn;

  factory DailyVerse.fromJson(Map<String, dynamic> json) {
    return DailyVerse(
      ref: json['ref'] as String,
      textKo: json['textKo'] as String,
      textEn: json['textEn'] as String,
      relatedCharacterId: json['relatedCharacterId'] as String?,
      dayOfYear: json['dayOfYear'] as int,
    );
  }

  Map<String, dynamic> toJson() => {
        'ref': ref,
        'textKo': textKo,
        'textEn': textEn,
        'relatedCharacterId': relatedCharacterId,
        'dayOfYear': dayOfYear,
      };
}
