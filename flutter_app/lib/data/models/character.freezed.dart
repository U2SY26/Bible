// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'character.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

Character _$CharacterFromJson(Map<String, dynamic> json) {
  return _Character.fromJson(json);
}

/// @nodoc
mixin _$Character {
  String get id => throw _privateConstructorUsedError;
  @JsonKey(name: 'name_ko')
  String get nameKo => throw _privateConstructorUsedError;
  @JsonKey(name: 'name_en')
  String get nameEn => throw _privateConstructorUsedError;
  String get testament => throw _privateConstructorUsedError;
  int get importance => throw _privateConstructorUsedError;
  List<String> get books => throw _privateConstructorUsedError;
  @JsonKey(name: 'description_ko')
  String get descriptionKo => throw _privateConstructorUsedError;
  @JsonKey(name: 'description_en')
  String get descriptionEn => throw _privateConstructorUsedError;
  List<CharacterVerse> get verses => throw _privateConstructorUsedError;
  List<String> get labels => throw _privateConstructorUsedError;
  String? get era => throw _privateConstructorUsedError;
  String? get location => throw _privateConstructorUsedError;
  List<int> get hymns => throw _privateConstructorUsedError;
  String? get mbti => throw _privateConstructorUsedError;

  /// Serializes this Character to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Character
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $CharacterCopyWith<Character> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CharacterCopyWith<$Res> {
  factory $CharacterCopyWith(Character value, $Res Function(Character) then) =
      _$CharacterCopyWithImpl<$Res, Character>;
  @useResult
  $Res call({
    String id,
    @JsonKey(name: 'name_ko') String nameKo,
    @JsonKey(name: 'name_en') String nameEn,
    String testament,
    int importance,
    List<String> books,
    @JsonKey(name: 'description_ko') String descriptionKo,
    @JsonKey(name: 'description_en') String descriptionEn,
    List<CharacterVerse> verses,
    List<String> labels,
    String? era,
    String? location,
    List<int> hymns,
    String? mbti,
  });
}

/// @nodoc
class _$CharacterCopyWithImpl<$Res, $Val extends Character>
    implements $CharacterCopyWith<$Res> {
  _$CharacterCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Character
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? nameKo = null,
    Object? nameEn = null,
    Object? testament = null,
    Object? importance = null,
    Object? books = null,
    Object? descriptionKo = null,
    Object? descriptionEn = null,
    Object? verses = null,
    Object? labels = null,
    Object? era = freezed,
    Object? location = freezed,
    Object? hymns = null,
    Object? mbti = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            nameKo: null == nameKo
                ? _value.nameKo
                : nameKo // ignore: cast_nullable_to_non_nullable
                      as String,
            nameEn: null == nameEn
                ? _value.nameEn
                : nameEn // ignore: cast_nullable_to_non_nullable
                      as String,
            testament: null == testament
                ? _value.testament
                : testament // ignore: cast_nullable_to_non_nullable
                      as String,
            importance: null == importance
                ? _value.importance
                : importance // ignore: cast_nullable_to_non_nullable
                      as int,
            books: null == books
                ? _value.books
                : books // ignore: cast_nullable_to_non_nullable
                      as List<String>,
            descriptionKo: null == descriptionKo
                ? _value.descriptionKo
                : descriptionKo // ignore: cast_nullable_to_non_nullable
                      as String,
            descriptionEn: null == descriptionEn
                ? _value.descriptionEn
                : descriptionEn // ignore: cast_nullable_to_non_nullable
                      as String,
            verses: null == verses
                ? _value.verses
                : verses // ignore: cast_nullable_to_non_nullable
                      as List<CharacterVerse>,
            labels: null == labels
                ? _value.labels
                : labels // ignore: cast_nullable_to_non_nullable
                      as List<String>,
            era: freezed == era
                ? _value.era
                : era // ignore: cast_nullable_to_non_nullable
                      as String?,
            location: freezed == location
                ? _value.location
                : location // ignore: cast_nullable_to_non_nullable
                      as String?,
            hymns: null == hymns
                ? _value.hymns
                : hymns // ignore: cast_nullable_to_non_nullable
                      as List<int>,
            mbti: freezed == mbti
                ? _value.mbti
                : mbti // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$CharacterImplCopyWith<$Res>
    implements $CharacterCopyWith<$Res> {
  factory _$$CharacterImplCopyWith(
    _$CharacterImpl value,
    $Res Function(_$CharacterImpl) then,
  ) = __$$CharacterImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    @JsonKey(name: 'name_ko') String nameKo,
    @JsonKey(name: 'name_en') String nameEn,
    String testament,
    int importance,
    List<String> books,
    @JsonKey(name: 'description_ko') String descriptionKo,
    @JsonKey(name: 'description_en') String descriptionEn,
    List<CharacterVerse> verses,
    List<String> labels,
    String? era,
    String? location,
    List<int> hymns,
    String? mbti,
  });
}

/// @nodoc
class __$$CharacterImplCopyWithImpl<$Res>
    extends _$CharacterCopyWithImpl<$Res, _$CharacterImpl>
    implements _$$CharacterImplCopyWith<$Res> {
  __$$CharacterImplCopyWithImpl(
    _$CharacterImpl _value,
    $Res Function(_$CharacterImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of Character
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? nameKo = null,
    Object? nameEn = null,
    Object? testament = null,
    Object? importance = null,
    Object? books = null,
    Object? descriptionKo = null,
    Object? descriptionEn = null,
    Object? verses = null,
    Object? labels = null,
    Object? era = freezed,
    Object? location = freezed,
    Object? hymns = null,
    Object? mbti = freezed,
  }) {
    return _then(
      _$CharacterImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        nameKo: null == nameKo
            ? _value.nameKo
            : nameKo // ignore: cast_nullable_to_non_nullable
                  as String,
        nameEn: null == nameEn
            ? _value.nameEn
            : nameEn // ignore: cast_nullable_to_non_nullable
                  as String,
        testament: null == testament
            ? _value.testament
            : testament // ignore: cast_nullable_to_non_nullable
                  as String,
        importance: null == importance
            ? _value.importance
            : importance // ignore: cast_nullable_to_non_nullable
                  as int,
        books: null == books
            ? _value._books
            : books // ignore: cast_nullable_to_non_nullable
                  as List<String>,
        descriptionKo: null == descriptionKo
            ? _value.descriptionKo
            : descriptionKo // ignore: cast_nullable_to_non_nullable
                  as String,
        descriptionEn: null == descriptionEn
            ? _value.descriptionEn
            : descriptionEn // ignore: cast_nullable_to_non_nullable
                  as String,
        verses: null == verses
            ? _value._verses
            : verses // ignore: cast_nullable_to_non_nullable
                  as List<CharacterVerse>,
        labels: null == labels
            ? _value._labels
            : labels // ignore: cast_nullable_to_non_nullable
                  as List<String>,
        era: freezed == era
            ? _value.era
            : era // ignore: cast_nullable_to_non_nullable
                  as String?,
        location: freezed == location
            ? _value.location
            : location // ignore: cast_nullable_to_non_nullable
                  as String?,
        hymns: null == hymns
            ? _value._hymns
            : hymns // ignore: cast_nullable_to_non_nullable
                  as List<int>,
        mbti: freezed == mbti
            ? _value.mbti
            : mbti // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$CharacterImpl implements _Character {
  const _$CharacterImpl({
    required this.id,
    @JsonKey(name: 'name_ko') required this.nameKo,
    @JsonKey(name: 'name_en') required this.nameEn,
    required this.testament,
    required this.importance,
    final List<String> books = const [],
    @JsonKey(name: 'description_ko') this.descriptionKo = '',
    @JsonKey(name: 'description_en') this.descriptionEn = '',
    final List<CharacterVerse> verses = const [],
    final List<String> labels = const [],
    this.era,
    this.location,
    final List<int> hymns = const [],
    this.mbti,
  }) : _books = books,
       _verses = verses,
       _labels = labels,
       _hymns = hymns;

  factory _$CharacterImpl.fromJson(Map<String, dynamic> json) =>
      _$$CharacterImplFromJson(json);

  @override
  final String id;
  @override
  @JsonKey(name: 'name_ko')
  final String nameKo;
  @override
  @JsonKey(name: 'name_en')
  final String nameEn;
  @override
  final String testament;
  @override
  final int importance;
  final List<String> _books;
  @override
  @JsonKey()
  List<String> get books {
    if (_books is EqualUnmodifiableListView) return _books;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_books);
  }

  @override
  @JsonKey(name: 'description_ko')
  final String descriptionKo;
  @override
  @JsonKey(name: 'description_en')
  final String descriptionEn;
  final List<CharacterVerse> _verses;
  @override
  @JsonKey()
  List<CharacterVerse> get verses {
    if (_verses is EqualUnmodifiableListView) return _verses;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_verses);
  }

  final List<String> _labels;
  @override
  @JsonKey()
  List<String> get labels {
    if (_labels is EqualUnmodifiableListView) return _labels;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_labels);
  }

  @override
  final String? era;
  @override
  final String? location;
  final List<int> _hymns;
  @override
  @JsonKey()
  List<int> get hymns {
    if (_hymns is EqualUnmodifiableListView) return _hymns;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_hymns);
  }

  @override
  final String? mbti;

  @override
  String toString() {
    return 'Character(id: $id, nameKo: $nameKo, nameEn: $nameEn, testament: $testament, importance: $importance, books: $books, descriptionKo: $descriptionKo, descriptionEn: $descriptionEn, verses: $verses, labels: $labels, era: $era, location: $location, hymns: $hymns, mbti: $mbti)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CharacterImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.nameKo, nameKo) || other.nameKo == nameKo) &&
            (identical(other.nameEn, nameEn) || other.nameEn == nameEn) &&
            (identical(other.testament, testament) ||
                other.testament == testament) &&
            (identical(other.importance, importance) ||
                other.importance == importance) &&
            const DeepCollectionEquality().equals(other._books, _books) &&
            (identical(other.descriptionKo, descriptionKo) ||
                other.descriptionKo == descriptionKo) &&
            (identical(other.descriptionEn, descriptionEn) ||
                other.descriptionEn == descriptionEn) &&
            const DeepCollectionEquality().equals(other._verses, _verses) &&
            const DeepCollectionEquality().equals(other._labels, _labels) &&
            (identical(other.era, era) || other.era == era) &&
            (identical(other.location, location) ||
                other.location == location) &&
            const DeepCollectionEquality().equals(other._hymns, _hymns) &&
            (identical(other.mbti, mbti) || other.mbti == mbti));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    nameKo,
    nameEn,
    testament,
    importance,
    const DeepCollectionEquality().hash(_books),
    descriptionKo,
    descriptionEn,
    const DeepCollectionEquality().hash(_verses),
    const DeepCollectionEquality().hash(_labels),
    era,
    location,
    const DeepCollectionEquality().hash(_hymns),
    mbti,
  );

  /// Create a copy of Character
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$CharacterImplCopyWith<_$CharacterImpl> get copyWith =>
      __$$CharacterImplCopyWithImpl<_$CharacterImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$CharacterImplToJson(this);
  }
}

abstract class _Character implements Character {
  const factory _Character({
    required final String id,
    @JsonKey(name: 'name_ko') required final String nameKo,
    @JsonKey(name: 'name_en') required final String nameEn,
    required final String testament,
    required final int importance,
    final List<String> books,
    @JsonKey(name: 'description_ko') final String descriptionKo,
    @JsonKey(name: 'description_en') final String descriptionEn,
    final List<CharacterVerse> verses,
    final List<String> labels,
    final String? era,
    final String? location,
    final List<int> hymns,
    final String? mbti,
  }) = _$CharacterImpl;

  factory _Character.fromJson(Map<String, dynamic> json) =
      _$CharacterImpl.fromJson;

  @override
  String get id;
  @override
  @JsonKey(name: 'name_ko')
  String get nameKo;
  @override
  @JsonKey(name: 'name_en')
  String get nameEn;
  @override
  String get testament;
  @override
  int get importance;
  @override
  List<String> get books;
  @override
  @JsonKey(name: 'description_ko')
  String get descriptionKo;
  @override
  @JsonKey(name: 'description_en')
  String get descriptionEn;
  @override
  List<CharacterVerse> get verses;
  @override
  List<String> get labels;
  @override
  String? get era;
  @override
  String? get location;
  @override
  List<int> get hymns;
  @override
  String? get mbti;

  /// Create a copy of Character
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$CharacterImplCopyWith<_$CharacterImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

CharacterVerse _$CharacterVerseFromJson(Map<String, dynamic> json) {
  return _CharacterVerse.fromJson(json);
}

/// @nodoc
mixin _$CharacterVerse {
  String get ref => throw _privateConstructorUsedError;
  @JsonKey(name: 'text_ko')
  String get textKo => throw _privateConstructorUsedError;
  @JsonKey(name: 'text_en')
  String get textEn => throw _privateConstructorUsedError;

  /// Serializes this CharacterVerse to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of CharacterVerse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $CharacterVerseCopyWith<CharacterVerse> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CharacterVerseCopyWith<$Res> {
  factory $CharacterVerseCopyWith(
    CharacterVerse value,
    $Res Function(CharacterVerse) then,
  ) = _$CharacterVerseCopyWithImpl<$Res, CharacterVerse>;
  @useResult
  $Res call({
    String ref,
    @JsonKey(name: 'text_ko') String textKo,
    @JsonKey(name: 'text_en') String textEn,
  });
}

/// @nodoc
class _$CharacterVerseCopyWithImpl<$Res, $Val extends CharacterVerse>
    implements $CharacterVerseCopyWith<$Res> {
  _$CharacterVerseCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of CharacterVerse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? ref = null,
    Object? textKo = null,
    Object? textEn = null,
  }) {
    return _then(
      _value.copyWith(
            ref: null == ref
                ? _value.ref
                : ref // ignore: cast_nullable_to_non_nullable
                      as String,
            textKo: null == textKo
                ? _value.textKo
                : textKo // ignore: cast_nullable_to_non_nullable
                      as String,
            textEn: null == textEn
                ? _value.textEn
                : textEn // ignore: cast_nullable_to_non_nullable
                      as String,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$CharacterVerseImplCopyWith<$Res>
    implements $CharacterVerseCopyWith<$Res> {
  factory _$$CharacterVerseImplCopyWith(
    _$CharacterVerseImpl value,
    $Res Function(_$CharacterVerseImpl) then,
  ) = __$$CharacterVerseImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String ref,
    @JsonKey(name: 'text_ko') String textKo,
    @JsonKey(name: 'text_en') String textEn,
  });
}

/// @nodoc
class __$$CharacterVerseImplCopyWithImpl<$Res>
    extends _$CharacterVerseCopyWithImpl<$Res, _$CharacterVerseImpl>
    implements _$$CharacterVerseImplCopyWith<$Res> {
  __$$CharacterVerseImplCopyWithImpl(
    _$CharacterVerseImpl _value,
    $Res Function(_$CharacterVerseImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of CharacterVerse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? ref = null,
    Object? textKo = null,
    Object? textEn = null,
  }) {
    return _then(
      _$CharacterVerseImpl(
        ref: null == ref
            ? _value.ref
            : ref // ignore: cast_nullable_to_non_nullable
                  as String,
        textKo: null == textKo
            ? _value.textKo
            : textKo // ignore: cast_nullable_to_non_nullable
                  as String,
        textEn: null == textEn
            ? _value.textEn
            : textEn // ignore: cast_nullable_to_non_nullable
                  as String,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$CharacterVerseImpl implements _CharacterVerse {
  const _$CharacterVerseImpl({
    required this.ref,
    @JsonKey(name: 'text_ko') this.textKo = '',
    @JsonKey(name: 'text_en') this.textEn = '',
  });

  factory _$CharacterVerseImpl.fromJson(Map<String, dynamic> json) =>
      _$$CharacterVerseImplFromJson(json);

  @override
  final String ref;
  @override
  @JsonKey(name: 'text_ko')
  final String textKo;
  @override
  @JsonKey(name: 'text_en')
  final String textEn;

  @override
  String toString() {
    return 'CharacterVerse(ref: $ref, textKo: $textKo, textEn: $textEn)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CharacterVerseImpl &&
            (identical(other.ref, ref) || other.ref == ref) &&
            (identical(other.textKo, textKo) || other.textKo == textKo) &&
            (identical(other.textEn, textEn) || other.textEn == textEn));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, ref, textKo, textEn);

  /// Create a copy of CharacterVerse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$CharacterVerseImplCopyWith<_$CharacterVerseImpl> get copyWith =>
      __$$CharacterVerseImplCopyWithImpl<_$CharacterVerseImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$CharacterVerseImplToJson(this);
  }
}

abstract class _CharacterVerse implements CharacterVerse {
  const factory _CharacterVerse({
    required final String ref,
    @JsonKey(name: 'text_ko') final String textKo,
    @JsonKey(name: 'text_en') final String textEn,
  }) = _$CharacterVerseImpl;

  factory _CharacterVerse.fromJson(Map<String, dynamic> json) =
      _$CharacterVerseImpl.fromJson;

  @override
  String get ref;
  @override
  @JsonKey(name: 'text_ko')
  String get textKo;
  @override
  @JsonKey(name: 'text_en')
  String get textEn;

  /// Create a copy of CharacterVerse
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$CharacterVerseImplCopyWith<_$CharacterVerseImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
