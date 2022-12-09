class RestaurantModel {
  bool? _status;
  late List<Data> _data;
  List<Data> get data => _data;

  RestaurantModel({required status, required data}) {
    _status = status;
    _data = data;
  }

  RestaurantModel.fromJson(Map<String, dynamic> json) {
    _status = json['status'];
    if (json['data'] != null) {
      _data = <Data>[];
      json['data'].forEach((v) {
        data.add(Data.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['status'] = _status;
    data['data'] = this.data.map((v) => v.toJson()).toList();
    return data;
  }
}

class Data {
  Documents? documents;
  String? restaurantName;
  String? restaurantImage;
  String? restaurantAddress;
  String? restaurantCity;
  int? restaurantContact;
  String? ownerName;
  int? ownerContact;
  String? ownerEmailID;
  String? ownerPassword;
  List<Cuisines>? cuisines;
  bool? restaurantStatus;
  String? createdAt;
  String? updatedAt;
  String? restaurantId;

  Data(
      {this.documents,
      this.restaurantName,
      this.restaurantImage,
      this.restaurantAddress,
      this.restaurantCity,
      this.restaurantContact,
      this.ownerName,
      this.ownerContact,
      this.ownerEmailID,
      this.ownerPassword,
      this.cuisines,
      this.restaurantStatus,
      this.createdAt,
      this.updatedAt,
      this.restaurantId});

  Data.fromJson(Map<String, dynamic> json) {
    documents = json['documents'] != null
        ? Documents.fromJson(json['documents'])
        : null;
    restaurantName = json['restaurantName'];
    restaurantImage = json['restaurantImage'];
    restaurantAddress = json['restaurantAddress'];
    restaurantCity = json['restaurantCity'];
    restaurantContact = json['restaurantContact'];
    ownerName = json['ownerName'];
    ownerContact = json['ownerContact'];
    ownerEmailID = json['ownerEmailID'];
    ownerPassword = json['ownerPassword'];
    if (json['cuisines'] != null) {
      cuisines = <Cuisines>[];
      json['cuisines'].forEach((v) {
        cuisines!.add(Cuisines.fromJson(v));
      });
    }
    restaurantStatus = json['restaurantStatus'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    restaurantId = json['restaurantId'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    if (documents != null) {
      data['documents'] = documents!.toJson();
    }
    data['restaurantName'] = restaurantName;
    data['restaurantImage'] = restaurantImage;
    data['restaurantAddress'] = restaurantAddress;
    data['restaurantCity'] = restaurantCity;
    data['restaurantContact'] = restaurantContact;
    data['ownerName'] = ownerName;
    data['ownerContact'] = ownerContact;
    data['ownerEmailID'] = ownerEmailID;
    data['ownerPassword'] = ownerPassword;
    if (cuisines != null) {
      data['cuisines'] = cuisines!.map((v) => v.toJson()).toList();
    }
    data['restaurantStatus'] = restaurantStatus;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    data['restaurantId'] = restaurantId;
    return data;
  }
}

class Documents {
  String? gstCertificate;
  String? fssaiCertificate;
  String? sampleBill;
  String? sampleMenu;
  String? ownerPan;

  Documents(
      {this.gstCertificate,
      this.fssaiCertificate,
      this.sampleBill,
      this.sampleMenu,
      this.ownerPan});

  Documents.fromJson(Map<String, dynamic> json) {
    gstCertificate = json['gstCertificate'];
    fssaiCertificate = json['fssaiCertificate'];
    sampleBill = json['sampleBill'];
    sampleMenu = json['sampleMenu'];
    ownerPan = json['ownerPan'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['gstCertificate'] = gstCertificate;
    data['fssaiCertificate'] = fssaiCertificate;
    data['sampleBill'] = sampleBill;
    data['sampleMenu'] = sampleMenu;
    data['ownerPan'] = ownerPan;
    return data;
  }
}

class RestaurantTiming {
  List<String>? monday;
  List<String>? tuesday;
  List<String>? wednesday;
  List<String>? thursday;
  List<String>? friday;
  List<String>? saturday;
  List<String>? sunday;

  RestaurantTiming(
      {this.monday,
      this.tuesday,
      this.wednesday,
      this.thursday,
      this.friday,
      this.saturday,
      this.sunday});

  RestaurantTiming.fromJson(Map<String, dynamic> json) {
    monday = json['monday'];
    tuesday = json['tuesday'];
    wednesday = json['wednesday'];
    thursday = json['thursday'];
    friday = json['friday'];
    saturday = json['saturday'];
    sunday = json['sunday'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['monday'] = monday;
    data['tuesday'] = tuesday;
    data['wednesday'] = wednesday;
    data['thursday'] = thursday;
    data['friday'] = friday;
    data['saturday'] = saturday;
    data['sunday'] = sunday;
    return data;
  }
}

class Cuisines {
  String? cuisinesName;
  String? cuisinesId;

  Cuisines({this.cuisinesName, this.cuisinesId});

  Cuisines.fromJson(Map<String, dynamic> json) {
    cuisinesName = json['cuisinesName'];
    cuisinesId = json['cuisinesId'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['cuisinesName'] = cuisinesName;
    data['cuisinesId'] = cuisinesId;
    return data;
  }
}
