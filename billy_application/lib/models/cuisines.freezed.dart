// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target

part of 'cuisines.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

Cuisines _$CuisinesFromJson(Map<String, dynamic> json) {
  return _Cuisines.fromJson(json);
}

/// @nodoc
mixin _$Cuisines {
  String get cuisinesName => throw _privateConstructorUsedError;
  String get cuisinesImage => throw _privateConstructorUsedError;
  String get cuisinesDescription => throw _privateConstructorUsedError;
  String get cuisinesBanner => throw _privateConstructorUsedError;
  bool get cuisinesStatus => throw _privateConstructorUsedError;
  String get cuisinesId => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $CuisinesCopyWith<Cuisines> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CuisinesCopyWith<$Res> {
  factory $CuisinesCopyWith(Cuisines value, $Res Function(Cuisines) then) =
      _$CuisinesCopyWithImpl<$Res>;
  $Res call(
      {String cuisinesName,
      String cuisinesImage,
      String cuisinesDescription,
      String cuisinesBanner,
      bool cuisinesStatus,
      String cuisinesId});
}

/// @nodoc
class _$CuisinesCopyWithImpl<$Res> implements $CuisinesCopyWith<$Res> {
  _$CuisinesCopyWithImpl(this._value, this._then);

  final Cuisines _value;
  // ignore: unused_field
  final $Res Function(Cuisines) _then;

  @override
  $Res call({
    Object? cuisinesName = freezed,
    Object? cuisinesImage = freezed,
    Object? cuisinesDescription = freezed,
    Object? cuisinesBanner = freezed,
    Object? cuisinesStatus = freezed,
    Object? cuisinesId = freezed,
  }) {
    return _then(_value.copyWith(
      cuisinesName: cuisinesName == freezed
          ? _value.cuisinesName
          : cuisinesName // ignore: cast_nullable_to_non_nullable
              as String,
      cuisinesImage: cuisinesImage == freezed
          ? _value.cuisinesImage
          : cuisinesImage // ignore: cast_nullable_to_non_nullable
              as String,
      cuisinesDescription: cuisinesDescription == freezed
          ? _value.cuisinesDescription
          : cuisinesDescription // ignore: cast_nullable_to_non_nullable
              as String,
      cuisinesBanner: cuisinesBanner == freezed
          ? _value.cuisinesBanner
          : cuisinesBanner // ignore: cast_nullable_to_non_nullable
              as String,
      cuisinesStatus: cuisinesStatus == freezed
          ? _value.cuisinesStatus
          : cuisinesStatus // ignore: cast_nullable_to_non_nullable
              as bool,
      cuisinesId: cuisinesId == freezed
          ? _value.cuisinesId
          : cuisinesId // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
abstract class _$$_CuisinesCopyWith<$Res> implements $CuisinesCopyWith<$Res> {
  factory _$$_CuisinesCopyWith(
          _$_Cuisines value, $Res Function(_$_Cuisines) then) =
      __$$_CuisinesCopyWithImpl<$Res>;
  @override
  $Res call(
      {String cuisinesName,
      String cuisinesImage,
      String cuisinesDescription,
      String cuisinesBanner,
      bool cuisinesStatus,
      String cuisinesId});
}

/// @nodoc
class __$$_CuisinesCopyWithImpl<$Res> extends _$CuisinesCopyWithImpl<$Res>
    implements _$$_CuisinesCopyWith<$Res> {
  __$$_CuisinesCopyWithImpl(
      _$_Cuisines _value, $Res Function(_$_Cuisines) _then)
      : super(_value, (v) => _then(v as _$_Cuisines));

  @override
  _$_Cuisines get _value => super._value as _$_Cuisines;

  @override
  $Res call({
    Object? cuisinesName = freezed,
    Object? cuisinesImage = freezed,
    Object? cuisinesDescription = freezed,
    Object? cuisinesBanner = freezed,
    Object? cuisinesStatus = freezed,
    Object? cuisinesId = freezed,
  }) {
    return _then(_$_Cuisines(
      cuisinesName: cuisinesName == freezed
          ? _value.cuisinesName
          : cuisinesName // ignore: cast_nullable_to_non_nullable
              as String,
      cuisinesImage: cuisinesImage == freezed
          ? _value.cuisinesImage
          : cuisinesImage // ignore: cast_nullable_to_non_nullable
              as String,
      cuisinesDescription: cuisinesDescription == freezed
          ? _value.cuisinesDescription
          : cuisinesDescription // ignore: cast_nullable_to_non_nullable
              as String,
      cuisinesBanner: cuisinesBanner == freezed
          ? _value.cuisinesBanner
          : cuisinesBanner // ignore: cast_nullable_to_non_nullable
              as String,
      cuisinesStatus: cuisinesStatus == freezed
          ? _value.cuisinesStatus
          : cuisinesStatus // ignore: cast_nullable_to_non_nullable
              as bool,
      cuisinesId: cuisinesId == freezed
          ? _value.cuisinesId
          : cuisinesId // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_Cuisines implements _Cuisines {
  _$_Cuisines(
      {required this.cuisinesName,
      required this.cuisinesImage,
      required this.cuisinesDescription,
      required this.cuisinesBanner,
      required this.cuisinesStatus,
      required this.cuisinesId});

  factory _$_Cuisines.fromJson(Map<String, dynamic> json) =>
      _$$_CuisinesFromJson(json);

  @override
  final String cuisinesName;
  @override
  final String cuisinesImage;
  @override
  final String cuisinesDescription;
  @override
  final String cuisinesBanner;
  @override
  final bool cuisinesStatus;
  @override
  final String cuisinesId;

  @override
  String toString() {
    return 'Cuisines(cuisinesName: $cuisinesName, cuisinesImage: $cuisinesImage, cuisinesDescription: $cuisinesDescription, cuisinesBanner: $cuisinesBanner, cuisinesStatus: $cuisinesStatus, cuisinesId: $cuisinesId)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_Cuisines &&
            const DeepCollectionEquality()
                .equals(other.cuisinesName, cuisinesName) &&
            const DeepCollectionEquality()
                .equals(other.cuisinesImage, cuisinesImage) &&
            const DeepCollectionEquality()
                .equals(other.cuisinesDescription, cuisinesDescription) &&
            const DeepCollectionEquality()
                .equals(other.cuisinesBanner, cuisinesBanner) &&
            const DeepCollectionEquality()
                .equals(other.cuisinesStatus, cuisinesStatus) &&
            const DeepCollectionEquality()
                .equals(other.cuisinesId, cuisinesId));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      const DeepCollectionEquality().hash(cuisinesName),
      const DeepCollectionEquality().hash(cuisinesImage),
      const DeepCollectionEquality().hash(cuisinesDescription),
      const DeepCollectionEquality().hash(cuisinesBanner),
      const DeepCollectionEquality().hash(cuisinesStatus),
      const DeepCollectionEquality().hash(cuisinesId));

  @JsonKey(ignore: true)
  @override
  _$$_CuisinesCopyWith<_$_Cuisines> get copyWith =>
      __$$_CuisinesCopyWithImpl<_$_Cuisines>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_CuisinesToJson(
      this,
    );
  }
}

abstract class _Cuisines implements Cuisines {
  factory _Cuisines(
      {required final String cuisinesName,
      required final String cuisinesImage,
      required final String cuisinesDescription,
      required final String cuisinesBanner,
      required final bool cuisinesStatus,
      required final String cuisinesId}) = _$_Cuisines;

  factory _Cuisines.fromJson(Map<String, dynamic> json) = _$_Cuisines.fromJson;

  @override
  String get cuisinesName;
  @override
  String get cuisinesImage;
  @override
  String get cuisinesDescription;
  @override
  String get cuisinesBanner;
  @override
  bool get cuisinesStatus;
  @override
  String get cuisinesId;
  @override
  @JsonKey(ignore: true)
  _$$_CuisinesCopyWith<_$_Cuisines> get copyWith =>
      throw _privateConstructorUsedError;
}
