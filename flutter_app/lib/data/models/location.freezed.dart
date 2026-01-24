// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'location.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

BibleLocation _$BibleLocationFromJson(Map<String, dynamic> json) {
  return _BibleLocation.fromJson(json);
}

/// @nodoc
mixin _$BibleLocation {
  String get id => throw _privateConstructorUsedError;
  @JsonKey(name: 'name_ko')
  String get nameKo => throw _privateConstructorUsedError;
  @JsonKey(name: 'name_en')
  String get nameEn => throw _privateConstructorUsedError;
  String get type => throw _privateConstructorUsedError;
  String? get region => throw _privateConstructorUsedError;
  Coordinates? get coordinates => throw _privateConstructorUsedError;
  @JsonKey(name: 'description_ko')
  String? get descriptionKo => throw _privateConstructorUsedError;
  @JsonKey(name: 'description_en')
  String? get descriptionEn => throw _privateConstructorUsedError;
  int get importance => throw _privateConstructorUsedError;
  String get testament => throw _privateConstructorUsedError;
  List<String> get characters => throw _privateConstructorUsedError;
  List<String> get events => throw _privateConstructorUsedError;

  /// Serializes this BibleLocation to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of BibleLocation
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $BibleLocationCopyWith<BibleLocation> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $BibleLocationCopyWith<$Res> {
  factory $BibleLocationCopyWith(
    BibleLocation value,
    $Res Function(BibleLocation) then,
  ) = _$BibleLocationCopyWithImpl<$Res, BibleLocation>;
  @useResult
  $Res call({
    String id,
    @JsonKey(name: 'name_ko') String nameKo,
    @JsonKey(name: 'name_en') String nameEn,
    String type,
    String? region,
    Coordinates? coordinates,
    @JsonKey(name: 'description_ko') String? descriptionKo,
    @JsonKey(name: 'description_en') String? descriptionEn,
    int importance,
    String testament,
    List<String> characters,
    List<String> events,
  });

  $CoordinatesCopyWith<$Res>? get coordinates;
}

/// @nodoc
class _$BibleLocationCopyWithImpl<$Res, $Val extends BibleLocation>
    implements $BibleLocationCopyWith<$Res> {
  _$BibleLocationCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of BibleLocation
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? nameKo = null,
    Object? nameEn = null,
    Object? type = null,
    Object? region = freezed,
    Object? coordinates = freezed,
    Object? descriptionKo = freezed,
    Object? descriptionEn = freezed,
    Object? importance = null,
    Object? testament = null,
    Object? characters = null,
    Object? events = null,
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
            type: null == type
                ? _value.type
                : type // ignore: cast_nullable_to_non_nullable
                      as String,
            region: freezed == region
                ? _value.region
                : region // ignore: cast_nullable_to_non_nullable
                      as String?,
            coordinates: freezed == coordinates
                ? _value.coordinates
                : coordinates // ignore: cast_nullable_to_non_nullable
                      as Coordinates?,
            descriptionKo: freezed == descriptionKo
                ? _value.descriptionKo
                : descriptionKo // ignore: cast_nullable_to_non_nullable
                      as String?,
            descriptionEn: freezed == descriptionEn
                ? _value.descriptionEn
                : descriptionEn // ignore: cast_nullable_to_non_nullable
                      as String?,
            importance: null == importance
                ? _value.importance
                : importance // ignore: cast_nullable_to_non_nullable
                      as int,
            testament: null == testament
                ? _value.testament
                : testament // ignore: cast_nullable_to_non_nullable
                      as String,
            characters: null == characters
                ? _value.characters
                : characters // ignore: cast_nullable_to_non_nullable
                      as List<String>,
            events: null == events
                ? _value.events
                : events // ignore: cast_nullable_to_non_nullable
                      as List<String>,
          )
          as $Val,
    );
  }

  /// Create a copy of BibleLocation
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $CoordinatesCopyWith<$Res>? get coordinates {
    if (_value.coordinates == null) {
      return null;
    }

    return $CoordinatesCopyWith<$Res>(_value.coordinates!, (value) {
      return _then(_value.copyWith(coordinates: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$BibleLocationImplCopyWith<$Res>
    implements $BibleLocationCopyWith<$Res> {
  factory _$$BibleLocationImplCopyWith(
    _$BibleLocationImpl value,
    $Res Function(_$BibleLocationImpl) then,
  ) = __$$BibleLocationImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    @JsonKey(name: 'name_ko') String nameKo,
    @JsonKey(name: 'name_en') String nameEn,
    String type,
    String? region,
    Coordinates? coordinates,
    @JsonKey(name: 'description_ko') String? descriptionKo,
    @JsonKey(name: 'description_en') String? descriptionEn,
    int importance,
    String testament,
    List<String> characters,
    List<String> events,
  });

  @override
  $CoordinatesCopyWith<$Res>? get coordinates;
}

/// @nodoc
class __$$BibleLocationImplCopyWithImpl<$Res>
    extends _$BibleLocationCopyWithImpl<$Res, _$BibleLocationImpl>
    implements _$$BibleLocationImplCopyWith<$Res> {
  __$$BibleLocationImplCopyWithImpl(
    _$BibleLocationImpl _value,
    $Res Function(_$BibleLocationImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of BibleLocation
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? nameKo = null,
    Object? nameEn = null,
    Object? type = null,
    Object? region = freezed,
    Object? coordinates = freezed,
    Object? descriptionKo = freezed,
    Object? descriptionEn = freezed,
    Object? importance = null,
    Object? testament = null,
    Object? characters = null,
    Object? events = null,
  }) {
    return _then(
      _$BibleLocationImpl(
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
        type: null == type
            ? _value.type
            : type // ignore: cast_nullable_to_non_nullable
                  as String,
        region: freezed == region
            ? _value.region
            : region // ignore: cast_nullable_to_non_nullable
                  as String?,
        coordinates: freezed == coordinates
            ? _value.coordinates
            : coordinates // ignore: cast_nullable_to_non_nullable
                  as Coordinates?,
        descriptionKo: freezed == descriptionKo
            ? _value.descriptionKo
            : descriptionKo // ignore: cast_nullable_to_non_nullable
                  as String?,
        descriptionEn: freezed == descriptionEn
            ? _value.descriptionEn
            : descriptionEn // ignore: cast_nullable_to_non_nullable
                  as String?,
        importance: null == importance
            ? _value.importance
            : importance // ignore: cast_nullable_to_non_nullable
                  as int,
        testament: null == testament
            ? _value.testament
            : testament // ignore: cast_nullable_to_non_nullable
                  as String,
        characters: null == characters
            ? _value._characters
            : characters // ignore: cast_nullable_to_non_nullable
                  as List<String>,
        events: null == events
            ? _value._events
            : events // ignore: cast_nullable_to_non_nullable
                  as List<String>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$BibleLocationImpl implements _BibleLocation {
  const _$BibleLocationImpl({
    required this.id,
    @JsonKey(name: 'name_ko') required this.nameKo,
    @JsonKey(name: 'name_en') required this.nameEn,
    required this.type,
    this.region,
    this.coordinates,
    @JsonKey(name: 'description_ko') this.descriptionKo,
    @JsonKey(name: 'description_en') this.descriptionEn,
    this.importance = 5,
    this.testament = 'both',
    final List<String> characters = const [],
    final List<String> events = const [],
  }) : _characters = characters,
       _events = events;

  factory _$BibleLocationImpl.fromJson(Map<String, dynamic> json) =>
      _$$BibleLocationImplFromJson(json);

  @override
  final String id;
  @override
  @JsonKey(name: 'name_ko')
  final String nameKo;
  @override
  @JsonKey(name: 'name_en')
  final String nameEn;
  @override
  final String type;
  @override
  final String? region;
  @override
  final Coordinates? coordinates;
  @override
  @JsonKey(name: 'description_ko')
  final String? descriptionKo;
  @override
  @JsonKey(name: 'description_en')
  final String? descriptionEn;
  @override
  @JsonKey()
  final int importance;
  @override
  @JsonKey()
  final String testament;
  final List<String> _characters;
  @override
  @JsonKey()
  List<String> get characters {
    if (_characters is EqualUnmodifiableListView) return _characters;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_characters);
  }

  final List<String> _events;
  @override
  @JsonKey()
  List<String> get events {
    if (_events is EqualUnmodifiableListView) return _events;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_events);
  }

  @override
  String toString() {
    return 'BibleLocation(id: $id, nameKo: $nameKo, nameEn: $nameEn, type: $type, region: $region, coordinates: $coordinates, descriptionKo: $descriptionKo, descriptionEn: $descriptionEn, importance: $importance, testament: $testament, characters: $characters, events: $events)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$BibleLocationImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.nameKo, nameKo) || other.nameKo == nameKo) &&
            (identical(other.nameEn, nameEn) || other.nameEn == nameEn) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.region, region) || other.region == region) &&
            (identical(other.coordinates, coordinates) ||
                other.coordinates == coordinates) &&
            (identical(other.descriptionKo, descriptionKo) ||
                other.descriptionKo == descriptionKo) &&
            (identical(other.descriptionEn, descriptionEn) ||
                other.descriptionEn == descriptionEn) &&
            (identical(other.importance, importance) ||
                other.importance == importance) &&
            (identical(other.testament, testament) ||
                other.testament == testament) &&
            const DeepCollectionEquality().equals(
              other._characters,
              _characters,
            ) &&
            const DeepCollectionEquality().equals(other._events, _events));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    nameKo,
    nameEn,
    type,
    region,
    coordinates,
    descriptionKo,
    descriptionEn,
    importance,
    testament,
    const DeepCollectionEquality().hash(_characters),
    const DeepCollectionEquality().hash(_events),
  );

  /// Create a copy of BibleLocation
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$BibleLocationImplCopyWith<_$BibleLocationImpl> get copyWith =>
      __$$BibleLocationImplCopyWithImpl<_$BibleLocationImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$BibleLocationImplToJson(this);
  }
}

abstract class _BibleLocation implements BibleLocation {
  const factory _BibleLocation({
    required final String id,
    @JsonKey(name: 'name_ko') required final String nameKo,
    @JsonKey(name: 'name_en') required final String nameEn,
    required final String type,
    final String? region,
    final Coordinates? coordinates,
    @JsonKey(name: 'description_ko') final String? descriptionKo,
    @JsonKey(name: 'description_en') final String? descriptionEn,
    final int importance,
    final String testament,
    final List<String> characters,
    final List<String> events,
  }) = _$BibleLocationImpl;

  factory _BibleLocation.fromJson(Map<String, dynamic> json) =
      _$BibleLocationImpl.fromJson;

  @override
  String get id;
  @override
  @JsonKey(name: 'name_ko')
  String get nameKo;
  @override
  @JsonKey(name: 'name_en')
  String get nameEn;
  @override
  String get type;
  @override
  String? get region;
  @override
  Coordinates? get coordinates;
  @override
  @JsonKey(name: 'description_ko')
  String? get descriptionKo;
  @override
  @JsonKey(name: 'description_en')
  String? get descriptionEn;
  @override
  int get importance;
  @override
  String get testament;
  @override
  List<String> get characters;
  @override
  List<String> get events;

  /// Create a copy of BibleLocation
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$BibleLocationImplCopyWith<_$BibleLocationImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

Coordinates _$CoordinatesFromJson(Map<String, dynamic> json) {
  return _Coordinates.fromJson(json);
}

/// @nodoc
mixin _$Coordinates {
  double get lat => throw _privateConstructorUsedError;
  double get lng => throw _privateConstructorUsedError;

  /// Serializes this Coordinates to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Coordinates
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $CoordinatesCopyWith<Coordinates> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CoordinatesCopyWith<$Res> {
  factory $CoordinatesCopyWith(
    Coordinates value,
    $Res Function(Coordinates) then,
  ) = _$CoordinatesCopyWithImpl<$Res, Coordinates>;
  @useResult
  $Res call({double lat, double lng});
}

/// @nodoc
class _$CoordinatesCopyWithImpl<$Res, $Val extends Coordinates>
    implements $CoordinatesCopyWith<$Res> {
  _$CoordinatesCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Coordinates
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? lat = null, Object? lng = null}) {
    return _then(
      _value.copyWith(
            lat: null == lat
                ? _value.lat
                : lat // ignore: cast_nullable_to_non_nullable
                      as double,
            lng: null == lng
                ? _value.lng
                : lng // ignore: cast_nullable_to_non_nullable
                      as double,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$CoordinatesImplCopyWith<$Res>
    implements $CoordinatesCopyWith<$Res> {
  factory _$$CoordinatesImplCopyWith(
    _$CoordinatesImpl value,
    $Res Function(_$CoordinatesImpl) then,
  ) = __$$CoordinatesImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({double lat, double lng});
}

/// @nodoc
class __$$CoordinatesImplCopyWithImpl<$Res>
    extends _$CoordinatesCopyWithImpl<$Res, _$CoordinatesImpl>
    implements _$$CoordinatesImplCopyWith<$Res> {
  __$$CoordinatesImplCopyWithImpl(
    _$CoordinatesImpl _value,
    $Res Function(_$CoordinatesImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of Coordinates
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? lat = null, Object? lng = null}) {
    return _then(
      _$CoordinatesImpl(
        lat: null == lat
            ? _value.lat
            : lat // ignore: cast_nullable_to_non_nullable
                  as double,
        lng: null == lng
            ? _value.lng
            : lng // ignore: cast_nullable_to_non_nullable
                  as double,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$CoordinatesImpl implements _Coordinates {
  const _$CoordinatesImpl({required this.lat, required this.lng});

  factory _$CoordinatesImpl.fromJson(Map<String, dynamic> json) =>
      _$$CoordinatesImplFromJson(json);

  @override
  final double lat;
  @override
  final double lng;

  @override
  String toString() {
    return 'Coordinates(lat: $lat, lng: $lng)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CoordinatesImpl &&
            (identical(other.lat, lat) || other.lat == lat) &&
            (identical(other.lng, lng) || other.lng == lng));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, lat, lng);

  /// Create a copy of Coordinates
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$CoordinatesImplCopyWith<_$CoordinatesImpl> get copyWith =>
      __$$CoordinatesImplCopyWithImpl<_$CoordinatesImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$CoordinatesImplToJson(this);
  }
}

abstract class _Coordinates implements Coordinates {
  const factory _Coordinates({
    required final double lat,
    required final double lng,
  }) = _$CoordinatesImpl;

  factory _Coordinates.fromJson(Map<String, dynamic> json) =
      _$CoordinatesImpl.fromJson;

  @override
  double get lat;
  @override
  double get lng;

  /// Create a copy of Coordinates
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$CoordinatesImplCopyWith<_$CoordinatesImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

Region _$RegionFromJson(Map<String, dynamic> json) {
  return _Region.fromJson(json);
}

/// @nodoc
mixin _$Region {
  String get id => throw _privateConstructorUsedError;
  @JsonKey(name: 'name_ko')
  String get nameKo => throw _privateConstructorUsedError;
  @JsonKey(name: 'name_en')
  String get nameEn => throw _privateConstructorUsedError;
  String get color => throw _privateConstructorUsedError;

  /// Serializes this Region to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Region
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $RegionCopyWith<Region> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RegionCopyWith<$Res> {
  factory $RegionCopyWith(Region value, $Res Function(Region) then) =
      _$RegionCopyWithImpl<$Res, Region>;
  @useResult
  $Res call({
    String id,
    @JsonKey(name: 'name_ko') String nameKo,
    @JsonKey(name: 'name_en') String nameEn,
    String color,
  });
}

/// @nodoc
class _$RegionCopyWithImpl<$Res, $Val extends Region>
    implements $RegionCopyWith<$Res> {
  _$RegionCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Region
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? nameKo = null,
    Object? nameEn = null,
    Object? color = null,
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
            color: null == color
                ? _value.color
                : color // ignore: cast_nullable_to_non_nullable
                      as String,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$RegionImplCopyWith<$Res> implements $RegionCopyWith<$Res> {
  factory _$$RegionImplCopyWith(
    _$RegionImpl value,
    $Res Function(_$RegionImpl) then,
  ) = __$$RegionImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    @JsonKey(name: 'name_ko') String nameKo,
    @JsonKey(name: 'name_en') String nameEn,
    String color,
  });
}

/// @nodoc
class __$$RegionImplCopyWithImpl<$Res>
    extends _$RegionCopyWithImpl<$Res, _$RegionImpl>
    implements _$$RegionImplCopyWith<$Res> {
  __$$RegionImplCopyWithImpl(
    _$RegionImpl _value,
    $Res Function(_$RegionImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of Region
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? nameKo = null,
    Object? nameEn = null,
    Object? color = null,
  }) {
    return _then(
      _$RegionImpl(
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
        color: null == color
            ? _value.color
            : color // ignore: cast_nullable_to_non_nullable
                  as String,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$RegionImpl implements _Region {
  const _$RegionImpl({
    required this.id,
    @JsonKey(name: 'name_ko') required this.nameKo,
    @JsonKey(name: 'name_en') required this.nameEn,
    required this.color,
  });

  factory _$RegionImpl.fromJson(Map<String, dynamic> json) =>
      _$$RegionImplFromJson(json);

  @override
  final String id;
  @override
  @JsonKey(name: 'name_ko')
  final String nameKo;
  @override
  @JsonKey(name: 'name_en')
  final String nameEn;
  @override
  final String color;

  @override
  String toString() {
    return 'Region(id: $id, nameKo: $nameKo, nameEn: $nameEn, color: $color)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$RegionImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.nameKo, nameKo) || other.nameKo == nameKo) &&
            (identical(other.nameEn, nameEn) || other.nameEn == nameEn) &&
            (identical(other.color, color) || other.color == color));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, id, nameKo, nameEn, color);

  /// Create a copy of Region
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$RegionImplCopyWith<_$RegionImpl> get copyWith =>
      __$$RegionImplCopyWithImpl<_$RegionImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$RegionImplToJson(this);
  }
}

abstract class _Region implements Region {
  const factory _Region({
    required final String id,
    @JsonKey(name: 'name_ko') required final String nameKo,
    @JsonKey(name: 'name_en') required final String nameEn,
    required final String color,
  }) = _$RegionImpl;

  factory _Region.fromJson(Map<String, dynamic> json) = _$RegionImpl.fromJson;

  @override
  String get id;
  @override
  @JsonKey(name: 'name_ko')
  String get nameKo;
  @override
  @JsonKey(name: 'name_en')
  String get nameEn;
  @override
  String get color;

  /// Create a copy of Region
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$RegionImplCopyWith<_$RegionImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

LocationsData _$LocationsDataFromJson(Map<String, dynamic> json) {
  return _LocationsData.fromJson(json);
}

/// @nodoc
mixin _$LocationsData {
  List<BibleLocation> get locations => throw _privateConstructorUsedError;
  List<Region> get regions => throw _privateConstructorUsedError;
  Map<String, String> get locationTypeIcons =>
      throw _privateConstructorUsedError;

  /// Serializes this LocationsData to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of LocationsData
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $LocationsDataCopyWith<LocationsData> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $LocationsDataCopyWith<$Res> {
  factory $LocationsDataCopyWith(
    LocationsData value,
    $Res Function(LocationsData) then,
  ) = _$LocationsDataCopyWithImpl<$Res, LocationsData>;
  @useResult
  $Res call({
    List<BibleLocation> locations,
    List<Region> regions,
    Map<String, String> locationTypeIcons,
  });
}

/// @nodoc
class _$LocationsDataCopyWithImpl<$Res, $Val extends LocationsData>
    implements $LocationsDataCopyWith<$Res> {
  _$LocationsDataCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of LocationsData
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? locations = null,
    Object? regions = null,
    Object? locationTypeIcons = null,
  }) {
    return _then(
      _value.copyWith(
            locations: null == locations
                ? _value.locations
                : locations // ignore: cast_nullable_to_non_nullable
                      as List<BibleLocation>,
            regions: null == regions
                ? _value.regions
                : regions // ignore: cast_nullable_to_non_nullable
                      as List<Region>,
            locationTypeIcons: null == locationTypeIcons
                ? _value.locationTypeIcons
                : locationTypeIcons // ignore: cast_nullable_to_non_nullable
                      as Map<String, String>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$LocationsDataImplCopyWith<$Res>
    implements $LocationsDataCopyWith<$Res> {
  factory _$$LocationsDataImplCopyWith(
    _$LocationsDataImpl value,
    $Res Function(_$LocationsDataImpl) then,
  ) = __$$LocationsDataImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    List<BibleLocation> locations,
    List<Region> regions,
    Map<String, String> locationTypeIcons,
  });
}

/// @nodoc
class __$$LocationsDataImplCopyWithImpl<$Res>
    extends _$LocationsDataCopyWithImpl<$Res, _$LocationsDataImpl>
    implements _$$LocationsDataImplCopyWith<$Res> {
  __$$LocationsDataImplCopyWithImpl(
    _$LocationsDataImpl _value,
    $Res Function(_$LocationsDataImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of LocationsData
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? locations = null,
    Object? regions = null,
    Object? locationTypeIcons = null,
  }) {
    return _then(
      _$LocationsDataImpl(
        locations: null == locations
            ? _value._locations
            : locations // ignore: cast_nullable_to_non_nullable
                  as List<BibleLocation>,
        regions: null == regions
            ? _value._regions
            : regions // ignore: cast_nullable_to_non_nullable
                  as List<Region>,
        locationTypeIcons: null == locationTypeIcons
            ? _value._locationTypeIcons
            : locationTypeIcons // ignore: cast_nullable_to_non_nullable
                  as Map<String, String>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$LocationsDataImpl implements _LocationsData {
  const _$LocationsDataImpl({
    required final List<BibleLocation> locations,
    required final List<Region> regions,
    required final Map<String, String> locationTypeIcons,
  }) : _locations = locations,
       _regions = regions,
       _locationTypeIcons = locationTypeIcons;

  factory _$LocationsDataImpl.fromJson(Map<String, dynamic> json) =>
      _$$LocationsDataImplFromJson(json);

  final List<BibleLocation> _locations;
  @override
  List<BibleLocation> get locations {
    if (_locations is EqualUnmodifiableListView) return _locations;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_locations);
  }

  final List<Region> _regions;
  @override
  List<Region> get regions {
    if (_regions is EqualUnmodifiableListView) return _regions;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_regions);
  }

  final Map<String, String> _locationTypeIcons;
  @override
  Map<String, String> get locationTypeIcons {
    if (_locationTypeIcons is EqualUnmodifiableMapView)
      return _locationTypeIcons;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableMapView(_locationTypeIcons);
  }

  @override
  String toString() {
    return 'LocationsData(locations: $locations, regions: $regions, locationTypeIcons: $locationTypeIcons)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$LocationsDataImpl &&
            const DeepCollectionEquality().equals(
              other._locations,
              _locations,
            ) &&
            const DeepCollectionEquality().equals(other._regions, _regions) &&
            const DeepCollectionEquality().equals(
              other._locationTypeIcons,
              _locationTypeIcons,
            ));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    const DeepCollectionEquality().hash(_locations),
    const DeepCollectionEquality().hash(_regions),
    const DeepCollectionEquality().hash(_locationTypeIcons),
  );

  /// Create a copy of LocationsData
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$LocationsDataImplCopyWith<_$LocationsDataImpl> get copyWith =>
      __$$LocationsDataImplCopyWithImpl<_$LocationsDataImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$LocationsDataImplToJson(this);
  }
}

abstract class _LocationsData implements LocationsData {
  const factory _LocationsData({
    required final List<BibleLocation> locations,
    required final List<Region> regions,
    required final Map<String, String> locationTypeIcons,
  }) = _$LocationsDataImpl;

  factory _LocationsData.fromJson(Map<String, dynamic> json) =
      _$LocationsDataImpl.fromJson;

  @override
  List<BibleLocation> get locations;
  @override
  List<Region> get regions;
  @override
  Map<String, String> get locationTypeIcons;

  /// Create a copy of LocationsData
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$LocationsDataImplCopyWith<_$LocationsDataImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
