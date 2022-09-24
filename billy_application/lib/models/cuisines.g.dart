// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'cuisines.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_Cuisines _$$_CuisinesFromJson(Map<String, dynamic> json) => _$_Cuisines(
      cuisinesName: json['cuisinesName'] as String,
      cuisinesImage: json['cuisinesImage'] as String,
      cuisinesDescription: json['cuisinesDescription'] as String,
      cuisinesBanner: json['cuisinesBanner'] as String,
      cuisinesStatus: json['cuisinesStatus'] as bool,
      cuisinesId: json['cuisinesId'] as String,
    );

Map<String, dynamic> _$$_CuisinesToJson(_$_Cuisines instance) =>
    <String, dynamic>{
      'cuisinesName': instance.cuisinesName,
      'cuisinesImage': instance.cuisinesImage,
      'cuisinesDescription': instance.cuisinesDescription,
      'cuisinesBanner': instance.cuisinesBanner,
      'cuisinesStatus': instance.cuisinesStatus,
      'cuisinesId': instance.cuisinesId,
    };
