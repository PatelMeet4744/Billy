class BannerModel {
  String? _message;
  late List<Data> _data;
  List<Data> get data => _data;

  BannerModel({required message, required data}) {
    _message = message;
    _data = data;
  }

  BannerModel.fromJson(Map<String, dynamic> json) {
    _message = json['message'];
    if (json['data'] != null) {
      _data = <Data>[];
      json['data'].forEach((v) {
        data.add(Data.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['message'] = _message;
    data['data'] = this.data.map((v) => v.toJson()).toList();
    return data;
  }
}

class Data {
  Restaurant? restaurant;
  String? bannerName;
  String? bannerImage;
  bool? bannerStatus;
  int? approvalStatus;
  String? createdAt;
  String? updatedAt;
  String? bannerId;

  Data(
      {this.restaurant,
      this.bannerName,
      this.bannerImage,
      this.bannerStatus,
      this.approvalStatus,
      this.createdAt,
      this.updatedAt,
      this.bannerId});

  Data.fromJson(Map<String, dynamic> json) {
    restaurant = json['restaurant'] != null
        ? Restaurant.fromJson(json['restaurant'])
        : null;
    bannerName = json['bannerName'];
    bannerImage = json['bannerImage'];
    bannerStatus = json['bannerStatus'];
    approvalStatus = json['approvalStatus'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    bannerId = json['bannerId'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    if (restaurant != null) {
      data['restaurant'] = restaurant!.toJson();
    }
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
