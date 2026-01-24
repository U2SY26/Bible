// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'bible_book.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

BibleBook _$BibleBookFromJson(Map<String, dynamic> json) {
  return _BibleBook.fromJson(json);
}

/// @nodoc
mixin _$BibleBook {
  String get id => throw _privateConstructorUsedError;
  @JsonKey(name: 'name_ko')
  String get nameKo => throw _privateConstructorUsedError;
  @JsonKey(name: 'name_en')
  String get nameEn => throw _privateConstructorUsedError;
  int get chapters => throw _privateConstructorUsedError;
  String get category => throw _privateConstructorUsedError;
  @JsonKey(name: 'category_ko')
  String get categoryKo => throw _privateConstructorUsedError;

  /// Serializes this BibleBook to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of BibleBook
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $BibleBookCopyWith<BibleBook> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $BibleBookCopyWith<$Res> {
  factory $BibleBookCopyWith(BibleBook value, $Res Function(BibleBook) then) =
      _$BibleBookCopyWithImpl<$Res, BibleBook>;
  @useResult
  $Res call({
    String id,
    @JsonKey(name: 'name_ko') String nameKo,
    @JsonKey(name: 'name_en') String nameEn,
    int chapters,
    String category,
    @JsonKey(name: 'category_ko') String categoryKo,
  });
}

/// @nodoc
class _$BibleBookCopyWithImpl<$Res, $Val extends BibleBook>
    implements $BibleBookCopyWith<$Res> {
  _$BibleBookCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of BibleBook
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? nameKo = null,
    Object? nameEn = null,
    Object? chapters = null,
    Object? category = null,
    Object? categoryKo = null,
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
            chapters: null == chapters
                ? _value.chapters
                : chapters // ignore: cast_nullable_to_non_nullable
                      as int,
            category: null == category
                ? _value.category
                : category // ignore: cast_nullable_to_non_nullable
                      as String,
            categoryKo: null == categoryKo
                ? _value.categoryKo
                : categoryKo // ignore: cast_nullable_to_non_nullable
                      as String,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$BibleBookImplCopyWith<$Res>
    implements $BibleBookCopyWith<$Res> {
  factory _$$BibleBookImplCopyWith(
    _$BibleBookImpl value,
    $Res Function(_$BibleBookImpl) then,
  ) = __$$BibleBookImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    @JsonKey(name: 'name_ko') String nameKo,
    @JsonKey(name: 'name_en') String nameEn,
    int chapters,
    String category,
    @JsonKey(name: 'category_ko') String categoryKo,
  });
}

/// @nodoc
class __$$BibleBookImplCopyWithImpl<$Res>
    extends _$BibleBookCopyWithImpl<$Res, _$BibleBookImpl>
    implements _$$BibleBookImplCopyWith<$Res> {
  __$$BibleBookImplCopyWithImpl(
    _$BibleBookImpl _value,
    $Res Function(_$BibleBookImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of BibleBook
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? nameKo = null,
    Object? nameEn = null,
    Object? chapters = null,
    Object? category = null,
    Object? categoryKo = null,
  }) {
    return _then(
      _$BibleBookImpl(
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
        chapters: null == chapters
            ? _value.chapters
            : chapters // ignore: cast_nullable_to_non_nullable
                  as int,
        category: null == category
            ? _value.category
            : category // ignore: cast_nullable_to_non_nullable
                  as String,
        categoryKo: null == categoryKo
            ? _value.categoryKo
            : categoryKo // ignore: cast_nullable_to_non_nullable
                  as String,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$BibleBookImpl implements _BibleBook {
  const _$BibleBookImpl({
    required this.id,
    @JsonKey(name: 'name_ko') required this.nameKo,
    @JsonKey(name: 'name_en') required this.nameEn,
    required this.chapters,
    required this.category,
    @JsonKey(name: 'category_ko') required this.categoryKo,
  });

  factory _$BibleBookImpl.fromJson(Map<String, dynamic> json) =>
      _$$BibleBookImplFromJson(json);

  @override
  final String id;
  @override
  @JsonKey(name: 'name_ko')
  final String nameKo;
  @override
  @JsonKey(name: 'name_en')
  final String nameEn;
  @override
  final int chapters;
  @override
  final String category;
  @override
  @JsonKey(name: 'category_ko')
  final String categoryKo;

  @override
  String toString() {
    return 'BibleBook(id: $id, nameKo: $nameKo, nameEn: $nameEn, chapters: $chapters, category: $category, categoryKo: $categoryKo)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$BibleBookImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.nameKo, nameKo) || other.nameKo == nameKo) &&
            (identical(other.nameEn, nameEn) || other.nameEn == nameEn) &&
            (identical(other.chapters, chapters) ||
                other.chapters == chapters) &&
            (identical(other.category, category) ||
                other.category == category) &&
            (identical(other.categoryKo, categoryKo) ||
                other.categoryKo == categoryKo));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    nameKo,
    nameEn,
    chapters,
    category,
    categoryKo,
  );

  /// Create a copy of BibleBook
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$BibleBookImplCopyWith<_$BibleBookImpl> get copyWith =>
      __$$BibleBookImplCopyWithImpl<_$BibleBookImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$BibleBookImplToJson(this);
  }
}

abstract class _BibleBook implements BibleBook {
  const factory _BibleBook({
    required final String id,
    @JsonKey(name: 'name_ko') required final String nameKo,
    @JsonKey(name: 'name_en') required final String nameEn,
    required final int chapters,
    required final String category,
    @JsonKey(name: 'category_ko') required final String categoryKo,
  }) = _$BibleBookImpl;

  factory _BibleBook.fromJson(Map<String, dynamic> json) =
      _$BibleBookImpl.fromJson;

  @override
  String get id;
  @override
  @JsonKey(name: 'name_ko')
  String get nameKo;
  @override
  @JsonKey(name: 'name_en')
  String get nameEn;
  @override
  int get chapters;
  @override
  String get category;
  @override
  @JsonKey(name: 'category_ko')
  String get categoryKo;

  /// Create a copy of BibleBook
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$BibleBookImplCopyWith<_$BibleBookImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

BibleBookCategory _$BibleBookCategoryFromJson(Map<String, dynamic> json) {
  return _BibleBookCategory.fromJson(json);
}

/// @nodoc
mixin _$BibleBookCategory {
  String get id => throw _privateConstructorUsedError;
  @JsonKey(name: 'name_ko')
  String get nameKo => throw _privateConstructorUsedError;
  @JsonKey(name: 'name_en')
  String get nameEn => throw _privateConstructorUsedError;
  String get testament => throw _privateConstructorUsedError;
  List<BibleBook> get books => throw _privateConstructorUsedError;

  /// Serializes this BibleBookCategory to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of BibleBookCategory
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $BibleBookCategoryCopyWith<BibleBookCategory> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $BibleBookCategoryCopyWith<$Res> {
  factory $BibleBookCategoryCopyWith(
    BibleBookCategory value,
    $Res Function(BibleBookCategory) then,
  ) = _$BibleBookCategoryCopyWithImpl<$Res, BibleBookCategory>;
  @useResult
  $Res call({
    String id,
    @JsonKey(name: 'name_ko') String nameKo,
    @JsonKey(name: 'name_en') String nameEn,
    String testament,
    List<BibleBook> books,
  });
}

/// @nodoc
class _$BibleBookCategoryCopyWithImpl<$Res, $Val extends BibleBookCategory>
    implements $BibleBookCategoryCopyWith<$Res> {
  _$BibleBookCategoryCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of BibleBookCategory
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? nameKo = null,
    Object? nameEn = null,
    Object? testament = null,
    Object? books = null,
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
            books: null == books
                ? _value.books
                : books // ignore: cast_nullable_to_non_nullable
                      as List<BibleBook>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$BibleBookCategoryImplCopyWith<$Res>
    implements $BibleBookCategoryCopyWith<$Res> {
  factory _$$BibleBookCategoryImplCopyWith(
    _$BibleBookCategoryImpl value,
    $Res Function(_$BibleBookCategoryImpl) then,
  ) = __$$BibleBookCategoryImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    @JsonKey(name: 'name_ko') String nameKo,
    @JsonKey(name: 'name_en') String nameEn,
    String testament,
    List<BibleBook> books,
  });
}

/// @nodoc
class __$$BibleBookCategoryImplCopyWithImpl<$Res>
    extends _$BibleBookCategoryCopyWithImpl<$Res, _$BibleBookCategoryImpl>
    implements _$$BibleBookCategoryImplCopyWith<$Res> {
  __$$BibleBookCategoryImplCopyWithImpl(
    _$BibleBookCategoryImpl _value,
    $Res Function(_$BibleBookCategoryImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of BibleBookCategory
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? nameKo = null,
    Object? nameEn = null,
    Object? testament = null,
    Object? books = null,
  }) {
    return _then(
      _$BibleBookCategoryImpl(
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
        books: null == books
            ? _value._books
            : books // ignore: cast_nullable_to_non_nullable
                  as List<BibleBook>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$BibleBookCategoryImpl implements _BibleBookCategory {
  const _$BibleBookCategoryImpl({
    required this.id,
    @JsonKey(name: 'name_ko') required this.nameKo,
    @JsonKey(name: 'name_en') required this.nameEn,
    required this.testament,
    required final List<BibleBook> books,
  }) : _books = books;

  factory _$BibleBookCategoryImpl.fromJson(Map<String, dynamic> json) =>
      _$$BibleBookCategoryImplFromJson(json);

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
  final List<BibleBook> _books;
  @override
  List<BibleBook> get books {
    if (_books is EqualUnmodifiableListView) return _books;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_books);
  }

  @override
  String toString() {
    return 'BibleBookCategory(id: $id, nameKo: $nameKo, nameEn: $nameEn, testament: $testament, books: $books)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$BibleBookCategoryImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.nameKo, nameKo) || other.nameKo == nameKo) &&
            (identical(other.nameEn, nameEn) || other.nameEn == nameEn) &&
            (identical(other.testament, testament) ||
                other.testament == testament) &&
            const DeepCollectionEquality().equals(other._books, _books));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    nameKo,
    nameEn,
    testament,
    const DeepCollectionEquality().hash(_books),
  );

  /// Create a copy of BibleBookCategory
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$BibleBookCategoryImplCopyWith<_$BibleBookCategoryImpl> get copyWith =>
      __$$BibleBookCategoryImplCopyWithImpl<_$BibleBookCategoryImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$BibleBookCategoryImplToJson(this);
  }
}

abstract class _BibleBookCategory implements BibleBookCategory {
  const factory _BibleBookCategory({
    required final String id,
    @JsonKey(name: 'name_ko') required final String nameKo,
    @JsonKey(name: 'name_en') required final String nameEn,
    required final String testament,
    required final List<BibleBook> books,
  }) = _$BibleBookCategoryImpl;

  factory _BibleBookCategory.fromJson(Map<String, dynamic> json) =
      _$BibleBookCategoryImpl.fromJson;

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
  List<BibleBook> get books;

  /// Create a copy of BibleBookCategory
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$BibleBookCategoryImplCopyWith<_$BibleBookCategoryImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

BooksData _$BooksDataFromJson(Map<String, dynamic> json) {
  return _BooksData.fromJson(json);
}

/// @nodoc
mixin _$BooksData {
  Map<String, dynamic> get bibleBooks => throw _privateConstructorUsedError;
  List<BibleBook> get allBooks => throw _privateConstructorUsedError;

  /// Serializes this BooksData to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of BooksData
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $BooksDataCopyWith<BooksData> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $BooksDataCopyWith<$Res> {
  factory $BooksDataCopyWith(BooksData value, $Res Function(BooksData) then) =
      _$BooksDataCopyWithImpl<$Res, BooksData>;
  @useResult
  $Res call({Map<String, dynamic> bibleBooks, List<BibleBook> allBooks});
}

/// @nodoc
class _$BooksDataCopyWithImpl<$Res, $Val extends BooksData>
    implements $BooksDataCopyWith<$Res> {
  _$BooksDataCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of BooksData
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? bibleBooks = null, Object? allBooks = null}) {
    return _then(
      _value.copyWith(
            bibleBooks: null == bibleBooks
                ? _value.bibleBooks
                : bibleBooks // ignore: cast_nullable_to_non_nullable
                      as Map<String, dynamic>,
            allBooks: null == allBooks
                ? _value.allBooks
                : allBooks // ignore: cast_nullable_to_non_nullable
                      as List<BibleBook>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$BooksDataImplCopyWith<$Res>
    implements $BooksDataCopyWith<$Res> {
  factory _$$BooksDataImplCopyWith(
    _$BooksDataImpl value,
    $Res Function(_$BooksDataImpl) then,
  ) = __$$BooksDataImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({Map<String, dynamic> bibleBooks, List<BibleBook> allBooks});
}

/// @nodoc
class __$$BooksDataImplCopyWithImpl<$Res>
    extends _$BooksDataCopyWithImpl<$Res, _$BooksDataImpl>
    implements _$$BooksDataImplCopyWith<$Res> {
  __$$BooksDataImplCopyWithImpl(
    _$BooksDataImpl _value,
    $Res Function(_$BooksDataImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of BooksData
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? bibleBooks = null, Object? allBooks = null}) {
    return _then(
      _$BooksDataImpl(
        bibleBooks: null == bibleBooks
            ? _value._bibleBooks
            : bibleBooks // ignore: cast_nullable_to_non_nullable
                  as Map<String, dynamic>,
        allBooks: null == allBooks
            ? _value._allBooks
            : allBooks // ignore: cast_nullable_to_non_nullable
                  as List<BibleBook>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$BooksDataImpl implements _BooksData {
  const _$BooksDataImpl({
    required final Map<String, dynamic> bibleBooks,
    required final List<BibleBook> allBooks,
  }) : _bibleBooks = bibleBooks,
       _allBooks = allBooks;

  factory _$BooksDataImpl.fromJson(Map<String, dynamic> json) =>
      _$$BooksDataImplFromJson(json);

  final Map<String, dynamic> _bibleBooks;
  @override
  Map<String, dynamic> get bibleBooks {
    if (_bibleBooks is EqualUnmodifiableMapView) return _bibleBooks;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableMapView(_bibleBooks);
  }

  final List<BibleBook> _allBooks;
  @override
  List<BibleBook> get allBooks {
    if (_allBooks is EqualUnmodifiableListView) return _allBooks;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_allBooks);
  }

  @override
  String toString() {
    return 'BooksData(bibleBooks: $bibleBooks, allBooks: $allBooks)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$BooksDataImpl &&
            const DeepCollectionEquality().equals(
              other._bibleBooks,
              _bibleBooks,
            ) &&
            const DeepCollectionEquality().equals(other._allBooks, _allBooks));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    const DeepCollectionEquality().hash(_bibleBooks),
    const DeepCollectionEquality().hash(_allBooks),
  );

  /// Create a copy of BooksData
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$BooksDataImplCopyWith<_$BooksDataImpl> get copyWith =>
      __$$BooksDataImplCopyWithImpl<_$BooksDataImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$BooksDataImplToJson(this);
  }
}

abstract class _BooksData implements BooksData {
  const factory _BooksData({
    required final Map<String, dynamic> bibleBooks,
    required final List<BibleBook> allBooks,
  }) = _$BooksDataImpl;

  factory _BooksData.fromJson(Map<String, dynamic> json) =
      _$BooksDataImpl.fromJson;

  @override
  Map<String, dynamic> get bibleBooks;
  @override
  List<BibleBook> get allBooks;

  /// Create a copy of BooksData
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$BooksDataImplCopyWith<_$BooksDataImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

BibleData _$BibleDataFromJson(Map<String, dynamic> json) {
  return _BibleData.fromJson(json);
}

/// @nodoc
mixin _$BibleData {
  String get version => throw _privateConstructorUsedError;
  @JsonKey(name: 'version_en')
  String get versionEn => throw _privateConstructorUsedError;
  String? get copyright => throw _privateConstructorUsedError;
  List<BibleBookFull> get books => throw _privateConstructorUsedError;

  /// Serializes this BibleData to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of BibleData
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $BibleDataCopyWith<BibleData> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $BibleDataCopyWith<$Res> {
  factory $BibleDataCopyWith(BibleData value, $Res Function(BibleData) then) =
      _$BibleDataCopyWithImpl<$Res, BibleData>;
  @useResult
  $Res call({
    String version,
    @JsonKey(name: 'version_en') String versionEn,
    String? copyright,
    List<BibleBookFull> books,
  });
}

/// @nodoc
class _$BibleDataCopyWithImpl<$Res, $Val extends BibleData>
    implements $BibleDataCopyWith<$Res> {
  _$BibleDataCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of BibleData
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? version = null,
    Object? versionEn = null,
    Object? copyright = freezed,
    Object? books = null,
  }) {
    return _then(
      _value.copyWith(
            version: null == version
                ? _value.version
                : version // ignore: cast_nullable_to_non_nullable
                      as String,
            versionEn: null == versionEn
                ? _value.versionEn
                : versionEn // ignore: cast_nullable_to_non_nullable
                      as String,
            copyright: freezed == copyright
                ? _value.copyright
                : copyright // ignore: cast_nullable_to_non_nullable
                      as String?,
            books: null == books
                ? _value.books
                : books // ignore: cast_nullable_to_non_nullable
                      as List<BibleBookFull>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$BibleDataImplCopyWith<$Res>
    implements $BibleDataCopyWith<$Res> {
  factory _$$BibleDataImplCopyWith(
    _$BibleDataImpl value,
    $Res Function(_$BibleDataImpl) then,
  ) = __$$BibleDataImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String version,
    @JsonKey(name: 'version_en') String versionEn,
    String? copyright,
    List<BibleBookFull> books,
  });
}

/// @nodoc
class __$$BibleDataImplCopyWithImpl<$Res>
    extends _$BibleDataCopyWithImpl<$Res, _$BibleDataImpl>
    implements _$$BibleDataImplCopyWith<$Res> {
  __$$BibleDataImplCopyWithImpl(
    _$BibleDataImpl _value,
    $Res Function(_$BibleDataImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of BibleData
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? version = null,
    Object? versionEn = null,
    Object? copyright = freezed,
    Object? books = null,
  }) {
    return _then(
      _$BibleDataImpl(
        version: null == version
            ? _value.version
            : version // ignore: cast_nullable_to_non_nullable
                  as String,
        versionEn: null == versionEn
            ? _value.versionEn
            : versionEn // ignore: cast_nullable_to_non_nullable
                  as String,
        copyright: freezed == copyright
            ? _value.copyright
            : copyright // ignore: cast_nullable_to_non_nullable
                  as String?,
        books: null == books
            ? _value._books
            : books // ignore: cast_nullable_to_non_nullable
                  as List<BibleBookFull>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$BibleDataImpl implements _BibleData {
  const _$BibleDataImpl({
    required this.version,
    @JsonKey(name: 'version_en') required this.versionEn,
    this.copyright,
    required final List<BibleBookFull> books,
  }) : _books = books;

  factory _$BibleDataImpl.fromJson(Map<String, dynamic> json) =>
      _$$BibleDataImplFromJson(json);

  @override
  final String version;
  @override
  @JsonKey(name: 'version_en')
  final String versionEn;
  @override
  final String? copyright;
  final List<BibleBookFull> _books;
  @override
  List<BibleBookFull> get books {
    if (_books is EqualUnmodifiableListView) return _books;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_books);
  }

  @override
  String toString() {
    return 'BibleData(version: $version, versionEn: $versionEn, copyright: $copyright, books: $books)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$BibleDataImpl &&
            (identical(other.version, version) || other.version == version) &&
            (identical(other.versionEn, versionEn) ||
                other.versionEn == versionEn) &&
            (identical(other.copyright, copyright) ||
                other.copyright == copyright) &&
            const DeepCollectionEquality().equals(other._books, _books));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    version,
    versionEn,
    copyright,
    const DeepCollectionEquality().hash(_books),
  );

  /// Create a copy of BibleData
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$BibleDataImplCopyWith<_$BibleDataImpl> get copyWith =>
      __$$BibleDataImplCopyWithImpl<_$BibleDataImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$BibleDataImplToJson(this);
  }
}

abstract class _BibleData implements BibleData {
  const factory _BibleData({
    required final String version,
    @JsonKey(name: 'version_en') required final String versionEn,
    final String? copyright,
    required final List<BibleBookFull> books,
  }) = _$BibleDataImpl;

  factory _BibleData.fromJson(Map<String, dynamic> json) =
      _$BibleDataImpl.fromJson;

  @override
  String get version;
  @override
  @JsonKey(name: 'version_en')
  String get versionEn;
  @override
  String? get copyright;
  @override
  List<BibleBookFull> get books;

  /// Create a copy of BibleData
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$BibleDataImplCopyWith<_$BibleDataImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

BibleBookFull _$BibleBookFullFromJson(Map<String, dynamic> json) {
  return _BibleBookFull.fromJson(json);
}

/// @nodoc
mixin _$BibleBookFull {
  String get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  @JsonKey(name: 'name_en')
  String? get nameEn => throw _privateConstructorUsedError;
  String get testament => throw _privateConstructorUsedError;
  @JsonKey(name: 'chapters')
  List<BibleChapter> get chaptersList => throw _privateConstructorUsedError;

  /// Serializes this BibleBookFull to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of BibleBookFull
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $BibleBookFullCopyWith<BibleBookFull> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $BibleBookFullCopyWith<$Res> {
  factory $BibleBookFullCopyWith(
    BibleBookFull value,
    $Res Function(BibleBookFull) then,
  ) = _$BibleBookFullCopyWithImpl<$Res, BibleBookFull>;
  @useResult
  $Res call({
    String id,
    String name,
    @JsonKey(name: 'name_en') String? nameEn,
    String testament,
    @JsonKey(name: 'chapters') List<BibleChapter> chaptersList,
  });
}

/// @nodoc
class _$BibleBookFullCopyWithImpl<$Res, $Val extends BibleBookFull>
    implements $BibleBookFullCopyWith<$Res> {
  _$BibleBookFullCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of BibleBookFull
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? nameEn = freezed,
    Object? testament = null,
    Object? chaptersList = null,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            name: null == name
                ? _value.name
                : name // ignore: cast_nullable_to_non_nullable
                      as String,
            nameEn: freezed == nameEn
                ? _value.nameEn
                : nameEn // ignore: cast_nullable_to_non_nullable
                      as String?,
            testament: null == testament
                ? _value.testament
                : testament // ignore: cast_nullable_to_non_nullable
                      as String,
            chaptersList: null == chaptersList
                ? _value.chaptersList
                : chaptersList // ignore: cast_nullable_to_non_nullable
                      as List<BibleChapter>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$BibleBookFullImplCopyWith<$Res>
    implements $BibleBookFullCopyWith<$Res> {
  factory _$$BibleBookFullImplCopyWith(
    _$BibleBookFullImpl value,
    $Res Function(_$BibleBookFullImpl) then,
  ) = __$$BibleBookFullImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String name,
    @JsonKey(name: 'name_en') String? nameEn,
    String testament,
    @JsonKey(name: 'chapters') List<BibleChapter> chaptersList,
  });
}

/// @nodoc
class __$$BibleBookFullImplCopyWithImpl<$Res>
    extends _$BibleBookFullCopyWithImpl<$Res, _$BibleBookFullImpl>
    implements _$$BibleBookFullImplCopyWith<$Res> {
  __$$BibleBookFullImplCopyWithImpl(
    _$BibleBookFullImpl _value,
    $Res Function(_$BibleBookFullImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of BibleBookFull
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? nameEn = freezed,
    Object? testament = null,
    Object? chaptersList = null,
  }) {
    return _then(
      _$BibleBookFullImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        name: null == name
            ? _value.name
            : name // ignore: cast_nullable_to_non_nullable
                  as String,
        nameEn: freezed == nameEn
            ? _value.nameEn
            : nameEn // ignore: cast_nullable_to_non_nullable
                  as String?,
        testament: null == testament
            ? _value.testament
            : testament // ignore: cast_nullable_to_non_nullable
                  as String,
        chaptersList: null == chaptersList
            ? _value._chaptersList
            : chaptersList // ignore: cast_nullable_to_non_nullable
                  as List<BibleChapter>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$BibleBookFullImpl implements _BibleBookFull {
  const _$BibleBookFullImpl({
    required this.id,
    required this.name,
    @JsonKey(name: 'name_en') this.nameEn,
    required this.testament,
    @JsonKey(name: 'chapters') required final List<BibleChapter> chaptersList,
  }) : _chaptersList = chaptersList;

  factory _$BibleBookFullImpl.fromJson(Map<String, dynamic> json) =>
      _$$BibleBookFullImplFromJson(json);

  @override
  final String id;
  @override
  final String name;
  @override
  @JsonKey(name: 'name_en')
  final String? nameEn;
  @override
  final String testament;
  final List<BibleChapter> _chaptersList;
  @override
  @JsonKey(name: 'chapters')
  List<BibleChapter> get chaptersList {
    if (_chaptersList is EqualUnmodifiableListView) return _chaptersList;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_chaptersList);
  }

  @override
  String toString() {
    return 'BibleBookFull(id: $id, name: $name, nameEn: $nameEn, testament: $testament, chaptersList: $chaptersList)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$BibleBookFullImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.nameEn, nameEn) || other.nameEn == nameEn) &&
            (identical(other.testament, testament) ||
                other.testament == testament) &&
            const DeepCollectionEquality().equals(
              other._chaptersList,
              _chaptersList,
            ));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    name,
    nameEn,
    testament,
    const DeepCollectionEquality().hash(_chaptersList),
  );

  /// Create a copy of BibleBookFull
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$BibleBookFullImplCopyWith<_$BibleBookFullImpl> get copyWith =>
      __$$BibleBookFullImplCopyWithImpl<_$BibleBookFullImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$BibleBookFullImplToJson(this);
  }
}

abstract class _BibleBookFull implements BibleBookFull {
  const factory _BibleBookFull({
    required final String id,
    required final String name,
    @JsonKey(name: 'name_en') final String? nameEn,
    required final String testament,
    @JsonKey(name: 'chapters') required final List<BibleChapter> chaptersList,
  }) = _$BibleBookFullImpl;

  factory _BibleBookFull.fromJson(Map<String, dynamic> json) =
      _$BibleBookFullImpl.fromJson;

  @override
  String get id;
  @override
  String get name;
  @override
  @JsonKey(name: 'name_en')
  String? get nameEn;
  @override
  String get testament;
  @override
  @JsonKey(name: 'chapters')
  List<BibleChapter> get chaptersList;

  /// Create a copy of BibleBookFull
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$BibleBookFullImplCopyWith<_$BibleBookFullImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

BibleChapter _$BibleChapterFromJson(Map<String, dynamic> json) {
  return _BibleChapter.fromJson(json);
}

/// @nodoc
mixin _$BibleChapter {
  int get chapter => throw _privateConstructorUsedError;
  List<BibleVerse> get verses => throw _privateConstructorUsedError;

  /// Serializes this BibleChapter to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of BibleChapter
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $BibleChapterCopyWith<BibleChapter> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $BibleChapterCopyWith<$Res> {
  factory $BibleChapterCopyWith(
    BibleChapter value,
    $Res Function(BibleChapter) then,
  ) = _$BibleChapterCopyWithImpl<$Res, BibleChapter>;
  @useResult
  $Res call({int chapter, List<BibleVerse> verses});
}

/// @nodoc
class _$BibleChapterCopyWithImpl<$Res, $Val extends BibleChapter>
    implements $BibleChapterCopyWith<$Res> {
  _$BibleChapterCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of BibleChapter
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? chapter = null, Object? verses = null}) {
    return _then(
      _value.copyWith(
            chapter: null == chapter
                ? _value.chapter
                : chapter // ignore: cast_nullable_to_non_nullable
                      as int,
            verses: null == verses
                ? _value.verses
                : verses // ignore: cast_nullable_to_non_nullable
                      as List<BibleVerse>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$BibleChapterImplCopyWith<$Res>
    implements $BibleChapterCopyWith<$Res> {
  factory _$$BibleChapterImplCopyWith(
    _$BibleChapterImpl value,
    $Res Function(_$BibleChapterImpl) then,
  ) = __$$BibleChapterImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({int chapter, List<BibleVerse> verses});
}

/// @nodoc
class __$$BibleChapterImplCopyWithImpl<$Res>
    extends _$BibleChapterCopyWithImpl<$Res, _$BibleChapterImpl>
    implements _$$BibleChapterImplCopyWith<$Res> {
  __$$BibleChapterImplCopyWithImpl(
    _$BibleChapterImpl _value,
    $Res Function(_$BibleChapterImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of BibleChapter
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? chapter = null, Object? verses = null}) {
    return _then(
      _$BibleChapterImpl(
        chapter: null == chapter
            ? _value.chapter
            : chapter // ignore: cast_nullable_to_non_nullable
                  as int,
        verses: null == verses
            ? _value._verses
            : verses // ignore: cast_nullable_to_non_nullable
                  as List<BibleVerse>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$BibleChapterImpl implements _BibleChapter {
  const _$BibleChapterImpl({
    required this.chapter,
    required final List<BibleVerse> verses,
  }) : _verses = verses;

  factory _$BibleChapterImpl.fromJson(Map<String, dynamic> json) =>
      _$$BibleChapterImplFromJson(json);

  @override
  final int chapter;
  final List<BibleVerse> _verses;
  @override
  List<BibleVerse> get verses {
    if (_verses is EqualUnmodifiableListView) return _verses;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_verses);
  }

  @override
  String toString() {
    return 'BibleChapter(chapter: $chapter, verses: $verses)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$BibleChapterImpl &&
            (identical(other.chapter, chapter) || other.chapter == chapter) &&
            const DeepCollectionEquality().equals(other._verses, _verses));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    chapter,
    const DeepCollectionEquality().hash(_verses),
  );

  /// Create a copy of BibleChapter
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$BibleChapterImplCopyWith<_$BibleChapterImpl> get copyWith =>
      __$$BibleChapterImplCopyWithImpl<_$BibleChapterImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$BibleChapterImplToJson(this);
  }
}

abstract class _BibleChapter implements BibleChapter {
  const factory _BibleChapter({
    required final int chapter,
    required final List<BibleVerse> verses,
  }) = _$BibleChapterImpl;

  factory _BibleChapter.fromJson(Map<String, dynamic> json) =
      _$BibleChapterImpl.fromJson;

  @override
  int get chapter;
  @override
  List<BibleVerse> get verses;

  /// Create a copy of BibleChapter
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$BibleChapterImplCopyWith<_$BibleChapterImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

BibleVerse _$BibleVerseFromJson(Map<String, dynamic> json) {
  return _BibleVerse.fromJson(json);
}

/// @nodoc
mixin _$BibleVerse {
  int get verse => throw _privateConstructorUsedError;
  String get text => throw _privateConstructorUsedError;

  /// Serializes this BibleVerse to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of BibleVerse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $BibleVerseCopyWith<BibleVerse> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $BibleVerseCopyWith<$Res> {
  factory $BibleVerseCopyWith(
    BibleVerse value,
    $Res Function(BibleVerse) then,
  ) = _$BibleVerseCopyWithImpl<$Res, BibleVerse>;
  @useResult
  $Res call({int verse, String text});
}

/// @nodoc
class _$BibleVerseCopyWithImpl<$Res, $Val extends BibleVerse>
    implements $BibleVerseCopyWith<$Res> {
  _$BibleVerseCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of BibleVerse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? verse = null, Object? text = null}) {
    return _then(
      _value.copyWith(
            verse: null == verse
                ? _value.verse
                : verse // ignore: cast_nullable_to_non_nullable
                      as int,
            text: null == text
                ? _value.text
                : text // ignore: cast_nullable_to_non_nullable
                      as String,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$BibleVerseImplCopyWith<$Res>
    implements $BibleVerseCopyWith<$Res> {
  factory _$$BibleVerseImplCopyWith(
    _$BibleVerseImpl value,
    $Res Function(_$BibleVerseImpl) then,
  ) = __$$BibleVerseImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({int verse, String text});
}

/// @nodoc
class __$$BibleVerseImplCopyWithImpl<$Res>
    extends _$BibleVerseCopyWithImpl<$Res, _$BibleVerseImpl>
    implements _$$BibleVerseImplCopyWith<$Res> {
  __$$BibleVerseImplCopyWithImpl(
    _$BibleVerseImpl _value,
    $Res Function(_$BibleVerseImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of BibleVerse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? verse = null, Object? text = null}) {
    return _then(
      _$BibleVerseImpl(
        verse: null == verse
            ? _value.verse
            : verse // ignore: cast_nullable_to_non_nullable
                  as int,
        text: null == text
            ? _value.text
            : text // ignore: cast_nullable_to_non_nullable
                  as String,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$BibleVerseImpl implements _BibleVerse {
  const _$BibleVerseImpl({required this.verse, required this.text});

  factory _$BibleVerseImpl.fromJson(Map<String, dynamic> json) =>
      _$$BibleVerseImplFromJson(json);

  @override
  final int verse;
  @override
  final String text;

  @override
  String toString() {
    return 'BibleVerse(verse: $verse, text: $text)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$BibleVerseImpl &&
            (identical(other.verse, verse) || other.verse == verse) &&
            (identical(other.text, text) || other.text == text));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, verse, text);

  /// Create a copy of BibleVerse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$BibleVerseImplCopyWith<_$BibleVerseImpl> get copyWith =>
      __$$BibleVerseImplCopyWithImpl<_$BibleVerseImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$BibleVerseImplToJson(this);
  }
}

abstract class _BibleVerse implements BibleVerse {
  const factory _BibleVerse({
    required final int verse,
    required final String text,
  }) = _$BibleVerseImpl;

  factory _BibleVerse.fromJson(Map<String, dynamic> json) =
      _$BibleVerseImpl.fromJson;

  @override
  int get verse;
  @override
  String get text;

  /// Create a copy of BibleVerse
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$BibleVerseImplCopyWith<_$BibleVerseImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
