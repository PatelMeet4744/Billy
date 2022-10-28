import 'dart:convert';

import 'package:billy_application/config/config.dart';

BannerResponse bannerResponseJson(String str) =>
    BannerResponse.fromJson(json.decode(str));

class BannerResponse {
  late final String message;
  List<Data>? data;

  BannerResponse({
    required this.message,
    this.data,
  });

  BannerResponse.fromJson(Map<String, dynamic> json) {
    message = json['message'];
    if (json['data'] != null) {
      data = <Data>[];
      json['data'].forEach((v) {
        data!.add(Data.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['message'] = message;
    if (this.data != null) {
      data['data'] = this.data!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Data {
  late final Restaurant restaurant;
  late final String bannerName;
  late final String bannerImage;
  late final bool bannerStatus;
  late final int approvalStatus;
  late final String createdAt;
  late final String updatedAt;
  late final String bannerId;

  Data({
    required this.restaurant,
    required this.bannerName,
    required this.bannerImage,
    required this.bannerStatus,
    required this.approvalStatus,
    required this.createdAt,
    required this.updatedAt,
    required this.bannerId,
  });

  Data.fromJson(Map<String, dynamic> json) {
    restaurant = (json['restaurant'] != null
        ? Restaurant.fromJson(json['restaurant'])
        : null)!;
    bannerName = json['bannerName'];
    bannerImage = Config.imageURL + json['bannerImage'];
    bannerStatus = json['bannerStatus'];
    approvalStatus = json['approvalStatus'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    bannerId = json['bannerId'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['restaurant'] = restaurant.toJson();
    data['bannerName'] = bannerName;
    data['bannerImage'] = bannerImage;
    data['bannerStatus'] = bannerStatus;
    data['approvalStatus'] = approvalStatus;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    data['bannerId'] = bannerId;
    return data;
  }
}

class Restaurant {
  String? restaurantName;
  String? restaurantId;

  Restaurant({this.restaurantName, this.restaurantId});

  Restaurant.fromJson(Map<String, dynamic> json) {
    restaurantName = json['restaurantName'];
    restaurantId = json['restaurantId'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['restaurantName'] = restaurantName;
    data['restaurantId'] = restaurantId;
    return data;
  }
}
