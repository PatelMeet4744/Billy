class CuisinesModel {
  String? _message;
  late List<Data> _data;
  List<Data> get data => _data;

  CuisinesModel({required message, required data}) {
    _message = message;
    _data = data;
  }

  CuisinesModel.fromJson(Map<String, dynamic> json) {
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
  String? cuisinesName;
  String? cuisinesImage;
  String? cuisinesDescription;
  String? cuisinesBanner;
  bool? cuisinesStatus;
  String? createdAt;
  String? updatedAt;
  String? cuisinesId;

  Data(
      {this.cuisinesName,
      this.cuisinesImage,
      this.cuisinesDescription,
      this.cuisinesBanner,
      this.cuisinesStatus,
      this.createdAt,
      this.updatedAt,
      this.cuisinesId});

  Data.fromJson(Map<String, dynamic> json) {
    cuisinesName = json['cuisinesName'];
    cuisinesImage = json['cuisinesImage'];
    cuisinesDescription = json['cuisinesDescription'];
    cuisinesBanner = json['cuisinesBanner'];
    cuisinesStatus = json['cuisinesStatus'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    cuisinesId = json['cuisinesId'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['cuisinesName'] = cuisinesName;
    data['cuisinesImage'] = cuisinesImage;
    data['cuisinesDescription'] = cuisinesDescription;
    data['cuisinesBanner'] = cuisinesBanner;
    data['cuisinesStatus'] = cuisinesStatus;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    data['cuisinesId'] = cuisinesId;
    return data;
  }
}
