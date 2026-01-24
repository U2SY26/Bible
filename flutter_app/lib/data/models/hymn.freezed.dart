// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'hymn.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

Hymn _$HymnFromJson(Map<String, dynamic> json) {
  return _Hymn.fromJson(json);
}

/// @nodoc
mixin _$Hymn {
  int get id => throw _privateConstructorUsedError;
  int get number => throw _privateConstructorUsedError;
  @JsonKey(name: 'title_ko')
  String get titleKo => throw _privateConstructorUsedError;
  @JsonKey(name: 'title_en')
  String get titleEn => throw _privateConstructorUsedError;
  List<String> get relatedTo => throw _privateConstructorUsedError;
  String? get theme => throw _privateConstructorUsedError;
  List<String> get verses => throw _privateConstructorUsedError;

  /// Serializes this Hymn to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Hymn
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $HymnCopyWith<Hymn> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $HymnCopyWith<$Res> {
  factory $HymnCopyWith(Hymn value, $Res Function(Hymn) then) =
      _$HymnCopyWithImpl<$Res, Hymn>;
  @useResult
  $Res call({
    int id,
    int number,
    @JsonKey(name: 'title_ko') String titleKo,
    @JsonKey(name: 'title_en') String titleEn,
    List<String> relatedTo,
    String? theme,
    List<String> verses,
  });
}

/// @nodoc
class _$HymnCopyWithImpl<$Res, $Val extends Hymn>
    implements $HymnCopyWith<$Res> {
  _$HymnCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Hymn
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? number = null,
    Object? titleKo = null,
    Object? titleEn = null,
    Object? relatedTo = null,
    Object? theme = freezed,
    Object? verses = null,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as int,
            number: null == number
                ? _value.number
                : number // ignore: cast_nullable_to_non_nullable
                      as int,
            titleKo: null == titleKo
                ? _value.titleKo
                : titleKo // ignore: cast_nullable_to_non_nullable
                      as String,
            titleEn: null == titleEn
                ? _value.titleEn
                : titleEn // ignore: cast_nullable_to_non_nullable
                      as String,
            relatedTo: null == relatedTo
                ? _value.relatedTo
                : relatedTo // ignore: cast_nullable_to_non_nullable
                      as List<String>,
            theme: freezed == theme
                ? _value.theme
                : theme // ignore: cast_nullable_to_non_nullable
                      as String?,
            verses: null == verses
                ? _value.verses
                : verses // ignore: cast_nullable_to_non_nullable
                      as List<String>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$HymnImplCopyWith<$Res> implements $HymnCopyWith<$Res> {
  factory _$$HymnImplCopyWith(
    _$HymnImpl value,
    $Res Function(_$HymnImpl) then,
  ) = __$$HymnImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    int id,
    int number,
    @JsonKey(name: 'title_ko') String titleKo,
    @JsonKey(name: 'title_en') String titleEn,
    List<String> relatedTo,
    String? theme,
    List<String> verses,
  });
}

/// @nodoc
class __$$HymnImplCopyWithImpl<$Res>
    extends _$HymnCopyWithImpl<$Res, _$HymnImpl>
    implements _$$HymnImplCopyWith<$Res> {
  __$$HymnImplCopyWithImpl(_$HymnImpl _value, $Res Function(_$HymnImpl) _then)
    : super(_value, _then);

  /// Create a copy of Hymn
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? number = null,
    Object? titleKo = null,
    Object? titleEn = null,
    Object? relatedTo = null,
    Object? theme = freezed,
    Object? verses = null,
  }) {
    return _then(
      _$HymnImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as int,
        number: null == number
            ? _value.number
            : number // ignore: cast_nullable_to_non_nullable
                  as int,
        titleKo: null == titleKo
            ? _value.titleKo
            : titleKo // ignore: cast_nullable_to_non_nullable
                  as String,
        titleEn: null == titleEn
            ? _value.titleEn
            : titleEn // ignore: cast_nullable_to_non_nullable
                  as String,
        relatedTo: null == relatedTo
            ? _value._relatedTo
            : relatedTo // ignore: cast_nullable_to_non_nullable
                  as List<String>,
        theme: freezed == theme
            ? _value.theme
            : theme // ignore: cast_nullable_to_non_nullable
                  as String?,
        verses: null == verses
            ? _value._verses
            : verses // ignore: cast_nullable_to_non_nullable
                  as List<String>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$HymnImpl implements _Hymn {
  const _$HymnImpl({
    required this.id,
    required this.number,
    @JsonKey(name: 'title_ko') required this.titleKo,
    @JsonKey(name: 'title_en') required this.titleEn,
    final List<String> relatedTo = const [],
    this.theme,
    final List<String> verses = const [],
  }) : _relatedTo = relatedTo,
       _verses = verses;

  factory _$HymnImpl.fromJson(Map<String, dynamic> json) =>
      _$$HymnImplFromJson(json);

  @override
  final int id;
  @override
  final int number;
  @override
  @JsonKey(name: 'title_ko')
  final String titleKo;
  @override
  @JsonKey(name: 'title_en')
  final String titleEn;
  final List<String> _relatedTo;
  @override
  @JsonKey()
  List<String> get relatedTo {
    if (_relatedTo is EqualUnmodifiableListView) return _relatedTo;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_relatedTo);
  }

  @override
  final String? theme;
  final List<String> _verses;
  @override
  @JsonKey()
  List<String> get verses {
    if (_verses is EqualUnmodifiableListView) return _verses;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_verses);
  }

  @override
  String toString() {
    return 'Hymn(id: $id, number: $number, titleKo: $titleKo, titleEn: $titleEn, relatedTo: $relatedTo, theme: $theme, verses: $verses)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$HymnImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.number, number) || other.number == number) &&
            (identical(other.titleKo, titleKo) || other.titleKo == titleKo) &&
            (identical(other.titleEn, titleEn) || other.titleEn == titleEn) &&
            const DeepCollectionEquality().equals(
              other._relatedTo,
              _relatedTo,
            ) &&
            (identical(other.theme, theme) || other.theme == theme) &&
            const DeepCollectionEquality().equals(other._verses, _verses));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    number,
    titleKo,
    titleEn,
    const DeepCollectionEquality().hash(_relatedTo),
    theme,
    const DeepCollectionEquality().hash(_verses),
  );

  /// Create a copy of Hymn
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$HymnImplCopyWith<_$HymnImpl> get copyWith =>
      __$$HymnImplCopyWithImpl<_$HymnImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$HymnImplToJson(this);
  }
}

abstract class _Hymn implements Hymn {
  const factory _Hymn({
    required final int id,
    required final int number,
    @JsonKey(name: 'title_ko') required final String titleKo,
    @JsonKey(name: 'title_en') required final String titleEn,
    final List<String> relatedTo,
    final String? theme,
    final List<String> verses,
  }) = _$HymnImpl;

  factory _Hymn.fromJson(Map<String, dynamic> json) = _$HymnImpl.fromJson;

  @override
  int get id;
  @override
  int get number;
  @override
  @JsonKey(name: 'title_ko')
  String get titleKo;
  @override
  @JsonKey(name: 'title_en')
  String get titleEn;
  @override
  List<String> get relatedTo;
  @override
  String? get theme;
  @override
  List<String> get verses;

  /// Create a copy of Hymn
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$HymnImplCopyWith<_$HymnImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
