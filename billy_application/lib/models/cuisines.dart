import 'package:billy_application/utils/app_constants.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'cuisines.freezed.dart';
part 'cuisines.g.dart';

List<Cuisines> cuisinesFromJson(dynamic str) => List<Cuisines>.from(
      (str).map(
        (e) => Cuisines.fromJson(e),
      ),
    );

@freezed
abstract class Cuisines with _$Cuisines {
  factory Cuisines({
    required String cuisinesName,
    required String cuisinesImage,
    required String cuisinesDescription,
    required String cuisinesBanner,
    required bool cuisinesStatus,
    required String cuisinesId,
  }) = _Cuisines;

  factory Cuisines.fromJson(Map<String, dynamic> json) =>
      _$CuisinesFromJson(json);
}

extension CuisinesExt on Cuisines {
  String get fullImagePath => Config.imageURL + cuisinesImage;
}
