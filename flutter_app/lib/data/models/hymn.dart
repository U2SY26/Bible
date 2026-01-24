import 'package:freezed_annotation/freezed_annotation.dart';

part 'hymn.freezed.dart';
part 'hymn.g.dart';

@freezed
class Hymn with _$Hymn {
  const factory Hymn({
    required int id,
    required int number,
    @JsonKey(name: 'title_ko') required String titleKo,
    @JsonKey(name: 'title_en') required String titleEn,
    @Default([]) List<String> relatedTo,
    String? theme,
    @Default([]) List<String> verses,
  }) = _Hymn;

  factory Hymn.fromJson(Map<String, dynamic> json) => _$HymnFromJson(json);
}
