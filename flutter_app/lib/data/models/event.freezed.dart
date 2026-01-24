// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'event.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

BibleEvent _$BibleEventFromJson(Map<String, dynamic> json) {
  return _BibleEvent.fromJson(json);
}

/// @nodoc
mixin _$BibleEvent {
  String get id => throw _privateConstructorUsedError;
  @JsonKey(name: 'name_ko')
  String get nameKo => throw _privateConstructorUsedError;
  @JsonKey(name: 'name_en')
  String get nameEn => throw _privateConstructorUsedError;
  int get year => throw _privateConstructorUsedError;
  String get era => throw _privateConstructorUsedError;
  List<String> get books => throw _privateConstructorUsedError;
  List<String> get verses => throw _privateConstructorUsedError;
  @JsonKey(name: 'verse_text_ko')
  String? get verseTextKo => throw _privateConstructorUsedError;
  @JsonKey(name: 'verse_text_en')
  String? get verseTextEn => throw _privateConstructorUsedError;
  @JsonKey(name: 'description_ko')
  String get descriptionKo => throw _privateConstructorUsedError;
  @JsonKey(name: 'description_en')
  String get descriptionEn => throw _privateConstructorUsedError;
  List<String> get characters => throw _privateConstructorUsedError;
  String? get location => throw _privateConstructorUsedError;
  String? get icon => throw _privateConstructorUsedError;
  @JsonKey(name: 'commentary_ko')
  String? get commentaryKo => throw _privateConstructorUsedError;

  /// Serializes this BibleEvent to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of BibleEvent
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $BibleEventCopyWith<BibleEvent> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $BibleEventCopyWith<$Res> {
  factory $BibleEventCopyWith(
    BibleEvent value,
    $Res Function(BibleEvent) then,
  ) = _$BibleEventCopyWithImpl<$Res, BibleEvent>;
  @useResult
  $Res call({
    String id,
    @JsonKey(name: 'name_ko') String nameKo,
    @JsonKey(name: 'name_en') String nameEn,
    int year,
    String era,
    List<String> books,
    List<String> verses,
    @JsonKey(name: 'verse_text_ko') String? verseTextKo,
    @JsonKey(name: 'verse_text_en') String? verseTextEn,
    @JsonKey(name: 'description_ko') String descriptionKo,
    @JsonKey(name: 'description_en') String descriptionEn,
    List<String> characters,
    String? location,
    String? icon,
    @JsonKey(name: 'commentary_ko') String? commentaryKo,
  });
}

/// @nodoc
class _$BibleEventCopyWithImpl<$Res, $Val extends BibleEvent>
    implements $BibleEventCopyWith<$Res> {
  _$BibleEventCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of BibleEvent
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? nameKo = null,
    Object? nameEn = null,
    Object? year = null,
    Object? era = null,
    Object? books = null,
    Object? verses = null,
    Object? verseTextKo = freezed,
    Object? verseTextEn = freezed,
    Object? descriptionKo = null,
    Object? descriptionEn = null,
    Object? characters = null,
    Object? location = freezed,
    Object? icon = freezed,
    Object? commentaryKo = freezed,
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
            year: null == year
                ? _value.year
                : year // ignore: cast_nullable_to_non_nullable
                      as int,
            era: null == era
                ? _value.era
                : era // ignore: cast_nullable_to_non_nullable
                      as String,
            books: null == books
                ? _value.books
                : books // ignore: cast_nullable_to_non_nullable
                      as List<String>,
            verses: null == verses
                ? _value.verses
                : verses // ignore: cast_nullable_to_non_nullable
                      as List<String>,
            verseTextKo: freezed == verseTextKo
                ? _value.verseTextKo
                : verseTextKo // ignore: cast_nullable_to_non_nullable
                      as String?,
            verseTextEn: freezed == verseTextEn
                ? _value.verseTextEn
                : verseTextEn // ignore: cast_nullable_to_non_nullable
                      as String?,
            descriptionKo: null == descriptionKo
                ? _value.descriptionKo
                : descriptionKo // ignore: cast_nullable_to_non_nullable
                      as String,
            descriptionEn: null == descriptionEn
                ? _value.descriptionEn
                : descriptionEn // ignore: cast_nullable_to_non_nullable
                      as String,
            characters: null == characters
                ? _value.characters
                : characters // ignore: cast_nullable_to_non_nullable
                      as List<String>,
            location: freezed == location
                ? _value.location
                : location // ignore: cast_nullable_to_non_nullable
                      as String?,
            icon: freezed == icon
                ? _value.icon
                : icon // ignore: cast_nullable_to_non_nullable
                      as String?,
            commentaryKo: freezed == commentaryKo
                ? _value.commentaryKo
                : commentaryKo // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$BibleEventImplCopyWith<$Res>
    implements $BibleEventCopyWith<$Res> {
  factory _$$BibleEventImplCopyWith(
    _$BibleEventImpl value,
    $Res Function(_$BibleEventImpl) then,
  ) = __$$BibleEventImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    @JsonKey(name: 'name_ko') String nameKo,
    @JsonKey(name: 'name_en') String nameEn,
    int year,
    String era,
    List<String> books,
    List<String> verses,
    @JsonKey(name: 'verse_text_ko') String? verseTextKo,
    @JsonKey(name: 'verse_text_en') String? verseTextEn,
    @JsonKey(name: 'description_ko') String descriptionKo,
    @JsonKey(name: 'description_en') String descriptionEn,
    List<String> characters,
    String? location,
    String? icon,
    @JsonKey(name: 'commentary_ko') String? commentaryKo,
  });
}

/// @nodoc
class __$$BibleEventImplCopyWithImpl<$Res>
    extends _$BibleEventCopyWithImpl<$Res, _$BibleEventImpl>
    implements _$$BibleEventImplCopyWith<$Res> {
  __$$BibleEventImplCopyWithImpl(
    _$BibleEventImpl _value,
    $Res Function(_$BibleEventImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of BibleEvent
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? nameKo = null,
    Object? nameEn = null,
    Object? year = null,
    Object? era = null,
    Object? books = null,
    Object? verses = null,
    Object? verseTextKo = freezed,
    Object? verseTextEn = freezed,
    Object? descriptionKo = null,
    Object? descriptionEn = null,
    Object? characters = null,
    Object? location = freezed,
    Object? icon = freezed,
    Object? commentaryKo = freezed,
  }) {
    return _then(
      _$BibleEventImpl(
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
        year: null == year
            ? _value.year
            : year // ignore: cast_nullable_to_non_nullable
                  as int,
        era: null == era
            ? _value.era
            : era // ignore: cast_nullable_to_non_nullable
                  as String,
        books: null == books
            ? _value._books
            : books // ignore: cast_nullable_to_non_nullable
                  as List<String>,
        verses: null == verses
            ? _value._verses
            : verses // ignore: cast_nullable_to_non_nullable
                  as List<String>,
        verseTextKo: freezed == verseTextKo
            ? _value.verseTextKo
            : verseTextKo // ignore: cast_nullable_to_non_nullable
                  as String?,
        verseTextEn: freezed == verseTextEn
            ? _value.verseTextEn
            : verseTextEn // ignore: cast_nullable_to_non_nullable
                  as String?,
        descriptionKo: null == descriptionKo
            ? _value.descriptionKo
            : descriptionKo // ignore: cast_nullable_to_non_nullable
                  as String,
        descriptionEn: null == descriptionEn
            ? _value.descriptionEn
            : descriptionEn // ignore: cast_nullable_to_non_nullable
                  as String,
        characters: null == characters
            ? _value._characters
            : characters // ignore: cast_nullable_to_non_nullable
                  as List<String>,
        location: freezed == location
            ? _value.location
            : location // ignore: cast_nullable_to_non_nullable
                  as String?,
        icon: freezed == icon
            ? _value.icon
            : icon // ignore: cast_nullable_to_non_nullable
                  as String?,
        commentaryKo: freezed == commentaryKo
            ? _value.commentaryKo
            : commentaryKo // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$BibleEventImpl implements _BibleEvent {
  const _$BibleEventImpl({
    required this.id,
    @JsonKey(name: 'name_ko') required this.nameKo,
    @JsonKey(name: 'name_en') required this.nameEn,
    required this.year,
    required this.era,
    final List<String> books = const [],
    final List<String> verses = const [],
    @JsonKey(name: 'verse_text_ko') this.verseTextKo,
    @JsonKey(name: 'verse_text_en') this.verseTextEn,
    @JsonKey(name: 'description_ko') this.descriptionKo = '',
    @JsonKey(name: 'description_en') this.descriptionEn = '',
    final List<String> characters = const [],
    this.location,
    this.icon,
    @JsonKey(name: 'commentary_ko') this.commentaryKo,
  }) : _books = books,
       _verses = verses,
       _characters = characters;

  factory _$BibleEventImpl.fromJson(Map<String, dynamic> json) =>
      _$$BibleEventImplFromJson(json);

  @override
  final String id;
  @override
  @JsonKey(name: 'name_ko')
  final String nameKo;
  @override
  @JsonKey(name: 'name_en')
  final String nameEn;
  @override
  final int year;
  @override
  final String era;
  final List<String> _books;
  @override
  @JsonKey()
  List<String> get books {
    if (_books is EqualUnmodifiableListView) return _books;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_books);
  }

  final List<String> _verses;
  @override
  @JsonKey()
  List<String> get verses {
    if (_verses is EqualUnmodifiableListView) return _verses;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_verses);
  }

  @override
  @JsonKey(name: 'verse_text_ko')
  final String? verseTextKo;
  @override
  @JsonKey(name: 'verse_text_en')
  final String? verseTextEn;
  @override
  @JsonKey(name: 'description_ko')
  final String descriptionKo;
  @override
  @JsonKey(name: 'description_en')
  final String descriptionEn;
  final List<String> _characters;
  @override
  @JsonKey()
  List<String> get characters {
    if (_characters is EqualUnmodifiableListView) return _characters;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_characters);
  }

  @override
  final String? location;
  @override
  final String? icon;
  @override
  @JsonKey(name: 'commentary_ko')
  final String? commentaryKo;

  @override
  String toString() {
    return 'BibleEvent(id: $id, nameKo: $nameKo, nameEn: $nameEn, year: $year, era: $era, books: $books, verses: $verses, verseTextKo: $verseTextKo, verseTextEn: $verseTextEn, descriptionKo: $descriptionKo, descriptionEn: $descriptionEn, characters: $characters, location: $location, icon: $icon, commentaryKo: $commentaryKo)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$BibleEventImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.nameKo, nameKo) || other.nameKo == nameKo) &&
            (identical(other.nameEn, nameEn) || other.nameEn == nameEn) &&
            (identical(other.year, year) || other.year == year) &&
            (identical(other.era, era) || other.era == era) &&
            const DeepCollectionEquality().equals(other._books, _books) &&
            const DeepCollectionEquality().equals(other._verses, _verses) &&
            (identical(other.verseTextKo, verseTextKo) ||
                other.verseTextKo == verseTextKo) &&
            (identical(other.verseTextEn, verseTextEn) ||
                other.verseTextEn == verseTextEn) &&
            (identical(other.descriptionKo, descriptionKo) ||
                other.descriptionKo == descriptionKo) &&
            (identical(other.descriptionEn, descriptionEn) ||
                other.descriptionEn == descriptionEn) &&
            const DeepCollectionEquality().equals(
              other._characters,
              _characters,
            ) &&
            (identical(other.location, location) ||
                other.location == location) &&
            (identical(other.icon, icon) || other.icon == icon) &&
            (identical(other.commentaryKo, commentaryKo) ||
                other.commentaryKo == commentaryKo));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    nameKo,
    nameEn,
    year,
    era,
    const DeepCollectionEquality().hash(_books),
    const DeepCollectionEquality().hash(_verses),
    verseTextKo,
    verseTextEn,
    descriptionKo,
    descriptionEn,
    const DeepCollectionEquality().hash(_characters),
    location,
    icon,
    commentaryKo,
  );

  /// Create a copy of BibleEvent
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$BibleEventImplCopyWith<_$BibleEventImpl> get copyWith =>
      __$$BibleEventImplCopyWithImpl<_$BibleEventImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$BibleEventImplToJson(this);
  }
}

abstract class _BibleEvent implements BibleEvent {
  const factory _BibleEvent({
    required final String id,
    @JsonKey(name: 'name_ko') required final String nameKo,
    @JsonKey(name: 'name_en') required final String nameEn,
    required final int year,
    required final String era,
    final List<String> books,
    final List<String> verses,
    @JsonKey(name: 'verse_text_ko') final String? verseTextKo,
    @JsonKey(name: 'verse_text_en') final String? verseTextEn,
    @JsonKey(name: 'description_ko') final String descriptionKo,
    @JsonKey(name: 'description_en') final String descriptionEn,
    final List<String> characters,
    final String? location,
    final String? icon,
    @JsonKey(name: 'commentary_ko') final String? commentaryKo,
  }) = _$BibleEventImpl;

  factory _BibleEvent.fromJson(Map<String, dynamic> json) =
      _$BibleEventImpl.fromJson;

  @override
  String get id;
  @override
  @JsonKey(name: 'name_ko')
  String get nameKo;
  @override
  @JsonKey(name: 'name_en')
  String get nameEn;
  @override
  int get year;
  @override
  String get era;
  @override
  List<String> get books;
  @override
  List<String> get verses;
  @override
  @JsonKey(name: 'verse_text_ko')
  String? get verseTextKo;
  @override
  @JsonKey(name: 'verse_text_en')
  String? get verseTextEn;
  @override
  @JsonKey(name: 'description_ko')
  String get descriptionKo;
  @override
  @JsonKey(name: 'description_en')
  String get descriptionEn;
  @override
  List<String> get characters;
  @override
  String? get location;
  @override
  String? get icon;
  @override
  @JsonKey(name: 'commentary_ko')
  String? get commentaryKo;

  /// Create a copy of BibleEvent
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$BibleEventImplCopyWith<_$BibleEventImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

Era _$EraFromJson(Map<String, dynamic> json) {
  return _Era.fromJson(json);
}

/// @nodoc
mixin _$Era {
  String get id => throw _privateConstructorUsedError;
  @JsonKey(name: 'name_ko')
  String get nameKo => throw _privateConstructorUsedError;
  @JsonKey(name: 'name_en')
  String get nameEn => throw _privateConstructorUsedError;
  @JsonKey(name: 'year_start')
  int get yearStart => throw _privateConstructorUsedError;
  @JsonKey(name: 'year_end')
  int get yearEnd => throw _privateConstructorUsedError;
  String get color => throw _privateConstructorUsedError;
  int get order => throw _privateConstructorUsedError;

  /// Serializes this Era to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Era
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $EraCopyWith<Era> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $EraCopyWith<$Res> {
  factory $EraCopyWith(Era value, $Res Function(Era) then) =
      _$EraCopyWithImpl<$Res, Era>;
  @useResult
  $Res call({
    String id,
    @JsonKey(name: 'name_ko') String nameKo,
    @JsonKey(name: 'name_en') String nameEn,
    @JsonKey(name: 'year_start') int yearStart,
    @JsonKey(name: 'year_end') int yearEnd,
    String color,
    int order,
  });
}

/// @nodoc
class _$EraCopyWithImpl<$Res, $Val extends Era> implements $EraCopyWith<$Res> {
  _$EraCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Era
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? nameKo = null,
    Object? nameEn = null,
    Object? yearStart = null,
    Object? yearEnd = null,
    Object? color = null,
    Object? order = null,
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
            yearStart: null == yearStart
                ? _value.yearStart
                : yearStart // ignore: cast_nullable_to_non_nullable
                      as int,
            yearEnd: null == yearEnd
                ? _value.yearEnd
                : yearEnd // ignore: cast_nullable_to_non_nullable
                      as int,
            color: null == color
                ? _value.color
                : color // ignore: cast_nullable_to_non_nullable
                      as String,
            order: null == order
                ? _value.order
                : order // ignore: cast_nullable_to_non_nullable
                      as int,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$EraImplCopyWith<$Res> implements $EraCopyWith<$Res> {
  factory _$$EraImplCopyWith(_$EraImpl value, $Res Function(_$EraImpl) then) =
      __$$EraImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    @JsonKey(name: 'name_ko') String nameKo,
    @JsonKey(name: 'name_en') String nameEn,
    @JsonKey(name: 'year_start') int yearStart,
    @JsonKey(name: 'year_end') int yearEnd,
    String color,
    int order,
  });
}

/// @nodoc
class __$$EraImplCopyWithImpl<$Res> extends _$EraCopyWithImpl<$Res, _$EraImpl>
    implements _$$EraImplCopyWith<$Res> {
  __$$EraImplCopyWithImpl(_$EraImpl _value, $Res Function(_$EraImpl) _then)
    : super(_value, _then);

  /// Create a copy of Era
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? nameKo = null,
    Object? nameEn = null,
    Object? yearStart = null,
    Object? yearEnd = null,
    Object? color = null,
    Object? order = null,
  }) {
    return _then(
      _$EraImpl(
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
        yearStart: null == yearStart
            ? _value.yearStart
            : yearStart // ignore: cast_nullable_to_non_nullable
                  as int,
        yearEnd: null == yearEnd
            ? _value.yearEnd
            : yearEnd // ignore: cast_nullable_to_non_nullable
                  as int,
        color: null == color
            ? _value.color
            : color // ignore: cast_nullable_to_non_nullable
                  as String,
        order: null == order
            ? _value.order
            : order // ignore: cast_nullable_to_non_nullable
                  as int,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$EraImpl implements _Era {
  const _$EraImpl({
    required this.id,
    @JsonKey(name: 'name_ko') required this.nameKo,
    @JsonKey(name: 'name_en') required this.nameEn,
    @JsonKey(name: 'year_start') required this.yearStart,
    @JsonKey(name: 'year_end') required this.yearEnd,
    required this.color,
    required this.order,
  });

  factory _$EraImpl.fromJson(Map<String, dynamic> json) =>
      _$$EraImplFromJson(json);

  @override
  final String id;
  @override
  @JsonKey(name: 'name_ko')
  final String nameKo;
  @override
  @JsonKey(name: 'name_en')
  final String nameEn;
  @override
  @JsonKey(name: 'year_start')
  final int yearStart;
  @override
  @JsonKey(name: 'year_end')
  final int yearEnd;
  @override
  final String color;
  @override
  final int order;

  @override
  String toString() {
    return 'Era(id: $id, nameKo: $nameKo, nameEn: $nameEn, yearStart: $yearStart, yearEnd: $yearEnd, color: $color, order: $order)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$EraImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.nameKo, nameKo) || other.nameKo == nameKo) &&
            (identical(other.nameEn, nameEn) || other.nameEn == nameEn) &&
            (identical(other.yearStart, yearStart) ||
                other.yearStart == yearStart) &&
            (identical(other.yearEnd, yearEnd) || other.yearEnd == yearEnd) &&
            (identical(other.color, color) || other.color == color) &&
            (identical(other.order, order) || other.order == order));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    nameKo,
    nameEn,
    yearStart,
    yearEnd,
    color,
    order,
  );

  /// Create a copy of Era
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$EraImplCopyWith<_$EraImpl> get copyWith =>
      __$$EraImplCopyWithImpl<_$EraImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$EraImplToJson(this);
  }
}

abstract class _Era implements Era {
  const factory _Era({
    required final String id,
    @JsonKey(name: 'name_ko') required final String nameKo,
    @JsonKey(name: 'name_en') required final String nameEn,
    @JsonKey(name: 'year_start') required final int yearStart,
    @JsonKey(name: 'year_end') required final int yearEnd,
    required final String color,
    required final int order,
  }) = _$EraImpl;

  factory _Era.fromJson(Map<String, dynamic> json) = _$EraImpl.fromJson;

  @override
  String get id;
  @override
  @JsonKey(name: 'name_ko')
  String get nameKo;
  @override
  @JsonKey(name: 'name_en')
  String get nameEn;
  @override
  @JsonKey(name: 'year_start')
  int get yearStart;
  @override
  @JsonKey(name: 'year_end')
  int get yearEnd;
  @override
  String get color;
  @override
  int get order;

  /// Create a copy of Era
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$EraImplCopyWith<_$EraImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

EventsData _$EventsDataFromJson(Map<String, dynamic> json) {
  return _EventsData.fromJson(json);
}

/// @nodoc
mixin _$EventsData {
  List<BibleEvent> get events => throw _privateConstructorUsedError;
  List<Era> get eras => throw _privateConstructorUsedError;

  /// Serializes this EventsData to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of EventsData
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $EventsDataCopyWith<EventsData> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $EventsDataCopyWith<$Res> {
  factory $EventsDataCopyWith(
    EventsData value,
    $Res Function(EventsData) then,
  ) = _$EventsDataCopyWithImpl<$Res, EventsData>;
  @useResult
  $Res call({List<BibleEvent> events, List<Era> eras});
}

/// @nodoc
class _$EventsDataCopyWithImpl<$Res, $Val extends EventsData>
    implements $EventsDataCopyWith<$Res> {
  _$EventsDataCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of EventsData
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? events = null, Object? eras = null}) {
    return _then(
      _value.copyWith(
            events: null == events
                ? _value.events
                : events // ignore: cast_nullable_to_non_nullable
                      as List<BibleEvent>,
            eras: null == eras
                ? _value.eras
                : eras // ignore: cast_nullable_to_non_nullable
                      as List<Era>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$EventsDataImplCopyWith<$Res>
    implements $EventsDataCopyWith<$Res> {
  factory _$$EventsDataImplCopyWith(
    _$EventsDataImpl value,
    $Res Function(_$EventsDataImpl) then,
  ) = __$$EventsDataImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({List<BibleEvent> events, List<Era> eras});
}

/// @nodoc
class __$$EventsDataImplCopyWithImpl<$Res>
    extends _$EventsDataCopyWithImpl<$Res, _$EventsDataImpl>
    implements _$$EventsDataImplCopyWith<$Res> {
  __$$EventsDataImplCopyWithImpl(
    _$EventsDataImpl _value,
    $Res Function(_$EventsDataImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of EventsData
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? events = null, Object? eras = null}) {
    return _then(
      _$EventsDataImpl(
        events: null == events
            ? _value._events
            : events // ignore: cast_nullable_to_non_nullable
                  as List<BibleEvent>,
        eras: null == eras
            ? _value._eras
            : eras // ignore: cast_nullable_to_non_nullable
                  as List<Era>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$EventsDataImpl implements _EventsData {
  const _$EventsDataImpl({
    required final List<BibleEvent> events,
    required final List<Era> eras,
  }) : _events = events,
       _eras = eras;

  factory _$EventsDataImpl.fromJson(Map<String, dynamic> json) =>
      _$$EventsDataImplFromJson(json);

  final List<BibleEvent> _events;
  @override
  List<BibleEvent> get events {
    if (_events is EqualUnmodifiableListView) return _events;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_events);
  }

  final List<Era> _eras;
  @override
  List<Era> get eras {
    if (_eras is EqualUnmodifiableListView) return _eras;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_eras);
  }

  @override
  String toString() {
    return 'EventsData(events: $events, eras: $eras)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$EventsDataImpl &&
            const DeepCollectionEquality().equals(other._events, _events) &&
            const DeepCollectionEquality().equals(other._eras, _eras));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    const DeepCollectionEquality().hash(_events),
    const DeepCollectionEquality().hash(_eras),
  );

  /// Create a copy of EventsData
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$EventsDataImplCopyWith<_$EventsDataImpl> get copyWith =>
      __$$EventsDataImplCopyWithImpl<_$EventsDataImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$EventsDataImplToJson(this);
  }
}

abstract class _EventsData implements EventsData {
  const factory _EventsData({
    required final List<BibleEvent> events,
    required final List<Era> eras,
  }) = _$EventsDataImpl;

  factory _EventsData.fromJson(Map<String, dynamic> json) =
      _$EventsDataImpl.fromJson;

  @override
  List<BibleEvent> get events;
  @override
  List<Era> get eras;

  /// Create a copy of EventsData
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$EventsDataImplCopyWith<_$EventsDataImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
