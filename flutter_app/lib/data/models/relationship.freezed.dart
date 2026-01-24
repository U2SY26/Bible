// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'relationship.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

Relationship _$RelationshipFromJson(Map<String, dynamic> json) {
  return _Relationship.fromJson(json);
}

/// @nodoc
mixin _$Relationship {
  String get source => throw _privateConstructorUsedError;
  String get target => throw _privateConstructorUsedError;
  String get type => throw _privateConstructorUsedError;
  @JsonKey(name: 'label_ko')
  String? get labelKo => throw _privateConstructorUsedError;
  @JsonKey(name: 'label_en')
  String? get labelEn => throw _privateConstructorUsedError;

  /// Serializes this Relationship to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Relationship
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $RelationshipCopyWith<Relationship> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RelationshipCopyWith<$Res> {
  factory $RelationshipCopyWith(
    Relationship value,
    $Res Function(Relationship) then,
  ) = _$RelationshipCopyWithImpl<$Res, Relationship>;
  @useResult
  $Res call({
    String source,
    String target,
    String type,
    @JsonKey(name: 'label_ko') String? labelKo,
    @JsonKey(name: 'label_en') String? labelEn,
  });
}

/// @nodoc
class _$RelationshipCopyWithImpl<$Res, $Val extends Relationship>
    implements $RelationshipCopyWith<$Res> {
  _$RelationshipCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Relationship
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? source = null,
    Object? target = null,
    Object? type = null,
    Object? labelKo = freezed,
    Object? labelEn = freezed,
  }) {
    return _then(
      _value.copyWith(
            source: null == source
                ? _value.source
                : source // ignore: cast_nullable_to_non_nullable
                      as String,
            target: null == target
                ? _value.target
                : target // ignore: cast_nullable_to_non_nullable
                      as String,
            type: null == type
                ? _value.type
                : type // ignore: cast_nullable_to_non_nullable
                      as String,
            labelKo: freezed == labelKo
                ? _value.labelKo
                : labelKo // ignore: cast_nullable_to_non_nullable
                      as String?,
            labelEn: freezed == labelEn
                ? _value.labelEn
                : labelEn // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$RelationshipImplCopyWith<$Res>
    implements $RelationshipCopyWith<$Res> {
  factory _$$RelationshipImplCopyWith(
    _$RelationshipImpl value,
    $Res Function(_$RelationshipImpl) then,
  ) = __$$RelationshipImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String source,
    String target,
    String type,
    @JsonKey(name: 'label_ko') String? labelKo,
    @JsonKey(name: 'label_en') String? labelEn,
  });
}

/// @nodoc
class __$$RelationshipImplCopyWithImpl<$Res>
    extends _$RelationshipCopyWithImpl<$Res, _$RelationshipImpl>
    implements _$$RelationshipImplCopyWith<$Res> {
  __$$RelationshipImplCopyWithImpl(
    _$RelationshipImpl _value,
    $Res Function(_$RelationshipImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of Relationship
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? source = null,
    Object? target = null,
    Object? type = null,
    Object? labelKo = freezed,
    Object? labelEn = freezed,
  }) {
    return _then(
      _$RelationshipImpl(
        source: null == source
            ? _value.source
            : source // ignore: cast_nullable_to_non_nullable
                  as String,
        target: null == target
            ? _value.target
            : target // ignore: cast_nullable_to_non_nullable
                  as String,
        type: null == type
            ? _value.type
            : type // ignore: cast_nullable_to_non_nullable
                  as String,
        labelKo: freezed == labelKo
            ? _value.labelKo
            : labelKo // ignore: cast_nullable_to_non_nullable
                  as String?,
        labelEn: freezed == labelEn
            ? _value.labelEn
            : labelEn // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$RelationshipImpl implements _Relationship {
  const _$RelationshipImpl({
    required this.source,
    required this.target,
    required this.type,
    @JsonKey(name: 'label_ko') this.labelKo,
    @JsonKey(name: 'label_en') this.labelEn,
  });

  factory _$RelationshipImpl.fromJson(Map<String, dynamic> json) =>
      _$$RelationshipImplFromJson(json);

  @override
  final String source;
  @override
  final String target;
  @override
  final String type;
  @override
  @JsonKey(name: 'label_ko')
  final String? labelKo;
  @override
  @JsonKey(name: 'label_en')
  final String? labelEn;

  @override
  String toString() {
    return 'Relationship(source: $source, target: $target, type: $type, labelKo: $labelKo, labelEn: $labelEn)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$RelationshipImpl &&
            (identical(other.source, source) || other.source == source) &&
            (identical(other.target, target) || other.target == target) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.labelKo, labelKo) || other.labelKo == labelKo) &&
            (identical(other.labelEn, labelEn) || other.labelEn == labelEn));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode =>
      Object.hash(runtimeType, source, target, type, labelKo, labelEn);

  /// Create a copy of Relationship
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$RelationshipImplCopyWith<_$RelationshipImpl> get copyWith =>
      __$$RelationshipImplCopyWithImpl<_$RelationshipImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$RelationshipImplToJson(this);
  }
}

abstract class _Relationship implements Relationship {
  const factory _Relationship({
    required final String source,
    required final String target,
    required final String type,
    @JsonKey(name: 'label_ko') final String? labelKo,
    @JsonKey(name: 'label_en') final String? labelEn,
  }) = _$RelationshipImpl;

  factory _Relationship.fromJson(Map<String, dynamic> json) =
      _$RelationshipImpl.fromJson;

  @override
  String get source;
  @override
  String get target;
  @override
  String get type;
  @override
  @JsonKey(name: 'label_ko')
  String? get labelKo;
  @override
  @JsonKey(name: 'label_en')
  String? get labelEn;

  /// Create a copy of Relationship
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$RelationshipImplCopyWith<_$RelationshipImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

RelationshipColor _$RelationshipColorFromJson(Map<String, dynamic> json) {
  return _RelationshipColor.fromJson(json);
}

/// @nodoc
mixin _$RelationshipColor {
  String get color => throw _privateConstructorUsedError;
  @JsonKey(name: 'label_ko')
  String get labelKo => throw _privateConstructorUsedError;
  @JsonKey(name: 'label_en')
  String get labelEn => throw _privateConstructorUsedError;

  /// Serializes this RelationshipColor to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of RelationshipColor
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $RelationshipColorCopyWith<RelationshipColor> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RelationshipColorCopyWith<$Res> {
  factory $RelationshipColorCopyWith(
    RelationshipColor value,
    $Res Function(RelationshipColor) then,
  ) = _$RelationshipColorCopyWithImpl<$Res, RelationshipColor>;
  @useResult
  $Res call({
    String color,
    @JsonKey(name: 'label_ko') String labelKo,
    @JsonKey(name: 'label_en') String labelEn,
  });
}

/// @nodoc
class _$RelationshipColorCopyWithImpl<$Res, $Val extends RelationshipColor>
    implements $RelationshipColorCopyWith<$Res> {
  _$RelationshipColorCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of RelationshipColor
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? color = null,
    Object? labelKo = null,
    Object? labelEn = null,
  }) {
    return _then(
      _value.copyWith(
            color: null == color
                ? _value.color
                : color // ignore: cast_nullable_to_non_nullable
                      as String,
            labelKo: null == labelKo
                ? _value.labelKo
                : labelKo // ignore: cast_nullable_to_non_nullable
                      as String,
            labelEn: null == labelEn
                ? _value.labelEn
                : labelEn // ignore: cast_nullable_to_non_nullable
                      as String,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$RelationshipColorImplCopyWith<$Res>
    implements $RelationshipColorCopyWith<$Res> {
  factory _$$RelationshipColorImplCopyWith(
    _$RelationshipColorImpl value,
    $Res Function(_$RelationshipColorImpl) then,
  ) = __$$RelationshipColorImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String color,
    @JsonKey(name: 'label_ko') String labelKo,
    @JsonKey(name: 'label_en') String labelEn,
  });
}

/// @nodoc
class __$$RelationshipColorImplCopyWithImpl<$Res>
    extends _$RelationshipColorCopyWithImpl<$Res, _$RelationshipColorImpl>
    implements _$$RelationshipColorImplCopyWith<$Res> {
  __$$RelationshipColorImplCopyWithImpl(
    _$RelationshipColorImpl _value,
    $Res Function(_$RelationshipColorImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of RelationshipColor
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? color = null,
    Object? labelKo = null,
    Object? labelEn = null,
  }) {
    return _then(
      _$RelationshipColorImpl(
        color: null == color
            ? _value.color
            : color // ignore: cast_nullable_to_non_nullable
                  as String,
        labelKo: null == labelKo
            ? _value.labelKo
            : labelKo // ignore: cast_nullable_to_non_nullable
                  as String,
        labelEn: null == labelEn
            ? _value.labelEn
            : labelEn // ignore: cast_nullable_to_non_nullable
                  as String,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$RelationshipColorImpl implements _RelationshipColor {
  const _$RelationshipColorImpl({
    required this.color,
    @JsonKey(name: 'label_ko') required this.labelKo,
    @JsonKey(name: 'label_en') required this.labelEn,
  });

  factory _$RelationshipColorImpl.fromJson(Map<String, dynamic> json) =>
      _$$RelationshipColorImplFromJson(json);

  @override
  final String color;
  @override
  @JsonKey(name: 'label_ko')
  final String labelKo;
  @override
  @JsonKey(name: 'label_en')
  final String labelEn;

  @override
  String toString() {
    return 'RelationshipColor(color: $color, labelKo: $labelKo, labelEn: $labelEn)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$RelationshipColorImpl &&
            (identical(other.color, color) || other.color == color) &&
            (identical(other.labelKo, labelKo) || other.labelKo == labelKo) &&
            (identical(other.labelEn, labelEn) || other.labelEn == labelEn));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, color, labelKo, labelEn);

  /// Create a copy of RelationshipColor
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$RelationshipColorImplCopyWith<_$RelationshipColorImpl> get copyWith =>
      __$$RelationshipColorImplCopyWithImpl<_$RelationshipColorImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$RelationshipColorImplToJson(this);
  }
}

abstract class _RelationshipColor implements RelationshipColor {
  const factory _RelationshipColor({
    required final String color,
    @JsonKey(name: 'label_ko') required final String labelKo,
    @JsonKey(name: 'label_en') required final String labelEn,
  }) = _$RelationshipColorImpl;

  factory _RelationshipColor.fromJson(Map<String, dynamic> json) =
      _$RelationshipColorImpl.fromJson;

  @override
  String get color;
  @override
  @JsonKey(name: 'label_ko')
  String get labelKo;
  @override
  @JsonKey(name: 'label_en')
  String get labelEn;

  /// Create a copy of RelationshipColor
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$RelationshipColorImplCopyWith<_$RelationshipColorImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

RelationshipsData _$RelationshipsDataFromJson(Map<String, dynamic> json) {
  return _RelationshipsData.fromJson(json);
}

/// @nodoc
mixin _$RelationshipsData {
  List<Relationship> get relationships => throw _privateConstructorUsedError;
  Map<String, RelationshipColor> get relationshipColors =>
      throw _privateConstructorUsedError;

  /// Serializes this RelationshipsData to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of RelationshipsData
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $RelationshipsDataCopyWith<RelationshipsData> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RelationshipsDataCopyWith<$Res> {
  factory $RelationshipsDataCopyWith(
    RelationshipsData value,
    $Res Function(RelationshipsData) then,
  ) = _$RelationshipsDataCopyWithImpl<$Res, RelationshipsData>;
  @useResult
  $Res call({
    List<Relationship> relationships,
    Map<String, RelationshipColor> relationshipColors,
  });
}

/// @nodoc
class _$RelationshipsDataCopyWithImpl<$Res, $Val extends RelationshipsData>
    implements $RelationshipsDataCopyWith<$Res> {
  _$RelationshipsDataCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of RelationshipsData
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? relationships = null, Object? relationshipColors = null}) {
    return _then(
      _value.copyWith(
            relationships: null == relationships
                ? _value.relationships
                : relationships // ignore: cast_nullable_to_non_nullable
                      as List<Relationship>,
            relationshipColors: null == relationshipColors
                ? _value.relationshipColors
                : relationshipColors // ignore: cast_nullable_to_non_nullable
                      as Map<String, RelationshipColor>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$RelationshipsDataImplCopyWith<$Res>
    implements $RelationshipsDataCopyWith<$Res> {
  factory _$$RelationshipsDataImplCopyWith(
    _$RelationshipsDataImpl value,
    $Res Function(_$RelationshipsDataImpl) then,
  ) = __$$RelationshipsDataImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    List<Relationship> relationships,
    Map<String, RelationshipColor> relationshipColors,
  });
}

/// @nodoc
class __$$RelationshipsDataImplCopyWithImpl<$Res>
    extends _$RelationshipsDataCopyWithImpl<$Res, _$RelationshipsDataImpl>
    implements _$$RelationshipsDataImplCopyWith<$Res> {
  __$$RelationshipsDataImplCopyWithImpl(
    _$RelationshipsDataImpl _value,
    $Res Function(_$RelationshipsDataImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of RelationshipsData
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? relationships = null, Object? relationshipColors = null}) {
    return _then(
      _$RelationshipsDataImpl(
        relationships: null == relationships
            ? _value._relationships
            : relationships // ignore: cast_nullable_to_non_nullable
                  as List<Relationship>,
        relationshipColors: null == relationshipColors
            ? _value._relationshipColors
            : relationshipColors // ignore: cast_nullable_to_non_nullable
                  as Map<String, RelationshipColor>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$RelationshipsDataImpl implements _RelationshipsData {
  const _$RelationshipsDataImpl({
    required final List<Relationship> relationships,
    required final Map<String, RelationshipColor> relationshipColors,
  }) : _relationships = relationships,
       _relationshipColors = relationshipColors;

  factory _$RelationshipsDataImpl.fromJson(Map<String, dynamic> json) =>
      _$$RelationshipsDataImplFromJson(json);

  final List<Relationship> _relationships;
  @override
  List<Relationship> get relationships {
    if (_relationships is EqualUnmodifiableListView) return _relationships;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_relationships);
  }

  final Map<String, RelationshipColor> _relationshipColors;
  @override
  Map<String, RelationshipColor> get relationshipColors {
    if (_relationshipColors is EqualUnmodifiableMapView)
      return _relationshipColors;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableMapView(_relationshipColors);
  }

  @override
  String toString() {
    return 'RelationshipsData(relationships: $relationships, relationshipColors: $relationshipColors)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$RelationshipsDataImpl &&
            const DeepCollectionEquality().equals(
              other._relationships,
              _relationships,
            ) &&
            const DeepCollectionEquality().equals(
              other._relationshipColors,
              _relationshipColors,
            ));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    const DeepCollectionEquality().hash(_relationships),
    const DeepCollectionEquality().hash(_relationshipColors),
  );

  /// Create a copy of RelationshipsData
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$RelationshipsDataImplCopyWith<_$RelationshipsDataImpl> get copyWith =>
      __$$RelationshipsDataImplCopyWithImpl<_$RelationshipsDataImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$RelationshipsDataImplToJson(this);
  }
}

abstract class _RelationshipsData implements RelationshipsData {
  const factory _RelationshipsData({
    required final List<Relationship> relationships,
    required final Map<String, RelationshipColor> relationshipColors,
  }) = _$RelationshipsDataImpl;

  factory _RelationshipsData.fromJson(Map<String, dynamic> json) =
      _$RelationshipsDataImpl.fromJson;

  @override
  List<Relationship> get relationships;
  @override
  Map<String, RelationshipColor> get relationshipColors;

  /// Create a copy of RelationshipsData
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$RelationshipsDataImplCopyWith<_$RelationshipsDataImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
